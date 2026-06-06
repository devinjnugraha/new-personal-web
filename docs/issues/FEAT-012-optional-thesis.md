# FEAT-012 — Optional Education Thesis

**Status:** Done
**Files:** `src/types/index.ts`, `src/components/sections/Education.tsx`

---

## Purpose

Make `Education.thesis` optional so that education entries without a thesis (e.g., high school) don't require thesis data.

---

## User Story

As a portfolio owner, I want education entries to optionally include thesis details so that non-degree entries (like high school) don't require placeholder thesis data.

---

## Acceptance Criteria

- `Education.thesis` is `Thesis | undefined` in the type definition
- The Education component only renders the thesis section when `thesis` is present
- Existing data with thesis continues to render identically
- No thesis data needed for entries that don't have one

**Out of scope:** Chat system prompt builder (does not reference thesis).

---

## Design

- `src/types/index.ts`: Change `thesis: Thesis` → `thesis?: Thesis`
- `src/components/sections/Education.tsx`: Wrap thesis block in `{edu.thesis && ...}` conditional render
- `src/data/portfolio.ts`: No change needed — SMAN 63 already omits thesis

---

## Task List

- [x] 1. Make `thesis` optional in `Education` type (`src/types/index.ts`)
- [x] 2. Conditionally render thesis block in Education component (`src/components/sections/Education.tsx`)
- [x] 3. Run `npm run type-check` to verify
