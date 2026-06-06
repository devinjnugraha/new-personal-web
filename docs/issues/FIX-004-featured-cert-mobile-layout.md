# FIX-004 — Featured Cert Mobile Layout

**Source:** BACKLOG-010
**Status:** Phase 1 — Spec

---

## Phase 1 — Spec

### User Stories

- As a mobile visitor, I want featured certification cards to display the badge visually separated from the text content so that the layout is clean and consistent with the unfeatured cert style.

### Acceptance Criteria

1. **Given** a mobile viewport (below `md` breakpoint), **when** featured certifications render, **then** each card displays badge on the left and content (name, issuer, skills, verify link) on the right in a horizontal flex row
2. **Given** a desktop viewport (`md` and above), **when** featured certifications render, **then** the layout remains unchanged (vertical card with badge on top)
3. **Given** a featured cert card on mobile, **when** rendered, **then** it retains the spotlight card styling (border, bg, hover) — only the internal layout changes

### Scope

- **In scope:** Mobile layout of featured cert cards only
- **Out of scope:** Unfeatured cert layout, desktop layout, data changes, new components

---

## Phase 2 — Design

**Component:** `src/components/sections/Certifications.tsx` — single file change, no new files.

### Layout Change

```
Current (mobile + desktop — badge stacks above text):
┌─────────────────────┐
│ [badge]             │
│ Cert Name           │
│ Issuer · Year       │
│ [skill] [skill]     │
│ verify ↗            │
└─────────────────────┘

Target (mobile only — badge left, text right):
┌─────────────────────┐
│ [badge]  Cert Name  │
│         Issuer·Year │
│         [skill] [s] │
│         verify ↗    │
└─────────────────────┘

Desktop: unchanged
```

### Approach

Wrap featured card internals with responsive flex:
- Card inner wrapper: `flex flex-row md:flex-col gap-3 md:gap-0`
- Badge container: `shrink-0 md:mb-3`
- Text container: `flex-1 min-w-0`

No data flow changes. Same `portfolio.certifications[]` source.

---

## Phase 3 — Task List

1. [x] Update featured cert card layout in `Certifications.tsx` — add responsive flex wrapper so mobile shows badge-left/text-right and desktop keeps badge-on-top (AC-1, AC-2, AC-3)
