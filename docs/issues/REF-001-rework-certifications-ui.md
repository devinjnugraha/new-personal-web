# FEAT-009: Rework Certifications UI

## Phase 1 — Spec

### User Stories

**US-1:** As a visitor, I want all certifications to feel equally valid so that I don't perceive non-featured ones as expired or unimportant.

**US-2:** As a visitor, I want to visually distinguish featured certifications from non-featured ones through layout treatment (card vs inline) without implying that non-featured ones are lesser.

**US-3:** As a visitor, I want featured certifications to have a clean card presentation without star symbols or "featured" labels so the design feels minimal and professional.

### Acceptance Criteria

**AC-1 (US-1, US-2):** Non-featured certifications render as inline items in a 1-column flex layout — no card container, no border, no opacity reduction, no background surface.

**AC-2 (US-3):** Featured certifications render as cards with subtle border and surface background, but WITHOUT any star symbol (`★`) or "featured" text label.

**AC-3 (US-2):** Both featured and non-featured certifications display the same content elements: badge image (if present), name, issuer, year, skill badges, and verify link.

**AC-4:** The achievements section below certifications is unchanged.

### Scope Boundary

- **In scope:** Certifications list rendering only (CSS/layout changes + removing star/label)
- **Out of scope:** Data model changes, achievements section, badge component, responsive breakpoints beyond existing behavior

---

## Phase 2 — Design

### Component: `Certifications.tsx` (Server Component — unchanged)

**File:** `src/components/sections/Certifications.tsx`

#### Featured certifications (grid)

```
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
  {featuredCerts.map(cert =>
    <div className="rounded-lg p-5 bg-background-surface border border-border hover:border-border-strong transition-colors">
      {/* badge image (if present) */}
      <p className="text-ink font-medium text-sm leading-snug">{cert.name}</p>
      <p className="text-ink-muted text-xs font-mono mt-1">{cert.issuer} · {cert.year}</p>
      {/* skill badges (up to 3) */}
      {/* verify link (if present) */}
    </div>
  )}
</div>
```

- Same card as before but: **no accent border**, just `border-border` like a neutral card. No `★` label, no "featured" text.
- Subtle hover: `hover:border-border-strong`.

#### Non-featured certifications (1-column inline flex)

High-level layout per item:

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  [badge]  Name of Certification                                  │
│   32px    Issuer · Year                                          │
│           [skill-1] [skill-2] [skill-3]     verify ↗            │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

- Badge image (32×32) aligned top-left, text content flows right of it in a flex row.
- Name, issuer/year, skill badges, and verify link are stacked vertically inside the text block.
- No card wrapper: no border, no background surface, no rounded corners.
- Items are separated by `gap-4` vertical spacing only — no dividers.

```
<div className="flex flex-col gap-4 mb-10">
  {nonFeaturedCerts.map(cert =>
    <div className="flex items-start gap-3">
      {/* badge image (if present) — 32x32, smaller than featured */}
      <div className="flex-1 min-w-0">
        <p className="text-ink font-medium text-sm leading-snug">{cert.name}</p>
        <p className="text-ink-muted text-xs font-mono mt-0.5">{cert.issuer} · {cert.year}</p>
        {/* skill badges (inline) */}
        {/* verify link (if present) */}
      </div>
    </div>
  )}
</div>
```

- Same text sizing as featured cards — `text-sm` name, `text-xs` issuer/year.

#### Data flow

- Split `certifications` array into `featured` and `nonFeatured` via `.filter()`.
- No changes to `portfolio.ts` or `types/index.ts`.

### Files Modified

| File | Change |
| --- | --- |
| `src/components/sections/Certifications.tsx` | Split render into featured grid + non-featured inline flex; remove star/label; remove opacity-60 |

---

## Phase 3 — Task List

- [x] **T1:** In `Certifications.tsx`, split `certifications` into `featured` and `nonFeatured` arrays via `.filter()`. (AC-1, AC-2)
- [x] **T2:** Rework the featured cert card — remove accent border, use `border-border` only; remove the `★ featured` `<span>` block entirely. (AC-2, AC-3)
- [x] **T3:** Add a non-featured cert section below the featured grid — render each as a `flex items-start gap-3` row (badge left, text right) inside a `flex flex-col gap-4` container. No card wrapper, no opacity. (AC-1, AC-3)
- [x] **T4:** Run `npm run type-check` and `npm run build` to validate. (All AC)
