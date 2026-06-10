// Type: Server Component

import { portfolio } from '@/data/portfolio'
import { Badge } from '@/components/ui/Badge'

export function About() {
  const { strengths } = portfolio

  return (
    <section id="about" className="py-section border-t border-border">
      <p className="section-label mb-8">01 / about</p>
      <div className="flex flex-wrap justify-center gap-6">
        {strengths.map((card) => (
          <div
            key={card.id}
            className="w-full md:w-[calc(33.333%-1rem)] rounded-lg border border-border p-6 hover:border-accent/50 transition-colors"
          >
            <h3 className="font-serif text-lg text-ink mb-2">{card.heading}</h3>
            <p className="text-ink-muted text-sm leading-relaxed mb-4">
              {card.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {card.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}