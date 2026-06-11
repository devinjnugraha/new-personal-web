# Certifications Two-Tier Layout

**Date**: 2026-06-11
**Status**: Approved
**Scope**: Redesign the certifications subsection within the Proof section

---

## Problem

All certifications render identically in a 4-column grid. When more than 3-4 exist, every card gets equal visual weight regardless of importance. Non-featured certs need a more compact, secondary treatment.

## Design

Split certifications into two tiers based on the existing `Certification.featured` field:

### Tier 1 — Featured certs (spotlight cards)

Unchanged from current implementation:

- `grid grid-cols-1 md:grid-cols-4 gap-4`
- Stacked layout: badge (40px) → name → issuer+year → verify link
- Bordered card with hover accent transition

### Tier 2 — Non-featured certs (horizontal rows)

New layout:

- Full-width flex row: `flex items-center gap-4`
- **Logo**: 32px height, `object-contain`, `shrink-0`
- **Text block** (flex-col):
  - Name: `text-ink font-medium text-sm`
  - Issuer + year: `text-ink-muted text-xs font-mono`
  - Verify link: `text-accent text-xs font-mono hover:underline`
- **Dividers**: `border-b border-border pb-4` on all rows except the last
- Rows use `py-3` vertical padding (last row uses `pt-3 pb-0`)

### Responsive

Same treatment at all breakpoints — featured stay as cards, non-featured are horizontal rows on both mobile and desktop.

### Spacing

- Featured grid and non-featured rows separated by `mt-4`
- No additional section label between tiers

## Files changed

| File | Change |
|------|--------|
| `src/components/sections/Certifications.tsx` | Split rendering logic, add horizontal row layout for non-featured |

No type changes, no data changes, no new files.

## Implementation approach

1. Destructure `certifications` into `featured` and `nonFeatured` arrays using `filter`
2. Render `featured` with existing grid markup (unchanged)
3. Render `nonFeatured` with new horizontal row markup
4. Conditionally render the non-featured block only if the array is non-empty
