import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
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

export const metadata: Metadata = {
  title: 'Devin Jaya Nugraha',
  description:
    'Software Developer and ML Researcher. Certified TensorFlow Developer. Published in Computers in Biology and Medicine (Q1).',
  openGraph: {
    title: 'Devin Jaya Nugraha',
    description: 'Software Developer · Certified TensorFlow Developer · ML Researcher',
    url: 'https://devinjnugraha.vercel.app',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${GeistMono.variable}`}
    >
      <body className="bg-background text-ink antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
