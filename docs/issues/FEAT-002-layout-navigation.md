# SPEC-002 — Layout & Navigation

**Status:** DONE   
**Component:** `src/components/ui/Nav.tsx` (Client), `src/app/layout.tsx` (Server), `src/app/page.tsx` (Server)  
**Priority:** P0

---

## Purpose

Defines the root layout, navigation bar, and footer. The nav is the primary wayfinding
element on the page and must work both on desktop and mobile.

---

## Root Layout (`layout.tsx`)

### Requirements

| ID | Requirement |
|---|---|
| L-01 | Load fonts via `next/font/google`: `DM_Sans` (variable `--font-dm-sans`), `Playfair_Display` (variable `--font-playfair`) |
| L-02 | Load `Geist_Mono` from `next/font/google` (variable `--font-geist-mono`) |
| L-03 | Apply font variables to `<html>` element via `className` |
| L-04 | `<body>` has `bg-background text-ink antialiased` |
| L-05 | `<Analytics />` from `@vercel/analytics/react` rendered in body |
| L-06 | `<SpeedInsights />` from `@vercel/speed-insights/next` rendered in body |
| L-07 | `metadata` export with `title`, `description`, `openGraph`, `twitter`, `robots` |

---

## Navigation Bar

### Behaviour

| ID | Requirement |
|---|---|
| N-01 | Fixed to top (`fixed top-0 left-0 right-0 z-50`) |
| N-02 | Transparent background when page is at top (`scrollY < 40`) |
| N-03 | `bg-background/90 backdrop-blur-sm border-b border-border` when scrolled |
| N-04 | Transition between transparent and scrolled states: `transition-all duration-300` |
| N-05 | Height: `h-14` |
| N-06 | Left side: Devin's initials `DJN` — links to `#hero` — `font-mono text-sm` |
| N-07 | Right side: nav links for each section (desktop only) |
| N-08 | Active section link is highlighted `text-accent`; inactive links are `text-ink-muted` |
| N-09 | Active section is determined by scroll position (which section's top is ≤ 120px from viewport top) |
| N-10 | Smooth scroll on nav link click (handled via CSS `scroll-behavior: smooth` in `globals.css`) |

### Mobile

| ID | Requirement |
|---|---|
| N-11 | Nav links hidden on mobile (`hidden md:flex`) |
| N-12 | Mobile: show a hamburger icon (`☰`) on the right side |
| N-13 | Hamburger opens a full-screen overlay menu with all nav links |
| N-14 | Overlay closes on link click or outside tap |
| N-15 | Hamburger icon toggles to `✕` when menu is open |

### Nav Links (in order)
```
01 about      → #about
02 education  → #education
03 experience → #experience
04 certs      → #certifications
05 research   → #writing
06 ask        → #chat
```

---

## Home Page (`page.tsx`)

| ID | Requirement |
|---|---|
| P-01 | Renders `<Nav />` outside `<main>` (so it can be fixed over all content) |
| P-02 | `<main>` has `mx-auto max-w-content px-6` |
| P-03 | Sections rendered in order: Hero, About, Education, Experience, Certifications, Writing (Research & Writings), ChatInterface |
| P-04 | `<footer>` below main with copyright line and `border-t border-border` |
| P-05 | Footer uses `new Date().getFullYear()` — never hardcode the year |

---

## Footer

| ID | Requirement |
|---|---|
| F-01 | `© {year} Devin Jaya Nugraha` in `font-mono text-sm text-ink-muted` |
| F-02 | Same horizontal padding and max-width as `<main>` |
| F-03 | `py-16` vertical padding |

---

## Acceptance Criteria

- [x] Nav is visible and fixed at top across all sections
- [x] Nav becomes opaque with blur effect when user scrolls down
- [x] Active section label turns accent-colored in nav
- [x] Mobile hamburger menu opens/closes correctly
- [x] All nav links scroll to correct section
- [x] Footer shows correct year dynamically
