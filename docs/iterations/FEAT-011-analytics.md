# SPEC-011 — Analytics & Monitoring

**Status:** TODO  
**Files:** `src/app/layout.tsx`, `src/components/sections/ChatInterface.tsx`  
**Priority:** P1

---

## Purpose

Defines all analytics instrumentation — what to track, where, and how. Uses
Vercel's built-in analytics stack (no external account needed beyond Vercel).

---

## Analytics Stack

| Tool | Purpose | Setup |
|---|---|---|
| `@vercel/analytics` | Page views, unique visitors, referrers, devices | Component in `layout.tsx` |
| `@vercel/speed-insights` | Core Web Vitals (LCP, CLS, FID) per page | Component in `layout.tsx` |
| Custom events via `track()` | Chat interactions, publication clicks, CV downloads | In relevant components |

---

## Layout Setup

### Requirements

| ID | Requirement |
|---|---|
| AN-01 | `<Analytics />` from `@vercel/analytics/react` rendered inside `<body>` in `layout.tsx` |
| AN-02 | `<SpeedInsights />` from `@vercel/speed-insights/next` rendered inside `<body>` in `layout.tsx` |
| AN-03 | Both components placed after the main `{children}` render, at the end of `<body>` |

---

## Custom Event Tracking

All events use `track()` from `@vercel/analytics`:

```typescript
import { track } from '@vercel/analytics'
track('event_name', { key: value })
```

### Event Inventory

| Event Name | Fired When | Properties | Location |
|---|---|---|---|
| `chat_opened` | Chat section mounts (first time) | — | `ChatInterface.tsx` `useEffect([], [])` |
| `chat_message_sent` | User message gets a complete response | `{ messageCount: number }` | `useChat` `onFinish` |
| `chat_error` | Chat API returns an error | — | `useChat` `onError` |
| `publication_clicked` | User clicks "View on ScienceDirect →" | `{ publicationId: string }` | `Writing.tsx` `onClick` |
| `cv_downloaded` | User clicks "download cv →" | — | `Hero.tsx` `onClick` |
| `github_clicked` | User clicks GitHub link | — | `Hero.tsx` `onClick` |
| `linkedin_clicked` | User clicks LinkedIn link | — | `Hero.tsx` or `Writing.tsx` `onClick` |

### Implementation Pattern

For Server Components (Hero, Writing) that need click tracking, use a small inline
`'use client'` wrapper component or an `onClick` on an `<a>` tag:

```tsx
// For <a> tags that need tracking — wrap in a client component
'use client'
import { track } from '@vercel/analytics'

export function TrackedLink({ href, event, children, ...props }) {
  return (
    <a
      href={href}
      onClick={() => track(event)}
      {...props}
    >
      {children}
    </a>
  )
}
```

Alternatively, add tracking to the anchor's `onClick` in the section component
by converting that specific component to `'use client'` (acceptable if the section
is small and has no data-fetching).

---

## What You Can See in Vercel Dashboard

After deployment, navigate to **Vercel Dashboard → Analytics**:

- **Overview:** Unique visitors, page views, bounce rate per day/week/month
- **Top pages:** Verify that `/#chat` section gets scroll depth
- **Referrers:** See if LinkedIn, GitHub, or search engines drive traffic
- **Devices:** Mobile vs desktop split (important for responsive QA)
- **Countries:** Geographic distribution
- **Custom events tab:** Shows `chat_opened`, `chat_message_sent`, `publication_clicked` counts

Speed Insights dashboard shows real-user LCP, CLS, FID scores. Target:
- LCP < 2.5s
- CLS < 0.1
- FID < 100ms

---

## Acceptance Criteria

- [ ] `<Analytics />` and `<SpeedInsights />` present in `layout.tsx`
- [ ] `chat_opened` fires once when chat section mounts
- [ ] `chat_message_sent` fires after each complete AI response
- [ ] `publication_clicked` fires when ScienceDirect link is clicked
- [ ] `cv_downloaded` fires when CV link is clicked
- [ ] No events fire on server render (all `track()` calls are client-side only)
- [ ] Vercel Dashboard shows events after first production visit
