import type { Metadata } from 'next'
import { OG_IMAGES, TWITTER_IMAGES } from '@/lib/og'

const TITLE = 'About Mountain Studios — A Cape Town Web Design Studio'
const DESCRIPTION =
  'One person designs and builds each site start to finish, then stays for the hosting, updates and small changes most agencies hand back.'

// The page itself is a client component and cannot export metadata, so it
// lives here. Without a title of its own a page inherits the root one, which
// is how nine URLs came to share a single title and description.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: { title: TITLE, description: DESCRIPTION , images: OG_IMAGES },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION , images: TWITTER_IMAGES },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
