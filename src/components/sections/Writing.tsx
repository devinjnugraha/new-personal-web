// SPEC: docs/specs/SPEC-008-writing.md
// Type: Server Component

import { portfolio } from "@/data/portfolio";
import { TrackedLink } from "@/components/ui/TrackedLink";

const toYear = (iso: string) => new Date(iso).getFullYear().toString()

export function Writing() {
    const { publications, writings } = portfolio;
    const featured = publications.find((p) => p.featured);
    return (
        <section id="writing" className="py-section border-t border-border">
            <p className="section-label mb-8">05 / research & writings</p>

            <p className="section-label mb-4">research</p>
            {featured && (
                <div className="border border-accent/40 hover:border-accent/60 hover:bg-accent/20 rounded-lg p-6 bg-accent-faint mb-10">
                    <div className="flex gap-2 flex-wrap items-center mb-3">
                        <span className="font-mono text-xs text-accent border border-accent/40 px-2 py-0.5 rounded">
                            {featured.quartile}
                        </span>
                        <span className="font-mono text-xs text-ink-muted">{featured.journal}</span>
                        <span className="font-mono text-xs text-ink-muted">·</span>
                        <span className="font-mono text-xs text-ink-muted">{featured.publisher}</span>
                        <span className="font-mono text-xs text-ink-muted">·</span>
                        <span className="font-mono text-xs text-ink-muted">{toYear(featured.publishedDate)}</span>
                    </div>
                    <h3 className="text-ink font-medium leading-snug text-lg mt-3">{featured.title}</h3>
                    <p className="text-ink-muted text-sm mt-2">{featured.authors.join(", ")}</p>
                    {featured.myRole && <p className="text-ink-muted text-xs mt-1 font-mono">My contribution: {featured.myRole}</p>}
                    <p className="text-ink-muted text-sm mt-3 leading-relaxed line-clamp-3">{featured.abstract}</p>
                    <TrackedLink
                        href={featured.url}
                        event="publication_clicked"
                        eventProps={{ publicationId: featured.id }}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-accent text-sm font-mono hover:underline"
                    >
                        View on ScienceDirect →
                    </TrackedLink>
                </div>
            )}

            <p className="section-label mb-4">articles & posts</p>
            <div className="space-y-5">
                {writings.map((w) => (
                    <a key={w.id} href={w.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                        <span className="font-mono text-xs text-ink-muted uppercase w-16 shrink-0 mt-0.5">{w.type}</span>
                        <div>
                            <p className="text-ink text-sm group-hover:text-accent transition-colors">{w.title}</p>
                            <p className="text-ink-muted text-xs">{w.description}</p>
                        </div>
                        {w.publishedDate && <span className="font-mono text-xs text-ink-muted ml-auto shrink-0 mt-0.5">{toYear(w.publishedDate)}</span>}
                    </a>
                ))}
            </div>
        </section>
    );
}
