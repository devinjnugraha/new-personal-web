# NEW-PERSONAL-WEB — Devin Jaya Nugraha Portfolio

Personal portfolio and AI representative site for Devin Jaya Nugraha.
Built with Next.js 15, deployed on Vercel.

## Features

- Single-page portfolio: Education, Experience, Certifications, Research, Writing
- LLM chat interface — an AI representative that answers questions about Devin
- Vercel Analytics + Speed Insights (Core Web Vitals)
- Server Components for all static content (minimal JS shipped)
- Edge Runtime chat API with rate limiting via Vercel KV

## Stack

|               |                                   |
| ------------- | --------------------------------- |
| Framework     | Next.js 15 (App Router)           |
| Language      | TypeScript 5, React 19            |
| Styling       | Tailwind CSS 3                    |
| Animation     | Motion (Framer Motion v11)        |
| Chat / AI     | Vercel AI SDK 4 + OpenRouter      |
| Analytics     | Vercel Analytics + Speed Insights |
| Rate Limiting | Vercel KV                         |
| Deployment    | Vercel                            |

## Getting Started

### Prerequisites

- Node.js ≥ 20
- npm

### Setup

```bash
# 1. Clone
git clone https://github.com/devinjnugraha/new-personal-web.git
cd new-personal-web

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.local.example .env.local
# Fill in OPENROUTER_API_KEY, CHAT_MODEL

# 4. Run dev server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable             | Description                                     |
| -------------------- | ----------------------------------------------- |
| `OPENROUTER_API_KEY` | OpenRouter API key                              |
| `CHAT_MODEL`         | Model string, e.g. `anthropic/claude-haiku-4-5` |

See `.env.local.example` for the full template.

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── api/chat/         # LLM Route Handler
├── components/
│   ├── sections/         # Page sections
│   └── ui/               # Shared UI components
├── data/portfolio.ts     # All content (single source of truth)
├── types/index.ts        # TypeScript types
└── lib/utils.ts          # Utilities
```

## Deployment

Push to `main` → Vercel auto-deploys. Configure environment variables in the
Vercel dashboard under **Settings → Environment Variables**.

## Docs

- `CLAUDE.md` — steering document for AI coding agents
- `docs/specs/` — per-feature specifications
- `docs/skills/` — technical reference for key patterns
