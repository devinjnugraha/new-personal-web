// SPEC: docs/specs/SPEC-007-certifications.md
// Type: Server Component

import Image from 'next/image'
import { portfolio } from '@/data/portfolio'
import { Badge } from '@/components/ui/Badge'

export function Certifications() {
  const { certifications, achievements } = portfolio
  const featured = certifications.filter((c) => c.featured)
  const nonFeatured = certifications.filter((c) => !c.featured)

  return (
    <section id="certifications" className="py-section border-t border-border">
      <p className="section-label mb-8">05 / certifications & achievements</p>

      {featured.length > 0 && (
        <>
          <p className="section-label mb-4">certifications</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {featured.map((cert) => (
              <div
                key={cert.id}
                className="rounded-lg p-5 bg-background-surface border border-accent hover:border-accent/80 transition-colors"
              >
                <div className="flex flex-row md:flex-col gap-3 md:gap-0">
                  {cert.badgeUrl && (
                    <div className="shrink-0 md:mb-3">
                      <Image
                        src={cert.badgeUrl}
                        alt={cert.name}
                        width={48}
                        height={48}
                        unoptimized
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
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
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {nonFeatured.length > 0 && (
        <div className="flex flex-col gap-4 mb-10">
          {nonFeatured.map((cert) => (
            <div key={cert.id} className="flex items-start gap-3">
              {cert.badgeUrl && (
                <Image
                  src={cert.badgeUrl}
                  alt={cert.name}
                  width={32}
                  height={32}
                  unoptimized
                  className="h-8 w-auto object-contain shrink-0 mt-0.5"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-ink font-medium text-sm leading-snug">{cert.name}</p>
                <p className="text-ink-muted text-xs font-mono mt-0.5">
                  {cert.issuer} · {cert.year}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {cert.skills.slice(0, 3).map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent text-xs font-mono hover:underline mt-2 inline-block"
                  >
                    verify ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

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
