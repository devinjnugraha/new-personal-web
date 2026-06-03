# SPEC-005 — Education Section

**Status:** TODO  
**Component:** `src/components/sections/Education.tsx` (Server Component)  
**Section ID:** `#education`  
**Section Number:** 02  
**Priority:** P1  
**Data source:** `portfolio.education[]`, `portfolio.publications[]`

---

## Purpose

Presents Devin's academic background. One institution (Brawijaya University) with
his degree, honors, thesis title, and a direct link to his ScienceDirect publication.

---

## Layout

```
02 / education

┌─────────────────────────────────────────────────────┐
│  Brawijaya University                    [3.5 yrs]  │
│  Bachelor of Computer Science · Informatics          │
│  2020–2023 · Malang, East Java, Indonesia            │
│  Very Satisfactory (Memuaskan)                       │
│  ─────────────────────────────────────────────────  │
│  THESIS                                              │
│  "Optimizing Convolutional Neural Network Using      │
│   Weighted Loss for Glaucoma Detection"              │
│  [Short thesis description]                          │
│  → Published in Computers in Biology and Medicine    │
└─────────────────────────────────────────────────────┘
```

---

## Requirements

| ID | Requirement |
|---|---|
| E-01 | Section label: `02 / education` |
| E-02 | Single card per education entry: `border border-border rounded-lg p-6 bg-background-surface` |
| E-03 | Institution name: `font-serif text-xl text-ink` |
| E-04 | Degree + field: `text-accent font-mono text-sm mt-1` |
| E-05 | Date range + location: `text-ink-muted text-sm mt-2` |
| E-06 | Honor: `text-ink-muted text-sm` |
| E-07 | Duration badge: `[3.5 yrs]` — `font-mono text-xs text-accent border border-accent/30 px-2 py-1 rounded` |
| E-08 | Thesis block separated by `border-t border-border pt-4 mt-4` |
| E-09 | Thesis sub-label: `"THESIS"` in section-label style |
| E-10 | Thesis title: `text-ink text-sm italic leading-relaxed` |
| E-11 | Thesis description: `text-ink-muted text-sm mt-1` |
| E-12 | Link "→ Published in Computers in Biology and Medicine" — resolves `publicationRef` to matching publication URL |
| E-13 | Publication link styled: `text-accent font-mono text-xs hover:underline mt-2 inline-block` |

---

## Data Linkage

The `thesis.publicationRef` field is the `id` of the matching entry in `portfolio.publications[]`.
The Education component must look up the URL from `portfolio.publications`:

```typescript
const pub = portfolio.publications.find(p => p.id === edu.thesis.publicationRef)
// use pub.url and pub.journal for the link
```

---

## Acceptance Criteria

- [ ] Institution name in serif font
- [ ] Duration badge visible in top-right of card
- [ ] Thesis block visually separated from main card content
- [ ] Thesis title links to ScienceDirect publication URL
- [ ] All data from `portfolio.education` — nothing hardcoded
