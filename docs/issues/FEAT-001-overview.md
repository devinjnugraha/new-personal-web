# SPEC-001 — Project Overview & Global Requirements

**Status:** IN REVIEW (5/7 acceptance criteria verified, 2 require manual visual testing)
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
  ├── Research & Writings (#writing) — 05
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

- [x] All 7 sections visible and navigable via anchor links
  - **Verified:** All 7 `<section>` elements have correct `id` attributes (`#hero`, `#about`, `#education`, `#experience`, `#certifications`, `#writing`, `#chat`). Nav links reference all anchors. `src/app/page.tsx` renders all 7 sections in order.
- [x] Nav highlights correct section on scroll
  - **Verified:** `Nav.tsx` implements scroll spy via `getBoundingClientRect().top <= 120`, iterates sections in reverse, sets `activeSection` state, applies `text-accent` class to the matching nav link.
- [x] No TypeScript errors (`npm run type-check` passes)
  - **Verified:** `npm run type-check` exits with zero errors. `tsconfig.json` has `"strict": true` enabled.
- [x] No ESLint errors (`npm run lint` passes)
  - **Verified:** `npm run lint` reports "No ESLint warnings or errors".
- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 95
  - **Not verified (requires browser):** Cannot run Lighthouse in CLI environment. Automated checks passed:
    - Build succeeds (199 kB First Load JS for `/`).
    - All static sections are Server Components (only `ChatInterface`, `Nav`, `TrackedLink` are `'use client'`).
    - Fonts loaded via `next/font` with `display: swap` — no external font requests.
    - `@vercel/analytics` and `@vercel/speed-insights` included in root layout.
    - Semantic HTML used (`<section>`, `<nav>`, `<main>`, `<footer>`).
    - `aria-label` present on hamburger button, `aria-hidden="true"` on decorative elements (cursor blink, timeline dot, timeline line, scroll indicator).
    - No `<img>` tags used — no missing `alt` attributes.
    - **Action required:** Run Lighthouse manually in Chrome DevTools to confirm scores.
- [x] No `any` in TypeScript output
  - **Verified:** Grep for `: any`, `<any>`, `as any` patterns across `src/` returns zero matches.
- [ ] Mobile layout correct at 375px viewport width
  - **Not verified (requires visual testing):** Code review findings:
    - Mobile hamburger menu implemented with overlay (`md:hidden` / `hidden md:flex`).
    - Responsive typography: `text-5xl md:text-7xl` on hero heading.
    - Body scroll locked when mobile menu is open.
    - Hero CTAs use `flex-wrap` for small screens.
    - `max-w-content` (720px) with `px-6` padding ensures no horizontal overflow.
    - Chat input uses `text-base md:text-sm` to prevent iOS zoom.
    - **Action required:** Visual testing at 375px viewport.

---

## Global Requirements Verification (2026-06-04)

| ID   | Requirement                                                                                                           | Status  | Evidence                                                                                                            |
| ---- | --------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| G-01 | All content renders without JavaScript (Server Components for all static sections)                                    | ✅ PASS | Only `ChatInterface`, `Nav`, `TrackedLink` use `'use client'`. Hero, About, Education, Experience, Certifications, Writing are all Server Components. Build generates static pages. |
| G-02 | Page is fully responsive: mobile-first, tested at 375px, 768px, 1280px                                                | ⏳      | Responsive classes present (`md:` breakpoints, mobile menu, `flex-wrap`). **Requires visual testing.**            |
| G-03 | All external links open in a new tab with `rel="noopener noreferrer"`                                                 | ✅ PASS | All `target="_blank"` links have matching `rel="noopener noreferrer"` (Hero.tsx, Certifications.tsx, Writing.tsx). TrackedLink passes through `rel` prop. |
| G-04 | No content is hardcoded in component files — all comes from `src/data/portfolio.ts`                                   | ✅ PASS | All section components import from `@/data/portfolio`. Hero uses `person`, `links`; About uses `person`, `skills`; etc. No hardcoded content strings found. |
| G-05 | TypeScript strict mode; no `any` types                                                                                | ✅ PASS | `tsconfig.json` has `"strict": true`. Zero `any` type usages found via grep.                                         |
| G-06 | All images have `alt` text; all interactive elements have accessible labels                                           | ✅ PASS | No `<img>` tags in codebase. `aria-label` on hamburger button. `aria-hidden="true"` on decorative elements. Semantic HTML (`<section>`, `<nav>`, `<main>`, `<footer>`). |
| G-07 | Page loads with a Lighthouse performance score ≥ 90                                                                   | ⏳      | Build succeeds (199 kB First Load). All static sections Server Components. Fonts via `next/font`. **Requires Lighthouse.** |
| G-08 | No placeholder/lorem ipsum text in production build                                                                  | ✅ PASS | Grep for "lorem", "placeholder", "TODO" content returns no matches in component files. All text is real content from portfolio.ts. |
| G-09 | The site is dark-mode only in v1; no light mode toggle                                                                | ✅ PASS | No `dark:` Tailwind prefix usage found. No theme toggle component. Body has `bg-background text-ink` (dark palette). |
| G-10 | Anchor links for each section: `#hero`, `#about`, `#education`, `#experience`, `#certifications`, `#writing`, `#chat` | ✅ PASS | All 7 sections have correct `id` attributes. Nav links reference all anchors.                                       |
