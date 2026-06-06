# FEAT-013: TL;DR Floating Action Button

## Phase 1 — Spec

### User Stories

- **US-1**: As a visitor, I want a floating "TL;DR" button in the bottom-right corner of the page so that I can quickly jump to the TL;DR (chat) section without scrolling manually.
- **US-2**: As a visitor, I want the button to appear only after I've scrolled past the hero section, so that it doesn't clutter the initial landing view.

### Acceptance Criteria

| ID | Given | When | Then |
|----|-------|------|------|
| AC-1 | Visitor is on the page | They scroll past the hero section | A round "TL;DR" floating button appears in the bottom-right corner |
| AC-2 | The TL;DR FAB is visible | Visitor clicks it | The page smoothly scrolls to the `#chat` section |
| AC-3 | Visitor is above the hero | Button is not visible | N/A — button should not render or be hidden |
| AC-4 | TL;DR FAB is visible | Visitor scrolls back to the top | The button disappears (scrolls back to hero area) |
| AC-5 | Visitor is on mobile | They scroll past the hero | The button appears and works identically, positioned with safe-area padding |

### Scope

**In scope:**
- Floating button component with scroll-to-section behavior
- Show/hide based on scroll position (after hero)
- Smooth scroll to `#chat` on click
- Mobile-safe positioning (safe-area-inset-bottom)

**Out of scope:**
- Changes to existing Nav component
- Changes to ChatInterface component
- Scroll-to-top button
- Any tooltip or label beyond "TL;DR"

## Phase 2 — Design

### Component: `TldrFab`

- **File**: `src/components/ui/TldrFab.tsx`
- **Type**: Client Component (`'use client'`) — needs `useEffect` for scroll listener and click handler
- **Responsibility**: Renders a fixed-position floating button that scrolls to `#chat` on click. Manages its own visibility based on scroll position.

### Behavior

- **Scroll threshold**: Listen to `window.scroll` (passive). Show button when `window.scrollY > heroHeight`. Detect hero height by querying `#hero` element on mount and reading its `offsetHeight`.
- **Click handler**: `document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })` — same pattern used in Nav.tsx for mobile nav clicks.
- **Visibility transition**: Use CSS `opacity` + `pointer-events` transition (200ms) for smooth appear/disappear. No Motion library needed for a simple opacity toggle.

### Styling

- Fixed position: `bottom-6 right-6` with `pb-[env(safe-area-inset-bottom)]` for mobile safe area
- Shape: Rounded pill (`rounded-full`)
- Text: `font-mono text-xs uppercase tracking-wide` — matches the site's mono aesthetic and section labels
- Colors: `bg-accent text-[#0D0D0D] font-medium` — matches the user chat bubble style in ChatInterface
- Hover: `hover:opacity-90 transition-opacity`
- z-index: `z-40` — above content, below the mobile chat overlay (`z-50`) and Nav (`z-50`)

### Data Flow

```
Scroll event → useEffect listener → set visible state → conditional render
Click event → scrollIntoView('#chat')
```

No props. No external data dependencies. Self-contained.

### Placement in Layout

- Imported and rendered in `src/app/page.tsx` as a sibling to `<Nav />` — outside `<main>` to avoid being affected by main's max-width/padding constraints.
- Rendered after `<footer>` or as the last element before the closing `</>`.

### No New Types

This component uses no data from `portfolio.ts` and requires no new type definitions.

## Phase 3 — Task List

| # | Task | File(s) | Satisfies |
|---|------|---------|-----------|
| 1 | [x] Create `TldrFab` client component with scroll listener (show when scrolled past `#hero`) and click-to-scroll-to-`#chat` behavior | `src/components/ui/TldrFab.tsx` | AC-1, AC-2, AC-3, AC-4 |
| 2 | [x] Place `<TldrFab />` in page layout, outside `<main>` | `src/app/page.tsx` | AC-1, AC-5 |
| 3 | [x] Run type-check | — | — |

## Implementation Notes

- Visibility logic combines two conditions: show when scrolled past hero AND hide when `#chat` section is in viewport
- Added lucide-react `Pointer` icon (rotate-180) alongside "TL;DR" text per user request
- User added `animate-bounce` to button styling via linter
