# FEAT-015 — Fix Auto-Scroll to Chat Section on Page Load

## Phase 1 — Spec

### Bug

Every time the page is refreshed or accessed, the browser immediately scrolls down to section 6 (Ask / Chat).

### Root Cause

`ChatInterface.tsx:118-120` has a `useEffect` that calls `messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })` on every `messages` state change. This effect fires on the **initial mount** (React runs effects after first render). Since the chat section is the last on-page section and below the fold, `scrollIntoView` scrolls the entire page down to make that element visible.

### User Story

As a visitor, I want the page to load at the top so that I can see the hero section first, not be jumped to the chat section.

### Acceptance Criteria

- **Given** a user loads or refreshes the page, **When** the page finishes rendering, **Then** the viewport is at the top of the page (hero section visible)
- **Given** a user sends a chat message, **When** the AI response streams in, **Then** the chat message container auto-scrolls to the latest message (existing behavior preserved)

### Scope

- In scope: Fix auto-scroll on mount only
- Out of scope: Changes to scroll behavior during active chat, CSS `scroll-behavior`, Nav scroll detection

## Phase 2 — Design

### Fix

Add a `useRef` boolean (`isInitialMount`) to skip the `scrollIntoView` call on the first render. On subsequent `messages` changes (new messages arriving), the auto-scroll fires as before.

### File

- `src/components/sections/ChatInterface.tsx` — modify the messages auto-scroll `useEffect`

## Phase 3 — Tasks

- [x] Add `isInitialMount` ref, skip `scrollIntoView` on first render in `ChatInterface.tsx:118-120`
- [x] Verify: page loads at top, chat auto-scroll still works during conversation
