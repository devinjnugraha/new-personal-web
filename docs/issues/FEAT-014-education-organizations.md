# FEAT-014 — Education Organizations

## Phase 1: Spec

### User Stories

- As a visitor, I want to see organizational roles held during my education so that I understand extracurricular involvement alongside academic info.
- As a visitor, I want the org info to be compact and not clutter the education card so that the page remains easy to scan.

### Acceptance Criteria

1. **Given** an education entry has an `organizations` array, **when** the Education section renders, **then** each organization displays: role, organization name, date range, and highlights as bullet points using the `›` style matching the Experience/Timeline section.
2. **Given** an education entry has no `organizations` (or empty array), **when** the Education section renders, **then** no organization sub-section appears.
3. **Given** the EMIF organization entry for Brawijaya University, **when** rendered, **then** highlights appear as bullet points with `text-sm text-ink-muted` text and `text-accent` `›` markers, identical to `Timeline.tsx` styling.
4. **Given** the EMIF entry, **when** the chat knowledge base is built, **then** the education section includes organizational involvement details.

### Scope

- **In scope**: Optional `organizations` on `Education`, data for EMIF, compact UI rendering, chat knowledge base update
- **Out of scope**: Moving existing experience entries, skill tags on org entries, links/URLs on org entries, filtering or sorting organizations

## Phase 2: Design

### Types

```typescript
export interface EducationOrganization {
  role: string
  organization: string
  startDate: string    // ISO month: 'YYYY-MM'
  endDate: string      // ISO month: 'YYYY-MM'
  description: string
  highlights: string[]
}
```

Added to `Education`: `organizations?: EducationOrganization[]`

### File ownership

| File | Responsibility |
|---|---|
| `src/types/index.ts` | `EducationOrganization` interface + optional field on `Education` |
| `src/data/portfolio.ts` | EMIF data on UB entry; update `buildChatSystemPrompt` |
| `src/components/sections/Education.tsx` | Render optional organizations sub-section |

## Phase 3: Task List

1. `[x]` Add `EducationOrganization` type — `src/types/index.ts`
2. `[x]` Add EMIF data to UB education entry — `src/data/portfolio.ts`
3. `[x]` Update chat knowledge base builder — `src/data/portfolio.ts`
4. `[x]` Render organizations in Education component — `src/components/sections/Education.tsx`
5. `[x]` Type-check and build
