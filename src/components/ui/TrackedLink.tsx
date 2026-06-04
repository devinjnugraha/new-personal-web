'use client'

import { track } from '@vercel/analytics'

interface TrackedLinkProps {
  href: string
  event: string
  eventProps?: Record<string, string | number>
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
}

export function TrackedLink({ href, event, eventProps, children, ...props }: TrackedLinkProps) {
  return (
    <a
      href={href}
      onClick={() => track(event, eventProps)}
      {...props}
    >
      {children}
    </a>
  )
}
