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

## Tech Stack

| Layer         | Choice                                         | Version   |
| ------------- | ---------------------------------------------- | --------- |
| Framework     | Next.js (App Router)                           | `^15.0.0` |
| Language      | TypeScript                                     | `^5.0.0`  |
| Runtime       | React                                          | `^19.0.0` |
| Styling       | Tailwind CSS                                   | `^3.4.0`  |
| Animation     | Motion (Framer Motion)                         | `^11.0.0` |
| AI/Chat       | Vercel AI SDK                                  | `^4.0.0`  |
| LLM Provider  | OpenRouter via `@ai-sdk/openai`                | `^1.0.0`  |
| Analytics     | `@vercel/analytics` + `@vercel/speed-insights` | latest    |
| Rate Limiting | `@vercel/kv`                                   | `^3.0.0`  |
| Deployment    | Vercel                                         | —         |

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
- Rate limit: Check IP against Vercel KV before calling LLM. Limit: 20 messages/hour/IP.
- System prompt: Lives in `src/app/api/chat/route.ts` as a `SYSTEM_PROMPT` constant.
- The system prompt MUST be factually accurate — see `src/data/portfolio.ts` for source of truth.
- Frontend: `useChat({ api: '/api/chat' })` from `ai/react`. Never manually handle streaming.

---

## Environment Variables

All secrets are server-side only. None are prefixed with `NEXT_PUBLIC_`.

| Variable             | Required | Description                                    |
| -------------------- | -------- | ---------------------------------------------- |
| `OPENROUTER_API_KEY` | Yes      | OpenRouter API key                             |
| `CHAT_MODEL`         | Yes      | Model string e.g. `anthropic/claude-haiku-4-5` |
| `KV_REST_API_URL`    | Yes      | Vercel KV endpoint for rate limiting           |
| `KV_REST_API_TOKEN`  | Yes      | Vercel KV auth token                           |

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
pnpm install          # install deps
pnpm dev              # start dev server with Turbopack
pnpm build            # production build
pnpm type-check       # run tsc --noEmit without building
pnpm lint             # run ESLint
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
