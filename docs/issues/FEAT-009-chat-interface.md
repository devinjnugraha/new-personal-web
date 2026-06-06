# SPEC-009 — Chat Interface (Frontend)

**Status:** TODO  
**Component:** `src/components/sections/ChatInterface.tsx` (Client Component)  
**Section ID:** `#chat`  
**Section Number:** 06  
**Priority:** P1  
**Depends on:** SPEC-010 (Chat API Route)

---

## Purpose

An inline LLM chat interface embedded in the portfolio page. Visitors can ask questions
about Devin and get answers from his personal assistant, powered by an LLM knowledge base.
This is NOT a popup widget — it lives as a full section on the page.

---

## Layout

```
06 / ask devin
Powered by an LLM trained on my background. Answers may be imperfect.

┌────────────────────────────────────────────────────────┐
│  [Empty state: starter prompt buttons]                  │
│                                                         │
│                  Hello! I'm Devin's AI...  [assistant] │
│  [user] What tech do you work with?                     │
│                  I primarily work with Python...  [ai]  │
│                                                         │
│  [typing...]                                            │
├────────────────────────────────────────────────────────┤
│  Ask anything about my background...    [send →]        │
└────────────────────────────────────────────────────────┘
```

---

## Requirements

### Section Wrapper

| ID | Requirement |
|---|---|
| CI-01 | Section label: `06 / ask devin` |
| CI-02 | Subtitle: `"Devin's personal assistant, powered by an LLM."` + muted span `"Only answers from the knowledge base."` — `text-ink-muted text-sm mb-6` |
| CI-03 | Chat container: `border border-border rounded-lg bg-background-surface overflow-hidden` |

### Message List

| ID | Requirement |
|---|---|
| CI-04 | Message list area: `h-80 overflow-y-auto p-4 space-y-4` |
| CI-05 | Auto-scroll to bottom on new message using `useRef` + `scrollIntoView` |
| CI-06 | User messages: right-aligned — `bg-accent text-[#0D0D0D] font-medium` pill |
| CI-07 | Assistant messages: left-aligned — `bg-background-elevated text-ink border border-border` pill |
| CI-08 | Message pill: `max-w-[80%] text-sm rounded-lg px-4 py-2 leading-relaxed` |

### Empty State (no messages yet)

| ID | Requirement |
|---|---|
| CI-09 | Show 4 starter prompt buttons when `messages.length === 0` |
| CI-10 | Starter prompts: "Tell me about Devin's ML research", "What tech stack does Devin work with?", "What are Devin's certifications?", "Tell me about Devin's glaucoma detection paper" |
| CI-11 | Button style: `text-xs font-mono text-ink-muted border border-border px-3 py-1.5 rounded hover:border-accent hover:text-accent transition-colors` |
| CI-12 | Clicking a starter prompt populates the input AND submits immediately |

### Loading State

| ID | Requirement |
|---|---|
| CI-13 | While `isLoading === true`: show animated typing indicator in assistant position |
| CI-14 | Typing indicator: three dots with staggered opacity animation (CSS or Motion) |

### Error State

| ID | Requirement |
|---|---|
| CI-15 | If `error` is set: show inline error message — do NOT crash the component |
| CI-16 | Rate limit error (HTTP 429): `"Rate limit reached — try again in an hour."` |
| CI-17 | Other error: `"Something went wrong. Please try again."` |
| CI-18 | Error text: `text-xs font-mono text-red-400 text-center` |

### Input Area

| ID | Requirement |
|---|---|
| CI-19 | Input + button separated from message list by `border-t border-border` |
| CI-20 | `<form>` with `onSubmit={handleSubmit}` |
| CI-21 | Input: `flex-1 bg-transparent px-4 py-3 text-sm text-ink placeholder-ink-faint outline-none font-mono` |
| CI-22 | Input placeholder: `"Ask anything about Devin..."` |
| CI-23 | Input disabled when `isLoading === true` |
| CI-24 | Send button: `"send →"` — `font-mono text-sm text-accent border-l border-border px-4` |
| CI-25 | Send button disabled when `isLoading` OR `input.trim()` is empty |

### Analytics Tracking

| ID | Requirement |
|---|---|
| CI-26 | Call `track('chat_message_sent', { messageCount: messages.length })` from `@vercel/analytics` on successful message completion (`onFinish` callback of `useChat`) |
| CI-27 | Call `track('chat_opened')` once when the component first mounts (`useEffect` with empty deps) |
| CI-28 | Call `track('chat_error')` on `onError` callback |

---

## useChat Hook Setup

```typescript
const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
  api: '/api/chat',
  onFinish: () => track('chat_message_sent', { messageCount: messages.length }),
  onError: () => track('chat_error'),
})
```

---

## Acceptance Criteria

- [ ] Chat renders inline (not in a modal)
- [ ] Starter prompts shown when no messages
- [ ] Clicking a starter prompt submits it directly
- [ ] User and assistant bubbles visually distinct
- [ ] Auto-scrolls to latest message
- [ ] Typing indicator shown during loading
- [ ] Rate limit error shows correct message
- [ ] Input disabled during loading
- [ ] Analytics events fire correctly
