# FEAT-021 — Chat API Persistence to PostgreSQL

> **Status:** Phase 4 — Code
> **Backlog ref:** BACKLOG-019
> **Date:** 2026-06-11

---

## Phase 1 — Spec

### User Stories

**US-1: Chat session tracking**
As a site owner, I want each chat conversation to have a unique session ID so that I can trace and group all messages belonging to one conversation.

**US-2: User identification**
As a site owner, I want to identify who is chatting (by IP address and a client-generated fingerprint) so that I can distinguish visitors and analyze per-user chat patterns.

**US-3: Structured message logging**
As a site owner, I want every chat turn (user message + assistant response) stored as a structured record so that I can query conversation history and run analytics without parsing unstructured logs.

**US-4: Conversation reconstruction**
As a site owner, I want to reconstruct any full conversation from the stored records so that I can review what visitors asked and how the assistant responded.

**US-5: Production analytics readiness**
As a site owner, I want the persistence layer to be reliable and queryable so that I can build dashboards or export data for analysis later.

---

### Acceptance Criteria

**AC-1: Chat session ID**
- Given a visitor sends their first message, when the API processes the request, then a unique `chatId` (UUID) is generated and returned to the client.
- Given the client has a `chatId`, when subsequent messages are sent in the same conversation, then the same `chatId` is included in the request and used to group records.

**AC-2: User identification**
- Given a chat request arrives, when the API processes it, then the visitor's IP address is extracted from headers (`x-forwarded-for` or `x-real-ip`) and stored alongside each message.
- Given the chat interface loads, when it initializes, then a client-generated anonymous fingerprint (e.g., hash of UA + screen resolution + timezone) is created and sent with each request.

**AC-3: Structured message storage**
- Given a chat turn completes (assistant finishes streaming), when the `after()` callback runs, then two records are persisted — one for the user message and one for the assistant response.
- Each record contains: `id`, `chatId`, `role` (`user` | `assistant`), `content` (text), `ip`, `fingerprint`, `createdAt`.
- No unstructured JSON blobs — every field is a typed column.

**AC-4: Conversation reconstruction**
- Given a `chatId`, when queried, then all messages for that conversation are returned in chronological order.
- Records can be filtered by `chatId`, `ip`, `fingerprint`, and date range.

**AC-5: Edge runtime compatibility**
- Given the API route runs on Vercel Edge Runtime, when a database write occurs, then the driver/connection method is compatible with Edge Runtime constraints.

**AC-6: No impact on chat UX**
- Given the persistence layer is active, when a user sends a message, then the streaming response latency is not perceptibly affected.
- Database write failures are caught and logged — they do not break the chat response.

---

### Scope

**In scope:**
- Database schema and migrations for chat persistence
- API route modifications to persist messages after streaming
- Client-side `chatId` generation and persistence (localStorage)
- Client-side anonymous fingerprint generation
- App config additions for database connection
- Environment variable setup

**Out of scope:**
- Analytics dashboard or admin UI
- Real-time monitoring/alerting
- Data export tools
- GDPR/privacy compliance (separate backlog item if needed)
- Chat history display to visitors
- Migration of existing console.log data

---

## Phase 2 — Design

### Technology Choices

| Concern | Choice | Rationale |
|---|---|---|
| Database | Neon Postgres (Vercel integration) | Edge-compatible, serverless, auto-provisioned via Vercel |
| ORM | Drizzle ORM (`drizzle-orm`) | Type-safe, lightweight, Edge-compatible, schema-as-code |
| Driver | `@neondatabase/serverless` | HTTP-based, works in Edge Runtime |
| Migrations | Drizzle Kit (`drizzle-kit`) | Generates SQL migrations from schema definitions |
| UUID generation | `crypto.randomUUID()` | Built into Edge Runtime, no dependency |

### New Dependencies

```
drizzle-orm               — runtime ORM
@neondatabase/serverless  — Neon Edge-compatible driver
drizzle-kit               — dev dependency, migration tool
```

### Directory Structure Additions

```
src/
  db/
    schema.ts    — Drizzle table definitions (chat_sessions, chat_messages)
    client.ts    — Neon/Drizzle connection singleton
drizzle.config.ts   — Drizzle Kit config (project root)
```

### Database Schema

**Table: `chat_sessions`**

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | Unique session identifier (the `chatId`) |
| `fingerprint` | `text` | NOT NULL | Anonymous client fingerprint (hash of UA + screen + timezone) |
| `ip` | `text` | NOT NULL | Visitor IP from `x-forwarded-for` / `x-real-ip` |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | When the session started (first message) |

**Table: `chat_messages`**

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | Unique message identifier |
| `chat_id` | `uuid` | FK → `chat_sessions.id`, NOT NULL | Which session this message belongs to |
| `role` | `text` | NOT NULL, CHECK (`role IN ('user', 'assistant')`) | Who sent the message |
| `content` | `text` | NOT NULL | Full message text |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | When the message was recorded |

**Indexes:**
- `chat_messages.chat_id` — for conversation reconstruction queries
- `chat_sessions.ip` — for per-user analytics
- `chat_sessions.fingerprint` — for cross-session user tracking
- `chat_sessions.created_at` — for date-range queries

### TypeScript Types

No new types in `src/types/index.ts` — the Drizzle schema serves as the type source. Inferred types via `InferSelectModel` / `InferInsertModel` from Drizzle.

### Component & Module Responsibilities

**`src/db/schema.ts`** — Drizzle table definitions
- Defines `chatSessions` and `chatMessages` tables
- Exports typed insert/select types via `InferSelectModel`

