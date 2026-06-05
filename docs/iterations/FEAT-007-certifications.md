# SPEC-007 — Certifications & Achievements Section

**Status:** TODO  
**Component:** `src/components/sections/Certifications.tsx` (Server Component)  
**Section ID:** `#certifications`  
**Section Number:** 04  
**Priority:** P1  
**Data source:** `portfolio.certifications[]`, `portfolio.achievements[]`

---

## Purpose

Displays Devin's professional certifications and notable achievements. Certifications
are shown as a grid of cards; achievements as a compact list below.

---

## Layout

```
04 / certifications & achievements

CERTIFICATIONS

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ TensorFlow       │  │ Google Data      │  │ Google IT Auto   │
│ Developer Cert   │  │ Analytics Cert   │  │ with Python      │
│ Google · 2023    │  │ Google · 2022    │  │ Google · 2022    │
│ [TF][DL][CNN]    │  │ [SQL][R][BQ]     │  │ [Python][Git]    │
│ verify ↗         │  │ verify ↗         │  │ verify ↗         │
└──────────────────┘  └──────────────────┘  └──────────────────┘

ACHIEVEMENTS

★  7th Place — ISFEST UMN 2023 Data Competition
   Placed 7th in a national data science competition...

★  Graduated in 3.5 Years with Very Satisfactory Standing
   Completed a 4-year CS program at Brawijaya University in 3.5 years.
```

---

## Requirements

### Certifications Grid

| ID   | Requirement                                                                                                                            |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------- |
| C-01 | Sub-label: `"CERTIFICATIONS"` in section-label style, `mb-4`                                                                           |
| C-02 | Grid: `grid grid-cols-1 md:grid-cols-3 gap-4 mb-10`                                                                                    |
| C-03 | Card: `border border-border rounded-lg p-5 bg-background-surface hover:border-border-strong transition-colors`                         |
| C-04 | Cert name: `text-ink font-medium text-sm leading-snug`                                                                                 |
| C-05 | Issuer + year: `text-ink-muted text-xs font-mono mt-1`                                                                                 |
| C-06 | Skill tags: max 3 visible — `font-mono text-xs text-ink-muted border border-border px-2 py-0.5 rounded` in `flex flex-wrap gap-1 mt-3` |
| C-07 | If `credentialUrl` is non-empty: render `"verify ↗"` link — `text-accent text-xs font-mono hover:underline mt-3 inline-block`          |
| C-08 | If `credentialUrl` is empty: omit verify link entirely                                                                                 |
| C-09 | If `badgeUrl` is non-empty: render badge image at top-left of card — `next/image`, `h-12`, `object-contain`, `alt={cert.name}`, `mb-3` |
| C-10 | If `badgeUrl` is empty/undefined: omit badge entirely (no placeholder)                                                                 |
| C-11 | Featured cards (`featured: true`): use `border-accent` instead of `border-border`                                                      |
| C-12 | Non-featured cards (`featured: false`): use `border-border opacity-60` for muted appearance                                            |
| C-13 | Featured cards: show `★ featured` label — `text-accent font-mono text-xs float-right` at top of card                                   |

### Achievements List

| ID   | Requirement                                                                           |
| ---- | ------------------------------------------------------------------------------------- |
| A-01 | Sub-label: `"ACHIEVEMENTS"` in section-label style, `mb-4`                            |
| A-02 | List: `space-y-4`                                                                     |
| A-03 | Each row: `flex gap-3 items-start`                                                    |
| A-04 | Icon: `★` for `type === 'competition'`; `◆` for `type === 'academic'` — `text-accent` |
| A-05 | Title: `text-ink text-sm font-medium`                                                 |
| A-06 | Description: `text-ink-muted text-sm`                                                 |
| A-07 | Year: `font-mono text-xs text-ink-muted`                                              |

---

## Acceptance Criteria

- [ ] Three certification cards render in a 3-column grid on desktop
- [ ] Cards stack to 1-column on mobile
- [ ] Skill tags do not overflow card width
- [ ] Verify link only appears when `credentialUrl` is non-empty
- [ ] Both achievements render with correct icons
