# FIX-005 — About Card Layout: Center-Balance Orphan Cards

**Status**: Spec approved
**Backlog ref**: BACKLOG-021
**Date**: 2026-06-10

---

## Problem

The About section uses a 3-column CSS grid. With 4 cards, the 4th card wraps to a second row at ~1/3 width while the remaining 2/3 stays empty. This looks visually unbalanced. The layout should be adaptive to any number of cards.

## User Stories

- As a visitor, I want the About cards to look balanced regardless of how many there are, so the page feels polished.

## Acceptance Criteria

**Given** the About section renders N strength cards:
- **When** N ≤ 3, all cards fill the row(s) evenly (no visual change from current).
- **When** N = 4, the 4th card is centered on the second row.
- **When** N = 5, the 4th and 5th cards are centered as a pair on the second row.
- **When** N = 6, all rows are full.
- **When** viewport is mobile (< md breakpoint), cards stack in a single column as before.

## Design

**Approach**: Flexbox with `justify-center` and fixed-percentage card widths.

### Container

Replace:
```
grid grid-cols-1 md:grid-cols-3 gap-6
```
With:
```
flex flex-wrap justify-center gap-6
```

### Card wrapper

Each card gets a responsive width class:
- Mobile: `w-full`
- Desktop (`md+`): `w-[calc(33.333%-1rem)]` — accounts for `gap-6` (1.5rem)

This makes the last row's orphan cards center automatically via `justify-center`.

### Files changed

| File | Change |
|------|--------|
| `src/components/sections/About.tsx` | Container class + card width classes |

No data, type, or other component changes.

## Task List

- [x] 1. Update About.tsx container from grid to flexbox with `justify-center`
- [x] 2. Add responsive card width classes to each card wrapper
- [x] 3. Verify mobile single-column layout unchanged
- [x] 4. Verify desktop: 4th card centers, 5th+6th pair centers
- [x] 5. Run `npm run type-check`

## Implementation Notes

_(none yet)_
