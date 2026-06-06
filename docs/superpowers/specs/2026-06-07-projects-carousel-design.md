# Design: Projects Section with Image Carousel

**Issue:** BACKLOG-013
**Date:** 2026-06-07

## Summary

Add a new "Projects" section to the portfolio showcasing 3 projects via an infinite image carousel. Each project displays a 5:3 landscape screenshot with a title below it. Clicking the image or title opens the project URL in a new tab.

## Section Placement

After Experience, before Certifications. Nav renumbering:

| # | Section | Nav ID |
|---|---------|--------|
| 01 | About | `about` |
| 02 | Education | `education` |
| 03 | Experience | `experience` |
| **04** | **Projects** | `projects` |
| 05 | Certifications | `certifications` |
| 06 | Writing | `writing` |
| 07 | TL;DR | `chat` |

## Data Model

```typescript
// src/types/index.ts
interface Project {
  title: string
  image: string   // URL to 5:3 landscape screenshot
  url: string     // external link (opens target _blank)
}
```

Added to `PortfolioData` interface as `projects: Project[]`.

3 placeholder entries in `src/data/portfolio.ts`.

## Component Architecture

### `Projects.tsx` — Server Component

- Follows existing section pattern: `id`, `section-label`, `py-section`, `border-t border-border`
- Label: `04 / projects`
- Imports `projects` from portfolio data
- Renders `<ProjectCarousel projects={projects} />`

### `ProjectCarousel.tsx` — Client Component (`'use client'`)

- Accepts `projects: Project[]` prop
- Shows one card at a time, centered
- **Navigation:** Borderless circular buttons with Lucide React `ChevronLeft`/`ChevronRight` icons
- **Infinite loop:** Wraps index — last → first, first → last
- **Animation:** Motion `AnimatePresence` + `animate.x` for slide transitions
- **Touch/drag:** Pointer events for mobile swipe support
- **Card structure:**
  - 5:3 aspect-ratio container with Next.js `<Image>` (fill + object-cover)
  - Title below image as `<a>` with `target="_blank" rel="noopener noreferrer"`, serif font

### Carousel Layout

```
Desktop:                              Mobile:
[<]  [  5:3 image  ]  [>]            [<] [ 5:3 ] [>]
     Project Title                        Title
```

Arrows: borderless, muted color, brighten on hover.

## Files Changed

| File | Change |
|------|--------|
| `src/types/index.ts` | Add `Project` interface |
| `src/data/portfolio.ts` | Add `projects: Project[]` field + placeholder data, extend `PortfolioData` |
| `src/components/sections/Projects.tsx` | New server section component |
| `src/components/sections/ProjectCarousel.tsx` | New client carousel component |
| `src/components/ui/Nav.tsx` | Add `projects` nav item, renumber subsequent items |
| `src/app/page.tsx` | Import and render `<Projects />` after Experience |

## Constraints

- Zero new dependencies (no carousel library)
- Uses existing Motion for animations
- Uses Lucide React (already in project) for arrow icons
- Follows existing section conventions (server shell, client interactivity)
- All content from `portfolio.ts`, no hardcoded content
