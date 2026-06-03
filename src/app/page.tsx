import { Nav } from '@/components/ui/Nav'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Education } from '@/components/sections/Education'
import { Experience } from '@/components/sections/Experience'
import { Certifications } from '@/components/sections/Certifications'
import { Writing } from '@/components/sections/Writing'
import { ChatInterface } from '@/components/sections/ChatInterface'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-content px-6">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Certifications />
        <Writing />
        <ChatInterface />
      </main>
      <footer className="mx-auto max-w-content px-6 py-16 border-t border-border mt-8">
        <p className="text-ink-muted text-sm font-mono">
          © {new Date().getFullYear()} Devin Jaya Nugraha
        </p>
      </footer>
    </>
  )
}
