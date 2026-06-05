# BACKLOG-006: Mouse-Following Accent Light (v2 — Particle Dots)

**Status**: Phase 4 — Complete
**Source**: docs/BACKLOG.md
**Replaces**: Original CursorGlow radial gradient design

---

## Problem

On desktop screens, all content is constrained to `max-w-content` (720px) centered on the page. The page feels static and the empty margins look unintentional. Need an ambient, interactive effect that makes the page feel alive and utilizes the full viewport.

## Concept (Revised)

A field of small, sparse dots scattered across the full viewport background, inspired by the Google Antigravity landing page. The dots are static by default but **illuminate** (increase opacity/glow) as the mouse cursor passes near them on desktop. On mobile, dots illuminate based on touch position. This creates a "light revealing" effect — the cursor acts as a flashlight exposing hidden particles in the dark.

## User Stories

1. **As a visitor**, I want to see subtle small dots scattered across the page background so the page feels textured and alive.
2. **As a visitor on desktop**, I want the dots near my cursor to glow/brighten as I move so the page feels interactive and responsive.
3. **As a visitor on mobile**, I want the dots near my touch point to glow so the same effect works on small screens.
4. **As a visitor**, I want the dots to be subtle enough that they don't distract from the content.

## Acceptance Criteria

### Story 1 — Sparse dot field visible
- Given I view the site on any screen size
- When the page loads
- Then I see small dots scattered across the full viewport background
- And the dots are sparse (not dense) with random distribution

### Story 2 — Mouse-proximity illumination on desktop
- Given I view the site on desktop
- When I move my mouse cursor
- Then dots within a certain radius of the cursor glow brighter (increase opacity from faint to visible)
- And dots outside the radius remain faint

### Story 3 — Touch illumination on mobile
- Given I view the site on mobile
- When I touch the screen
- Then dots within a radius of the touch point glow brighter
- And when I lift my finger, the dots fade back to faint

### Story 4 — Subtlety
- Given the dot field is present
- When I am reading content
- Then dots do not obscure or compete with text
- And dots use the accent palette at very low opacity by default

### Story 5 — Performance
- Given the dot field is present
- When I move my mouse or scroll
- Then there is no jank or stuttering
- And the effect uses `requestAnimationFrame` with GPU-accelerated transforms

## Scope

### In scope
- Canvas-based dot rendering (not individual DOM elements — too many for DOM)
- Random dot positions generated once on mount
- Mouse proximity detection on desktop, touch on mobile
- Opacity animation based on distance from cursor
- Integration into root layout (`layout.tsx`)

### Out of scope
- Connecting lines between dots (constellation effect)
- Dots moving/drifting on their own
- Color-shifting or multi-color dots
- WebGL/Three.js — overkill for this

---

## Phase 2 — Design (Revised)

### Architecture

Single `'use client'` component `CursorGlow` using a `<canvas>` element. No React state during animation — all rendering is via Canvas 2D API with `requestAnimationFrame`. No new types needed beyond the internal `Dot` interface.

### Why Canvas (not DOM elements)

150 individual `<div>` elements would trigger layout/paint for each opacity change. A single `<canvas>` is one compositing layer — all 150 dots are drawn in one paint pass. Canvas 2D is more than sufficient for simple circles; WebGL/Three.js would be overkill.

### Component: `src/components/ui/CursorGlow.tsx`

**Directive:** `'use client'` — needs browser events, canvas API, and rAF.

**Rendering element:** A single `<canvas>`:

| Property | Value | Rationale |
| --- | --- | --- |
| Position | `fixed inset-0` | Covers full viewport, ignores scroll |
| Pointer events | `pointer-events-none` | No interaction blocking |
| z-index | `z-[1]` | Above body bg, below all content |
| Blend mode | `mix-blend-mode: screen` | Additive blending — dots look like light sources on the dark background, not flat colored circles |
| A11y | `aria-hidden="true"` | Decorative |

**DPR handling:** Canvas physical size = viewport × devicePixelRatio. Drawing uses CSS pixels via `ctx.setTransform(dpr, ...)`. Dots render crisp on retina displays.

### Dot Data Model

```typescript
interface Dot {
  nx: number  // normalized x position [0, 1]
  ny: number  // normalized y position [0, 1]
  opacity: number  // current animated opacity (lerps toward target)
}
```

**Normalized coordinates** — positions stored as [0, 1]. Multiplied by viewport dimensions at draw time. Benefits:
- Survives viewport resize without regeneration
- No dots lost or orphaned at edges
- No "jumping" on resize

### Configuration Constants

