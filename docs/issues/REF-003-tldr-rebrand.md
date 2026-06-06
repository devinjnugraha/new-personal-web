# REF-003 — Rebrand "ask devin" to "TL;DR"

**Source:** BACKLOG-014
**Status:** Phase 4 — Complete

---

## Phase 1 — Spec

### User Stories

- **US-1:** As a visitor, I want the section to be called "TL;DR" so that I immediately understand it's a quick summary/chat shortcut rather than a generic "ask" prompt.
- **US-2:** As a visitor, I want the section description to communicate that this is an AI assistant that can answer questions about Devin on my behalf, so I know what to expect before typing.

### Acceptance Criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-1 | Desktop or mobile nav | Nav renders | The last nav item reads `06 tl;dr` (lowercase) |
| AC-2 | Section heading | Page renders | Section label reads `06 / TL;DR` (uppercase) |
| AC-3 | Section description | Page renders | Description text reads: "TL;DR — Ask Devin's AI assistant. It's read everything on this page so you don't have to." |
| AC-4 | Mobile overlay header | Overlay opens | Header label reads `tl;dr` and subtitle reads `AI assistant` |

### Scope

- **In scope:** Nav label, section label, section description, overlay header label/subtitle
- **Out of scope:** Chat functionality, system prompt, starter prompts, styling, section ID (`#chat` stays unchanged)
