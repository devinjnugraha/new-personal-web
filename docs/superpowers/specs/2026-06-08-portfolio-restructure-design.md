# Portfolio Restructure — Editor's Cut

**Date**: 2026-06-08
**Status**: Approved
**Branch**: `feat/portfolio-restructure`

---

## Problem

Two issues with the current portfolio:

1. **Too much content** — 8 sections, heavy scroll, redundant info (bio repeated in Hero and About, skills grid duplicates what Experience already shows).
2. **Too generic** — reads like a standard dev portfolio template. No personality, no hook, no reason to remember it.

## Goal

Make a potential employer think "I want to talk to this person" within 30 seconds. The site should feel like Devin, not a template.

## Target Audience

- **Recruiters** scanning fast (30-60 seconds) — need scannable signal
- **Engineers** evaluating depth — want to see thinking and proof

Both audiences served by: lean visible content + AI chat for depth.

## Tone of Voice

Wry and understated. Dry humor, understated confidence. Think: good README, not LinkedIn post. Applied to hero copy, section headers, microcopy, and chat starter prompts.

---

## Section Map (8 → 5)

| # | New Section | Killed Sections | What It Contains |
|---|-------------|-----------------|------------------|
| 1 | **Hero** | Current Hero (trimmed) | Name, typewriter tagline (rewritten), 2-sentence hook, links |
| 2 | **About** | Current About (trimmed) | 3-4 strength cards, no bio, no full skills grid |
| 3 | **Work** | Experience + Projects (merged) | Experience timeline + project carousel, interleaved where relevant |
| 4 | **Proof** | Education + Certifications + Research (merged) | Compact cards: edu, certs, publication. Expandable details |
| 5 | **Chat** | TL;DR FAB (elevated) | Full section with hook, explanation, chat interface, rewritten starters |

---

## Section Details

### 1. Hero — Personality Statement

**Changes**:
- Keep typewriter effect (it works)
- Rewrite tagline from resume-speak to wry personality signal
- Trim bio from paragraph to 2 tight sentences max
- Links stay as-is (GitHub, LinkedIn, CV, email)

**Job**: Make the recruiter smile or pause within 5 seconds.

### 2. About — Lean Strengths

**Changes**:
- Remove bio paragraph entirely (hero covers it)
- Replace full skills grid (~24 badges) with 3-4 strength cards

**Strength cards**:
| Card | Concept | Skill Badges |
|------|---------|-------------|
| "I build full-stack apps" | React, Next.js, Spring Boot, ship to production | ~4-5 badges |
| "I do ML research" | CNN, medical imaging, Q1 journal publication | ~4-5 badges |
| "I learn fast" | 3.5-year degree, AWS + TensorFlow dual cert | ~3-4 badges |

Each card: ~2 lines of wry prose + contextual skill badges underneath.

**Why**: The full grid is keyword soup. Strength cards say "here's what I actually do with them."

### 3. Work — Story, Not Lists

**Changes**:
- Merge Experience and Projects into one section
- Experience timeline stays (solid structure)
- Projects attach to relevant experience where possible
- Standalone projects (like this portfolio) stay in carousel
- Wry microcopy in experience highlights

**Flow**: "Here's where I've been" → "Here's what I built there."

### 4. Proof — Compact Evidence

**Changes**:
- Merge Education, Certifications, and Research into one horizontal band
- Education: just university + degree + year (thesis/org details move to AI knowledge base)
- Certifications: badge-style cards — name, issuer, year
- Research: publication title + journal, expandable abstract on click
- Achievements collapsed into compact list within this section

**Job**: Answer "Is this person legit?" in under 10 seconds.

### 5. Chat — The Closer

**Changes**:
- Elevate from FAB button to full section
- Hook header (wry tone)
- Brief explanation of what the assistant does
- Chat interface takes center stage
- Starter prompts rewritten in wry tone
- FAB button removed (chat is now always visible as a section)

**Job**: Catch people who scrolled past everything. Give them a shortcut.

---

## Personality Layer

Applied across all sections:

- **Section headers**: renamed from generic to characterful
- **Microcopy**: button labels, hover states, empty states — wry treatment
- **AI chat**: safety net for anything cut from visible page — the chat knowledge base retains all removed detail

---

## Data Changes

All removed content stays in the data layer (`portfolio.ts`) and the chat knowledge base (`chat-knowledge.ts`). The visible page is a filter, not a deletion. The AI chat can answer questions about:
- Full skills list
- Thesis details
- Organization memberships
- Achievement descriptions
- Publication abstracts

---

## Out of Scope

- Visual design / color scheme changes
- New animations or cursor effects
- Performance optimization of particle system
- Chat API persistence (separate backlog item BACKLOG-019)
- Chat system prompt changes (behavior stays the same)
- Mobile layout restructuring (responsive adaptation only)
