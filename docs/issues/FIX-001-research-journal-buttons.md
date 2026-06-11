# FIX-001 — Research journal name responsive display & button spacing

Solves: **BACKLOG-020**

---

## Phase 1 — Spec

### User Stories

- As a visitor on desktop, I want to see the full journal name ("Computers in Biology and Medicine") so that I can immediately recognize the publication venue.
- As a visitor on mobile, I want to see the shortened journal name ("Comput. Biol. Med.") so that the layout stays compact.
- As a visitor, I want clear visual separation between "read abstract" and "View on ScienceDirect" buttons so that they don't look glued together.

### Acceptance Criteria

- **AC-1**: On viewports >= `md` breakpoint, the research card shows `publication.journal` (full name).
- **AC-2**: On viewports < `md` breakpoint, the research card shows `publication.journalShort` (abbreviated).
- **AC-3**: The "read abstract" toggle and "View on ScienceDirect" link have clear vertical spacing between them.
- **AC-4**: No JavaScript/hook changes — pure CSS responsive solution for journal name toggle.
- **AC-5**: Existing functionality (abstract expand/collapse, link navigation, analytics tracking) unchanged.

### Out of Scope

- Changes to the publication data model
- Changes to other sections
- Adding additional publications or fields

---

## Phase 2 — Design

### Component Changes

**File: `src/components/sections/Certifications.tsx`** (lines 74–94)

1. **Journal name toggle** — Replace the single `<span>` at line 78 with two `<span>` elements using Tailwind responsive classes:
   ```tsx
   <span className="font-mono text-xs text-ink-muted md:hidden">{featuredPub.journalShort}</span>
   <span className="font-mono text-xs text-ink-muted hidden md:inline">{featuredPub.journal}</span>
   ```

2. **Button spacing** — Added `mr-4` to the "read abstract" button when collapsed (via conditional class) for horizontal space. ExpandableAbstract also upgraded to use Motion `AnimatePresence` for animated expand/collapse.

**Files changed**: `Certifications.tsx`, `ExpandableAbstract.tsx`

---

## Phase 3 — Task List

- [x] 1. Add responsive journal name spans in Certifications.tsx line 78 (AC-1, AC-2, AC-4)
- [x] 2. Add mr-4 spacing to read abstract button when collapsed, animate expand/collapse with Motion (AC-3)
- [x] 3. Run `npm run type-check` to verify no type errors (AC-5)

---

## Implementation Notes

- Button spacing: tried flex-col gap, flex-row justify-between, horizontal with separator — all rejected by user. Final approach: `mr-4` on the "read abstract" button when collapsed, keeping vertical stack layout.
- Abstract expand/collapse upgraded from abrupt JS `&&` to `AnimatePresence` + `motion.p` with height+opacity animation (0.25s easeInOut).
- TrackedLink margin removed per user's manual adjustment.
