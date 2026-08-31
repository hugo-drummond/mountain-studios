import type { Metadata } from 'next'
import { OG_IMAGES, TWITTER_IMAGES } from '@/lib/og'

const TITLE = 'Get Started — See a Free Preview of Your Website'
const DESCRIPTION =
  'Answer a few questions and see a free preview of a website for your own business in about a minute, before you commit to anything. No card, no obligation.'

// The page itself is a client component and cannot export metadata, so it
// lives here. Without a title of its own a page inherits the root one, which
// is how nine URLs came to share a single title and description.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/start-your-project' },
  openGraph: { title: TITLE, description: DESCRIPTION , images: OG_IMAGES },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION , images: TWITTER_IMAGES },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
