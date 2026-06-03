# SPEC-006 — Experience Section

**Status:** TODO  
**Components:** `src/components/sections/Experience.tsx` (Server), `src/components/ui/Timeline.tsx` (Server)  
**Section ID:** `#experience`  
**Section Number:** 03  
**Priority:** P1  
**Data source:** `portfolio.experience[]`

---

## Purpose

Displays Devin's work and organizational experience in a vertical timeline layout.
Focused, no filler copy.

---

## Layout

```
03 / experience

│  ●  Deputy Head of IT                    Mar 2022 – Mar 2023
│     Eksekutif Mahasiswa Informatika
│     › Managed IT department operations...
│     › Oversaw digital communications...
│     [leadership] [project mgmt] [coordination]
│
│  ●  Practicum Assistant — Basic Programming   Mar 2021 – Jun 2022
│     Brawijaya University
│     › Led weekly lab sessions for 37 students
│     › Topics: Java I/O, data types, loops...
│     [java] [teaching] [curriculum design]
```

---

## Requirements

### Experience Section Component

| ID | Requirement |
|---|---|
| X-01 | Section label: `03 / experience` |
| X-02 | Renders `<Timeline items={experience} />` |

### Timeline Component

| ID | Requirement |
|---|---|
| T-01 | Vertical line on left side: `absolute left-2 top-2 bottom-2 w-px bg-border` |
| T-02 | Each entry has a dot: `w-4 h-4 rounded-full border-2 border-accent bg-background` |
| T-03 | Dot is positioned: `absolute left-0 top-1.5` relative to the entry |
| T-04 | Entry content left-padded: `pl-8` |
| T-05 | Role name: `text-ink font-medium text-sm` |
| T-06 | Organization: `text-accent font-mono text-xs mt-0.5` |
| T-07 | Date range: `font-mono text-xs text-ink-muted` — use `formatDateRange()` from `@/lib/utils` |
| T-08 | Date range right-aligned within the entry header row |
| T-09 | Highlights as `<ul>`: each `<li>` with `›` accent bullet, `text-sm text-ink-muted` |
| T-10 | Skill tags: `font-mono text-xs text-ink-muted border border-border px-2 py-0.5 rounded` |
| T-11 | Space between timeline entries: `space-y-8` |
| T-12 | Entries ordered newest-first (already ordered in `portfolio.ts`) |

---

## Acceptance Criteria

- [ ] Vertical line visible and connected through all entries
- [ ] Dots aligned with the vertical line
- [ ] Date ranges formatted correctly (e.g. "Mar 2022 – Mar 2023")
- [ ] Highlights render as a bullet list
- [ ] Skill tags visible below highlights
- [ ] Mobile layout: date range wraps below role/org if needed
