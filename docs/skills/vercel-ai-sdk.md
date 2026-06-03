# Skill: Vercel AI SDK v4 — Streaming Chat

Reference for the AI SDK patterns used in the `/api/chat` route handler and `ChatInterface`.

---

## Server: streamText with OpenRouter

```typescript
import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY!,
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openrouter(process.env.CHAT_MODEL!),
    system: 'Your system prompt here.',
    messages,
    maxTokens: 500,
    temperature: 0.7,
  })

  return result.toDataStreamResponse()
}
```

---

## Client: useChat Hook

```typescript
'use client'
import { useChat } from 'ai/react'

export function Chat() {
  const {
    messages,          // Message[] — full history
    input,             // string — current input value
    handleInputChange, // (e) => void — for <input onChange>
    handleSubmit,      // (e) => void — for <form onSubmit>
    isLoading,         // boolean — stream in progress
    error,             // Error | undefined
    append,            // append a message and trigger response
    setInput,          // manually set input value
  } = useChat({
    api: '/api/chat',
    onFinish: () => { /* called after each complete response */ },
    onError: (err) => { /* called on error */ },
  })
}
```

---

## Starter Prompt Pattern (append)

To submit a preset message directly — bypassing the input field:

```typescript
const { append } = useChat({ api: '/api/chat' })

// On starter button click:
await append({
  role: 'user',
  content: 'Tell me about your ML research',
})
// This immediately sends and triggers a streaming response.
```

---

## Message Type

```typescript
// From 'ai' package
interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
}
```

---

## Error Handling

```typescript
const { error } = useChat({ api: '/api/chat' })

// Check specific HTTP status in error message:
if (error?.message.includes('429')) {
  return <p>Rate limit reached.</p>
}
```

The `error` state resets automatically on the next successful message.

---

## toDataStreamResponse with Custom Headers

```typescript
return result.toDataStreamResponse({
  headers: {
    'X-RateLimit-Remaining': String(remaining),
  },
})
```

---

## Model String Examples (OpenRouter)

```
anthropic/claude-haiku-4-5      ← cheap, fast, good for dev
anthropic/claude-sonnet-4-5     ← balanced, recommended for prod
openai/gpt-4o-mini              ← alternative, very cheap
```

Set via `CHAT_MODEL` env var — never hardcode.
