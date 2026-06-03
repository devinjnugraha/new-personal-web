# Skill: Styling — Tailwind CSS & Motion

Conventions for Tailwind utility classes and Motion animations in this project.

---

## Core Utility: cn()

Always use `cn()` from `@/lib/utils` for conditional classes:

```typescript
import { cn } from '@/lib/utils'

// Usage:
<div className={cn(
  'base-class always-applied',
  isActive && 'text-accent',
  variant === 'outline' ? 'border border-border' : 'bg-background-surface',
)}>
```

Never use template literals for conditional Tailwind classes — `twMerge` can't
resolve conflicts in template strings.

---

## Design Token Classes

These custom tokens are defined in `tailwind.config.ts`:

```
Background:
  bg-background          #0D0D0D  (page bg)
  bg-background-surface  #161616  (cards)
  bg-background-elevated #1E1E1E  (chat bubbles, nested)

Borders:
  border-border          #2A2A2A  (default)
  border-border-subtle   #222222
  border-border-strong   #3A3A3A

Text:
  text-ink               #F0F0EC  (primary)
  text-ink-muted         #888880  (secondary)
  text-ink-faint         #555550  (disabled, placeholder)

Accent (teal):
  text-accent            #1D9E75
  bg-accent              #1D9E75
  bg-accent-faint        #0D2920  (accent background tint)
  border-accent/40       (with opacity modifier)
```

---

## Typography Classes

```
font-serif    → Playfair Display (display text only — hero name)
font-sans     → DM Sans (default body)
font-mono     → Geist Mono (labels, tags, code)
```

Heading sizes used in this project:
```
Hero name:    text-5xl md:text-7xl font-serif
Section h2:   text-2xl font-serif       (if needed)
Card title:   text-sm font-medium
Labels:       text-xs font-mono uppercase tracking-widest
```

---

## Section Label Pattern

Every section uses this exact pattern for its label:

```tsx
<p className="section-label mb-8">01 / about</p>

// .section-label is defined in globals.css:
// @apply font-mono text-xs uppercase tracking-widest text-ink-muted;
```

---

## Card Pattern

```tsx
<div className="border border-border rounded-lg p-6 bg-background-surface">
  {/* card content */}
</div>

// Hover variant:
<div className="border border-border rounded-lg p-5 bg-background-surface
                hover:border-border-strong transition-colors">
```

---

## Pill / Tag Pattern

```tsx
// Skill tag:
<span className="font-mono text-xs text-ink-muted border border-border px-2 py-1 rounded">
  Python
</span>

// Accent badge:
<span className="font-mono text-xs text-accent border border-accent/30 px-2 py-0.5 rounded">
  Q1
</span>
```

---

## Section Spacing

```
py-section   → py-24 (6rem) — vertical padding for each section
border-t border-border → separator between sections (except hero)
max-w-content px-6    → applied to <main> in page.tsx
```

---

## Motion (Framer Motion v11) — Import Path

```typescript
import { motion, AnimatePresence } from 'motion/react'
// Package is now 'motion', not 'framer-motion'
```

---

## Standard Scroll Reveal

Wrap sections in `AnimatedSection` (see `docs/skills/server-components.md`):

```tsx
// AnimatedSection.tsx
'use client'
import { motion } from 'motion/react'

export function AnimatedSection({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}
```

---

## Stagger Children Pattern

```tsx
'use client'
import { motion } from 'motion/react'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function StaggerList({ items }) {
  return (
    <motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {items.map((i) => (
        <motion.li key={i.id} variants={item}>
          {i.content}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

---

## CSS Animations (no JS needed)

For the blinking cursor (Hero) and other simple loops, use Tailwind keyframes
defined in `tailwind.config.ts`:

```
animate-blink  → blinks opacity 1→0 on 1s step-end loop
animate-bounce → built-in Tailwind (scroll indicator)
```

Use CSS animations for anything that loops infinitely — saves React overhead.
