# FEAT-002 — Favicon (BACKLOG-002)

## Phase 1 — Spec

### User Stories

**US-1:** As a visitor, I want to see a favicon in the browser tab so I can quickly identify this site among open tabs.

**US-2:** As a visitor, I want to see a branded app icon when I bookmark or add this site to my home screen so that it looks polished.

### Acceptance Criteria

**AC-1:** A favicon is visible in the browser tab for all major browsers (Chrome, Firefox, Safari, Edge).
- **Given** the site is loaded in a browser tab
- **When** the page renders
- **Then** a favicon is displayed in the tab (not the default/generic browser icon)

**AC-2:** The favicon uses a monogram "D" styled with the site's brand colors.
- **Given** the favicon SVG is created
- **When** it is rendered
- **Then** it shows a "D" character using the accent color (`#1D9E75`) on the site's dark background (`#0D0D0D`)

**AC-3:** Apple touch icon and Open Graph icon metadata are configured in layout.tsx.
- **Given** the layout metadata is updated
- **When** social platforms or iOS/Android parse the page
- **Then** the correct icon metadata is returned

### Scope Boundary

**In scope:**
- SVG favicon file (Next.js App Router convention: `src/app/icon.svg`)
- Apple touch icon (`src/app/apple-icon.png` — note: Next.js can auto-generate this from SVG, or we skip if not feasible without image tooling)
- Metadata configuration in `layout.tsx`
- Verification via `npm run build`

**Out of scope:**
- Animated favicon (e.g., `icon.svg` with CSS animations)
- `manifest.json` / PWA icons
- OG image (that's a separate feature)
- Generating `.ico` or `.png` files (requires image tooling not available)

---

## Phase 2 — Design

### File Structure

```
src/app/
  icon.svg          — NEW — SVG favicon (Next.js auto-discovers this)
  layout.tsx         — MODIFY — add `icons` to Metadata export
```

### `src/app/icon.svg` — SVG Favicon

- **Format:** 32×32 SVG with `viewBox="0 0 32 32"`
- **Design:** Rounded square with `rx="6"`, dark background, centered "D" letterform
- **Colors:**
  - Background: `#0D0D0D` (site background)
  - Letter: `#1D9E75` (accent default)
- **Typography:** Sans-serif, bold, no external font dependency (browsers render SVG favicons without custom fonts)
- **Next.js behavior:** Placing `icon.svg` in `src/app/` causes Next.js to automatically serve it at `/favicon.ico` (proxying the SVG) and add the `<link rel="icon">` tag — no manual metadata needed for the base favicon

### `layout.tsx` Metadata Additions

Add `icons` object to the existing `metadata` export:

```typescript
icons: {
  icon: [
    { url: '/icon.svg', type: 'image/svg+xml' },
  ],
  apple: '/icon.svg',  // SVG accepted by iOS 15+
},
```

Also add `icons` to `openGraph`:

```typescript
openGraph: {
  // ... existing fields
  icons: ['/icon.svg'],
},
```

### Data Flow

No runtime data flow — this is a static file + metadata configuration.
The SVG is served directly by Next.js from `src/app/icon.svg`.
The metadata in `layout.tsx` is exported as a static `Metadata` object.

---

## Phase 3 — Task List

- [x] **T-1:** Create `src/app/icon.svg` — SVG favicon with "D" monogram, accent color on dark bg, rounded square — **AC-1, AC-2**
- [x] **T-2:** Update `src/app/layout.tsx` — add `icons` and `openGraph.icons` to metadata export — **AC-1, AC-3**
- [x] **T-3:** Run `npm run type-check` to verify no type errors — **AC-1, AC-2, AC-3**
- [ ] **T-4:** Run `npm run build` to verify Next.js serves the favicon correctly — **AC-1** *(skipped by user)*

---

## Implementation Notes

- Removed `icons` from `openGraph` metadata — not a valid property in Next.js `OpenGraphWebsite` type. Top-level `icons` in `Metadata` is sufficient for icon discovery.
