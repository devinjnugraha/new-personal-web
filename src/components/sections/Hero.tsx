// SPEC: docs/specs/SPEC-003-hero.md
// Type: Server Component (no 'use client' needed)

import { portfolio } from '@/data/portfolio'

export function Hero() {
  const { person, links } = portfolio
  // TODO: Implement full design per SPEC-003
  // Requirements:
  //   - Full viewport height section (min-h-screen)
  //   - Name in Playfair Display (font-serif), large (text-5xl md:text-7xl)
  //   - Tagline in Geist Mono (font-mono), accent color
  //   - 2-sentence bio, max-w-lg
  //   - Three CTAs: GitHub, LinkedIn, Download CV (links to /cv.pdf)
  //   - Animated blinking cursor after name (CSS animation, no JS needed)
  //   - Scroll indicator arrow at bottom
  return (
    <section id="hero" className="min-h-screen flex items-center py-24">
      <div>
        <p className="section-label mb-4">// hello, world</p>
        <h1 className="font-serif text-5xl md:text-7xl text-ink mb-4">
          {person.name}
          <span className="animate-blink text-accent">_</span>
        </h1>
        <p className="font-mono text-accent text-sm mb-6">{person.tagline}</p>
        <p className="text-ink-muted max-w-lg leading-relaxed mb-8">{person.bio}</p>
        {/* TODO: CTA buttons — GitHub, LinkedIn, CV */}
        <div className="flex gap-4 flex-wrap">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-ink-muted hover:text-accent transition-colors"
          >
            github →
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-ink-muted hover:text-accent transition-colors"
          >
            linkedin →
          </a>
          <a
            href={links.cv}
            className="font-mono text-sm text-ink-muted hover:text-accent transition-colors"
          >
            download cv →
          </a>
        </div>
      </div>
    </section>
  )
}
