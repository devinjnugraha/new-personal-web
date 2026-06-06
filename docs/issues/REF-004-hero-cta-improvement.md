# BACKLOG-007: Hero CTA Improvement

**Source:** docs/BACKLOG.md — BACKLOG-007
**Status:** Phase 3 — Tasks
**Date:** 2026-06-06

---

## Problem

The "email →" CTA link in the Hero section is visually subtle — it uses the same `font-mono text-sm text-ink-muted` style as the other links (github, linkedin, cv). As the primary call-to-action for contacting Devin, it doesn't stand out enough to draw the visitor's attention.

## User Stories

### US-1: Make email CTA visually prominent
**As a** portfolio visitor,
**I want** the contact/email link to be the most visually prominent CTA in the Hero section,
**so that** I can immediately identify how to reach Devin.

**Acceptance Criteria:**
- Given the Hero section has rendered,
- When I scan the CTA area,
- Then the email/contact link is noticeably more prominent than the other links (github, linkedin, cv),
- And the email link does NOT use the accent color for its text/background.

### US-2: Keep secondary CTAs subordinate
**As a** portfolio visitor,
**I want** the other links (github, linkedin, cv) to remain visually subordinate to the email CTA,
**so that** my attention is naturally drawn to the primary action first.

**Acceptance Criteria:**
- Given the Hero section has rendered,
- When I compare the email link to the other links,
- Then the other links appear less prominent than the email link,
- And the other links retain their current or similar styling.

## Scope Boundary

**In scope:**
- Visual/styling changes to the email CTA link in Hero.tsx only
- Layout, size, font-weight, font-family, spacing, border, or background modifications
- Any reordering of links if beneficial

**Out of scope:**
- Changing accent color definitions or theme colors
- Modifying other sections
- Adding new components or animations to the CTA area
- Mobile-specific behavior (should work responsively but no separate mobile treatment)

## Techniques to Consider (No Accent Color)

The backlog item explicitly says: "use another technique of layout modification, sizes, or font different, or whatever, just put coloring with accent color in the last option."

Ideas:
- Larger font size for email CTA
- Different font weight (bold/semibold)
- Button-style with border (using ink colors, not accent)
- Negative space / spacing differentiation
- Different font family (e.g., serif instead of mono)
- Inline-block with padding creating a button appearance
- Decorative underline or arrow treatment

---

## Phase 2 — Design

### Design Decision: Bordered button + layout separation

The email CTA will become a **bordered inline-button** with its own visual row, while the secondary links (github, linkedin, cv) remain as plain text links grouped together above it.

This approach works well because:
- The **border** provides strong visual weight without any color change — universally recognized as a "button/primary action"
- The **padding** creates a larger hit target and a different shape (pill) that contrasts with plain text links
- The **layout separation** (own row with top margin) reinforces hierarchy through spatial grouping
- The **monospace font** is kept to stay consistent with the terminal aesthetic
- **No accent color** is used — only `ink` and `ink-muted` tokens

### Component Responsibility

**File:** `src/components/sections/Hero.tsx` (Server Component — no changes to boundary)

The Hero component owns the CTA area. No new components are needed — this is purely a styling/layout change within Hero.

### Layout Structure

```
Current:
┌─────────────────────────────────────┐
│  github →  linkedin →  cv →  email → │   ← single flex row, all same style
└─────────────────────────────────────┘

Proposed:
┌─────────────────────────────────────┐
│  github →   linkedin →   download cv →  │   ← secondary links row (plain text, muted)
│                                      │
│  ┌────────────────────────────────┐  │
│  │  get in touch →                │  │   ← primary CTA row (bordered button)
│  └────────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Class Definitions

**Secondary links** (github, linkedin, cv) — unchanged:
```
font-mono text-sm text-ink-muted hover:text-accent transition-colors
```

**Primary CTA** (email) — new style:
```
inline-flex items-center gap-2 font-mono text-sm text-ink
border border-ink/30 rounded-sm px-4 py-2
hover:border-ink/60 transition-colors
```

Breaking down the primary CTA:
| Property | Value | Purpose |
|----------|-------|---------|
| `inline-flex items-center gap-2` | — | Align arrow with text |
| `font-mono text-sm` | same as before | Consistent with terminal aesthetic |
| `text-ink` | upgraded from `text-ink-muted` | Higher contrast, more prominent |
| `border border-ink/30` | subtle ink border | Creates button shape without color |
| `rounded-sm` | small radius | Sharp but not harsh — fits terminal vibe |
| `px-4 py-2` | padding | Creates larger click target and visual mass |
| `hover:border-ink/60` | darker border on hover | Subtle interactive feedback |

### Data Flow

No data flow changes. The `links.email` value from `portfolio.ts` is already consumed. Only the rendering of that link changes.

### Link Text Change

Current: `email →`
Proposed: `get in touch →`

Rationale: "get in touch" is more inviting and action-oriented than the generic "email" label. It also differentiates the CTA semantically, not just visually.

### What Doesn't Change

- `TrackedLink` component — unchanged
- `portfolio.ts` — no data changes (links.email URL stays the same)
- `types/index.ts` — no type changes
- `globals.css` — no new utility classes needed (all Tailwind)
- All other sections — untouched

---

---

## Phase 3 — Task List

1. [x] Split CTA area into secondary links row + primary email CTA row with bordered button styling and `get in touch →` text — `src/components/sections/Hero.tsx` — satisfies US-1, US-2
2. [x] Run `npm run type-check` to verify no type errors

## Implementation Notes

_Records deviations from this design during Phase 4._
