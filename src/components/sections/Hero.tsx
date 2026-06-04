// SPEC: docs/specs/SPEC-003-hero.md
// Type: Server Component

import { portfolio } from "@/data/portfolio";
import { TrackedLink } from "@/components/ui/TrackedLink";

const ctaClass = "font-mono text-sm text-ink-muted hover:text-accent transition-colors";

export function Hero() {
    const { person, links } = portfolio;
    return (
        <section id="hero" className="relative min-h-screen flex items-center pt-16">
            <div>
                <p className="section-label mb-4">{"// hello, world"}</p>
                <h1 className="font-serif text-5xl md:text-7xl text-ink mb-4">
                    {person.name}
                    <span className="animate-blink text-accent" aria-hidden="true">
                        _
                    </span>
                </h1>
                <p className="font-mono text-accent text-sm mb-6">{person.tagline}</p>
                <p className="text-ink-muted max-w-lg leading-relaxed mb-8">{person.bio}</p>
                <div className="flex gap-6 flex-wrap">
                    <TrackedLink href={links.github} event="github_clicked" target="_blank" rel="noopener noreferrer" className={ctaClass}>
                        github →
                    </TrackedLink>
                    <TrackedLink
                        href={links.linkedin}
                        event="linkedin_clicked"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={ctaClass}
                    >
                        linkedin →
                    </TrackedLink>
                    <TrackedLink href={links.cv} event="cv_downloaded" className={ctaClass}>
                        download cv →
                    </TrackedLink>
                    <TrackedLink href={links.email} event="email_clicked" className={ctaClass}>
                        email →
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
