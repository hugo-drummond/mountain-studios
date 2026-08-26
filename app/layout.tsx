import type { Metadata } from 'next'
import Script from 'next/script'
import { Source_Sans_3, Playfair_Display } from 'next/font/google'
import './globals.css'
import ChatWidget from '../components/site/ChatWidget'
import AuditPopup from '../components/site/AuditPopup'
import RefCapture from '../components/site/RefCapture'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  variable: '--font-source-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
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
  sameAs: [
    'https://www.linkedin.com/company/mountainstudioss/',
    'https://www.facebook.com/profile.php?id=61593052667215',
  ],
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

        {/* Meta Pixel. Marketing site only — the CRM is a separate app and stays
            untagged, and /p/[token] is a route handler rather than a page, so a
            generated client preview never inherits this. Tagging someone else's
            mock site would be wrong.

            The id is public by nature: it ships in the client bundle either way,
            so it lives here beside the GA4 id rather than in an env var that
            would only suggest a secrecy it does not have. */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1435033932015736');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${sourceSans.variable} ${playfair.variable}`} style={{ fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif', margin: 0 }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Outside the reCAPTCHA provider: it calls no protected endpoint, and
            a partner's link must be counted whether or not Google loads. */}
        <RefCapture />
        {children}
        {/* No reCAPTCHA provider wraps any of this any more. Google's script
            used to load for every visitor of every page from here — 939KB and
            816ms of main-thread work, about a third of the homepage's weight,
            to serve six forms. Each form now calls lib/recaptcha-client, which
            injects the script the first time somebody touches a form and mints
            a fresh token per endpoint. Nothing needs to sit inside a provider,
            so ChatWidget and AuditPopup are plain siblings.
            Both still hide themselves on /admin and on generated previews. */}
        <AuditPopup />
        <ChatWidget />
      </body>
    </html>
  )
}
