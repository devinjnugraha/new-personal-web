# SPEC-003 — Hero Section

**Status:** TODO  
**Component:** `src/components/sections/Hero.tsx` (Server Component)  
**Priority:** P0  
**Data source:** `portfolio.person`, `portfolio.links`

---

## Purpose

The hero is the first thing every visitor sees. It must establish Devin's name, role,
and tone immediately. It should feel confident and minimal — no animation overload,
no gradient blobs. Just strong typography and clear CTAs.

---

## Layout

```
[full viewport height — centered vertically]

  // hello, world          ← section label (monospace, muted)

  Devin Jaya Nugraha_      ← name in Playfair Display (serif), large, with blinking cursor

  Software Developer · Certified TensorFlow Developer   ← tagline in Geist Mono, accent color

  [bio paragraph]          ← DM Sans, muted, max-w-lg

  github →   linkedin →   download cv →   ← text links, monospace, muted → accent on hover

  [scroll indicator ↓]     ← bottom of section, centered
```

---

## Requirements

| ID | Requirement |
|---|---|
| H-01 | Section height: `min-h-screen` with `flex items-center` |
| H-02 | Top padding `pt-20` to clear the fixed nav |
| H-03 | Section label: `// hello, world` — uses `.section-label` class, `mb-4` |
| H-04 | Name: `font-serif text-5xl md:text-7xl text-ink` |
| H-05 | Blinking cursor after name: `<span className="animate-blink text-accent">_</span>` |
| H-06 | Tagline: `font-mono text-accent text-sm mb-6` — from `portfolio.person.tagline` |
| H-07 | Bio paragraph: `text-ink-muted max-w-lg leading-relaxed mb-8` — from `portfolio.person.bio` |
| H-08 | Three CTAs rendered as `<a>` tags (not `<button>`): GitHub, LinkedIn, Download CV |
| H-09 | CTA style: `font-mono text-sm text-ink-muted hover:text-accent transition-colors` |
| H-10 | CTAs in a `flex gap-6 flex-wrap` row |
| H-11 | GitHub and LinkedIn open in new tab (`target="_blank"`) |
| H-12 | CV link points to `/cv.pdf` (no new tab — browser handles PDF) |
| H-13 | Scroll indicator: a centered `↓` or chevron icon at bottom of section, `text-ink-muted`, subtle bounce animation |

---

## Blinking Cursor

Use the CSS animation defined in `tailwind.config.ts`:
```tsx
<span className="animate-blink text-accent" aria-hidden="true">_</span>
```
The `animate-blink` keyframe blinks opacity 1→0→1 on a 1s step-end loop.

---

## Scroll Indicator

Positioned at the bottom of the hero section:
```
absolute bottom-8 left-1/2 -translate-x-1/2
font-mono text-xs text-ink-muted animate-bounce
```
Content: `↓ scroll`

---

## Animation (optional, non-blocking)

If animation is added, use a client wrapper component only — do NOT add `'use client'` to Hero.tsx.
Create `components/ui/AnimatedSection.tsx` (`'use client'`) that wraps children in a `motion.div`
with `whileInView={{ opacity: 1, y: 0 }}` reveal.

---

## Acceptance Criteria

- [ ] Name renders in Playfair Display serif font
- [ ] Tagline renders in Geist Mono in accent color
- [ ] Cursor blinks with CSS animation
- [ ] All three CTA links functional and styled
- [ ] Section fills viewport height
- [ ] Bio comes from `portfolio.person.bio` (not hardcoded)
- [ ] Scroll indicator visible at bottom
- [ ] No layout shift on load
