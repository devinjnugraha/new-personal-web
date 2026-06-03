# Skill: Next.js 15 App Router Patterns

Reference for the most important Next.js 15 patterns used in this project.
Read this before implementing any `app/` directory code.

---

## Async params (BREAKING CHANGE from v14)

`params` and `searchParams` are now Promises in Next.js 15.

```typescript
// Page with dynamic segment
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div>{slug}</div>
}

// generateMetadata also needs await
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return { title: slug }
}
```

---

## Async cookies and headers

```typescript
import { cookies, headers } from 'next/headers'

// In Server Component or Route Handler:
const cookieStore = await cookies()
const token = cookieStore.get('token')?.value

const heads = await headers()
const ip = heads.get('x-forwarded-for')
```

---

## Route Handler (API Routes)

```typescript
// src/app/api/example/route.ts
export const runtime = 'edge' // optional but recommended

export async function GET(_req: Request) {
  return Response.json({ ok: true })
}

export async function POST(req: Request) {
  const body = await req.json()
  return Response.json({ received: body })
}
```

---

## Server vs Client Components

```typescript
// Server Component (default — no directive needed)
export default async function ServerComp() {
  const data = await fetchData() // direct async OK
  return <div>{data}</div>
}

// Client Component (opt-in)
'use client'
import { useState } from 'react'

export default function ClientComp() {
  const [count, setCount] = useState(0) // hooks OK
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

**Rules:**
- Server Components can import Client Components ✅
- Client Components CANNOT import Server Components — pass as `children` prop instead
- `'use client'` marks the boundary; all imports below it are also client-side

---

## next/font

```typescript
import { DM_Sans } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

// Apply to <html> in layout.tsx:
<html className={`${dmSans.variable} ${GeistMono.variable}`}>
```

---

## Metadata

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: { title: 'OG Title', description: '...', type: 'website' },
}
```

---

## after() — Post-Response Work

```typescript
import { after } from 'next/server'

export async function POST(req: Request) {
  const result = streamText({ ... })

  after(async () => {
    // Non-blocking — runs after response is sent
    await logToDatabase()
  })

  return result.toDataStreamResponse()
}
```

---

## fetch() Caching (default changed in v15)

```typescript
// NOT cached by default (changed in v15):
const data = await fetch('https://api.example.com/data')

// Cached indefinitely (opt-in):
const data = await fetch(url, { cache: 'force-cache' })

// Revalidate every hour:
const data = await fetch(url, { next: { revalidate: 3600 } })
```

---

## Turbopack Dev Server

```json
// package.json
"dev": "next dev --turbopack"
```

Turbopack is stable in Next.js 15 for development. Do NOT use `--turbopack`
in the `build` script — Webpack is still used for production builds.
