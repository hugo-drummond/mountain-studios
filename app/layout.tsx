import type { Metadata } from 'next'
import Script from 'next/script'
import { Source_Sans_3 } from 'next/font/google'
import './globals.css'
import RecaptchaProvider from '../components/site/RecaptchaProvider'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  variable: '--font-source-sans',
  display: 'swap',
})

const SITE_URL = 'https://mountainstudios.co.za'
const DESCRIPTION =
  'Websites for South African businesses — salons, accountants, opticians, restaurants, guest houses, retailers, vets, trades. See a preview of your own site before you commit.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Mountain Studios — Web Design, Cape Town',
  description: DESCRIPTION,
  openGraph: {
    title: 'Mountain Studios — Web Design, Cape Town',
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Mountain Studios',
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mountain Studios — Web Design, Cape Town',
    description: DESCRIPTION,
  },
}

// Names the market explicitly: any South African business, not a trades niche.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Mountain Studios',
  description: DESCRIPTION,
  url: SITE_URL,
  email: 'hello@mountainstudios.co.za',
  areaServed: { '@type': 'Country', name: 'South Africa' },
  address: { '@type': 'PostalAddress', addressLocality: 'Cape Town', addressCountry: 'ZA' },
  serviceType: 'Web design and development',
  audience: {
    '@type': 'BusinessAudience',
    name: 'South African small and medium businesses across all industries',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-ZA">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RCLN88JPLC"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-RCLN88JPLC');
          `}
        </Script>
      </head>
      <body className={sourceSans.variable} style={{ fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif', margin: 0 }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <RecaptchaProvider>{children}</RecaptchaProvider>
      </body>
    </html>
  )
}
