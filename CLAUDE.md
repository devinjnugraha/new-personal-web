# CLAUDE.md — NEW-PERSONAL-WEB Project Steering Document

This file is the authoritative guide for any AI coding agent working on this codebase.
Read this entire file before writing any code. Do not skip sections.

---

## Project Overview

**NEW-PERSONAL-WEB** is the personal portfolio and AI representative site for **Devin Jaya Nugraha**,
a software developer and ML researcher based in Indonesia. The site is a Next.js 15 application
deployed on Vercel. It is a single-page portfolio with a live LLM chat interface that acts as
an AI representative of Devin, answering visitor questions about his background.

**Live domain target:** `devinjnugraha.vercel.app` (or custom domain TBD)
**Repo:** `github.com/devinjnugraha/new-personal-web`

---

## AI-DLC Methodology (MANDATORY)

The **Artificial Intelligence Development Life Cycle (AI-DLC)** is the mandatory workflow that ALL agents
MUST follow when building any new feature or making non-trivial changes in this codebase. AI transitions
from a passive autocomplete tool into an active process orchestrator within a circular human-in-the-loop
validation model.

**The lifecycle progresses linearly through four phases. EVERY phase must be completed before proceeding.**

```
[Specs] ──► [Design] ──► [Task List] ──► [Define & Code]
```

### Phase 1: Specs (Requirements)

Process the natural language request and auto-generate:
- **Agile user stories** — "As a [user], I want [goal] so that [benefit]"
- **Strict Given-When-Then acceptance criteria** — each story must have testable, unambiguous conditions

Output is a written spec (add to `docs/specs/` if a new feature, or reference existing SPEC file).

### Phase 2: Design

Translate requirements into:
- **Software entity relationships** — data models, type definitions, interfaces
- **Service classes and module responsibilities** — which components handle what
- **Architecture schemas** — component hierarchy, API contracts, data flow diagrams

Output is a written design document with clear file paths and type signatures.

### Phase 3: Task List

Decompose the design into discrete, ordered development tasks:
- Each task is a single, completable unit of work (one file, one function, one component)
- Tasks are numbered and sequenced with explicit dependencies
- Each task links back to the acceptance criteria it satisfies
- Tasks are tracked and checked off before proceeding to the next

Output is a numbered task list that the agent follows sequentially.

### Phase 4: Define & Code

Execute implementation under developer supervision:
- Write code that satisfies the task requirements
- Generate type definitions, component code, API routes, and configurations
- Provision or configure infrastructure as needed
- Run `npm run type-check` and `npm run build` to validate after each logical group of changes
- The human reviews and validates each phase gate before the agent proceeds

### Compliance Rules

1. **NEVER skip phases.** Even for small features, produce a minimal spec and task list before coding.
2. **NEVER write code before completing Phase 1–3.** The agent must have written requirements and a task list before any file is created or modified.
3. **Human-in-the-loop validation is required** at every phase gate. The agent presents its output and waits for approval before advancing.
4. **If requirements change mid-cycle**, restart from Phase 1 with the updated understanding.
5. **This methodology applies to ALL new feature work**, regardless of size. Bug fixes may skip to Phase 4 if the fix is trivial (single-line change), but must still be documented.

---

## Tech Stack

| Layer          | Choice                                         | Version    |
| -------------- | ---------------------------------------------- | ---------- |
| Framework      | Next.js (App Router)                           | `^15.5.19` |
| Language       | TypeScript                                     | `^5.0.0`   |
| Runtime        | React                                          | `^19.0.0`  |
| Styling        | Tailwind CSS                                   | `^3.4.0`   |
| Animation      | Motion (Framer Motion)                         | `^11.0.0`  |
| AI/Chat        | Vercel AI SDK (`ai`)                           | `^6.0.195` |
| AI/Chat React  | Vercel AI SDK React (`@ai-sdk/react`)          | `^3.0.197` |
| LLM Provider   | OpenRouter via `@ai-sdk/openai`                | `^3.0.67`  |
| Analytics      | `@vercel/analytics` + `@vercel/speed-insights` | latest     |
| Deployment     | Vercel                                         | —          |

---

## Critical Next.js 15 Rules

These are **breaking changes** from Next.js 14. Violating them causes runtime errors.

### 1. `params` and `searchParams` are Promises

```typescript
// WRONG — Next.js 14 style
export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
}

// CORRECT — Next.js 15
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
}
```