| Constant | Value | Rationale |
| --- | --- | --- |
| `DOT_COUNT` | 150 | Sparse on 1920×1080 (~1 dot per 14K px²). Noticeable but not cluttered. |
| `DOT_RADIUS` | 1.5 | Small specks, like Antigravity. Visible but delicate. |
| `BASE_OPACITY` | 0.08 | Nearly invisible at rest — just a hint of texture. |
| `MAX_OPACITY` | 0.5 | Clearly visible near cursor but not overpowering. |
| `ILLUMINATION_RADIUS` | 200px | Generous radius for smooth reveal. |
| `LERP_FACTOR` | 0.1 | Smooth fade-in/out per frame (~10 frames to reach target). |

### Animation Model — Per-Dot Lerping

Each dot has a `currentOpacity` that **lerps toward a target** every frame:

```
For each dot per frame:
  1. dx = (dot.nx × viewportWidth) - cursor.x
     dy = (dot.ny × viewportHeight) - cursor.y
     dist = √(dx² + dy²)

  2. if cursor.active AND dist < ILLUMINATION_RADIUS:
       t = 1 - (dist / ILLUMINATION_RADIUS)
       targetOpacity = BASE + (MAX - BASE) × t²    ← easeOut quad
     else:
       targetOpacity = BASE_OPACITY

  3. dot.opacity += (target - dot.opacity) × LERP_FACTOR

  4. Draw circle at (dot.nx × W, dot.ny × H) with dot.opacity
```

**Key behaviors:**
- **Fade in:** When cursor enters proximity, target jumps up, lerp smoothly catches up (~10 frames = ~160ms at 60fps)
- **Fade out:** When cursor leaves or mouse leaves page, target drops to BASE, lerp smoothly decays (~10 frames)
- **No separate fade-out logic needed** — the lerp model handles both directions naturally

### Loop Lifecycle

```
Page load
  → Generate 150 dots (normalized coords, opacity = BASE)
  → Canvas sized to viewport
  → Loop NOT running (idle, zero CPU)

Mouse moves
  → Store cursor position, set active = true
  → If loop not running: start rAF loop
  → Loop draws until cursor inactive AND all dots ≈ BASE_OPACITY
  → Then stops (idle again)
```

### Event Handling

| Event | Platform | Action |
| --- | --- | --- |
| `mousemove` | Desktop | Set cursor position + active=true; start loop if idle |
| `mouseleave` (documentElement) | Desktop | Set active=false (dots naturally fade to BASE via lerp) |
| `touchmove` (passive) | Mobile | Set cursor position from `touches[0]` + active=true; start loop |
| `touchend` | Mobile | Set active=false |
| `resize` | Both | Resize canvas, re-apply DPR transform (dots survive via normalized coords) |

### Data Flow

```
Browser events (mousemove / touchmove)
        ↓
cursorRef.current = { x, y, active }   (ref, not state)
        ↓
rAF loop (only when active or dots animating)
        ↓
For each dot: calculate target opacity from distance
             lerp currentOpacity toward target
             draw circle via ctx.arc()
        ↓
When all dots at BASE and cursor inactive → stop loop
```

Zero React re-renders. Zero state updates. All animation is imperative canvas drawing driven by refs.

### Integration: `src/app/layout.tsx`

```tsx
<CursorGlow />   // ← before {children}, z-[1] below content
{children}
```

### Files Changed

| File | Action | Description |
| --- | --- | --- |
| `src/components/ui/CursorGlow.tsx` | **Rewrite** | Canvas-based particle dots replacing radial gradient |
| `src/app/layout.tsx` | No change | Already integrated from Phase 4 |

---

## Phase 3 — Task List (Revised)

- [x] **Task 1** — Rewrite `src/components/ui/CursorGlow.tsx`: replace the radial gradient `<div>` with a `<canvas>` element. Generate 150 dots with normalized [0,1] coordinates. Implement per-dot opacity lerping with distance-based target (BASE 0.08 → MAX 0.5, 200px illumination radius, easeOut quad falloff). Attach `mousemove`/`mouseleave`/`touchmove`/`touchend`/`resize` listeners in `useEffect`. Self-stopping rAF loop (idle when cursor off-page and all dots at base). DPR-aware canvas sizing via `ctx.setTransform`. Apply `mix-blend-mode: screen`, `pointer-events-none`, `z-[1]`, `aria-hidden`. *(Satisfies AC: Story 1, 2, 3, 4, 5)*

- [x] **Task 2** — Run `npm run type-check`. Verify no type errors. *(Satisfies AC: no regressions)*

- [ ] **Task 3** — Visually verify on dev server: dots are sparse and barely visible at rest, illuminate near cursor on desktop, illuminate on touch on mobile, fade out when cursor leaves. *(Satisfies AC: Story 1, 2, 3, 4)*

---

## Implementation Notes

No deviations from design. Type-check passes cleanly. Canvas-based particle system replaces the original radial gradient approach.
