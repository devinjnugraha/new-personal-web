import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        background: {
          DEFAULT: '#0D0D0D',
          surface: '#161616',
          elevated: '#1E1E1E',
        },
        border: {
          DEFAULT: '#2A2A2A',
          subtle: '#222222',
          strong: '#3A3A3A',
        },
        ink: {
          DEFAULT: '#F0F0EC',
          muted: '#888880',
          faint: '#555550',
        },
        accent: {
          DEFAULT: '#1D9E75',
          light: '#9FE1CB',
          dark: '#0F6E56',
          faint: '#0D2920',
        },
      },
      spacing: {
        section: '6rem',
      },
      maxWidth: {
        content: '720px',
        wide: '960px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
