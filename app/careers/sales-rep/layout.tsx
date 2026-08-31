import type { Metadata } from 'next'
import { OG_IMAGES, TWITTER_IMAGES } from '@/lib/og'

// The page itself is a client component, so its metadata lives here. This is
// the card people see when the LinkedIn post is shared.
const TITLE = 'Freelance Sales Representative — Mountain Studios'
const DESCRIPTION =
  'Sell websites to South African businesses. 20% of every sale, 15% of the monthly retainer for as long as the client stays. Commission only, remote, nationwide, no experience needed.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/careers/sales-rep' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://mountainstudios.co.za/careers/sales-rep',
    siteName: 'Mountain Studios',
    locale: 'en_ZA',
    type: 'website',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: TWITTER_IMAGES,
  },
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children
}
