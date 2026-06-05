// SPEC: docs/specs/SPEC-003-hero.md
// Type: Server Component

import { portfolio } from "@/data/portfolio";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { TrackedLink } from "@/components/ui/TrackedLink";

const secondaryCtaClass = "font-mono text-sm text-ink-muted hover:text-accent transition-colors";
const primaryCtaClass = "inline-flex items-center gap-2 font-mono text-sm text-ink border border-ink/30 rounded-sm px-4 py-2 hover:border-ink/60 transition-colors";

export function Hero() {
    const { person, links } = portfolio;
    return (
        <section id="hero" className="relative min-h-screen flex items-center pt-16">
            <div>
                <p className="section-label mb-4">{"// hello, world"}</p>
                <TypewriterText
                    text={person.name}
                    className="font-serif text-5xl md:text-7xl text-ink mb-4"
                />
                <p className="font-mono text-accent text-sm mb-6">{person.tagline}</p>
                <p className="text-ink-muted max-w-lg leading-relaxed mb-8">{person.bio}</p>
                <div className="flex items-center gap-6 flex-wrap">
                    <TrackedLink href={links.github} event="github_clicked" target="_blank" rel="noopener noreferrer" className={secondaryCtaClass}>
                        github →
                    </TrackedLink>
                    <TrackedLink
                        href={links.linkedin}
                        event="linkedin_clicked"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={secondaryCtaClass}
                    >
                        linkedin →
                    </TrackedLink>
                    <TrackedLink href={links.cv} event="cv_downloaded" className={secondaryCtaClass}>
                        download cv →
                    </TrackedLink>
                    <TrackedLink href={`mailto:${links.email}`} event="email_clicked" className={primaryCtaClass}>
                        get in touch →
                    </TrackedLink>
                </div>
            </div>
            {/* Scroll indicator — centered via inset-x-0 + text-center to avoid transform conflict with animate-bounce */}
            <div className="absolute bottom-8 inset-x-0 text-center">
                <span className="inline-block font-mono text-xs text-ink-muted animate-bounce">↓ scroll</span>
            </div>
        </section>
    );
}
