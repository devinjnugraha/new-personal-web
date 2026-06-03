import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { kv } from '@vercel/kv'
import { after } from 'next/server'
import { portfolio } from '@/data/portfolio'

export const runtime = 'edge'

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY ?? '',
})

// Rate limit: 20 messages per IP per hour
const RATE_LIMIT = 20
const RATE_WINDOW_SECONDS = 60 * 60

async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  const key = `chat_rate:${ip}`
  try {
    const count = await kv.incr(key)
    if (count === 1) {
      await kv.expire(key, RATE_WINDOW_SECONDS)
    }
    const allowed = count <= RATE_LIMIT
    return { allowed, remaining: Math.max(0, RATE_LIMIT - count) }
  } catch {
    // If KV is unavailable, fail open (allow the request)
    return { allowed: true, remaining: RATE_LIMIT }
  }
}

export async function POST(req: Request) {
  // Rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const { allowed, remaining } = await checkRateLimit(ip)

  if (!allowed) {
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded. Try again in an hour.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Remaining': '0',
        },
      }
    )
  }

  // Parse request
  let messages: { role: string; content: string }[]
  try {
    const body = await req.json()
    messages = body.messages
    if (!Array.isArray(messages)) throw new Error('Invalid messages')
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const model = process.env.CHAT_MODEL ?? 'anthropic/claude-haiku-4-5'

  const result = streamText({
    model: openrouter(model),
    system: portfolio.chat.systemPrompt,
    messages: messages as Parameters<typeof streamText>[0]['messages'],
    maxTokens: 500,
    temperature: 0.7,
  })

  // Log chat event after response is sent (non-blocking)
  after(async () => {
    // TODO: Optionally persist chat analytics to a database
    // e.g. log { ip, messageCount: messages.length, timestamp: new Date() }
    console.log(`[chat] ip=${ip} messages=${messages.length} remaining=${remaining}`)
  })

  return result.toDataStreamResponse({
    headers: {
      'X-RateLimit-Remaining': String(remaining),
    },
  })
}
