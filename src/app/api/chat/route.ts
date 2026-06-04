import { createOpenAI } from '@ai-sdk/openai'
import { streamText, convertToModelMessages, type UIMessage } from 'ai'
import { after } from 'next/server'
import { portfolio } from '@/data/portfolio'

export const runtime = 'edge'

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY ?? ''
})

const RATE_LIMIT = parseInt(process.env.CHAT_RATE_LIMIT ?? '20', 10)
const RATE_WINDOW_MS =
  parseInt(process.env.CHAT_RATE_WINDOW ?? '3600', 10) * 1000

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
  try {
    const body = await req.json()
    messages = body.messages
    if (!Array.isArray(messages)) throw new Error('Invalid messages')
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const model = process.env.CHAT_MODEL ?? 'anthropic/claude-haiku-4-5'
  const now = new Date()
  const timestamp = now.toLocaleString('en-US', {
    timeZone: 'Asia/Jakarta',
    dateStyle: 'full',
    timeStyle: 'short'
  })

  const result = streamText({
    model: openrouter(model),
    system: `[Current timestamp: ${timestamp}]\n\n${portfolio.chat.systemPrompt}`,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 500,
    temperature: 0.7618
  })

  // Log chat event after response is sent (non-blocking)
  after(async () => {
    const msgSummary = messages.map(m => ({
      role: m.role,
      text: m.parts
        ?.filter(p => p.type === 'text')
        .map(p => p.text)
        .join('')
        .slice(0, 80)
    }))
    console.log(
      `[chat] ip=${ip} count=${
        messages.length
      } remaining=${remaining} messages=${JSON.stringify(msgSummary)}`
    )
  })

  return result.toUIMessageStreamResponse({
    headers: {
      'X-RateLimit-Remaining': String(remaining)
    }
  })
}
