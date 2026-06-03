# SPEC-004 — About & Skills Section

**Status:** TODO  
**Component:** `src/components/sections/About.tsx` (Server Component)  
**Section ID:** `#about`  
**Section Number:** 01  
**Priority:** P1  
**Data source:** `portfolio.person.bio`, `portfolio.skills`

---

## Purpose

Provides a slightly expanded bio and a structured skills inventory. Acts as a
quick-scan reference for what Devin knows and does.

---

## Layout

```
01 / about          ← section label

[bio paragraph]     ← 2–3 sentence prose about Devin

Skills              ← sub-label

  Languages  │  Frontend  │  Backend
  Python     │  React     │  Spring Boot
  TypeScript │  Next.js   │  Node.js
  ...        │  ...       │  ...

  ML / AI    │  Data      │  Tools
  TensorFlow │  Pandas    │  Git
  PyTorch    │  NumPy     │  Docker
  ...        │  ...       │  ...
```

---

## Requirements

| ID | Requirement |
|---|---|
| A-01 | Section label: `01 / about` |
| A-02 | Bio paragraph rendered from `portfolio.person.bio` — `text-ink-muted leading-relaxed max-w-lg` |
| A-03 | Skills sub-label: `"skills"` in section-label style, `mt-10 mb-6` |
| A-04 | Skills rendered in a responsive grid: `grid-cols-2 md:grid-cols-3 gap-8` |
| A-05 | Each skill group has a category label in `font-mono text-xs text-ink-muted uppercase tracking-widest mb-3` |
| A-06 | Each skill item is a pill/tag: `font-mono text-xs text-ink-muted border border-border px-2 py-1 rounded` |
| A-07 | Pills in a `flex flex-wrap gap-2` row within each group |
| A-08 | Skill groups in order: Languages, Frontend, Backend, ML/AI, Data, Tools |
| A-09 | No skill item is truncated or overflows its container |

---

## Acceptance Criteria

- [ ] Bio text matches `portfolio.person.bio` value
- [ ] All 6 skill categories rendered
- [ ] Skill pills do not overflow on mobile (375px)
- [ ] Category labels are visually distinct from skill items
