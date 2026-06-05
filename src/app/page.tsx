import { Nav } from '@/components/ui/Nav'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Education } from '@/components/sections/Education'
import { Experience } from '@/components/sections/Experience'
import { Certifications } from '@/components/sections/Certifications'
import { Writing } from '@/components/sections/Writing'
import { ChatInterface } from '@/components/sections/ChatInterface'
import { portfolio } from '@/data/portfolio'
import { generateSchema } from '@/lib/schema'
import { appConfig } from '@/lib/app-config'

export default function Home() {
  const schema = generateSchema(portfolio, appConfig.getSiteUrl())

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
        <div className="text-sm font-mono">
          <p className="text-ink-muted">© {new Date().getFullYear()} Devin Jaya Nugraha</p>
          <div className="mt-6 text-ink-faint space-y-2">
            <p>
              Vibed using{' '}
              <a href="https://claude.com/product/claude-code" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-accent-light transition-colors">Claude Code↗</a>{' '}
              &{' '}
              <a href="https://z.ai/subscribe" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-accent-light transition-colors">GLM↗</a>
            </p>
            <p>
              Built with{' '}
              <a href="https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-accent-light transition-colors">AI-DLC methodology↗</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
