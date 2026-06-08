# FEAT-020 — Additional Chat Knowledge

**Status:** In Progress
**Priority:** P3
**Backlog:** BACKLOG-016

---

## Phase 1 — Spec

### User Stories

- **US-1:** As Devin, I want to store freeform personal information (hobbies, unique facts, preferences) that is not displayed on the portfolio site but is available to the LLM chat assistant, so that visitors can ask about Devin's personality and interests beyond what's in the structured portfolio data.

### Acceptance Criteria

| ID | Criterion |
|---|---|
| AC-1 | A separate data file `src/data/chat-knowledge.ts` exports an array of freeform strings |
| AC-2 | Each string is a single fact or statement about Devin |
| AC-3 | The `buildChatSystemPrompt` function appends a `PERSONAL` section to the knowledge base from this array |
| AC-4 | If the array is empty, no `PERSONAL` section appears in the prompt |
| AC-5 | The additional knowledge is not rendered anywhere on the website |

### Scope

**In scope:** New data file + prompt builder integration.
**Out of scope:** UI for editing knowledge, admin panel, database storage.

---

## Phase 2 — Design

### Data Model

```typescript
// src/data/chat-knowledge.ts
export const additionalKnowledge: string[] = [
  // Add freeform facts here — hobbies, personality, unique facts, etc.
]
```

No type changes needed. The array is consumed internally and baked into the system prompt string.

### File Responsibilities

| File | Responsibility |
|---|---|
| `src/data/chat-knowledge.ts` | NEW — stores freeform strings for LLM knowledge only |
| `src/data/portfolio.ts` | MODIFIED — `buildChatSystemPrompt` imports and appends knowledge |

### Data Flow

```
chat-knowledge.ts (string[])
  → imported by portfolio.ts
    → buildChatSystemPrompt() appends "PERSONAL:" section
      → portfolio.chat.systemPrompt
        → consumed by api/chat/route.ts
```

---

## Phase 3 — Task List

- [x] **T-1:** Create `src/data/chat-knowledge.ts` with `additionalKnowledge: string[]` (empty array, with comment placeholder) — satisfies AC-1, AC-2
- [x] **T-2:** Update `buildChatSystemPrompt` in `src/data/portfolio.ts` to import and append PERSONAL section — satisfies AC-3, AC-4

---

## Phase 4 — Code

All tasks complete. Type-check passes. No deviations from design.
