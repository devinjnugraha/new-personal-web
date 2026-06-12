import { createOpenAI } from '@ai-sdk/openai'
import { streamText, convertToModelMessages, type UIMessage } from 'ai'
import { after } from 'next/server'
import { portfolio } from '@/data/portfolio'
import { appConfig } from '@/lib/app-config'
import { db } from '@/db/client'
import { chatSessions, chatMessages } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const runtime = 'edge'

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: appConfig.getOpenRouterApiKey()
})

const RATE_LIMIT = appConfig.getChatRateLimit()
const RATE_WINDOW_MS = appConfig.getChatRateWindowMs()

const rateStore = new Map<string, number[]>() // ip → array of request timestamps

function checkRateLimit (ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const cutoff = now - RATE_WINDOW_MS
  let timestamps = rateStore.get(ip)

  // Purge expired entries
  if (timestamps) {
    timestamps = timestamps.filter(t => t > cutoff)
  }

  if (!timestamps || timestamps.length === 0) {
    rateStore.set(ip, [now])
    return { allowed: true, remaining: RATE_LIMIT - 1 }
  }

  if (timestamps.length >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 }
  }

  timestamps.push(now)
  rateStore.set(ip, timestamps)
  return { allowed: true, remaining: RATE_LIMIT - timestamps.length }
}

interface ChatRequestBody {
  messages: UIMessage[]
  chatId?: string
  fingerprint?: string
}

export async function POST (req: Request) {
  // Rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const { allowed, remaining } = checkRateLimit(ip)

  if (!allowed) {
    const errorChunk = `data: ${JSON.stringify({
      type: 'error',
      errorText: '429 - Rate limit reached. Try again in an hour.'
    })}\n\ndata: [DONE]\n`
    return new Response(errorChunk, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-RateLimit-Remaining': '0'
      }
    })
  }

  // Parse request
  let messages: UIMessage[]
  let chatId: string
  let fingerprint: string
  try {
    const body: ChatRequestBody = await req.json()
    messages = body.messages
    if (!Array.isArray(messages)) throw new Error('Invalid messages')
    chatId = body.chatId ?? crypto.randomUUID()
    fingerprint = body.fingerprint ?? 'unknown'
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const model = appConfig.getChatModel()
  const now = new Date()
  const timestamp = now.toLocaleString('en-US', {
    timeZone: 'Asia/Jakarta',
    dateStyle: 'full',
    timeStyle: 'short'
  })

  const modelMessages = await convertToModelMessages(messages)
  console.log('SYSTEM')
  console.log(portfolio.chat.systemPrompt)
  
  console.log('MESSAGES')
  console.dir(modelMessages, { depth: null })
  
  const result = streamText({
    model: openrouter(model),
    system: `[Current timestamp: ${timestamp}]\n\n${portfolio.chat.systemPrompt}`,
    messages: modelMessages,
    maxOutputTokens: appConfig.getChatMaxOutputTokens(),
    temperature: appConfig.getChatTemperature()
  })

  // Persist chat data after response is sent (non-blocking)
  const sessionId = chatId
  after(async () => {
    try {
      // Create session if it doesn't exist yet
      const existing = await db.select({ id: chatSessions.id })
        .from(chatSessions)
        .where(eq(chatSessions.id, sessionId))
        .limit(1)

      if (existing.length === 0) {
        await db.insert(chatSessions).values({
          id: sessionId,
          fingerprint,
          ip
        })
      }

      // Extract last user message text
      const lastUserMsg = messages.filter(m => m.role === 'user').pop()
      const userText = lastUserMsg?.parts
        ?.filter(p => p.type === 'text')
        .map(p => p.text)
        .join('') ?? ''

      // Get full assistant response
      const assistantText = await result.text

      // Insert both messages
      await db.insert(chatMessages).values([
        {
          chatId: sessionId,
          role: 'user',
          content: userText
        },
        {
          chatId: sessionId,
          role: 'assistant',
          content: assistantText
        }
      ])
    } catch (err) {
      console.error('[chat-db] Failed to persist messages:', err)
    }
  })

  return result.toUIMessageStreamResponse({
    headers: {
      'X-RateLimit-Remaining': String(remaining)
    }
  })
}
