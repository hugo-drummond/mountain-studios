import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/refer/terms' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
