// SPEC: docs/specs/SPEC-008-writing.md
// Type: Server Component

import { portfolio } from '@/data/portfolio'

export function Writing() {
  const { publications, writings } = portfolio
  const featured = publications.find((p) => p.featured)
  // TODO: Full implementation per SPEC-008
  // Requirements:
  //   - Featured publication card with Q1 badge, journal, DOI, role, abstract snippet
  //   - "View on ScienceDirect" CTA
  //   - Writings/links list below (LinkedIn)
  return (
    <section id="writing" className="py-section border-t border-border">
      <p className="section-label mb-8">05 / writing & research</p>
      {featured && (
        <div className="border border-accent/40 rounded-lg p-6 bg-accent-faint mb-8">
          <div className="flex gap-2 flex-wrap mb-3">
            <span className="font-mono text-xs text-accent border border-accent/40 px-2 py-0.5 rounded">
              {featured.quartile}
            </span>
            <span className="font-mono text-xs text-ink-muted">{featured.journal}</span>
            <span className="font-mono text-xs text-ink-muted">·</span>
            <span className="font-mono text-xs text-ink-muted">{featured.publisher}</span>
          </div>
          <h3 className="text-ink font-medium leading-snug text-lg">{featured.title}</h3>
          <p className="text-ink-muted text-sm mt-2">{featured.authors.join(', ')}</p>
          <p className="text-ink-muted text-xs mt-1 font-mono">
            My contribution: {featured.myRole}
          </p>
          <p className="text-ink-muted text-sm mt-3 leading-relaxed line-clamp-3">
            {featured.abstract}
          </p>
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-accent text-sm font-mono hover:underline"
          >
            View on ScienceDirect →
          </a>
        </div>
      )}
      <div className="space-y-4">
        {writings.map((w) => (
          <a
            key={w.id}
            href={w.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 group"
          >
            <span className="font-mono text-xs text-ink-muted mt-1 uppercase">{w.type}</span>
            <div>
              <p className="text-ink text-sm group-hover:text-accent transition-colors">
                {w.title}
              </p>
              <p className="text-ink-muted text-xs">{w.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
