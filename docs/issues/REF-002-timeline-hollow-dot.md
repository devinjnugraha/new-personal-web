# FEAT-011 — Timeline Last Entry Hollow Dot

**Status:** Iterated
**Source:** BACKLOG-011
**File:** `src/components/ui/Timeline.tsx`

---

## Phase 1 — Spec

### User Story

As a **visitor**, I want the last entry in the timeline to have a **hollow dot** (no accent fill) so that I can visually identify where the timeline ends.

### Acceptance Criteria

| ID | Criterion |
|---|---|
| HD-01 | The last timeline entry dot must NOT have `border-accent` — it should use `border-ink-muted/40 bg-background` (muted border, same page background fill) |
| HD-02 | All other timeline entry dots remain unchanged (solid with `border-accent bg-background`) |
| HD-03 | The change applies on both mobile and desktop views |

### Scope

**In scope:** Timeline dot styling for the last entry only.
**Out of scope:** Any other timeline layout changes, line styling changes, or new features.

---

## Implementation Notes

- Final styling: `border-ink-muted/40 bg-background` — muted border with page background fill (not transparent). User clarified bg should remain `background`.
- **Iteration (2026-06-06):** Changed hollow-dot condition from index-based (`index === items.length - 1`) to `endDate`-based. Past experiences (`endDate !== null`) get hollow dots; active/present experiences (`endDate === null`) get accented dots.

*Resolves:* BACKLOG-011
*References:* FEAT-006-experience.md T-02, Timeline.tsx:19 TODO comment