### 2. `cookies()` and `headers()` are async

```typescript
import { cookies, headers } from "next/headers";

// CORRECT
const cookieStore = await cookies();
const headersList = await headers();
```

### 3. `fetch()` is NOT cached by default

```typescript
// Cached (opt-in):
fetch(url, { cache: "force-cache" });
fetch(url, { next: { revalidate: 3600 } });

// Not cached (default in Next.js 15):
fetch(url); // fresh every request
```

### 4. Turbopack for dev

```bash
# Always use --turbopack for local dev (configured in package.json scripts)
next dev --turbopack
```

### 5. `useFormState` is removed

Use `useActionState` from React 19 instead. This project doesn't use forms heavily but note this.

---

## Directory Structure

```
new-personal-web/
├── CLAUDE.md                         ← You are here
├── README.md
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── .env.local.example
├── docs/
│   ├── specs/                        ← One file per feature/section spec
│   │   ├── SPEC-001-overview.md
│   │   ├── SPEC-002-layout-navigation.md
│   │   ├── SPEC-003-hero.md
│   │   ├── SPEC-004-about.md
│   │   ├── SPEC-005-education.md
│   │   ├── SPEC-006-experience.md
│   │   ├── SPEC-007-certifications.md
│   │   ├── SPEC-008-writing.md
│   │   ├── SPEC-009-chat-interface.md
│   │   ├── SPEC-010-chat-api.md
│   │   └── SPEC-011-analytics.md
│   └── skills/                       ← Technical reference for key patterns
│       ├── nextjs15.md
│       ├── vercel-ai-sdk.md
│       ├── server-components.md
│       └── styling.md
└── src/
    ├── app/
    │   ├── layout.tsx                ← Root layout: fonts, Analytics, SpeedInsights
    │   ├── page.tsx                  ← Home page: imports all section components
    │   ├── globals.css               ← Tailwind directives + CSS custom properties
    │   └── api/
    │       └── chat/
    │           └── route.ts          ← LLM stream endpoint (Edge Runtime)
    ├── components/
    │   ├── sections/                 ← Page sections (mostly Server Components)
    │   │   ├── Hero.tsx
    │   │   ├── About.tsx
    │   │   ├── Education.tsx
    │   │   ├── Experience.tsx
    │   │   ├── Certifications.tsx
    │   │   ├── Writing.tsx
    │   │   └── ChatInterface.tsx     ← 'use client' — useChat hook
    │   └── ui/
    │       ├── Nav.tsx               ← 'use client' — scroll-aware
    │       └── Timeline.tsx
    ├── data/
    │   └── portfolio.ts              ← All of Devin's content as typed TS objects
    ├── lib/
    │   └── utils.ts                  ← cn() and shared utilities
    └── types/
        └── index.ts                  ← Shared TypeScript types
```

---

## Server vs Client Components

**Default is Server Component.** Only add `'use client'` when the component needs:

- Browser APIs (`window`, `localStorage`, etc.)
- React hooks that require client state (`useState`, `useEffect`, `useRef`)
- Event handlers that need interactivity
- Third-party libraries that are client-only

| Component            | Type       | Reason                                |
| -------------------- | ---------- | ------------------------------------- |
| `app/layout.tsx`     | Server     | Root layout, just renders providers   |
| `app/page.tsx`       | Server     | Assembles sections                    |
| `Hero.tsx`           | Server     | Static content                        |
| `About.tsx`          | Server     | Static content                        |
| `Education.tsx`      | Server     | Static content                        |
| `Experience.tsx`     | Server     | Static content                        |
| `Certifications.tsx` | Server     | Static content                        |
| `Writing.tsx`        | Server     | Static content                        |
| `ChatInterface.tsx`  | **Client** | `useChat` hook, user input            |
| `Nav.tsx`            | **Client** | Scroll state, active section tracking |
| `Timeline.tsx`       | Server     | Pure presentational                   |

---

## Styling Conventions

- Use **Tailwind utility classes** exclusively. No inline styles except where Tailwind cannot express the value.
- Use the `cn()` utility from `@/lib/utils` for conditional class merging (`clsx` + `tailwind-merge`).
- CSS custom properties for the design tokens (accent color, fonts) are defined in `globals.css`.
- **Color palette:**
    - Background: `bg-[#0D0D0D]` (near-black)
    - Surface: `bg-[#161616]`
    - Border: `border-[#2A2A2A]`
    - Text primary: `text-[#F0F0EC]`
    - Text muted: `text-[#888880]`
    - Accent: `text-[#1D9E75]` / `bg-[#1D9E75]`
