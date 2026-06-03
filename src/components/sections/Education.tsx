// SPEC: docs/specs/SPEC-005-education.md
// Type: Server Component

import { portfolio } from '@/data/portfolio'

export function Education() {
  const { education } = portfolio
  // TODO: Full implementation per SPEC-005
  // Requirements:
  //   - Single institution card (Brawijaya University)
  //   - Degree, field, honor badge, duration note
  //   - Thesis title + description
  //   - Thesis links to the ScienceDirect publication (via publicationRef lookup)
  return (
    <section id="education" className="py-section border-t border-border">
      <p className="section-label mb-8">02 / education</p>
      {education.map((edu) => (
        <div
          key={edu.id}
          className="border border-border rounded-lg p-6 bg-background-surface"
        >
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-serif text-xl text-ink">{edu.institution}</h3>
              <p className="text-accent font-mono text-sm mt-1">
                {edu.degree} · {edu.field}
              </p>
            </div>
            <span className="font-mono text-xs text-accent border border-accent/30 px-2 py-1 rounded">
              {edu.durationNote}
            </span>
          </div>
          <p className="text-ink-muted text-sm mt-2">
            {edu.startYear}–{edu.endYear} · {edu.location}
          </p>
          <p className="text-ink-muted text-sm">{edu.honor}</p>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="font-mono text-xs text-ink-muted uppercase tracking-widest mb-2">
              Thesis
            </p>
            <p className="text-ink text-sm italic leading-relaxed">{edu.thesis.title}</p>
            <p className="text-ink-muted text-sm mt-1">{edu.thesis.description}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
