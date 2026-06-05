import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes safely, resolving conflicts.
 * Use this for all conditional className logic.
 */
export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format an ISO month string ('YYYY-MM') to a human-readable label.
 * e.g. '2022-03' → 'Mar 2022'
 */
export function formatMonth (isoMonth: string): string {
  const [year, month] = isoMonth.split('-').map(Number)
  const date = new Date(year, month - 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/**
 * Format a date range from ISO month strings.
 * e.g. ('2021-03', '2022-06') → 'Mar 2021 – Jun 2022'
 * e.g. ('2022-03', null) → 'Mar 2022 – Present'
 */
export function formatDateRange (start: string, end: string | null): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`
}
