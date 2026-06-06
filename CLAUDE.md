# CLAUDE.md — new-personal-web

Personal portfolio and AI representative site for Devin Jaya Nugraha.
Next.js 15 single-page app with a live LLM chat interface deployed on Vercel.

---

## Stack

| Layer      | Choice                                        | Version       |
| ---------- | --------------------------------------------- | ------------- |
| Framework  | Next.js 15 (App Router)                       | `^15.5.19`    |
| Language   | TypeScript                                    | `^5.0.0`      |
| Runtime    | React                                         | `^19.0.0`     |
| Styling    | Tailwind CSS                                  | `^3.4.0`      |
| Animation  | Motion (`motion/react`)                       | `^11.0.0`     |
| AI/Chat    | Vercel AI SDK (`ai` + `@ai-sdk/react`)        | `^6.x / ^3.x` |
| LLM        | OpenRouter via `@ai-sdk/openai`               | `^3.0.67`     |
| Deployment | Vercel + `@vercel/analytics` + speed-insights | —             |

---

## Directory Structure

```
src/
  app/
    layout.tsx          — Root layout (Server)
    page.tsx            — Home page, assembles sections (Server)
    globals.css         — Tailwind + CSS custom properties
    api/chat/route.ts   — LLM stream endpoint (Edge Runtime)
  components/
    sections/           — Page sections (Server by default)
      ChatInterface.tsx — 'use client' — useChat hook
    ui/
      Nav.tsx           — 'use client' — scroll-aware
  data/
    portfolio.ts        — Single source of truth for all content
  lib/utils.ts          — cn() and shared utilities
  types/index.ts        — Shared TypeScript types
docs/
  issues/               — AI-DLC deliverables (one file per issue)
  specs/                — Legacy spec files (SPEC-NNN-feature.md)
```

---

## Commands

- `npm run dev` — Start dev server with Turbopack
- `npm run build` — Production build
- `npm run type-check` — Run `tsc --noEmit`
- `npm run lint` — ESLint check

---

## Conventions

- Named exports only — no default exports except Next.js page/layout files
- `'use client'` only when a component needs hooks, browser APIs, or event handlers
- No `any` types — use `unknown` and narrow, or define types in `src/types/index.ts`
- Import alias: `@/*` → `src/*` — always use alias, never relative paths across layers
- All content lives in `src/data/portfolio.ts` — never hardcode content in components
- All external links live in `portfolio.ts` under `links` — never hardcode URLs
- Animations: import from `motion/react`, not `framer-motion`
- Chat endpoint: Edge Runtime, `streamText` → `result.toDataStreamResponse()`
- Model is `process.env.CHAT_MODEL` — never hardcoded

---

## ⚠️ AI-DLC Methodology — MANDATORY FOR EVERY REQUEST

**This is not optional.** Every request — including small ones — MUST follow this process
before any code is written. No exceptions.

The workflow is strictly linear. You cannot advance to the next phase without completing
the current one and receiving explicit human approval.

```
[Phase 1: Spec] → [Phase 2: Design] → [Phase 3: Tasks] → [Phase 4: Code]
        ↑ human approval     ↑ human approval    ↑ human approval
```

### Doc Naming Convention

All issue documents follow this format:

```
docs/issues/{CATEGORY}-NNN-short-name.md
```

**Allowed categories (only these):**

- `feat` — feature development
- `fix` — bug fix
- `perf` — performance optimization
- `ref` — refactor / code quality
- `hotfix` — emergency patch

Examples: `fix-001-chat-keyboard.md`, `feat-003-dark-mode.md`, `perf-012-bundle-reduction.md`

### Where Deliverables Live

Every issue has a **single living document** at:

```
docs/issues/{CATEGORY}-NNN-short-name.md
```

This file is **created in Phase 1** and appended to as each phase completes.
It is the authoritative record of requirements, design decisions, and implementation status.

---

### Phase 1 — Spec

**Do this before anything else.** Create `docs/issues/{CATEGORY}-NNN-short-name.md` and write:

- Agile user stories: `As a [user], I want [goal] so that [benefit]`
- Given-When-Then acceptance criteria for each story — testable and unambiguous
- Explicit scope boundary: what is out of scope for this issue

Present output. **Wait for human approval before proceeding.**

---

### Phase 2 — Design

**Do not write code yet.** Append to `docs/issues/{CATEGORY}-NNN-short-name.md`:

- TypeScript type definitions and data models with field-level annotations
- Component or module responsibilities — which file owns what
- API contracts: request/response shapes, route paths, runtime targets
- Data flow: how data moves from source to render

Present output. **Wait for human approval before proceeding.**

---

### Phase 3 — Task List

**Do not write code yet.** Append to `docs/issues/{CATEGORY}-NNN-short-name.md`:

- A numbered, sequenced list of discrete tasks
- A task must have a single goal. Decompose larger tasks into smaller tasks
- Each task is one file, one function, or one config change — no compound tasks
- Each task references the acceptance criteria it satisfies
- Mark tasks `[ ]` pending, `[x]` complete as work progresses

Present output. **Wait for human approval before proceeding.**

---

### Phase 4 — Code

Implement tasks in order. For each task:

1. Write code satisfying the task requirement
2. Check it off in `docs/issues/{CATEGORY}-NNN-short-name.md`
3. Run `npm run type-check` after every logical group of changes
4. Assess whether the issue needs to be verified through `npm run build` and ask human approval before build test. Default to skip build test. Do not always ask for build test
5. Record deviations from the design under `## Implementation Notes` in the issue doc

**If requirements change mid-cycle**, stop, update the issue doc, and restart from Phase 1.

---

### Enforcement Rules

1. No file may be created or modified before Phase 3 is approved
2. `docs/issues/{CATEGORY}-NNN-short-name.md` must exist before any code runs
3. Bug fixes may skip to Phase 4 only if the fix is a single-line change — but must still be logged in the issue doc
4. "It's a small change" is not grounds for skipping phases
5. If you find yourself writing code before the task list exists, stop and go back
6. If an issue was coming from BACKLOG.md, verify the tasks solved the BACKLOG. If yes, check the backlog item off in `docs/BACKLOG.md`
