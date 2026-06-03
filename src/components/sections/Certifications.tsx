// SPEC: docs/specs/SPEC-007-certifications.md
// Type: Server Component

import { portfolio } from '@/data/portfolio'

export function Certifications() {
  const { certifications, achievements } = portfolio
  // TODO: Full implementation per SPEC-007
  // Requirements:
  //   - Cert cards: name, issuer, year, skill tags, verify link (if credentialUrl)
  //   - Achievements list below certs
  //   - Trophy/medal icon for competition achievement
  return (
    <section id="certifications" className="py-section border-t border-border">
      <p className="section-label mb-8">04 / certifications & achievements</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="border border-border rounded-lg p-5 bg-background-surface"
          >
            <p className="text-ink font-medium text-sm leading-snug">{cert.name}</p>
            <p className="text-ink-muted text-xs font-mono mt-1">
              {cert.issuer} · {cert.year}
            </p>
            <div className="flex flex-wrap gap-1 mt-3">
              {cert.skills.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="text-xs font-mono text-ink-muted border border-border px-2 py-0.5 rounded"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {achievements.map((ach) => (
          <div key={ach.id} className="flex gap-4 items-start">
            <span className="font-mono text-accent text-xs mt-0.5">★</span>
            <div>
              <p className="text-ink text-sm font-medium">{ach.title}</p>
              <p className="text-ink-muted text-sm">{ach.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
