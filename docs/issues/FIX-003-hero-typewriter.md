# FIX-003: Hero Name Typewriter Animation

**Source:** BACKLOG-003
**Status:** Phase 4 — Code
**Created:** 2026-06-06

---

## Phase 1 — Spec

### User Story

> As a visitor landing on the page, I want to see the site owner's name typed out character-by-character with a blinking cursor, so that I get a memorable, developer-themed first impression.

### Acceptance Criteria

**AC-1: Typewriter on first land**
- **Given** a visitor loads the page for the first time (fresh navigation)
- **When** the Hero section becomes visible
- **Then** the name "Devin Jaya Nugraha" is typed out one character at a time starting from an empty state
- **And** the blinking cursor (`_`) follows the last typed character during the animation
- **And** the animation plays exactly once per page load

**AC-2: Typing speed and feel**
- **Given** the typewriter animation is active
- **When** characters are being typed
- **Then** each character appears at a consistent rate of ~70–100ms per character
- **And** there is no artificial delay before the animation starts (or at most 300ms)

**AC-3: Cursor behavior after animation**
- **Given** the typewriter animation has completed (all characters visible)
- **When** the full name is displayed
- **Then** the blinking cursor continues blinking at the end of the name (current behavior preserved)

**AC-4: No layout shift**
- **Given** the typewriter animation is in progress
- **When** characters are being revealed
- **Then** the text width grows incrementally without causing any layout shift or CLS

**AC-5: Server Component preservation**
- **Given** the project uses React Server Components
- **Then** only the minimum part of Hero that needs client interactivity (the animated name) uses `'use client'`
- **And** the rest of Hero remains a Server Component

### Scope Boundary

**In scope:**
- Name typewriter animation in Hero section
- Blinking cursor integration with typewriter
- Client component extraction for the animated portion

**Out of scope:**
- Animating other Hero elements (tagline, bio, CTAs)
- Scroll-triggered replay of the animation
- Sound effects or additional visual effects
- Changing animation speed/timing after initial implementation

---

## Phase 2 — Design

### New File: `src/components/ui/TypewriterText.tsx`

**Directive:** `'use client'`
**Responsibility:** Renders text character-by-character with a blinking cursor suffix. Self-contained — no external animation libraries needed.

**Props:**
```typescript
interface TypewriterTextProps {
  text: string;        // Full text to type out
  speed?: number;      // ms per character (default: 80)
  delay?: number;      // ms before typing starts (default: 100)
  className?: string;  // Applied to the outer <h1> wrapper
}
```

**Internal state:**
- `charCount: number` — how many characters are currently visible (0 → text.length)
- Uses `useEffect` with `setInterval` to increment `charCount` at the given `speed`
- Clears interval on unmount or when `charCount === text.length`
- Initial render shows empty string + cursor (cursor visible from the start)

**Rendered output:**
```tsx
<h1 className={className}>
  {text.slice(0, charCount)}
  <span className="animate-blink text-accent" aria-hidden="true">_</span>
</h1>
```

**Why a custom hook-free approach?** The behavior is simple enough that a `useState` + `useEffect` with interval is cleaner than pulling in `motion/react` for this. No spring physics needed — just linear character reveals.

### Modified File: `src/components/sections/Hero.tsx`

**Change:** Replace the inline `<h1>` with `<TypewriterText>`.

Before:
```tsx
<h1 className="font-serif text-5xl md:text-7xl text-ink mb-4">
    {person.name}
    <span className="animate-blink text-accent" aria-hidden="true">_</span>
</h1>
```

After:
```tsx
<TypewriterText
  text={person.name}
  className="font-serif text-5xl md:text-7xl text-ink mb-4"
/>
```

**No `'use client'` added to Hero.tsx** — Hero stays a Server Component. The `person.name` string is passed as a serializable prop to the client boundary.

### Data Flow

```
portfolio.ts (server) → Hero.tsx (server) → TypewriterText.tsx (client)
                        person.name (string prop)
```

### No Changes Required

- `tailwind.config.ts` — `animate-blink` keyframe already exists (lines 48, 55–58)
- `globals.css` — no changes needed
- `portfolio.ts` — no changes needed
- `types/index.ts` — no new types needed (TypewriterTextProps defined inline in the component)

### Layout Shift Mitigation (AC-4)

The `<h1>` element naturally grows in width as characters are added. Since the content is inline (not `display: flex` or `grid`), no container resize occurs. The parent `<div>` and sibling elements are unaffected because block layout reflows inline content without jumps. No special handling needed beyond natural inline text behavior.

---

## Phase 3 — Task List

1. [x] Create `src/components/ui/TypewriterText.tsx` — `'use client'` component with `useState`/`useEffect`, types out `text` prop character-by-character at configurable speed, appends blinking cursor `<span>` — satisfies AC-1, AC-2, AC-3
2. [x] Update `src/components/sections/Hero.tsx` — replace inline `<h1>` with `<TypewriterText text={person.name} className="..." />` — satisfies AC-1, AC-5
3. [x] Run `npm run type-check` to verify no type errors
4. [ ] Run `npm run build` to verify production build passes

---

