# Projects Section Carousel — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Projects" section with an infinite image carousel (3 projects, 5:3 screenshots, arrow navigation) after the Experience section.

**Architecture:** Server component shell (`Projects.tsx`) wraps a client component (`ProjectCarousel.tsx`) that handles carousel state, Motion animations, pointer-event drag/swipe, and Lucide arrow navigation. Data lives in `portfolio.ts` with a new `Project` type.

**Tech Stack:** Next.js Image, Motion (`AnimatePresence`), Lucide React (`ChevronLeft`/`ChevronRight`), pointer events for touch/drag.

**Issue:** BACKLOG-013
**Design doc:** `docs/superpowers/specs/2026-06-07-projects-carousel-design.md`

---

### Task 1: Add `Project` type and `projects` data

**Files:**
- Modify: `src/types/index.ts` (add `Project` interface, add to `PortfolioData`)
- Modify: `src/data/portfolio.ts` (add `projects` field + placeholder entries)
- Modify: `next.config.ts` (add image remote pattern for project image host)

- [ ] **Step 1: Add `Project` interface to `src/types/index.ts`**

Add after the `Writing` section (after line 139) and before the `Skills` section:

```typescript
// ─── Projects ──────────────────────────────────────────────────────────────────

export interface Project {
  title: string
  image: string  // URL to 5:3 landscape screenshot
  url: string    // external project link (target _blank)
}
```

Add `projects: Project[]` to the `PortfolioData` interface (after the `writings` field, line 168):

```typescript
export interface PortfolioData {
  person: Person
  links: Links
  education: Education[]
  experience: Experience[]
  certifications: Certification[]
  achievements: Achievement[]
  publications: Publication[]
  writings: Writing[]
  projects: Project[]  // <-- add this
  skills: Skills
  chat: ChatConfig
}
```

- [ ] **Step 2: Add 3 placeholder projects to `src/data/portfolio.ts`**

Add the `projects` array to the `portfolio` export (after `writings`, before `skills`, around line 417). Use placeholder image URLs and URLs:

```typescript
  projects: [
    {
      title: 'Personal Portfolio',
      image: '/placeholder-project.svg',
      url: 'https://github.com/devinjnugraha',
    },
    {
      title: 'Glaucoma Detection CNN',
      image: '/placeholder-project.svg',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0010482525012260',
    },
    {
      title: 'Stock Monitoring Dashboard',
      image: '/placeholder-project.svg',
      url: '#',
    },
  ],
```

Also create a minimal placeholder SVG at `public/placeholder-project.svg` (a simple gray rectangle with "Project Screenshot" text) so the carousel renders without broken images.

- [ ] **Step 3: Update `next.config.ts` image remote patterns**

When real project image URLs are added (e.g. from GitHub, Imgur, or custom domain), the corresponding hostname must be added to `remotePatterns`. For now, the local `/placeholder-project.svg` path works without remote patterns. **Skip this step until real image URLs are provided.**

- [ ] **Step 4: Run type-check**

Run: `npm run type-check`
Expected: PASS (no errors)

- [ ] **Step 5: Commit**

```bash
git add src/types/index.ts src/data/portfolio.ts public/placeholder-project.svg
git commit -m "feat: add Project type and placeholder data for projects section"
```

---

### Task 2: Create `ProjectCarousel` client component

**Files:**
- Create: `src/components/sections/ProjectCarousel.tsx`

- [ ] **Step 1: Create `ProjectCarousel.tsx`**

```tsx
'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Project } from '@/types'

interface ProjectCarouselProps {
  projects: Project[]
}

const SLIDE_DIRECTION = { left: -1, right: 1 } as const

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [dragX, setDragX] = useState(0)

  const goTo = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir)
      setDragX(0)
      setCurrentIndex((prev) => (prev + dir + projects.length) % projects.length)
    },
    [projects.length],
  )

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    setDragX(0)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    setDragX(e.movementX)
  }, [])

  const handlePointerUp = useCallback(() => {
    if (Math.abs(dragX) > 50) {
      goTo(dragX > 0 ? 1 : -1)
    } else {
      setDragX(0)
    }
  }, [dragX, goTo])

  const current = projects[currentIndex]

  return (
    <div className="relative flex items-center gap-2 md:gap-4">
      {/* Left arrow */}
      <button
        onClick={() => goTo(SLIDE_DIRECTION.right)}
        className="shrink-0 text-ink-faint hover:text-ink transition-colors"
        aria-label="Previous project"
      >
        <ChevronLeft size={24} className="md:w-7 md:h-7" />
      </button>

      {/* Carousel viewport */}
      <div
        className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.a
            key={currentIndex}
            href={current.url}
            target="_blank"
            rel="noopener noreferrer"
            custom={direction}
            initial={{ x: direction * 300, opacity: 0 }}
            animate={{ x: dragX, opacity: 1 }}
            exit={{ x: -direction * 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="block"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 50) {
                goTo(info.offset.x > 0 ? 1 : -1)
              }
            }}
          >
            <div className="aspect-[5/3] relative overflow-hidden rounded-lg border border-border">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                unoptimized={current.image.endsWith('.svg')}
              />
            </div>
            <p className="mt-3 text-ink font-serif text-lg md:text-xl text-center hover:text-accent transition-colors">
              {current.title}
            </p>
          </motion.a>
        </AnimatePresence>
      </div>

      {/* Right arrow */}
      <button
        onClick={() => goTo(SLIDE_DIRECTION.left)}
        className="shrink-0 text-ink-faint hover:text-ink transition-colors"
        aria-label="Next project"
      >
        <ChevronRight size={24} className="md:w-7 md:h-7" />
      </button>
    </div>
  )
}
```

