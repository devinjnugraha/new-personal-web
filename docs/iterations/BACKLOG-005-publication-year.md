# BACKLOG-005: Add Publication Year

Backlog item: Add publication year display to the Writing section.

---

## Phase 1 — Spec

### User Stories

**US-1: Display publication year for featured research**
As a visitor, I want to see the publication year on the featured research card so that I can gauge how recent the work is.

**US-2: Display publication year for articles & posts**
As a visitor, I want to see the year on each article/post listing so that I can understand the timeline of content.

### Acceptance Criteria

**AC-1 (US-1):** The featured publication card shows the publication year (extracted from `publishedDate`).
- Given a publication with `publishedDate: '2025-08-17'`
- When the Writing section renders
- Then the card displays `2025`

**AC-2 (US-2):** Each writing entry shows its year.
- Given a writing with `publishedDate` populated
- When the writings list renders
- Then the year is displayed next to the writing entry
- And entries without `publishedDate` show no year (no broken layout)

**AC-3:** Years are also added to the `writings` data in `portfolio.ts`.
- Given the 3 LinkedIn posts in the writings array
- When the data is updated
- Then each has a `publishedDate` field

### Scope

- IN: Featured publication year display, writings year display, data population
- OUT: Full date display, month/day, sorting by date, relative time (e.g. "2 months ago")

---

## Phase 2 — Design

### Data Model

No type changes needed. Both interfaces already support the field:

```typescript
// src/types/index.ts (existing, no changes)
export interface Publication {
  publishedDate: string // ISO date: 'YYYY-MM-DD' — already populated
}

export interface Writing {
  publishedDate?: string // already defined, needs population in data
}
```

### Data Population — `src/data/portfolio.ts`

Add `publishedDate` to each writing entry. Dates extracted from LinkedIn post URLs:

```typescript
{ id: 'linkedin-1', publishedDate: '2024-10-15', ... }  // UntukSatuBumi
{ id: 'linkedin-2', publishedDate: '2024-10-02', ... }  // HariBatikNasional
{ id: 'linkedin-3', publishedDate: '2024-06-04', ... }  // Effective Communication
```

### Layout Changes — `src/components/sections/Writing.tsx`

#### Featured Publication Card (AC-1)

Current layout of the metadata row:
```
[Q1] · Computers in Biology and Medicine · Elsevier / ScienceDirect
```

After change — year appended at the end of the same row:
```
[Q1] · Computers in Biology and Medicine · Elsevier / ScienceDirect · 2025
```

Implementation: add a new `<span>` after the publisher span, separated by the same `·` separator pattern.

#### Articles & Posts List (AC-2)

Current layout per item:
```
ARTICLE          Title text
                 Description text
```

After change — year added to the right side of the title row:
```
ARTICLE          Title text              2024
                 Description text
```

Implementation: add a `<span>` with `ml-auto` (or `text-right shrink-0`) at the end of the `<a>` flex container, showing the year only when `w.publishedDate` is defined. Use the same `font-mono text-xs text-ink-muted` style for visual consistency with the rest of the section.

#### Year Extraction Helper

Create a small utility inline in the component (no separate file needed — it's a single line):
```typescript
const toYear = (iso: string) => new Date(iso).getFullYear().toString()
```

---

## Phase 3 — Tasks

- [x] **T1:** Add `publishedDate` to each writing entry in `src/data/portfolio.ts` — AC-3
- [x] **T2:** Add year display to featured publication card in `src/components/sections/Writing.tsx` — AC-1
- [x] **T3:** Add year display to articles & posts list in `src/components/sections/Writing.tsx` — AC-2
- [x] **T4:** Run `npm run type-check` to verify no type errors
