interface BadgeProps {
  children: React.ReactNode
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="font-mono text-xs text-ink-muted border border-border px-2 py-0.5 rounded hover:border-accent hover:text-accent transition-colors">
      {children}
    </span>
  )
}