- **Typography:**
    - Display (hero name only): Playfair Display via `font-serif`
    - Body: DM Sans via `font-sans`
    - Labels/mono: Geist Mono via `font-mono`
- **Dark mode**: The site is dark-by-default. No light mode toggle is planned in v1.
- Section labels use monospace uppercase with letter-spacing: `font-mono text-xs uppercase tracking-widest text-[#888880]`

---

## Animation Conventions

Import from `motion/react` (not `framer-motion`):

```typescript
import { motion } from "motion/react";
```

- Use scroll-triggered `whileInView` reveals for section entries.
- Standard reveal: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}` with `transition={{ duration: 0.5 }}`.
- Stagger children with `variants` and `staggerChildren: 0.1`.
- Do NOT add animation to every element. Animate section containers, not individual text lines.
- Wrap animated sections in a `motion.div` — do not convert the entire component to client just for animation. Use a separate `AnimatedSection` wrapper client component if needed.

---

## Chat API Conventions

- Endpoint: `POST /api/chat`
- Runtime: **Edge** (`export const runtime = 'edge'`)
- Streaming: Use `streamText` from `ai` and return `result.toDataStreamResponse()`
- Provider: OpenRouter via `createOpenAI` with custom `baseURL`
- Model: Controlled by `process.env.CHAT_MODEL` env var (never hardcoded)
- Rate limit: Planned — not yet implemented (no `@vercel/kv` dependency installed).
- System prompt: Lives in `src/app/api/chat/route.ts` as a `SYSTEM_PROMPT` constant.
- The system prompt MUST be factually accurate — see `src/data/portfolio.ts` for source of truth.
- Frontend: `useChat({ api: '/api/chat' })` from `@ai-sdk/react`. Never manually handle streaming.

---

## Environment Variables

All secrets are server-side only. None are prefixed with `NEXT_PUBLIC_`.

| Variable             | Required | Description                                    |
| -------------------- | -------- | ---------------------------------------------- |
| `OPENROUTER_API_KEY` | Yes      | OpenRouter API key                             |
| `CHAT_MODEL`         | Yes      | Model string e.g. `anthropic/claude-sonnet-4-6` |

See `.env.local.example` for template.

---

## Data Source of Truth

All of Devin's content is in `src/data/portfolio.ts` as typed TypeScript objects.
Section components import from this file — they do NOT hardcode content inline.
If content needs updating, only `portfolio.ts` changes.

---

## Import Aliases

`@/*` maps to `./src/*` (configured in `tsconfig.json`).

```typescript
// Always use alias imports
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types";
```

---

## Code Quality Rules

- **No `any` types.** Use `unknown` and narrow, or define proper types in `src/types/index.ts`.
- **No unused imports.** ESLint will catch these.
- **Async Server Components** — always `async function` for Server Components that read data.
- **Error boundaries** — wrap `ChatInterface` in an error boundary.
- **Accessibility** — all interactive elements need `aria-label` or visible text. Images need `alt`.
- **No hardcoded URLs** — external links live in `portfolio.ts` under the `links` object.

---

## Build & Dev Commands

```bash
npm install          # install deps
npm run dev          # start dev server with Turbopack
npm run build        # production build
npm run type-check   # run tsc --noEmit without building
npm run lint         # run ESLint
```

---

## Spec Files Index

Before implementing any feature, read its spec file in `docs/specs/`. Each spec is the
authoritative requirement. If something is unclear in a spec, implement the most
reasonable interpretation and add a TODO comment for review.

| Spec     | Feature                                  |
| -------- | ---------------------------------------- |
| SPEC-001 | Project overview and global requirements |
| SPEC-002 | Layout and navigation                    |
| SPEC-003 | Hero section                             |
| SPEC-004 | About + Skills section                   |
| SPEC-005 | Education section                        |
| SPEC-006 | Experience section                       |
| SPEC-007 | Certifications + Achievements section    |
| SPEC-008 | Writing + Publication section            |
| SPEC-009 | Chat interface (frontend)                |
| SPEC-010 | Chat API route handler (backend)         |
| SPEC-011 | Analytics and monitoring                 |
