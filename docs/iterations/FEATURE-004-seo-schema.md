# FEATURE-004: SEO Optimization with schema.org

**Backlog item:** BACKLOG-004
**Status:** Phase 3 — Tasks

---

## User Stories

1. **As a** search engine crawler, **I want** structured JSON-LD schema.org markup on the page **so that** I can richly index the site's content (person, education, work experience, publications, certifications).

2. **As a** visitor sharing a link on social media, **I want** rich link previews in LinkedIn, Twitter, Slack, etc. **so that** the link stands out with proper title, description, and image.

## Acceptance Criteria

### Story 1 — Schema.org structured data

- **Given** the site is rendered, **When** I inspect the page source, **Then** I see a `<script type="application/ld+json">` tag containing schema.org JSON-LD with:
  - `@type: "Person"` with name, url, jobTitle, email, sameAs (GitHub, LinkedIn), description
  - Nested `alumniOf` for education entries (institution, degree, field, start/end years)
  - Nested `worksFor` or `jobTitle` reflecting experience
  - Nested `hasCredential` for featured certifications (name, issuer, year)
  - Nested `creatorOf` for publications (name, journal, datePublished, url, doi)
  - All data sourced from `portfolio.ts` — no hardcoded values

- **Given** the structured data is validated, **When** I run it through Google's Rich Results Test, **Then** it parses without errors.

### Story 2 — Enhanced social/meta metadata

- **Given** the layout already has OpenGraph and Twitter metadata, **When** I share the site URL on a social platform, **Then** the preview shows title, description, and site name correctly.
- This is already mostly in place; we verify nothing is missing and add `images` if needed.

## Scope

### In scope
- JSON-LD schema.org markup (Person profile)
- Schema.org sub-types: Education, WorkExperience, Certifications, Publications
- Inject structured data via `<script>` tags in layout or page
- All data sourced from `portfolio.ts`

### Out of scope
- Blog post schema (Article) — no blog on this site
- BreadcrumbList schema — single page, no navigation hierarchy
- Organization/WebSite schema — minimal benefit for a personal portfolio
- OpenGraph/Twitter image — no og-image asset exists yet
- Sitemap.xml / robots.txt — not requested

---

## Phase 2 — Design

### Architecture

One new file: `src/lib/schema.ts` — exports a function `generateSchema(data: PortfolioData) => object` that builds the complete JSON-LD object from portfolio data. Existing files modified: `app-config.ts`, `.env.local.example`, `page.tsx`.

### File Responsibilities

| File | Role |
|---|---|
| `.env.local.example` | Add `NEXT_PUBLIC_SITE_URL` env var |
| `src/lib/app-config.ts` | Add `getSiteUrl()` method reading `NEXT_PUBLIC_SITE_URL` (existing config file) |
| `src/lib/schema.ts` | **New** — pure function: takes `PortfolioData`, returns JSON-LD object |
| `src/app/page.tsx` | Calls `generateSchema(portfolio)`, renders `<script type="application/ld+json">` |
| `src/app/layout.tsx` | Replace hardcoded URL in metadata with `appConfig.getSiteUrl()` |

### JSON-LD Structure

Use `@graph` pattern with two top-level entities:

```
@graph [
  { @type: "Person" }       — main profile
  { @type: "ScholarlyArticle" }  — per publication (only featured ones)
]
```

**Person entity** fields (all from `portfolio.person`, `portfolio.links`, `portfolio.education`, `portfolio.experience`, `portfolio.certifications`, `portfolio.skills`):

| Field | Source |
|---|---|
| `name` | `person.name` |
| `url` | `appConfig.getSiteUrl()` via `NEXT_PUBLIC_SITE_URL` |
| `jobTitle` | `person.tagline` |
| `email` | `links.email` (mailto:) |
| `sameAs` | `[links.github, links.linkedin]` |
| `description` | `person.bio` |
| `alumniOf` | `education[]` → `{ @type: "EducationalOrganization", name, department (field) }` |
| `hasCredential` | `certifications[]` → `{ @type: "EducationalOccupationalCredential", name, issuer, dateCredentialIssued }` |
| `knowsAbout` | flattened `skills.*` strings |

**ScholarlyArticle entities** (one per `publications[]`):

| Field | Source |
|---|---|
| `@type` | `"ScholarlyArticle"` |
| `headline` | `publication.title` |
| `author` | `{ @type: "Person", name }` per `publication.authors` |
| `datePublished` | `publication.publishedDate` |
| `isPartOf` | `{ @type: "Periodical", name: journal, publisher }` |
| `url` | `publication.url` |
| `doi` | `publication.doi` (as identifier) |
| `description` | `publication.abstract` |

### Data Flow

```
portfolio.ts (data) → generateSchema(data, siteUrl) → JSON-LD object → <script> tag in page.tsx
```

All values derived from `portfolio.ts`. Site URL comes from `appConfig.getSiteUrl()` → `NEXT_PUBLIC_SITE_URL` env var. The hardcoded URL in `layout.tsx` metadata (`openGraph.url`) will also be replaced with this config value.

### Social Meta Verification

Existing OpenGraph/Twitter metadata in `layout.tsx` already covers title, description, siteName, url, type, and card. No changes needed — Story 2 is already satisfied.

---

## Phase 3 — Task List

1. [x] Add `NEXT_PUBLIC_SITE_URL=https://devinjnugraha.vercel.app` to `.env.local.example`
2. [x] Add `getSiteUrl()` to `src/lib/app-config.ts` reading `NEXT_PUBLIC_SITE_URL`
3. [x] Create `src/lib/schema.ts` with `generateSchema(data, siteUrl)` — builds Person + ScholarlyArticle JSON-LD
4. [x] Update `src/app/layout.tsx` — replace hardcoded URL in `openGraph.url` with `appConfig.getSiteUrl()`
5. [x] Update `src/app/page.tsx` — import `generateSchema`, render `<script type="application/ld+json">`
