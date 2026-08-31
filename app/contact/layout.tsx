import type { Metadata } from 'next'
import { OG_IMAGES, TWITTER_IMAGES } from '@/lib/og'

const TITLE = 'Contact Mountain Studios — Cape Town Web Design'
const DESCRIPTION =
  'Email hello@mountainstudios.co.za, WhatsApp +27 64 532 2093, or send the form. Monday to Friday, 9:00 to 17:00 SAST. Replies within one business day.'

// The page itself is a client component and cannot export metadata, so it
// lives here. Without a title of its own a page inherits the root one, which
// is how nine URLs came to share a single title and description.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/contact' },
  openGraph: { title: TITLE, description: DESCRIPTION , images: OG_IMAGES },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION , images: TWITTER_IMAGES },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
