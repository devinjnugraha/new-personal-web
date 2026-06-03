# SPEC-010 — Chat API Route Handler (Backend)

**Status:** TODO  
**File:** `src/app/api/chat/route.ts`  
**Runtime:** Edge  
**Priority:** P0  
**Depends on:** `src/data/portfolio.ts` (system prompt)

---

## Purpose

The server-side Route Handler that receives chat messages, enforces rate limiting,
and streams an LLM response back to the client using Vercel AI SDK.

This is the only backend code in the project. The OpenRouter API key never reaches
the browser.

---

## Requirements

### Runtime

| ID | Requirement |
|---|---|
| API-01 | `export const runtime = 'edge'` at top of file |
| API-02 | Only `POST` method is handled; other methods return 405 |

### Request Parsing

| ID | Requirement |
|---|---|
| API-03 | Parse `{ messages }` from request body JSON |
| API-04 | If body is malformed or `messages` is not an array: return `400 Bad Request` with `{ error: "Invalid request body" }` |
| API-05 | Never log message content — only metadata (IP, count) |

### Rate Limiting

| ID | Requirement |
|---|---|
| API-06 | Use Vercel KV (`@vercel/kv`) to implement a sliding-window rate limiter |
| API-07 | Limit: **20 messages per IP per hour** |
| API-08 | KV key format: `chat_rate:{ip}` |
| API-09 | On first request from an IP: `kv.incr(key)` then `kv.expire(key, 3600)` |
| API-10 | If count exceeds 20: return `429 Too Many Requests` with `{ error: "Rate limit exceeded. Try again in an hour." }` |
| API-11 | If KV is unavailable (throws): **fail open** — allow the request (don't block on infra failure) |
| API-12 | IP extracted from `x-forwarded-for` header (first value), fallback `x-real-ip`, fallback `"unknown"` |
| API-13 | Include `X-RateLimit-Remaining` header in all responses |

### LLM Call

| ID | Requirement |
|---|---|
| API-14 | Provider: OpenRouter via `createOpenAI` from `@ai-sdk/openai` with `baseURL: 'https://openrouter.ai/api/v1'` |
| API-15 | API key from `process.env.OPENROUTER_API_KEY` — never hardcoded |
| API-16 | Model from `process.env.CHAT_MODEL` — never hardcoded |
| API-17 | System prompt from `portfolio.chat.systemPrompt` — imported from `@/data/portfolio` |
| API-18 | `maxTokens: 500` — cap response length |
| API-19 | `temperature: 0.7` |
| API-20 | Use `streamText` from `ai` package |
| API-21 | Return `result.toDataStreamResponse()` with `X-RateLimit-Remaining` header |

### Post-Response Logging

| ID | Requirement |
|---|---|
| API-22 | Use `after()` from `next/server` to log metadata after response is sent |
| API-23 | Log format: `[chat] ip=<ip> messages=<count> remaining=<n>` |
| API-24 | Do NOT log message content |

---

## Error Response Format

All error responses use JSON body:
```json
{ "error": "<human-readable message>" }
```
With appropriate HTTP status code.

---

## Environment Variables Required

| Variable | Description |
|---|---|
| `OPENROUTER_API_KEY` | OpenRouter API key (`sk-or-v1-...`) |
| `CHAT_MODEL` | Full model string e.g. `anthropic/claude-haiku-4-5` |
| `KV_REST_API_URL` | Vercel KV REST URL |
| `KV_REST_API_TOKEN` | Vercel KV REST token |

---

## Acceptance Criteria

- [ ] `runtime = 'edge'` exported
- [ ] Returns 400 for malformed request body
- [ ] Returns 429 after 20 messages from same IP within an hour
- [ ] KV failure does NOT block the request (fail open)
- [ ] LLM model loaded from env var
- [ ] System prompt comes from `portfolio.chat.systemPrompt`
- [ ] Response streams correctly (not buffered)
- [ ] `X-RateLimit-Remaining` header present on all responses
- [ ] `after()` logs metadata without blocking stream
