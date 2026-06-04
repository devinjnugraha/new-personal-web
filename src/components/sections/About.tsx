// SPEC: docs/specs/SPEC-004-about.md
// Type: Server Component

import { portfolio } from '@/data/portfolio'
import { Badge } from '@/components/ui/Badge'

export function About() {
  const { person, skills } = portfolio
  const skillGroups = [
    { label: 'Languages', items: skills.languages },
    { label: 'Frontend', items: skills.frontend },
    { label: 'Backend', items: skills.backend },
    { label: 'ML / AI', items: skills.mlAi },
    { label: 'Data', items: skills.data },
    { label: 'Tools', items: skills.tools },
  ]
  return (
    <section id="about" className="py-section border-t border-border">
      <p className="section-label mb-8">01 / about</p>
      <p className="text-ink-muted leading-relaxed max-w-lg">{person.bio}</p>
      <p className="section-label mt-10 mb-6">skills</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {skillGroups.map(({ label, items }) => (
          <div key={label}>
            <p className="font-mono text-xs text-ink-muted uppercase tracking-widest mb-3">
              {label}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
