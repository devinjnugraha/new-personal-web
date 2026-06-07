// SPEC: docs/superpowers/specs/2026-06-07-projects-carousel-design.md
// Type: Server Component

import { portfolio } from '@/data/portfolio'
import { ProjectCarousel } from '@/components/sections/ProjectCarousel'

export function Projects() {
  const { projects } = portfolio

  if (projects.length === 0) return null

  return (
    <section id="projects" className="py-section border-t border-border">
      <p className="section-label mb-8">04 / projects</p>
      <ProjectCarousel projects={projects} />
    </section>
  )
}