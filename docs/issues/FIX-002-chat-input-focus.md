# FIX-002 — Chat Input Focus + Reusable isMobile Hook

**Source:** BACKLOG-008
**Date:** 2026-06-06
**Status:** Phase 4 — Complete

---

## Phase 1 — Spec

### User Stories

**Story 1 — Chat input focus behavior**
- **As a visitor on desktop**, I want the chat input to retain focus after submitting a message so that I can continue typing follow-up questions without clicking back into the input field.
- **As a visitor on mobile**, I want the chat input to blur after submitting a message so that the on-screen keyboard collapses and I can read the AI response without the keyboard blocking the view.

**Story 2 — Reusable mobile detection**
- **As a developer**, I want a `useIsMobile()` React hook so that viewport-based mobile detection is consistent, centralized, and reusable across the codebase instead of scattered `window.innerWidth` checks.

### Acceptance Criteria

**AC-1: Desktop retains focus after submit**
- **Given** the viewport width is ≥ 768px (desktop breakpoint)
- **And** the user has focus in the chat input
- **When** the user submits a message (Enter key or send button)
- **Then** the chat input retains focus
- **And** the cursor is positioned in the empty input field

**AC-2: Mobile blurs after submit**
- **Given** the viewport width is < 768px (mobile breakpoint)
- **And** the user has focus in the chat input
- **When** the user submits a message (Enter key or send button)
- **Then** the chat input loses focus
- **And** the on-screen keyboard collapses

**AC-3: useIsMobile hook exists and is reactive**
- **Given** the `useIsMobile()` hook is imported
- **When** called with no arguments, it returns a reactive `boolean`
- **And** the value updates on window resize
- **And** the default breakpoint is 768px

**AC-4: All existing `window.innerWidth` checks refactored**
- **Given** the codebase previously had direct `window.innerWidth < 768` checks in `ChatInterface.tsx` (3 occurrences)
- **When** the refactor is complete
- **Then** zero `window.innerWidth` checks remain in component code
- **And** all 3 call sites use the new `useIsMobile()` hook instead

### Scope Boundary

- **In scope:**
  - Chat input focus/blur behavior on message submit
  - New `useIsMobile()` hook in `src/hooks/`
  - Refactor all 3 `window.innerWidth` checks in `ChatInterface.tsx`
- **Out of scope:**
  - Starter prompt click behavior changes
  - Overlay open/close focus behavior changes
  - Visual keyboard handling beyond blur
  - Adding media query SSR safety (hydration mismatch) — desktop-only chat section is not SSR-visible via `window` checks which are client-only

### Current State

3 occurrences of `window.innerWidth < 768` in `ChatInterface.tsx`:
1. **Line 152** — `handleSubmit`: unconditional blur (the original bug)
2. **Line 164** — `handleStarterClick`: opens overlay on mobile
3. **Line 171** — `handleInputFocus`: opens overlay on mobile

---

## Phase 2 — Design

### New File: `src/hooks/useIsMobile.ts`

**Responsibility:** Single-purpose hook that returns a reactive boolean indicating whether the viewport is below the mobile breakpoint.

```typescript
// Signature
export function useIsMobile(breakpoint?: number): boolean
```

| Param | Type | Default | Description |
|---|---|---|---|
| `breakpoint` | `number` | `768` | Width threshold — `true` when `window.innerWidth < breakpoint` |

**Implementation approach:**
- Uses `useState` initialized from `window.innerWidth < breakpoint`
- Subscribes to `window` `resize` event via `useEffect`
- Cleans up listener on unmount
- No SSR mismatch concern — component is `'use client'` and only runs in browser

### Modified File: `src/components/sections/ChatInterface.tsx`

**Changes:**
1. Add import: `import { useIsMobile } from "@/hooks/useIsMobile"`
2. Call `const isMobile = useIsMobile()` at the top of the component
3. Replace 3 `window.innerWidth < 768` checks with `isMobile`:

| Location | Current | After |
|---|---|---|
| `handleSubmit` (line 152) | unconditional `blur()` | `if (isMobile) inputRef.current?.blur()` |
| `handleStarterClick` (line 164) | `if (window.innerWidth < 768)` | `if (isMobile)` |
| `handleInputFocus` (line 171) | `if (window.innerWidth < 768)` | `if (isMobile)` |

**Note on `handleStarterClick` and `handleInputFocus`:** These are currently wrapped in `useCallback` or inline. Since `isMobile` is reactive (state-driven), it can be used directly without wrapper changes.

### Data Flow

No data flow changes. `useIsMobile` is a local state hook — it reads `window.innerWidth` and exposes a boolean. No props, context, or API changes.

### No New Types

No new TypeScript types needed. The hook returns `boolean`.

---

## Phase 3 — Task List

- [x] **Task 1:** Create `src/hooks/useIsMobile.ts` — implement `useIsMobile(breakpoint?: number): boolean` with `useState` + `resize` listener, default breakpoint 768. *(→ AC-3)*
- [x] **Task 2:** Add `import { useIsMobile }` and `const isMobile = useIsMobile()` to `ChatInterface.tsx`. *(→ AC-4)*
- [x] **Task 3:** Replace `handleSubmit` blur — change unconditional `inputRef.current?.blur()` to `if (isMobile) inputRef.current?.blur()`. *(→ AC-1, AC-2)*
- [x] **Task 4:** Replace `handleStarterClick` — change `if (window.innerWidth < 768)` to `if (isMobile)`. *(→ AC-4)*
- [x] **Task 5:** Replace `handleInputFocus` — change `if (window.innerWidth < 768)` to `if (isMobile)`. *(→ AC-4)*
- [x] **Task 6:** Run `npm run type-check` to verify no type errors. *(→ all)*

---

## Implementation Notes

- Updated `handleInputFocus` `useCallback` deps from `[]` to `[isMobile]` since it now depends on the reactive value
- `npm run type-check` passed clean — zero errors
