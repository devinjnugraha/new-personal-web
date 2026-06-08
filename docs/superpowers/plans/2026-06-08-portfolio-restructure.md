# Portfolio Restructure — Editor's Cut Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce 8 portfolio sections to 5, rewrite copy with wry personality, and elevate the AI chat to a full section.

**Architecture:** Merge redundant sections (Education+Certs+Research → Proof, Experience+Projects → Work, trim About). All removed content stays in the data layer and AI knowledge base. Components are rewritten in-place where possible, deleted where the section disappears entirely.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Motion

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/data/portfolio.ts` | Add `StrengthCard` data, update tagline/bio, renumber |
| Modify | `src/types/index.ts` | Add `StrengthCard` interface |
| Modify | `src/components/sections/Hero.tsx` | Rewrite hero copy with wry tone |
| Modify | `src/components/sections/About.tsx` | Replace skills grid with strength cards |
| Modify | `src/components/sections/Experience.tsx` | Merge projects into this section, rename to Work |
| Modify | `src/components/sections/Certifications.tsx` | Merge education + research into this section, rename to Proof |
| Modify | `src/components/sections/ChatInterface.tsx` | Rewrite section header and starter prompts |
| Modify | `src/components/ui/Nav.tsx` | Update NAV_ITEMS to 5 sections |
| Modify | `src/app/page.tsx` | Remove deleted section imports, update order |
| Delete | `src/components/sections/Education.tsx` | Absorbed into Proof |
| Delete | `src/components/sections/Projects.tsx` | Absorbed into Work |
| Delete | `src/components/sections/Writing.tsx` | Absorbed into Proof |
| Delete | `src/components/ui/TldrFab.tsx` | Chat is now a full section, no FAB needed |

---

### Task 1: Add `StrengthCard` type and data

**Files:**
- Modify: `src/types/index.ts`
- Modify: `src/data/portfolio.ts`

- [ ] **Step 1: Add StrengthCard interface to types**

In `src/types/index.ts`, add before the `Skills` interface:

```typescript
// ─── Strength Cards ──────────────────────────────────────────────────────────

export interface StrengthCard {
  id: string
  heading: string
  description: string
  skills: string[]
}
```

- [ ] **Step 2: Add StrengthCard to PortfolioData interface**

In `src/types/index.ts`, add `strengths: StrengthCard[]` to the `PortfolioData` interface, between `skills` and `chat`:

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
  projects: Project[]
  skills: Skills
  strengths: StrengthCard[]
  chat: ChatConfig
}
```

- [ ] **Step 3: Add strengths data to portfolio.ts**

In `src/data/portfolio.ts`, add the `strengths` array after the `skills` object and before `chat`. Use wry, understated copy:

```typescript
  strengths: [
    {
      id: 'fullstack',
      heading: 'I build full-stack apps',
      description:
        'React on the frontend, Spring Boot on the backend, deployed before the deadline.',
      skills: ['React', 'Next.js', 'Spring Boot', 'REST APIs', 'TypeScript'],
    },
    {
      id: 'ml-research',
      heading: 'I do ML research',
      description:
        'Published a paper on CNN optimization for glaucoma detection in a Q1 journal. The model sees better than most humans.',
      skills: ['TensorFlow', 'CNN', 'Grad-CAM', 'PyTorch', 'Scikit-learn'],
    },
    {
      id: 'fast-learner',
      heading: 'I learn fast',
      description:
        'Finished a 4-year CS degree in 3.5 years. Picked up AWS and TensorFlow certs along the way.',
      skills: ['AWS', 'TensorFlow', 'Python', 'Docker', 'Google Cloud'],
    },
  ],
```

- [ ] **Step 4: Run type-check**

