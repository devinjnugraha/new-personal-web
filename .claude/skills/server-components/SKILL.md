# Skill: React Server Components & Component Boundaries

Patterns for correctly splitting Server and Client Components in this project.

---

## The Default: Server Component

Every `.tsx` file in `src/app/` and `src/components/` is a Server Component by default.
No directive needed. Server Components:

- Can `await` data directly (no `useEffect` fetching)
- Run only on the server — zero JS shipped to the browser
- Cannot use hooks (`useState`, `useEffect`, `useRef`, etc.)
- Cannot attach browser event handlers directly

---

## When to Add 'use client'

Add `'use client'` at the top of the file when the component needs:

| Need | Example in this project |
|---|---|
| React state | `Nav.tsx` — scroll position state |
| Browser events | `ChatInterface.tsx` — form submit, input change |
| Refs to DOM | `ChatInterface.tsx` — `useRef` for scroll-to-bottom |
| Third-party hooks | `ChatInterface.tsx` — `useChat` from `ai/react` |
| Browser APIs | `window`, `localStorage`, `navigator` |

---

## Component Map for This Project

```
Server Components (no directive):
  app/layout.tsx       — just renders children + analytics
  app/page.tsx         — assembles sections
  Hero.tsx             — static markup
  About.tsx            — static markup
  Education.tsx        — static markup
  Experience.tsx       — static markup
  Certifications.tsx   — static markup
  Writing.tsx          — static markup
  Timeline.tsx         — pure presentational

Client Components ('use client'):
  Nav.tsx              — scroll state + active section tracking
  ChatInterface.tsx    — useChat hook + DOM refs
```

---

## The Composition Pattern

Pass Server Component output into Client Components as `children`:

```tsx
// ServerParent.tsx (Server Component)
import { ClientShell } from './ClientShell'

export function ServerParent() {
  return (
    <ClientShell>
      <ServerChild />   {/* ✅ Server component as children */}
    </ClientShell>
  )
}
```

```tsx
// ClientShell.tsx
'use client'
import { useState } from 'react'

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return <div onClick={() => setOpen(true)}>{children}</div>
}
```

---

## AnimatedSection Pattern

To add scroll-reveal animation to a Server Component section WITHOUT converting
the whole section to a client component:

```tsx
// components/ui/AnimatedSection.tsx
'use client'
import { motion } from 'motion/react'

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
```

Then in any Server Component section:
```tsx
// About.tsx (Server Component)
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function About() {
  return (
    <AnimatedSection>
      <section id="about">...</section>
    </AnimatedSection>
  )
}
```

---

## Import from motion/react (not framer-motion)

The package was renamed. Always use:
```typescript
import { motion, AnimatePresence } from 'motion/react'
// NOT: import { motion } from 'framer-motion'
```

---

## Avoiding Common Mistakes

```typescript
// ❌ WRONG — using useState in a Server Component
export function BadComponent() {
  const [count, setCount] = useState(0) // Error!
  return <div>{count}</div>
}

// ✅ CORRECT — add 'use client'
'use client'
export function GoodComponent() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}

// ❌ WRONG — importing a Server Component into a Client Component directly
'use client'
import { ServerData } from './ServerData' // Breaks the boundary

// ✅ CORRECT — pass as children from a Server Component
```
