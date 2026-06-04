// SPEC: docs/specs/SPEC-007-certifications.md
// Type: Server Component

import { portfolio } from '@/data/portfolio'
import { Badge } from '@/components/ui/Badge'

export function Certifications() {
  const { certifications, achievements } = portfolio
  return (
    <section id="certifications" className="py-section border-t border-border">
      <p className="section-label mb-8">04 / certifications & achievements</p>

      <p className="section-label mb-4">certifications</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="border border-border rounded-lg p-5 bg-background-surface hover:border-border-strong transition-colors"
          >
            <p className="text-ink font-medium text-sm leading-snug">{cert.name}</p>
            <p className="text-ink-muted text-xs font-mono mt-1">
              {cert.issuer} · {cert.year}
            </p>
            <div className="flex flex-wrap gap-1 mt-3">
              {cert.skills.slice(0, 3).map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent text-xs font-mono hover:underline mt-3 inline-block"
              >
                verify ↗
              </a>
            )}
          </div>
        ))}
      </div>

      <p className="section-label mb-4">achievements</p>
      <div className="space-y-4">
        {achievements.map((ach) => (
          <div key={ach.id} className="flex gap-3 items-start">
            <span className="font-mono text-accent text-xs mt-0.5">
              {ach.type === 'competition' ? '★' : '◆'}
            </span>
            <div>
              <p className="text-ink text-sm font-medium">{ach.title}</p>
              <p className="text-ink-muted text-sm">{ach.description}</p>
              <p className="font-mono text-xs text-ink-muted mt-0.5">{ach.year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
