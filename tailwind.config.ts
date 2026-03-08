import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Existing admin colors
        'agency-dark': '#0a0a0f',
        'agency-card': '#13131a',
        'agency-border': '#1e1e2e',
        'agency-text': '#e2e8f0',
        'agency-muted': '#64748b',
        'agency-accent': '#6366f1',
        'status-new': '#3b82f6',
        'status-booked': '#8b5cf6',
        'status-paid': '#10b981',
        'status-nurture': '#f59e0b',
        'status-lost': '#ef4444',
        // Fish Studios colors
        'fish-bg': '#0c2340',
        'fish-deep': '#071a33',
        'fish-gold': '#c9a84c',
        'fish-cream': '#ffffff',
        // Category colors
        'cat-interiors': '#d4a574',
        'cat-food': '#c0392b',
        'cat-architecture': '#e8a838',
        'cat-hospitality': '#27856a',
        'cat-other': '#6366f1',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        body: ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
