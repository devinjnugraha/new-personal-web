// SPEC: docs/specs/SPEC-005-education.md
// Type: Server Component

import { portfolio } from "@/data/portfolio";
import { formatDateRange } from "@/lib/utils";

export function Education() {
    const { education } = portfolio;
    // TODO: Full implementation per SPEC-005 (see docs/iterations/FEAT-005-education.md)
    // Requirements:
    //   - Single institution card (Brawijaya University)
    //   - Degree, field, honor badge, duration note
    //   - Thesis title + description
    //   - Thesis links to the ScienceDirect publication (via publicationRef lookup)
    return (
        <section id="education" className="py-section border-t border-border">
            <p className="section-label mb-8">02 / education</p>
            <div className="flex flex-col gap-4">
                {education.map((edu) => (
                    <div key={edu.id} className="border border-border rounded-lg p-6 bg-background-surface">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                            <div>
                                <h3 className="font-serif text-xl text-ink">{edu.institution}</h3>
                                <p className="text-accent font-mono text-sm mt-1">
                                    {edu.degree} · {edu.field}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {edu.durationNote && (
                                    <span className="font-mono text-xs text-accent border border-accent/30 px-2 py-1 rounded">
                                        {edu.durationNote}
                                    </span>
                                )}
                                {edu.gpa && (
                                    <span className="font-mono text-xs text-accent border border-accent/30 px-2 py-1 rounded">
                                        GPA {edu.gpa.value}/{edu.gpa.scale}
                                    </span>
                                )}
                            </div>
                        </div>
                        <p className="text-ink-muted text-sm mt-2">
                            {edu.startYear}–{edu.endYear} · {edu.location}
                        </p>
                        <p className="text-ink-muted text-sm">{edu.honor}</p>
                        {edu.thesis && (
                            <div className="mt-4 pt-4 border-t border-border">
                                <p className="font-mono text-xs text-ink-muted uppercase tracking-widest mb-2">Thesis</p>
                                <p className="text-ink text-sm italic leading-relaxed">{edu.thesis.title}</p>
                                <p className="text-ink-muted text-sm mt-1">{edu.thesis.description}</p>
                            </div>
                        )}
                        {edu.organizations && edu.organizations.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-border">
                                <p className="font-mono text-xs text-ink-muted uppercase tracking-widest mb-2">Organizations</p>
                                {edu.organizations.map((org) => (
                                    <div key={org.role} className="mb-3 last:mb-0">
                                        <div className="flex items-start justify-between flex-wrap gap-2">
                                            <div>
                                                <p className="text-ink font-medium text-sm">{org.role}</p>
                                                <p className="text-accent font-mono text-xs mt-0.5">{org.organization}</p>
                                            </div>
                                            <p className="font-mono text-xs text-ink-muted shrink-0">
                                                {formatDateRange(org.startDate, org.endDate)}
                                            </p>
                                        </div>
                                        <ul className="mt-3 space-y-1">
                                            {org.highlights.map((h) => (
                                                <li key={h} className="flex gap-2 items-baseline text-sm text-ink-muted">
                                                    <span className="text-accent shrink-0" aria-hidden="true">
                                                        ›
                                                    </span>
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