**`src/db/client.ts`** — Database connection
- Creates Neon serverless client with `DATABASE_URL` from env
- Creates and exports Drizzle `db` instance
- Uses `appConfig.getDatabaseUrl()` for the connection string

**`src/lib/app-config.ts`** — Config additions
- Adds `getDatabaseUrl(): string` method
- Reads `DATABASE_URL` env var

**`src/app/api/chat/route.ts`** — API changes
- Parses `chatId` and `fingerprint` from request body
- If no `chatId`: generates new UUID, creates `chat_sessions` row, returns `chatId` in response headers
- If `chatId` exists: validates session exists
- In `after()` callback: inserts `chat_messages` rows for the latest user message and assistant response
- DB write failures are caught and logged, never break the response

**`src/components/sections/ChatInterface.tsx`** — Client changes
- On mount: generate anonymous fingerprint (hash of `navigator.userAgent` + `screen.width` + `screen.height` + `Intl.DateTimeFormat().resolvedOptions().timeZone`)
- On mount: load `chatId` from `localStorage` (key: `portfolio-chat-id`); if absent, set to `null`
- Pass `chatId` and `fingerprint` as extra body fields via `useChat`'s `body` option
- On response with `X-Chat-Id` header: store new `chatId` to `localStorage`
- Clear `chatId` from `localStorage` when conversation is manually reset (if applicable)

### API Contract Changes

**Request body** (sent by `useChat`):

```typescript
{
  messages: UIMessage[]    // existing — full conversation history from client
  chatId?: string          // NEW — null/absent on first message, UUID thereafter
  fingerprint: string      // NEW — anonymous client hash
}
```

**Response headers** (added to existing streaming response):

```
X-Chat-Id: <uuid>         // NEW — returned on first message so client can persist it
X-RateLimit-Remaining: N  // existing — unchanged
```

### Data Flow

```
Client (ChatInterface.tsx)
  │
  ├─ On mount: generate fingerprint, load chatId from localStorage
  │
  ├─ POST /api/chat
  │  body: { messages, chatId?, fingerprint }
  │
  ▼
API Route (route.ts) — Edge Runtime
  │
  ├─ 1. Rate limit check (existing, unchanged)
  ├─ 2. Extract IP from headers
  ├─ 3. Parse chatId + fingerprint from body
  ├─ 4. If no chatId:
  │     → generate new UUID
  │     → INSERT INTO chat_sessions (id, fingerprint, ip)
  │     → set X-Chat-Id response header
  ├─ 5. streamText() → stream response to client (existing)
  │
  ├─ after() callback (runs after stream completes):
  │     → await result.text to get full assistant response
  │     → extract last user message from request messages
  │     → INSERT INTO chat_messages (chat_id, role, content) × 2
  │     → catch + console.error on failure (never break response)
  │
  ▼
Client receives stream + X-Chat-Id header
  │
  └─ If X-Chat-Id present: save to localStorage for subsequent requests
```

### New Environment Variables

```bash
# .env.local
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
```

Added to `app-config.ts`:

```typescript
getDatabaseUrl(): string {
  return process.env.DATABASE_URL ?? ''
}
```

### Edge Runtime Constraints

- `@neondatabase/serverless` uses HTTP/WebSocket (no TCP) — Edge compatible
- `crypto.randomUUID()` — available in Edge
- No `fs`, `net`, or Node.js-specific APIs needed
- Drizzle ORM is Edge-safe with Neon driver

---

## Phase 3 — Task List

1. [x] Install dependencies: `drizzle-orm`, `@neondatabase/serverless`, `drizzle-kit` (AC-5)
2. [x] Create `drizzle.config.ts` in project root (AC-5)
3. [x] Create `src/db/schema.ts` — `chatSessions` and `chatMessages` tables with indexes (AC-1, AC-3, AC-4)
4. [x] Create `src/db/client.ts` — Neon/Drizzle connection singleton (AC-5)
5. [x] Add `getDatabaseUrl()` to `src/lib/app-config.ts` (AC-5)
6. [x] Update `.env.local.example` with `DATABASE_URL` (AC-5)
7. [x] Update `src/app/api/chat/route.ts` — parse chatId/fingerprint, create session, persist messages in `after()` (AC-1, AC-2, AC-3, AC-6)
8. [x] Update `src/components/sections/ChatInterface.tsx` — generate fingerprint, manage chatId in localStorage, send extra body fields (AC-1, AC-2)
9. [x] Run `npm run type-check` and fix any issues (all AC)
10. [x] Update `docs/BACKLOG.md` — mark BACKLOG-019 complete with FEAT-021 ref

---

## Implementation Notes

- **chatId generated client-side**: Instead of server-generated chatId returned via response headers, the client generates `crypto.randomUUID()` on mount and persists it in `localStorage`. This avoids the complexity of intercepting streaming response headers. Server falls back to `crypto.randomUUID()` if client doesn't send one.
- **Session upsert via SELECT + INSERT**: Server checks if session exists before inserting (instead of `ON CONFLICT DO NOTHING`) to stay compatible with all Postgres providers.
- **`sendMessage` options for body**: The `useChat` hook in AI SDK v6 does not support a top-level `body` option. Instead, `chatId` and `fingerprint` are passed via the second argument of `sendMessage(msg, { body: {...} })`.
- **Fingerprint**: Simple deterministic hash of `userAgent + screen.width + screen.height + timezone` — no external dependencies.
