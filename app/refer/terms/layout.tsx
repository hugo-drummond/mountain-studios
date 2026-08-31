import type { Metadata } from 'next'
import { OG_IMAGES, TWITTER_IMAGES } from '@/lib/og'

const TITLE = 'Referral Terms — Earn Up to R1 000 — Mountain Studios'
const DESCRIPTION =
  'Refer a business to Mountain Studios and earn 25% of every instalment they pay, up to R1 000 per business. The full terms and the signup form.'

// The page itself is a client component and cannot export metadata, so it
// lives here. Without a title of its own a page inherits the root one, which
// is how nine URLs came to share a single title and description.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/refer/terms' },
  openGraph: { title: TITLE, description: DESCRIPTION , images: OG_IMAGES },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION , images: TWITTER_IMAGES },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
