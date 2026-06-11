// Type: Server Component

import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ExpandableAbstract } from "@/components/ui/ExpandableAbstract";

const toYear = (iso: string) => new Date(iso).getFullYear().toString();

export function Proof() {
    const { education, certifications, publications, writings, achievements } = portfolio;
    const featuredPub = publications.find((p) => p.featured);

    return (
        <section id="proof" className="py-section border-t border-border">
            <p className="section-label mb-8">03 / proof</p>

            {/* Education */}
            <p className="section-label mb-4">education</p>
            <div className="space-y-3 mb-12">
                {education.map((edu) => (
                    <div key={edu.id} className="flex items-baseline justify-between flex-wrap gap-2">
                        <div>
                            <span className="text-ink text-sm font-medium">{edu.institution}</span>
                            <span className="text-ink-muted text-sm">
                                {" "}
                                — {edu.degree} in {edu.field}
                            </span>
                            {edu.gpa && (
                                <span className="text-ink-faint text-xs font-mono ml-2">
                                    ({edu.gpa.value}/{edu.gpa.scale})
                                </span>
                            )}
                        </div>
                        <span className="font-mono text-xs text-ink-muted shrink-0">
                            {edu.startYear}–{edu.endYear}
                        </span>
                    </div>
                ))}
            </div>

            {/* Certifications */}
            <p className="section-label mb-4">certifications</p>
            {(() => {
                const featured = certifications.filter((c) => c.featured);
                const others = certifications.filter((c) => !c.featured);
                return (
                    <>
                        {featured.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                                {featured.map((cert) => (
                                    <div key={cert.id} className="rounded-lg border border-border p-4 hover:border-accent/50 transition-colors">
                                        {cert.badgeUrl && (
                                            <Image
                                                src={cert.badgeUrl}
                                                alt={cert.name}
                                                width={40}
                                                height={40}
                                                unoptimized
                                                className="h-10 w-auto object-contain mb-2"
                                            />
                                        )}
                                        <p className="text-ink font-medium text-sm leading-snug">{cert.name}</p>
                                        <p className="text-ink-muted text-xs font-mono mt-0.5">
                                            {cert.issuer} · {cert.year}
                                        </p>
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
                                ))}
                            </div>
                        )}
                        {others.length > 0 && (
                            <div className="space-y-0 mb-12">
                                {others.map((cert, i) => (
                                    <div
                                        key={cert.id}
                                        className={`flex items-center gap-4 ${i < others.length - 1 ? 'border-b border-border pb-4 mb-4' : ''}`}
                                    >
                                        {cert.badgeUrl && (
                                            <Image
                                                src={cert.badgeUrl}
                                                alt={cert.name}
                                                width={32}
                                                height={32}
                                                unoptimized
                                                className="h-8 w-auto object-contain shrink-0"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-ink font-medium text-sm leading-snug">{cert.name}</p>
                                            <p className="text-ink-muted text-xs font-mono mt-0.5">
                                                {cert.issuer} · {cert.year}
                                            </p>
                                        </div>
                                        {cert.credentialUrl && (
                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-accent text-xs font-mono hover:underline shrink-0"
                                            >
                                                verify ↗
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                );
            })()}

            {/* Research */}
            {featuredPub && (
                <>
                    <p className="section-label mb-4">research</p>
                    <div className="border border-accent/40 hover:border-accent/60 rounded-lg p-5 mb-10">
                        <div className="flex gap-2 flex-wrap items-center mb-2">
                            <span className="font-mono text-xs text-accent border border-accent/40 px-2 py-0.5 rounded">
                                {featuredPub.quartile}
                            </span>
                            <span className="font-mono text-xs text-ink-muted md:hidden">{featuredPub.journalShort}</span>
                            <span className="font-mono text-xs text-ink-muted hidden md:inline">{featuredPub.journal}</span>
                            <span className="font-mono text-xs text-ink-muted">·</span>
                            <span className="font-mono text-xs text-ink-muted">{toYear(featuredPub.publishedDate)}</span>
                        </div>
                        <h3 className="text-ink font-medium text-sm leading-snug">{featuredPub.title}</h3>
                        <p className="text-ink-muted text-xs mt-1 font-mono">{featuredPub.authors.join(", ")}</p>
                        <ExpandableAbstract abstract={featuredPub.abstract} />
                        <TrackedLink
                            href={featuredPub.url}
                            event="publication_clicked"
                            eventProps={{ publicationId: featuredPub.id }}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-accent text-sm font-mono hover:underline"
                        >
                            View on ScienceDirect →
                        </TrackedLink>
                    </div>
                </>
            )}

            {/* Writings */}
            {writings.length > 0 && (
                <>
                    <p className="section-label mb-4">articles &amp; posts</p>
                    <div className="space-y-3 mb-12">
                        {writings.map((w) => (
                            <a key={w.id} href={w.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                                <span className="font-mono text-xs text-ink-muted uppercase w-16 shrink-0 mt-0.5">{w.type}</span>
                                <span className="text-ink text-sm group-hover:text-accent transition-colors">{w.title}</span>
                                {w.publishedDate && (
                                    <span className="font-mono text-xs text-ink-muted ml-auto shrink-0 mt-0.5">
                                        {toYear(w.publishedDate)}
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>
                </>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
                <>
                    <p className="section-label mb-4">achievements</p>
                    <div className="space-y-2">
                        {achievements.map((ach) => (
                            <div key={ach.id} className="flex gap-3 items-baseline">
                                <span className="font-mono text-accent text-xs">{ach.type === "competition" ? "★" : "◆"}</span>
                                <span className="text-ink text-sm">{ach.title}</span>
                                <span className="font-mono text-xs text-ink-faint">{ach.year}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