Run: `npm run type-check`
Expected: PASS (new fields exist but aren't consumed yet — PortfolioData just has more properties)

- [ ] **Step 5: Commit**

```bash
git add src/types/index.ts src/data/portfolio.ts
git commit -m "feat: add StrengthCard type and data for restructured About section"
```

---

### Task 2: Rewrite Hero copy

**Files:**
- Modify: `src/data/portfolio.ts`
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Update tagline and bio in portfolio.ts**

In `src/data/portfolio.ts`, change `person.tagline` and `person.bio`:

```typescript
  person: {
    name: 'Devin Jaya Nugraha',
    initials: 'DJN',
    tagline: 'Software Developer · ML Researcher · Professional Overthinker',
    bio: `Full-stack developer and ML researcher based in Indonesia.
Published in a Q1 journal, certified by AWS and Google, and currently building things for the financial sector.`,
    location: 'Indonesia',
    availability: 'Open to opportunities'
  },
```

- [ ] **Step 2: Run type-check**

Run: `npm run type-check`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/data/portfolio.ts
git commit -m "feat: rewrite hero tagline and bio with wry personality"
```

---

### Task 3: Restructure About section — strength cards

**Files:**
- Modify: `src/components/sections/About.tsx`

- [ ] **Step 1: Rewrite About.tsx to use strength cards**

Replace the entire contents of `src/components/sections/About.tsx`:

```tsx
// Type: Server Component

import { portfolio } from '@/data/portfolio'
import { Badge } from '@/components/ui/Badge'

export function About() {
  const { strengths } = portfolio

  return (
    <section id="about" className="py-section border-t border-border">
      <p className="section-label mb-8">01 / about</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {strengths.map((card) => (
          <div
            key={card.id}
            className="rounded-lg border border-border p-6 hover:border-accent/50 transition-colors"
          >
            <h3 className="font-serif text-lg text-ink mb-2">{card.heading}</h3>
            <p className="text-ink-muted text-sm leading-relaxed mb-4">
              {card.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {card.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Run type-check**

Run: `npm run type-check`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: replace About skills grid with strength cards"
```

---

### Task 4: Merge Experience + Projects → Work section

**Files:**
- Modify: `src/components/sections/Experience.tsx`
- Modify: `src/app/page.tsx` (later, Task 8)

- [ ] **Step 1: Rewrite Experience.tsx as Work section**

Replace the entire contents of `src/components/sections/Experience.tsx`:

```tsx
// Type: Server Component

import { portfolio } from '@/data/portfolio'
import { Timeline } from '@/components/ui/Timeline'
import { ProjectCarousel } from '@/components/sections/ProjectCarousel'

export function Work() {
  const { experience, projects } = portfolio

  return (
    <section id="work" className="py-section border-t border-border">
      <p className="section-label mb-8">02 / work</p>
      <Timeline items={experience} />

      {projects.length > 0 && (
        <>
          <p className="section-label mt-12 mb-6">projects</p>
          <ProjectCarousel projects={projects} />
        </>
      )}
    </section>
  )
}
```

- [ ] **Step 2: Run type-check**

Run: `npm run type-check`
Expected: PASS (exports `Work` instead of `Experience` — page.tsx update happens in Task 8)

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Experience.tsx
git commit -m "feat: merge Experience and Projects into Work section"
```

---

### Task 5: Merge Education + Certifications + Writing → Proof section

**Files:**
- Modify: `src/components/sections/Certifications.tsx`

- [ ] **Step 1: Rewrite Certifications.tsx as Proof section**

Replace the entire contents of `src/components/sections/Certifications.tsx`:

```tsx
// Type: Server Component

import { useState } from 'react'
import Image from 'next/image'
import { portfolio } from '@/data/portfolio'
import { Badge } from '@/components/ui/Badge'
import { TrackedLink } from '@/components/ui/TrackedLink'

const toYear = (iso: string) => new Date(iso).getFullYear().toString()

export function Proof() {
  const { education, certifications, publications, writings, achievements } = portfolio
  const featuredPub = publications.find((p) => p.featured)
  const [expandedPub, setExpandedPub] = useState(false)

  return (
    <section id="proof" className="py-section border-t border-border">
      <p className="section-label mb-8">03 / proof</p>

      {/* Education */}
      <p className="section-label mb-4">education</p>
      <div className="space-y-3 mb-12">
        {education.map((edu) => (
          <div key={edu.id} className="flex items-baseline justify-between flex-wrap gap-2">
            <div>
              <span className="text-ink text-sm font-medium">{edu.institution}</span>
              <span className="text-ink-muted text-sm"> — {edu.degree} in {edu.field}</span>
              {edu.gpa && (
                <span className="text-ink-faint text-xs font-mono ml-2">({edu.gpa.value}/{edu.gpa.scale})</span>
              )}
            </div>
            <span className="font-mono text-xs text-ink-muted shrink-0">{edu.startYear}–{edu.endYear}</span>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <p className="section-label mb-4">certifications</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="rounded-lg border border-border p-4 hover:border-accent/50 transition-colors"
          >
            {cert.badgeUrl && (
              <Image
                src={cert.badgeUrl}
                alt={cert.name}
                width={40}
                height={40}
                unoptimized
                className="h-10 w-auto object-contain mb-2"
              />
            )}
            <p className="text-ink font-medium text-sm leading-snug">{cert.name}</p>
            <p className="text-ink-muted text-xs font-mono mt-0.5">{cert.issuer} · {cert.year}</p>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent text-xs font-mono hover:underline mt-2 inline-block"
              >
                verify ↗
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Research */}
      {featuredPub && (
        <>
          <p className="section-label mb-4">research</p>
          <div className="border border-accent/40 hover:border-accent/60 rounded-lg p-5 mb-10">
            <div className="flex gap-2 flex-wrap items-center mb-2">
              <span className="font-mono text-xs text-accent border border-accent/40 px-2 py-0.5 rounded">
                {featuredPub.quartile}
              </span>
              <span className="font-mono text-xs text-ink-muted">{featuredPub.journalShort}</span>
              <span className="font-mono text-xs text-ink-muted">·</span>
              <span className="font-mono text-xs text-ink-muted">{toYear(featuredPub.publishedDate)}</span>
            </div>
            <h3 className="text-ink font-medium text-sm leading-snug">{featuredPub.title}</h3>
            <p className="text-ink-muted text-xs mt-1 font-mono">{featuredPub.authors.join(', ')}</p>

            {/* Expandable abstract */}
            <button
              onClick={() => setExpandedPub(!expandedPub)}
              className="text-accent text-xs font-mono hover:underline mt-3 inline-block"
            >
              {expandedPub ? 'hide abstract ↑' : 'read abstract ↓'}
            </button>
            {expandedPub && (
              <p className="text-ink-muted text-sm mt-3 leading-relaxed">{featuredPub.abstract}</p>
            )}

            <TrackedLink
              href={featuredPub.url}
              event="publication_clicked"
              eventProps={{ publicationId: featuredPub.id }}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-accent text-sm font-mono hover:underline"
            >
              View on ScienceDirect →
            </TrackedLink>
          </div>
        </>
      )}

      {/* Writings — compact list */}
      {writings.length > 0 && (
        <>
          <p className="section-label mb-4">articles & posts</p>
          <div className="space-y-3 mb-12">
            {writings.map((w) => (
              <a key={w.id} href={w.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <span className="font-mono text-xs text-ink-muted uppercase w-16 shrink-0 mt-0.5">{w.type}</span>
                <span className="text-ink text-sm group-hover:text-accent transition-colors">{w.title}</span>
                {w.publishedDate && <span className="font-mono text-xs text-ink-muted ml-auto shrink-0 mt-0.5">{toYear(w.publishedDate)}</span>}
              </a>
            ))}
          </div>
        </>
      )}

      {/* Achievements — compact list */}
      {achievements.length > 0 && (
        <>
          <p className="section-label mb-4">achievements</p>
          <div className="space-y-2">
            {achievements.map((ach) => (
              <div key={ach.id} className="flex gap-3 items-baseline">
                <span className="font-mono text-accent text-xs">{ach.type === 'competition' ? '★' : '◆'}</span>
                <span className="text-ink text-sm">{ach.title}</span>
                <span className="font-mono text-xs text-ink-faint">{ach.year}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
```

Note: The `useState` for `expandedPub` requires this component to become a client component. Add `'use client'` at the top.

Actually — since `useState` is needed, this must be a client component. But we want to keep server-side rendering for the rest. Split the expandable abstract into a small client component instead.

**Revised approach**: Keep `Proof` as a Server Component. Extract the expandable abstract into a tiny client component.

Create `src/components/ui/ExpandableAbstract.tsx`:

```tsx
'use client'

import { useState } from 'react'

interface ExpandableAbstractProps {
  abstract: string
}

export function ExpandableAbstract({ abstract }: ExpandableAbstractProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-accent text-xs font-mono hover:underline mt-3 inline-block"
      >
        {expanded ? 'hide abstract ↑' : 'read abstract ↓'}
      </button>
      {expanded && (
        <p className="text-ink-muted text-sm mt-3 leading-relaxed">{abstract}</p>
      )}
    </>
  )
}
```

Then `Proof.tsx` stays a Server Component — replace `Certifications.tsx` contents:

```tsx
// Type: Server Component

import Image from 'next/image'
import { portfolio } from '@/data/portfolio'
import { TrackedLink } from '@/components/ui/TrackedLink'
import { ExpandableAbstract } from '@/components/ui/ExpandableAbstract'

const toYear = (iso: string) => new Date(iso).getFullYear().toString()

export function Proof() {
  const { education, certifications, publications, writings, achievements } = portfolio
  const featuredPub = publications.find((p) => p.featured)

  return (
    <section id="proof" className="py-section border-t border-border">
      <p className="section-label mb-8">03 / proof</p>

      {/* Education */}
      <p className="section-label mb-4">education</p>
      <div className="space-y-3 mb-12">
        {education.map((edu) => (
          <div key={edu.id} className="flex items-baseline justify-between flex-wrap gap-2">
            <div>
              <span className="text-ink text-sm font-medium">{edu.institution}</span>
              <span className="text-ink-muted text-sm"> — {edu.degree} in {edu.field}</span>
              {edu.gpa && (
                <span className="text-ink-faint text-xs font-mono ml-2">({edu.gpa.value}/{edu.gpa.scale})</span>
              )}
            </div>
            <span className="font-mono text-xs text-ink-muted shrink-0">{edu.startYear}–{edu.endYear}</span>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <p className="section-label mb-4">certifications</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="rounded-lg border border-border p-4 hover:border-accent/50 transition-colors"
          >
            {cert.badgeUrl && (
              <Image
                src={cert.badgeUrl}
                alt={cert.name}
                width={40}
                height={40}
                unoptimized
                className="h-10 w-auto object-contain mb-2"
              />
            )}
            <p className="text-ink font-medium text-sm leading-snug">{cert.name}</p>
            <p className="text-ink-muted text-xs font-mono mt-0.5">{cert.issuer} · {cert.year}</p>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent text-xs font-mono hover:underline mt-2 inline-block"
              >
                verify ↗
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Research */}
      {featuredPub && (
        <>
          <p className="section-label mb-4">research</p>
          <div className="border border-accent/40 hover:border-accent/60 rounded-lg p-5 mb-10">
            <div className="flex gap-2 flex-wrap items-center mb-2">
              <span className="font-mono text-xs text-accent border border-accent/40 px-2 py-0.5 rounded">
                {featuredPub.quartile}
              </span>
              <span className="font-mono text-xs text-ink-muted">{featuredPub.journalShort}</span>
              <span className="font-mono text-xs text-ink-muted">·</span>
              <span className="font-mono text-xs text-ink-muted">{toYear(featuredPub.publishedDate)}</span>
            </div>
            <h3 className="text-ink font-medium text-sm leading-snug">{featuredPub.title}</h3>
            <p className="text-ink-muted text-xs mt-1 font-mono">{featuredPub.authors.join(', ')}</p>
            <ExpandableAbstract abstract={featuredPub.abstract} />
            <TrackedLink
              href={featuredPub.url}
              event="publication_clicked"
              eventProps={{ publicationId: featuredPub.id }}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-accent text-sm font-mono hover:underline"
            >
              View on ScienceDirect →
            </TrackedLink>
          </div>
        </>
      )}

      {/* Writings */}
      {writings.length > 0 && (
        <>
          <p className="section-label mb-4">articles & posts</p>
          <div className="space-y-3 mb-12">
            {writings.map((w) => (
              <a key={w.id} href={w.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <span className="font-mono text-xs text-ink-muted uppercase w-16 shrink-0 mt-0.5">{w.type}</span>
                <span className="text-ink text-sm group-hover:text-accent transition-colors">{w.title}</span>
                {w.publishedDate && <span className="font-mono text-xs text-ink-muted ml-auto shrink-0 mt-0.5">{toYear(w.publishedDate)}</span>}
              </a>
            ))}
          </div>
        </>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <>
          <p className="section-label mb-4">achievements</p>
          <div className="space-y-2">
            {achievements.map((ach) => (
              <div key={ach.id} className="flex gap-3 items-baseline">
                <span className="font-mono text-accent text-xs">{ach.type === 'competition' ? '★' : '◆'}</span>
                <span className="text-ink text-sm">{ach.title}</span>
                <span className="font-mono text-xs text-ink-faint">{ach.year}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
```

- [ ] **Step 2: Run type-check**

Run: `npm run type-check`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/ExpandableAbstract.tsx src/components/sections/Certifications.tsx
git commit -m "feat: merge Education, Certs, Research into Proof section"
```

---

### Task 6: Elevate Chat section — rewrite header and starters

**Files:**
- Modify: `src/components/sections/ChatInterface.tsx`

- [ ] **Step 1: Rewrite section header and description**

In `src/components/sections/ChatInterface.tsx`, replace lines 284-289 (the section header area):

Current:
```tsx
<section id="chat" className={`py-section border-t border-border${isExpanded ? " invisible" : ""}`}>
    <p className="section-label mb-2">06 / TL;DR</p>
    <p className="text-ink-muted text-sm mb-6">
        Ask my assistant powered by LLM.{" "}
        <span className="text-ink-faint">It reads everything on this page so you don&apos;t have to.</span>
    </p>
```

Replace with:
```tsx
<section id="chat" className={`py-section border-t border-border${isExpanded ? " invisible" : ""}`}>
    <p className="section-label mb-2">04 / still reading?</p>
    <p className="text-ink-muted text-sm mb-2">
      You could&apos;ve just asked. This is Devin&apos;s AI assistant — it knows everything on this page and a bit more.
    </p>
    <p className="text-ink-faint text-xs mb-6">
      Ask about skills, experience, research, certifications, or anything else.
    </p>
```

- [ ] **Step 2: Rewrite starter prompts**

In `src/components/sections/ChatInterface.tsx`, replace lines 135-141 (the starterPrompts array):

Current:
```typescript
const starterPrompts = [
    "Tell me about Devin's ML research",
    "What tech stack does Devin work with?",
    "What are Devin's certifications?",
    "Tell me about Devin's glaucoma detection paper",
];
```

Replace with:
```typescript
const starterPrompts = [
    "What makes Devin different from other devs?",
    "Tell me about the glaucoma paper",
    "What's Devin's tech stack?",
    "Is Devin certified?",
];
```

- [ ] **Step 3: Run type-check**

Run: `npm run type-check`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/ChatInterface.tsx
git commit -m "feat: rewrite Chat section header and starter prompts"
```

---

### Task 7: Update Nav items

**Files:**
- Modify: `src/components/ui/Nav.tsx`

- [ ] **Step 1: Update NAV_ITEMS to 5 sections**

In `src/components/ui/Nav.tsx`, replace lines 10-18:

Current:
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

Replace with:
```typescript
const NAV_ITEMS = [
  { id: 'about', label: '01 about' },
  { id: 'work', label: '02 work' },
  { id: 'proof', label: '03 proof' },
  { id: 'chat', label: '04 chat' },
] as const
```

- [ ] **Step 2: Run type-check**

Run: `npm run type-check`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Nav.tsx
git commit -m "feat: update nav to 5 restructured sections"
```

---

### Task 8: Wire it all together in page.tsx and delete old files

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/components/sections/Education.tsx`
- Delete: `src/components/sections/Projects.tsx`
- Delete: `src/components/sections/Writing.tsx`
- Delete: `src/components/ui/TldrFab.tsx`

- [ ] **Step 1: Update page.tsx imports and section order**

Replace the entire contents of `src/app/page.tsx`:

```tsx
import { Nav } from '@/components/ui/Nav'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Work } from '@/components/sections/Experience'
import { Proof } from '@/components/sections/Certifications'
import { ChatInterface } from '@/components/sections/ChatInterface'
import { portfolio } from '@/data/portfolio'
import { generateSchema } from '@/lib/schema'
import { appConfig } from '@/lib/app-config'

export default function Home() {
  const schema = generateSchema(portfolio, appConfig.getSiteUrl())

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav />
      <main className="mx-auto max-w-content px-6">
        <Hero />
        <About />
        <Work />
        <Proof />
        <ChatInterface />
      </main>
      <footer className="mx-auto max-w-content px-6 py-16 border-t border-border mt-8">
        <div className="text-sm font-mono">
          <p className="text-ink-muted">© {new Date().getFullYear()} Devin Jaya Nugraha</p>
          <div className="mt-6 text-ink-faint space-y-2">
            <p>
              Vibed using{' '}
              <a href="https://claude.com/product/claude-code" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-accent-light transition-colors">Claude Code↗</a>{' '}
              &{' '}
              <a href="https://z.ai/subscribe" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-accent-light transition-colors">GLM↗</a>
            </p>
            <p>
              Built with{' '}
              <a href="https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-accent-light transition-colors">AI-DLC methodology↗</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
```

Key changes: imports `Work` from `Experience.tsx`, `Proof` from `Certifications.tsx`, removes `TldrFab`, removes `Education`/`Projects`/`Writing` imports.

- [ ] **Step 2: Delete old section files**

```bash
rm src/components/sections/Education.tsx
rm src/components/sections/Projects.tsx
rm src/components/sections/Writing.tsx
rm src/components/ui/TldrFab.tsx
```

- [ ] **Step 3: Run type-check**

Run: `npm run type-check`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: wire restructured sections into page, remove old files"
```

---

### Task 9: Clean up unused imports and verify build

**Files:**
- Potentially: `src/data/portfolio.ts` or other files if type-check reveals issues

- [ ] **Step 1: Run type-check**

Run: `npm run type-check`
Expected: PASS

If it fails, fix the specific errors (unused imports, missing exports, etc.).

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS

If it fails, fix lint errors.

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve type-check and lint errors from restructure"
```

(Only if fixes were needed)

- [ ] **Step 4: Final commit — plan complete marker**

```bash
git commit --allow-empty -m "chore: portfolio restructure implementation complete"
```

---

## Self-Review

**Spec coverage:**
- Hero personality statement → Task 2 (tagline + bio rewrite)
- About strength cards → Task 1 (types + data) + Task 3 (component)
- Work section (merge Experience + Projects) → Task 4
- Proof section (merge Education + Certs + Research) → Task 5
- Chat elevation (header + starters) → Task 6
- Nav update → Task 7
- Page wiring + file cleanup → Task 8
- All sections accounted for.

**Placeholder scan:** No TBDs, TODOs, or vague steps. All code is complete.

**Type consistency:**
- `StrengthCard` interface matches usage in About.tsx and portfolio.ts
- `Work` export from Experience.tsx matches page.tsx import
- `Proof` export from Certifications.tsx matches page.tsx import
- All props (`abstract`, `projects`, `experience`) match their types
