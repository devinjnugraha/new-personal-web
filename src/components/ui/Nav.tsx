'use client'

// SPEC: docs/specs/SPEC-002-layout-navigation.md
// Type: Client Component — needs scroll state

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { portfolio } from '@/data/portfolio'

const NAV_ITEMS = [
  { id: 'about', label: '01 about' },
  { id: 'education', label: '02 education' },
  { id: 'experience', label: '03 experience' },
  { id: 'certifications', label: '04 certs' },
  { id: 'writing', label: '05 writing' },
  { id: 'chat', label: '06 ask' },
] as const

export function Nav() {
  const [activeSection, setActiveSection] = useState<string>('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      // Determine active section via IntersectionObserver-like scroll check
      const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id))
      for (const section of sections.reverse()) {
        if (!section) continue
        if (section.getBoundingClientRect().top <= 120) {
          setActiveSection(section.id)
          return
        }
      }
      setActiveSection('')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // TODO: Full implementation per SPEC-002
  // Requirements:
  //   - Fixed top bar, full width
  //   - Left: name/initials linking to #hero
  //   - Right: nav links (section labels)
  //   - Active section highlighted in accent color
  //   - Border-bottom appears on scroll (scrolled state)
  //   - Collapses to hamburger menu on mobile
  //   - Smooth scroll on link click

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/90 backdrop-blur-sm border-b border-border'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <nav className="mx-auto max-w-content px-6 h-14 flex items-center justify-between">
        {/* Left: name */}
        <a
          href="#hero"
          className="font-mono text-sm text-ink-muted hover:text-ink transition-colors"
        >
          {portfolio.person.initials}
        </a>

        {/* Right: nav links — hidden on mobile for now (TODO: hamburger) */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  'font-mono text-xs transition-colors hover:text-ink',
                  activeSection === id ? 'text-accent' : 'text-ink-muted',
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
