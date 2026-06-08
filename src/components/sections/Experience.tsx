// Type: Server Component

import { portfolio } from '@/data/portfolio'
import { Timeline } from '@/components/ui/Timeline'
import { ProjectCarousel } from '@/components/sections/ProjectCarousel'

export function Work() {
  const { experience, projects } = portfolio

  return (
    <section id="work" className="py-section border-t border-border">
      <p className="section-label mb-8">02 / work</p>
      <Timeline items={experience} />

      {projects.length > 0 && (
        <>
          <p className="section-label mt-12 mb-6">projects</p>
          <ProjectCarousel projects={projects} />
        </>
      )}
    </section>
  )
}