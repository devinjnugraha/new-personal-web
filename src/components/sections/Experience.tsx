// SPEC: docs/specs/SPEC-006-experience.md
// Type: Server Component

import { portfolio } from '@/data/portfolio'
import { Timeline } from '@/components/ui/Timeline'

export function Experience() {
  const { experience } = portfolio
  // TODO: Full implementation per SPEC-006
  // Requirements:
  //   - Vertical timeline layout using Timeline component
  //   - Each entry: role, org, date range, highlights as bullet points
  //   - Skill tags per entry
  return (
    <section id="experience" className="py-section border-t border-border">
      <p className="section-label mb-8">03 / experience</p>
      <Timeline items={experience} />
    </section>
  )
}
