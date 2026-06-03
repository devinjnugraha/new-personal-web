// SPEC: docs/specs/SPEC-004-about.md
// Type: Server Component

import { portfolio } from '@/data/portfolio'

export function About() {
  const { skills } = portfolio
  const skillGroups = [
    { label: 'Languages', items: skills.languages },
    { label: 'Frontend', items: skills.frontend },
    { label: 'Backend', items: skills.backend },
    { label: 'ML / AI', items: skills.mlAi },
    { label: 'Data', items: skills.data },
    { label: 'Tools', items: skills.tools },
  ]
  // TODO: Full implementation per SPEC-004
  // Requirements:
  //   - Section label "01 / about"
  //   - Expanded bio paragraph (from portfolio.person.bio or inline)
  //   - Skills grouped by category in a 2-3 column responsive grid
  //   - Tags/pills per skill item (not plain text)
  return (
    <section id="about" className="py-section border-t border-border">
      <p className="section-label mb-8">01 / about</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {skillGroups.map(({ label, items }) => (
          <div key={label}>
            <p className="font-mono text-xs text-ink-muted uppercase tracking-widest mb-3">
              {label}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-mono text-ink-muted border border-border px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
