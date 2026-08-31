// ---------------------------------------------------------------------------
// Structured data for the marketing site.
//
// Every fact here is already true somewhere else on the site or in
// lib/chatbot/knowledge.ts. Nothing is invented for the crawler's benefit, and
// nothing here should be the only place a fact lives — if these values and the
// page disagree, the page is right and this file is stale.
//
// The root layout emits ORGANISATION_GRAPH once. Every other node references
// the organisation by @id (`#organization`) rather than restating it, so the
// name, phone number and address exist in exactly one place across the whole
// site.
//
// NOT HERE, DELIBERATELY: AggregateRating and Review. The three testimonials on
// the homepage carry `business: 'CUSTOMER BUSINESS'` placeholders and there is
// no public Google reviews URL to point at (see the comment in HomeClient.tsx
// above the rating block). Marking up reviews you host about yourself is
// against Google's structured data policy and risks a manual action. Revisit
// only when there are real reviews at a real URL.
// ---------------------------------------------------------------------------

export const SITE_URL = 'https://mountainstudios.co.za'

const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`
const FOUNDER_ID = `${SITE_URL}/#hugo`

/** The four services, in the order they appear on /services. */
const SERVICES = [
  { path: '/services/web-design', name: 'Web design', desc: 'Simple, good-looking websites for South African businesses.' },
  { path: '/services/paid-ads', name: 'Paid ads', desc: 'Google and Meta campaigns that bring in enquiries.' },
  { path: '/services/aeo', name: 'Answer engine optimisation', desc: 'Getting your business named in AI search answers.' },
  { path: '/services/business-automation', name: 'Business automation', desc: 'Bookings, invoices and follow-ups that run themselves.' },
]

/**
 * The site-wide graph. Emitted once, from the root layout.
 */
export const ORGANISATION_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Mountain Studios',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      email: 'hello@mountainstudios.co.za',
      telephone: '+27645322093',
      founder: { '@id': FOUNDER_ID },
      areaServed: { '@type': 'Country', name: 'South Africa' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cape Town',
        addressCountry: 'ZA',
      },
      sameAs: [
        'https://www.linkedin.com/company/mountainstudioss/',
        'https://www.facebook.com/profile.php?id=61593052667215',
      ],
    },
    {
      '@type': 'Person',
      '@id': FOUNDER_ID,
      name: 'Hugo Drummond',
      jobTitle: 'Founder',
      worksFor: { '@id': ORG_ID },
    },
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: SITE_URL,
      name: 'Mountain Studios',
      publisher: { '@id': ORG_ID },
      inLanguage: 'en-ZA',
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: 'Mountain Studios',
      description:
        'Web design studio in Cape Town building websites for South African businesses and organisations, of any size and any kind.',
      url: SITE_URL,
      parentOrganization: { '@id': ORG_ID },
      email: 'hello@mountainstudios.co.za',
      telephone: '+27645322093',
      // R2 000 for a home page through to a larger multi-page build. Matches
      // the guide figures published on /answers/website-cost-south-africa.
      priceRange: 'R2000–R25000',
      currenciesAccepted: 'ZAR',
      areaServed: { '@type': 'Country', name: 'South Africa' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cape Town',
        addressCountry: 'ZA',
      },
      // Monday to Friday, 9:00–17:00 SAST. Stated on /contact and in the
      // chatbot knowledge file.
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
        },
      ],
      audience: {
        '@type': 'BusinessAudience',
        name: 'South African small and medium businesses across all industries',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.name,
            description: s.desc,
            url: `${SITE_URL}${s.path}`,
          },
        })),
      },
    },
  ],
}

/** A Service node for one of the four /services/* pages. */
export function serviceSchema(opts: {
  name: string
  description: string
  path: string
  serviceType: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: `${SITE_URL}${opts.path}`,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'South Africa' },
  }
}

/**
 * A FAQPage built from question/answer pairs.
 *
 * Always generate this from the same array the page renders. A hand-copied
 * second list drifts, and marked-up text that is not on the page is exactly
 * what Google treats as spam.
 */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

/**
 * A breadcrumb trail. Pass every crumb including the page itself; Home is
 * added here so no caller has to remember it.
 */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  const all = [{ name: 'Home', path: '' }, ...crumbs]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  }
}

/** An Article node for an answer page. */
export function articleSchema(opts: {
  headline: string
  description: string
  path: string
  datePublished: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${opts.path}` },
    author: { '@id': FOUNDER_ID },
    publisher: { '@id': ORG_ID },
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    inLanguage: 'en-ZA',
  }
}
