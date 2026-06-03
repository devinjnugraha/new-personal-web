# SPEC-008 — Writing & Research Section

**Status:** TODO  
**Component:** `src/components/sections/Writing.tsx` (Server Component)  
**Section ID:** `#writing`  
**Section Number:** 05  
**Priority:** P1  
**Data source:** `portfolio.publications[]`, `portfolio.writings[]`

---

## Purpose

Showcases Devin's research output — primarily the ScienceDirect Q1 paper — and
links to writings on LinkedIn. The publication is the centerpiece.

---

## Layout

```
05 / writing & research

RESEARCH

┌──────────────────────────────────────────────────────────┐  ← accent border
│  Computers in Biology and Medicine · Q1 · Elsevier       │
│                                                          │
│  Weighted loss for imbalanced glaucoma detection:        │
│  Insights from visual explanations                       │
│                                                          │
│  Devin Jaya Nugraha, Novanto Yudistira, Agus Wahyu W.   │
│  My contribution: Visualization, Software, Investigation  │
│                                                          │
│  [abstract snippet — line-clamp-3]                       │
│                                                          │
│  View on ScienceDirect →                                 │
└──────────────────────────────────────────────────────────┘

WRITINGS

  linkedin  LinkedIn Profile & Posts
            Professional updates, project write-ups, and reflections.
```

---

## Requirements

### Research Subsection

| ID | Requirement |
|---|---|
| W-01 | Sub-label: `"RESEARCH"` in section-label style, `mb-4` |
| W-02 | Publication card: `border border-accent/40 rounded-lg p-6 bg-accent-faint mb-10` |
| W-03 | Header row: `Q1` badge + journal name + publisher (see below) |
| W-04 | Q1 badge: `font-mono text-xs text-accent border border-accent/40 px-2 py-0.5 rounded` |
| W-05 | Journal + publisher: `font-mono text-xs text-ink-muted` separated by ` · ` |
| W-06 | Title: `text-ink font-medium text-lg leading-snug mt-3` |
| W-07 | Authors: `text-ink-muted text-sm mt-2` — all authors joined by `, ` |
| W-08 | My role: `text-ink-muted text-xs font-mono mt-1` — prefix `"My contribution: "` |
| W-09 | Abstract: `text-ink-muted text-sm mt-3 leading-relaxed line-clamp-3` |
| W-10 | CTA: `"View on ScienceDirect →"` — `text-accent text-sm font-mono hover:underline mt-4 inline-block` |
| W-11 | CTA links to `publication.url`, opens in new tab |
| W-12 | Only `featured: true` publications are shown in this featured card |

### Writings Subsection

| ID | Requirement |
|---|---|
| W-13 | Sub-label: `"WRITINGS"` in section-label style, `mb-4` |
| W-14 | List: `space-y-5` |
| W-15 | Each row: `<a>` tag wrapping `flex gap-4 items-start group` |
| W-16 | Type label: `font-mono text-xs text-ink-muted uppercase w-16 shrink-0 mt-0.5` |
| W-17 | Title: `text-ink text-sm group-hover:text-accent transition-colors` |
| W-18 | Description: `text-ink-muted text-xs` |
| W-19 | Each writing link opens in new tab |

---

## Acceptance Criteria

- [ ] Featured publication card uses accent-tinted background and accent border
- [ ] Q1 badge visible in publication card header
- [ ] Abstract is clamped to 3 lines
- [ ] "View on ScienceDirect →" links to the correct URL in new tab
- [ ] LinkedIn link visible in writings list
- [ ] All data from `portfolio.ts` — nothing hardcoded
