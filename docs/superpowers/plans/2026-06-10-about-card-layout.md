# FIX-005: About Card Center-Balance Layout

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the About section card layout so orphan cards on the last row center instead of hanging left at 1/3 width.

**Architecture:** Replace CSS grid with flexbox + `justify-center` and explicit card widths. This makes the last row naturally center its items regardless of count.

**Tech Stack:** React, Tailwind CSS

---

### Task 1: Update container and card classes in About.tsx

**Files:**
- Modify: `src/components/sections/About.tsx:12-28`

- [ ] **Step 1: Update the container div and card wrapper classes**

In `src/components/sections/About.tsx`, replace the grid container (line 12) and card div (line 16):

```tsx
// Line 12 — container: change from grid to flexbox
// OLD:
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// NEW:
      <div className="flex flex-wrap justify-center gap-6">

// Line 14-16 — card wrapper: add responsive width
// OLD:
            className="rounded-lg border border-border p-6 hover:border-accent/50 transition-colors"
// NEW:
            className="w-full md:w-[calc(33.333%-1rem)] rounded-lg border border-border p-6 hover:border-accent/50 transition-colors"
```

- [ ] **Step 2: Run type-check**

Run: `npm run type-check`
Expected: PASS (no type changes)

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "fix: center orphan About cards with flexbox layout"
```

---

### Task 2: Update issue doc and backlog

**Files:**
- Modify: `docs/issues/FIX-005-about-card-layout.md`
- Modify: `docs/BACKLOG.md`

- [ ] **Step 1: Check off all tasks in FIX-005 issue doc**

Mark all tasks `[x]` in `docs/issues/FIX-005-about-card-layout.md`.

- [ ] **Step 2: Check off BACKLOG-021 in BACKLOG.md**

Change `- [ ]` to `- [x]` for BACKLOG-021 and append `{FIX-005}`.

- [ ] **Step 3: Commit**

```bash
git add docs/issues/FIX-005-about-card-layout.md docs/BACKLOG.md
git commit -m "docs: close BACKLOG-021, mark FIX-005 complete"
```
