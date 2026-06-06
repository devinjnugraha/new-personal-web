# FEAT-013 — Education GPA & Card Spacing

**Status:** Done
**Files:** `src/types/index.ts`, `src/components/sections/Education.tsx`, `src/data/portfolio.ts`

---

## Purpose

Add GPA display to education entries and fix the lack of spacing between education cards.

---

## User Stories

1. As a visitor, I want to see the GPA for each education entry so I can quickly gauge academic performance.
2. As a visitor, I want proper spacing between education cards so entries are clearly separated.

---

## Acceptance Criteria

- New optional `gpa?: { value: string; scale: string }` field on the `Education` type
- GPA rendered in the card (near duration badge or date/location line)
- Education cards have vertical gap between them
- Entries without GPA omit the GPA display
- Existing data populated: university has GPA, high school omits it

**Out of scope:** Chat system prompt update.

---

## Design

### Type change (`src/types/index.ts`)

```typescript
export interface Gpa {
  value: string   // e.g. '3.75'
  scale: string   // e.g. '4.00'
}

export interface Education {
  // ...existing fields...
  gpa?: Gpa
}
```

### Component (`src/components/sections/Education.tsx`)

- Wrap `education.map(...)` in a container with `space-y-4` or `flex flex-col gap-4` for card spacing
- Render GPA inline — small mono badge near the duration badge area

### Data (`src/data/portfolio.ts`)

- Add `gpa: { value: '3.75', scale: '4.00' }` to UB entry
- Omit from SMAN 63 entry

---

## Task List

- [x] 1. Add `Gpa` interface and `gpa?: Gpa` to `Education` type (`src/types/index.ts`)
- [x] 2. Add `gpa` data to UB entry in portfolio (`src/data/portfolio.ts`)
- [x] 3. Add card spacing container + GPA render in Education component (`src/components/sections/Education.tsx`)
- [x] 4. Run `npm run type-check`
