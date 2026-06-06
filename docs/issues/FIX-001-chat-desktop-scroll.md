# FIX-001 — Chat Desktop Scroll to Message End

**Backlog:** BACKLOG-001
**Status:** Phase 4 — Complete
**Date:** 2026-06-06

---

## Phase 1 — Spec

### Problem

When new messages arrive in the chat on desktop (non-expanded) view, `scrollIntoView({ behavior: "smooth" })` is called on the messages-end sentinel. This scrolls ALL ancestor scrollable containers — including the page `<body>` — causing the entire page to jump down to reveal the chat section. On mobile expanded view, the body scroll is locked (`overflow: hidden`) so the issue doesn't manifest.

### User Stories

**US-1: Desktop chat auto-scroll stays within the chat box**
As a desktop visitor, when the AI responds to my message, I want the chat message list to auto-scroll to the latest message without the page itself scrolling, so that I maintain my position on the page and only the chat box content moves.

**US-2: Mobile expanded chat auto-scroll continues to work correctly**
As a mobile visitor using the expanded chat overlay, I want the chat messages to auto-scroll to the bottom as before, with no regression in behavior.

### Acceptance Criteria

- **AC-1 (US-1):** On desktop view (chat not expanded), when a message is sent or received, only the chat message container (`h-96 overflow-y-auto` div) scrolls to the bottom — the page scroll position must remain unchanged.
- **AC-2 (US-2):** On mobile expanded overlay, auto-scroll to bottom continues to function as before (messages area scrolls, overlay remains positioned correctly).
- **AC-3 (US-1):** The auto-scroll behavior on desktop should match the current smooth scrolling feel.
- **AC-4:** Existing manual scrolling by the user within the chat box must not be disrupted.

### Scope

**In scope:**
- Fix the auto-scroll logic for the desktop (non-expanded) chat view

**Out of scope:**
- Any changes to mobile expanded overlay behavior
- Any visual/layout changes to the chat section
- Any changes to the chat API or message handling

---

## Phase 2 — Design

### Root Cause

`scrollIntoView()` walks up the ancestor chain and scrolls every scrollable container to bring the target into view. In the desktop view, the chat message container (`h-96 overflow-y-auto`) is nested inside the normal page flow. When `scrollIntoView()` is called on the sentinel `<div ref={messagesEndRef} />` at line 124, it scrolls both the chat container AND the page body.

The mobile expanded overlay is unaffected because `document.body.style.overflow = "hidden"` prevents the page from scrolling (line 59).

### Solution

Replace the single `messagesEndRef` sentinel approach with a `scrollContainerRef` that targets the `overflow-y-auto` div directly. Use `Element.scrollTo()` instead of `scrollIntoView()` — this only scrolls the targeted element, never ancestors.

### Changes — Single File: `src/components/sections/ChatInterface.tsx`

**1. New ref: `scrollContainerRef`**
- Type: `useRef<HTMLDivElement>(null)`
- Purpose: holds a reference to the `overflow-y-auto` message container(s)

**2. Replace auto-scroll effect (lines 118–125)**
- Current: `messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })`
- New: find both the desktop container and the overlay container (both rendered by `renderMessages`), and call `scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: "smooth" })` on each
- Implementation: use `scrollContainerRef` attached via a callback ref pattern or query the DOM by `[data-scroll-container]` data attribute. The data attribute approach is simpler since `renderMessages` is called in two places (desktop section at line 283 and overlay at line 339) and they share the same ref via the function body scope.

**3. Attach ref to both message containers**
- Desktop container (line 283): add `ref={scrollContainerRef}` to the `h-96 overflow-y-auto` div
- Overlay container (line 339): the overlay's `flex-1 overflow-y-auto` div also needs scrolling
- Since `renderMessages` is a shared function, we use two separate refs or a single ref that gets set to whichever was last mounted. Best approach: **two refs** — `desktopScrollRef` and `overlayScrollRef` — and scroll both in the effect. Only the one currently mounted will have a non-null `.current`.

**4. Remove `messagesEndRef`**
- The sentinel `<div ref={messagesEndRef} />` at the end of `renderMessages` (line 239) is no longer needed and can be removed.

### Data Flow

```
messages state changes (useChat)
  → useEffect fires (dependency: [messages])
    → desktopScrollRef.current?.scrollTo({ top: scrollHeight, behavior: "smooth" })
    → overlayScrollRef.current?.scrollTo({ top: scrollHeight, behavior: "smooth" })
  → Only the currently mounted container has a non-null ref
  → Page body is never touched
```

### Refs Summary

| Ref | Attached to | Purpose |
|-----|-------------|---------|
| `desktopScrollRef` | Desktop `h-96 overflow-y-auto` div (line 283) | Auto-scroll desktop chat |
| `overlayScrollRef` | Overlay `flex-1 overflow-y-auto` div (line 339) | Auto-scroll mobile overlay chat |
| `messagesEndRef` | **Removed** | No longer needed |

### Constraints

- No new dependencies
- No changes to component props or public API
- The `isInitialMount` guard stays — it prevents the first-mount scroll which would cause a page jump even with the new approach

---

## Phase 3 — Task List

All tasks target `src/components/sections/ChatInterface.tsx` only.

- [x] **Task 1:** Add `desktopScrollRef` and `overlayScrollRef` refs (type `useRef<HTMLDivElement>(null)`) — satisfies AC-1, AC-2
- [x] **Task 2:** Replace the auto-scroll `useEffect` (lines 118–125) to call `scrollTo()` on both refs instead of `scrollIntoView()` on `messagesEndRef` — satisfies AC-1, AC-3
- [x] **Task 3:** Remove `<div ref={messagesEndRef} />` sentinel from `renderMessages` (line 239) and remove the `messagesEndRef` declaration (line 48) — satisfies AC-1
- [x] **Task 4:** Attach `desktopScrollRef` to the desktop message container div (`h-96 overflow-y-auto`, line 283) and `overlayScrollRef` to the overlay message container div (`flex-1 overflow-y-auto`, line 339) — satisfies AC-1, AC-2
- [x] **Task 5:** Run `npm run type-check` and `npm run build` to verify no regressions — satisfies AC-1, AC-2, AC-4

---

## Implementation Notes

- Fixed pre-existing `<diy>` typo → `<div>` on line 331 (overlay header) that was causing type-check and build failures before this fix.

