# BACKLOG-009 — Fix useIsMobile SSR runtime error

## Problem

`window is not defined` runtime error at `src/hooks/useIsMobile.ts:8` during server-side rendering.
The `useState` initializer calls `window.innerWidth` before the browser environment is available.

## Fix

Single-line change: initialize `useState` with `false` instead of `() => window.innerWidth < breakpoint`.
The `useEffect` already handles setting the correct value on mount.

## Implementation Notes

- No design changes needed — `ChatInterface` already handles both mobile and desktop paths.
