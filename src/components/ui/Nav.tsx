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
  { id: 'projects', label: '04 projects' },
  { id: 'certifications', label: '05 certs' },
  { id: 'writing', label: '06 research' },
  { id: 'chat', label: '07 tl;dr' },
] as const

export function Nav() {
  const [activeSection, setActiveSection] = useState<string>('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    closeMenu()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/90 backdrop-blur-sm border-b border-border'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <nav className="mx-auto max-w-content px-6 h-14 flex items-center justify-between">
          {/* Left: initials → #hero */}
          <a
            href="#hero"
            className="font-mono text-sm text-ink-muted hover:text-ink transition-colors"
          >
            {portfolio.person.initials}
          </a>

          {/* Desktop nav links */}
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

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden font-mono text-ink-muted hover:text-ink transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </nav>
      </header>

      {/* Mobile overlay — rendered outside <header> to avoid stacking context issues */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 top-14 z-40 bg-background/95"
          onClick={closeMenu}
        >
          <ul className="flex flex-col items-center justify-center gap-8 h-full">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleMobileNavClick(e, id)}
                  className={cn(
                    'font-mono text-lg transition-colors hover:text-ink',
                    activeSection === id ? 'text-accent' : 'text-ink-muted',
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
