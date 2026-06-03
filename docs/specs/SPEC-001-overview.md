# SPEC-001 — Project Overview & Global Requirements

**Status:** TODO  
**Priority:** P0 (foundational — read before all other specs)

---

## Purpose

Defines the global requirements that apply across the entire NEW-PERSONAL-WEB portfolio site.
All section specs inherit these constraints.

---

## Product Summary

A professional portfolio for **Devin Jaya Nugraha** — software developer and ML researcher.
Single-page layout with seven sections plus a fixed navigation header.
The site must feel **editorial and technical**: precise typography, minimal decoration,
intentional whitespace. The previous portfolio (`devinjnugraha.github.io`) used a
purple/cartoon aesthetic — this design explicitly moves away from that.

---

## Global Functional Requirements

| ID   | Requirement                                                                                                           |
| ---- | --------------------------------------------------------------------------------------------------------------------- |
| G-01 | All content renders without JavaScript (Server Components for all static sections)                                    |
| G-02 | Page is fully responsive: mobile-first, tested at 375px, 768px, 1280px                                                |
| G-03 | All external links open in a new tab with `rel="noopener noreferrer"`                                                 |
| G-04 | No content is hardcoded in component files — all comes from `src/data/portfolio.ts`                                   |
| G-05 | TypeScript strict mode; no `any` types                                                                                |
| G-06 | All images have `alt` text; all interactive elements have accessible labels                                           |
| G-07 | Page loads with a Lighthouse performance score ≥ 90                                                                   |
| G-08 | No placeholder/lorem ipsum text in production build                                                                   |
| G-09 | The site is dark-mode only in v1; no light mode toggle                                                                |
| G-10 | Anchor links for each section: `#hero`, `#about`, `#education`, `#experience`, `#certifications`, `#writing`, `#chat` |

---

## Page Sections (in order)

```
[Nav — fixed]
  ├── Hero             (#hero)
  ├── About            (#about)       — 01
  ├── Education        (#education)   — 02
  ├── Experience       (#experience)  — 03
  ├── Certifications   (#certifications) — 04
  ├── Writing          (#writing)     — 05
  └── Chat             (#chat)        — 06
[Footer]
```

---

## Design System

### Colors (Tailwind custom tokens)

| Token                 | Hex       | Usage                        |
| --------------------- | --------- | ---------------------------- |
| `background`          | `#0D0D0D` | Page background              |
| `background-surface`  | `#161616` | Cards, elevated surfaces     |
| `background-elevated` | `#1E1E1E` | Chat bubbles, inner elements |
| `border`              | `#2A2A2A` | Default border color         |
| `ink`                 | `#F0F0EC` | Primary text                 |
| `ink-muted`           | `#888880` | Secondary text, labels       |
| `ink-faint`           | `#555550` | Disabled, placeholder text   |
| `accent`              | `#1D9E75` | Teal — primary accent        |
| `accent-light`        | `#9FE1CB` | Accent on dark bg            |
| `accent-faint`        | `#0D2920` | Accent background tint       |

### Typography

| Role                | Font             | Tailwind Class |
| ------------------- | ---------------- | -------------- |
| Display (hero name) | Playfair Display | `font-serif`   |
| Body                | DM Sans          | `font-sans`    |
| Labels, code, mono  | Geist Mono       | `font-mono`    |

### Spacing

- Content max-width: `max-w-content` = `720px`
- Section vertical padding: `py-section` = `6rem`
- Section separator: `border-t border-border`

### Section Label Pattern

Every section opens with a label in this format:

```tsx
<p className="section-label mb-8">01 / about</p>
// section-label = font-mono text-xs uppercase tracking-widest text-ink-muted
```

---

## Global Performance Requirements

- No render-blocking resources
- Fonts loaded via `next/font` (no external font requests)
- `@vercel/analytics` and `@vercel/speed-insights` in root layout
- Images via `next/image` where applicable

---

## Acceptance Criteria

- [ ] All 7 sections visible and navigable via anchor links
- [ ] Nav highlights correct section on scroll
- [ ] No TypeScript errors (`pnpm type-check` passes)
- [ ] No ESLint errors (`pnpm lint` passes)
- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 95
- [ ] No `any` in TypeScript output
- [ ] Mobile layout correct at 375px viewport width