Key behaviors:
- Infinite loop: `(prev + dir + projects.length) % projects.length`
- Arrow buttons use Lucide `ChevronLeft`/`ChevronRight`, no border, muted color brightens on hover
- `AnimatePresence` with spring animation for slide transitions
- Motion `drag="x"` for touch/swipe on mobile, with 50px threshold
- Card links entire image + title to project URL in new tab
- `aspect-[5/3]` enforces 5:3 ratio
- Next.js `Image` with `fill` + `object-cover`, `unoptimized` for SVGs

- [ ] **Step 2: Run type-check**

Run: `npm run type-check`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ProjectCarousel.tsx
git commit -m "feat: add ProjectCarousel client component with infinite loop and drag"
```

---

### Task 3: Create `Projects` server section component

**Files:**
- Create: `src/components/sections/Projects.tsx`

- [ ] **Step 1: Create `Projects.tsx`**

```tsx
// SPEC: docs/superpowers/specs/2026-06-07-projects-carousel-design.md
// Type: Server Component

import { portfolio } from '@/data/portfolio'
import { ProjectCarousel } from '@/components/sections/ProjectCarousel'

export function Projects() {
  const { projects } = portfolio

  if (projects.length === 0) return null

  return (
    <section id="projects" className="py-section border-t border-border">
      <p className="section-label mb-8">04 / projects</p>
      <ProjectCarousel projects={projects} />
    </section>
  )
}
```

Follows existing section pattern: server component shell, passes data to client carousel, conditional render if empty.

- [ ] **Step 2: Run type-check**

Run: `npm run type-check`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "feat: add Projects server section component"
```

---

### Task 4: Wire up — page, nav, and section numbering

**Files:**
- Modify: `src/app/page.tsx` (import + render `<Projects />`)
- Modify: `src/components/ui/Nav.tsx` (add nav item, renumber)

- [ ] **Step 1: Update `src/app/page.tsx`**

Add import (after line 6):

```typescript
import { Projects } from '@/components/sections/Projects'
```

Add `<Projects />` after `<Experience />` (after line 29):

```tsx
<Experience />
<Projects />
<Certifications />
```

- [ ] **Step 2: Update `src/components/ui/Nav.tsx`**

Change `NAV_ITEMS` (lines 10-17) to:

```typescript
const NAV_ITEMS = [
  { id: 'about', label: '01 about' },
  { id: 'education', label: '02 education' },
  { id: 'experience', label: '03 experience' },
  { id: 'projects', label: '04 projects' },
  { id: 'certifications', label: '05 certs' },
  { id: 'writing', label: '06 research' },
  { id: 'chat', label: '07 tl;dr' },
] as const
```

Also update the Certifications section label in `src/components/sections/Certifications.tsx` line 15 from `04 / certifications & achievements` to `05 / certifications & achievements`.

- [ ] **Step 3: Run type-check**

Run: `npm run type-check`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/components/ui/Nav.tsx src/components/sections/Certifications.tsx
git commit -m "feat: wire Projects section into page and nav, renumber sections"
```

---

### Task 5: Visual verification

**Files:**
- None (verification only)

- [ ] **Step 1: Start dev server and verify in browser**

Run: `npm run dev`

Check:
1. Projects section appears after Experience on scroll
2. Nav shows "04 projects" and highlights correctly on scroll
3. Carousel shows one card at a time, centered
4. Left/right arrows navigate between projects
5. Clicking arrow past last project wraps to first (infinite loop)
6. Image maintains 5:3 aspect ratio
7. Title below image is clickable and opens in new tab
8. Touch/drag works on mobile (or responsive mode in DevTools)
9. Subsequent sections (Certifications = 05, Writing = 06, TL;DR = 07) display correct labels

- [ ] **Step 2: Fix any issues found during verification**

- [ ] **Step 3: Final commit if any fixes were needed**

```bash
git add -u
git commit -m "fix: address visual issues from Projects section review"
```
