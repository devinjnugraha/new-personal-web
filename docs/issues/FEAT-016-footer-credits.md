# FEAT-016 — Footer Credits & AI-DLC Showcase

## Phase 1 — Spec

### User Stories

1. **As a visitor**, I want to see that this site was built with Claude Code and a GLM model, so that I understand the AI tooling behind it.
2. **As a visitor**, I want clickable links on "Claude Code" (→ `https://claude.com/product/claude-code`) and "GLM" (→ `https://z.ai/subscribe`), so that I can learn more about each tool.
3. **As a visitor**, I want to see the AI-DLC methodology credited with a learn-more link, so that I can explore the development approach used.
4. **As the site owner**, I want the footer to feel cohesive with the existing dark, minimal aesthetic, so that it doesn't break the visual design.

### Acceptance Criteria

- **AC-1**: Footer displays credit text mentioning "Claude Code" and "GLM" model.
- **AC-2**: "Claude Code" text links to `https://claude.com/product/claude-code`.
- **AC-3**: "GLM" text links to `https://z.ai/subscribe`.
- **AC-4**: Footer displays "AI-DLC" methodology with a hyperlink to `https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/`.
- **AC-5**: Footer retains the existing copyright line `© {year} Devin Jaya Nugraha`.
- **AC-6**: Footer visual style matches the existing site aesthetic (dark background, muted text, mono font for labels).
- **AC-7**: All external links open in a new tab (`rel="noopener noreferrer" target="_blank"`).

### Scope

- **In scope**: Footer content update only — credit line, AI-DLC line, copyright line.
- **Out of scope**: Any structural/layout changes to the page, new animations, or additional footer links (social, etc.).

---

## Phase 2 — Design

### Component: Footer (inline in `src/app/page.tsx`)

The footer is simple enough to remain inline JSX — no separate component file needed.

### Layout (top → bottom)

```
┌──────────────────────────────────────────────────┐
│  border-t                                          │
│                                                    │
│  © 2026 Devin Jaya Nugraha          (ink-muted)    │
│                                                    │
│  Vibed using <Claude Code↗> & <GLM↗>  (accent)     │
│  Built with <AI-DLC methodology↗>       (accent)   │
│                                                    │
└──────────────────────────────────────────────────┘
```

- Copyright line: `text-sm font-mono text-ink-muted` — primary footer identity
- Credits section: `text-sm font-mono text-ink-faint` with `mt-6` gap — visually subordinate
- Links: `text-accent underline underline-offset-2 hover:text-accent-light transition-colors` — always colored, underlined, with ↗ suffix indicating external link
- Container keeps existing classes: `mx-auto max-w-content px-6 py-16 border-t border-border mt-8`

### Data Flow

- No new data sources — all text and URLs are static and self-contained in the JSX
- No props, no state, no client-side interactivity beyond native link navigation

### Link Map

| Label         | URL                                                        | Target |
| ------------- | ---------------------------------------------------------- | ------ |
| Claude Code   | `https://claude.com/product/claude-code`                  | _blank |
| GLM           | `https://z.ai/subscribe`                                   | _blank |
| AI-DLC methodology | `https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/` | _blank |

### File Change

Only one file touched: `src/app/page.tsx` — replace the existing single-line footer with the expanded three-line version.

---

## Phase 3 — Tasks

- [x] **Task 1** — Update footer JSX in `src/app/page.tsx`: replace single copyright line with three-line footer (copyright, "Vibed using" credits with Claude Code + GLM links, "Built with" AI-DLC link). All links use `target="_blank" rel="noopener noreferrer"`. Satisfies AC-1 through AC-7.
- [x] **Task 2** — Run `npm run type-check` and `npm run build` to verify no regressions.
