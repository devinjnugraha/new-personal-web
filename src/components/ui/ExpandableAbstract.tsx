'use client'

import { useState } from 'react'

interface ExpandableAbstractProps {
  abstract: string
}

export function ExpandableAbstract({ abstract }: ExpandableAbstractProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-accent text-xs font-mono hover:underline mt-3 inline-block"
      >
        {expanded ? 'hide abstract ↑' : 'read abstract ↓'}
      </button>
      {expanded && (
        <p className="text-ink-muted text-sm mt-3 leading-relaxed">{abstract}</p>
      )}
    </>
  )
}
