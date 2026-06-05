import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { appConfig } from '@/lib/app-config'
import { CursorGlow } from '@/components/ui/CursorGlow'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const viewport: Viewport = {
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Devin Jaya Nugraha',
  description:
    'Software Developer and ML Researcher. Certified TensorFlow Developer. Published in Computers in Biology and Medicine (Q1).',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Devin Jaya Nugraha',
    description: 'Software Developer · Certified TensorFlow Developer · ML Researcher',
    url: appConfig.getSiteUrl(),
    siteName: 'Devin Jaya Nugraha',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devin Jaya Nugraha',
    description: 'Software Developer · Certified TensorFlow Developer · ML Researcher',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${geistMono.variable}`}
    >
      <body className="bg-background text-ink antialiased">
        <CursorGlow />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
