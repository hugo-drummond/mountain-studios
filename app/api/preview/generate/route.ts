import { NextRequest, NextResponse } from 'next/server'

import { presetContent, PresetContent } from './content'

type BusinessCategory =
  | 'food-hospitality' | 'retail' | 'trades-construction' | 'health-wellness'
  | 'professional' | 'creative' | 'fitness-sport' | 'home-services'
  | 'education' | 'automotive' | 'property' | 'events-entertainment'
  | 'tech-digital' | 'pets' | 'other'

type TemplateVariant = 'visual' | 'service' | 'portfolio'

const categoryVariant: Record<BusinessCategory, TemplateVariant> = {
  'food-hospitality': 'visual',
  'retail': 'visual',
  'health-wellness': 'visual',
  'fitness-sport': 'visual',
  'pets': 'visual',
  'events-entertainment': 'visual',
  'tech-digital': 'service',
  'professional': 'service',
  'trades-construction': 'service',
  'home-services': 'service',
  'education': 'service',
  'automotive': 'service',
  'other': 'service',
  'creative': 'portfolio',
  'property': 'portfolio',
}

interface CategoryPreset {
  heroFocus: string
  ctaText: string
  sections: { name: string; description: string }[]
  tone: string
  imageSubjects: string[]
  unsplashQueries: { hero: string; cards: string[]; avatar: string }
}

const categoryPresets: Record<BusinessCategory, CategoryPreset> = {
  'food-hospitality': {
    heroFocus: 'Warm, inviting atmosphere with emphasis on the dining experience',
    ctaText: 'Reserve a Table',
    sections: [
      { name: 'Menu Highlights', description: '3-4 cards showing signature dishes' },
      { name: 'About / Story', description: 'Restaurant story or chef bio' },
      { name: 'Hours & Location', description: 'Opening hours and address' },
    ],
    tone: 'Warm, inviting, sensory',
    imageSubjects: ['restaurant food plating', 'dining table restaurant interior'],
    unsplashQueries: { hero: 'restaurant,interior,dining', cards: ['plated-food', 'pasta-dish', 'dessert-plate', 'cocktail-drink'], avatar: 'chef,portrait' },
  },
  'retail': {
    heroFocus: 'Product showcase with a promotional banner feel',
    ctaText: 'Shop Now',
    sections: [
      { name: 'Featured Products', description: '4 product cards in a grid' },
      { name: 'Categories', description: '3-4 category tiles' },
      { name: 'Why Shop With Us', description: '3 feature blocks' },
    ],
    tone: 'Confident, trend-aware, conversion-focused',
    imageSubjects: ['retail store display', 'shopping boutique interior'],
    unsplashQueries: { hero: 'retail,store,shopping', cards: ['product-display', 'fashion-clothing', 'accessories-jewelry', 'gift-wrapped'], avatar: 'shopkeeper,portrait' },
  },
  'trades-construction': {
    heroFocus: 'Bold, trustworthy — emphasize reliability and experience',
    ctaText: 'Get a Free Quote',
    sections: [
      { name: 'Services', description: '4-6 service cards' },
      { name: 'Projects / Portfolio', description: '3 project cards' },
      { name: 'Stats & Trust', description: 'Counter-style stats row' },
    ],
    tone: 'Solid, dependable, no-nonsense',
    imageSubjects: ['construction building site', 'home renovation finished'],
    unsplashQueries: { hero: 'construction,building,site', cards: ['house-renovation', 'plumbing-tools', 'electrical-work', 'finished-building'], avatar: 'construction-worker,portrait' },
  },
  'health-wellness': {
    heroFocus: 'Clean, calming — emphasis on care and expertise',
    ctaText: 'Book an Appointment',
    sections: [
      { name: 'Services / Treatments', description: '3-4 service cards' },
      { name: 'Meet the Team', description: '2-3 practitioner cards' },
      { name: 'Testimonials', description: '2-3 testimonial quotes' },
    ],
    tone: 'Caring, professional, reassuring',
    imageSubjects: ['spa wellness treatment room', 'medical clinic clean interior'],
    unsplashQueries: { hero: 'wellness,spa,calm', cards: ['massage-therapy', 'dental-clinic', 'yoga-wellness', 'skincare-treatment'], avatar: 'doctor,portrait,professional' },
  },
  'professional': {
    heroFocus: 'Confident, outcome-focused — emphasize expertise and results',
    ctaText: 'Book a Consultation',
    sections: [
      { name: 'Services', description: '3-4 service cards' },
      { name: 'How We Work', description: '3-step process flow' },
      { name: 'Credentials & Trust', description: 'Professional bodies and experience' },
    ],
    tone: 'Authoritative, measured, trustworthy',
    imageSubjects: ['modern office workspace', 'business meeting professional'],
    unsplashQueries: { hero: 'office,professional,business', cards: ['business-meeting', 'office-interior', 'handshake-deal', 'laptop-work'], avatar: 'business,portrait,professional' },
  },
  'creative': {
    heroFocus: 'Portfolio-first — let the work speak',
    ctaText: 'View My Work',
    sections: [
      { name: 'Portfolio Grid', description: '6 portfolio items in a masonry grid' },
      { name: 'About / Bio', description: 'Short creative bio' },
      { name: 'Services & Pricing', description: '3 pricing tier cards' },
    ],
    tone: 'Creative, confident, personal',
    imageSubjects: ['photography studio creative', 'design studio workspace'],
    unsplashQueries: { hero: 'creative,studio,photography', cards: ['photography-camera', 'design-workspace', 'art-painting', 'creative-work'], avatar: 'artist,portrait,creative' },
  },
  'fitness-sport': {
    heroFocus: 'High-energy, motivational — bold headline and trial CTA',
    ctaText: 'Start Your Free Trial',
    sections: [
      { name: 'Classes / Programs', description: '4 class cards' },
      { name: 'Trainers', description: '2-3 trainer cards' },
      { name: 'Membership Pricing', description: '3 pricing columns' },
    ],
    tone: 'Energetic, motivational, bold',
    imageSubjects: ['gym fitness training', 'group workout class'],
    unsplashQueries: { hero: 'gym,fitness,training', cards: ['weightlifting', 'yoga-class', 'running-exercise', 'boxing-gym'], avatar: 'fitness-trainer,portrait' },
  },
  'home-services': {
    heroFocus: 'Clean, trustworthy — emphasize convenience and reliability',
    ctaText: 'Get a Quote',
    sections: [
      { name: 'Services', description: '4-6 service cards' },
      { name: 'How It Works', description: '3-step process' },
      { name: 'Reviews', description: '3 customer review cards' },
    ],
    tone: 'Friendly, reliable, straightforward',
    imageSubjects: ['clean modern home interior', 'house cleaning service'],
    unsplashQueries: { hero: 'clean,home,interior', cards: ['cleaning-service', 'garden-landscaping', 'house-interior', 'laundry-clean'], avatar: 'cleaner,worker,portrait' },
  },
  'education': {
    heroFocus: 'Inspiring, knowledge-focused — emphasize learning outcomes',
    ctaText: 'Enroll Now',
    sections: [
      { name: 'Courses / Programs', description: '3-4 course cards' },
      { name: 'Why Choose Us', description: '4 feature blocks' },
      { name: 'Instructors', description: '2-3 instructor cards' },
    ],
    tone: 'Encouraging, professional, aspirational',
    imageSubjects: ['modern classroom education', 'students studying together'],
    unsplashQueries: { hero: 'education,classroom,learning', cards: ['students-studying', 'library-books', 'teacher-classroom', 'graduation-cap'], avatar: 'teacher,portrait,professional' },
  },
  'automotive': {
    heroFocus: 'Bold, industrial — expertise and fast turnaround',
    ctaText: 'Book a Service',
    sections: [
      { name: 'Services', description: '4-6 service cards' },
      { name: 'Why Us', description: 'Stats row and trust indicators' },
      { name: 'Testimonials', description: '2-3 customer quotes' },
    ],
    tone: 'Direct, confident, no-frills',
    imageSubjects: ['auto repair workshop garage', 'car engine mechanic'],
    unsplashQueries: { hero: 'auto,mechanic,workshop', cards: ['car-engine', 'tyre-wheel', 'car-wash', 'mechanic-tools'], avatar: 'mechanic,worker,portrait' },
  },
  'property': {
    heroFocus: 'Aspirational, clean — property search-focused',
    ctaText: 'View Properties',
    sections: [
      { name: 'Featured Listings', description: '3 property cards' },
      { name: 'Services', description: '3 service blocks' },
      { name: 'Agent Profiles', description: '2-3 agent cards' },
    ],
    tone: 'Polished, aspirational, trustworthy',
    imageSubjects: ['modern architecture exterior', 'luxury house interior design'],
    unsplashQueries: { hero: 'luxury,house,real-estate', cards: ['house-exterior', 'living-room-interior', 'kitchen-modern', 'apartment-building'], avatar: 'real-estate-agent,portrait' },
  },
  'events-entertainment': {
    heroFocus: 'Vibrant, exciting — bold visuals with booking CTA',
    ctaText: 'Book Now',
    sections: [
      { name: 'Services / Packages', description: '3-4 package cards' },
      { name: 'Past Events Gallery', description: '4-6 gallery tiles' },
      { name: 'Testimonials', description: '2-3 client quotes' },
    ],
    tone: 'Exciting, vibrant, memorable',
    imageSubjects: ['elegant event decoration', 'wedding reception venue'],
    unsplashQueries: { hero: 'event,celebration,party', cards: ['wedding-venue', 'concert-crowd', 'birthday-party', 'conference-event'], avatar: 'dj,entertainer,portrait' },
  },
  'tech-digital': {
    heroFocus: 'Sleek, modern — product/service showcase',
    ctaText: 'Get Started',
    sections: [
      { name: 'Services / Features', description: '3-4 feature cards' },
      { name: 'Process', description: '4-step horizontal flow' },
      { name: 'Tech Stack / Tools', description: 'Expertise areas' },
    ],
    tone: 'Sharp, forward-thinking, solution-oriented',
    imageSubjects: ['technology laptop workspace', 'software development office'],
    unsplashQueries: { hero: 'technology,computer,code', cards: ['laptop-coding', 'app-mobile', 'server-data', 'team-office'], avatar: 'developer,portrait,tech' },
  },
  'pets': {
    heroFocus: 'Warm, friendly — emphasis on pet care and trust',
    ctaText: 'Book a Visit',
    sections: [
      { name: 'Services', description: '4 service cards' },
      { name: 'About Us', description: 'Warm paragraph about love for animals' },
      { name: 'Happy Customers', description: '3 review cards' },
    ],
    tone: 'Warm, playful, trustworthy',
    imageSubjects: ['cute dog pet portrait', 'dog grooming salon'],
    unsplashQueries: { hero: 'dog,pet,cute', cards: ['puppy-dog', 'cat-kitten', 'pet-grooming', 'golden-retriever'], avatar: 'veterinarian,portrait' },
  },
  'other': {
    heroFocus: 'Clean, versatile — strong headline with enquiry CTA',
    ctaText: 'Get in Touch',
    sections: [
      { name: 'Services', description: '3-4 service cards' },
      { name: 'About', description: 'Mission and what sets it apart' },
      { name: 'Contact', description: 'Contact details and form' },
    ],
    tone: 'Professional, approachable, clear',
    imageSubjects: ['modern business storefront', 'professional team office'],
    unsplashQueries: { hero: 'business,office,professional', cards: ['office-workspace', 'team-meeting', 'handshake-business', 'laptop-desk'], avatar: 'business,portrait' },
  },
}

// ---------- Font pairings per category ----------
const fontPairings: Record<BusinessCategory, { heading: string; headingFamily: string }> = {
  'food-hospitality':      { heading: 'Cormorant+Garamond:wght@400;600;700', headingFamily: "'Cormorant Garamond', Georgia, serif" },
  'retail':                { heading: 'DM+Sans:wght@400;500;700', headingFamily: "'DM Sans', sans-serif" },
  'trades-construction':   { heading: 'Oswald:wght@400;500;700', headingFamily: "'Oswald', sans-serif" },
  'health-wellness':       { heading: 'Lora:wght@400;500;700', headingFamily: "'Lora', Georgia, serif" },
  'professional':          { heading: 'Playfair+Display:wght@400;500;700', headingFamily: "'Playfair Display', Georgia, serif" },
  'creative':              { heading: 'Space+Grotesk:wght@400;500;700', headingFamily: "'Space Grotesk', sans-serif" },
  'fitness-sport':         { heading: 'Bebas+Neue', headingFamily: "'Bebas Neue', sans-serif" },
  'home-services':         { heading: 'Poppins:wght@400;500;700', headingFamily: "'Poppins', sans-serif" },
  'education':             { heading: 'Merriweather:wght@400;700', headingFamily: "'Merriweather', Georgia, serif" },
  'automotive':            { heading: 'Barlow+Condensed:wght@400;500;700', headingFamily: "'Barlow Condensed', sans-serif" },
  'property':              { heading: 'Playfair+Display:wght@400;500;700', headingFamily: "'Playfair Display', Georgia, serif" },
  'events-entertainment':  { heading: 'Cormorant+Garamond:wght@400;600;700', headingFamily: "'Cormorant Garamond', Georgia, serif" },
  'tech-digital':          { heading: 'Space+Grotesk:wght@400;500;700', headingFamily: "'Space Grotesk', sans-serif" },
  'pets':                  { heading: 'Nunito:wght@400;600;700', headingFamily: "'Nunito', sans-serif" },
  'other':                 { heading: 'DM+Sans:wght@400;500;700', headingFamily: "'DM Sans', sans-serif" },
}

// ---------- Stock images ----------
interface StockImages {
  hero: string
  about: string
  cards: string[]
  avatar: string
}

interface ImageQueries {
  heroImageQuery?: string
  heroBgImageQuery?: string
  serviceImageQueries?: string[]
  galleryImageQueries?: string[]
  aboutImageQuery?: string
}

async function fetchPexelsImage(query: string, apiKey: string, orientation: string = 'landscape', usedUrls?: Set<string>): Promise<string | null> {
  try {
    // Ensure SFW results
    const safeQuery = query.replace(/\b(sexy|nude|naked|provocative|lingerie|bikini)\b/gi, 'professional')
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(safeQuery)}&per_page=15&orientation=${orientation}`,
      { headers: { Authorization: apiKey } },
    )
    const data = await res.json()
    const photos = data.photos || []
    // Pick the first photo whose URL hasn't been used yet
    for (const photo of photos) {
      const url = photo?.src?.landscape || photo?.src?.large2x || photo?.src?.large
      if (url && (!usedUrls || !usedUrls.has(url))) {
        usedUrls?.add(url)
        return url
      }
    }
    // All results already used — return null to force picsum fallback instead of repeating
    return null
  } catch {
    return null
  }
}

async function fetchStockImages(category: BusinessCategory, businessType: string, queries?: ImageQueries): Promise<StockImages> {
  const apiKey = process.env.PEXELS_API_KEY
  const typeName = businessType.split('/')[0].trim()

  if (!apiKey) {
    return {
      hero: `https://picsum.photos/seed/${category}-hero/1200/600`,
      about: `https://picsum.photos/seed/${category}-about/600/400`,
      cards: [0, 1, 2, 3, 4, 5, 6].map(i => `https://picsum.photos/seed/${category}-card${i}/600/400`),
      avatar: `https://picsum.photos/seed/${category}-avatar/200/200`,
    }
  }

  const headers = { Authorization: apiKey }

  // Shared set to track used URLs and prevent duplicates across all images
  const usedUrls = new Set<string>()

  // If we have specific queries from preset content, use them for targeted results
  if (queries?.heroImageQuery || queries?.serviceImageQueries?.length || queries?.galleryImageQueries?.length) {
    // Fetch sequentially to allow deduplication via usedUrls
    const heroUrl = await fetchPexelsImage(queries.heroBgImageQuery || queries.heroImageQuery || typeName, apiKey, 'landscape', usedUrls)

    const aboutUrl = queries.aboutImageQuery
      ? await fetchPexelsImage(queries.aboutImageQuery, apiKey, 'landscape', usedUrls)
      : null

    const svcQueries = queries.serviceImageQueries || []
    const svcResults: (string | null)[] = []
    for (let i = 0; i < Math.max(7, svcQueries.length); i++) {
      svcResults.push(await fetchPexelsImage(svcQueries[i] || `${typeName} professional ${['office', 'workspace', 'team', 'interior', 'detail', 'product', 'service'][i] || i}`, apiKey, 'landscape', usedUrls))
    }

    const galQueries = queries.galleryImageQueries || []
    const galResults: (string | null)[] = []
    const galFallbacks = ['interior design', 'storefront exterior', 'workspace detail', 'product closeup', 'team meeting', 'customer experience', 'brand lifestyle']
    for (let i = 0; i < Math.max(7, galQueries.length); i++) {
      galResults.push(await fetchPexelsImage(galQueries[i] || `${typeName} ${galFallbacks[i] || 'business ' + i}`, apiKey, 'landscape', usedUrls))
    }

    const fallback = (url: string | null, seed: string) => url || `https://picsum.photos/seed/${seed}/600/400`

    return {
      hero: fallback(heroUrl, `${typeName}-hero`),
      about: fallback(aboutUrl, `${typeName}-about`),
      cards: [
        ...svcResults.map((r, i) => fallback(r, `${typeName}-svc${i}`)),
        ...galResults.map((r, i) => fallback(r, `${typeName}-gal${i}`)),
      ],
      avatar: `https://picsum.photos/seed/${typeName}-avatar/200/200`,
    }
  }

  // Fallback: generic search by business type name
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(typeName)}&per_page=15&orientation=landscape`,
    { headers },
  )
  const data = await res.json()
  const photos = data.photos || []

  // Deduplicate: pick unique photos only
  const heroUrl = photos[0]?.src?.landscape || photos[0]?.src?.large2x || `https://picsum.photos/seed/${typeName}-hero/1200/600`
  usedUrls.add(heroUrl)

  const cardUrls: string[] = []
  for (let i = 1; i < photos.length && cardUrls.length < 7; i++) {
    const url = photos[i].src?.landscape || photos[i].src?.large || photos[i].src?.medium
    if (url && !usedUrls.has(url)) {
      usedUrls.add(url)
      cardUrls.push(url)
    }
  }
  while (cardUrls.length < 7) {
    cardUrls.push(`https://picsum.photos/seed/${typeName}-card${cardUrls.length}/600/400`)
  }

  const avatarUrl = photos[photos.length > 8 ? 8 : 1]?.src?.tiny || `https://picsum.photos/seed/${typeName}-avatar/200/200`

  const aboutUrl = cardUrls.length > 0 ? cardUrls.shift()! : `https://picsum.photos/seed/${typeName}-about/600/400`
  return { hero: heroUrl, about: aboutUrl, cards: cardUrls, avatar: avatarUrl }
}

// ---------- Content JSON from Claude ----------
interface GeneratedContent {
  heroEyebrow: string
  tagline: string
  heroSubtitle: string
  ctaPrimary: string
  ctaSecondary: string
  servicesHeading: string
  services: { name: string; description: string; tags: string[]; icon?: string; serviceImageQuery?: string }[]
  galleryHeading: string
  aboutHeading: string
  aboutText: string
  stats: { value: string; label: string; sublabel?: string }[]
  contactHeading: string
  contactHours?: string
  processSteps?: { step: string; title: string; description: string }[]
  stepsHeading?: string
  projectCaptions?: string[]
  // Extended fields from preset content
  heroAccent?: string
  ctaNote?: string
  badge?: string
  aboutMission?: string
  testimonial?: { quote: string; author: string; rating: number }
  testimonials?: { quote: string; author: string; rating: number }[]
  logoUrl?: string
  imageMood?: string
  heroImageQuery?: string
  aboutImageQuery?: string
  galleryImageQueries?: string[]
  features?: { name: string; description: string; imageQuery?: string }[]
}

// ---------- Shared template helpers ----------

function getLocationInfo(country: string): { address: string; city: string; postcode: string; country: string; phone: string } {
  const locations: Record<string, { address: string; city: string; postcode: string; country: string; phone: string }> = {
    'South Africa': { address: '123 Main Road', city: 'Cape Town', postcode: '8001', country: 'South Africa', phone: '021 000 0000' },
    'United Kingdom': { address: '42 High Street', city: 'London', postcode: 'EC2A 4BQ', country: 'United Kingdom', phone: '+44 20 7946 0958' },
    'United States': { address: '350 Fifth Avenue', city: 'New York, NY', postcode: '10118', country: 'United States', phone: '+1 (212) 555-0147' },
    'Australia': { address: '275 George Street', city: 'Sydney, NSW', postcode: '2000', country: 'Australia', phone: '+61 2 9374 4000' },
    'Germany': { address: 'Friedrichstraße 43', city: 'Berlin', postcode: '10117', country: 'Germany', phone: '+49 30 123456' },
    'France': { address: '8 Rue de Rivoli', city: 'Paris', postcode: '75001', country: 'France', phone: '+33 1 42 60 00 00' },
    'Netherlands': { address: 'Keizersgracht 125', city: 'Amsterdam', postcode: '1015 CJ', country: 'Netherlands', phone: '+31 20 555 0123' },
    'Ireland': { address: '45 Grafton Street', city: 'Dublin', postcode: 'D02 H638', country: 'Ireland', phone: '+353 1 555 0123' },
    'Canada': { address: '100 King Street West', city: 'Toronto, ON', postcode: 'M5X 1A9', country: 'Canada', phone: '+1 (416) 555-0147' },
    'New Zealand': { address: '15 Queen Street', city: 'Auckland', postcode: '1010', country: 'New Zealand', phone: '+64 9 555 0123' },
    'United Arab Emirates': { address: 'Sheikh Zayed Road', city: 'Dubai', postcode: '', country: 'UAE', phone: '+971 4 555 0123' },
    'Singapore': { address: '1 Raffles Place', city: 'Singapore', postcode: '048616', country: 'Singapore', phone: '+65 6555 0123' },
  }
  return locations[country] || locations['South Africa']
}

interface TemplateData {
  content: GeneratedContent
  businessName: string
  businessCategory: BusinessCategory
  primaryColor: string
  secondaryColor: string
  pages: string[]
  images: string[]
  stockImages: StockImages
  variant: TemplateVariant
  locationInfo: ReturnType<typeof getLocationInfo>
}

// Determines which extra nav links to show (selected pages beyond Home).
// All sections always render on the home page regardless.
function resolveNavLinks(pages: string[]) {
  const lowerPages = pages.map(p => p.toLowerCase())
  const links: { label: string; href: string }[] = []

  if (lowerPages.some(p => ['services', 'menu', 'treatments', 'classes', 'courses', 'products'].some(k => p.includes(k))))
    links.push({ label: 'Services', href: '#services' })
  if (lowerPages.some(p => ['gallery', 'portfolio', 'work', 'projects'].some(k => p.includes(k))))
    links.push({ label: 'Gallery', href: '#gallery' })
  if (lowerPages.some(p => p.includes('about')))
    links.push({ label: 'About', href: '#about' })
  if (lowerPages.some(p => p.includes('testimonial')))
    links.push({ label: 'Testimonials', href: '#testimonials' })
  if (lowerPages.some(p => p.includes('blog')))
    links.push({ label: 'Blog', href: '#blog' })
  if (lowerPages.some(p => ['contact', 'booking', 'appointment'].some(k => p.includes(k))))
    links.push({ label: 'Contact', href: '#contact' })

  return {
    allLinks: links,
    navServices: links.some(l => l.href === '#services'),
    navGallery: links.some(l => l.href === '#gallery'),
    navAbout: links.some(l => l.href === '#about'),
    navContact: links.some(l => l.href === '#contact'),
  }
}

type Theme = 'dark' | 'light'

function lightenColor(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const lr = Math.min(255, r + Math.round((255 - r) * amount))
  const lg = Math.min(255, g + Math.round((255 - g) * amount))
  const lb = Math.min(255, b + Math.round((255 - b) * amount))
  return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`
}

function getLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return 0.299 * r + 0.587 * g + 0.114 * b
}

function buildCssVars(fonts: { headingFamily: string }, primaryColor: string, secondaryColor: string, theme: Theme = 'dark'): string {
  // Create a readable version of primary for dark backgrounds
  const primaryLum = getLuminance(primaryColor)
  const primaryOnDark = primaryLum < 0.4 ? lightenColor(primaryColor, 0.6) : primaryColor
  const primaryOnLight = primaryLum > 0.7 ? '#1a1a2e' : primaryColor

  const vars = theme === 'light' ? `
      --bg: #fafafa;
      --bg-alt: #f0f0f0;
      --card-bg: #ffffff;
      --text: #1a1a1a;
      --text-muted: #555555;
      --border: rgba(0,0,0,0.08);` : `
      --bg: #0f0f0f;
      --bg-alt: #141414;
      --card-bg: #1a1a1a;
      --text: #f5f5f0;
      --text-muted: #a3a3a0;
      --border: rgba(255,255,255,0.08);`

  return `
    :root {
      --heading-font: ${fonts.headingFamily};
      --body-font: 'Inter', sans-serif;
      --primary: ${theme === 'dark' ? primaryOnDark : primaryOnLight};
      --primary-on-dark: ${primaryOnDark};
      --primary-raw: ${primaryColor};
      --secondary: ${secondaryColor};${vars}
    }
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: var(--bg); color: var(--text); font-family: var(--body-font); -webkit-font-smoothing: antialiased; }
    img { display: block; max-width: 100%; }
    a { cursor: pointer; }
    a:active, button:active { pointer-events: none; }
    em { font-style: italic; }

    /* Mobile responsive — class-based for reliability */
    .ms-grid { display: grid; }
    .ms-flex { display: flex; }

    /* Burger menu */
    .ms-burger { display: none; background: none; border: none; cursor: pointer; padding: 8px; flex-direction: column; gap: 5px; z-index: 200; }
    .ms-burger span { display: block; width: 24px; height: 2px; background: #fff; transition: all 0.3s ease; }
    .ms-nav-links { display: flex; align-items: center; gap: 2rem; }
    /* CSS-only burger menu — no JavaScript needed */
    #ms-menu-toggle { display: none; }
    #ms-menu-toggle:checked ~ #ms-mob-menu { display: flex; }
    #ms-mob-menu { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); z-index: 150; cursor: pointer; align-items: center; justify-content: center; }
    #ms-mob-menu a { color: #fff; text-decoration: none; font-family: var(--heading-font); font-size: 1.6rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.25rem 0; border: none; border-bottom: 1.5px solid transparent; transition: border-color 0.3s; }
    #ms-mob-menu a:hover { border-bottom-color: rgba(255,255,255,0.5); }
    .ms-close-label { position: absolute; top: 2rem; right: 2rem; color: #fff; font-size: 2.5rem; cursor: pointer; z-index: 200; font-weight: 300; }

    @media (max-width: 768px) {
      .ms-burger { display: flex; }
      .ms-burger-inline { display: flex !important; }
      .ms-nav-links { display: none !important; }
      nav { padding: 0 1rem !important; height: auto !important; min-height: 56px; }

      section { padding: 40px 0 !important; }
      section > div { padding: 0 1.25rem !important; }

      /* All multi-col grids → 1 col */
      .ms-grid { grid-template-columns: 1fr !important; }

      /* Gallery → 2 stacked full-width photos */
      #gallery .ms-grid { display: flex !important; flex-direction: column !important; }
      #gallery .ms-grid > * { width: 100% !important; height: 260px !important; overflow: hidden !important; grid-row: auto !important; grid-column: auto !important; }
      #gallery .ms-grid > *:nth-child(n+3) { display: none !important; }

      /* Flex process rows → vertical */
      .ms-flex { flex-direction: column !important; }
      .ms-flex > svg, .ms-arrow { transform: rotate(90deg); margin: 0.5rem auto !important; padding: 0 !important; }

      /* Hero sections */
      section:first-of-type { min-height: auto !important; padding-top: 30px !important; padding-bottom: 30px !important; }

      /* Fixed heights → sensible mobile height */
      .ms-img { height: 220px !important; }

      /* Nav padding tighter on mobile */
      .ms-nav > div { padding-left: 1rem !important; padding-right: 1rem !important; }
      /* Hide ctaNote on mobile */
      .ms-cta-note { display: none !important; }
      /* Section padding — reduce to ~1/3 on mobile */
      section { padding-top: 40px !important; padding-bottom: 40px !important; }
      #gallery > div { padding-top: 25px !important; padding-bottom: 25px !important; }
      footer { padding: 2rem 1.25rem 1rem !important; }
      /* About section — hide CTA button, reduce padding */
      #about a[href="#contact"] { display: none !important; }
      #about div:last-child > a[href="#contact"] { display: none !important; }
      #about { padding: 50px 0 40px !important; }

      /* Stats strips — centre items when wrapping */
      .ms-stats { flex-wrap: wrap !important; justify-content: center !important; }
      .ms-stat-item { flex: 1 1 100% !important; text-align: center !important; }

      .ms-sticky { position: static !important; }
      .ms-nav { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; z-index: 100 !important; }

      /* Footer */
      footer div { grid-template-columns: 1fr !important; }
      footer > div > div { grid-template-columns: 1fr !important; gap: 2rem !important; }

      /* Scale type */
      h1 { font-size: clamp(1.6rem, 7vw, 2.2rem) !important; line-height: 1.15 !important; }
      h2 { font-size: clamp(1.3rem, 5vw, 1.8rem) !important; }

      /* Form */
      form .ms-grid { grid-template-columns: 1fr !important; }

      /* Gallery cells */
      .pf-cell { height: 160px !important; }
    }

    @media (max-width: 480px) {
      section { padding: 30px 0 !important; }
      .ms-nav-links { display: none !important; }
      nav > div > a:not(:first-child):not(:last-child) { display: none !important; }
    }`
}

function buildMobileMenu(content: GeneratedContent, links?: { label: string; href: string }[]): string {
  const menuLinks = links || [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]
  return `
  <input type="checkbox" id="ms-menu-toggle" />
  <label for="ms-menu-toggle" id="ms-mob-menu">
    <label for="ms-menu-toggle" class="ms-close-label">&times;</label>
    <div style="display:flex;flex-direction:column;align-items:center;gap:2.5rem" onclick="event.stopPropagation()">
      ${menuLinks.map(l => `<label for="ms-menu-toggle"><a href="${l.href}">${l.label}</a></label>`).join('\n      ')}
      <label for="ms-menu-toggle"><a href="#contact" style="margin-top:1rem;font-size:1rem;padding:0.75rem 2.5rem;background:rgba(255,255,255,0.1);border:1.5px solid rgba(255,255,255,0.3);border-radius:999px;border-bottom:1.5px solid rgba(255,255,255,0.3)">${content.ctaPrimary}</a></label>
    </div>
  </label>
`
}

// Build a unique image pool from user images + stock, padded with picsum to avoid repeats
function buildImagePool(images: string[], stockImages: { hero: string; cards: string[] }, businessName: string): string[] {
  // Deduplicate by photo ID — also exclude the hero image
  const heroId = (images[0] || stockImages.hero).match(/photos\/(\d+)/)?.[1] || ''
  const all = [...images.slice(1), ...stockImages.cards].filter(Boolean)
  const seen = new Set<string>([heroId])
  const pool: string[] = []
  for (const url of all) {
    const id = url.match(/photos\/(\d+)/)?.[1] || url
    if (!seen.has(id)) {
      seen.add(id)
      pool.push(url)
    }
  }
  // Pad with unique picsum images so we NEVER repeat
  for (let i = pool.length; i < 20; i++) {
    pool.push(`https://picsum.photos/seed/${encodeURIComponent(businessName)}-img${i}/600/400`)
  }
  return pool
}

// Ensures items fill grid rows evenly — no orphans
function evenGrid(items: unknown[], cols: number): { items: unknown[]; cols: number } {
  if (items.length <= cols) return { items, cols: items.length }
  // If items fill evenly, great
  if (items.length % cols === 0) return { items, cols }
  // Try 2 columns
  if (items.length % 2 === 0) return { items, cols: 2 }
  // Drop last item to make it even
  return { items: items.slice(0, items.length - (items.length % cols)), cols }
}

// Category-specific fallback testimonials (used when content.testimonials is not populated)
const categoryTestimonials: Record<string, { quote: string; author: string; rating: number }[]> = {
  'food-hospitality': [
    { quote: 'The food was incredible and the service even better. We\'ll be back every weekend.', author: 'Sarah M., Regular Guest', rating: 5 },
    { quote: 'Celebrated our anniversary here — the atmosphere was perfect and the staff made us feel so special.', author: 'David & Lisa K., Cape Town', rating: 5 },
  ],
  'retail': [
    { quote: 'Always find exactly what I\'m looking for. The staff really know their products.', author: 'Priya N., Loyal Customer', rating: 5 },
    { quote: 'Great selection and fair prices. My go-to shop for years now.', author: 'James V., Local Shopper', rating: 5 },
  ],
  'trades-construction': [
    { quote: 'Arrived on time, did a clean job, and charged exactly what they quoted. Rare to find these days.', author: 'Mark D., Homeowner', rating: 5 },
    { quote: 'Used them twice now — both times excellent workmanship and no mess left behind.', author: 'Zanele K., Property Manager', rating: 5 },
  ],
  'health-wellness': [
    { quote: 'Caring, thorough, and always takes the time to explain everything properly.', author: 'Rachel S., Regular Client', rating: 5 },
    { quote: 'Finally found a practice that actually listens. My whole family goes here now.', author: 'Thomas B., Family Client', rating: 5 },
  ],
  'professional': [
    { quote: 'Handled our case with real expertise. Clear communication throughout the process.', author: 'Linda P., Business Client', rating: 5 },
    { quote: 'Responsive, knowledgeable, and genuinely invested in getting the best outcome for us.', author: 'Andrew F., Director', rating: 5 },
  ],
  'fitness-sport': [
    { quote: 'The trainers push you just the right amount. Best shape of my life.', author: 'Chris W., Member since 2022', rating: 5 },
    { quote: 'Great community vibe and top-notch facilities. Worth every cent of the membership.', author: 'Naledi M., Active Member', rating: 5 },
  ],
  'pets': [
    { quote: 'They treat our dogs like family. Wouldn\'t trust anyone else.', author: 'Emma & Grant H., Pet Owners', rating: 5 },
    { quote: 'Friendly, gentle with nervous animals, and always go the extra mile.', author: 'Fatima A., Cat & Dog Mom', rating: 5 },
  ],
  'home-services': [
    { quote: 'Reliable, affordable, and our house has never looked better. Highly recommend.', author: 'Karen L., Homeowner', rating: 5 },
    { quote: 'Booking was easy, they showed up on time, and did a brilliant job. Will use again.', author: 'Sipho M., Repeat Customer', rating: 5 },
  ],
  'education': [
    { quote: 'My child\'s confidence has grown so much since starting here. The teachers are wonderful.', author: 'Nicole V., Parent', rating: 5 },
    { quote: 'Patient, encouraging, and really knows how to make learning enjoyable.', author: 'Brian T., Adult Learner', rating: 5 },
  ],
  'events-entertainment': [
    { quote: 'Made our event absolutely unforgettable. Every detail was taken care of.', author: 'Tamara J., Bride', rating: 5 },
    { quote: 'The crowd loved every moment. Professional from start to finish.', author: 'Kevin R., Corporate Client', rating: 5 },
  ],
  'automotive': [
    { quote: 'Honest pricing and they explain exactly what needs doing. My mechanic for life.', author: 'Johan P., Car Owner', rating: 5 },
    { quote: 'Quick turnaround and quality work. My car runs better than when I bought it.', author: 'Michelle D., Regular Customer', rating: 5 },
  ],
  'creative': [
    { quote: 'Captured exactly what we envisioned — actually even better. Real creative talent.', author: 'Samantha L., Brand Owner', rating: 5 },
    { quote: 'Delivered on time, on brief, and the quality was exceptional. Already booked them again.', author: 'Ruan V., Marketing Manager', rating: 5 },
  ],
  'property': [
    { quote: 'Found us the perfect home in two weeks. Knowledgeable, patient, and zero pressure.', author: 'The Naidoo Family, New Homeowners', rating: 5 },
    { quote: 'Professional, transparent, and genuinely had our best interests at heart throughout.', author: 'Carol M., Seller', rating: 5 },
  ],
  'tech-digital': [
    { quote: 'Transformed our online presence completely. Traffic is up 300% since launch.', author: 'Laura H., Startup Founder', rating: 5 },
    { quote: 'They actually understood our business, not just the tech. That made all the difference.', author: 'Peter G., MD', rating: 5 },
  ],
  'other': [
    { quote: 'Exceeded our expectations in every way. Truly outstanding service.', author: 'Amanda S., Client', rating: 5 },
    { quote: 'Professional, reliable, and a pleasure to work with from start to finish.', author: 'Daniel K., Business Owner', rating: 5 },
  ],
}

function getFallbackTestimonials(content: GeneratedContent, category: string): { quote: string; author: string; rating: number }[] {
  if (content.testimonials && content.testimonials.length >= 3) {
    return content.testimonials.slice(1, 3)
  }
  return categoryTestimonials[category] || categoryTestimonials['other']!
}

function buildStandardNav(businessName: string, content: GeneratedContent, navFlags: ReturnType<typeof resolveNavLinks>): string {
  const allLinks = navFlags.allLinks
  const inline = allLinks.length <= 4
  const logoHtml = content.logoUrl
    ? `<a href="#" style="display:flex;align-items:center;text-decoration:none"><img src="${content.logoUrl}" alt="${businessName}" style="height:40px;max-width:200px;object-fit:contain" /></a>`
    : `<a href="#" style="font-family:var(--heading-font);font-size:1.3rem;font-weight:700;color:#fff;text-decoration:none">${businessName}</a>`

  if (inline) {
    // Inline nav: logo | links | CTA button (no burger on desktop, burger on mobile)
    return `
  <nav class="ms-sticky ms-nav" style="background:var(--primary-raw);position:sticky;top:0;z-index:100">
    <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 2rem">
      ${logoHtml}
      <div style="display:flex;align-items:center;gap:2rem">
        <div class="ms-nav-links" style="display:flex;align-items:center;gap:2rem">
          ${allLinks.map(l => `<a href="${l.href}" style="font-family:var(--body-font);font-size:0.85rem;font-weight:500;color:rgba(255,255,255,0.85);text-decoration:none">${l.label}</a>`).join('\n          ')}
        </div>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:var(--primary-raw);background:#fff;padding:0.55rem 1.5rem;border-radius:999px;text-decoration:none;cursor:pointer">${content.ctaPrimary}</a>
        <label for="ms-menu-toggle" class="ms-burger-inline" style="display:none;background:transparent;border:1.5px solid #fff;border-radius:999px;color:#fff;cursor:pointer;padding:0.55rem 1.5rem;flex-direction:column;gap:3.5px;align-items:center;justify-content:center" aria-label="Menu">
          <span style="display:block;width:18px;height:1.5px;background:#fff"></span>
          <span style="display:block;width:18px;height:1.5px;background:#fff"></span>
          <span style="display:block;width:18px;height:1.5px;background:#fff"></span>
        </label>
      </div>
    </div>
  </nav>
  ${buildMobileMenu(content, allLinks)}`
  }

  // Burger nav: logo | CTA + burger (5+ pages)
  return `
  <nav class="ms-sticky ms-nav" style="background:var(--primary-raw);position:sticky;top:0;z-index:100">
    <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 2rem">
      ${logoHtml}
      <div style="display:flex;align-items:center;gap:1.25rem">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:var(--primary-raw);background:#fff;padding:0.55rem 1.5rem;border-radius:999px;text-decoration:none;cursor:pointer">${content.ctaPrimary}</a>
        <label for="ms-menu-toggle" style="background:transparent;border:1.5px solid #fff;border-radius:999px;color:#fff;cursor:pointer;padding:0.55rem 1.5rem;display:flex;flex-direction:column;gap:3.5px;align-items:center;justify-content:center" aria-label="Menu">
          <span style="display:block;width:18px;height:1.5px;background:#fff"></span>
          <span style="display:block;width:18px;height:1.5px;background:#fff"></span>
          <span style="display:block;width:18px;height:1.5px;background:#fff"></span>
        </label>
      </div>
    </div>
  </nav>
  ${buildMobileMenu(content, allLinks)}`
}

function buildBurgerButton(color: string = '#fff'): string {
  return `<button class="ms-burger" onclick="document.getElementById('ms-mob-menu').classList.add('open')" aria-label="Menu">
        <span style="background:${color}"></span><span style="background:${color}"></span><span style="background:${color}"></span>
      </button>`
}

function buildFooter(businessName: string, content: GeneratedContent, theme: Theme = 'dark'): string {
  // Use first tag as footer link text (tags are always service categories, never person names)
  const serviceLinks = content.services.slice(0, 4).map(s => {
    const label = (s.tags && s.tags.length > 0) ? s.tags[0] : s.name
    return `<a href="#services" style="color:var(--text-muted);text-decoration:none;font-size:0.85rem;transition:color 0.2s;display:block;margin-bottom:0.6rem">${label}</a>`
  }).join('\n            ')

  return `
  <footer style="padding:4rem 2rem 2rem;background:${theme === 'light' ? '#f0f0f0' : '#0a0a0a'};border-top:1px solid var(--border)">
    <div class="ms-grid" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem">
      <div>
        <div style="font-family:var(--heading-font);font-size:1.4rem;font-weight:800;color:var(--text);margin-bottom:0.75rem;letter-spacing:0.1em;text-transform:uppercase">${businessName}</div>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:var(--text-muted);line-height:1.6;max-width:280px">${content.heroSubtitle}</p>
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text);margin-bottom:1rem;font-weight:600">Services</div>
        ${serviceLinks}
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text);margin-bottom:1rem;font-weight:600">Company</div>
        <a href="#about" style="color:var(--text-muted);text-decoration:none;font-size:0.85rem;transition:color 0.2s;display:block;margin-bottom:0.6rem">About Us</a>
        <a href="#gallery" style="color:var(--text-muted);text-decoration:none;font-size:0.85rem;transition:color 0.2s;display:block;margin-bottom:0.6rem">Gallery</a>
        <a href="#contact" style="color:var(--text-muted);text-decoration:none;font-size:0.85rem;transition:color 0.2s;display:block;margin-bottom:0.6rem">Contact</a>
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text);margin-bottom:1rem;font-weight:600">Legal</div>
        <a href="#" style="color:var(--text-muted);text-decoration:none;font-size:0.85rem;transition:color 0.2s;display:block;margin-bottom:0.6rem">Privacy Policy</a>
        <a href="#" style="color:var(--text-muted);text-decoration:none;font-size:0.85rem;transition:color 0.2s;display:block;margin-bottom:0.6rem">Terms of Service</a>
      </div>
    </div>
    <div style="max-width:1100px;margin:2rem auto 0;padding-top:2rem;border-top:1px solid var(--border);text-align:center">
      <div style="font-family:var(--body-font);font-size:0.8rem;color:var(--text-muted)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</div>
    </div>
  </footer>`
}

function buildAboutSection(content: GeneratedContent): string {
  const aboutParagraphs = content.aboutText.split('\n').filter(p => p.trim())

  return `
    <section id="about" style="padding:100px 0;background:var(--bg-alt)">
      <div class="ms-grid" style="max-width:1100px;margin:0 auto;padding:0 2rem;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start">
        <div>
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);line-height:1.2;margin:0 0 2rem 0">${content.aboutHeading}</h2>
          ${content.aboutMission ? `<p style="font-family:var(--body-font);font-size:1.15rem;color:var(--text);line-height:1.6;font-style:italic;font-weight:600;margin:0 0 2rem 0">${content.aboutMission}</p>` : ''}
          ${aboutParagraphs.map(p => `<p style="font-family:var(--body-font);font-size:1rem;color:var(--text-muted);line-height:1.8;margin:0 0 1rem 0">${p}</p>`).join('')}
        </div>
        <div>
          <div class="ms-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;padding-top:1rem">
            ${content.stats.slice(0, 4).map(s => `
              <div>
                <div style="font-family:var(--heading-font);font-size:2rem;font-weight:700;color:var(--text)">${s.value}</div>
                <div style="font-family:var(--body-font);font-size:0.85rem;color:var(--text-muted)">${s.label}</div>
                ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.75rem;color:var(--text-muted);opacity:0.7;margin-top:0.15rem">${s.sublabel}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>`
}

function buildTestimonialSection(content: GeneratedContent): string {
  if (!content.testimonial) return ''
  return `
    <section style="padding:80px 0;background:var(--bg)">
      <div style="max-width:700px;margin:0 auto;padding:0 2rem;text-align:center">
        <div style="font-size:4rem;line-height:1;color:var(--primary);margin-bottom:1.5rem">&#10077;</div>
        <p style="font-family:var(--heading-font);font-size:clamp(1.15rem,2vw,1.5rem);font-weight:400;color:var(--text);line-height:1.6;font-style:italic;margin-bottom:1.5rem">"${content.testimonial.quote}"</p>
        <p style="font-family:var(--body-font);font-size:0.8rem;color:var(--text-muted);letter-spacing:0.1em;text-transform:uppercase;font-weight:500;margin-bottom:0.75rem">— ${content.testimonial.author}</p>
        ${content.testimonial.rating ? `<div style="color:#f59e0b;font-size:1rem;letter-spacing:0.1em">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
      </div>
    </section>`
}

function buildContactSection(content: GeneratedContent, locationInfo: ReturnType<typeof getLocationInfo>): string {
  const hasHours = !!content.contactHours

  if (!hasHours) {
    // Simple centered layout (no hours info)
    return `
    <section id="contact" style="padding:100px 0;background:var(--bg)">
      <div style="max-width:600px;margin:0 auto;padding:0 2rem;text-align:center">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,2.5rem);font-weight:400;color:var(--text);margin-bottom:3rem;line-height:1.2">${content.contactHeading}</h2>
        <form style="display:flex;flex-direction:column;gap:1.25rem" onsubmit="return false">
          <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
            <input type="text" placeholder="Name" style="font-family:var(--body-font);padding:0.9rem 1.25rem;background:var(--card-bg);border:1px solid var(--border);border-radius:12px;color:var(--text);font-size:0.95rem;outline:none" />
            <input type="email" placeholder="Email" style="font-family:var(--body-font);padding:0.9rem 1.25rem;background:var(--card-bg);border:1px solid var(--border);border-radius:12px;color:var(--text);font-size:0.95rem;outline:none" />
          </div>
          <textarea placeholder="Your message" rows="4" style="font-family:var(--body-font);padding:0.9rem 1.25rem;background:var(--card-bg);border:1px solid var(--border);border-radius:12px;color:var(--text);font-size:0.95rem;outline:none;resize:none"></textarea>
          <button type="submit" style="font-family:var(--body-font);padding:1rem 2.5rem;background:var(--primary);color:#fff;border:none;border-radius:12px;font-size:1rem;font-weight:600;cursor:pointer;transition:opacity 0.2s">Send Message</button>
        </form>
      </div>
    </section>`
  }

  // 2-column layout: left = info + hours, right = form
  return `
    <section id="contact" style="padding:100px 0;background:var(--bg)">
      <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,2.5rem);font-weight:400;color:var(--text);margin-bottom:3rem;line-height:1.2">${content.contactHeading}</h2>
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:start">
          <div>
            <div style="margin-bottom:2rem">
              <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text);font-weight:600;margin-bottom:0.75rem">Address</div>
              <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.7">${locationInfo.address}, ${locationInfo.city}, ${locationInfo.postcode}</p>
            </div>
            <div style="margin-bottom:2rem">
              <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text);font-weight:600;margin-bottom:0.75rem">Get in Touch</div>
              <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.7">hello@yourbusiness.com<br />${locationInfo.phone}</p>
            </div>
            <div>
              <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text);font-weight:600;margin-bottom:0.75rem">Trading Hours</div>
              <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.7">${content.contactHours?.replace(/ · /g, '<br />') ?? ''}</p>
            </div>
          </div>
          <form style="display:flex;flex-direction:column;gap:1.25rem" onsubmit="return false">
            <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
              <input type="text" placeholder="Name" style="font-family:var(--body-font);padding:0.9rem 1.25rem;background:var(--card-bg);border:1px solid var(--border);border-radius:12px;color:var(--text);font-size:0.95rem;outline:none" />
              <input type="email" placeholder="Email" style="font-family:var(--body-font);padding:0.9rem 1.25rem;background:var(--card-bg);border:1px solid var(--border);border-radius:12px;color:var(--text);font-size:0.95rem;outline:none" />
            </div>
            <input type="text" placeholder="Phone" style="font-family:var(--body-font);padding:0.9rem 1.25rem;background:var(--card-bg);border:1px solid var(--border);border-radius:12px;color:var(--text);font-size:0.95rem;outline:none" />
            <textarea placeholder="Your message" rows="4" style="font-family:var(--body-font);padding:0.9rem 1.25rem;background:var(--card-bg);border:1px solid var(--border);border-radius:12px;color:var(--text);font-size:0.95rem;outline:none;resize:none"></textarea>
            <button type="submit" style="font-family:var(--body-font);padding:1rem 2.5rem;background:var(--primary);color:#fff;border:none;border-radius:12px;font-size:1rem;font-weight:600;cursor:pointer;transition:opacity 0.2s">Send Message</button>
          </form>
        </div>
      </div>
    </section>`
}

function buildHead(businessName: string, fonts: { heading: string; headingFamily: string }, primaryColor: string, secondaryColor: string, theme: Theme = 'dark'): string {
  const fontImportUrl = `https://fonts.googleapis.com/css2?family=${fonts.heading}&family=Inter:wght@300;400;500;600&display=swap`
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${businessName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${fontImportUrl}" rel="stylesheet" />
  <style>${buildCssVars(fonts, primaryColor, secondaryColor, theme)}
  </style>
</head>
<body>`
}

// ---------- Icon helpers ----------
const iconMap: Record<string, string> = {
  'zap': '&#9889;', 'bolt': '&#9889;', 'cpu': '&#9881;', 'sun': '&#9728;', 'droplet': '&#128167;',
  'flame': '&#128293;', 'tool': '&#128295;', 'wrench': '&#128295;', 'home': '&#127968;', 'shield': '&#128737;',
  'layers': '&#9776;', 'grid': '&#9638;', 'box': '&#128230;', 'maximize': '&#11036;', 'star': '&#11088;',
  'map': '&#128205;', 'edit': '&#9998;', 'edit-2': '&#9998;', 'square': '&#9632;', 'key': '&#128273;',
  'lock': '&#128274;', 'align-left': '&#9776;', 'trash-2': '&#128465;', 'truck': '&#128666;',
  'credit-card': '&#128179;', 'repeat': '&#128260;', 'settings': '&#9881;', 'check': '&#10003;',
  'phone': '&#9742;', 'mail': '&#9993;', 'clock': '&#9200;', 'calendar': '&#128197;',
  'user': '&#128100;', 'users': '&#128101;', 'heart': '&#10084;', 'briefcase': '&#128188;',
  'camera': '&#128247;', 'music': '&#127925;', 'book': '&#128214;', 'scissors': '&#9986;',
  'thermometer': '&#127777;', 'wind': '&#127744;', 'cloud': '&#9729;', 'umbrella': '&#9730;',
}
const fallbackIcons = ['&#9670;', '&#9733;', '&#9678;', '&#9632;', '&#9674;', '&#9656;', '&#10022;', '&#9830;']
function mapIcon(icon?: string, index?: number): string {
  if (icon && iconMap[icon]) return iconMap[icon]
  return fallbackIcons[(index || 0) % fallbackIcons.length]
}

// ---------- Redesigned Templates ----------

function buildVisualTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = stockImages.about || stockPool[4]

  const pr = parseInt(primaryColor.slice(1, 3), 16)
  const pg = parseInt(primaryColor.slice(3, 5), 16)
  const pb = parseInt(primaryColor.slice(5, 7), 16)

  const fallbackTestimonials = getFallbackTestimonials(content, businessCategory)

  const servicesSection = `
    <style>
      .vs-svc-item { border-top:1px solid var(--border);padding:2rem 0;cursor:default;transition:background 0.3s }
      .vs-svc-item:last-child { border-bottom:1px solid var(--border) }
      .vs-svc-item:hover { background:rgba(${pr},${pg},${pb},0.04) }
      .vs-num { font-family:var(--heading-font);font-size:4rem;font-weight:400;line-height:1;color:rgba(${pr},${pg},${pb},0.18);float:left;margin-right:1.5rem;margin-top:-0.5rem }
    </style>
    <section id="services" style="padding:120px 0;background:var(--bg-alt)">
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1.1fr;gap:5rem;align-items:start">
          <div>
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem">
              <div style="width:40px;height:1px;background:var(--primary)"></div>
              <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);font-weight:600;margin:0">${content.heroEyebrow}</p>
            </div>
            <h2 style="font-family:var(--heading-font);font-size:clamp(2.2rem,4vw,3.5rem);font-weight:400;color:var(--text);line-height:1.15;margin:0 0 2.5rem 0">${content.servicesHeading}</h2>
            <div class="ms-img" style="overflow:hidden;border-radius:4px;height:480px;position:relative">
              <img src="${stockPool[1]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 8s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
              <div style="position:absolute;bottom:0;left:0;right:0;height:40%;background:linear-gradient(to top,rgba(0,0,0,0.5),transparent)"></div>
            </div>
          </div>
          <div class="vs-svc-right" style="padding-top:5rem">
            ${content.services.map((s, i) => `
              <div class="vs-svc-item" style="padding:2rem 0${i === 0 ? ';border-top:1px solid var(--border)' : ''}">
                <div style="overflow:hidden">
                  <span class="vs-num">${String(i + 1).padStart(2, '0')}</span>
                  <h3 style="font-family:var(--heading-font);font-size:1.5rem;font-weight:400;color:var(--text);margin:0 0 0.75rem 0;line-height:1.2">${s.name}</h3>
                  <p style="font-family:var(--body-font);font-size:0.9rem;color:var(--text-muted);line-height:1.8;margin:0 0 1rem 0;clear:both">${s.description}</p>
                </div>
                <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1rem">
                  ${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.72rem;padding:0.3rem 0.85rem;border-radius:2px;background:rgba(${pr},${pg},${pb},0.1);color:var(--primary);font-weight:500;letter-spacing:0.03em">${t}</span>`).join('')}
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>`

  const gallerySection = `
    <style>
      .vs-gal { position:relative;overflow:hidden;cursor:pointer }
      .vs-gal img { width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) }
      .vs-gal:hover img { transform:scale(1.06) }
      .vs-gal-overlay { position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 50%);opacity:0;transition:opacity 0.4s }
      .vs-gal:hover .vs-gal-overlay { opacity:1 }
      .vs-gal-label { position:absolute;bottom:1.5rem;left:1.75rem;font-family:var(--body-font);font-size:0.85rem;color:#fff;font-weight:500;letter-spacing:0.05em;opacity:0;transition:opacity 0.4s,transform 0.4s;transform:translateY(8px) }
      .vs-gal:hover .vs-gal-label { opacity:1;transform:translateY(0) }
    </style>
    <section id="gallery" style="padding:0;background:var(--bg)">
      <div style="max-width:1200px;margin:0 auto;padding:80px 2rem 0">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3rem">
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);line-height:1.15;margin:0;max-width:500px">${content.galleryHeading}</h2>
          <a href="#contact" style="font-family:var(--body-font);font-size:0.8rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--primary);text-decoration:none;font-weight:600;white-space:nowrap;padding-bottom:0.25rem;border-bottom:1px solid var(--primary)">${content.ctaPrimary} &rarr;</a>
        </div>
      </div>
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem 80px">
        <div class="ms-grid" style="display:grid;grid-template-columns:1.65fr 1fr;grid-template-rows:340px 260px;gap:8px">
          <div class="vs-gal" style="grid-row:1/3;border-radius:4px 0 0 4px">
            <img src="${stockPool[8]}" alt="Gallery" />
            <div class="vs-gal-overlay"></div>
            <div class="vs-gal-label">${content.heroEyebrow}</div>
          </div>
          <div class="vs-gal" style="border-radius:0 4px 0 0">
            <img src="${stockPool[9]}" alt="Gallery" />
            <div class="vs-gal-overlay"></div>
            <div class="vs-gal-label">${businessName}</div>
          </div>
          <div class="vs-gal" style="border-radius:0 0 4px 0">
            <img src="${stockPool[10]}" alt="Gallery" />
            <div class="vs-gal-overlay"></div>
            <div class="vs-gal-label">${content.servicesHeading}</div>
          </div>
        </div>
        <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px">
          ${[stockPool[11], stockPool[12], stockPool[13]].map((img, i) => `
          <div class="vs-gal" style="height:200px;border-radius:4px">
            <img src="${img}" alt="Gallery" />
            <div class="vs-gal-overlay"></div>
          </div>`).join('')}
        </div>
      </div>
    </section>`

  const testimonialsSection = `
    <section style="padding:100px 0;background:var(--bg-alt);overflow:hidden">
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
          <div style="width:40px;height:1px;background:var(--primary)"></div>
          <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);font-weight:600;margin:0">What Clients Say</p>
        </div>
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start">
          ${content.testimonial ? `
          <div style="position:relative;padding:3rem;background:rgba(${pr},${pg},${pb},0.06);border-radius:4px;border-left:3px solid var(--primary)">
            <div style="font-family:var(--heading-font);font-size:5rem;line-height:0.8;color:var(--primary);opacity:0.3;position:absolute;top:2rem;left:2.5rem">&ldquo;</div>
            <p style="font-family:var(--heading-font);font-size:clamp(1.1rem,2vw,1.35rem);font-weight:400;color:var(--text);line-height:1.65;font-style:italic;margin:1.5rem 0 1.5rem;position:relative;z-index:1">"${content.testimonial.quote}"</p>
            <div style="display:flex;align-items:center;gap:1rem">
              <div style="width:36px;height:1px;background:var(--border)"></div>
              <p style="font-family:var(--body-font);font-size:0.8rem;color:var(--text-muted);letter-spacing:0.08em;text-transform:uppercase;font-weight:500;margin:0">${content.testimonial.author}</p>
            </div>
            ${content.testimonial.rating ? `<div style="color:var(--primary);font-size:0.9rem;margin-top:1rem;letter-spacing:0.15em">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
          </div>` : ''}
          <div style="display:flex;flex-direction:column;gap:2rem">
            ${fallbackTestimonials.slice(0, 2).map(t => `
            <div style="padding:2rem;background:var(--card-bg);border-radius:4px;border:1px solid var(--border)">
              <div style="color:var(--primary);font-size:0.85rem;letter-spacing:0.15em;margin-bottom:1rem">${'&#9733;'.repeat(t.rating)}</div>
              <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text);line-height:1.75;font-style:italic;margin:0 0 1.25rem">"${t.quote}"</p>
              <p style="font-family:var(--body-font);font-size:0.78rem;color:var(--text-muted);letter-spacing:0.08em;text-transform:uppercase;font-weight:500;margin:0">${t.author}</p>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </section>`

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor)

  return `${headHtml}
<style>
  @keyframes vs-kenburns { 0% { transform:scale(1) translate(0,0) } 100% { transform:scale(1.08) translate(-1%,-0.5%) } }
  @keyframes vs-fadeup { from { opacity:0;transform:translateY(28px) } to { opacity:1;transform:translateY(0) } }
  .vs-fade-1 { animation:vs-fadeup 0.9s ease 0.1s both }
  .vs-fade-2 { animation:vs-fadeup 0.9s ease 0.3s both }
  .vs-fade-3 { animation:vs-fadeup 0.9s ease 0.5s both }
  .vs-fade-4 { animation:vs-fadeup 0.9s ease 0.7s both }
  .vs-fade-5 { animation:vs-fadeup 0.9s ease 0.9s both }
  .vs-hero-bg { animation:vs-kenburns 18s ease-out forwards }
  body::before { content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");opacity:0.4 }
  .reveal { opacity:0;transform:translateY(24px);transition:opacity 0.7s ease,transform 0.7s ease }
  .reveal.visible { opacity:1;transform:translateY(0) }
  #custom-cursor-dot { width:6px;height:6px;background:var(--primary);border-radius:50%;position:fixed;pointer-events:none;z-index:10000;transform:translate(-50%,-50%);transition:opacity 0.3s }
  #custom-cursor-ring { width:32px;height:32px;border:1.5px solid rgba(${pr},${pg},${pb},0.5);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width 0.2s,height 0.2s }
  @media(max-width:768px){.vs-hero-eyebrow{display:none!important}.vs-svc-right{padding-top:0.5rem!important}.vs-hero-inner{padding:clamp(4rem,10svh,7rem) 1.25rem clamp(5rem,12svh,8rem)!important}.vs-hero-stats{padding:0!important}.vs-hero-stats>div{flex:1!important;text-align:center!important;border-left:none!important}.vs-hero-stats>div+div{border-left:1px solid rgba(255,255,255,0.08)!important}.vs-hero-stats>div:nth-child(n+4){display:none!important}}
</style>
<div id="custom-cursor-dot"></div>
<div id="custom-cursor-ring"></div>

${buildStandardNav(businessName, content, navFlags)}

  <!-- Hero: full-bleed Ken Burns, eyebrow with flanking lines, massive serif h1 -->
  <section style="position:relative;min-height:calc(100vh - 64px);display:flex;align-items:center;overflow:hidden">
    <div style="position:absolute;inset:0;overflow:hidden">
      <img src="${heroImg}" alt="" class="vs-hero-bg" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(110deg,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.55) 55%,rgba(0,0,0,0.7) 100%)"></div>
    </div>
    <div class="vs-hero-inner" style="position:relative;max-width:1200px;margin:0 auto;padding:7rem 2rem 4rem;width:100%">
      ${content.badge ? `<div class="vs-fade-1" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--body-font);font-size:0.72rem;letter-spacing:0.12em;padding:0.45rem 1.1rem;border-radius:2px;background:rgba(${pr},${pg},${pb},0.15);border:1px solid rgba(${pr},${pg},${pb},0.35);color:rgba(255,255,255,0.9);margin-bottom:2rem;text-transform:uppercase">${content.badge}</div>` : ''}
      <div class="vs-fade-1 vs-hero-eyebrow" style="display:flex;align-items:center;gap:1.25rem;margin-bottom:2rem">
        <div style="width:48px;height:1px;background:var(--primary)"></div>
        <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--primary);font-weight:600;margin:0">${content.heroEyebrow}</p>
        <div style="width:48px;height:1px;background:var(--primary)"></div>
      </div>
      <h1 class="vs-fade-2" style="font-family:var(--heading-font);font-size:clamp(3.2rem,7vw,6rem);font-weight:400;color:#f5f5f0;line-height:1.02;margin:0 0 1.75rem;max-width:780px;letter-spacing:-0.01em">${content.tagline}</h1>
      <p class="vs-fade-3" style="font-family:var(--body-font);font-size:1.1rem;color:rgba(245,245,240,0.72);max-width:500px;line-height:1.8;margin:0 0 ${content.heroAccent ? '1.25rem' : '2.75rem'}">${content.heroSubtitle}</p>
      ${content.heroAccent ? `<p class="vs-fade-3" style="font-family:var(--body-font);font-size:1.1rem;color:var(--primary);font-weight:600;margin:0 0 2.75rem;letter-spacing:0.01em">${content.heroAccent}</p>` : ''}
      <div class="vs-fade-4" style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;padding:1rem 2.75rem;background:var(--primary);color:#fff;border-radius:2px;text-decoration:none;letter-spacing:0.04em;transition:opacity 0.2s">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:var(--body-font);font-size:0.9rem;font-weight:500;padding:1rem 2.25rem;background:transparent;color:#f5f5f0;border:1px solid rgba(255,255,255,0.28);border-radius:2px;text-decoration:none;transition:all 0.2s">${content.ctaSecondary}</a>
      </div>
      ${content.ctaNote ? `<p class="vs-fade-5 ms-cta-note" style="font-family:var(--body-font);font-size:0.78rem;color:rgba(255,255,255,0.42);margin-top:1.25rem">${content.ctaNote}</p>` : ''}
    </div>
    <!-- Hero bottom stat strip -->
    <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.55);backdrop-filter:blur(12px);border-top:1px solid rgba(255,255,255,0.07)">
      <div class="vs-hero-stats" style="max-width:1200px;margin:0 auto;padding:0 2rem;display:flex;gap:0">
        ${content.stats.slice(0, 4).map((s, i) => `
        <div style="flex:1;padding:1.5rem 2rem;${i > 0 ? 'border-left:1px solid rgba(255,255,255,0.08)' : ''}">
          <div style="font-family:var(--heading-font);font-size:2rem;font-weight:400;color:#f5f5f0;line-height:1">${s.value}</div>
          <div style="font-family:var(--body-font);font-size:0.78rem;color:rgba(245,245,240,0.55);margin-top:0.35rem;letter-spacing:0.04em">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${servicesSection}
  ${gallerySection}
  ${testimonialsSection}

  <!-- About -->
  <section id="about" style="padding:120px 0;background:var(--bg)">
    <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1.2fr;gap:5rem;align-items:start">
        <div class="reveal">
          <div style="position:relative;display:inline-block;width:100%">
            <div class="ms-img" style="overflow:hidden;border-radius:4px;height:540px">
              <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
            </div>
            <div style="position:absolute;bottom:-1.5rem;right:-1.5rem;width:120px;height:120px;border:2px solid var(--primary);border-radius:2px;z-index:-1"></div>
          </div>
        </div>
        <div class="reveal">
          <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem">
            <div style="width:40px;height:1px;background:var(--primary)"></div>
            <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);font-weight:600;margin:0">Our Story</p>
          </div>
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,2.8rem);font-weight:400;color:var(--text);line-height:1.2;margin:0 0 1.75rem">${content.aboutHeading}</h2>
          ${content.aboutMission ? `<p style="font-family:var(--heading-font);font-size:1.1rem;color:var(--text);line-height:1.65;font-style:italic;margin:0 0 1.5rem;padding-left:1.25rem;border-left:2px solid var(--primary)">${content.aboutMission}</p>` : ''}
          ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.85;margin:0 0 1rem">${p}</p>`).join('')}
          <div class="ms-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:2rem;margin-top:3rem;padding-top:2.5rem;border-top:1px solid var(--border)">
            ${content.stats.slice(0, 4).map(s => `
            <div>
              <div style="font-family:var(--heading-font);font-size:2.2rem;font-weight:400;color:var(--text);line-height:1">${s.value}</div>
              <div style="font-family:var(--body-font);font-size:0.8rem;color:var(--text-muted);margin-top:0.35rem;letter-spacing:0.04em">${s.label}</div>
              ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.72rem;color:var(--text-muted);opacity:0.6;margin-top:0.15rem">${s.sublabel}</div>` : ''}
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  ${buildContactSection(content, locationInfo)}

${buildFooter(businessName, content)}

<script>
  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.12 });
  revealEls.forEach(el => obs.observe(el));
  setTimeout(function(){ document.querySelectorAll('.reveal,.tr-reveal').forEach(function(el){ el.classList.add('visible'); }); }, 600);
  // Custom cursor
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');
  let rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
    rx += (e.clientX - rx) * 0.12; ry += (e.clientY - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  });
  requestAnimationFrame(function loop() { rx += (parseFloat(dot.style.left||0) - rx) * 0.12; ry += (parseFloat(dot.style.top||0) - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(loop); });
</script>
</body>
</html>`
}

// ---------- Service Template (icon cards, process section) ----------
// Light theme for most service businesses; dark for tech-digital

function buildServiceTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)
  const theme: Theme = businessCategory === 'tech-digital' ? 'dark' : 'light'

  const defaultServiceIcons = ['&#9670;', '&#9674;', '&#9656;', '&#9632;', '&#9678;', '&#9733;']
  const iconMap: Record<string, string> = {
    droplet: '&#128167;', flame: '&#128293;', tool: '&#9874;', zap: '&#9889;', cpu: '&#9881;',
    sun: '&#9728;', home: '&#8962;', shield: '&#128737;', layers: '&#9776;', grid: '&#9638;',
    box: '&#9634;', star: '&#9733;', maximize: '&#10697;', map: '&#9873;', edit: '&#9998;',
    'edit-2': '&#9998;', square: '&#9633;', key: '&#128273;', lock: '&#128274;', truck: '&#128666;',
    'trash-2': '&#9249;', wind: '&#127788;', settings: '&#9881;', 'chevrons-down': '&#8650;',
    'cloud-rain': '&#127783;', 'battery-charging': '&#128267;', 'align-left': '&#9776;',
    'file-text': '&#128196;', book: '&#128214;', users: '&#128101;', target: '&#9678;',
    'trending-up': '&#8599;', 'trending-down': '&#8600;', clock: '&#128336;', briefcase: '&#128188;',
    camera: '&#128247;', mic: '&#127908;', user: '&#128100;', 'user-check': '&#128100;',
    award: '&#127942;', 'check-square': '&#9745;', 'check-circle': '&#10004;', stamp: '&#128203;',
    package: '&#128230;', send: '&#10148;', scissors: '&#9986;', feather: '&#10047;',
    thermometer: '&#127777;', video: '&#128249;', 'alert-triangle': '&#9888;',
    activity: '&#9829;', 'bar-chart-2': '&#128200;', circle: '&#9679;', 'credit-card': '&#128179;',
    'edit-3': '&#9998;', globe: '&#127760;', 'message-circle': '&#128172;', monitor: '&#128187;',
    repeat: '&#128257;', 'shopping-cart': '&#128722;', smartphone: '&#128241;',
    clipboard: '&#128203;', film: '&#127902;', play: '&#9654;', radio: '&#128251;',
    'refresh-cw': '&#128260;', sliders: '&#9776;',
  }

  const pr = parseInt(primaryColor.slice(1, 3), 16)
  const pg = parseInt(primaryColor.slice(3, 5), 16)
  const pb = parseInt(primaryColor.slice(5, 7), 16)

  const stockPool = buildImagePool(images, stockImages, businessName)
  const fallbackTestimonials = getFallbackTestimonials(content, businessCategory)

  const isProfessionalCategory = businessCategory === 'professional'
  const showProcessSection = !isProfessionalCategory

  const steps = content.processSteps || [
    { step: '1', title: 'Get in Touch', description: 'Reach out and tell us what you need' },
    { step: '2', title: 'We Plan', description: 'We create a tailored approach for your project' },
    { step: '3', title: 'We Deliver', description: 'Professional execution with quality guaranteed' },
  ]

  const tileLabels = ['Who We Are', 'Our Approach', 'Our Work', 'Our Team']
  const tileImgs = [
    stockImages.cards[7] || stockImages.hero,
    stockImages.cards[8] || stockImages.cards[0],
    stockImages.cards[9] || stockImages.cards[1],
    stockImages.cards[10] || stockImages.cards[2],
  ]
  const statIcons = ['&#9878;', '&#9734;', '&#9823;']

  const servicesSection = `
    <style>
      .svc-card { transition:transform 0.3s ease,box-shadow 0.3s ease }
      .svc-card:hover { transform:translateY(-4px);box-shadow:0 12px 40px rgba(${pr},${pg},${pb},0.15) !important }
    </style>
    <section id="services" style="padding:110px 0;background:var(--bg-alt)">
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
          <div style="width:32px;height:2px;background:var(--primary);border-radius:1px"></div>
          <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);font-weight:700;margin:0">${content.heroEyebrow}</p>
        </div>
        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3.5rem;gap:2rem">
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);line-height:1.15;margin:0;max-width:550px">${content.servicesHeading}</h2>
          <a href="#contact" style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--primary);text-decoration:none;white-space:nowrap;flex-shrink:0">${content.ctaPrimary} &rarr;</a>
        </div>
        <div class="ms-flex" style="display:flex;align-items:stretch;gap:1rem">
          ${content.services.map((s, i) => `${i > 0 ? `
            <div class="ms-arrow" style="display:flex;align-items:center;flex-shrink:0;padding:0 0.25rem;opacity:0.35">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="var(--text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>` : ''}
            <div class="svc-card" style="flex:1;${theme === 'light' ? 'background:#fff;box-shadow:0 2px 16px rgba(0,0,0,0.06);border:1px solid rgba(0,0,0,0.05)' : 'background:var(--card-bg);border:1px solid var(--border)'};border-radius:3px;padding:2.5rem 2rem;position:relative;overflow:hidden">
              <div style="position:absolute;top:0;left:0;right:0;height:3px;background:rgba(${pr},${pg},${pb},${i === 0 ? '1' : '0.3'})"></div>
              <div style="width:56px;height:56px;border-radius:3px;background:rgba(${pr},${pg},${pb},0.1);display:flex;align-items:center;justify-content:center;margin-bottom:1.75rem">
                <span style="font-size:1.5rem;color:var(--primary)">${s.icon ? (iconMap[s.icon] || defaultServiceIcons[i] || defaultServiceIcons[0]) : (defaultServiceIcons[i] || defaultServiceIcons[0])}</span>
              </div>
              <div style="font-family:var(--body-font);font-size:0.65rem;letter-spacing:0.2em;color:var(--text-muted);font-weight:600;text-transform:uppercase;margin-bottom:0.75rem">0${i + 1}</div>
              <h3 style="font-family:var(--heading-font);font-size:1.2rem;font-weight:600;color:var(--text);margin:0 0 0.85rem;line-height:1.25">${s.name}</h3>
              <p style="font-family:var(--body-font);font-size:0.88rem;color:var(--text-muted);line-height:1.8;margin:0">${s.description}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>`

  const professionalSection = !isProfessionalCategory ? '' : `
    <section style="padding:0;background:var(--bg)">
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:3px;background:var(--border)">
        ${tileImgs.map((img, i) => `
        <div class="ms-img" style="position:relative;height:300px;overflow:hidden">
          <img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 60%)"></div>
          <div style="position:absolute;bottom:1.5rem;left:1.75rem;font-family:var(--body-font);font-size:0.72rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#fff;padding:0.5rem 1rem;background:rgba(${pr},${pg},${pb},0.9);border-radius:2px">${tileLabels[i]}</div>
        </div>`).join('')}
      </div>
      <div style="background:var(--bg-alt);border-top:3px solid var(--primary);padding:70px 2rem">
        <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(${Math.min(content.stats.length, 3)},1fr);gap:0">
          ${content.stats.slice(0, 3).map((s, i) => `
          <div style="text-align:center;padding:2rem 3rem;${i > 0 ? 'border-left:1px solid var(--border)' : ''}">
            <div style="font-size:1.75rem;color:var(--primary);margin-bottom:0.75rem">${statIcons[i % statIcons.length]}</div>
            <div style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,2.8rem);font-weight:400;color:var(--text);margin-bottom:0.4rem;line-height:1">${s.value}</div>
            <div style="font-family:var(--body-font);font-size:0.82rem;font-weight:600;color:var(--text);letter-spacing:0.05em">${s.label}</div>
            ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.75rem;color:var(--text-muted);margin-top:0.3rem">${s.sublabel}</div>` : ''}
          </div>`).join('')}
        </div>
      </div>
    </section>`

  const processSection = isProfessionalCategory ? professionalSection : !showProcessSection ? '' : `
    <section id="gallery" style="padding:110px 0;background:var(--bg)">
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
        <div style="text-align:center;margin-bottom:4rem">
          <div style="display:inline-flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
            <div style="width:32px;height:1px;background:var(--primary)"></div>
            <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);font-weight:600;margin:0">${content.stepsHeading || 'How It Works'}</p>
            <div style="width:32px;height:1px;background:var(--primary)"></div>
          </div>
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,2.75rem);font-weight:400;color:var(--text);margin:0 0 1rem;line-height:1.2">A Simple, Proven Process</h2>
          <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);max-width:460px;margin:0 auto;line-height:1.7">Straightforward from first contact to final delivery — no surprises.</p>
        </div>
        <div class="ms-flex" style="display:flex;align-items:stretch;gap:0;position:relative">
          <div style="position:absolute;top:36px;left:0;right:0;height:1px;background:var(--border);z-index:0"></div>
          ${steps.map((s, i) => `${i > 0 ? `
            <div class="ms-arrow" style="display:flex;align-items:flex-start;flex-shrink:0;padding:0 0.5rem;margin-top:24px;z-index:1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>` : ''}
            <div style="flex:1;${theme === 'light' ? 'background:#fff;box-shadow:0 2px 12px rgba(0,0,0,0.05);border:1px solid rgba(0,0,0,0.06)' : 'background:var(--card-bg);border:1px solid var(--border)'};border-radius:3px;padding:2.5rem 1.75rem;text-align:center;position:relative;z-index:1">
              <div style="width:72px;height:72px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;box-shadow:0 4px 16px rgba(${pr},${pg},${pb},0.3)">
                <span style="font-family:var(--heading-font);font-size:1.5rem;font-weight:700;color:#fff">${s.step}</span>
              </div>
              <h3 style="font-family:var(--heading-font);font-size:1.15rem;font-weight:700;color:var(--text);margin:0 0 0.75rem">${s.title}</h3>
              <p style="font-family:var(--body-font);font-size:0.88rem;color:var(--text-muted);line-height:1.75;margin:0">${s.description}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>`

  const testimonialsSection = `
    <section style="padding:100px 0;background:var(--bg-alt)">
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:3rem">
          <div style="width:32px;height:2px;background:var(--primary);border-radius:1px"></div>
          <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);font-weight:700;margin:0">Client Feedback</p>
        </div>
        <div class="ms-grid" style="display:grid;grid-template-columns:repeat(${Math.min(fallbackTestimonials.length + (content.testimonial ? 1 : 0), 3)},1fr);gap:1.5rem">
          ${content.testimonial ? `
          <div style="${theme === 'light' ? 'background:#fff;box-shadow:0 4px 24px rgba(0,0,0,0.07);border:1px solid rgba(0,0,0,0.05)' : 'background:var(--card-bg);border:1px solid var(--border)'};border-radius:3px;padding:2.5rem;position:relative;overflow:hidden">
            <div style="position:absolute;top:0;left:0;right:0;height:3px;background:var(--primary)"></div>
            <div style="font-size:0.9rem;color:var(--primary);letter-spacing:0.15em;margin-bottom:1.25rem">${'&#9733;'.repeat(content.testimonial.rating || 5)}</div>
            <p style="font-family:var(--heading-font);font-size:1rem;color:var(--text);line-height:1.75;font-style:italic;margin:0 0 1.5rem">"${content.testimonial.quote}"</p>
            <div style="display:flex;align-items:center;gap:0.75rem;padding-top:1.25rem;border-top:1px solid var(--border)">
              <div style="width:8px;height:8px;border-radius:50%;background:var(--primary)"></div>
              <p style="font-family:var(--body-font);font-size:0.78rem;color:var(--text-muted);letter-spacing:0.06em;font-weight:600;margin:0;text-transform:uppercase">${content.testimonial.author}</p>
            </div>
          </div>` : ''}
          ${fallbackTestimonials.slice(0, 2).map(t => `
          <div style="${theme === 'light' ? 'background:#fff;box-shadow:0 4px 24px rgba(0,0,0,0.07);border:1px solid rgba(0,0,0,0.05)' : 'background:var(--card-bg);border:1px solid var(--border)'};border-radius:3px;padding:2.5rem">
            <div style="font-size:0.9rem;color:var(--primary);letter-spacing:0.15em;margin-bottom:1.25rem">${'&#9733;'.repeat(t.rating)}</div>
            <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text);line-height:1.8;font-style:italic;margin:0 0 1.5rem">"${t.quote}"</p>
            <div style="display:flex;align-items:center;gap:0.75rem;padding-top:1.25rem;border-top:1px solid var(--border)">
              <div style="width:8px;height:8px;border-radius:50%;background:rgba(${pr},${pg},${pb},0.4)"></div>
              <p style="font-family:var(--body-font);font-size:0.78rem;color:var(--text-muted);letter-spacing:0.06em;font-weight:600;margin:0;text-transform:uppercase">${t.author}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>`

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, theme)

  return `${headHtml}
<style>
  @keyframes svc-fadeup { from { opacity:0;transform:translateY(24px) } to { opacity:1;transform:translateY(0) } }
  .svc-fade-1 { animation:svc-fadeup 0.8s ease 0.1s both }
  .svc-fade-2 { animation:svc-fadeup 0.8s ease 0.25s both }
  .svc-fade-3 { animation:svc-fadeup 0.8s ease 0.4s both }
  .svc-fade-4 { animation:svc-fadeup 0.8s ease 0.55s both }
  .svc-fade-5 { animation:svc-fadeup 0.8s ease 0.7s both }
  body::before { content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");opacity:0.35 }
  .reveal { opacity:0;transform:translateY(20px);transition:opacity 0.65s ease,transform 0.65s ease }
  .reveal.visible { opacity:1;transform:translateY(0) }
  #custom-cursor-dot { width:5px;height:5px;background:var(--primary);border-radius:50%;position:fixed;pointer-events:none;z-index:10000;transform:translate(-50%,-50%) }
  #custom-cursor-ring { width:28px;height:28px;border:1.5px solid rgba(${pr},${pg},${pb},0.45);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width 0.2s,height 0.2s }
  @media(max-width:768px){.hero-ab{display:none}.svc-badge,.svc-eyebrow{display:none!important}.svc-hero-stats>div{flex:1!important;padding-left:0!important;margin-left:0!important;text-align:center!important;border-left:none!important}.svc-hero-stats>div+div{border-left:1px solid rgba(255,255,255,0.08)!important}.svc-hero-stats>div:nth-child(n+4){display:none!important}}
</style>
<div id="custom-cursor-dot"></div>
<div id="custom-cursor-ring"></div>

${buildStandardNav(businessName, content, navFlags)}

  <!-- Hero -->
  <section style="position:relative;min-height:calc(92vh - 64px);display:flex;align-items:center;overflow:hidden;background:${theme === 'dark' ? 'var(--bg)' : '#0a0a0a'}">
    <div style="position:absolute;inset:0">
      <img src="${images[0] || stockImages.hero}" alt="" style="width:100%;height:100%;object-fit:cover;opacity:${theme === 'dark' ? '0.25' : '0.35'}" />
      <div style="position:absolute;inset:0;background:linear-gradient(120deg,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.7) 50%,rgba(0,0,0,0.85) 100%)"></div>
    </div>
    <!-- Left accent bar -->
    <div class="hero-ab" style="position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--primary)"></div>
    <div style="position:relative;max-width:1200px;margin:0 auto;padding:7rem 2rem 5rem;width:100%">
      ${content.badge ? `<div class="svc-fade-1 svc-badge" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.15em;padding:0.4rem 1rem;border-radius:2px;background:rgba(${pr},${pg},${pb},0.12);border:1px solid rgba(${pr},${pg},${pb},0.3);color:rgba(255,255,255,0.85);margin-bottom:2rem;text-transform:uppercase;font-weight:600">${content.badge}</div>` : ''}
      <p class="svc-fade-1 svc-eyebrow" style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--primary-on-dark);margin-bottom:1.5rem;font-weight:700">${content.heroEyebrow}</p>
      <h1 class="svc-fade-2" style="font-family:var(--heading-font);font-size:clamp(3rem,6.5vw,5.5rem);font-weight:400;color:#f5f5f0;line-height:1.02;margin:0 0 1.75rem;max-width:750px">${content.tagline}</h1>
      <p class="svc-fade-3" style="font-family:var(--body-font);font-size:1.05rem;color:rgba(245,245,240,0.65);max-width:500px;line-height:1.82;margin:0 0 ${content.heroAccent ? '1.25rem' : '2.75rem'}">${content.heroSubtitle}</p>
      ${content.heroAccent ? `<p class="svc-fade-3" style="font-family:var(--body-font);font-size:1.05rem;color:var(--primary-on-dark);font-weight:600;margin:0 0 2.75rem">${content.heroAccent}</p>` : ''}
      <div class="svc-fade-4" style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;margin-bottom:${content.ctaNote ? '0.75rem' : '0'}">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.88rem;font-weight:700;padding:1rem 2.75rem;background:var(--primary-on-dark);color:#fff;border-radius:2px;text-decoration:none;letter-spacing:0.05em;text-transform:uppercase;transition:opacity 0.2s">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:var(--body-font);font-size:0.88rem;font-weight:500;padding:1rem 2.25rem;background:transparent;color:#f5f5f0;border:1px solid rgba(255,255,255,0.25);border-radius:2px;text-decoration:none;transition:all 0.2s">${content.ctaSecondary}</a>
      </div>
      ${content.ctaNote ? `<p class="svc-fade-5 ms-cta-note" style="font-family:var(--body-font);font-size:0.78rem;color:rgba(255,255,255,0.38);margin-bottom:0">${content.ctaNote}</p>` : ''}
      <!-- Stats strip -->
      <div class="svc-hero-stats" style="display:flex;gap:0;margin-top:4rem;border-top:1px solid rgba(255,255,255,0.1);padding-top:2.5rem">
        ${content.stats.slice(0, 4).map((s, i) => `
        <div style="flex:1;${i > 0 ? 'padding-left:2.5rem;border-left:1px solid rgba(255,255,255,0.08);margin-left:2.5rem' : ''}">
          <div style="font-family:var(--heading-font);font-size:2.25rem;font-weight:400;color:#f5f5f0;line-height:1">${s.value}</div>
          <div style="font-family:var(--body-font);font-size:0.78rem;color:rgba(245,245,240,0.5);margin-top:0.35rem;letter-spacing:0.04em">${s.label}</div>
          ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.7rem;color:rgba(245,245,240,0.28);margin-top:0.15rem">${s.sublabel}</div>` : ''}
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${servicesSection}
  ${processSection}
  ${buildAboutSection(content)}
  ${testimonialsSection}
  ${buildContactSection(content, locationInfo)}

${buildFooter(businessName, content, theme)}

<script>
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.1 });
  revealEls.forEach(el => obs.observe(el));
  setTimeout(function(){ document.querySelectorAll('.reveal,.tr-reveal').forEach(function(el){ el.classList.add('visible'); }); }, 600);
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');
  let rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; });
  requestAnimationFrame(function loop() { rx += (parseFloat(dot.style.left||0) - rx) * 0.1; ry += (parseFloat(dot.style.top||0) - ry) * 0.1; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(loop); });
</script>
</body>
</html>`
}

// ---------- Portfolio Template (gallery-focused) ----------

function buildPortfolioTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = stockImages.about || stockPool[5]

  const pr = parseInt(primaryColor.slice(1, 3), 16)
  const pg = parseInt(primaryColor.slice(3, 5), 16)
  const pb = parseInt(primaryColor.slice(5, 7), 16)

  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
    images[4] || stockImages.cards[3],
  ]

  const captions = content.projectCaptions || ['Featured Project', 'Recent Work', 'Client Project', 'Latest Design', 'Creative Direction']
  const fallbackTestimonials = getFallbackTestimonials(content, businessCategory)

  const servicesSection = `
    <style>
      .pf2-acc-body { overflow:hidden;max-height:0;transition:max-height 0.4s cubic-bezier(0.4,0,0.2,1),opacity 0.3s ease;opacity:0 }
      .pf2-acc-body.pf2-open { max-height:320px;opacity:1 }
      .pf2-acc-icon { display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;border:1.5px solid var(--border);transition:transform 0.35s ease,background 0.3s,border-color 0.3s;flex-shrink:0;font-size:1.1rem;color:var(--text-muted);font-weight:300 }
      .pf2-acc-icon.pf2-open { transform:rotate(45deg);background:var(--primary);border-color:var(--primary);color:#fff }
      .pf2-svc-row { border-top:1px solid var(--border) }
      .pf2-svc-row:last-child { border-bottom:1px solid var(--border) }
      .pf2-svc-trigger { cursor:pointer;width:100%;background:none;border:none;padding:2rem 0;text-align:left;display:flex;align-items:center;justify-content:space-between;gap:1rem }
      .pf2-img-stage { position:relative;overflow:hidden;border-radius:2px }
      .pf2-img-stage img { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity 0.5s ease,transform 0.7s ease }
      .pf2-img-stage img.pf2-active { opacity:1;transform:scale(1) }
      .pf2-img-stage img.pf2-inactive { opacity:0;transform:scale(1.03) }
      @media(max-width:768px){.pf2-slideshow{display:none!important}}
    </style>
    <section id="services" style="padding:120px 0;background:var(--bg-alt)">
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
        <div style="display:flex;align-items:center;gap:1.5rem;margin-bottom:1.5rem">
          <div style="width:1px;height:48px;background:var(--primary)"></div>
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3.2rem);font-weight:400;color:var(--text);line-height:1.12;margin:0">${content.servicesHeading}</h2>
        </div>
        <div class="ms-grid" style="display:grid;grid-template-columns:48% 52%;gap:4rem;align-items:start;margin-top:3.5rem">
          <!-- Left: sticky image stage -->
          <div class="ms-sticky pf2-slideshow" style="position:sticky;top:3rem">
            <div class="pf2-img-stage" style="height:580px">
              ${serviceImgs.map((img, i) => `<img id="pf2-img-${i}" src="${img}" alt="" class="${i === 0 ? 'pf2-active' : 'pf2-inactive'}" />`).join('')}
            </div>
            <div style="display:flex;gap:0.5rem;margin-top:1rem">
              ${serviceImgs.slice(0, Math.min(serviceImgs.length, content.services.length)).map((_, i) => `<div id="pf2-dot-${i}" style="width:${i === 0 ? '24px' : '8px'};height:8px;border-radius:4px;background:${i === 0 ? 'var(--primary)' : 'var(--border)'};transition:width 0.3s,background 0.3s;cursor:pointer" onclick="(function(){document.querySelectorAll('[id^=pf2-img]').forEach(function(el,j){el.className=j===${i}?'pf2-active':'pf2-inactive'});document.querySelectorAll('[id^=pf2-dot]').forEach(function(el,j){el.style.width=j===${i}?'24px':'8px';el.style.background=j===${i}?'var(--primary)':'var(--border)'})})()"></div>`).join('')}
            </div>
          </div>
          <!-- Right: accordion -->
          <div>
            ${content.services.map((s, i) => `
              <div class="pf2-svc-row">
                <button class="pf2-svc-trigger" onclick="(function(){var bodies=document.querySelectorAll('.pf2-acc-body');var icons=document.querySelectorAll('.pf2-acc-icon');var imgs=document.querySelectorAll('[id^=pf2-img]');var dots=document.querySelectorAll('[id^=pf2-dot]');bodies.forEach(function(el,j){if(j===${i}){el.classList.toggle('pf2-open');icons[j].classList.toggle('pf2-open')}else{el.classList.remove('pf2-open');icons[j].classList.remove('pf2-open')}});imgs.forEach(function(el,j){el.className=j===${i}?'pf2-active':'pf2-inactive'});dots.forEach(function(el,j){el.style.width=j===${i}?'24px':'8px';el.style.background=j===${i}?'var(--primary)':'var(--border)'})})()">
                  <div>
                    <div style="font-family:var(--body-font);font-size:0.68rem;letter-spacing:0.22em;color:var(--primary);font-weight:700;text-transform:uppercase;margin-bottom:0.6rem">0${i + 1}</div>
                    <h3 style="font-family:var(--heading-font);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:400;color:var(--text);margin:0;line-height:1.15">${s.name}</h3>
                  </div>
                  <span class="pf2-acc-icon${i === 0 ? ' pf2-open' : ''}">+</span>
                </button>
                <div class="pf2-acc-body${i === 0 ? ' pf2-open' : ''}" style="padding:0 0 2rem">
                  <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.82;margin:0 0 1.25rem">${s.description}</p>
                  <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
                    ${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.72rem;padding:0.3rem 0.85rem;border-radius:1px;background:rgba(${pr},${pg},${pb},0.08);color:var(--primary);font-weight:600;letter-spacing:0.04em">${t}</span>`).join('')}
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>`

  const gallerySection = `
    <style>
      .pf2-cell { position:relative;overflow:hidden;cursor:pointer }
      .pf2-cell img { width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94) }
      .pf2-cell:hover img { transform:scale(1.05) }
      .pf2-cap { position:absolute;inset:0;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:1.75rem;background:linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.2) 50%,transparent 100%);opacity:0;transition:opacity 0.4s ease }
      .pf2-cell:hover .pf2-cap { opacity:1 }
      .pf2-cap-title { font-family:var(--heading-font);font-size:1.1rem;font-weight:400;color:#fff;margin:0 0 0.35rem;transform:translateY(8px);transition:transform 0.4s ease }
      .pf2-cell:hover .pf2-cap-title { transform:translateY(0) }
      .pf2-cap-sub { font-family:var(--body-font);font-size:0.72rem;color:rgba(255,255,255,0.65);letter-spacing:0.1em;text-transform:uppercase;font-weight:500;transform:translateY(8px);transition:transform 0.4s ease 0.05s }
      .pf2-cell:hover .pf2-cap-sub { transform:translateY(0) }
    </style>
    <section id="gallery" style="padding:0;background:var(--bg)">
      <div style="max-width:1200px;margin:0 auto;padding:80px 2rem 40px">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3rem">
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);line-height:1.15;margin:0;max-width:480px">${content.galleryHeading}</h2>
          <p style="font-family:var(--body-font);font-size:0.78rem;color:var(--text-muted);letter-spacing:0.08em;text-transform:uppercase;margin:0">${businessName} &mdash; Selected Works</p>
        </div>
      </div>
      <!-- Asymmetric gallery grid -->
      <div style="max-width:1400px;margin:0 auto">
        <div class="ms-grid" style="display:grid;grid-template-columns:1.8fr 1fr 1fr;grid-template-rows:380px 280px;gap:3px">
          <div class="pf2-cell" style="grid-row:1/3">
            <img src="${stockPool[8]}" alt="${captions[0] || 'Featured Project'}" />
            <div class="pf2-cap">
              <div class="pf2-cap-title">${captions[0] || 'Featured Project'}</div>
              <div class="pf2-cap-sub">${businessName}</div>
            </div>
          </div>
          <div class="pf2-cell">
            <img src="${stockPool[9]}" alt="${captions[1] || 'Project'}" />
            <div class="pf2-cap">
              <div class="pf2-cap-title">${captions[1] || 'Project'}</div>
              <div class="pf2-cap-sub">${content.heroEyebrow}</div>
            </div>
          </div>
          <div class="pf2-cell">
            <img src="${stockPool[10]}" alt="${captions[2] || 'Project'}" />
            <div class="pf2-cap">
              <div class="pf2-cap-title">${captions[2] || 'Project'}</div>
              <div class="pf2-cap-sub">${content.heroEyebrow}</div>
            </div>
          </div>
          <div class="pf2-cell">
            <img src="${stockPool[11]}" alt="${captions[3] || 'Project'}" />
            <div class="pf2-cap">
              <div class="pf2-cap-title">${captions[3] || 'Project'}</div>
              <div class="pf2-cap-sub">${businessName}</div>
            </div>
          </div>
          <div class="pf2-cell">
            <img src="${stockPool[12]}" alt="${captions[4] || 'Project'}" />
            <div class="pf2-cap">
              <div class="pf2-cap-title">${captions[4] || 'Project'}</div>
              <div class="pf2-cap-sub">${businessName}</div>
            </div>
          </div>
        </div>
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr 1fr;height:220px;gap:3px;margin-top:3px">
          ${[stockPool[13], stockPool[14], stockPool[15]].map((img, i) => `
          <div class="pf2-cell">
            <img src="${img}" alt="${captions[i] || 'Work'}" />
            <div class="pf2-cap">
              <div class="pf2-cap-title">${captions[i] || 'Work'}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
      <div style="padding:40px 2rem 80px;text-align:center">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.82rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--primary);text-decoration:none;border-bottom:1px solid var(--primary);padding-bottom:0.25rem">Work With Us &rarr;</a>
      </div>
    </section>`

  const testimonialsSection = `
    <section style="padding:100px 0;background:var(--bg-alt)">
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
        ${content.testimonial ? `
        <div style="max-width:820px;margin:0 auto;text-align:center">
          <div style="font-family:var(--heading-font);font-size:6rem;line-height:0.7;color:var(--primary);opacity:0.2;margin-bottom:2rem">&ldquo;</div>
          <p style="font-family:var(--heading-font);font-size:clamp(1.25rem,2.5vw,1.7rem);font-weight:400;font-style:italic;color:var(--text);line-height:1.6;margin:0 0 2.5rem">"${content.testimonial.quote}"</p>
          <div style="display:flex;align-items:center;justify-content:center;gap:1.5rem">
            <div style="width:48px;height:1px;background:var(--border)"></div>
            <p style="font-family:var(--body-font);font-size:0.78rem;color:var(--text-muted);letter-spacing:0.12em;text-transform:uppercase;font-weight:500;margin:0">${content.testimonial.author}</p>
            <div style="width:48px;height:1px;background:var(--border)"></div>
          </div>
          ${content.testimonial.rating ? `<div style="color:var(--primary);font-size:0.9rem;letter-spacing:0.15em;margin-top:1.25rem">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
        </div>
        <div style="width:1px;height:60px;background:var(--border);margin:4rem auto"></div>` : ''}
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:2rem">
          ${fallbackTestimonials.slice(0, 2).map(t => `
          <div style="padding:2.5rem;border:1px solid var(--border);border-radius:2px;background:var(--card-bg);position:relative">
            <div style="color:var(--primary);font-size:0.85rem;letter-spacing:0.15em;margin-bottom:1.5rem">${'&#9733;'.repeat(t.rating)}</div>
            <p style="font-family:var(--heading-font);font-size:1rem;color:var(--text);line-height:1.75;font-style:italic;margin:0 0 2rem">"${t.quote}"</p>
            <div style="font-family:var(--body-font);font-size:0.75rem;color:var(--text-muted);letter-spacing:0.1em;text-transform:uppercase;font-weight:600">${t.author}</div>
          </div>`).join('')}
        </div>
      </div>
    </section>`

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor)

  return `${headHtml}
<style>
  @keyframes pf2-kenburns { 0% { transform:scale(1.06) translate(0.5%,0) } 100% { transform:scale(1) translate(0,0) } }
  @keyframes pf2-fadeup { from { opacity:0;transform:translateY(30px) } to { opacity:1;transform:translateY(0) } }
  @keyframes pf2-fadein { from { opacity:0 } to { opacity:1 } }
  .pf2-hero-bg { animation:pf2-kenburns 20s ease-out forwards }
  .pf2-f1 { animation:pf2-fadeup 1s ease 0.2s both }
  .pf2-f2 { animation:pf2-fadeup 1s ease 0.45s both }
  .pf2-f3 { animation:pf2-fadeup 1s ease 0.65s both }
  .pf2-f4 { animation:pf2-fadeup 1s ease 0.85s both }
  .pf2-f5 { animation:pf2-fadeup 1s ease 1.0s both }
  body::before { content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");opacity:0.45 }
  .reveal { opacity:0;transform:translateY(22px);transition:opacity 0.75s ease,transform 0.75s ease }
  .reveal.visible { opacity:1;transform:translateY(0) }
  #custom-cursor-dot { width:5px;height:5px;background:var(--primary);border-radius:50%;position:fixed;pointer-events:none;z-index:10000;transform:translate(-50%,-50%) }
  #custom-cursor-ring { width:34px;height:34px;border:1px solid rgba(${pr},${pg},${pb},0.4);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%) }
</style>
<div id="custom-cursor-dot"></div>
<div id="custom-cursor-ring"></div>

${buildStandardNav(businessName, content, navFlags)}

  <!-- Hero — editorial, center-aligned, Ken Burns -->
  <section style="position:relative;min-height:calc(100vh - 64px);display:flex;align-items:center;justify-content:center;overflow:hidden;text-align:center">
    <div style="position:absolute;inset:0;overflow:hidden">
      <img src="${heroImg}" alt="" class="pf2-hero-bg" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.72) 50%,rgba(0,0,0,0.88) 100%)"></div>
    </div>
    <!-- Decorative corner marks -->
    <div style="position:absolute;top:6rem;left:2rem;width:30px;height:30px;border-top:1.5px solid rgba(255,255,255,0.25);border-left:1.5px solid rgba(255,255,255,0.25)"></div>
    <div style="position:absolute;top:6rem;right:2rem;width:30px;height:30px;border-top:1.5px solid rgba(255,255,255,0.25);border-right:1.5px solid rgba(255,255,255,0.25)"></div>
    <div style="position:absolute;bottom:8rem;left:2rem;width:30px;height:30px;border-bottom:1.5px solid rgba(255,255,255,0.25);border-left:1.5px solid rgba(255,255,255,0.25)"></div>
    <div style="position:absolute;bottom:8rem;right:2rem;width:30px;height:30px;border-bottom:1.5px solid rgba(255,255,255,0.25);border-right:1.5px solid rgba(255,255,255,0.25)"></div>
    <div style="position:relative;max-width:860px;margin:0 auto;padding:8rem 2rem 6rem">
      ${content.badge ? `<div class="pf2-f1" style="display:inline-block;font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.15em;padding:0.45rem 1.25rem;border-radius:999px;background:rgba(${pr},${pg},${pb},0.15);border:1px solid rgba(${pr},${pg},${pb},0.35);color:rgba(255,255,255,0.85);margin-bottom:2.25rem;text-transform:uppercase;font-weight:600">${content.badge}</div>` : ''}
      <div class="pf2-f1" style="display:flex;align-items:center;justify-content:center;gap:1.25rem;margin-bottom:2rem">
        <div style="width:40px;height:1px;background:rgba(${pr},${pg},${pb},0.7)"></div>
        <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--primary);font-weight:600;margin:0">${content.heroEyebrow}</p>
        <div style="width:40px;height:1px;background:rgba(${pr},${pg},${pb},0.7)"></div>
      </div>
      <h1 class="pf2-f2" style="font-family:var(--heading-font);font-size:clamp(3.5rem,8vw,6.5rem);font-weight:400;color:#f5f5f0;line-height:1.0;margin:0 0 2rem;letter-spacing:-0.01em">${content.tagline}</h1>
      <p class="pf2-f3" style="font-family:var(--body-font);font-size:1.05rem;color:rgba(245,245,240,0.65);max-width:480px;margin:0 auto ${content.heroAccent ? '1.25rem' : '2.75rem'};line-height:1.82">${content.heroSubtitle}</p>
      ${content.heroAccent ? `<p class="pf2-f3" style="font-family:var(--body-font);font-size:1.05rem;color:var(--primary);font-weight:600;margin:0 auto 2.75rem;max-width:480px">${content.heroAccent}</p>` : ''}
      <div class="pf2-f4" style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        <a href="#gallery" style="font-family:var(--body-font);font-size:0.88rem;font-weight:600;padding:1.1rem 2.75rem;background:var(--primary);color:#fff;border-radius:2px;text-decoration:none;letter-spacing:0.05em;transition:opacity 0.2s">${content.ctaPrimary}</a>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.88rem;font-weight:500;padding:1.1rem 2.25rem;background:transparent;color:#f5f5f0;border:1px solid rgba(255,255,255,0.28);border-radius:2px;text-decoration:none;transition:all 0.2s">${content.ctaSecondary}</a>
      </div>
      ${content.ctaNote ? `<p class="pf2-f5 ms-cta-note" style="font-family:var(--body-font);font-size:0.78rem;color:rgba(255,255,255,0.38);margin-top:1.5rem">${content.ctaNote}</p>` : ''}
    </div>
    <!-- Bottom scroll indicator -->
    <div style="position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:0.5rem">
      <div style="font-family:var(--body-font);font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.35);font-weight:500">Scroll</div>
      <div style="width:1px;height:32px;background:linear-gradient(to bottom,rgba(255,255,255,0.35),transparent)"></div>
    </div>
  </section>

  ${servicesSection}
  ${gallerySection}

  <!-- About -->
  <section id="about" style="padding:120px 0;background:var(--bg)">
    <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
      <div class="ms-grid" style="display:grid;grid-template-columns:1.1fr 1fr;gap:5rem;align-items:center">
        <div class="reveal">
          <div style="display:flex;align-items:center;gap:1.5rem;margin-bottom:1.5rem">
            <div style="width:1px;height:48px;background:var(--primary)"></div>
            <p style="font-family:var(--body-font);font-size:0.72rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--primary);font-weight:700;margin:0">About the Studio</p>
          </div>
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,2.8rem);font-weight:400;color:var(--text);line-height:1.2;margin:0 0 1.75rem">${content.aboutHeading}</h2>
          ${content.aboutMission ? `<p style="font-family:var(--heading-font);font-size:1.05rem;color:var(--text);line-height:1.65;font-style:italic;margin:0 0 1.75rem;padding-left:1.5rem;border-left:2px solid var(--primary)">${content.aboutMission}</p>` : ''}
          ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:var(--body-font);font-size:0.92rem;color:var(--text-muted);line-height:1.9;margin:0 0 1rem">${p}</p>`).join('')}
          <div class="ms-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:2rem;margin-top:2.5rem;padding-top:2rem;border-top:1px solid var(--border)">
            ${content.stats.slice(0, 4).map(s => `
            <div>
              <div style="font-family:var(--heading-font);font-size:2rem;font-weight:400;color:var(--text);line-height:1">${s.value}</div>
              <div style="font-family:var(--body-font);font-size:0.78rem;color:var(--text-muted);margin-top:0.3rem;letter-spacing:0.04em">${s.label}</div>
              ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.7rem;color:var(--text-muted);opacity:0.55;margin-top:0.12rem">${s.sublabel}</div>` : ''}
            </div>`).join('')}
          </div>
        </div>
        <div class="reveal" style="position:relative">
          <div class="ms-img" style="overflow:hidden;border-radius:2px;height:580px">
            <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="position:absolute;top:-1.5rem;right:-1.5rem;width:100px;height:100px;border:1.5px solid var(--primary);border-radius:1px;z-index:-1;opacity:0.5"></div>
          <div style="position:absolute;bottom:-1.5rem;left:-1.5rem;width:100px;height:100px;border:1.5px solid rgba(${pr},${pg},${pb},0.25);border-radius:1px;z-index:-1"></div>
        </div>
      </div>
    </div>
  </section>

  ${testimonialsSection}
  ${buildContactSection(content, locationInfo)}

${buildFooter(businessName, content)}

<script>
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.1 });
  revealEls.forEach(el => obs.observe(el));
  setTimeout(function(){ document.querySelectorAll('.reveal,.tr-reveal').forEach(function(el){ el.classList.add('visible'); }); }, 600);
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');
  let rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; });
  requestAnimationFrame(function loop() { rx += (parseFloat(dot.style.left||0) - rx) * 0.08; ry += (parseFloat(dot.style.top||0) - ry) * 0.08; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(loop); });
</script>
</body>
</html>`
}

function buildFoodHospitalityTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about

  // Candlelit dining palette — deep parchment, ink, warm gold
  const bg = '#f9f5ef'
  const bgAlt = '#f2ece2'
  const inkDark = '#1c1408'
  const inkMid = '#3d3120'
  const muted = '#7a6a54'
  const gold = '#b8862a'
  const goldLight = '#d4a84b'
  const cream = '#fdf8f0'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')

  const navLinks = navFlags.allLinks

  // Custom candlelit nav — transparent over hero, dark text
  const customNav = `
  <nav id="food-nav" style="position:fixed;top:0;left:0;right:0;z-index:100;padding:1.5rem 3rem;display:flex;align-items:center;justify-content:space-between;transition:all 0.5s ease;background:transparent">
    <a href="#" style="font-family:var(--heading-font);font-size:1.2rem;font-weight:600;color:#fff;text-decoration:none;letter-spacing:0.12em;text-transform:uppercase">${businessName}</a>
    <div style="display:flex;align-items:center;gap:2.5rem">
      ${navLinks.map(l => `<a href="${l.href}" style="font-family:var(--body-font);font-size:0.78rem;font-weight:500;color:rgba(255,255,255,0.85);text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;transition:color 0.3s">${l.label}</a>`).join('')}
      <a class="food-nav-cta" href="#contact" style="font-family:var(--body-font);font-size:0.78rem;font-weight:600;padding:0.6rem 1.75rem;border:1.5px solid rgba(255,255,255,0.7);color:#fff;text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;transition:all 0.3s">${content.ctaPrimary}</a>
      <label for="ms-menu-toggle" style="display:none;cursor:pointer;color:#fff;font-size:1.5rem">&#9776;</label>
    </div>
  </nav>
  <style>
    #food-nav.scrolled { background:${cream} !important; box-shadow:0 1px 20px rgba(0,0,0,0.08); }
    #food-nav.scrolled a { color:${inkDark} !important; }
    #food-nav.scrolled a.food-nav-cta { border-color:${inkDark} !important; }
    @media(max-width:768px){ #food-nav { padding:1rem 1.25rem; background:${inkDark} !important; box-shadow:none !important; } #food-nav > div > a:not(.food-nav-cta) { display:none!important; } #food-nav label { display:block!important; } .food-nav-cta { display:none!important; } }
  </style>
  <script>
    window.addEventListener('scroll',function(){
      var n=document.getElementById('food-nav');
      if(window.scrollY>80){n.classList.add('scrolled');}else{n.classList.remove('scrolled');}
    });
  </script>
  ${buildMobileMenu(content, navLinks)}`

  // HERO — full-bleed cinematic, Ken Burns bg, massive serif headline centered
  const heroSection = `
  <style>@media(max-width:768px){.food-hero{min-height:100svh!important;padding:0!important}.food-hero>div{padding:0!important}}</style>
  <section class="food-hero" style="position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden">
    <div style="position:absolute;inset:0;animation:kenburns 18s ease-in-out infinite alternate">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;transform-origin:center" />
    </div>
    <div style="position:absolute;inset:0;background:linear-gradient(160deg,rgba(20,12,4,0.55) 0%,rgba(10,6,2,0.72) 60%,rgba(28,20,8,0.85) 100%)"></div>
    <div style="position:relative;z-index:2;text-align:center;padding:0 2rem;max-width:900px">
      <div style="display:flex;align-items:center;justify-content:center;gap:1.25rem;margin-bottom:2rem">
        <span style="display:block;width:50px;height:1px;background:${goldLight};opacity:0.8"></span>
        <span style="font-family:var(--body-font);font-size:0.7rem;font-weight:500;color:${goldLight};letter-spacing:0.25em;text-transform:uppercase">${content.heroEyebrow}</span>
        <span style="display:block;width:50px;height:1px;background:${goldLight};opacity:0.8"></span>
      </div>
      <h1 style="font-family:var(--heading-font);font-size:clamp(3.5rem,8vw,7rem);font-weight:400;color:#fff;line-height:1.0;margin-bottom:1.5rem;letter-spacing:-0.01em">${content.tagline}</h1>
      <p style="font-family:var(--body-font);font-size:1.05rem;color:rgba(255,255,255,0.75);max-width:520px;margin:0 auto 2.5rem;line-height:1.7;font-weight:300">${content.heroSubtitle}</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:1.25rem;flex-wrap:wrap">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.78rem;font-weight:600;padding:1rem 2.5rem;background:${gold};color:#fff;text-decoration:none;letter-spacing:0.14em;text-transform:uppercase;transition:all 0.3s">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:var(--body-font);font-size:0.78rem;font-weight:500;padding:1rem 2.5rem;border:1px solid rgba(255,255,255,0.5);color:rgba(255,255,255,0.9);text-decoration:none;letter-spacing:0.14em;text-transform:uppercase;transition:all 0.3s">${content.ctaSecondary || 'View Menu'}</a>
      </div>
    </div>
    <div style="position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:0.5rem;animation:scrollpulse 2.5s ease-in-out infinite">
      <span style="font-family:var(--body-font);font-size:0.65rem;color:rgba(255,255,255,0.5);letter-spacing:0.18em;text-transform:uppercase">Scroll</span>
      <span style="color:rgba(255,255,255,0.5);font-size:1.2rem">&#8595;</span>
    </div>
  </section>
  <style>
    @keyframes kenburns { 0%{transform:scale(1.0) translateX(0)} 100%{transform:scale(1.08) translateX(-2%)} }
    @keyframes scrollpulse { 0%,100%{opacity:0.4;transform:translateX(-50%) translateY(0)} 50%{opacity:1;transform:translateX(-50%) translateY(6px)} }
  </style>`

  // ACCOLADES STRIP — gold stars + key stats
  const accoladesStrip = `
  <section style="padding:2rem 3rem;background:${inkDark};display:flex;align-items:center;justify-content:center;gap:4rem;flex-wrap:wrap;text-align:center">
    ${content.stats.slice(0, 3).map(s => `
    <div class="food-stat" style="text-align:center;flex:0 0 auto">
      <div style="font-family:var(--heading-font);font-size:1.7rem;font-weight:600;color:${goldLight};margin-bottom:0.2rem">${s.value}</div>
      <div style="font-family:var(--body-font);font-size:0.7rem;color:rgba(255,255,255,0.55);letter-spacing:0.12em;text-transform:uppercase">${s.label}</div>
    </div>`).join(`<span class="food-sep" style="display:block;width:1px;height:40px;background:rgba(255,255,255,0.1)"></span>`)}
  </section>
  <style>@media(max-width:640px){ .food-sep { display:none !important; } .food-stat { flex:1 1 100% !important; text-align:center !important; padding:0.5rem 0 !important; } }</style>`

  // ABOUT — editorial 2-col: tall moody photo left, story right with gold ornament
  const aboutSection = `
  <section id="about" style="padding:120px 0;background:${bg}">
    <div class="ms-grid" style="max-width:1180px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1.1fr;gap:6rem;align-items:center">
      <div style="position:relative">
        <div style="aspect-ratio:3/4;border-radius:0;overflow:hidden">
          <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div style="position:absolute;bottom:-2rem;right:-2rem;width:160px;height:160px;border:2px solid ${gold};opacity:0.4"></div>
        <div style="position:absolute;top:-1.5rem;left:-1.5rem;width:120px;height:120px;border:1px solid ${gold};opacity:0.25"></div>
      </div>
      <div>
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
          <span style="font-family:var(--body-font);font-size:0.7rem;font-weight:600;color:${gold};letter-spacing:0.2em;text-transform:uppercase">${content.badge || content.heroEyebrow}</span>
          <span style="flex:1;height:1px;background:${gold};opacity:0.3"></span>
        </div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2.2rem,4vw,3.5rem);font-weight:400;color:${inkDark};line-height:1.15;margin-bottom:1.5rem">${content.aboutHeading}</h2>
        ${content.aboutMission ? `<p style="font-family:var(--body-font);font-size:1.05rem;color:${inkMid};line-height:1.75;font-style:italic;margin-bottom:1.5rem;padding-left:1.25rem;border-left:3px solid ${gold}">${content.aboutMission}</p>` : ''}
        ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:${muted};line-height:1.85;margin-bottom:1rem">${p}</p>`).join('')}
      </div>
    </div>
  </section>
  <style>@media(max-width:768px){ #about { padding:60px 0 40px !important; } }</style>`

  // MENU SECTION — ornate heading, stacked menu rows with thumbnail
  const menuSection = `
  <section id="services" style="padding:120px 0;background:${bgAlt}">
    <div style="max-width:1000px;margin:0 auto;padding:0 3rem">
      <div style="text-align:center;margin-bottom:4rem">
        <div style="font-size:1.5rem;color:${gold};margin-bottom:0.75rem">&#10022;</div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5vw,4rem);font-weight:400;color:${inkDark};margin-bottom:0.5rem">${content.servicesHeading}</h2>
        <div style="font-size:1.5rem;color:${gold};margin-top:0.75rem">&#10022;</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:0">
        ${content.services.map((s, i) => `
        <div style="display:flex;align-items:center;gap:2rem;padding:2rem 0;border-bottom:1px solid rgba(28,20,8,0.08);transition:background 0.3s">
          <div style="width:80px;height:80px;border-radius:50%;overflow:hidden;flex-shrink:0">
            <img src="${stockPool[i] || stockImages.cards[i]}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <div style="flex:1">
            <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:0.35rem">
              <h3 style="font-family:var(--heading-font);font-size:1.15rem;font-weight:600;color:${inkDark}">${s.name}</h3>
              <span style="font-family:var(--heading-font);font-size:1rem;color:${gold};flex-shrink:0;margin-left:1rem">&#9135;&#9135;&#9135;</span>
            </div>
            <p style="font-family:var(--body-font);font-size:0.88rem;color:${muted};line-height:1.6">${s.description}</p>
            <div style="display:flex;gap:0.5rem;margin-top:0.5rem;flex-wrap:wrap">
              ${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.68rem;color:${gold};letter-spacing:0.1em;text-transform:uppercase">${t}</span>`).join('<span style="color:rgba(28,20,8,0.2)"> · </span>')}
            </div>
          </div>
        </div>`).join('')}
      </div>
      <div style="text-align:center;margin-top:3rem">
        <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:0.78rem;font-weight:600;padding:0.9rem 2.5rem;border:1.5px solid ${inkDark};color:${inkDark};text-decoration:none;letter-spacing:0.14em;text-transform:uppercase;transition:all 0.3s">${content.ctaPrimary}</a>
      </div>
    </div>
  </section>`

  // GALLERY — unified mosaic grid: big image spans 2 rows left, 4 images fill right
  const gallerySection = `
  <section id="gallery" style="padding:0 0 80px;background:${bg}">
    <div style="max-width:1400px;margin:0 auto">
      <div class="food-gal-top" style="display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:3px">
        <div style="grid-row:1/3;overflow:hidden;height:603px">
          <img src="${stockPool[6]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
        </div>
        <div style="overflow:hidden;height:300px">
          <img src="${stockPool[7]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
        </div>
        <div style="overflow:hidden;height:300px">
          <img src="${stockPool[8]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
        </div>
        <div style="overflow:hidden;height:300px">
          <img src="${stockPool[9]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
        </div>
        <div style="overflow:hidden;height:300px">
          <img src="${stockPool[10]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
        </div>
      </div>
    </div>
  </section>
  <style>
    @media(max-width:768px){
      .food-gal-top { grid-template-columns:1fr !important; }
      .food-gal-top > div { height:260px !important; }
      .food-gal-top > div:first-child { grid-row:auto !important; height:260px !important; }
      .food-gal-top > div:nth-child(n+4) { display:none !important; }
    }
  </style>`

  // TESTIMONIAL — dark candlelit bg, centered oversized quote
  const testimonialSection = content.testimonial ? `
  <section style="padding:120px 3rem;background:${inkDark};position:relative;overflow:hidden">
    <div style="position:absolute;top:-2rem;left:3rem;font-family:var(--heading-font);font-size:18rem;color:rgba(184,134,42,0.07);line-height:1;pointer-events:none;user-select:none">&#8220;</div>
    <div style="max-width:800px;margin:0 auto;text-align:center;position:relative;z-index:2">
      <div style="display:flex;justify-content:center;gap:0.2rem;margin-bottom:2rem">
        ${[1,2,3,4,5].map(() => `<span style="color:${goldLight};font-size:1rem">&#9733;</span>`).join('')}
      </div>
      <p style="font-family:var(--heading-font);font-size:clamp(1.3rem,2.5vw,2rem);font-weight:400;color:#fff;line-height:1.6;font-style:italic;margin-bottom:2rem">"${content.testimonial.quote}"</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:1.5rem">
        <span style="display:block;width:40px;height:1px;background:${gold};opacity:0.6"></span>
        <span style="font-family:var(--body-font);font-size:0.8rem;color:${goldLight};letter-spacing:0.15em;text-transform:uppercase">${content.testimonial.author}</span>
        <span style="display:block;width:40px;height:1px;background:${gold};opacity:0.6"></span>
      </div>
    </div>
  </section>` : ''

  // CONTACT — warm parchment, 2-col info + form
  const contactSection = buildContactSection(content, locationInfo)

  // FOOTER — ink dark, minimal
  const footerHtml = `
  <footer style="padding:3rem;background:${inkDark};display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem">
    <div style="font-family:var(--heading-font);font-size:1.3rem;font-weight:600;color:${goldLight};letter-spacing:0.14em;text-transform:uppercase">${businessName}</div>
    <div style="display:flex;gap:2rem;flex-wrap:wrap">
      ${navLinks.map(l => `<a href="${l.href}" style="font-family:var(--body-font);font-size:0.72rem;color:rgba(255,255,255,0.45);text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;transition:color 0.3s">${l.label}</a>`).join('')}
    </div>
    <p style="font-family:var(--body-font);font-size:0.72rem;color:rgba(255,255,255,0.3);letter-spacing:0.08em">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
  </footer>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${bg};
      --bg-alt: ${bgAlt};
      --card-bg: ${cream};
      --text: ${inkDark};
      --text-muted: ${muted};
      --border: rgba(28,20,8,0.07);
    }
    /* Film grain */
    body::before {
      content:'';
      position:fixed;inset:0;pointer-events:none;z-index:999;opacity:0.025;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size:160px 160px;
    }
    #contact { background:${bg} !important; }
    #contact h2, #contact p, #contact div { color:${inkDark} !important; }
    #contact .ms-grid input, #contact .ms-grid textarea { background:${cream} !important; border-color:rgba(28,20,8,0.12) !important; color:${inkDark} !important; }
    #contact .ms-grid button { background:${inkDark} !important; }
  </style>

${customNav}

${heroSection}
${accoladesStrip}
${aboutSection}
${menuSection}
${gallerySection}
${testimonialSection}
${contactSection}
${footerHtml}

</body>
</html>`
}



function buildRetailTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about

  // Bold trend-forward palette — white canvas, electric accent, dark text
  const bg = '#ffffff'
  const bgCard = '#f5f5f5'
  const bgAlt = '#f0f0f0'
  const textPrimary = '#0d0d0d'
  const textMuted = '#555555'
  const accent = primaryColor
  const accentLight = secondaryColor
  const border = 'rgba(0,0,0,0.08)'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark')
  const navLinks = navFlags.allLinks

  // CUSTOM NAV — transparent over hero, slides to solid
  const customNav = `
  <nav id="retail-nav" style="position:fixed;top:0;left:0;right:0;z-index:100;padding:1.25rem 2.5rem;display:flex;align-items:center;justify-content:space-between;transition:all 0.4s ease;background:transparent">
    <a href="#" style="font-family:var(--heading-font);font-size:1.05rem;font-weight:700;color:${textPrimary};text-decoration:none;letter-spacing:0.06em;text-transform:uppercase">${businessName}</a>
    <div style="display:flex;align-items:center;gap:2rem">
      <div class="ms-nav-links" style="display:flex;align-items:center;gap:2rem">
        ${navLinks.map(l => `<a href="${l.href}" style="font-family:var(--body-font);font-size:0.78rem;font-weight:500;color:${textMuted};text-decoration:none;letter-spacing:0.06em;transition:color 0.3s" onmouseover="this.style.color='${textPrimary}'" onmouseout="this.style.color='${textMuted}'">${l.label}</a>`).join('')}
      </div>
      <a href="#contact" class="ret-nav-cta" style="font-family:var(--body-font);font-size:0.78rem;font-weight:700;padding:0.65rem 1.75rem;background:${accent};color:#fff;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;border-radius:4px;transition:opacity 0.3s">${content.ctaPrimary}</a>
      <label for="ms-menu-toggle" class="ms-burger-inline" style="display:none;cursor:pointer;color:${textPrimary};font-size:1.5rem">&#9776;</label>
    </div>
  </nav>
  <style>
    #retail-nav.scrolled { background:${bg} !important; border-bottom:1px solid ${border}; box-shadow:0 2px 8px rgba(0,0,0,0.08); }
    @media(max-width:768px){ #retail-nav label { display:block!important; } .ret-nav-cta { display:none!important; } .ret-hero-inner { padding:clamp(4rem,10svh,8rem) 1.5rem clamp(3rem,8svh,4rem)!important; } }
  </style>
  <script>
    window.addEventListener('scroll',function(){
      var n=document.getElementById('retail-nav');
      if(window.scrollY>60){n.classList.add('scrolled');}else{n.classList.remove('scrolled');}
    });
  </script>
  ${buildMobileMenu(content, navLinks)}`

  // HERO — split layout: dark left with massive headline, right = full-bleed product photo
  const heroSection = `
  <section style="position:relative;min-height:100vh;display:grid;grid-template-columns:1fr 1fr;background:${bg}">
    <div class="ret-hero-inner" style="display:flex;flex-direction:column;justify-content:center;padding:8rem 4rem 4rem;position:relative;z-index:2">
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
        <span style="display:block;width:24px;height:2px;background:${accent}"></span>
        <span style="font-family:var(--body-font);font-size:0.7rem;font-weight:700;color:${accent};letter-spacing:0.2em;text-transform:uppercase">${content.heroEyebrow}</span>
      </div>
      <h1 style="font-family:var(--heading-font);font-size:clamp(3rem,5.5vw,5.5rem);font-weight:900;color:${textPrimary};line-height:0.95;margin-bottom:1.75rem;letter-spacing:-0.03em;text-transform:uppercase">${content.tagline}</h1>
      <p style="font-family:var(--body-font);font-size:1rem;color:${textMuted};max-width:420px;line-height:1.7;margin-bottom:2.5rem">${content.heroSubtitle}</p>
      <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
        <a href="#services" style="font-family:var(--body-font);font-size:0.8rem;font-weight:700;padding:1rem 2.5rem;background:${accent};color:#fff;text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;border-radius:4px;transition:transform 0.2s,opacity 0.2s">${content.ctaPrimary}</a>
        <a href="#gallery" style="font-family:var(--body-font);font-size:0.8rem;font-weight:500;color:${textMuted};text-decoration:none;letter-spacing:0.06em;display:flex;align-items:center;gap:0.5rem;transition:color 0.3s">${content.ctaSecondary || 'Explore Collection'} <span style="font-size:1rem">&#8594;</span></a>
      </div>
      <div style="display:flex;gap:3rem;margin-top:4rem;padding-top:2.5rem;border-top:1px solid ${border}">
        ${content.stats.slice(0, 3).map(s => `
        <div>
          <div style="font-family:var(--heading-font);font-size:1.6rem;font-weight:700;color:${textPrimary}">${s.value}</div>
          <div style="font-family:var(--body-font);font-size:0.7rem;color:${textMuted};letter-spacing:0.1em;text-transform:uppercase;margin-top:0.2rem">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
    <div style="position:relative;overflow:hidden">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 12s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
      <div style="position:absolute;inset:0;background:linear-gradient(90deg,${bg} 0%,transparent 30%)"></div>
      ${content.badge ? `<div style="position:absolute;top:2.5rem;right:2.5rem;padding:0.5rem 1.25rem;background:${accent};font-family:var(--body-font);font-size:0.72rem;font-weight:700;color:#fff;letter-spacing:0.12em;text-transform:uppercase;border-radius:4px">${content.badge}</div>` : ''}
    </div>
  </section>
  <style>@media(max-width:768px){section:first-of-type{grid-template-columns:1fr!important}section:first-of-type>div:last-child{display:none!important}}</style>`

  // PRODUCTS GRID — 4-col with hover reveal overlay
  const productsSection = `
  <section id="services" style="padding:100px 0;background:${bg}">
    <div style="max-width:1400px;margin:0 auto;padding:0 2.5rem">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3.5rem;flex-wrap:wrap;gap:1rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5vw,4rem);font-weight:900;color:${textPrimary};line-height:0.95;text-transform:uppercase;letter-spacing:-0.02em">${content.servicesHeading}</h2>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.78rem;font-weight:600;color:${textMuted};text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;display:flex;align-items:center;gap:0.5rem">View All <span>&#8594;</span></a>
      </div>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.5px;background:${border}">
        ${content.services.slice(0, 4).map((s, i) => `
        <div style="position:relative;background:${bgCard};overflow:hidden;group" onmouseover="this.querySelector('.overlay').style.opacity='1'" onmouseout="this.querySelector('.overlay').style.opacity='0'">
          <div style="height:360px;overflow:hidden">
            <img src="${stockPool[i]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.7s ease" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div class="overlay" style="position:absolute;inset:0;background:rgba(13,13,13,0.75);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;text-align:center;opacity:0;transition:opacity 0.4s ease">
            <p style="font-family:var(--body-font);font-size:0.88rem;color:rgba(255,255,255,0.85);line-height:1.6;margin-bottom:1.25rem">${s.description}</p>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center">
              ${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.68rem;padding:0.25rem 0.75rem;border:1px solid rgba(255,255,255,0.3);color:rgba(255,255,255,0.7);letter-spacing:0.08em;text-transform:uppercase;border-radius:2px">${t}</span>`).join('')}
            </div>
          </div>
          <div style="padding:1.25rem 1.5rem;background:${bgCard}">
            <h3 style="font-family:var(--heading-font);font-size:1rem;font-weight:700;color:${textPrimary};text-transform:uppercase;letter-spacing:0.04em">${s.name}</h3>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // MARQUEE BANNER — scrolling text
  const marqueeBanner = `
  <section style="padding:1.5rem 0;background:${accent};overflow:hidden;white-space:nowrap">
    <div style="display:inline-flex;animation:marquee 25s linear infinite;gap:3rem">
      ${[...Array(8)].map(() => `<span style="font-family:var(--heading-font);font-size:1.3rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:0.08em">${content.heroEyebrow} &nbsp;&#10022;&nbsp; ${businessName} &nbsp;&#10022;&nbsp; ${content.ctaPrimary}</span>`).join('')}
    </div>
  </section>
  <style>@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}</style>`

  // EDITORIAL SPLIT — full-height image + story right
  const editorialSplit = `
  <section id="about" style="display:grid;grid-template-columns:1fr 1fr;min-height:80vh;background:${bg}">
    <div style="overflow:hidden">
      <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 1.2s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
    </div>
    <div style="display:flex;flex-direction:column;justify-content:center;padding:5rem 4rem">
      <div style="font-family:var(--body-font);font-size:0.7rem;font-weight:700;color:${accent};letter-spacing:0.2em;text-transform:uppercase;margin-bottom:1.5rem">${content.badge || 'Our Story'}</div>
      <h2 style="font-family:var(--heading-font);font-size:clamp(2.5rem,4.5vw,4rem);font-weight:900;color:${textPrimary};line-height:0.95;margin-bottom:1.5rem;text-transform:uppercase;letter-spacing:-0.02em">${content.aboutHeading}</h2>
      ${content.aboutMission ? `<p style="font-family:var(--body-font);font-size:1.05rem;color:${textPrimary};font-weight:600;line-height:1.65;margin-bottom:1.25rem">${content.aboutMission}</p>` : ''}
      ${content.aboutText.split('\n').filter(p => p.trim()).slice(0,2).map(p => `<p style="font-family:var(--body-font);font-size:0.92rem;color:${textMuted};line-height:1.8;margin-bottom:0.9rem">${p}</p>`).join('')}
      <a href="#contact" style="display:inline-flex;align-items:center;gap:0.75rem;margin-top:2rem;font-family:var(--body-font);font-size:0.8rem;font-weight:700;color:${textPrimary};text-decoration:none;letter-spacing:0.1em;text-transform:uppercase">${content.ctaPrimary} <span style="display:block;width:36px;height:1px;background:${accent}"></span></a>
    </div>
  </section>
  <style>@media(max-width:768px){#about{grid-template-columns:1fr!important}#about>div:first-child{height:300px!important}}</style>`

  // GALLERY — asymmetric grid: 1 big + 4 smaller
  const gallerySection = `
  <section id="gallery" style="padding:100px 0;background:${bgAlt}">
    <div style="max-width:1400px;margin:0 auto;padding:0 2.5rem">
      <h2 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5vw,4rem);font-weight:900;color:${textPrimary};line-height:0.95;text-transform:uppercase;letter-spacing:-0.02em;margin-bottom:3rem">${content.galleryHeading}</h2>
      <div style="display:grid;grid-template-columns:1.5fr 1fr 1fr;grid-template-rows:280px 280px;gap:4px">
        <div style="grid-row:span 2;overflow:hidden;border-radius:4px">
          <img src="${stockPool[5]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" />
        </div>
        ${[6,7,8,9].map(i => `
        <div style="overflow:hidden;border-radius:4px">
          <img src="${stockPool[i]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" />
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // TESTIMONIAL — bold dark card, accent quote mark
  const testimonialSection = content.testimonial ? `
  <section style="padding:100px 2.5rem;background:${bg}">
    <div style="max-width:900px;margin:0 auto;text-align:center">
      <div style="font-family:var(--heading-font);font-size:6rem;color:${accent};line-height:0.8;margin-bottom:1.5rem;opacity:0.6">&#8220;</div>
      <p style="font-family:var(--heading-font);font-size:clamp(1.4rem,2.5vw,2.2rem);font-weight:700;color:${textPrimary};line-height:1.35;text-transform:uppercase;letter-spacing:-0.01em;margin-bottom:2rem">"${content.testimonial.quote}"</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:1.25rem">
        <span style="display:block;width:50px;height:1px;background:${accent}"></span>
        <span style="font-family:var(--body-font);font-size:0.78rem;color:${textMuted};letter-spacing:0.15em;text-transform:uppercase">${content.testimonial.author}</span>
        <span style="display:block;width:50px;height:1px;background:${accent}"></span>
      </div>
      ${content.testimonial.rating ? `<div style="margin-top:1.25rem;display:flex;justify-content:center;gap:0.25rem">${[...Array(content.testimonial.rating)].map(() => `<span style="color:${accent};font-size:1rem">&#9733;</span>`).join('')}</div>` : ''}
    </div>
  </section>` : ''

  // FEATURES STRIP — what sets apart, dark bg
  const featuresData = content.features || content.services.slice(0, 3)
  const featuresSection = `
  <section style="padding:100px 0;background:${bgCard}">
    <div style="max-width:1200px;margin:0 auto;padding:0 2.5rem">
      <h2 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5vw,4rem);font-weight:900;color:${textPrimary};line-height:0.95;text-transform:uppercase;letter-spacing:-0.02em;text-align:center;margin-bottom:4rem">Why Shop With Us</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:${border}">
        ${featuresData.slice(0, 3).map((f, i) => `
        <div style="background:${bgCard};padding:3rem 2.5rem;transition:background 0.3s" onmouseover="this.style.background='${bg}'" onmouseout="this.style.background='${bgCard}'">
          <div style="font-family:var(--heading-font);font-size:3rem;font-weight:900;color:${accent};opacity:0.3;line-height:1;margin-bottom:1.25rem">0${i+1}</div>
          <h3 style="font-family:var(--heading-font);font-size:1.2rem;font-weight:700;color:${textPrimary};text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.75rem">${f.name}</h3>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:${textMuted};line-height:1.7">${f.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  const contactSection = buildContactSection(content, locationInfo)

  const footerHtml = `
  <footer style="padding:3rem 2.5rem;background:${bgCard};display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;border-top:1px solid ${border}">
    <div style="font-family:var(--heading-font);font-size:1.1rem;font-weight:700;color:${textPrimary};letter-spacing:0.08em;text-transform:uppercase">${businessName}</div>
    <div style="display:flex;gap:2rem;flex-wrap:wrap">
      ${navLinks.map(l => `<a href="${l.href}" style="font-family:var(--body-font);font-size:0.72rem;color:${textMuted};text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;transition:color 0.3s">${l.label}</a>`).join('')}
    </div>
    <p style="font-family:var(--body-font);font-size:0.72rem;color:${textMuted}">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
  </footer>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${bg};
      --bg-alt: ${bgAlt};
      --card-bg: ${bgCard};
      --text: ${textPrimary};
      --text-muted: ${textMuted};
      --border: ${border};
    }
    body::before {
      content:'';position:fixed;inset:0;pointer-events:none;z-index:999;opacity:0.02;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size:160px 160px;
    }
    #contact { background:${bgAlt} !important; }
  </style>

${customNav}

${heroSection}
${marqueeBanner}
${productsSection}
${editorialSplit}
${gallerySection}
${testimonialSection}
${featuresSection}
${contactSection}
${footerHtml}

</body>
</html>`
}


function buildPetsTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about

  // Warm joyful palette — soft sage/warm cream with earthy accents
  const bg = '#f7f3ed'
  const bgWarm = '#fdf9f4'
  const bgSage = '#e8f0e8'
  const bgDark = '#2c3e2c'
  const textDark = '#1e2e1e'
  const textMid = '#3d5a3d'
  const textMuted = '#6b8a6b'
  const accentGreen = '#4a7c4e'
  const accentWarm = '#c4793a'
  const accentYellow = '#e8b84b'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')
  const navLinks = navFlags.allLinks

  // CUSTOM NAV — warm white, playful
  const customNav = `
  <nav id="pets-nav" style="position:fixed;top:0;left:0;right:0;z-index:100;padding:1.1rem 2.5rem;display:flex;align-items:center;justify-content:space-between;background:${bgWarm};border-bottom:2px solid ${bgSage};transition:box-shadow 0.3s">
    <a href="#" style="font-family:var(--heading-font);font-size:1.3rem;font-weight:700;color:${textDark};text-decoration:none;letter-spacing:0.04em">${businessName}</a>
    <div style="display:flex;align-items:center;gap:2rem">
      <div class="ms-nav-links" style="display:flex;align-items:center;gap:1.75rem">
        ${navLinks.map(l => `<a href="${l.href}" style="font-family:var(--body-font);font-size:0.85rem;font-weight:500;color:${textMid};text-decoration:none;transition:color 0.3s" onmouseover="this.style.color='${accentGreen}'" onmouseout="this.style.color='${textMid}'">${l.label}</a>`).join('')}
      </div>
      <a href="#contact" style="font-family:var(--body-font);font-size:0.82rem;font-weight:700;padding:0.7rem 1.75rem;background:${accentGreen};color:#fff;text-decoration:none;border-radius:999px;letter-spacing:0.04em;transition:opacity 0.3s">${content.ctaPrimary}</a>
      <label for="ms-menu-toggle" class="ms-burger-inline" style="display:none;cursor:pointer;color:${textDark};font-size:1.5rem">&#9776;</label>
    </div>
  </nav>
  <style>
    #pets-nav.scrolled { box-shadow: 0 4px 24px rgba(74,124,78,0.1); }
    @media(max-width:768px){ #pets-nav label { display:block!important; } }
    @media(min-width:769px){ .pet-cta-heading{display:none!important} .pet-cta-sub{font-size:clamp(2rem,4vw,3rem)!important;font-weight:700!important;color:#fff!important;font-family:var(--heading-font)!important;line-height:1.2!important} }
  </style>
  <script>
    window.addEventListener('scroll',function(){
      var n=document.getElementById('pets-nav');
      if(window.scrollY>50){n.classList.add('scrolled');}else{n.classList.remove('scrolled');}
    });
  </script>
  ${buildMobileMenu(content, navLinks)}`

  // HERO — full-bleed joyful image with rounded pill overlay card
  const heroSection = `
  <section style="padding-top:80px;position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;background:${bg}">
    <div style="position:absolute;inset:0;overflow:hidden">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;animation:petZoom 20s ease-in-out infinite alternate" />
      <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(28,46,28,0.7) 0%,rgba(28,46,28,0.35) 50%,rgba(28,46,28,0.15) 100%)"></div>
    </div>
    <div style="position:relative;z-index:2;max-width:1100px;margin:0 auto;padding:4rem 3rem;width:100%">
      <div style="max-width:600px">
        <div style="display:inline-flex;align-items:center;gap:0.6rem;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);padding:0.45rem 1.1rem;border-radius:999px;margin-bottom:1.75rem;border:1px solid rgba(255,255,255,0.25)">
          <span style="font-size:1rem">&#128062;</span>
          <span style="font-family:var(--body-font);font-size:0.72rem;font-weight:600;color:#fff;letter-spacing:0.14em;text-transform:uppercase">${content.heroEyebrow}</span>
        </div>
        <h1 style="font-family:var(--heading-font);font-size:clamp(2.8rem,6vw,5.5rem);font-weight:700;color:#fff;line-height:1.1;margin-bottom:1.25rem">${content.tagline}</h1>
        <p style="font-family:var(--body-font);font-size:1.05rem;color:rgba(255,255,255,0.82);line-height:1.7;max-width:480px;margin-bottom:2.25rem">${content.heroSubtitle}</p>
        <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
          <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:700;padding:1rem 2.25rem;background:${accentWarm};color:#fff;text-decoration:none;border-radius:999px;letter-spacing:0.06em;transition:transform 0.2s,opacity 0.2s">${content.ctaPrimary}</a>
          <a href="#services" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:1rem 2.25rem;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);color:#fff;text-decoration:none;border-radius:999px;border:1.5px solid rgba(255,255,255,0.4);letter-spacing:0.06em">${content.ctaSecondary || 'Our Services'}</a>
        </div>
      </div>
    </div>
    <div class="pts-hero-stats" style="position:absolute;bottom:3rem;right:3rem;background:rgba(255,255,255,0.9);backdrop-filter:blur(12px);border-radius:20px;padding:1.5rem 2rem;display:flex;align-items:center;gap:2rem">
      ${content.stats.slice(0, 2).map(s => `
      <div style="text-align:center">
        <div style="font-family:var(--heading-font);font-size:1.75rem;font-weight:700;color:${accentGreen}">${s.value}</div>
        <div style="font-family:var(--body-font);font-size:0.7rem;color:${textMuted};letter-spacing:0.1em;text-transform:uppercase;margin-top:0.2rem">${s.label}</div>
      </div>`).join(`<span style="display:block;width:1px;height:40px;background:${bgSage}"></span>`)}
    </div>
  </section>
  <style>@keyframes petZoom{0%{transform:scale(1)}100%{transform:scale(1.06) translateX(-1%)}}
  @media(max-width:768px){.pts-hero-stats{left:50%!important;right:auto!important;transform:translateX(-50%)!important;width:max-content!important;justify-content:center!important}}</style>`

  // ABOUT — warm split: rounded photo left with playful offset, story right
  const aboutSection = `
  <section id="about" style="padding:120px 0;background:${bgWarm}">
    <div class="ms-grid" style="max-width:1180px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:center">
      <div style="position:relative">
        <div style="border-radius:32px;overflow:hidden;aspect-ratio:4/5">
          <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div style="position:absolute;bottom:-1.5rem;right:-1.5rem;width:140px;height:140px;border-radius:24px;overflow:hidden;border:4px solid ${bgWarm};box-shadow:0 8px 32px rgba(74,124,78,0.2)">
          <img src="${stockPool[1]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div style="position:absolute;top:2rem;left:-1.5rem;background:${accentYellow};border-radius:16px;padding:1rem 1.25rem;box-shadow:0 4px 20px rgba(232,184,75,0.3)">
          <div style="font-family:var(--heading-font);font-size:1.4rem;font-weight:700;color:${textDark}">${content.stats[2]?.value || '5★'}</div>
          <div style="font-family:var(--body-font);font-size:0.68rem;color:${textMid};letter-spacing:0.08em;text-transform:uppercase;margin-top:0.1rem">${content.stats[2]?.label || 'Rating'}</div>
        </div>
      </div>
      <div>
        <div style="display:inline-flex;align-items:center;gap:0.6rem;background:${bgSage};padding:0.4rem 1.1rem;border-radius:999px;margin-bottom:1.5rem">
          <span style="font-family:var(--body-font);font-size:0.7rem;font-weight:700;color:${accentGreen};letter-spacing:0.14em;text-transform:uppercase">${content.badge || 'About Us'}</span>
        </div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3.2rem);font-weight:700;color:${textDark};line-height:1.15;margin-bottom:1.25rem">${content.aboutHeading}</h2>
        ${content.aboutMission ? `<p style="font-family:var(--body-font);font-size:1.05rem;color:${textMid};font-weight:600;line-height:1.7;margin-bottom:1.25rem">${content.aboutMission}</p>` : ''}
        ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:${textMuted};line-height:1.85;margin-bottom:0.9rem">${p}</p>`).join('')}
        <div style="display:flex;gap:2.5rem;margin-top:2.5rem;padding:1.75rem;background:${bgSage};border-radius:20px">
          ${content.stats.slice(0, 2).map(s => `
          <div>
            <div style="font-family:var(--heading-font);font-size:2rem;font-weight:700;color:${accentGreen}">${s.value}</div>
            <div style="font-family:var(--body-font);font-size:0.78rem;color:${textMuted};margin-top:0.2rem">${s.label}</div>
          </div>`).join(`<span style="display:block;width:1px;background:rgba(74,124,78,0.2)"></span>`)}
        </div>
      </div>
    </div>
  </section>`

  // SERVICES — playful cards with emoji icons, sage tinted bg
  const servicesSection = `
  <section id="services" style="padding:100px 0;background:${bgSage}">
    <div style="max-width:1200px;margin:0 auto;padding:0 3rem">
      <div style="text-align:center;margin-bottom:3.5rem">
        <div style="display:inline-flex;align-items:center;gap:0.6rem;background:rgba(255,255,255,0.8);padding:0.4rem 1.1rem;border-radius:999px;margin-bottom:1rem">
          <span style="font-family:var(--body-font);font-size:0.7rem;font-weight:700;color:${accentGreen};letter-spacing:0.14em;text-transform:uppercase">${content.heroEyebrow}</span>
        </div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${textDark};line-height:1.2">${content.servicesHeading}</h2>
      </div>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem">
        ${content.services.slice(0, 6).map((s, i) => `
        <div style="background:${bgWarm};border-radius:24px;padding:2rem;transition:transform 0.3s,box-shadow 0.3s;cursor:default" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 16px 40px rgba(74,124,78,0.12)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none'">
          <div style="width:60px;height:60px;border-radius:18px;background:${[bgSage,'rgba(196,121,58,0.12)','rgba(74,124,78,0.12)'][i%3]};display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;font-size:1.5rem">
            ${s.icon || ['&#128062;','&#128049;','&#9999;&#65039;','&#128137;','&#127968;','&#128144;'][i] || '&#128062;'}
          </div>
          <h3 style="font-family:var(--heading-font);font-size:1.1rem;font-weight:700;color:${textDark};margin-bottom:0.6rem">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:0.88rem;color:${textMuted};line-height:1.7">${s.description}</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:1rem">
            ${s.tags.slice(0,3).map(t => `<span style="font-family:var(--body-font);font-size:0.68rem;font-weight:600;padding:0.25rem 0.75rem;background:${bgSage};border-radius:999px;color:${textMid};letter-spacing:0.06em">${t}</span>`).join('')}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // GALLERY — mosaic grid with rounded corners, warm hover
  const gallerySection = `
  <section id="gallery" style="padding:100px 0;background:${bg}">
    <div style="max-width:1300px;margin:0 auto;padding:0 3rem">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${textDark};line-height:1.15">${content.galleryHeading}</h2>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.82rem;font-weight:600;color:${accentGreen};text-decoration:none;display:flex;align-items:center;gap:0.5rem">Book Now <span>&#8594;</span></a>
      </div>
      <div style="display:grid;grid-template-columns:1.2fr 1fr 1fr;grid-template-rows:260px 260px;gap:12px">
        <div style="grid-row:span 2;border-radius:24px;overflow:hidden">
          <img src="${stockPool[4]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.7s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
        </div>
        ${[5,6,7,8].map(i => `
        <div style="border-radius:18px;overflow:hidden">
          <img src="${stockPool[i]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.7s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // TESTIMONIALS — 3 warm cards with avatar initials
  const fallbacks = getFallbackTestimonials(content, businessCategory)
  const allTestimonials = [
    ...(content.testimonials || []),
    ...(content.testimonial ? [content.testimonial] : []),
    ...fallbacks
  ].slice(0, 3)

  const testimonialsSection = allTestimonials.length > 0 ? `
  <section style="padding:100px 0;background:${bgWarm}">
    <div style="max-width:1200px;margin:0 auto;padding:0 3rem">
      <div style="text-align:center;margin-bottom:3.5rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${textDark};line-height:1.2">Happy Families, Happy Pets</h2>
      </div>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
        ${allTestimonials.map((t, i) => {
          const avatarColors = [accentGreen, accentWarm, accentYellow]
          const avatarColor = avatarColors[i % 3]
          const initial = t.author ? t.author.charAt(0).toUpperCase() : 'C'
          return `
        <div style="background:${bgWarm};border:1.5px solid rgba(74,124,78,0.1);border-radius:24px;padding:2rem;transition:border-color 0.3s,transform 0.3s" onmouseover="this.style.borderColor='${accentGreen}';this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='rgba(74,124,78,0.1)';this.style.transform='translateY(0)'">
          <div style="display:flex;gap:0.2rem;margin-bottom:1.25rem">
            ${[...Array(t.rating || 5)].map(() => `<span style="color:${accentYellow};font-size:0.9rem">&#9733;</span>`).join('')}
          </div>
          <p style="font-family:var(--body-font);font-size:0.92rem;color:${textMuted};line-height:1.75;margin-bottom:1.5rem;font-style:italic">"${t.quote}"</p>
          <div style="display:flex;align-items:center;gap:0.75rem">
            <div style="width:40px;height:40px;border-radius:50%;background:${avatarColor};display:flex;align-items:center;justify-content:center;font-family:var(--heading-font);font-size:0.95rem;font-weight:700;color:#fff;flex-shrink:0">${initial}</div>
            <div style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:${textDark}">${t.author}</div>
          </div>
        </div>`
        }).join('')}
      </div>
    </div>
  </section>` : ''

  // CTA BANNER — dark green, playful
  const ctaBanner = `
  <section style="padding:80px 3rem;background:${bgDark};position:relative;overflow:hidden">
    <div style="position:absolute;right:-4rem;top:-4rem;width:300px;height:300px;border-radius:50%;background:rgba(74,124,78,0.15)"></div>
    <div style="position:absolute;left:10%;bottom:-3rem;width:200px;height:200px;border-radius:50%;background:rgba(232,184,75,0.1)"></div>
    <div style="max-width:700px;margin:0 auto;text-align:center;position:relative;z-index:2">
      <div style="font-size:2.5rem;margin-bottom:1rem">&#128062;</div>
      <h2 class="pet-cta-heading" style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:#fff;line-height:1.2;margin-bottom:1rem">${content.contactHeading}</h2>
      <p class="pet-cta-sub" style="font-family:var(--body-font);font-size:1rem;color:rgba(255,255,255,0.65);line-height:1.7;margin-bottom:2.5rem;max-width:480px;margin-left:auto;margin-right:auto">${content.heroSubtitle}</p>
      <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:0.85rem;font-weight:700;padding:1rem 2.5rem;background:${accentWarm};color:#fff;text-decoration:none;border-radius:999px;letter-spacing:0.06em;transition:opacity 0.3s">${content.ctaPrimary}</a>
    </div>
  </section>`

  const contactSection = buildContactSection(content, locationInfo)

  const petFooter = `
  <footer style="padding:4rem 3rem 2.5rem;background:${bgDark}">
    <div class="ms-grid" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem">
      <div>
        <div style="font-family:var(--heading-font);font-size:1.5rem;font-weight:700;color:#fff;margin-bottom:0.75rem">${businessName}</div>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.45);line-height:1.65;max-width:260px">${content.heroSubtitle}</p>
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.72rem;font-weight:700;color:rgba(255,255,255,0.5);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:1.25rem">Services</h4>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="display:block;font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.55);text-decoration:none;margin-bottom:0.6rem;transition:color 0.2s" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">${s.name}</a>`).join('')}
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.72rem;font-weight:700;color:rgba(255,255,255,0.5);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:1.25rem">Contact</h4>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.55);line-height:1.75">${locationInfo.phone}<br/>hello@${businessName.toLowerCase().replace(/\s+/g, '')}.com</p>
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.72rem;font-weight:700;color:rgba(255,255,255,0.5);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:1.25rem">Location</h4>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.55);line-height:1.75">${locationInfo.address}<br/>${locationInfo.city}, ${locationInfo.postcode}</p>
        ${content.contactHours ? `<p style="font-family:var(--body-font);font-size:0.8rem;color:rgba(255,255,255,0.4);margin-top:0.75rem;line-height:1.7">${content.contactHours.replace(/ · /g, '<br/>')}</p>` : ''}
      </div>
    </div>
    <div style="max-width:1100px;margin:0 auto;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem">
      <p style="font-family:var(--body-font);font-size:0.75rem;color:rgba(255,255,255,0.3)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      <div style="display:flex;gap:2rem">
        <a href="#" style="font-family:var(--body-font);font-size:0.72rem;color:rgba(255,255,255,0.3);text-decoration:none">Privacy Policy</a>
        <a href="#" style="font-family:var(--body-font);font-size:0.72rem;color:rgba(255,255,255,0.3);text-decoration:none">Terms of Service</a>
      </div>
    </div>
  </footer>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${bg};
      --bg-alt: ${bgSage};
      --card-bg: ${bgWarm};
      --text: ${textDark};
      --text-muted: ${textMuted};
      --border: rgba(74,124,78,0.1);
    }
    body::before {
      content:'';position:fixed;inset:0;pointer-events:none;z-index:999;opacity:0.015;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size:160px 160px;
    }
    #contact { background:${bgSage} !important; }
  </style>

${customNav}

${heroSection}
${aboutSection}
${servicesSection}
${gallerySection}
${testimonialsSection}
${ctaBanner}
${contactSection}
${petFooter}

</body>
</html>`
}

function buildHealthWellnessTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = stockImages.about || stockPool[0]

  const hw = {
    bg: '#fdfcf9',
    bgAlt: '#f2eeea',
    bgDeep: '#e8e2da',
    text: '#1c1c1c',
    muted: '#6b6565',
    accent: primaryColor || '#7c9e8f',
    border: 'rgba(0,0,0,0.07)',
  }

  const testimonials = [content.testimonial, ...getFallbackTestimonials(content, businessCategory)].filter(Boolean).slice(0, 3)

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')
    + `<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>`

  return `${headHtml}
<style>
  :root {
    --bg: ${hw.bg};
    --bg-alt: ${hw.bgAlt};
    --card-bg: #fff;
    --text: ${hw.text};
    --text-muted: ${hw.muted};
    --border: ${hw.border};
    --accent: ${hw.accent};
  }
  html { scroll-behavior: smooth; }
  .hw-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.8s ease, transform 0.8s ease; }
  .hw-fade.visible { opacity: 1; transform: none; }
  .hw-service-card { transition: box-shadow 0.35s ease, transform 0.35s ease; }
  .hw-service-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.10); transform: translateY(-4px); }
  .hw-btn-primary { transition: background 0.3s ease, transform 0.2s ease; }
  .hw-btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
  .hw-nav-link { position: relative; }
  .hw-nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: ${hw.accent}; transition: width 0.3s ease; }
  .hw-nav-link:hover::after { width: 100%; }
  .hw-img-hover { overflow: hidden; }
  .hw-img-hover img { transition: transform 0.7s ease; }
  .hw-img-hover:hover img { transform: scale(1.04); }
  @media(max-width:768px){
    .hw-hero-img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;z-index:0!important}
    .hw-hero-img img{width:100%!important;height:100%!important;object-fit:cover!important}
    .hw-hero-section::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,0.45);z-index:0;pointer-events:none}
    .hw-hero-inner{position:relative!important;z-index:1!important;padding:clamp(4rem,10svh,8rem) 1.5rem clamp(2rem,5svh,4rem)!important;text-align:center!important;align-items:center!important}
    .hw-hero-inner *{color:#fff!important}
    .hw-hero-inner .hw-fade{border-color:rgba(255,255,255,0.2)!important}
    .hw-stats{margin-top:2rem!important;padding-top:1.5rem!important;justify-content:space-between!important;border-top-color:rgba(255,255,255,0.2)!important}
    .hw-stats>div{text-align:center!important}
    #services .hw-img-hover{display:none!important}
    #about .hw-img-hover{display:none!important}
    .hw-about-label{display:none!important}
  }
</style>

${buildStandardNav(businessName, content, navFlags)}

<!-- HERO: Full-bleed split — soft cream left, full-bleed photo right, large serif italic tagline -->
<section class="hw-hero-section" style="min-height:calc(100vh - 64px);display:grid;grid-template-columns:1fr 1fr;background:${hw.bg};position:relative">
  <div class="hw-hero-inner" style="display:flex;flex-direction:column;justify-content:center;padding:8rem 4rem 6rem 5rem">
    <p class="hw-fade" style="font-family:'DM Sans',sans-serif;font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;color:${hw.accent};margin-bottom:2rem">${content.heroEyebrow || 'Wellness & Care'}</p>
    <h1 class="hw-fade" style="font-family:'Cormorant',Georgia,serif;font-size:clamp(3.2rem,5vw,5.5rem);font-weight:300;font-style:italic;color:${hw.text};line-height:1.1;letter-spacing:-0.01em;margin-bottom:1.5rem">${content.tagline}</h1>
    <div class="hw-fade" style="width:48px;height:1px;background:${hw.accent};margin-bottom:1.75rem"></div>
    <p class="hw-fade" style="font-family:'DM Sans',sans-serif;font-size:1rem;color:${hw.muted};line-height:1.8;max-width:400px;margin-bottom:2.5rem;font-weight:300">${content.heroSubtitle}</p>
    <div class="hw-fade" style="display:flex;gap:1rem;align-items:center">
      <a href="#contact" class="hw-btn-primary" style="font-family:'DM Sans',sans-serif;font-size:0.82rem;font-weight:500;letter-spacing:0.08em;padding:1rem 2.25rem;background:${hw.accent};color:#fff;text-decoration:none;display:inline-block">${content.ctaPrimary}</a>
      <a href="#services" style="font-family:'DM Sans',sans-serif;font-size:0.82rem;font-weight:400;letter-spacing:0.06em;color:${hw.muted};text-decoration:none;display:flex;align-items:center;gap:0.4rem">Explore &rarr;</a>
    </div>
    <div class="hw-fade hw-stats" style="display:flex;gap:2.5rem;margin-top:4rem;padding-top:3rem;border-top:1px solid ${hw.border}">
      ${content.stats.slice(0, 3).map(s => `
      <div>
        <div style="font-family:'Cormorant',Georgia,serif;font-size:2rem;font-weight:400;color:${hw.text}">${s.value}</div>
        <div style="font-family:'DM Sans',sans-serif;font-size:0.72rem;color:${hw.muted};letter-spacing:0.08em;text-transform:uppercase;margin-top:0.2rem">${s.label}</div>
      </div>`).join('')}
    </div>
  </div>
  <div class="hw-img-hover hw-hero-img" style="position:relative">
    <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
    <div style="position:absolute;inset:0;background:linear-gradient(to right,${hw.bg} 0%,transparent 8%)"></div>
    ${content.badge ? `<div style="position:absolute;bottom:3rem;left:2rem;background:rgba(255,255,255,0.92);backdrop-filter:blur(8px);padding:1rem 1.5rem;max-width:220px">
      <p style="font-family:'Cormorant',Georgia,serif;font-size:1rem;font-style:italic;color:${hw.text};line-height:1.5">${content.badge}</p>
    </div>` : ''}
  </div>
</section>

<!-- MARQUEE STRIP -->
<div style="background:${hw.accent};padding:0.9rem 0;overflow:hidden;white-space:nowrap">
  <div style="display:inline-block;animation:marquee 22s linear infinite">
    ${[...Array(6)].map(() => content.services.map(s => `<span style="font-family:'DM Sans',sans-serif;font-size:0.72rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.9);padding:0 2.5rem">${s.name}</span>`).join('')).join('')}
  </div>
</div>
<style>@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }</style>

<!-- SERVICES: Alternating large image + content rows -->
<section id="services" style="padding:8rem 0;background:${hw.bg}">
  <div style="max-width:1200px;margin:0 auto;padding:0 3rem">
    <div class="hw-fade" style="display:flex;align-items:center;gap:1.5rem;margin-bottom:4rem">
      <div style="width:32px;height:1px;background:${hw.accent}"></div>
      <p style="font-family:'DM Sans',sans-serif;font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;color:${hw.accent}">${content.servicesHeading}</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:0">
      ${content.services.slice(0, 4).map((s, i) => `
      <div class="hw-fade ms-grid" style="display:grid;grid-template-columns:${i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr'};min-height:420px;border-top:1px solid ${hw.border}${i === Math.min(content.services.length,4)-1 ? `;border-bottom:1px solid ${hw.border}` : ''}">
        ${i % 2 !== 0 ? `<div class="hw-img-hover" style="background:${hw.bgAlt}"><img src="${stockPool[i] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" /></div>` : ''}
        <div style="display:flex;flex-direction:column;justify-content:center;padding:4rem;${i % 2 === 0 ? 'order:-1' : ''}">
          <div style="font-family:'Cormorant',Georgia,serif;font-size:4rem;font-weight:300;color:${hw.bgDeep};line-height:1;margin-bottom:1.5rem;user-select:none">0${i + 1}</div>
          <h3 style="font-family:'Cormorant',Georgia,serif;font-size:2rem;font-weight:400;color:${hw.text};margin-bottom:1rem;line-height:1.2">${s.name}</h3>
          <p style="font-family:'DM Sans',sans-serif;font-size:0.9rem;color:${hw.muted};line-height:1.8;margin-bottom:1.5rem;max-width:360px">${s.description}</p>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
            ${s.tags.slice(0, 3).map(t => `<span style="font-family:'DM Sans',sans-serif;font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;color:${hw.accent};border:1px solid ${hw.accent};padding:0.25rem 0.65rem">${t}</span>`).join('')}
          </div>
        </div>
        ${i % 2 === 0 ? `<div class="hw-img-hover" style="background:${hw.bgAlt}"><img src="${stockPool[i] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" /></div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ABOUT: Asymmetric 2-col — stacked images left, editorial content right -->
<section id="about" style="padding:8rem 0;background:${hw.bgAlt}">
  <div class="ms-grid" style="max-width:1200px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center">
    <div style="position:relative">
      <div class="hw-img-hover" style="height:480px;margin-bottom:1.5rem">
        <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
      </div>
      <div class="hw-img-hover" style="height:220px;margin-left:3rem">
        <img src="${stockPool[4] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
      </div>
      <div class="hw-about-label" style="position:absolute;top:50%;left:-1.5rem;transform:translateY(-50%) rotate(-90deg);font-family:'DM Sans',sans-serif;font-size:0.65rem;letter-spacing:0.25em;text-transform:uppercase;color:${hw.muted};white-space:nowrap">${businessName}</div>
    </div>
    <div class="hw-fade">
      <p style="font-family:'DM Sans',sans-serif;font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;color:${hw.accent};margin-bottom:1.5rem">Our Story</p>
      <h2 style="font-family:'Cormorant',Georgia,serif;font-size:clamp(2.2rem,3.5vw,3.2rem);font-weight:300;color:${hw.text};line-height:1.2;margin-bottom:2rem">${content.aboutHeading}</h2>
      ${content.aboutMission ? `<p style="font-family:'Cormorant',Georgia,serif;font-size:1.2rem;font-style:italic;color:${hw.text};line-height:1.7;margin-bottom:2rem;padding-left:1rem;border-left:2px solid ${hw.accent}">${content.aboutMission}</p>` : ''}
      ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:'DM Sans',sans-serif;font-size:0.92rem;color:${hw.muted};line-height:1.9;margin-bottom:1.25rem;font-weight:300">${p}</p>`).join('')}
      <div style="margin-top:2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;padding-top:2.5rem;border-top:1px solid ${hw.border}">
        ${content.stats.slice(0, 4).map(s => `
        <div>
          <div style="font-family:'Cormorant',Georgia,serif;font-size:2.5rem;font-weight:300;color:${hw.text}">${s.value}</div>
          <div style="font-family:'DM Sans',sans-serif;font-size:0.72rem;color:${hw.muted};letter-spacing:0.08em;text-transform:uppercase;margin-top:0.2rem">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS: Soft cream, large italic quote, portrait grid -->
<section id="testimonials" style="padding:8rem 0;background:${hw.bg}">
  <div style="max-width:1200px;margin:0 auto;padding:0 3rem">
    <div class="hw-fade" style="text-align:center;margin-bottom:5rem">
      <p style="font-family:'DM Sans',sans-serif;font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;color:${hw.accent};margin-bottom:1rem">Client Stories</p>
      <h2 style="font-family:'Cormorant',Georgia,serif;font-size:clamp(2.5rem,4vw,3.8rem);font-weight:300;font-style:italic;color:${hw.text};line-height:1.2">Words of Trust</h2>
    </div>
    <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem">
      ${testimonials.map((t, i) => `
      <div class="hw-fade hw-service-card" style="background:${i === 1 ? hw.accent : hw.bgAlt};padding:2.5rem;position:relative">
        <div style="font-family:'Cormorant',Georgia,serif;font-size:5rem;line-height:1;color:${i === 1 ? 'rgba(255,255,255,0.25)' : hw.bgDeep};position:absolute;top:1rem;left:1.5rem;user-select:none">&ldquo;</div>
        <div style="color:${i === 1 ? 'rgba(255,255,255,0.9)' : '#f59e0b'};font-size:0.8rem;letter-spacing:0.1em;margin-bottom:1.5rem;position:relative;z-index:1">${'★'.repeat(t!.rating)}</div>
        <p style="font-family:'Cormorant',Georgia,serif;font-size:1.15rem;font-style:italic;color:${i === 1 ? '#fff' : hw.text};line-height:1.7;margin-bottom:2rem;position:relative;z-index:1">"${t!.quote}"</p>
        <div style="display:flex;align-items:center;gap:0.75rem;border-top:1px solid ${i === 1 ? 'rgba(255,255,255,0.2)' : hw.border};padding-top:1.25rem">
          <div style="width:36px;height:36px;border-radius:50%;background:${i === 1 ? 'rgba(255,255,255,0.2)' : hw.bgDeep};flex-shrink:0"></div>
          <div>
            <div style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:500;color:${i === 1 ? '#fff' : hw.text}">${t!.author.split(',')[0]}</div>
            <div style="font-family:'DM Sans',sans-serif;font-size:0.72rem;color:${i === 1 ? 'rgba(255,255,255,0.6)' : hw.muted}">${t!.author.split(',')[1]?.trim() || 'Client'}</div>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- CONTACT: Warm linen bg, 2-col, elegant form -->
<section id="contact" style="padding:8rem 0;background:${hw.bgAlt}">
  <div class="ms-grid" style="max-width:1200px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1.1fr;gap:6rem;align-items:start">
    <div class="hw-fade">
      <p style="font-family:'DM Sans',sans-serif;font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;color:${hw.accent};margin-bottom:1.5rem">Get In Touch</p>
      <h2 style="font-family:'Cormorant',Georgia,serif;font-size:clamp(2.2rem,3.5vw,3.2rem);font-weight:300;color:${hw.text};line-height:1.2;margin-bottom:2rem">${content.contactHeading}</h2>
      <p style="font-family:'DM Sans',sans-serif;font-size:0.9rem;color:${hw.muted};line-height:1.8;margin-bottom:3rem;font-weight:300">${content.heroSubtitle}</p>
      <div style="display:flex;flex-direction:column;gap:1.5rem">
        ${[
          { icon: '⊙', label: 'Address', val: `${locationInfo.address}, ${locationInfo.city}` },
          { icon: '◎', label: 'Phone', val: locationInfo.phone },
          { icon: '✉', label: 'Email', val: `hello@${businessName.toLowerCase().replace(/\s/g,'')}.com` },
          ...(content.contactHours ? [{ icon: '◷', label: 'Hours', val: content.contactHours.replace(/ · /g, ' · ') }] : []),
        ].map(item => `
        <div style="display:flex;gap:1.25rem;align-items:flex-start">
          <div style="width:40px;height:40px;border:1px solid ${hw.border};display:flex;align-items:center;justify-content:center;color:${hw.accent};font-size:1rem;flex-shrink:0">${item.icon}</div>
          <div>
            <div style="font-family:'DM Sans',sans-serif;font-size:0.68rem;letter-spacing:0.15em;text-transform:uppercase;color:${hw.muted};margin-bottom:0.25rem">${item.label}</div>
            <div style="font-family:'DM Sans',sans-serif;font-size:0.88rem;color:${hw.text}">${item.val}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div class="hw-fade" style="background:#fff;padding:3rem">
      <h3 style="font-family:'Cormorant',Georgia,serif;font-size:1.6rem;font-weight:300;color:${hw.text};margin-bottom:0.5rem">Send a Message</h3>
      <p style="font-family:'DM Sans',sans-serif;font-size:0.8rem;color:${hw.muted};margin-bottom:2rem">We respond within 24 hours.</p>
      <form style="display:flex;flex-direction:column;gap:1.25rem" onsubmit="return false">
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <div>
            <label style="font-family:'DM Sans',sans-serif;font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:${hw.muted};display:block;margin-bottom:0.5rem">First Name</label>
            <input type="text" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;padding:0.75rem 0;border:none;border-bottom:1px solid ${hw.border};background:transparent;font-size:0.9rem;color:${hw.text};outline:none" />
          </div>
          <div>
            <label style="font-family:'DM Sans',sans-serif;font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:${hw.muted};display:block;margin-bottom:0.5rem">Last Name</label>
            <input type="text" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;padding:0.75rem 0;border:none;border-bottom:1px solid ${hw.border};background:transparent;font-size:0.9rem;color:${hw.text};outline:none" />
          </div>
        </div>
        <div>
          <label style="font-family:'DM Sans',sans-serif;font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:${hw.muted};display:block;margin-bottom:0.5rem">Email</label>
          <input type="email" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;padding:0.75rem 0;border:none;border-bottom:1px solid ${hw.border};background:transparent;font-size:0.9rem;color:${hw.text};outline:none" />
        </div>
        <div>
          <label style="font-family:'DM Sans',sans-serif;font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:${hw.muted};display:block;margin-bottom:0.5rem">Service of Interest</label>
          <select style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;padding:0.75rem 0;border:none;border-bottom:1px solid ${hw.border};background:transparent;font-size:0.9rem;color:${hw.text};outline:none;appearance:none">
            <option value="">Select a service</option>
            ${content.services.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-family:'DM Sans',sans-serif;font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:${hw.muted};display:block;margin-bottom:0.5rem">Message</label>
          <textarea rows="4" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;padding:0.75rem 0;border:none;border-bottom:1px solid ${hw.border};background:transparent;font-size:0.9rem;color:${hw.text};outline:none;resize:none"></textarea>
        </div>
        <button type="submit" class="hw-btn-primary" style="margin-top:0.5rem;font-family:'DM Sans',sans-serif;font-size:0.78rem;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;padding:1.1rem 2.5rem;background:${hw.accent};color:#fff;border:none;cursor:pointer;align-self:flex-start">${content.ctaPrimary}</button>
      </form>
    </div>
  </div>
</section>

<footer style="padding:4rem 3rem 2.5rem;background:${hw.text}">
  <div style="max-width:1200px;margin:0 auto">
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:4rem;margin-bottom:3rem">
      <div>
        <div style="font-family:'Cormorant',Georgia,serif;font-size:1.6rem;font-weight:300;color:#fff;margin-bottom:1rem;letter-spacing:0.05em">${businessName}</div>
        <p style="font-family:'DM Sans',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);line-height:1.8;max-width:280px;font-weight:300">${content.heroSubtitle}</p>
      </div>
      <div>
        <div style="font-family:'DM Sans',sans-serif;font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:${hw.accent};margin-bottom:1.5rem">Services</div>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="display:block;font-family:'DM Sans',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.65rem;transition:color 0.2s">${s.tags?.[0] || s.name}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:'DM Sans',sans-serif;font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:${hw.accent};margin-bottom:1.5rem">Company</div>
        <a href="#about" style="display:block;font-family:'DM Sans',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.65rem">About</a>
        <a href="#contact" style="display:block;font-family:'DM Sans',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.65rem">Contact</a>
        <a href="#" style="display:block;font-family:'DM Sans',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.65rem">Privacy Policy</a>
      </div>
    </div>
    <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:2rem;display:flex;justify-content:space-between;align-items:center">
      <p style="font-family:'DM Sans',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.25)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      <p style="font-family:'DM Sans',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.25)">Wellness &amp; Care</p>
    </div>
  </div>
</footer>

<script>
  const hwObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); hwObserver.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.hw-fade').forEach(el => hwObserver.observe(el));
</script>

</body>
</html>`
}



function buildFitnessTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = stockImages.about || stockPool[0]

  const fit = {
    bg: '#0a0a0a',
    bgAlt: '#111111',
    bgCard: '#161616',
    text: '#ffffff',
    muted: '#bbbbbb',
    accent: primaryColor || '#e8ff00',
    border: 'rgba(255,255,255,0.06)',
  }

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark')
    + `<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>`

  const testimonials = [content.testimonial, ...getFallbackTestimonials(content, businessCategory)].filter(Boolean).slice(0, 3)

  return `${headHtml}
<style>
  :root {
    --bg: ${fit.bg};
    --bg-alt: ${fit.bgAlt};
    --card-bg: ${fit.bgCard};
    --text: ${fit.text};
    --text-muted: ${fit.muted};
    --border: ${fit.border};
  }
  html { scroll-behavior: smooth; }
  .fit-fade { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fit-fade.visible { opacity: 1; transform: none; }
  .fit-card { transition: transform 0.3s ease, background 0.3s ease; }
  .fit-card:hover { transform: translateY(-6px); background: ${fit.accent} !important; }
  .fit-card:hover * { color: #000 !important; border-color: rgba(0,0,0,0.15) !important; }
  .fit-img-zoom { overflow: hidden; }
  .fit-img-zoom img { transition: transform 0.6s ease; }
  .fit-img-zoom:hover img { transform: scale(1.05); }
  .fit-btn { transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease; }
  .fit-btn:hover { transform: translateY(-2px); }
  .fit-service-row { border-bottom: 1px solid ${fit.border}; transition: background 0.3s ease; cursor: pointer; }
  .fit-service-row:hover { background: ${fit.bgCard}; }
  .fit-counter { font-variant-numeric: tabular-nums; }
  @media(max-width:768px){.fit-hero-inner{padding:clamp(4rem,10svh,6rem) 1.25rem 1rem!important}.fit-hero-stats{padding:0!important}.fit-hero-stats>div{flex:1!important;padding-right:0!important;margin-right:0!important;border-right:none!important;text-align:center!important;padding:1rem 0!important}.fit-hero-stats>div:nth-child(n+4){display:none!important}}
</style>

<!-- PROMO BAR -->
<div style="background:${fit.accent};padding:0.55rem 2rem;text-align:center">
  <p style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#000">${content.badge || content.heroEyebrow || 'Limited spots available — join today'}</p>
</div>

${buildStandardNav(businessName, content, navFlags)}

<!-- HERO: Dark cinematic full-bleed, massive Bebas headline, split stats bar -->
<section style="position:relative;min-height:calc(100vh - 64px);display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;background:${fit.bg}">
  <div style="position:absolute;inset:0">
    <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
    <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,1) 0%,rgba(10,10,10,0.65) 50%,rgba(10,10,10,0.15) 100%)"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(10,10,10,0.5) 0%,transparent 60%)"></div>
  </div>
  <div class="fit-hero-inner" style="position:relative;max-width:1400px;margin:0 auto;padding:0 3rem 6rem;width:100%">
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
      <div style="width:40px;height:2px;background:${fit.accent}"></div>
      <p style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.25em;text-transform:uppercase;color:${fit.accent}">${content.heroEyebrow || businessName}</p>
    </div>
    <h1 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(5rem,11vw,11rem);font-weight:400;color:${fit.text};line-height:0.9;letter-spacing:0.02em;margin-bottom:2rem">${content.tagline.toUpperCase()}</h1>
    <div style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap">
      <a href="#contact" class="fit-btn" style="font-family:'Inter',sans-serif;font-size:0.8rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;padding:1.1rem 2.8rem;background:${fit.accent};color:#000;text-decoration:none;display:inline-block">${content.ctaPrimary}</a>
      <a href="#services" class="fit-btn" style="font-family:'Inter',sans-serif;font-size:0.8rem;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;padding:1.1rem 2.8rem;border:1px solid rgba(255,255,255,0.3);color:${fit.text};text-decoration:none;display:inline-block">${content.ctaSecondary || 'View Classes'}</a>
    </div>
  </div>
  <!-- Bottom stats bar -->
  <div style="position:relative;background:rgba(255,255,255,0.04);backdrop-filter:blur(12px);border-top:1px solid ${fit.border}">
    <div class="fit-hero-stats" style="max-width:1400px;margin:0 auto;padding:0 3rem;display:flex;justify-content:space-between;flex-wrap:wrap">
      ${content.stats.slice(0, 4).map((s, i) => `
      <div style="padding:1.5rem 0;${i < 3 ? `border-right:1px solid ${fit.border};padding-right:3rem;margin-right:3rem` : ''}">
        <div class="fit-counter" style="font-family:'Bebas Neue',sans-serif;font-size:2.8rem;color:${fit.text};line-height:1">${s.value}</div>
        <div style="font-family:'Inter',sans-serif;font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:${fit.muted};margin-top:0.2rem">${s.label}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- SERVICES: Bold numbered list rows — editorial, high contrast -->
<section id="services" style="padding:6rem 0;background:${fit.bg}">
  <div style="max-width:1400px;margin:0 auto;padding:0 3rem">
    <div class="fit-fade" style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:4rem">
      <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,5vw,5rem);color:${fit.text};line-height:1;letter-spacing:0.04em">${content.servicesHeading.toUpperCase()}</h2>
      <a href="#contact" style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:${fit.muted};text-decoration:none;border-bottom:1px solid ${fit.muted};padding-bottom:0.2rem">${content.ctaPrimary} &rarr;</a>
    </div>
    <div>
      ${content.services.map((s, i) => `
      <div class="fit-service-row" style="display:grid;grid-template-columns:80px 1fr auto;gap:2rem;align-items:center;padding:2rem 0">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:3rem;color:${fit.accent};line-height:1;opacity:0.7">0${i + 1}</div>
        <div>
          <h3 style="font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:${fit.text};letter-spacing:0.05em;margin-bottom:0.35rem">${s.name.toUpperCase()}</h3>
          <p style="font-family:'Inter',sans-serif;font-size:0.85rem;color:${fit.text};font-weight:300;line-height:1.6;max-width:520px">${s.description}</p>
          <div style="display:flex;gap:0.5rem;margin-top:0.75rem;flex-wrap:wrap">
            ${s.tags.slice(0, 3).map(t => `<span style="font-family:'Inter',sans-serif;font-size:0.62rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${fit.accent};background:rgba(${parseInt(fit.accent.slice(1,3)||'e8',16)},${parseInt(fit.accent.slice(3,5)||'ff',16)},${parseInt(fit.accent.slice(5,7)||'00',16)},0.1);padding:0.25rem 0.65rem">${t}</span>`).join('')}
          </div>
        </div>
        <div style="font-family:'Inter',sans-serif;font-size:1.5rem;color:rgba(255,255,255,0.15)">&#8599;</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- PHOTO GRID: Asymmetric 3+2 mosaic, full-bleed -->
<section style="display:grid;grid-template-columns:3fr 2fr;background:${fit.bg};gap:3px">
  <div class="fit-img-zoom" style="height:520px">
    <img src="${stockPool[0] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
  </div>
  <div style="display:grid;grid-template-rows:1fr 1fr;gap:3px">
    <div class="fit-img-zoom" style="height:258px">
      <img src="${stockPool[1] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
    </div>
    <div class="fit-img-zoom" style="height:258px">
      <img src="${stockPool[2] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
    </div>
  </div>
</section>

<!-- ABOUT: Dark, horizontal — bold quote + image side -->
<section id="about" style="padding:7rem 0;background:${fit.bgAlt}">
  <div class="ms-grid" style="max-width:1400px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:center">
    <div class="fit-fade">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem">
        <div style="width:32px;height:2px;background:${fit.accent}"></div>
        <p style="font-family:'Inter',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${fit.accent}">Our Philosophy</p>
      </div>
      <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,4.5vw,4.5rem);color:${fit.text};line-height:1;letter-spacing:0.03em;margin-bottom:1.5rem">${content.aboutHeading.toUpperCase()}</h2>
      ${content.aboutMission ? `<p style="font-family:'Inter',sans-serif;font-size:1.05rem;color:${fit.accent};line-height:1.7;margin-bottom:1.5rem;font-weight:400">${content.aboutMission}</p>` : ''}
      ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:'Inter',sans-serif;font-size:0.88rem;color:${fit.text};line-height:1.9;margin-bottom:1rem;font-weight:300">${p}</p>`).join('')}
      <a href="#contact" class="fit-btn" style="display:inline-block;margin-top:2rem;font-family:'Inter',sans-serif;font-size:0.78rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;padding:1.1rem 2.8rem;background:${fit.accent};color:#000;text-decoration:none">${content.ctaPrimary}</a>
    </div>
    <div class="fit-fade fit-img-zoom" style="height:560px;position:relative">
      <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
      <div style="position:absolute;bottom:2rem;left:-2rem;background:${fit.accent};padding:1.5rem 2rem;max-width:200px">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:2.5rem;color:#000;line-height:1">${content.stats[0]?.value || '500+'}</div>
        <div style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#000;margin-top:0.25rem">${content.stats[0]?.label || 'Active Members'}</div>
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS: Dark cards, accent quote marks -->
<section id="testimonials" style="padding:7rem 0;background:${fit.bg}">
  <div style="max-width:1400px;margin:0 auto;padding:0 3rem">
    <div class="fit-fade" style="margin-bottom:4rem">
      <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,5vw,5rem);color:${fit.text};line-height:1;letter-spacing:0.03em">RESULTS<span style="color:${fit.accent}">.</span> STORIES<span style="color:${fit.accent}">.</span></h2>
    </div>
    <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5px;background:${fit.border}">
      ${testimonials.map((t, i) => `
      <div class="fit-card" style="background:${fit.bgCard};padding:2.5rem;position:relative">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:6rem;line-height:1;color:${fit.accent};position:absolute;top:0.5rem;left:1.5rem;user-select:none">"</div>
        <div style="color:${fit.accent};font-size:0.75rem;letter-spacing:0.1em;margin-bottom:1.5rem;position:relative;z-index:1">${'★'.repeat(t!.rating)}</div>
        <p style="font-family:'Inter',sans-serif;font-size:0.9rem;color:${fit.text};line-height:1.8;margin-bottom:2rem;position:relative;z-index:1;font-weight:500">"${t!.quote}"</p>
        <div style="border-top:1px solid ${fit.border};padding-top:1rem">
          <div style="font-family:'Inter',sans-serif;font-size:0.8rem;font-weight:600;color:${fit.text}">${t!.author.split(',')[0]}</div>
          <div style="font-family:'Inter',sans-serif;font-size:0.72rem;color:${fit.muted};margin-top:0.15rem">${t!.author.split(',')[1]?.trim() || 'Member'}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- CONTACT: Dark 2-col, accent CTA bar above -->
<div style="background:${fit.accent};padding:2.5rem 3rem;text-align:center">
  <h3 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(2rem,4vw,3.5rem);color:#000;letter-spacing:0.05em">${content.ctaPrimary.toUpperCase()} — START TODAY</h3>
</div>
<section id="contact" style="padding:6rem 0;background:${fit.bgAlt}">
  <div class="ms-grid" style="max-width:1400px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1.4fr;gap:6rem;align-items:start">
    <div class="fit-fade">
      <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,4vw,4rem);color:${fit.text};line-height:1;letter-spacing:0.03em;margin-bottom:2rem">${content.contactHeading.toUpperCase()}</h2>
      <div style="display:flex;flex-direction:column;gap:1.5rem">
        ${[
          { label: 'Location', val: `${locationInfo.address}, ${locationInfo.city}` },
          { label: 'Phone', val: locationInfo.phone },
          { label: 'Email', val: `hello@${businessName.toLowerCase().replace(/\s/g,'')}.com` },
          ...(content.contactHours ? [{ label: 'Hours', val: content.contactHours }] : []),
        ].map(item => `
        <div style="border-left:2px solid ${fit.accent};padding-left:1.25rem">
          <div style="font-family:'Inter',sans-serif;font-size:0.65rem;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:${fit.accent};margin-bottom:0.3rem">${item.label}</div>
          <div style="font-family:'Inter',sans-serif;font-size:0.9rem;color:${fit.text};font-weight:300">${item.val}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="fit-fade">
      <form style="display:flex;flex-direction:column;gap:1rem" onsubmit="return false">
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <input type="text" placeholder="Full Name" style="font-family:'Inter',sans-serif;padding:1rem 1.25rem;background:${fit.bgCard};border:1px solid ${fit.border};color:${fit.text};font-size:0.88rem;outline:none;box-sizing:border-box" />
          <input type="email" placeholder="Email" style="font-family:'Inter',sans-serif;padding:1rem 1.25rem;background:${fit.bgCard};border:1px solid ${fit.border};color:${fit.text};font-size:0.88rem;outline:none;box-sizing:border-box" />
        </div>
        <input type="tel" placeholder="Phone Number" style="font-family:'Inter',sans-serif;padding:1rem 1.25rem;background:${fit.bgCard};border:1px solid ${fit.border};color:${fit.text};font-size:0.88rem;outline:none" />
        <select style="font-family:'Inter',sans-serif;padding:1rem 1.25rem;background:${fit.bgCard};border:1px solid ${fit.border};color:${fit.muted};font-size:0.88rem;outline:none;appearance:none">
          <option value="">Select a program</option>
          ${content.services.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
        </select>
        <textarea placeholder="Tell us about your fitness goals..." rows="4" style="font-family:'Inter',sans-serif;padding:1rem 1.25rem;background:${fit.bgCard};border:1px solid ${fit.border};color:${fit.text};font-size:0.88rem;outline:none;resize:none"></textarea>
        <button type="submit" class="fit-btn" style="font-family:'Inter',sans-serif;font-size:0.8rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;padding:1.2rem 2.5rem;background:${fit.accent};color:#000;border:none;cursor:pointer">${content.ctaPrimary}</button>
      </form>
    </div>
  </div>
</section>

<footer style="padding:3rem;background:${fit.bg};border-top:1px solid ${fit.border}">
  <div style="max-width:1400px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
    <div style="font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:${fit.text};letter-spacing:0.08em">${businessName.toUpperCase()}</div>
    <div style="display:flex;gap:2rem;flex-wrap:wrap">
      ${content.services.slice(0, 3).map(s => `<a href="#services" style="font-family:'Inter',sans-serif;font-size:0.72rem;color:${fit.muted};text-decoration:none;letter-spacing:0.08em;text-transform:uppercase">${s.tags?.[0] || s.name}</a>`).join('')}
      <a href="#contact" style="font-family:'Inter',sans-serif;font-size:0.72rem;color:${fit.muted};text-decoration:none;letter-spacing:0.08em;text-transform:uppercase">Contact</a>
    </div>
    <p style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.2)">&copy; ${new Date().getFullYear()} ${businessName}</p>
  </div>
</footer>

<script>
  const fitObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fitObserver.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fit-fade').forEach(el => fitObserver.observe(el));
</script>

</body>
</html>`
}


function buildEducationTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = stockImages.about || stockPool[0]

  const edu = {
    bg: '#ffffff',
    bgAlt: '#f7f5f2',
    bgWarm: '#fef9f0',
    text: '#1a1714',
    muted: '#6b6560',
    accent: primaryColor || '#2d5be3',
    accentLight: lightenColor(primaryColor || '#2d5be3', 0.88),
    border: 'rgba(0,0,0,0.07)',
  }

  const testimonials = [content.testimonial, ...getFallbackTestimonials(content, businessCategory)].filter(Boolean).slice(0, 2)

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')
    + `<link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>`

  const processSteps = content.processSteps || [
    { step: '01', title: content.services[0]?.name || 'Enroll', description: content.services[0]?.description || 'Begin your learning journey.' },
    { step: '02', title: content.services[1]?.name || 'Learn', description: content.services[1]?.description || 'Engage with expert-led content.' },
    { step: '03', title: content.services[2]?.name || 'Achieve', description: content.services[2]?.description || 'Reach your goals and grow.' },
  ]

  return `${headHtml}
<style>
  :root {
    --bg: ${edu.bg};
    --bg-alt: ${edu.bgAlt};
    --card-bg: ${edu.bg};
    --text: ${edu.text};
    --text-muted: ${edu.muted};
    --border: ${edu.border};
  }
  html { scroll-behavior: smooth; }
  .edu-fade { opacity: 0; transform: translateY(24px); transition: opacity 0.75s ease, transform 0.75s ease; }
  .edu-fade.visible { opacity: 1; transform: none; }
  @media(max-width:768px){.edu-trust-strip{display:none!important}.edu-hero{min-height:auto!important;padding:clamp(4rem,10svh,6rem) 0 2rem!important}}
  .edu-card { transition: box-shadow 0.35s ease, transform 0.35s ease; }
  .edu-card:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.10); transform: translateY(-5px); }
  .edu-img-zoom { overflow: hidden; }
  .edu-img-zoom img { transition: transform 0.65s ease; }
  .edu-img-zoom:hover img { transform: scale(1.04); }
  .edu-link { position: relative; display: inline-block; }
  .edu-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 1px; background: ${edu.accent}; transform: scaleX(0); transform-origin: right; transition: transform 0.35s ease; }
  .edu-link:hover::after { transform: scaleX(1); transform-origin: left; }
</style>

${buildStandardNav(businessName, content, navFlags)}

<!-- HERO: Warm off-white, large editorial serif left, stacked image collage right -->
<section class="edu-hero" style="background:${edu.bgWarm};min-height:calc(92vh - 64px);display:flex;align-items:center;overflow:hidden;position:relative">
  <div style="position:absolute;top:0;right:0;width:45%;height:100%;background:${edu.accentLight};clip-path:polygon(8% 0,100% 0,100% 100%,0% 100%)"></div>
  <div style="max-width:1200px;margin:0 auto;padding:6rem 3rem;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;position:relative;z-index:1">
    <div>
      <div class="edu-fade" style="display:inline-flex;align-items:center;gap:0.75rem;background:${edu.accent};padding:0.5rem 1.25rem;margin-bottom:2rem">
        <div style="width:6px;height:6px;border-radius:50%;background:#fff"></div>
        <p style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#fff">${content.heroEyebrow || 'Education & Growth'}</p>
      </div>
      <h1 class="edu-fade" style="font-family:'Merriweather',Georgia,serif;font-size:clamp(2.5rem,4.5vw,4rem);font-weight:700;color:${edu.text};line-height:1.2;margin-bottom:1.5rem">${content.tagline}</h1>
      <p class="edu-fade" style="font-family:'Inter',sans-serif;font-size:1rem;color:${edu.muted};line-height:1.8;max-width:420px;margin-bottom:2.5rem;font-weight:300">${content.heroSubtitle}</p>
      <div class="edu-fade" style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
        <a href="#contact" style="font-family:'Inter',sans-serif;font-size:0.82rem;font-weight:600;letter-spacing:0.06em;padding:1rem 2.5rem;background:${edu.accent};color:#fff;text-decoration:none;display:inline-block;transition:filter 0.25s ease">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:'Inter',sans-serif;font-size:0.82rem;font-weight:400;color:${edu.text};text-decoration:none;display:flex;align-items:center;gap:0.4rem;border-bottom:1px solid ${edu.text};padding-bottom:0.15rem">${content.ctaSecondary || 'See Programs'}</a>
      </div>
      <div class="edu-fade" style="display:flex;gap:2rem;margin-top:3.5rem;padding-top:2.5rem;border-top:1px solid ${edu.border}">
        ${content.stats.slice(0, 3).map(s => `
        <div>
          <div style="font-family:'Merriweather',Georgia,serif;font-size:1.8rem;font-weight:700;color:${edu.accent}">${s.value}</div>
          <div style="font-family:'Inter',sans-serif;font-size:0.72rem;color:${edu.muted};letter-spacing:0.06em;margin-top:0.2rem">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="edu-fade" style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:1rem;height:500px">
      <div class="edu-img-zoom" style="grid-column:1/2;grid-row:1/3;border-radius:4px;overflow:hidden">
        <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
      </div>
      <div class="edu-img-zoom" style="border-radius:4px;overflow:hidden">
        <img src="${stockPool[0] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
      </div>
      <div style="background:${edu.accent};border-radius:4px;display:flex;flex-direction:column;justify-content:center;padding:1.5rem">
        <div style="font-family:'Merriweather',Georgia,serif;font-size:1.4rem;font-weight:700;color:#fff;line-height:1.2">${content.stats[3]?.value || content.stats[0]?.value || '98%'}</div>
        <div style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.75);margin-top:0.35rem;line-height:1.4">${content.stats[3]?.label || 'Student satisfaction'}</div>
      </div>
    </div>
  </div>
</section>

<!-- TRUST STRIP -->
<div class="edu-trust-strip" style="background:${edu.text};padding:1.5rem 3rem">
  <div style="max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
    ${content.stats.slice(0, 4).map(s => `
    <div style="text-align:center">
      <span style="font-family:'Merriweather',Georgia,serif;font-size:1.3rem;font-weight:700;color:#fff">${s.value}</span>
      <span style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.45);margin-left:0.5rem;letter-spacing:0.06em">${s.label}</span>
    </div>`).join('')}
  </div>
</div>

<!-- PROGRAMS: Clean card grid, category badge, hover lift -->
<section id="services" style="padding:7rem 0;background:${edu.bg}">
  <div style="max-width:1200px;margin:0 auto;padding:0 3rem">
    <div class="edu-fade" style="display:flex;flex-direction:column;align-items:flex-start;gap:0.75rem;margin-bottom:4rem">
      <div style="display:flex;align-items:center;gap:1rem">
        <div style="width:24px;height:2px;background:${edu.accent}"></div>
        <p style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${edu.accent}">Our Programs</p>
      </div>
      <h2 style="font-family:'Merriweather',Georgia,serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:${edu.text};line-height:1.2">${content.servicesHeading}</h2>
    </div>
    <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
      ${content.services.slice(0, 6).map((s, i) => `
      <div class="edu-fade edu-card" style="background:${i === 0 ? edu.accent : edu.bgAlt};border-radius:2px;padding:2.5rem;position:relative;overflow:hidden">
        <div style="position:absolute;top:0;right:0;width:80px;height:80px;background:${i === 0 ? 'rgba(255,255,255,0.08)' : edu.accentLight};border-radius:0 0 0 80px"></div>
        <div style="font-family:'Inter',sans-serif;font-size:0.65rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:${i === 0 ? 'rgba(255,255,255,0.7)' : edu.accent};margin-bottom:1rem">${s.tags[0] || 'Program'}</div>
        <h3 style="font-family:'Merriweather',Georgia,serif;font-size:1.2rem;font-weight:700;color:${i === 0 ? '#fff' : edu.text};margin-bottom:0.75rem;line-height:1.3">${s.name}</h3>
        <p style="font-family:'Inter',sans-serif;font-size:0.85rem;color:${i === 0 ? 'rgba(255,255,255,0.75)' : edu.muted};line-height:1.7;font-weight:300;margin-bottom:1.5rem">${s.description}</p>
        <a href="#contact" style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${i === 0 ? '#fff' : edu.accent};text-decoration:none;display:flex;align-items:center;gap:0.4rem">Learn More &rarr;</a>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- HOW IT WORKS: Clean 3-step with connecting line, numbered circles -->
<section style="padding:7rem 0;background:${edu.bgWarm}">
  <div style="max-width:1000px;margin:0 auto;padding:0 3rem;text-align:center">
    <div class="edu-fade" style="margin-bottom:5rem">
      <p style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${edu.accent};margin-bottom:1rem">How It Works</p>
      <h2 style="font-family:'Merriweather',Georgia,serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:${edu.text};line-height:1.3">${content.stepsHeading || 'Your Path to Success'}</h2>
    </div>
    <div style="position:relative">
      <div style="position:absolute;top:32px;left:calc(16% + 32px);right:calc(16% + 32px);height:1px;background:linear-gradient(to right,${edu.accent},${edu.accentLight},${edu.accent});z-index:0" class="ms-sticky"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:2rem;position:relative;z-index:1">
        ${processSteps.slice(0, 3).map((step, i) => `
        <div class="edu-fade" style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:1.5rem">
          <div style="width:64px;height:64px;border-radius:50%;background:${i === 1 ? edu.accent : edu.bg};border:2px solid ${edu.accent};display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <span style="font-family:'Merriweather',Georgia,serif;font-size:1.2rem;font-weight:700;color:${i === 1 ? '#fff' : edu.accent}">${step.step}</span>
          </div>
          <div>
            <h3 style="font-family:'Merriweather',Georgia,serif;font-size:1rem;font-weight:700;color:${edu.text};margin-bottom:0.65rem">${step.title}</h3>
            <p style="font-family:'Inter',sans-serif;font-size:0.85rem;color:${edu.muted};line-height:1.7;font-weight:300">${step.description}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <a href="#contact" style="display:inline-block;margin-top:4rem;font-family:'Inter',sans-serif;font-size:0.82rem;font-weight:600;letter-spacing:0.08em;padding:1.1rem 3rem;background:${edu.accent};color:#fff;text-decoration:none">${content.ctaPrimary}</a>
  </div>
</section>

<!-- ABOUT: Split — image left, warm editorial content right -->
<section id="about" style="padding:7rem 0;background:${edu.bg}">
  <div class="ms-grid" style="max-width:1200px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center">
    <div class="edu-fade" style="position:relative">
      <div class="edu-img-zoom" style="height:520px;border-radius:2px;overflow:hidden">
        <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
      </div>
      <div style="position:absolute;bottom:-2rem;right:-2rem;background:${edu.bgWarm};border:1px solid ${edu.border};padding:1.5rem 2rem">
        <p style="font-family:'Merriweather',Georgia,serif;font-size:0.9rem;font-style:italic;color:${edu.text};line-height:1.5;max-width:160px">${content.badge || 'Committed to your growth'}</p>
      </div>
    </div>
    <div class="edu-fade">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
        <div style="width:24px;height:2px;background:${edu.accent}"></div>
        <p style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${edu.accent}">About Us</p>
      </div>
      <h2 style="font-family:'Merriweather',Georgia,serif;font-size:clamp(2rem,3vw,2.8rem);font-weight:700;color:${edu.text};line-height:1.25;margin-bottom:1.5rem">${content.aboutHeading}</h2>
      ${content.aboutMission ? `<p style="font-family:'Merriweather',Georgia,serif;font-size:1rem;font-style:italic;color:${edu.text};line-height:1.7;margin-bottom:1.5rem;padding-left:1.25rem;border-left:3px solid ${edu.accent}">${content.aboutMission}</p>` : ''}
      ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:'Inter',sans-serif;font-size:0.9rem;color:${edu.muted};line-height:1.9;margin-bottom:1rem;font-weight:300">${p}</p>`).join('')}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-top:2.5rem;padding-top:2rem;border-top:1px solid ${edu.border}">
        ${content.stats.slice(0, 4).map(s => `
        <div style="display:flex;gap:0.75rem;align-items:flex-start">
          <div style="width:28px;height:28px;border-radius:50%;background:${edu.accentLight};display:flex;align-items:center;justify-content:center;color:${edu.accent};font-size:0.7rem;flex-shrink:0;margin-top:0.1rem">✓</div>
          <div>
            <div style="font-family:'Merriweather',Georgia,serif;font-size:1.2rem;font-weight:700;color:${edu.text}">${s.value}</div>
            <div style="font-family:'Inter',sans-serif;font-size:0.72rem;color:${edu.muted};margin-top:0.1rem">${s.label}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS: Warm bg, large serif quote, 2-col -->
<section id="testimonials" style="padding:7rem 0;background:${edu.bgAlt}">
  <div style="max-width:1200px;margin:0 auto;padding:0 3rem">
    <div class="edu-fade" style="text-align:center;margin-bottom:4rem">
      <p style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${edu.accent};margin-bottom:1rem">Student Stories</p>
      <h2 style="font-family:'Merriweather',Georgia,serif;font-size:clamp(2rem,3vw,2.8rem);font-weight:700;color:${edu.text};line-height:1.2">What Our Students Say</h2>
    </div>
    <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:2rem">
      ${testimonials.map((t, i) => `
      <div class="edu-fade edu-card" style="background:${i === 0 ? edu.accent : edu.bg};padding:3rem;border-radius:2px;position:relative">
        <div style="font-family:'Merriweather',Georgia,serif;font-size:6rem;line-height:1;color:${i === 0 ? 'rgba(255,255,255,0.15)' : edu.accentLight};position:absolute;top:1rem;left:2rem;user-select:none;font-style:italic">"</div>
        <div style="color:${i === 0 ? 'rgba(255,255,255,0.9)' : '#f59e0b'};font-size:0.85rem;letter-spacing:0.05em;margin-bottom:1.5rem;position:relative;z-index:1">${'★'.repeat(t!.rating)}</div>
        <p style="font-family:'Merriweather',Georgia,serif;font-size:1.05rem;font-style:italic;color:${i === 0 ? '#fff' : edu.text};line-height:1.75;margin-bottom:2rem;position:relative;z-index:1">"${t!.quote}"</p>
        <div style="display:flex;align-items:center;gap:1rem;border-top:1px solid ${i === 0 ? 'rgba(255,255,255,0.2)' : edu.border};padding-top:1.25rem">
          <div style="width:40px;height:40px;border-radius:50%;background:${i === 0 ? 'rgba(255,255,255,0.2)' : edu.accentLight};display:flex;align-items:center;justify-content:center;font-family:'Merriweather',serif;font-size:1rem;color:${i === 0 ? '#fff' : edu.accent};flex-shrink:0">${t!.author[0]}</div>
          <div>
            <div style="font-family:'Inter',sans-serif;font-size:0.85rem;font-weight:600;color:${i === 0 ? '#fff' : edu.text}">${t!.author.split(',')[0]}</div>
            <div style="font-family:'Inter',sans-serif;font-size:0.72rem;color:${i === 0 ? 'rgba(255,255,255,0.6)' : edu.muted};margin-top:0.1rem">${t!.author.split(',')[1]?.trim() || 'Student'}</div>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- CONTACT: Warm, 2-col, friendly form -->
<section id="contact" style="padding:7rem 0;background:${edu.bgWarm}">
  <div class="ms-grid" style="max-width:1200px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1.2fr;gap:6rem;align-items:start">
    <div class="edu-fade">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
        <div style="width:24px;height:2px;background:${edu.accent}"></div>
        <p style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${edu.accent}">Enroll Today</p>
      </div>
      <h2 style="font-family:'Merriweather',Georgia,serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:${edu.text};line-height:1.2;margin-bottom:1.5rem">${content.contactHeading}</h2>
      <p style="font-family:'Inter',sans-serif;font-size:0.9rem;color:${edu.muted};line-height:1.8;margin-bottom:3rem;font-weight:300">${content.heroSubtitle}</p>
      <div style="display:flex;flex-direction:column;gap:1.5rem">
        ${[
          { icon: '📍', label: 'Address', val: `${locationInfo.address}, ${locationInfo.city}` },
          { icon: '📞', label: 'Phone', val: locationInfo.phone },
          { icon: '✉️', label: 'Email', val: `hello@${businessName.toLowerCase().replace(/\s/g,'')}.com` },
          ...(content.contactHours ? [{ icon: '🕐', label: 'Hours', val: content.contactHours }] : []),
        ].map(item => `
        <div style="display:flex;gap:1rem;align-items:flex-start">
          <div style="width:42px;height:42px;border-radius:50%;background:${edu.accentLight};display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0">${item.icon}</div>
          <div>
            <div style="font-family:'Inter',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${edu.muted};margin-bottom:0.2rem">${item.label}</div>
            <div style="font-family:'Inter',sans-serif;font-size:0.88rem;color:${edu.text}">${item.val}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div class="edu-fade" style="background:#fff;padding:3rem;border-radius:2px;box-shadow:0 4px 32px rgba(0,0,0,0.07)">
      <h3 style="font-family:'Merriweather',Georgia,serif;font-size:1.5rem;font-weight:700;color:${edu.text};margin-bottom:0.5rem">Get in Touch</h3>
      <p style="font-family:'Inter',sans-serif;font-size:0.82rem;color:${edu.muted};margin-bottom:2rem">We'll respond within one business day.</p>
      <form style="display:flex;flex-direction:column;gap:1.25rem" onsubmit="return false">
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <div>
            <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${edu.muted};display:block;margin-bottom:0.5rem">First Name</label>
            <input type="text" style="width:100%;box-sizing:border-box;font-family:'Inter',sans-serif;padding:0.85rem 1rem;border:1px solid ${edu.border};border-radius:2px;font-size:0.9rem;color:${edu.text};outline:none;transition:border-color 0.2s" />
          </div>
          <div>
            <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${edu.muted};display:block;margin-bottom:0.5rem">Last Name</label>
            <input type="text" style="width:100%;box-sizing:border-box;font-family:'Inter',sans-serif;padding:0.85rem 1rem;border:1px solid ${edu.border};border-radius:2px;font-size:0.9rem;color:${edu.text};outline:none" />
          </div>
        </div>
        <div>
          <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${edu.muted};display:block;margin-bottom:0.5rem">Email Address</label>
          <input type="email" style="width:100%;box-sizing:border-box;font-family:'Inter',sans-serif;padding:0.85rem 1rem;border:1px solid ${edu.border};border-radius:2px;font-size:0.9rem;color:${edu.text};outline:none" />
        </div>
        <div>
          <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${edu.muted};display:block;margin-bottom:0.5rem">Program of Interest</label>
          <select style="width:100%;box-sizing:border-box;font-family:'Inter',sans-serif;padding:0.85rem 1rem;border:1px solid ${edu.border};border-radius:2px;font-size:0.9rem;color:${edu.muted};outline:none;background:#fff;appearance:none">
            <option value="">Select a program</option>
            ${content.services.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${edu.muted};display:block;margin-bottom:0.5rem">Message</label>
          <textarea placeholder="Tell us about your goals..." rows="4" style="width:100%;box-sizing:border-box;font-family:'Inter',sans-serif;padding:0.85rem 1rem;border:1px solid ${edu.border};border-radius:2px;font-size:0.9rem;color:${edu.text};outline:none;resize:none"></textarea>
        </div>
        <button type="submit" style="font-family:'Inter',sans-serif;font-size:0.8rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:1.1rem 2.5rem;background:${edu.accent};color:#fff;border:none;cursor:pointer;border-radius:2px;transition:filter 0.25s ease">${content.ctaPrimary}</button>
      </form>
    </div>
  </div>
</section>

<footer style="padding:4rem 3rem 2.5rem;background:${edu.text}">
  <div style="max-width:1200px;margin:0 auto">
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:4rem;margin-bottom:3rem">
      <div>
        <div style="font-family:'Merriweather',Georgia,serif;font-size:1.4rem;font-weight:700;color:#fff;margin-bottom:1rem">${businessName}</div>
        <p style="font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);line-height:1.8;max-width:280px;font-weight:300">${content.heroSubtitle}</p>
      </div>
      <div>
        <div style="font-family:'Inter',sans-serif;font-size:0.65rem;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:${edu.accent};margin-bottom:1.5rem">Programs</div>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);text-decoration:none;margin-bottom:0.6rem;font-weight:300">${s.tags?.[0] || s.name}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:'Inter',sans-serif;font-size:0.65rem;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:${edu.accent};margin-bottom:1.5rem">Company</div>
        <a href="#about" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);text-decoration:none;margin-bottom:0.6rem;font-weight:300">About Us</a>
        <a href="#contact" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);text-decoration:none;margin-bottom:0.6rem;font-weight:300">Contact</a>
        <a href="#" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);text-decoration:none;margin-bottom:0.6rem;font-weight:300">Privacy Policy</a>
      </div>
    </div>
    <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:2rem;display:flex;justify-content:space-between;align-items:center">
      <p style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.25);font-weight:300">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      <p style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.25);font-weight:300">Education &amp; Growth</p>
    </div>
  </div>
</footer>

<script>
  const eduObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); eduObserver.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.edu-fade').forEach(el => eduObserver.observe(el));
</script>

</body>
</html>`
}

function buildProfessionalTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  let _pi = 0

  // Light palette
  const bg = '#ffffff'
  const bgAlt = '#f5f4f0'
  const cardBg = '#eeece8'
  const textPrimary = '#0d0d0b'
  const textMuted = '#555550'
  const borderCol = 'rgba(0,0,0,0.08)'
  const accent = primaryColor || '#b8975a'

  const fallbackTestimonials = getFallbackTestimonials(content, businessCategory)

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light') + `<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${bg};
      --bg-alt: ${bgAlt};
      --card-bg: ${cardBg};
      --text: ${textPrimary};
      --text-muted: ${textMuted};
      --border: ${borderCol};
      --primary: ${accent};
      --heading-font: 'Playfair Display', Georgia, serif;
      --body-font: 'DM Sans', sans-serif;
    }

    /* Grain overlay */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.035;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    /* Custom cursor */
    body { cursor: none; }
    #ms-cursor-dot { position:fixed;width:6px;height:6px;background:${accent};border-radius:50%;pointer-events:none;z-index:10000;transform:translate(-50%,-50%);transition:opacity 0.3s; }
    #ms-cursor-ring { position:fixed;width:36px;height:36px;border:1px solid ${accent};border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width 0.3s,height 0.3s,opacity 0.3s; }

    /* Reveal animations */
    .reveal { opacity:0;transform:translateY(28px);transition:opacity 0.75s ease,transform 0.75s ease; }
    .reveal.visible { opacity:1;transform:translateY(0); }
    .reveal-delay-1 { transition-delay:0.1s; }
    .reveal-delay-2 { transition-delay:0.2s; }
    .reveal-delay-3 { transition-delay:0.3s; }

    /* Horizontal rule accent */
    .pro-rule { display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem; }
    .pro-rule::before, .pro-rule::after { content:'';flex:1;height:1px;background:${borderCol}; }
    .pro-rule::before { max-width:40px; }

    /* Service accordion */
    .pro-accordion-item { border-bottom:1px solid ${borderCol};overflow:hidden; }
    .pro-accordion-trigger { display:flex;align-items:center;justify-content:space-between;width:100%;padding:1.75rem 0;background:none;border:none;cursor:pointer;text-align:left; }
    .pro-accordion-body { max-height:0;overflow:hidden;transition:max-height 0.4s ease; }
    .pro-accordion-body.open { max-height:400px; }
    .pro-accordion-icon { width:28px;height:28px;border:1px solid ${borderCol};border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform 0.3s,background 0.3s; }
    .pro-accordion-trigger:hover .pro-accordion-icon { background:${accent};border-color:${accent}; }
  </style>

  <!-- Custom cursor -->
  <div id="ms-cursor-dot"></div>
  <div id="ms-cursor-ring"></div>

${buildStandardNav(businessName, content, navFlags)}

  <!-- ═══════════ HERO: Full-bleed, Ken Burns bg, text anchored bottom-left ═══════════ -->
  <section style="position:relative;min-height:calc(95vh - 64px);display:flex;align-items:flex-end;overflow:hidden;background:${bg}">
    <div style="position:absolute;inset:0;overflow:hidden">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;animation:kenBurns 20s ease-in-out infinite alternate" />
      <div style="position:absolute;inset:0;background:linear-gradient(105deg,rgba(13,13,11,0.82) 0%,rgba(13,13,11,0.45) 55%,rgba(13,13,11,0.15) 100%)"></div>
    </div>

    <div style="position:relative;z-index:2;max-width:1240px;margin:0 auto;padding:0 2.5rem 7rem;width:100%">
      <!-- Eyebrow with flanking lines -->
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem">
        <div style="width:32px;height:1px;background:${accent}"></div>
        <span style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.22em;text-transform:uppercase;color:${accent};font-weight:500">${content.heroEyebrow}</span>
        <div style="width:32px;height:1px;background:${accent}"></div>
      </div>

      <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(3rem,5.5vw,5.5rem);font-weight:400;color:#ffffff;line-height:1.08;margin-bottom:1.75rem;max-width:700px;letter-spacing:-0.01em" class="reveal">${content.tagline}</h1>

      <p style="font-family:var(--body-font);font-size:1.05rem;color:rgba(255,255,255,0.8);max-width:480px;line-height:1.75;margin-bottom:3rem;font-weight:300" class="reveal reveal-delay-1">${content.heroSubtitle}</p>

      <div style="display:flex;align-items:center;gap:1.25rem;flex-wrap:wrap" class="reveal reveal-delay-2">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;padding:1rem 2.5rem;background:${accent};color:#fff;text-decoration:none;transition:opacity 0.3s">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:var(--body-font);font-size:0.8rem;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.8);text-decoration:none;display:flex;align-items:center;gap:0.6rem;transition:opacity 0.3s">${content.ctaSecondary} <span style="font-size:1.1rem">&#8594;</span></a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div style="position:absolute;bottom:2.5rem;right:2.5rem;z-index:2;display:flex;flex-direction:column;align-items:center;gap:0.5rem">
      <div style="width:1px;height:48px;background:linear-gradient(to bottom,${accent},transparent);animation:scrollPulse 2s ease-in-out infinite"></div>
      <span style="font-family:var(--body-font);font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:${accent};writing-mode:vertical-rl">Scroll</span>
    </div>
  </section>

  <!-- ═══════════ STATS RIBBON ═══════════ -->
  <section style="padding:0;background:${accent};overflow:hidden">
    <div class="ms-grid" style="max-width:1240px;margin:0 auto;display:grid;grid-template-columns:repeat(${Math.min(content.stats.length, 4)},1fr)">
      ${content.stats.slice(0, 4).map((s, i) => `
      <div style="padding:2.25rem 2rem;border-right:1px solid rgba(13,13,11,0.15);text-align:center${i === Math.min(content.stats.length, 4) - 1 ? ';border-right:none' : ''}">
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:2.2rem;font-weight:700;color:${bg};line-height:1;margin-bottom:0.35rem">${s.value}</div>
        <div style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.85);font-weight:500">${s.label}</div>
      </div>`).join('')}
    </div>
  </section>

  <!-- ═══════════ SERVICES: Numbered accordion + sticky side image ═══════════ -->
  <section id="services" style="padding:120px 0;background:${bg}">
    <div style="max-width:1240px;margin:0 auto;padding:0 2.5rem">
      <!-- Section label -->
      <div class="reveal" style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
        <div style="width:32px;height:1px;background:${accent}"></div>
        <span style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.22em;text-transform:uppercase;color:${accent};font-weight:500">Our Services</span>
      </div>
      <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:400;color:${textPrimary};margin-bottom:4rem;max-width:560px;line-height:1.2" class="reveal">${content.servicesHeading}</h2>

      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:start">
        <!-- Accordion -->
        <div id="pro-svc-accordion">
          ${content.services.map((s, i) => `
          <div class="pro-accordion-item">
            <button class="pro-accordion-trigger" onclick="(function(btn){var body=btn.nextElementSibling,icon=btn.querySelector('.pro-svc-icon'),isOpen=body.classList.contains('open');document.querySelectorAll('.pro-accordion-body').forEach(function(b){b.classList.remove('open')});document.querySelectorAll('.pro-svc-icon').forEach(function(ic){ic.textContent='+'});if(!isOpen){body.classList.add('open');icon.textContent='&#215;'}var idx=${i};document.querySelectorAll('.pro-svc-img').forEach(function(im,j){im.style.opacity=j===idx?'1':'0';im.style.transform=j===idx?'scale(1)':'scale(1.04)'});})(this)">
              <div style="display:flex;align-items:center;gap:1.5rem">
                <span style="font-family:'Playfair Display',Georgia,serif;font-size:0.7rem;color:${accent};font-weight:400;opacity:0.7;min-width:20px">${String(i + 1).padStart(2, '0')}</span>
                <span style="font-family:'Playfair Display',Georgia,serif;font-size:1.15rem;font-weight:400;color:${textPrimary}">${s.name}</span>
              </div>
              <div class="pro-accordion-icon pro-svc-icon" style="font-size:0.85rem;color:${textPrimary}">+</div>
            </button>
            <div class="pro-accordion-body${i === 0 ? ' open' : ''}">
              <div style="padding:0 0 1.75rem 2.8rem">
                <p style="font-family:var(--body-font);font-size:0.95rem;color:${textMuted};line-height:1.8;margin-bottom:1.25rem">${s.description}</p>
                ${s.tags && s.tags.length > 0 ? `<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1.25rem">${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.35rem 0.85rem;border:1px solid ${borderCol};color:${textMuted}">${t}</span>`).join('')}</div>` : ''}
                <a href="#contact" style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:${accent};text-decoration:none;font-weight:500">Enquire &#8594;</a>
              </div>
            </div>
          </div>`).join('')}
        </div>

        <!-- Sticky image panel -->
        <div class="ms-sticky pro-svc-panel" style="position:sticky;top:120px;aspect-ratio:4/5;overflow:hidden;border:1px solid ${borderCol}">
          ${content.services.map((s, i) => `
          <img src="${stockImages.cards[i] || stockPool[i % stockPool.length]}" alt="${s.name}" class="pro-svc-img" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity 0.6s ease,transform 0.8s ease;opacity:${i === 0 ? '1' : '0'};transform:${i === 0 ? 'scale(1)' : 'scale(1.04)'}" />`).join('')}
          <!-- Overlay label -->
          <div style="position:absolute;bottom:0;left:0;right:0;padding:2rem;background:linear-gradient(to top,rgba(13,13,11,0.85),transparent)">
            <div id="pro-svc-label" style="font-family:'Playfair Display',Georgia,serif;font-size:1.1rem;font-weight:400;color:#ffffff;font-style:italic">${content.services[0]?.name || ''}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════ ABOUT: 2-col, image with offset border + stats grid ═══════════ -->
  <section id="about" style="padding:120px 0;background:${bgAlt}">
    <div class="ms-grid" style="max-width:1240px;margin:0 auto;padding:0 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:center">

      <!-- Left: Image with decorative offset border -->
      <div style="position:relative" class="reveal">
        <div style="position:absolute;top:-20px;left:-20px;right:20px;bottom:20px;border:1px solid ${accent};opacity:0.3;pointer-events:none"></div>
        <img src="${stockImages.about || stockPool[5]}" alt="" style="width:100%;aspect-ratio:3/4;object-fit:cover;display:block;position:relative;z-index:1" />
        <!-- Accent badge -->
        <div style="position:absolute;bottom:-1.5rem;right:-1.5rem;z-index:2;background:${accent};padding:1.25rem 1.75rem">
          <div style="font-family:'Playfair Display',Georgia,serif;font-size:1.8rem;font-weight:700;color:${bg};line-height:1">${content.stats[0]?.value || '20+'}</div>
          <div style="font-family:var(--body-font);font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.85);margin-top:0.2rem">${content.stats[0]?.label || 'Years'}</div>
        </div>
      </div>

      <!-- Right: Heading + text + stats grid -->
      <div>
        <div class="reveal" style="display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem">
          <div style="width:32px;height:1px;background:${accent}"></div>
          <span style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.22em;text-transform:uppercase;color:${accent};font-weight:500">About Us</span>
        </div>
        <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:400;color:${textPrimary};line-height:1.2;margin-bottom:1.5rem" class="reveal">${content.aboutHeading}</h2>
        ${content.aboutMission ? `<p style="font-family:'Playfair Display',Georgia,serif;font-size:1.05rem;color:${textPrimary};line-height:1.65;font-style:italic;margin-bottom:1.5rem;opacity:0.85" class="reveal">${content.aboutMission}</p>` : ''}
        ${content.aboutText.split('\n').filter(Boolean).map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:${textMuted};line-height:1.85;margin-bottom:1rem;font-weight:300" class="reveal">${p}</p>`).join('')}

        <!-- Stats grid -->
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:3rem;padding-top:2.5rem;border-top:1px solid ${borderCol}">
          ${content.stats.slice(1, 5).map(s => `
          <div class="reveal">
            <div style="font-family:'Playfair Display',Georgia,serif;font-size:2rem;font-weight:500;color:${accent};line-height:1;margin-bottom:0.3rem">${s.value}</div>
            <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.08em;text-transform:uppercase;color:${textMuted};font-weight:400">${s.label}</div>
            ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.7rem;color:${textMuted};opacity:0.6;margin-top:0.15rem">${s.sublabel}</div>` : ''}
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════ PROCESS ═══════════ -->
  ${content.processSteps && content.processSteps.length > 0 ? `
  <section style="padding:120px 0;background:${bg}">
    <div style="max-width:1240px;margin:0 auto;padding:0 2.5rem">
      <div class="reveal" style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
        <div style="width:32px;height:1px;background:${accent}"></div>
        <span style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.22em;text-transform:uppercase;color:${accent};font-weight:500">How We Work</span>
      </div>
      <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:400;color:${textPrimary};margin-bottom:5rem;max-width:500px;line-height:1.2" class="reveal">${content.stepsHeading || 'Our Approach'}</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(${Math.min(content.processSteps.length, 4)},1fr);gap:3rem">
        ${content.processSteps.slice(0, 4).map((step, i) => `
        <div class="reveal reveal-delay-${i + 1}" style="position:relative">
          ${i < content.processSteps!.length - 1 ? `<div style="position:absolute;top:1.25rem;left:calc(100% + 1.5rem);width:calc(3rem - 1px);height:1px;background:${borderCol}"></div>` : ''}
          <div style="font-family:'Playfair Display',Georgia,serif;font-size:2.5rem;font-weight:400;color:${accent};opacity:0.35;line-height:1;margin-bottom:1.25rem">${step.step.padStart ? step.step.padStart(2, '0') : step.step}</div>
          <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:1.05rem;font-weight:500;color:${textPrimary};margin-bottom:0.75rem">${step.title}</h3>
          <p style="font-family:var(--body-font);font-size:0.85rem;color:${textMuted};line-height:1.8;font-weight:300">${step.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  <!-- ═══════════ TESTIMONIALS ═══════════ -->
  <section style="padding:120px 0;background:${bgAlt}">
    <div style="max-width:1240px;margin:0 auto;padding:0 2.5rem">
      <div class="reveal" style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
        <div style="width:32px;height:1px;background:${accent}"></div>
        <span style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.22em;text-transform:uppercase;color:${accent};font-weight:500">Client Testimonials</span>
      </div>

      ${content.testimonial ? `
      <!-- Large feature testimonial -->
      <div class="reveal" style="margin-bottom:4rem;padding-bottom:4rem;border-bottom:1px solid ${borderCol}">
        <div style="position:relative;padding-left:4rem">
          <div style="position:absolute;top:-1rem;left:0;font-family:'Playfair Display',Georgia,serif;font-size:6rem;line-height:1;color:${accent};opacity:0.3;font-style:italic">&ldquo;</div>
          <p style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.2rem,2.5vw,1.7rem);font-weight:400;color:${textPrimary};line-height:1.55;font-style:italic;margin-bottom:1.75rem">${content.testimonial.quote}</p>
          <div style="display:flex;align-items:center;gap:1.25rem">
            <div style="width:1px;height:36px;background:${accent}"></div>
            <div>
              <div style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:${textPrimary};letter-spacing:0.04em">${content.testimonial.author}</div>
              ${content.testimonial.rating ? `<div style="color:${accent};font-size:0.75rem;margin-top:0.25rem">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
            </div>
          </div>
        </div>
      </div>` : ''}

      <!-- Secondary testimonials grid -->
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:2rem">
        ${fallbackTestimonials.map(t => `
        <div class="reveal" style="background:${cardBg};border:1px solid ${borderCol};padding:2.5rem">
          <div style="color:${accent};font-size:0.75rem;margin-bottom:1.25rem">${'&#9733;'.repeat(t.rating)}</div>
          <p style="font-family:'Playfair Display',Georgia,serif;font-size:1rem;color:${textPrimary};line-height:1.7;font-style:italic;margin-bottom:1.5rem">"${t.quote}"</p>
          <div style="font-family:var(--body-font);font-size:0.8rem;color:${textMuted};font-weight:500;letter-spacing:0.04em">— ${t.author}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ═══════════ FULL-BLEED IMAGE BREAK ═══════════ -->
  <section style="height:45vh;overflow:hidden;position:relative">
    <img src="${stockPool[6] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
    <div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(13,13,11,0.6),rgba(13,13,11,0.1))"></div>
    <div style="position:absolute;inset:0;display:flex;align-items:center;padding:0 4rem">
      <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(2rem,4vw,3.5rem);font-weight:400;color:#fff;line-height:1.2;font-style:italic;max-width:600px">${content.contactHeading}</h2>
    </div>
  </section>

${buildContactSection(content, locationInfo)}

  <!-- ═══════════ FOOTER ═══════════ -->
  <footer style="padding:5rem 2.5rem 2rem;background:${bgAlt};border-top:1px solid ${borderCol}">
    <div class="ms-grid" style="max-width:1240px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:4rem;margin-bottom:4rem">
      <div>
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:1.6rem;font-weight:400;color:${textPrimary};margin-bottom:0.5rem;letter-spacing:0.02em">${businessName}</div>
        <div style="width:32px;height:1px;background:${accent};margin-bottom:1.25rem"></div>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${textMuted};line-height:1.75;max-width:280px;font-weight:400">${content.heroSubtitle}</p>
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.65rem;letter-spacing:0.18em;text-transform:uppercase;color:${accent};font-weight:600;margin-bottom:1.5rem">Navigate</div>
        <a href="#services" style="display:block;font-family:var(--body-font);font-size:0.85rem;color:${textPrimary};text-decoration:none;margin-bottom:0.75rem;transition:color 0.2s;font-weight:400">Services</a>
        <a href="#about" style="display:block;font-family:var(--body-font);font-size:0.85rem;color:${textPrimary};text-decoration:none;margin-bottom:0.75rem;transition:color 0.2s;font-weight:400">About Us</a>
        <a href="#contact" style="display:block;font-family:var(--body-font);font-size:0.85rem;color:${textPrimary};text-decoration:none;margin-bottom:0.75rem;transition:color 0.2s;font-weight:400">Contact</a>
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.65rem;letter-spacing:0.18em;text-transform:uppercase;color:${accent};font-weight:600;margin-bottom:1.5rem">Services</div>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="display:block;font-family:var(--body-font);font-size:0.85rem;color:${textPrimary};text-decoration:none;margin-bottom:0.75rem;font-weight:400">${s.tags?.[0] || s.name}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.65rem;letter-spacing:0.18em;text-transform:uppercase;color:${accent};font-weight:600;margin-bottom:1.5rem">Legal</div>
        <a href="#" style="display:block;font-family:var(--body-font);font-size:0.85rem;color:${textPrimary};text-decoration:none;margin-bottom:0.75rem;font-weight:400">Privacy Policy</a>
        <a href="#" style="display:block;font-family:var(--body-font);font-size:0.85rem;color:${textPrimary};text-decoration:none;margin-bottom:0.75rem;font-weight:400">Terms of Service</a>
        <div style="margin-top:2rem">
          <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;padding:0.75rem;background:${accent};color:#fff;text-decoration:none;transition:opacity 0.3s">${content.ctaPrimary}</a>
        </div>
      </div>
    </div>
    <div style="max-width:1240px;margin:0 auto;padding-top:2rem;border-top:1px solid ${borderCol};display:flex;align-items:center;justify-content:space-between">
      <div style="font-family:var(--body-font);font-size:0.75rem;color:${textMuted};font-weight:400">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</div>
      <div style="font-family:var(--body-font);font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;color:${textMuted}">Excellence · Integrity · Results</div>
    </div>
  </footer>

  <style>
    @keyframes kenBurns { from { transform:scale(1); } to { transform:scale(1.06); } }
    @keyframes scrollPulse { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
    @media(max-width:768px){.pro-svc-panel{display:none!important}}
  </style>

  <script>
    // Custom cursor
    var dot = document.getElementById('ms-cursor-dot');
    var ring = document.getElementById('ms-cursor-ring');
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function(e){ mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; });
    (function loop(){ rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx+'px'; ring.style.top = ry+'px'; requestAnimationFrame(loop); })();
    document.querySelectorAll('a,button').forEach(function(el){ el.addEventListener('mouseenter',function(){ ring.style.width='56px'; ring.style.height='56px'; ring.style.opacity='0.5'; }); el.addEventListener('mouseleave',function(){ ring.style.width='36px'; ring.style.height='36px'; ring.style.opacity='1'; }); });

    // Scroll reveal
    var obs = new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); } }); }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });
    setTimeout(function(){ document.querySelectorAll('.reveal,.tr-reveal').forEach(function(el){ el.classList.add('visible'); }); }, 600);

    // Accordion: open first item by default + update label
    var firstBody = document.querySelector('.pro-accordion-body');
    if(firstBody) firstBody.classList.add('open');
    var firstIcon = document.querySelector('.pro-svc-icon');
    if(firstIcon) firstIcon.textContent = '×';
  </script>

</body>
</html>`
}


function buildTechDigitalTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  let _pi = 0

  // Futuristic dark palette
  const bg = '#080810'
  const bgAlt = '#0d0d1a'
  const cardBg = '#111122'
  const textPrimary = '#e8e8f0'
  const textMuted = '#bbbbbb'
  const borderCol = 'rgba(120,120,200,0.12)'
  const accent = primaryColor || '#6c63ff'
  const accentGlow = `${accent}40`

  const fallbackTestimonials = getFallbackTestimonials(content, businessCategory)

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark') + `<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"/>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${bg};
      --bg-alt: ${bgAlt};
      --card-bg: ${cardBg};
      --text: ${textPrimary};
      --text-muted: ${textMuted};
      --border: ${borderCol};
      --primary: ${accent};
      --heading-font: 'Space Grotesk', sans-serif;
      --body-font: 'Space Grotesk', sans-serif;
    }

    /* Grain overlay */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.025;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    /* Animated grid background */
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background-image:
        linear-gradient(rgba(120,120,200,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(120,120,200,0.04) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    body { position: relative; }

    /* Custom cursor */
    body { cursor: none; }
    #ms-cursor-dot { position:fixed;width:5px;height:5px;background:${accent};border-radius:50%;pointer-events:none;z-index:10000;transform:translate(-50%,-50%);box-shadow:0 0 8px ${accent}; }
    #ms-cursor-ring { position:fixed;width:32px;height:32px;border:1px solid ${accent};border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width 0.3s,height 0.3s,opacity 0.3s;opacity:0.5; }

    /* Reveal animations */
    .reveal { opacity:0;transform:translateY(24px);transition:opacity 0.7s ease,transform 0.7s ease; }
    .reveal.visible { opacity:1;transform:translateY(0); }
    .reveal-delay-1 { transition-delay:0.1s; }
    .reveal-delay-2 { transition-delay:0.2s; }
    .reveal-delay-3 { transition-delay:0.3s; }
    .reveal-delay-4 { transition-delay:0.4s; }

    /* Glow card */
    .tech-card {
      background: ${cardBg};
      border: 1px solid ${borderCol};
      border-radius: 12px;
      padding: 2.5rem;
      position: relative;
      overflow: hidden;
      transition: border-color 0.4s ease, transform 0.4s ease;
    }
    .tech-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at 30% 30%, ${accentGlow} 0%, transparent 55%);
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    .tech-card:hover { border-color: ${accent}55; transform: translateY(-4px); }
    .tech-card:hover::before { opacity: 1; }

    /* Mono label style */
    .mono-label {
      font-family: 'Space Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: ${accent};
    }

    /* Typewriter cursor blink */
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .tw-cursor { display:inline-block;width:2px;height:1em;background:${accent};margin-left:2px;animation:blink 1s step-end infinite;vertical-align:text-bottom; }

    /* Glowing line */
    .glow-line { height:1px;background:linear-gradient(to right,transparent,${accent},transparent); }

    /* Accordion */
    .tech-accord-body { max-height:0;overflow:hidden;transition:max-height 0.4s cubic-bezier(0.4,0,0.2,1); }
    .tech-accord-body.open { max-height:300px; }

    @media(max-width:768px){
      .td-feat-text{order:1!important}
      .td-feat-img{order:2!important}
      .td-stats-grid{padding-top:0.75rem!important}
    }
  </style>

  <!-- Custom cursor -->
  <div id="ms-cursor-dot"></div>
  <div id="ms-cursor-ring"></div>

${buildStandardNav(businessName, content, navFlags)}

  <!-- ═══════════ HERO: Centered, massive type, animated gradient orb ═══════════ -->
  <section style="position:relative;min-height:calc(100vh - 64px);display:flex;align-items:center;overflow:hidden;background:${bg};z-index:1">

    <!-- Ambient orb -->
    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,${accentGlow} 0%,transparent 65%);pointer-events:none;animation:orbPulse 6s ease-in-out infinite"></div>

    <!-- Floating code fragments -->
    <div style="position:absolute;top:15%;left:5%;font-family:'Space Mono',monospace;font-size:0.65rem;color:rgba(108,99,255,0.2);line-height:1.8;pointer-events:none">
      const init = () =&gt; {<br />&nbsp;&nbsp;deploy();<br />};
    </div>
    <div style="position:absolute;bottom:20%;right:6%;font-family:'Space Mono',monospace;font-size:0.65rem;color:rgba(108,99,255,0.2);line-height:1.8;pointer-events:none;text-align:right">
      &lt;Solution /&gt;<br />// v2.0.0
    </div>

    <div style="position:relative;z-index:2;max-width:1100px;margin:0 auto;padding:0 2.5rem;text-align:center;width:100%">

      ${content.badge ? `<div class="reveal" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:'Space Mono',monospace;font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;padding:0.5rem 1.25rem;border:1px solid ${borderCol};border-radius:999px;color:${accent};margin-bottom:2.5rem">
        <span style="width:6px;height:6px;border-radius:50%;background:${accent};animation:blink 1.5s ease-in-out infinite"></span>
        ${content.badge}
      </div>` : ''}

      <h1 class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(3rem,7vw,6rem);font-weight:700;line-height:1.0;letter-spacing:-0.03em;margin-bottom:1.75rem;color:${textPrimary}">
        ${content.heroAccent ? `<span style="color:${accent}">${content.heroAccent}</span><br /><span style="color:${textPrimary}">${content.tagline}</span>` : content.tagline.replace(' ', `<br />`)}
        <span class="tw-cursor"></span>
      </h1>

      <p class="reveal reveal-delay-1" style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;color:${textMuted};line-height:1.75;max-width:580px;margin:0 auto 3rem;font-weight:300">${content.heroSubtitle}</p>

      <div class="reveal reveal-delay-2" style="display:flex;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap">
        <a href="#contact" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:1rem 2.5rem;background:${accent};color:#fff;border-radius:6px;text-decoration:none;box-shadow:0 0 32px ${accentGlow};transition:box-shadow 0.3s,transform 0.3s">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;padding:1rem 2.5rem;border:1px solid ${borderCol};color:${textPrimary};border-radius:6px;text-decoration:none;transition:border-color 0.3s">${content.ctaSecondary}</a>
      </div>

      ${content.ctaNote ? `<p class="reveal reveal-delay-3 ms-cta-note" style="font-family:'Space Mono',monospace;font-size:0.65rem;color:${textMuted};margin-top:1.25rem;letter-spacing:0.08em">${content.ctaNote}</p>` : ''}
    </div>
  </section>

  <!-- ═══════════ STATS MARQUEE ═══════════ -->
  <div style="position:relative;z-index:1;padding:1.5rem 0;border-top:1px solid ${borderCol};border-bottom:1px solid ${borderCol};background:${bgAlt};overflow:hidden">
    <div style="display:flex;align-items:center;gap:5rem;animation:marquee 20s linear infinite;white-space:nowrap">
      ${[...content.stats, ...content.stats, ...content.stats].map(s => `
      <div style="display:flex;align-items:center;gap:0.75rem;flex-shrink:0">
        <span style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:700;color:${accent}">${s.value}</span>
        <span style="font-family:'Space Mono',monospace;font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:${textMuted}">${s.label}</span>
        <span style="color:${borderCol};font-size:1.2rem">&#47;</span>
      </div>`).join('')}
    </div>
  </div>

  <!-- ═══════════ SERVICES: Cards with glow effect ═══════════ -->
  <section id="services" style="position:relative;padding:120px 0;background:${bg};z-index:1">
    <div style="max-width:1200px;margin:0 auto;padding:0 2.5rem">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:4rem;flex-wrap:wrap;gap:2rem">
        <div>
          <div class="mono-label reveal" style="margin-bottom:1rem">${'// '}${content.heroEyebrow}</div>
          <h2 class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${textPrimary};line-height:1.1;letter-spacing:-0.02em">${content.servicesHeading}</h2>
        </div>
        <a href="#contact" class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${accent};text-decoration:none;display:flex;align-items:center;gap:0.5rem;flex-shrink:0">All Services <span style="font-size:1rem">&#8594;</span></a>
      </div>

      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
        ${content.services.slice(0, Math.min(content.services.length, 6)).map((s, i) => `
        <div class="tech-card reveal reveal-delay-${(i % 3) + 1}">
          <div style="font-family:'Space Mono',monospace;font-size:0.65rem;color:${textMuted};letter-spacing:0.1em;margin-bottom:1.5rem">${String(i + 1).padStart(2, '0')}</div>
          <div style="font-size:1.75rem;margin-bottom:1.25rem;line-height:1">${s.icon || ['⚡', '◈', '⊕', '◉', '⬡', '◇'][i % 6]}</div>
          <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:600;color:${textPrimary};margin-bottom:0.75rem;letter-spacing:-0.01em">${s.name}</h3>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;color:${textMuted};line-height:1.7;margin-bottom:1.5rem;font-weight:300">${s.description}</p>
          ${s.tags && s.tags.length > 0 ? `<div style="display:flex;gap:0.5rem;flex-wrap:wrap">${s.tags.map(t => `<span style="font-family:'Space Mono',monospace;font-size:0.6rem;letter-spacing:0.08em;padding:0.3rem 0.7rem;background:rgba(108,99,255,0.08);border:1px solid ${borderCol};border-radius:4px;color:${accent}">${t}</span>`).join('')}</div>` : ''}
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ═══════════ FEATURE SHOWCASES: Alternating ═══════════ -->
  <section style="position:relative;padding:80px 0 120px;background:${bgAlt};z-index:1">
    <div style="max-width:1200px;margin:0 auto;padding:0 2.5rem">
      <div class="mono-label reveal" style="text-align:center;margin-bottom:1rem">// How We Deliver</div>
      <h2 class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${textPrimary};text-align:center;letter-spacing:-0.02em;margin-bottom:5rem">Built for results</h2>

      ${(content.features || content.services.slice(0, 3)).map((item, i) => `
      <div class="ms-grid reveal" style="display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:center;margin-bottom:${i < 2 ? '6rem' : '0'}">
        ${i % 2 === 0 ? `
        <div class="td-feat-text">
          <div style="font-family:'Space Mono',monospace;font-size:0.65rem;color:${accent};letter-spacing:0.15em;margin-bottom:1rem">FEATURE ${String(i + 1).padStart(2, '0')}</div>
          <h3 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(1.5rem,2.5vw,2rem);font-weight:700;color:${textPrimary};line-height:1.2;letter-spacing:-0.02em;margin-bottom:1rem">${item.name}</h3>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.95rem;color:${textMuted};line-height:1.8;margin-bottom:1.75rem;font-weight:300">${item.description}</p>
          <a href="#contact" style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${accent};text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem">${content.ctaPrimary} <span>&#8594;</span></a>
        </div>
        <div class="td-feat-img" style="position:relative;border-radius:12px;overflow:hidden;border:1px solid ${borderCol}">
          <img src="${stockImages.cards[i] || stockPool[i]}" alt="" style="width:100%;height:360px;object-fit:cover;display:block" />
          <div style="position:absolute;inset:0;background:linear-gradient(135deg,${accentGlow} 0%,transparent 60%)"></div>
        </div>
        ` : `
        <div class="td-feat-img" style="position:relative;border-radius:12px;overflow:hidden;border:1px solid ${borderCol}">
          <img src="${stockImages.cards[i] || stockPool[i]}" alt="" style="width:100%;height:360px;object-fit:cover;display:block" />
          <div style="position:absolute;inset:0;background:linear-gradient(225deg,${accentGlow} 0%,transparent 60%)"></div>
        </div>
        <div class="td-feat-text">
          <div style="font-family:'Space Mono',monospace;font-size:0.65rem;color:${accent};letter-spacing:0.15em;margin-bottom:1rem">FEATURE ${String(i + 1).padStart(2, '0')}</div>
          <h3 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(1.5rem,2.5vw,2rem);font-weight:700;color:${textPrimary};line-height:1.2;letter-spacing:-0.02em;margin-bottom:1rem">${item.name}</h3>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.95rem;color:${textMuted};line-height:1.8;margin-bottom:1.75rem;font-weight:300">${item.description}</p>
          <a href="#contact" style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${accent};text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem">${content.ctaPrimary} <span>&#8594;</span></a>
        </div>`}
      </div>`).join('')}
    </div>
  </section>

  <!-- ═══════════ ABOUT + PROCESS ═══════════ -->
  <section id="about" style="position:relative;padding:120px 0;background:${bg};z-index:1">
    <div style="max-width:1200px;margin:0 auto;padding:0 2.5rem">
      <div class="glow-line reveal" style="margin-bottom:5rem"></div>

      <!-- About 2-col -->
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:start;margin-bottom:7rem">
        <div>
          <div class="mono-label reveal" style="margin-bottom:1rem">// About Us</div>
          <h2 class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:${textPrimary};line-height:1.1;letter-spacing:-0.02em;margin-bottom:2rem">${content.aboutHeading}</h2>
          ${content.aboutMission ? `<p class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:1rem;color:${accent};line-height:1.7;margin-bottom:1.5rem;font-weight:500">${content.aboutMission}</p>` : ''}
          ${content.aboutText.split('\n').filter(Boolean).map(p => `<p class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:0.95rem;color:${textMuted};line-height:1.8;margin-bottom:1rem;font-weight:300">${p}</p>`).join('')}
        </div>
        <!-- Stats grid -->
        <div class="ms-grid td-stats-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;padding-top:3rem">
          ${content.stats.slice(0, 4).map(s => `
          <div class="tech-card reveal">
            <div style="font-family:'Space Grotesk',sans-serif;font-size:2.2rem;font-weight:700;color:${accent};letter-spacing:-0.03em;line-height:1;margin-bottom:0.5rem">${s.value}</div>
            <div class="mono-label" style="color:${textMuted};font-size:0.6rem">${s.label}</div>
            ${s.sublabel ? `<div style="font-family:'Space Mono',monospace;font-size:0.6rem;color:${textMuted};opacity:0.5;margin-top:0.25rem">${s.sublabel}</div>` : ''}
          </div>`).join('')}
        </div>
      </div>

      <!-- Process steps -->
      ${content.processSteps && content.processSteps.length > 0 ? `
      <div class="glow-line reveal" style="margin-bottom:5rem"></div>
      <div class="mono-label reveal" style="text-align:center;margin-bottom:1rem">// The Process</div>
      <h2 class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:${textPrimary};text-align:center;letter-spacing:-0.02em;margin-bottom:4rem">${content.stepsHeading || 'How We Work'}</h2>
      <div class="ms-flex" style="display:flex;align-items:start;gap:0">
        ${content.processSteps.slice(0, 4).map((step, i, arr) => `
        <div class="reveal reveal-delay-${i + 1}" style="flex:1;text-align:center;padding:0 1.5rem;position:relative">
          ${i < arr.length - 1 ? `<div style="position:absolute;top:2rem;left:calc(50% + 2.5rem);right:calc(-50% + 2.5rem);height:1px;background:linear-gradient(to right,${accent}60,${accent}20)"></div>` : ''}
          <div style="width:64px;height:64px;border-radius:50%;border:1px solid ${accent};display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;position:relative;z-index:1;background:${bg}">
            <span style="font-family:'Space Mono',monospace;font-size:0.8rem;color:${accent};font-weight:700">${String(i + 1).padStart(2, '0')}</span>
          </div>
          <h3 style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:600;color:${textPrimary};margin-bottom:0.6rem;letter-spacing:-0.01em">${step.title}</h3>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.82rem;color:${textMuted};line-height:1.7;font-weight:300">${step.description}</p>
        </div>`).join('')}
      </div>` : ''}
    </div>
  </section>

  <!-- ═══════════ TESTIMONIALS ═══════════ -->
  <section style="position:relative;padding:120px 0;background:${bgAlt};z-index:1">
    <div style="max-width:1200px;margin:0 auto;padding:0 2.5rem">
      <div class="mono-label reveal" style="text-align:center;margin-bottom:1rem">// Social Proof</div>
      <h2 class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${textPrimary};text-align:center;letter-spacing:-0.02em;margin-bottom:4rem">What clients say</h2>

      ${content.testimonial ? `
      <div class="reveal" style="background:linear-gradient(135deg,${cardBg},${bg});border:1px solid ${borderCol};border-radius:16px;padding:4rem;margin-bottom:2rem;position:relative;overflow:hidden">
        <div style="position:absolute;top:2rem;right:3rem;font-family:'Space Grotesk',sans-serif;font-size:6rem;font-weight:700;color:${accentGlow};line-height:1;pointer-events:none">"</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center">
          <div>
            <p style="font-family:'Space Grotesk',sans-serif;font-size:1.15rem;color:${textPrimary};line-height:1.65;margin-bottom:2rem;font-weight:300">"${content.testimonial.quote}"</p>
            <div style="display:flex;align-items:center;gap:1rem">
              <div style="width:40px;height:40px;border-radius:50%;background:${accent};display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Space Grotesk',sans-serif;font-size:0.85rem;font-weight:600;flex-shrink:0">${content.testimonial.author.charAt(0)}</div>
              <div>
                <div style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:600;color:${textPrimary}">${content.testimonial.author}</div>
                ${content.testimonial.rating ? `<div style="color:${accent};font-size:0.7rem;margin-top:0.2rem">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
              </div>
            </div>
          </div>
          <div style="border-radius:12px;overflow:hidden;border:1px solid ${borderCol}">
            <img src="${stockPool[4] || heroImg}" alt="" style="width:100%;height:260px;object-fit:cover;display:block" />
          </div>
        </div>
      </div>` : ''}

      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
        ${fallbackTestimonials.map(t => `
        <div class="tech-card reveal">
          <div style="color:${accent};font-size:0.75rem;margin-bottom:1.25rem">${'&#9733;'.repeat(t.rating)}</div>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.95rem;color:${textMuted};line-height:1.7;margin-bottom:1.5rem;font-weight:300">"${t.quote}"</p>
          <div style="font-family:'Space Mono',monospace;font-size:0.65rem;color:${textMuted};letter-spacing:0.08em">— ${t.author}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ═══════════ FINAL CTA BAND ═══════════ -->
  <section style="position:relative;padding:140px 0;background:${bg};overflow:hidden;z-index:1">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at center,${accentGlow} 0%,transparent 65%);pointer-events:none"></div>
    <div style="position:relative;z-index:2;max-width:800px;margin:0 auto;padding:0 2.5rem;text-align:center">
      <div class="mono-label reveal" style="margin-bottom:1.5rem">// Ready When You Are</div>
      <h2 class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,5vw,4rem);font-weight:700;color:${textPrimary};line-height:1.05;letter-spacing:-0.03em;margin-bottom:2rem">Let's build something <span style="color:${accent}">remarkable</span></h2>
      <p class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:1rem;color:${textMuted};line-height:1.75;margin-bottom:3rem;font-weight:300">${content.heroSubtitle}</p>
      <div class="reveal" style="display:flex;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap">
        <a href="#contact" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:1.1rem 2.75rem;background:${accent};color:#fff;border-radius:6px;text-decoration:none;box-shadow:0 0 40px ${accentGlow}">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;padding:1.1rem 2.75rem;border:1px solid ${borderCol};color:${textPrimary};border-radius:6px;text-decoration:none">${content.ctaSecondary}</a>
      </div>
    </div>
  </section>

${buildContactSection(content, locationInfo)}

${buildFooter(businessName, content, 'dark')}

  <style>
    @keyframes orbPulse { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.6} 50%{transform:translate(-50%,-50%) scale(1.1);opacity:1} }
    @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  </style>

  <script>
    // Custom cursor
    var dot = document.getElementById('ms-cursor-dot');
    var ring = document.getElementById('ms-cursor-ring');
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function(e){ mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; });
    (function loop(){ rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1; ring.style.left = rx+'px'; ring.style.top = ry+'px'; requestAnimationFrame(loop); })();
    document.querySelectorAll('a,button').forEach(function(el){ el.addEventListener('mouseenter',function(){ ring.style.width='52px'; ring.style.height='52px'; ring.style.opacity='0.8'; }); el.addEventListener('mouseleave',function(){ ring.style.width='32px'; ring.style.height='32px'; ring.style.opacity='0.5'; }); });

    // Scroll reveal
    var obs = new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); } }); }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });
    setTimeout(function(){ document.querySelectorAll('.reveal,.tr-reveal').forEach(function(el){ el.classList.add('visible'); }); }, 600);
  </script>

</body>
</html>`
}

function buildTradesTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about
  let _pi = 0
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
    images[4] || stockImages.cards[3],
    stockImages.cards[4],
    stockImages.cards[5],
  ]

  const trBg = '#f9f7f4'
  const trAlt = '#f0ece5'
  const trDark = '#1c1a17'
  const trText = '#2a2620'
  const trMuted = '#7a7068'
  const trAccent = primaryColor || '#c8480a'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')

  const extraFonts = `<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>`

  // Grain overlay + custom CSS
  const extraStyles = `
  <style>
    :root {
      --bg: ${trBg};
      --bg-alt: ${trAlt};
      --card-bg: #ffffff;
      --text: ${trText};
      --text-muted: ${trMuted};
      --border: rgba(0,0,0,0.08);
      --heading-font: 'Oswald', sans-serif;
      --body-font: 'Inter', sans-serif;
    }
    body::before {
      content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.025;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }
    .tr-reveal { opacity:0; transform:translateY(28px); transition:opacity 0.7s ease, transform 0.7s ease; }
    .tr-reveal.visible { opacity:1; transform:translateY(0); }
    .tr-service-card:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(0,0,0,0.12); }
    .tr-service-card { transition:transform 0.35s ease, box-shadow 0.35s ease; }
    .tr-step-num { font-family:'Oswald',sans-serif; font-size:5rem; font-weight:700; color:${trAccent}; line-height:1; opacity:0.15; position:absolute; top:-1.5rem; left:-0.5rem; pointer-events:none; }
    @keyframes kbzoom { 0%{transform:scale(1)} 100%{transform:scale(1.06)} }
    .tr-hero-img { animation: kbzoom 12s ease-in-out infinite alternate; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
    .tr-fade1 { animation: fadeUp 0.9s ease forwards; }
    .tr-fade2 { animation: fadeUp 0.9s 0.2s ease both; }
    .tr-fade3 { animation: fadeUp 0.9s 0.4s ease both; }
    .tr-tag { display:inline-block; font-family:'Inter',sans-serif; font-size:0.7rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; padding:0.3rem 0.75rem; border:1px solid rgba(0,0,0,0.18); border-radius:2px; color:${trMuted}; }
    .tr-cta-primary { display:inline-flex; align-items:center; gap:0.5rem; font-family:'Inter',sans-serif; font-size:0.875rem; font-weight:600; letter-spacing:0.04em; padding:0.9rem 2.25rem; background:${trAccent}; color:#fff; text-decoration:none; transition:opacity 0.25s; }
    .tr-cta-primary:hover { opacity:0.88; }
    .tr-cta-ghost { display:inline-flex; align-items:center; gap:0.5rem; font-family:'Inter',sans-serif; font-size:0.875rem; font-weight:600; letter-spacing:0.04em; padding:0.9rem 2.25rem; background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,0.55); text-decoration:none; transition:border-color 0.25s; }
    .tr-cta-ghost:hover { border-color:#fff; }
    .tr-input { width:100%; box-sizing:border-box; font-family:'Inter',sans-serif; font-size:0.9rem; padding:0.85rem 0 0.85rem; background:transparent; border:none; border-bottom:1.5px solid rgba(0,0,0,0.2); color:${trText}; outline:none; transition:border-color 0.25s; }
    .tr-input:focus { border-bottom-color:${trAccent}; }
    .tr-input::placeholder { color:${trMuted}; }
    @media(max-width:768px){
      .tr-cred-strip{grid-template-columns:1fr 1fr!important}
      .tr-step-num-el{left:0.5rem!important;top:0!important}
      .tr-about-text{padding:0 1.25rem!important}
      .tr-gallery>*:nth-child(n+3){display:none!important}
    }
  </style>`

  // Nav
  const nav = buildStandardNav(businessName, content, navFlags)

  // HERO — full-bleed with Ken Burns, diagonal cut at bottom, large Oswald heading
  const heroSection = `
  <section style="position:relative;min-height:calc(92vh - 64px);display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;background:${trDark}">
    <div style="position:absolute;inset:0;overflow:hidden">
      <img src="${heroImg}" alt="" class="tr-hero-img" style="width:100%;height:100%;object-fit:cover;opacity:0.55" />
      <div style="position:absolute;inset:0;background:linear-gradient(160deg,rgba(28,26,23,0.3) 0%,rgba(28,26,23,0.85) 70%)"></div>
    </div>
    <!-- diagonal bottom cut -->
    <div style="position:absolute;bottom:-2px;left:0;right:0;height:80px;background:${trBg};clip-path:polygon(0 100%,100% 100%,100% 0)"></div>
    <div style="position:relative;max-width:1240px;margin:0 auto;padding:0 2rem 7rem;width:100%">
      <div class="tr-fade1" style="display:flex;align-items:center;gap:1rem;margin-bottom:1.75rem">
        <div style="width:36px;height:2px;background:${trAccent}"></div>
        <span style="font-family:'Inter',sans-serif;font-size:0.75rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.7)">${content.heroEyebrow}</span>
      </div>
      <h1 class="tr-fade2" style="font-family:'Oswald',sans-serif;font-size:clamp(3rem,7vw,6rem);font-weight:700;color:#fff;line-height:1.0;letter-spacing:0.01em;text-transform:uppercase;margin-bottom:1.5rem;max-width:820px">${content.tagline}</h1>
      <p class="tr-fade3" style="font-family:'Inter',sans-serif;font-size:1.05rem;color:rgba(255,255,255,0.72);max-width:540px;line-height:1.75;margin-bottom:2.5rem">${content.heroSubtitle}</p>
      <div style="display:flex;gap:1rem;flex-wrap:wrap">
        <a href="#contact" class="tr-cta-primary">${content.ctaPrimary} &rarr;</a>
        <a href="#services" class="tr-cta-ghost">${content.ctaSecondary || 'See Our Work'}</a>
      </div>
    </div>
  </section>`

  // CREDENTIALS STRIP — dark band, 4 stats
  const credStrip = `
  <section style="background:${trDark};padding:0 2rem">
    <div class="tr-cred-strip" style="max-width:1240px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,255,255,0.06)">
      ${content.stats.slice(0, 4).map((s, i) => `
      <div style="padding:2.5rem 1.5rem;${i < 3 ? 'border-right:1px solid rgba(255,255,255,0.06)' : ''}">
        <div style="font-family:'Oswald',sans-serif;font-size:2.5rem;font-weight:700;color:${trAccent};line-height:1;margin-bottom:0.35rem">${s.value}</div>
        <div style="font-family:'Inter',sans-serif;font-size:0.8rem;font-weight:500;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.08em">${s.label}</div>
        ${s.sublabel ? `<div style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.3);margin-top:0.2rem">${s.sublabel}</div>` : ''}
      </div>`).join('')}
    </div>
  </section>`

  // SERVICES — editorial two-column grid, numbered, with image
  const servicesSection = `
  <section id="services" style="padding:100px 2rem;background:${trBg}">
    <div style="max-width:1240px;margin:0 auto">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:4rem;flex-wrap:wrap;gap:1.5rem">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
            <div style="width:28px;height:2px;background:${trAccent}"></div>
            <span style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${trMuted}">What We Do</span>
          </div>
          <h2 style="font-family:'Oswald',sans-serif;font-size:clamp(2.2rem,4.5vw,3.8rem);font-weight:700;color:${trText};text-transform:uppercase;line-height:1.05">${content.servicesHeading}</h2>
        </div>
        <a href="#contact" class="tr-cta-primary" style="background:${trAccent};color:#fff">${content.ctaPrimary} &rarr;</a>
      </div>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5px;background:${trBg}">
        ${content.services.slice(0, 6).map((s, i) => `
        <div class="tr-service-card tr-reveal" style="background:${trBg};padding:2.5rem 2rem;position:relative;overflow:hidden">
          <span class="tr-step-num tr-step-num-el">${String(i + 1).padStart(2, '0')}</span>
          <div style="margin-bottom:1.25rem">
            <span style="font-family:'Inter',sans-serif;font-size:1.5rem">${mapIcon(s.icon, i)}</span>
          </div>
          <h3 style="font-family:'Oswald',sans-serif;font-size:1.3rem;font-weight:600;color:${trText};text-transform:uppercase;letter-spacing:0.03em;margin-bottom:0.75rem">${s.name}</h3>
          <p style="font-family:'Inter',sans-serif;font-size:0.875rem;color:${trMuted};line-height:1.75;margin-bottom:1.25rem">${s.description}</p>
          <div style="display:flex;gap:0.4rem;flex-wrap:wrap">
            ${s.tags.slice(0, 2).map(t => `<span class="tr-tag">${t}</span>`).join('')}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // PROCESS — horizontal steps on dark background, angled connector lines
  const processSteps = content.processSteps || content.services.slice(0, 4).map((s, i) => ({
    step: String(i + 1),
    title: s.name,
    description: s.description,
  }))
  const processSection = `
  <section style="padding:100px 2rem;background:${trDark}">
    <div style="max-width:1240px;margin:0 auto">
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
        <div style="width:28px;height:2px;background:${trAccent}"></div>
        <span style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.4)">How It Works</span>
      </div>
      <h2 style="font-family:'Oswald',sans-serif;font-size:clamp(2rem,4vw,3.2rem);font-weight:700;color:#fff;text-transform:uppercase;margin-bottom:4rem">${content.stepsHeading || 'Our Process'}</h2>
      <div class="ms-flex" style="display:flex;gap:0;align-items:stretch">
        ${processSteps.slice(0, 4).map((step, i) => `
        <div style="flex:1;padding:2.5rem 2rem;border-left:1px solid rgba(255,255,255,0.08);${i === 0 ? 'border-left:none' : ''}">
          <div style="font-family:'Oswald',sans-serif;font-size:3.5rem;font-weight:700;color:${trAccent};opacity:0.4;line-height:1;margin-bottom:1.5rem">${String(i + 1).padStart(2, '0')}</div>
          <h3 style="font-family:'Oswald',sans-serif;font-size:1.1rem;font-weight:600;color:#fff;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.75rem">${step.title}</h3>
          <p style="font-family:'Inter',sans-serif;font-size:0.85rem;color:rgba(255,255,255,0.45);line-height:1.75">${step.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // ABOUT — asymmetric: image 60%, text 40% with offset border detail
  const aboutParagraphs = content.aboutText.split('\n').filter(p => p.trim())
  const aboutSection = `
  <section id="about" style="padding:100px 2rem;background:${trBg}">
    <div class="ms-grid" style="max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1.1fr 1fr;gap:5rem;align-items:center">
      <div style="position:relative">
        <div style="position:absolute;top:-20px;left:-20px;right:20px;bottom:20px;border:2px solid ${trAccent};opacity:0.25;pointer-events:none"></div>
        <div class="ms-img" style="height:580px;overflow:hidden">
          <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div style="position:absolute;bottom:-2rem;right:-2rem;background:${trDark};padding:1.5rem 2rem">
          <div style="font-family:'Oswald',sans-serif;font-size:2rem;font-weight:700;color:${trAccent}">${content.stats[0]?.value || '15+'}</div>
          <div style="font-family:'Inter',sans-serif;font-size:0.75rem;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.08em;margin-top:0.2rem">${content.stats[0]?.label || 'Years Experience'}</div>
        </div>
      </div>
      <div class="tr-about-text">
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
          <div style="width:28px;height:2px;background:${trAccent}"></div>
          <span style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${trMuted}">About Us</span>
        </div>
        <h2 style="font-family:'Oswald',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${trText};text-transform:uppercase;line-height:1.05;margin-bottom:1.5rem">${content.aboutHeading}</h2>
        ${content.aboutMission ? `<p style="font-family:'Inter',sans-serif;font-size:1.05rem;font-style:italic;color:${trText};line-height:1.65;margin-bottom:1.25rem;border-left:3px solid ${trAccent};padding-left:1.25rem">${content.aboutMission}</p>` : ''}
        ${aboutParagraphs.map(p => `<p style="font-family:'Inter',sans-serif;font-size:0.9rem;color:${trMuted};line-height:1.8;margin-bottom:1rem">${p}</p>`).join('')}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;margin-top:2rem">
          ${content.services.map(s => s.tags).flat().slice(0, 6).map(t => `
          <div style="display:flex;align-items:center;gap:0.6rem">
            <div style="width:6px;height:6px;background:${trAccent};flex-shrink:0"></div>
            <span style="font-family:'Inter',sans-serif;font-size:0.82rem;color:${trText};font-weight:500">${t}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>`

  // PROJECT SHOWCASE — full-width image grid, 3 columns with hover caption overlay
  const projectSection = `
  <section style="padding:100px 2rem;background:${trAlt}">
    <div style="max-width:1240px;margin:0 auto">
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
        <div style="width:28px;height:2px;background:${trAccent}"></div>
        <span style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${trMuted}">Recent Work</span>
      </div>
      <h2 style="font-family:'Oswald',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${trText};text-transform:uppercase;margin-bottom:3rem">${content.galleryHeading || 'Projects'}</h2>
      <div class="ms-grid tr-gallery" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5px;background:rgba(0,0,0,0.07)">
        ${serviceImgs.slice(0, 6).map((img, i) => `
        <div style="position:relative;overflow:hidden;background:${trDark}">
          <div class="ms-img" style="height:300px;overflow:hidden">
            <img src="${img || stockPool[_pi++]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.07)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="position:absolute;bottom:0;left:0;right:0;padding:1.25rem 1.5rem;background:linear-gradient(transparent,rgba(0,0,0,0.75));pointer-events:none">
            <div style="font-family:'Oswald',sans-serif;font-size:0.9rem;font-weight:600;color:#fff;text-transform:uppercase;letter-spacing:0.05em">${content.projectCaptions?.[i] || content.services[i % content.services.length]?.name || 'Project'}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // TESTIMONIALS — dark bg, 3 cards, large italic quote
  const testimonialSection = content.testimonial ? `
  <section id="testimonials" style="padding:100px 2rem;background:${trDark}">
    <div style="max-width:1240px;margin:0 auto">
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
        <div style="width:28px;height:2px;background:${trAccent}"></div>
        <span style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.35)">Testimonials</span>
      </div>
      <h2 style="font-family:'Oswald',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:#fff;text-transform:uppercase;margin-bottom:3.5rem">What Clients Say</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.06)">
        ${[content.testimonial, ...getFallbackTestimonials(content, businessCategory)].slice(0, 3).map((t, i) => `
        <div style="background:${trDark};padding:2.5rem 2rem">
          <div style="font-size:3rem;line-height:1;color:${trAccent};opacity:0.5;margin-bottom:1rem;font-family:Georgia,serif">&ldquo;</div>
          <p style="font-family:'Inter',sans-serif;font-size:0.925rem;font-style:italic;color:rgba(255,255,255,0.65);line-height:1.8;margin-bottom:1.75rem">${t.quote}</p>
          <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:1.25rem">
            <div style="font-family:'Oswald',sans-serif;font-size:0.95rem;font-weight:600;color:#fff;text-transform:uppercase;letter-spacing:0.04em">${t.author.split(',')[0]}</div>
            <div style="font-family:'Inter',sans-serif;font-size:0.78rem;color:rgba(255,255,255,0.35);margin-top:0.2rem">${t.author.split(',')[1]?.trim() || 'Customer'}</div>
            <div style="color:${trAccent};font-size:0.8rem;margin-top:0.4rem">${'&#9733;'.repeat(t.rating || 5)}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  // CONTACT — 2-col, underline inputs, dark panel left
  const contactSection = `
  <section id="contact" style="padding:0;background:${trBg}">
    <div class="ms-grid" style="max-width:100%;display:grid;grid-template-columns:1fr 1.4fr">
      <div style="background:${trDark};padding:5rem 3rem;display:flex;flex-direction:column;justify-content:center">
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
          <div style="width:28px;height:2px;background:${trAccent}"></div>
          <span style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.35)">Contact</span>
        </div>
        <h2 style="font-family:'Oswald',sans-serif;font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:#fff;text-transform:uppercase;line-height:1.05;margin-bottom:2rem">${content.contactHeading}</h2>
        <p style="font-family:'Inter',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.45);line-height:1.75;margin-bottom:2.5rem;max-width:340px">${content.heroSubtitle}</p>
        <div style="display:flex;flex-direction:column;gap:1.5rem">
          <div style="display:flex;align-items:center;gap:1rem">
            <div style="width:40px;height:40px;border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;color:${trAccent};font-size:1rem;flex-shrink:0">&#9742;</div>
            <div>
              <div style="font-family:'Inter',sans-serif;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.3);margin-bottom:0.25rem">Phone</div>
              <div style="font-family:'Inter',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.75)">${locationInfo.phone}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:1rem">
            <div style="width:40px;height:40px;border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;color:${trAccent};font-size:1rem;flex-shrink:0">&#9993;</div>
            <div>
              <div style="font-family:'Inter',sans-serif;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.3);margin-bottom:0.25rem">Email</div>
              <div style="font-family:'Inter',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.75)">hello@${businessName.toLowerCase().replace(/\s+/g, '')}.com</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:1rem">
            <div style="width:40px;height:40px;border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;color:${trAccent};font-size:1rem;flex-shrink:0">&#9906;</div>
            <div>
              <div style="font-family:'Inter',sans-serif;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.3);margin-bottom:0.25rem">Service Area</div>
              <div style="font-family:'Inter',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.75)">${locationInfo.city} &amp; surrounds</div>
            </div>
          </div>
          ${content.contactHours ? `
          <div style="display:flex;align-items:center;gap:1rem">
            <div style="width:40px;height:40px;border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;color:${trAccent};font-size:1rem;flex-shrink:0">&#9200;</div>
            <div>
              <div style="font-family:'Inter',sans-serif;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.3);margin-bottom:0.25rem">Hours</div>
              <div style="font-family:'Inter',sans-serif;font-size:0.85rem;color:rgba(255,255,255,0.75)">${content.contactHours.replace(/ · /g, '<br />')}</div>
            </div>
          </div>` : ''}
        </div>
      </div>
      <div style="padding:5rem 4rem;background:${trBg}">
        <h3 style="font-family:'Oswald',sans-serif;font-size:1.5rem;font-weight:600;color:${trText};text-transform:uppercase;letter-spacing:0.03em;margin-bottom:0.5rem">Get a Free Quote</h3>
        <p style="font-family:'Inter',sans-serif;font-size:0.85rem;color:${trMuted};margin-bottom:2.5rem">Tell us about your project — we'll get back to you within 24 hours.</p>
        <form style="display:flex;flex-direction:column;gap:2rem" onsubmit="return false">
          <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:2rem">
            <div>
              <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${trMuted};display:block;margin-bottom:0.5rem">Name</label>
              <input type="text" placeholder="Your name" class="tr-input" />
            </div>
            <div>
              <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${trMuted};display:block;margin-bottom:0.5rem">Phone</label>
              <input type="tel" placeholder="${locationInfo.phone}" class="tr-input" />
            </div>
          </div>
          <div>
            <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${trMuted};display:block;margin-bottom:0.5rem">Email</label>
            <input type="email" placeholder="your@email.com" class="tr-input" />
          </div>
          <div>
            <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${trMuted};display:block;margin-bottom:0.5rem">Project Details</label>
            <textarea placeholder="Describe your project..." rows="5" class="tr-input" style="resize:none"></textarea>
          </div>
          <button type="submit" class="tr-cta-primary" style="align-self:flex-start;background:${trAccent};color:#fff;border:none;cursor:pointer;font-size:0.875rem;letter-spacing:0.04em;padding:1rem 2.5rem">${content.ctaPrimary} &rarr;</button>
        </form>
      </div>
    </div>
  </section>`

  // FOOTER
  const trFooter = `
  <footer style="padding:3.5rem 2rem 2rem;background:${trDark};border-top:1px solid rgba(255,255,255,0.05)">
    <div class="ms-grid" style="max-width:1240px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem">
      <div>
        <div style="font-family:'Oswald',sans-serif;font-size:1.5rem;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.75rem">${businessName}</div>
        <p style="font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.35);line-height:1.7;max-width:280px">${content.heroSubtitle}</p>
      </div>
      <div>
        <div style="font-family:'Inter',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:1.25rem">Services</div>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.6rem;transition:color 0.2s" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.45)'">${s.tags?.[0] || s.name}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:'Inter',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:1.25rem">Company</div>
        <a href="#about" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.6rem">About</a>
        <a href="#testimonials" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.6rem">Testimonials</a>
        <a href="#contact" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.6rem">Contact</a>
      </div>
      <div>
        <div style="font-family:'Inter',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:1.25rem">Contact</div>
        <p style="font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);margin-bottom:0.5rem">&#9742; ${locationInfo.phone}</p>
        <p style="font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);margin-bottom:0.5rem">&#9993; hello@${businessName.toLowerCase().replace(/\s+/g, '')}.com</p>
        <p style="font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45)">${locationInfo.city}</p>
      </div>
    </div>
    <div style="max-width:1240px;margin:0 auto;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
      <p style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.2)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      <div style="display:flex;gap:1.5rem">
        <a href="#" style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.2);text-decoration:none">Privacy Policy</a>
        <a href="#" style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.2);text-decoration:none">Terms</a>
      </div>
    </div>
  </footer>
  <script>
    const revealEls = document.querySelectorAll('.tr-reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));
  setTimeout(function(){ document.querySelectorAll('.reveal,.tr-reveal').forEach(function(el){ el.classList.add('visible'); }); }, 600);
  </script>`

  return `${headHtml}${extraFonts}${extraStyles}
${nav}
${heroSection}
${credStrip}
${servicesSection}
${processSection}
${aboutSection}
${projectSection}
${testimonialSection}
${contactSection}
${trFooter}
</body>
</html>`
}


function buildHomeServicesTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about
  let _pi = 0
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
    images[4] || stockImages.cards[3],
  ]

  const hmCream = '#faf8f5'
  const hmSage = '#e8ede6'
  const hmDeep = '#2d3a2e'
  const hmText = '#1e2920'
  const hmMuted = '#6b7d6c'
  const hmAccent = primaryColor || '#3d6b42'
  const hmWarm = '#f5f0e8'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')

  const extraFonts = `<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500&display=swap" rel="stylesheet"/>`

  const extraStyles = `
  <style>
    :root {
      --bg: ${hmCream};
      --bg-alt: ${hmSage};
      --card-bg: #fff;
      --text: ${hmText};
      --text-muted: ${hmMuted};
      --border: rgba(0,0,0,0.07);
      --heading-font: 'DM Serif Display', Georgia, serif;
      --body-font: 'Poppins', sans-serif;
    }
    body::before {
      content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.018;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }
    @keyframes hmFadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
    @keyframes hmKenBurns { 0%{transform:scale(1)} 100%{transform:scale(1.05)} }
    .hm-fade1 { animation: hmFadeUp 0.9s ease forwards; }
    .hm-fade2 { animation: hmFadeUp 0.9s 0.18s ease both; }
    .hm-fade3 { animation: hmFadeUp 0.9s 0.36s ease both; }
    .hm-hero-bg { animation: hmKenBurns 14s ease-in-out infinite alternate; }
    .hm-reveal { opacity:0; transform:translateY(24px); transition:opacity 0.65s ease, transform 0.65s ease; }
    .hm-reveal.visible { opacity:1; transform:translateY(0); }
    .hm-card { transition:transform 0.35s ease, box-shadow 0.35s ease; }
    .hm-card:hover { transform:translateY(-5px); box-shadow:0 16px 48px rgba(0,0,0,0.1); }
    .hm-chip { display:inline-flex; align-items:center; gap:0.4rem; font-family:'Poppins',sans-serif; font-size:0.7rem; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; padding:0.35rem 0.9rem; border-radius:999px; background:rgba(61,107,66,0.1); color:${hmAccent}; }
    .hm-pill-cta { display:inline-flex; align-items:center; gap:0.5rem; font-family:'Poppins',sans-serif; font-size:0.875rem; font-weight:600; padding:0.9rem 2.25rem; border-radius:999px; background:${hmAccent}; color:#fff; text-decoration:none; transition:background 0.25s; }
    .hm-pill-cta:hover { background:${hmDeep}; }
    .hm-pill-ghost { display:inline-flex; align-items:center; gap:0.5rem; font-family:'Poppins',sans-serif; font-size:0.875rem; font-weight:600; padding:0.9rem 2.25rem; border-radius:999px; background:transparent; color:#fff; border:2px solid rgba(255,255,255,0.5); text-decoration:none; transition:border-color 0.25s; }
    .hm-pill-ghost:hover { border-color:#fff; }
    .hm-step-connector { flex:0 0 1px; background:rgba(0,0,0,0.12); align-self:stretch; margin:0 -0.5px; }
    .hm-input { width:100%; box-sizing:border-box; font-family:'Poppins',sans-serif; font-size:0.875rem; padding:1rem 1.25rem; background:#fff; border:1.5px solid rgba(0,0,0,0.1); border-radius:12px; color:${hmText}; outline:none; transition:border-color 0.25s; }
    .hm-input:focus { border-color:${hmAccent}; }
    .hm-input::placeholder { color:${hmMuted}; }
    @media(max-width:768px){
      .hm-hero-section{grid-template-columns:1fr!important}
      .hm-hero-img-col{display:none!important}
      .hm-about-img-col{display:none!important}
      .hm-about-text{padding:0 1.25rem!important}
    }
  </style>`

  const nav = buildStandardNav(businessName, content, navFlags)

  // HERO — warm split: sage-green illustrated left panel, full-bleed photo right
  const heroSection = `
  <section class="hm-hero-section" style="position:relative;min-height:88vh;overflow:hidden;display:grid;grid-template-columns:1fr 1fr">
    <!-- Left: warm cream/sage content panel -->
    <div style="background:linear-gradient(160deg,${hmCream} 0%,${hmSage} 100%);display:flex;flex-direction:column;justify-content:center;padding:5rem 3.5rem 5rem 4rem;position:relative;z-index:1">
      <div class="hm-fade1" style="margin-bottom:1.5rem">
        <span class="hm-chip">&#127968; ${content.heroEyebrow}</span>
      </div>
      <h1 class="hm-fade2" style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:400;font-style:italic;color:${hmText};line-height:1.15;margin-bottom:1.25rem;max-width:480px">${content.tagline}</h1>
      <p class="hm-fade3" style="font-family:'Poppins',sans-serif;font-size:0.975rem;color:${hmMuted};line-height:1.8;max-width:420px;margin-bottom:2.25rem">${content.heroSubtitle}</p>
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:3rem">
        <a href="#contact" class="hm-pill-cta" style="background:${hmAccent}">${content.ctaPrimary}</a>
        <a href="#services" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:'Poppins',sans-serif;font-size:0.875rem;font-weight:600;padding:0.9rem 2.25rem;border-radius:999px;background:transparent;color:${hmText};border:2px solid rgba(0,0,0,0.15);text-decoration:none">${content.ctaSecondary || 'Our Services'}</a>
      </div>
      <!-- mini trust strip -->
      <div style="display:flex;gap:2rem;flex-wrap:wrap">
        ${content.stats.slice(0, 3).map(s => `
        <div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.6rem;color:${hmAccent}">${s.value}</div>
          <div style="font-family:'Poppins',sans-serif;font-size:0.72rem;font-weight:500;color:${hmMuted};text-transform:uppercase;letter-spacing:0.06em">${s.label}</div>
        </div>`).join('')}
      </div>
      <!-- decorative circle -->
      <div style="position:absolute;top:-80px;right:-80px;width:280px;height:280px;border-radius:50%;border:60px solid rgba(61,107,66,0.07);pointer-events:none"></div>
    </div>
    <!-- Right: Ken Burns photo -->
    <div class="hm-hero-img-col" style="position:relative;overflow:hidden">
      <img src="${heroImg}" alt="" class="hm-hero-bg" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(90deg,${hmSage} 0%,transparent 25%)"></div>
      <!-- floating badge -->
      <div style="position:absolute;top:2.5rem;right:2.5rem;background:#fff;border-radius:16px;padding:1rem 1.5rem;box-shadow:0 8px 32px rgba(0,0,0,0.12);display:flex;align-items:center;gap:0.75rem">
        <div style="width:40px;height:40px;border-radius:50%;background:${hmAccent};display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:#fff">&#10003;</div>
        <div>
          <div style="font-family:'Poppins',sans-serif;font-size:0.82rem;font-weight:600;color:${hmText}">${content.badge || 'Trusted & Insured'}</div>
          <div style="font-family:'Poppins',sans-serif;font-size:0.7rem;color:${hmMuted}">${content.stats[3]?.value || '500+'} happy clients</div>
        </div>
      </div>
    </div>
  </section>`

  // SERVICES — card grid with photo tops, organic rounded corners
  const servicesSection = `
  <section id="services" style="padding:100px 2rem;background:${hmCream}">
    <div style="max-width:1200px;margin:0 auto">
      <div style="text-align:center;margin-bottom:4rem">
        <span class="hm-chip" style="margin-bottom:1rem;display:inline-flex">${content.heroEyebrow}</span>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2rem,4vw,3rem);font-weight:400;color:${hmText};margin:0.5rem 0 1rem">${content.servicesHeading}</h2>
        <p style="font-family:'Poppins',sans-serif;font-size:0.95rem;color:${hmMuted};max-width:520px;margin:0 auto;line-height:1.75">${content.aboutMission || content.heroSubtitle}</p>
      </div>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem">
        ${content.services.slice(0, 4).map((s, i) => `
        <div class="hm-card hm-reveal" style="background:#fff;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.05)">
          <div class="ms-img" style="height:195px;overflow:hidden;position:relative">
            <img src="${serviceImgs[i] || stockPool[_pi++]}" alt="${s.name}" style="width:100%;height:100%;object-fit:cover" />
            <div style="position:absolute;top:1rem;left:1rem">
              <span class="hm-chip" style="background:rgba(255,255,255,0.9);color:${hmAccent};backdrop-filter:blur(8px)">${s.tags?.[0] || ''}</span>
            </div>
          </div>
          <div style="padding:1.5rem">
            <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:${hmText};margin-bottom:0.6rem">${s.name}</h3>
            <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:${hmMuted};line-height:1.75;margin-bottom:1.25rem">${s.description}</p>
            <a href="#contact" style="font-family:'Poppins',sans-serif;font-size:0.8rem;font-weight:600;color:${hmAccent};text-decoration:none;display:inline-flex;align-items:center;gap:0.35rem">Get a Quote &rarr;</a>
          </div>
        </div>`).join('')}
      </div>
      ${content.services.length > 4 ? `
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(${Math.min(content.services.length - 4, 3)},1fr);gap:1.5rem;margin-top:1.5rem">
        ${content.services.slice(4, 7).map((s, i) => `
        <div class="hm-card hm-reveal" style="background:#fff;border-radius:20px;padding:2rem;border:1px solid rgba(0,0,0,0.05);display:flex;gap:1.25rem;align-items:flex-start">
          <div style="width:48px;height:48px;border-radius:14px;background:rgba(61,107,66,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.2rem;color:${hmAccent}">${mapIcon(s.icon, i + 4)}</div>
          <div>
            <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:${hmText};margin-bottom:0.4rem">${s.name}</h3>
            <p style="font-family:'Poppins',sans-serif;font-size:0.8rem;color:${hmMuted};line-height:1.7">${s.description}</p>
          </div>
        </div>`).join('')}
      </div>` : ''}
    </div>
  </section>`

  // HOW IT WORKS — horizontal steps, warm background, friendly icons
  const processSteps = content.processSteps || content.services.slice(0, 3).map((s, i) => ({
    step: String(i + 1),
    title: s.name,
    description: s.description,
  }))
  const stepEmoji = ['&#128222;', '&#128203;', '&#127968;', '&#10003;']
  const processSection = `
  <section style="padding:90px 2rem;background:${hmWarm}">
    <div style="max-width:1200px;margin:0 auto;text-align:center">
      <span class="hm-chip" style="margin-bottom:1rem;display:inline-flex">Simple Process</span>
      <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2rem,4vw,3rem);font-weight:400;color:${hmText};margin-bottom:4rem">${content.stepsHeading || 'How It Works'}</h2>
      <div class="ms-flex" style="display:flex;align-items:flex-start;gap:0">
        ${processSteps.slice(0, 4).map((step, i) => `${i > 0 ? `
        <div class="ms-arrow" style="flex:0 0 48px;display:flex;align-items:center;justify-content:center;padding-top:2rem">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="${hmMuted}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>` : ''}
        <div style="flex:1;padding:2.5rem 1.5rem;background:#fff;border-radius:20px;border:1px solid rgba(0,0,0,0.06);text-align:center">
          <div style="width:64px;height:64px;border-radius:50%;background:${hmSage};display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;font-size:1.6rem">${stepEmoji[i]}</div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:0.85rem;color:${hmAccent};font-style:italic;margin-bottom:0.25rem">Step ${step.step}</div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:${hmText};margin-bottom:0.6rem">${step.title}</h3>
          <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:${hmMuted};line-height:1.75">${step.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // ABOUT — photo right, warm left, bullet benefits, soft rounded image
  const aboutParagraphs = content.aboutText.split('\n').filter(p => p.trim())
  const aboutSection = `
  <section id="about" style="padding:100px 2rem;background:${hmCream}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center">
      <div class="hm-about-text">
        <span class="hm-chip" style="margin-bottom:1.25rem;display:inline-flex">Our Story</span>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2rem,4vw,3rem);font-weight:400;font-style:italic;color:${hmText};line-height:1.2;margin-bottom:1.5rem">${content.aboutHeading}</h2>
        ${content.aboutMission ? `<p style="font-family:'Poppins',sans-serif;font-size:1rem;font-weight:500;color:${hmText};line-height:1.7;margin-bottom:1.5rem;padding:1.25rem 1.5rem;background:${hmSage};border-radius:12px;border-left:3px solid ${hmAccent}">${content.aboutMission}</p>` : ''}
        ${aboutParagraphs.map(p => `<p style="font-family:'Poppins',sans-serif;font-size:0.9rem;color:${hmMuted};line-height:1.85;margin-bottom:1rem">${p}</p>`).join('')}
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-top:2rem">
          ${content.services.map(s => s.tags).flat().slice(0, 6).map(t => `
          <div style="display:flex;align-items:center;gap:0.6rem">
            <div style="width:20px;height:20px;border-radius:50%;background:rgba(61,107,66,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <span style="color:${hmAccent};font-size:0.7rem;font-weight:700">&#10003;</span>
            </div>
            <span style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:${hmText};font-weight:500">${t}</span>
          </div>`).join('')}
        </div>
        <div style="margin-top:2.5rem">
          <a href="#contact" class="hm-pill-cta" style="background:${hmAccent}">${content.ctaPrimary}</a>
        </div>
      </div>
      <div class="hm-about-img-col" style="position:relative">
        <div style="border-radius:24px;overflow:hidden;height:520px">
          <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <!-- Stats grid overlay -->
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-top:1.25rem">
          ${content.stats.slice(0, 4).map(s => `
          <div style="background:#fff;border-radius:14px;padding:1.25rem 1.5rem;border:1px solid rgba(0,0,0,0.05)">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.8rem;color:${hmAccent}">${s.value}</div>
            <div style="font-family:'Poppins',sans-serif;font-size:0.75rem;font-weight:500;color:${hmMuted};margin-top:0.2rem">${s.label}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>`

  // TESTIMONIALS — soft cards with avatar initials, stars, italic quote
  const testimonialSection = content.testimonial ? `
  <section id="testimonials" style="padding:90px 2rem;background:${hmSage}">
    <div style="max-width:1200px;margin:0 auto;text-align:center">
      <span class="hm-chip" style="margin-bottom:1rem;display:inline-flex">Reviews</span>
      <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2rem,4vw,3rem);font-weight:400;color:${hmText};margin-bottom:3.5rem">What Our Clients Say</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;text-align:left">
        ${[content.testimonial, ...getFallbackTestimonials(content, businessCategory)].slice(0, 3).map((t, i) => `
        <div class="hm-card hm-reveal" style="background:#fff;border-radius:20px;padding:2rem;border:1px solid rgba(0,0,0,0.05);position:relative">
          <div style="font-size:2.5rem;line-height:1;font-family:'DM Serif Display',Georgia,serif;color:${hmAccent};opacity:0.3;position:absolute;top:1.5rem;right:1.75rem">&ldquo;</div>
          <div style="color:#f59e0b;font-size:0.9rem;margin-bottom:1rem">${'&#9733;'.repeat(t.rating || 5)}</div>
          <p style="font-family:'Poppins',sans-serif;font-size:0.9rem;font-style:italic;color:${hmMuted};line-height:1.8;margin-bottom:1.5rem">"${t.quote}"</p>
          <div style="display:flex;align-items:center;gap:0.75rem;border-top:1px solid rgba(0,0,0,0.06);padding-top:1.25rem">
            <div style="width:40px;height:40px;border-radius:50%;background:${hmSage};display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:${hmAccent}">${t.author.charAt(0)}</span>
            </div>
            <div>
              <div style="font-family:'Poppins',sans-serif;font-size:0.85rem;font-weight:600;color:${hmText}">${t.author.split(',')[0]}</div>
              <div style="font-family:'Poppins',sans-serif;font-size:0.75rem;color:${hmMuted}">${t.author.split(',')[1]?.trim() || 'Happy Client'}</div>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  // CTA BANNER — warm full-width, friendly tone
  const ctaBanner = `
  <section style="padding:80px 2rem;background:${hmAccent}">
    <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:2rem">
      <div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:400;font-style:italic;color:#fff;line-height:1.2;margin-bottom:0.5rem">${content.aboutMission || content.heroSubtitle}</h2>
        <p class="ms-cta-note" style="font-family:'Poppins',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.7)">${content.ctaNote || 'No obligation. Fast response.'}</p>
      </div>
      <a href="#contact" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:'Poppins',sans-serif;font-size:0.875rem;font-weight:600;padding:1rem 2.5rem;border-radius:999px;background:#fff;color:${hmAccent};text-decoration:none;white-space:nowrap">${content.ctaPrimary} &rarr;</a>
    </div>
  </section>`

  // CONTACT — 2-col warm layout
  const contactSection = `
  <section id="contact" style="padding:100px 2rem;background:${hmCream}">
    <div style="max-width:1200px;margin:0 auto">
      <div style="text-align:center;margin-bottom:3.5rem">
        <span class="hm-chip" style="margin-bottom:1rem;display:inline-flex">Get In Touch</span>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2rem,4vw,3rem);font-weight:400;color:${hmText}">${content.contactHeading}</h2>
      </div>
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:start">
        <div style="display:flex;flex-direction:column;gap:1.5rem">
          ${[
            { icon: '&#9742;', label: 'Phone', value: locationInfo.phone },
            { icon: '&#9993;', label: 'Email', value: `hello@${businessName.toLowerCase().replace(/\s+/g, '')}.com` },
            { icon: '&#9906;', label: 'Service Area', value: `${locationInfo.city} & surrounds` },
          ].map(item => `
          <div style="display:flex;gap:1rem;align-items:flex-start;padding:1.5rem;background:#fff;border-radius:16px;border:1px solid rgba(0,0,0,0.06)">
            <div style="width:44px;height:44px;border-radius:12px;background:${hmSage};display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;color:${hmAccent}">${item.icon}</div>
            <div>
              <div style="font-family:'Poppins',sans-serif;font-size:0.72rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:${hmMuted};margin-bottom:0.25rem">${item.label}</div>
              <div style="font-family:'Poppins',sans-serif;font-size:0.9rem;color:${hmText};font-weight:500">${item.value}</div>
            </div>
          </div>`).join('')}
          ${content.contactHours ? `
          <div style="display:flex;gap:1rem;align-items:flex-start;padding:1.5rem;background:#fff;border-radius:16px;border:1px solid rgba(0,0,0,0.06)">
            <div style="width:44px;height:44px;border-radius:12px;background:${hmSage};display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;color:${hmAccent}">&#9200;</div>
            <div>
              <div style="font-family:'Poppins',sans-serif;font-size:0.72rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:${hmMuted};margin-bottom:0.25rem">Hours</div>
              <div style="font-family:'Poppins',sans-serif;font-size:0.875rem;color:${hmText}">${content.contactHours.replace(/ · /g, '<br />')}</div>
            </div>
          </div>` : ''}
        </div>
        <div style="background:#fff;border-radius:24px;padding:2.5rem;border:1px solid rgba(0,0,0,0.06)">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:${hmText};margin-bottom:0.4rem">Send Us a Message</h3>
          <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:${hmMuted};margin-bottom:1.75rem">We'll respond within 2 hours during business hours.</p>
          <form style="display:flex;flex-direction:column;gap:1.25rem" onsubmit="return false">
            <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
              <input type="text" placeholder="Your name" class="hm-input" />
              <input type="tel" placeholder="Phone number" class="hm-input" />
            </div>
            <input type="email" placeholder="Email address" class="hm-input" />
            <textarea placeholder="Tell us about your needs..." rows="4" class="hm-input" style="resize:none"></textarea>
            <button type="submit" style="font-family:'Poppins',sans-serif;font-size:0.875rem;font-weight:600;padding:1rem 2rem;border-radius:999px;background:${hmAccent};color:#fff;border:none;cursor:pointer;transition:background 0.25s;width:100%">${content.ctaPrimary} &rarr;</button>
          </form>
        </div>
      </div>
    </div>
  </section>`

  // FOOTER
  const hmFooter = `
  <footer style="padding:4rem 2rem 2rem;background:${hmDeep};border-top:1px solid rgba(255,255,255,0.05)">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem">
      <div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;margin-bottom:0.75rem">${businessName}</div>
        <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);line-height:1.7;max-width:280px;margin-bottom:1.5rem">${content.heroSubtitle}</p>
        <a href="#contact" class="hm-pill-cta" style="font-size:0.8rem;padding:0.7rem 1.75rem">${content.ctaPrimary}</a>
      </div>
      <div>
        <div style="font-family:'Poppins',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:1.25rem">Services</div>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="display:block;font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.55rem">${s.tags?.[0] || s.name}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:'Poppins',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:1.25rem">Company</div>
        <a href="#about" style="display:block;font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.55rem">About</a>
        <a href="#testimonials" style="display:block;font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.55rem">Reviews</a>
        <a href="#contact" style="display:block;font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.55rem">Contact</a>
      </div>
      <div>
        <div style="font-family:'Poppins',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:1.25rem">Contact</div>
        <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);margin-bottom:0.5rem">&#9742; ${locationInfo.phone}</p>
        <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);margin-bottom:0.5rem">&#9993; hello@${businessName.toLowerCase().replace(/\s+/g, '')}.com</p>
        <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45)">${locationInfo.city}</p>
      </div>
    </div>
    <div style="max-width:1200px;margin:0 auto;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
      <p style="font-family:'Poppins',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.2)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      <div style="display:flex;gap:1.5rem">
        <a href="#" style="font-family:'Poppins',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.2);text-decoration:none">Privacy Policy</a>
        <a href="#" style="font-family:'Poppins',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.2);text-decoration:none">Terms</a>
      </div>
    </div>
  </footer>
  <script>
    const hmEls = document.querySelectorAll('.hm-reveal');
    const hmObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); hmObs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    hmEls.forEach(el => hmObs.observe(el));
  </script>`

  return `${headHtml}${extraFonts}${extraStyles}
${nav}
${heroSection}
${servicesSection}
${processSection}
${aboutSection}
${testimonialSection}
${ctaBanner}
${contactSection}
${hmFooter}
</body>
</html>`
}


function buildAutomotiveTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about
  let _pi = 0
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
    images[4] || stockImages.cards[3],
    stockImages.cards[4] || stockImages.cards[0],
    stockImages.cards[5] || stockImages.cards[1],
    stockImages.cards[0],
    stockImages.cards[2],
  ]

  const autoBg = '#0a0a0a'
  const autoAlt = '#111111'
  const autoCard = '#141414'
  const autoText = '#f0ede8'
  const autoMuted = '#ffffff'
  const autoBorder = 'rgba(255,255,255,0.07)'
  const autoAccent = primaryColor || '#e63b1e'
  const autoAccentDim = 'rgba(230,59,30,0.12)'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark')

  const extraFonts = `<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet"/>`

  const extraStyles = `
  <style>
    :root {
      --bg: ${autoBg};
      --bg-alt: ${autoAlt};
      --card-bg: ${autoCard};
      --text: ${autoText};
      --text-muted: ${autoMuted};
      --border: ${autoBorder};
      --heading-font: 'Barlow Condensed', sans-serif;
      --body-font: 'Barlow', sans-serif;
    }
    body::before {
      content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.03;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }
    @keyframes autoKB { 0%{transform:scale(1)} 100%{transform:scale(1.08)} }
    @keyframes autoFadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scanline { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
    .auto-bg { animation: autoKB 16s ease-in-out infinite alternate; }
    .auto-f1 { animation: autoFadeUp 1s ease forwards; }
    .auto-f2 { animation: autoFadeUp 1s 0.2s ease both; }
    .auto-f3 { animation: autoFadeUp 1s 0.4s ease both; }
    .auto-reveal { opacity:0; transform:translateY(24px); transition:opacity 0.65s ease, transform 0.65s ease; }
    .auto-reveal.visible { opacity:1; transform:translateY(0); }
    .auto-card { transition:border-color 0.3s ease, transform 0.3s ease; }
    .auto-card:hover { border-color:${autoAccent} !important; transform:translateY(-3px); }
    .auto-service-row { border-bottom:1px solid ${autoBorder}; transition:background 0.25s; cursor:default; }
    .auto-service-row:hover { background:rgba(255,255,255,0.02); }
    .auto-cta { display:inline-flex; align-items:center; gap:0.5rem; font-family:'Barlow Condensed',sans-serif; font-size:0.95rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:0.85rem 2.5rem; background:${autoAccent}; color:#fff; text-decoration:none; clip-path:polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); transition:opacity 0.25s; border:none; cursor:pointer; }
    .auto-cta:hover { opacity:0.88; }
    .auto-cta-outline { display:inline-flex; align-items:center; gap:0.5rem; font-family:'Barlow Condensed',sans-serif; font-size:0.95rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:0.85rem 2.5rem; background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,0.3); text-decoration:none; clip-path:polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); transition:border-color 0.25s; }
    .auto-cta-outline:hover { border-color:#fff; }
    .auto-badge { display:inline-flex; align-items:center; gap:0.4rem; font-family:'Barlow Condensed',sans-serif; font-size:0.72rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; padding:0.3rem 0.85rem; background:${autoAccentDim}; border:1px solid rgba(230,59,30,0.3); color:${autoAccent}; }
    .auto-input { width:100%; box-sizing:border-box; font-family:'Barlow',sans-serif; font-size:0.9rem; padding:0.85rem 1rem; background:transparent; border:none; border-bottom:1px solid rgba(255,255,255,0.15); color:${autoText}; outline:none; transition:border-color 0.25s; }
    .auto-input:focus { border-bottom-color:${autoAccent}; }
    .auto-input::placeholder { color:${autoMuted}; }
    /* scanline accent on hero */
    .auto-scanline { position:absolute; top:0; left:0; width:2px; height:100%; background:linear-gradient(180deg,transparent,${autoAccent},transparent); animation: scanline 4s ease-in-out infinite; opacity:0.35; pointer-events:none; }
  </style>`

  const nav = buildStandardNav(businessName, content, navFlags)

  // HERO — full-bleed cinematic, angular overlays, bold condensed type
  const heroSection = `
  <section style="position:relative;min-height:calc(100vh - 64px);display:flex;align-items:flex-end;overflow:hidden;background:${autoBg}">
    <div style="position:absolute;inset:0;overflow:hidden">
      <img src="${heroImg}" alt="" class="auto-bg" style="width:100%;height:100%;object-fit:cover;opacity:0.45" />
      <div style="position:absolute;inset:0;background:linear-gradient(175deg,transparent 0%,rgba(0,0,0,0.5) 50%,rgba(10,10,10,0.95) 85%)"></div>
      <!-- angular accent line -->
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden">
        <div style="position:absolute;top:0;left:0;width:3px;height:40%;background:linear-gradient(180deg,${autoAccent},transparent)"></div>
      </div>
    </div>
    <div style="position:relative;max-width:1300px;margin:0 auto;padding:0 2rem 6rem;width:100%">
      <div class="auto-f1" style="margin-bottom:1.5rem">
        <span class="auto-badge">&#9632; ${content.heroEyebrow}</span>
      </div>
      <h1 class="auto-f2" style="font-family:'Barlow Condensed',sans-serif;font-size:clamp(3.5rem,9vw,8.5rem);font-weight:800;color:#fff;line-height:0.92;letter-spacing:-0.01em;text-transform:uppercase;margin-bottom:1.75rem;max-width:900px">${content.tagline}</h1>
      <p class="auto-f3" style="font-family:'Barlow',sans-serif;font-size:1.05rem;color:#ffffff;max-width:500px;line-height:1.7;margin-bottom:2.5rem">${content.heroSubtitle}</p>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:4rem">
        <a href="#contact" class="auto-cta">${content.ctaPrimary}</a>
        <a href="#services" class="auto-cta-outline">${content.ctaSecondary || 'View Services'}</a>
      </div>
      <!-- stat row at bottom -->
      <div style="display:flex;gap:3rem;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.08);flex-wrap:wrap">
        ${content.stats.slice(0, 4).map(s => `
        <div>
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:1.75rem;font-weight:700;color:${autoAccent};letter-spacing:0.02em">${s.value}</div>
          <div style="font-family:'Barlow',sans-serif;font-size:0.75rem;color:#ffffff;text-transform:uppercase;letter-spacing:0.08em;margin-top:0.1rem">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // SERVICES — full-width list rows, left image swap on hover (sticky), performance feel
  const servicesSection = `
  <section id="services" style="padding:0;background:${autoBg}">
    <div style="max-width:1300px;margin:0 auto;padding:80px 2rem">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3.5rem;flex-wrap:wrap;gap:1.5rem">
        <div>
          <span class="auto-badge" style="margin-bottom:0.75rem;display:inline-flex">Services</span>
          <h2 style="font-family:'Barlow Condensed',sans-serif;font-size:clamp(2.5rem,5vw,4.5rem);font-weight:800;color:${autoText};text-transform:uppercase;letter-spacing:-0.01em;line-height:1">${content.servicesHeading}</h2>
        </div>
        <a href="#contact" class="auto-cta">${content.ctaPrimary}</a>
      </div>
      <!-- sticky left image + accordion-style rows -->
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start">
        <div class="ms-sticky" style="position:sticky;top:80px">
          <div style="aspect-ratio:4/3;overflow:hidden">
            <img src="${serviceImgs[0]}" alt="" id="auto-svc-img" style="width:100%;height:100%;object-fit:cover;transition:opacity 0.4s ease" />
          </div>
          <div style="border:1px solid ${autoBorder};border-top:none;padding:1.5rem">
            <div style="font-family:'Barlow Condensed',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${autoMuted}">Currently viewing</div>
            <div id="auto-svc-name" style="font-family:'Barlow Condensed',sans-serif;font-size:1.15rem;font-weight:700;color:${autoText};margin-top:0.25rem">${content.services[0]?.name || ''}</div>
          </div>
        </div>
        <div>
          ${content.services.slice(0, 6).map((s, i) => `
          <div class="auto-service-row" style="padding:1.75rem 0;border-bottom:1px solid ${autoBorder}"
               onmouseover="
                 var img=document.getElementById('auto-svc-img');
                 var nm=document.getElementById('auto-svc-name');
                 img.style.opacity='0';
                 setTimeout(function(){img.src='${serviceImgs[i] || stockPool[_pi++]}';img.style.opacity='1';},200);
                 nm.textContent='${s.name.replace(/'/g, "\\'")}';
               ">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem">
              <div style="display:flex;align-items:center;gap:1.5rem">
                <div style="font-family:'Barlow Condensed',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;color:${autoAccent};min-width:2.5rem">${String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h3 style="font-family:'Barlow Condensed',sans-serif;font-size:1.3rem;font-weight:700;color:${autoText};text-transform:uppercase;letter-spacing:0.03em;margin-bottom:0.3rem">${s.name}</h3>
                  <p style="font-family:'Barlow',sans-serif;font-size:0.875rem;color:${autoMuted};line-height:1.65">${s.description}</p>
                </div>
              </div>
              <div style="color:${autoMuted};font-size:1.25rem;flex-shrink:0">&rsaquo;</div>
            </div>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.75rem;padding-left:4rem">
              ${s.tags.slice(0, 3).map(t => `<span style="font-family:'Barlow',sans-serif;font-size:0.72rem;padding:0.25rem 0.65rem;border:1px solid ${autoBorder};color:${autoMuted}">${t}</span>`).join('')}
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>`

  // PERFORMANCE STATS — dark panel, large numbers
  const statsSection = `
  <section style="padding:80px 2rem;background:${autoAlt};border-top:1px solid ${autoBorder};border-bottom:1px solid ${autoBorder}">
    <div style="max-width:1300px;margin:0 auto">
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid ${autoBorder}">
        ${content.stats.slice(0, 4).map((s, i) => `
        <div style="padding:3rem 2rem;text-align:center;${i < 3 ? `border-right:1px solid ${autoBorder}` : ''}">
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:3.5rem;font-weight:800;color:${autoAccent};letter-spacing:-0.02em;line-height:1;margin-bottom:0.5rem">${s.value}</div>
          <div style="font-family:'Barlow',sans-serif;font-size:0.75rem;font-weight:500;color:${autoMuted};text-transform:uppercase;letter-spacing:0.1em">${s.label}</div>
          ${s.sublabel ? `<div style="font-family:'Barlow',sans-serif;font-size:0.7rem;color:rgba(255,255,255,0.75);margin-top:0.25rem">${s.sublabel}</div>` : ''}
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // ABOUT — full-bleed split: photo left 60%, text right 40%, red accent border
  const aboutParagraphs = content.aboutText.split('\n').filter(p => p.trim())
  const aboutSection = `
  <section id="about" style="padding:0;background:${autoBg}">
    <div class="ms-grid" style="display:grid;grid-template-columns:1.4fr 1fr">
      <div style="position:relative;min-height:600px;overflow:hidden">
        <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" />
        <div style="position:absolute;inset:0;background:linear-gradient(90deg,transparent 60%,${autoBg} 100%)"></div>
        <!-- accent stripe -->
        <div style="position:absolute;top:0;left:0;width:4px;height:100%;background:${autoAccent}"></div>
      </div>
      <div style="padding:5rem 3.5rem;display:flex;flex-direction:column;justify-content:center">
        <span class="auto-badge" style="margin-bottom:1.25rem;display:inline-flex">About Us</span>
        <h2 style="font-family:'Barlow Condensed',sans-serif;font-size:clamp(2.5rem,4.5vw,3.8rem);font-weight:800;color:${autoText};text-transform:uppercase;letter-spacing:-0.01em;line-height:1;margin-bottom:1.5rem">${content.aboutHeading}</h2>
        ${content.aboutMission ? `<p style="font-family:'Barlow',sans-serif;font-size:1rem;font-style:italic;color:${autoText};line-height:1.7;margin-bottom:1.25rem;padding-left:1.25rem;border-left:3px solid ${autoAccent}">${content.aboutMission}</p>` : ''}
        ${aboutParagraphs.map(p => `<p style="font-family:'Barlow',sans-serif;font-size:0.9rem;color:${autoMuted};line-height:1.8;margin-bottom:0.85rem">${p}</p>`).join('')}
        <div style="display:flex;flex-direction:column;gap:0.6rem;margin-top:1.5rem">
          ${content.services.map(s => s.tags).flat().slice(0, 5).map(t => `
          <div style="display:flex;align-items:center;gap:0.75rem">
            <div style="width:4px;height:4px;background:${autoAccent};flex-shrink:0"></div>
            <span style="font-family:'Barlow',sans-serif;font-size:0.875rem;color:${autoText}">${t}</span>
          </div>`).join('')}
        </div>
        <div style="margin-top:2.5rem">
          <a href="#contact" class="auto-cta">${content.ctaPrimary}</a>
        </div>
      </div>
    </div>
  </section>`

  // GALLERY / PRODUCT CARDS — tight dark grid
  const gallerySection = `
  <section style="padding:80px 2rem;background:${autoAlt}">
    <div style="max-width:1300px;margin:0 auto">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3rem;flex-wrap:wrap;gap:1rem">
        <div>
          <span class="auto-badge" style="margin-bottom:0.75rem;display:inline-flex">Gallery</span>
          <h2 style="font-family:'Barlow Condensed',sans-serif;font-size:clamp(2rem,4vw,3.2rem);font-weight:800;color:${autoText};text-transform:uppercase;letter-spacing:-0.01em;line-height:1">${content.galleryHeading || 'Our Work'}</h2>
        </div>
      </div>
      <div class="ms-grid" style="display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:230px 230px;gap:3px">
        <div style="position:relative;overflow:hidden;grid-row:span 2" class="auto-reveal">
          <img src="${serviceImgs[3] || stockPool[_pi++]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
          <div style="position:absolute;bottom:0;left:0;right:0;padding:1.5rem;background:linear-gradient(transparent,rgba(0,0,0,0.8))">
            <div style="font-family:'Barlow Condensed',sans-serif;font-size:1rem;font-weight:700;color:#fff;text-transform:uppercase">${content.services[3]?.name || content.services[0]?.name || ''}</div>
          </div>
        </div>
        ${serviceImgs.slice(4, 8).map((img, i) => `
        <div style="position:relative;overflow:hidden" class="auto-reveal">
          <img src="${img || stockPool[_pi++]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'" />
          <div style="position:absolute;inset:0;background:rgba(0,0,0,0);transition:background 0.3s" onmouseover="this.style.background='rgba(230,59,30,0.15)'" onmouseout="this.style.background='rgba(0,0,0,0)'"></div>
          <div style="position:absolute;bottom:0.75rem;left:0.75rem">
            <div style="font-family:'Barlow Condensed',sans-serif;font-size:0.8rem;font-weight:700;color:#fff;text-transform:uppercase;text-shadow:0 1px 4px rgba(0,0,0,0.7)">${content.services[(i + 4) % content.services.length]?.name || ''}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // TESTIMONIALS — dark, angled quote marks, minimal
  const testimonialSection = content.testimonial ? `
  <section style="padding:80px 2rem;background:${autoBg};border-top:1px solid ${autoBorder}">
    <div style="max-width:1300px;margin:0 auto">
      <span class="auto-badge" style="margin-bottom:2rem;display:inline-flex">Customer Reviews</span>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:${autoBorder}">
        ${[content.testimonial, ...getFallbackTestimonials(content, businessCategory)].slice(0, 3).map((t, i) => `
        <div class="auto-reveal" style="background:${autoBg};padding:2.5rem 2rem">
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:4rem;font-weight:800;color:${autoAccent};opacity:0.2;line-height:0.8;margin-bottom:1.25rem">&ldquo;</div>
          <p style="font-family:'Barlow',sans-serif;font-size:0.925rem;color:#ffffff;line-height:1.8;font-style:italic;margin-bottom:1.75rem">${t.quote}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid ${autoBorder};padding-top:1.25rem">
            <div>
              <div style="font-family:'Barlow Condensed',sans-serif;font-size:0.9rem;font-weight:700;color:${autoText};text-transform:uppercase;letter-spacing:0.04em">${t.author.split(',')[0]}</div>
              <div style="font-family:'Barlow',sans-serif;font-size:0.75rem;color:${autoMuted};margin-top:0.15rem">${t.author.split(',')[1]?.trim() || 'Customer'}</div>
            </div>
            <div style="color:${autoAccent};font-size:0.85rem">${'&#9733;'.repeat(t.rating || 5)}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  // CONTACT — dark split: red left panel, form right
  const contactSection = `
  <section id="contact" style="padding:0;background:${autoBg}">
    <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1.5fr">
      <div style="background:${autoAccent};padding:5rem 3rem;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden">
        <div style="position:absolute;top:-4rem;right:-4rem;width:200px;height:200px;border-radius:50%;border:40px solid rgba(255,255,255,0.06);pointer-events:none"></div>
        <h2 style="font-family:'Barlow Condensed',sans-serif;font-size:clamp(2.5rem,4vw,3.5rem);font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:-0.01em;line-height:1;margin-bottom:1.5rem">${content.contactHeading}</h2>
        <p style="font-family:'Barlow',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.75);line-height:1.75;margin-bottom:2.5rem;max-width:300px">${content.heroSubtitle}</p>
        <div style="display:flex;flex-direction:column;gap:1.5rem">
          ${[
            { icon: '&#9742;', val: locationInfo.phone },
            { icon: '&#9993;', val: `hello@${businessName.toLowerCase().replace(/\s+/g, '')}.com` },
            { icon: '&#9906;', val: `${locationInfo.city} & surrounds` },
          ].map(item => `
          <div style="display:flex;align-items:center;gap:0.85rem">
            <div style="width:36px;height:36px;border:1px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.9rem;flex-shrink:0">${item.icon}</div>
            <span style="font-family:'Barlow',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.85)">${item.val}</span>
          </div>`).join('')}
          ${content.contactHours ? `
          <div style="display:flex;align-items:center;gap:0.85rem">
            <div style="width:36px;height:36px;border:1px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.9rem;flex-shrink:0">&#9200;</div>
            <span style="font-family:'Barlow',sans-serif;font-size:0.875rem;color:rgba(255,255,255,0.85)">${content.contactHours.replace(/ · /g, ' &middot; ')}</span>
          </div>` : ''}
        </div>
      </div>
      <div style="padding:5rem 4rem;background:${autoAlt}">
        <h3 style="font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:800;color:${autoText};text-transform:uppercase;letter-spacing:0.02em;margin-bottom:0.4rem">Book a Service</h3>
        <p style="font-family:'Barlow',sans-serif;font-size:0.85rem;color:${autoMuted};margin-bottom:2.5rem">We'll confirm your booking within 2 hours.</p>
        <form style="display:flex;flex-direction:column;gap:1.75rem" onsubmit="return false">
          <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:2rem">
            <div>
              <label style="font-family:'Barlow',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${autoMuted};display:block;margin-bottom:0.5rem">Name</label>
              <input type="text" placeholder="Full name" class="auto-input" />
            </div>
            <div>
              <label style="font-family:'Barlow',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${autoMuted};display:block;margin-bottom:0.5rem">Phone</label>
              <input type="tel" placeholder="${locationInfo.phone}" class="auto-input" />
            </div>
          </div>
          <div>
            <label style="font-family:'Barlow',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${autoMuted};display:block;margin-bottom:0.5rem">Email</label>
            <input type="email" placeholder="your@email.com" class="auto-input" />
          </div>
          <div>
            <label style="font-family:'Barlow',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${autoMuted};display:block;margin-bottom:0.5rem">Vehicle &amp; Issue</label>
            <textarea placeholder="e.g. 2019 Toyota Hilux — strange noise from front left..." rows="4" class="auto-input" style="resize:none"></textarea>
          </div>
          <button type="submit" class="auto-cta" style="align-self:flex-start;font-size:0.9rem">${content.ctaPrimary} &#8594;</button>
        </form>
      </div>
    </div>
  </section>`

  // FOOTER
  const autoFooter = `
  <footer style="padding:3.5rem 2rem 2rem;background:${autoBg};border-top:1px solid ${autoBorder}">
    <div class="ms-grid" style="max-width:1300px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem">
      <div>
        <div style="font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem">${businessName}</div>
        <p style="font-family:'Barlow',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.75);line-height:1.7;max-width:280px">${content.heroSubtitle}</p>
      </div>
      <div>
        <div style="font-family:'Barlow',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:1.25rem">Services</div>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="display:block;font-family:'Barlow',sans-serif;font-size:0.82rem;color:#ffffff;text-decoration:none;margin-bottom:0.55rem;transition:color 0.2s" onmouseover="this.style.color='${autoAccent}'" onmouseout="this.style.color='#ffffff'">${s.tags?.[0] || s.name}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:'Barlow',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:1.25rem">Company</div>
        <a href="#about" style="display:block;font-family:'Barlow',sans-serif;font-size:0.82rem;color:#ffffff;text-decoration:none;margin-bottom:0.55rem">About</a>
        <a href="#testimonials" style="display:block;font-family:'Barlow',sans-serif;font-size:0.82rem;color:#ffffff;text-decoration:none;margin-bottom:0.55rem">Reviews</a>
        <a href="#contact" style="display:block;font-family:'Barlow',sans-serif;font-size:0.82rem;color:#ffffff;text-decoration:none;margin-bottom:0.55rem">Contact</a>
      </div>
      <div>
        <div style="font-family:'Barlow',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:1.25rem">Contact</div>
        <p style="font-family:'Barlow',sans-serif;font-size:0.82rem;color:#ffffff;margin-bottom:0.5rem">&#9742; ${locationInfo.phone}</p>
        <p style="font-family:'Barlow',sans-serif;font-size:0.82rem;color:#ffffff;margin-bottom:0.5rem">&#9993; hello@${businessName.toLowerCase().replace(/\s+/g, '')}.com</p>
        <p style="font-family:'Barlow',sans-serif;font-size:0.82rem;color:#ffffff">${locationInfo.city}</p>
      </div>
    </div>
    <div style="max-width:1300px;margin:0 auto;padding-top:2rem;border-top:1px solid ${autoBorder};display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
      <p style="font-family:'Barlow',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.5)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      <div style="display:flex;gap:1.5rem">
        <a href="#" style="font-family:'Barlow',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.5);text-decoration:none">Privacy Policy</a>
        <a href="#" style="font-family:'Barlow',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.5);text-decoration:none">Terms</a>
      </div>
    </div>
  </footer>
  <script>
    const autoEls = document.querySelectorAll('.auto-reveal');
    const autoObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); autoObs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    autoEls.forEach(el => autoObs.observe(el));
  </script>`

  return `${headHtml}${extraFonts}${extraStyles}
${nav}
${heroSection}
${servicesSection}
${statsSection}
${aboutSection}
${gallerySection}
${testimonialSection}
${contactSection}
${autoFooter}
</body>
</html>`
}

function buildPropertyTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about
  let _pi = 0
  const galleryImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
    images[4] || stockImages.cards[3],
    stockPool[4] || stockImages.cards[4],
    stockPool[5] || stockImages.cards[5],
  ]

  const gold = primaryColor || '#c9a96e'
  const void_ = '#ffffff'
  const offwhite = '#0d0d0b'
  const muted = '#666660'
  const border = 'rgba(0,0,0,0.1)'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light') + `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap" rel="stylesheet"/>`

  const heroSection = `
  <section style="position:relative;height:calc(100vh - 64px);display:flex;flex-direction:column;overflow:hidden;background:#080808">
    <div style="position:absolute;inset:0">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;opacity:0.55" />
      <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(8,8,8,0.2) 0%,rgba(8,8,8,0.65) 60%,rgba(8,8,8,0.85) 100%)"></div>
    </div>
    <div style="position:relative;flex:1;display:flex;flex-direction:column;justify-content:flex-end;max-width:1400px;margin:0 auto;width:100%;padding:0 4rem 4rem">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2.5rem">
        <div style="width:40px;height:1px;background:${gold}"></div>
        <span style="font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:300;letter-spacing:0.3em;text-transform:uppercase;color:${gold}">${content.heroEyebrow || 'Luxury Real Estate'}</span>
      </div>
      <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(4rem,9vw,8rem);font-weight:300;color:#ffffff;line-height:0.92;letter-spacing:-0.02em;margin-bottom:2.5rem;font-style:italic">${businessName}</h1>
      <div class="pr-hero-bottom" style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:2rem">
        <p style="font-family:'Jost',sans-serif;font-size:1rem;font-weight:200;color:rgba(255,255,255,0.75);line-height:1.8;max-width:480px">${content.heroSubtitle}</p>
        <div class="pr-hero-btns" style="display:flex;gap:1rem;flex-shrink:0">
          <a href="#properties" style="font-family:'Jost',sans-serif;font-size:0.75rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;padding:1rem 2.5rem;border:1px solid ${gold};color:${gold};text-decoration:none;transition:all 0.3s ease">View Properties</a>
          <a href="#contact" style="font-family:'Jost',sans-serif;font-size:0.75rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;padding:1rem 2.5rem;background:${gold};color:#ffffff;text-decoration:none">${content.ctaPrimary}</a>
        </div>
      </div>
    </div>
    <div style="position:relative;display:flex;justify-content:center;padding:2rem 4rem;border-top:1px solid rgba(255,255,255,0.15);background:rgba(8,8,8,0.85)">
      <div style="display:flex;gap:6rem;flex-wrap:wrap;justify-content:center">
        ${content.stats.slice(0, 3).map(s => `
        <div style="text-align:center">
          <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2.5rem;font-weight:300;color:#ffffff;line-height:1">${s.value}</div>
          <div style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-top:0.4rem">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  const propertiesSection = `
  <section id="properties" style="padding:140px 0;background:${void_}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:5rem;flex-wrap:wrap;gap:2rem">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${gold}"></div>
            <span style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.3em;text-transform:uppercase;color:${gold}">Our Portfolio</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3rem,5vw,5rem);font-weight:300;color:${offwhite};line-height:1;font-style:italic">${content.galleryHeading || 'Featured Properties'}</h2>
        </div>
        <a href="#contact" style="font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;color:${gold};text-decoration:none;border-bottom:1px solid ${gold};padding-bottom:0.25rem">View All Listings &rarr;</a>
      </div>
      <div class="pr-gallery-row1" style="display:grid;grid-template-columns:1.4fr 1fr;gap:1.5px;background:${border}">
        ${[0,1].map((i) => {
          const propCaption = (content.projectCaptions && content.projectCaptions[i]) ? content.projectCaptions[i] : (i === 0 ? 'Clifton Penthouse' : 'Bishopscourt Manor')
          const propSub = (content.features && content.features[i]) ? content.features[i].name : (i === 0 ? 'Clifton, Atlantic Seaboard' : 'Bishopscourt, Southern Suburbs')
          return `
        <div style="position:relative;overflow:hidden;background:${void_}">
          <div style="height:${i === 0 ? '580px' : '580px'};overflow:hidden">
            <img src="${galleryImgs[i]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(8,8,8,0.85) 0%,transparent 50%)"></div>
          <div style="position:absolute;bottom:0;left:0;right:0;padding:2rem 2.5rem">
            <div style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.2em;text-transform:uppercase;color:${gold};margin-bottom:0.5rem">${propSub}</div>
            <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.8rem;font-weight:300;color:${offwhite};font-style:italic">${propCaption}</h3>
          </div>
          <div style="position:absolute;top:1.5rem;right:1.5rem;background:${gold};padding:0.35rem 0.9rem">
            <span style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:${void_}">For Sale</span>
          </div>
        </div>`
        }).join('')}
      </div>
      <div class="pr-gallery-row2" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5px;background:${border};margin-top:1.5px">
        ${[2,3,4].map((i) => {
          const propCaption = (content.projectCaptions && content.projectCaptions[i]) ? content.projectCaptions[i] : (['Camps Bay Villa','Sea Point Apartment','Constantia Estate'][i-2] || 'Luxury Residence')
          const propSub = (content.features && content.features[i]) ? content.features[i].name : (['Camps Bay','Sea Point','Constantia'][i-2] || locationInfo.city)
          return `
        <div style="position:relative;overflow:hidden;background:${void_}">
          <div style="height:360px;overflow:hidden">
            <img src="${galleryImgs[i] || stockPool[_pi++]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(8,8,8,0.85) 0%,transparent 55%)"></div>
          <div style="position:absolute;bottom:0;left:0;right:0;padding:1.5rem 2rem">
            <div style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.2em;text-transform:uppercase;color:${gold};margin-bottom:0.35rem">${propSub}</div>
            <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.4rem;font-weight:300;color:${offwhite};font-style:italic">${propCaption}</h3>
          </div>
        </div>`
        }).join('')}
      </div>
    </div>
  </section>`

  const aboutSection = `
  <section id="about" style="padding:140px 0;background:#0d0d0d">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:center" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:2rem">
            <div style="width:30px;height:1px;background:${gold}"></div>
            <span style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.3em;text-transform:uppercase;color:${gold}">About</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.5rem,4vw,4rem);font-weight:300;color:${offwhite};line-height:1.1;font-style:italic;margin-bottom:2.5rem">${content.aboutHeading}</h2>
          ${content.aboutMission ? `<p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.25rem;font-weight:300;color:${offwhite};line-height:1.6;font-style:italic;margin-bottom:2rem;border-left:2px solid ${gold};padding-left:1.5rem">${content.aboutMission}</p>` : ''}
          ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:'Jost',sans-serif;font-size:0.9rem;font-weight:200;color:${muted};line-height:2;margin-bottom:1.25rem">${p}</p>`).join('')}
          <a href="#contact" style="display:inline-flex;align-items:center;gap:0.75rem;font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;color:${gold};text-decoration:none;margin-top:1rem">${content.ctaSecondary || 'Learn More'} <span style="width:40px;height:1px;background:${gold};display:inline-block"></span></a>
        </div>
        <div style="position:relative">
          <div style="position:absolute;top:-1.5rem;left:-1.5rem;right:1.5rem;bottom:1.5rem;border:1px solid ${border}"></div>
          <div style="overflow:hidden;height:600px;position:relative">
            <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <div style="position:absolute;bottom:-2rem;right:-2rem;background:${gold};padding:2rem 2.5rem;min-width:180px">
            <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:3rem;font-weight:300;color:${void_};line-height:1">${content.stats[0]?.value || '20+'}</div>
            <div style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.2em;text-transform:uppercase;color:${void_};opacity:0.7;margin-top:0.4rem">${content.stats[0]?.label || 'Years Experience'}</div>
          </div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid ${border};margin-top:7rem" class="ms-grid">
        ${content.stats.slice(1, 5).map((s, i) => `
        <div style="padding:2.5rem;${i > 0 ? 'border-left:1px solid ' + border : ''}">
          <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:3rem;font-weight:300;color:${gold};line-height:1">${s.value}</div>
          <div style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.2em;text-transform:uppercase;color:${muted};margin-top:0.6rem">${s.label}</div>
          ${s.sublabel ? `<div style="font-family:'Jost',sans-serif;font-size:0.75rem;font-weight:200;color:${muted};margin-top:0.35rem;opacity:0.6">${s.sublabel}</div>` : ''}
        </div>`).join('')}
      </div>
    </div>
  </section>`

  const servicesSection = `
  <section id="services" style="padding:140px 0;background:${void_}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
        <div style="width:30px;height:1px;background:${gold}"></div>
        <span style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.3em;text-transform:uppercase;color:${gold}">What We Do</span>
      </div>
      <h2 class="pr-svc-heading" style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3rem,5vw,5rem);font-weight:300;color:${offwhite};line-height:1;font-style:italic;margin-bottom:5rem">${content.servicesHeading}</h2>
      <div style="display:grid;grid-template-columns:1fr;gap:0">
        ${content.services.map((s, i) => `
        <div style="display:grid;grid-template-columns:80px 1fr 1.5fr auto;gap:2rem;align-items:start;padding:3rem 0;border-bottom:1px solid ${border}" class="ms-grid">
          <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:4rem;font-weight:300;color:${border.replace('0.2','0.4')};line-height:1;padding-top:0.25rem">${String(i + 1).padStart(2, '0')}</div>
          <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.6rem;font-weight:300;color:${offwhite};font-style:italic;padding-top:0.5rem">${s.name}</h3>
          <p style="font-family:'Jost',sans-serif;font-size:0.85rem;font-weight:200;color:${muted};line-height:1.9">${s.description}</p>
          <a href="#contact" style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;color:${gold};text-decoration:none;border:1px solid ${border};padding:0.75rem 1.5rem;white-space:nowrap;transition:all 0.3s" onmouseover="this.style.borderColor='${gold}'" onmouseout="this.style.borderColor='${border}'">Enquire</a>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  const testimonialSection = content.testimonial ? `
  <section class="pr-testimonial-section" style="padding:140px 0;background:#0a0a0a;overflow:hidden">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:8rem;align-items:start" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${gold}"></div>
            <span style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.3em;text-transform:uppercase;color:${gold}">Testimonials</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2rem,3vw,3rem);font-weight:300;color:${offwhite};font-style:italic;line-height:1.2">What Our Clients Say</h2>
        </div>
        <div>
          <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:8rem;font-weight:300;color:${border};line-height:0.6;margin-bottom:2rem">&ldquo;</div>
          <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.4rem,2.5vw,2rem);font-weight:300;color:${offwhite};line-height:1.6;font-style:italic;margin-bottom:2.5rem">${content.testimonial.quote}</p>
          <div style="display:flex;align-items:center;gap:1.5rem">
            <div style="width:1px;height:50px;background:${gold}"></div>
            <div>
              <div style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:400;color:${offwhite};letter-spacing:0.1em;text-transform:uppercase">${content.testimonial.author.split(',')[0]}</div>
              <div style="font-family:'Jost',sans-serif;font-size:0.75rem;font-weight:200;color:${muted};margin-top:0.25rem">${content.testimonial.author.split(',')[1]?.trim() || 'Valued Client'}</div>
              ${content.testimonial.rating ? `<div style="color:${gold};font-size:0.75rem;letter-spacing:0.15em;margin-top:0.4rem">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
            </div>
          </div>
          ${(() => {
            const fallbacks = getFallbackTestimonials(content, 'property')
            return fallbacks.slice(0, 2).map(t => `
          <div style="margin-top:3rem;padding-top:3rem;border-top:1px solid ${border}">
            <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.15rem;font-weight:300;color:${muted};line-height:1.7;font-style:italic;margin-bottom:1.5rem">${t.quote}</p>
            <div style="font-family:'Jost',sans-serif;font-size:0.75rem;font-weight:300;color:${muted};letter-spacing:0.1em">— ${t.author}</div>
          </div>`).join('')
          })()}
        </div>
      </div>
    </div>
  </section>` : ''

  const contactSection = `
  <section id="contact" style="padding:140px 0;background:${void_}">
    <div class="pr-contact-inner" style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:start" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${gold}"></div>
            <span style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.3em;text-transform:uppercase;color:${gold}">Get in Touch</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.5rem,4vw,4rem);font-weight:300;color:${offwhite};line-height:1.1;font-style:italic;margin-bottom:2.5rem">${content.contactHeading}</h2>
          <p style="font-family:'Jost',sans-serif;font-size:0.9rem;font-weight:200;color:${muted};line-height:2;margin-bottom:3rem">${content.aboutMission || content.heroSubtitle}</p>
          <div style="display:flex;flex-direction:column;gap:2rem;border-top:1px solid ${border};padding-top:3rem">
            <div>
              <div style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};margin-bottom:0.5rem">Address</div>
              <div style="font-family:'Jost',sans-serif;font-size:0.9rem;font-weight:200;color:${offwhite}">${locationInfo.address}, ${locationInfo.city}</div>
            </div>
            <div>
              <div style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};margin-bottom:0.5rem">Contact</div>
              <div style="font-family:'Jost',sans-serif;font-size:0.9rem;font-weight:200;color:${offwhite}">${locationInfo.phone}<br/>hello@${businessName.toLowerCase().replace(/\s/g,'')}.com</div>
            </div>
            ${content.contactHours ? `<div>
              <div style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};margin-bottom:0.5rem">Office Hours</div>
              <div style="font-family:'Jost',sans-serif;font-size:0.9rem;font-weight:200;color:${offwhite}">${content.contactHours.replace(/ · /g, '<br/>')}</div>
            </div>` : ''}
          </div>
        </div>
        <div style="border:1px solid ${border};padding:3rem">
          <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.5rem;font-weight:300;color:${offwhite};font-style:italic;margin-bottom:2rem">Send an Enquiry</h3>
          <form style="display:flex;flex-direction:column;gap:1.5rem" onsubmit="return false">
            <div>
              <label style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};display:block;margin-bottom:0.6rem">Full Name</label>
              <input type="text" placeholder="Your name" style="width:100%;box-sizing:border-box;font-family:'Jost',sans-serif;font-weight:200;padding:0.85rem 0;background:transparent;border:none;border-bottom:1px solid ${border};color:${offwhite};font-size:0.9rem;outline:none" />
            </div>
            <div>
              <label style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};display:block;margin-bottom:0.6rem">Email</label>
              <input type="email" placeholder="your@email.com" style="width:100%;box-sizing:border-box;font-family:'Jost',sans-serif;font-weight:200;padding:0.85rem 0;background:transparent;border:none;border-bottom:1px solid ${border};color:${offwhite};font-size:0.9rem;outline:none" />
            </div>
            <div>
              <label style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};display:block;margin-bottom:0.6rem">Phone</label>
              <input type="tel" placeholder="${locationInfo.phone}" style="width:100%;box-sizing:border-box;font-family:'Jost',sans-serif;font-weight:200;padding:0.85rem 0;background:transparent;border:none;border-bottom:1px solid ${border};color:${offwhite};font-size:0.9rem;outline:none" />
            </div>
            <div>
              <label style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};display:block;margin-bottom:0.6rem">Message</label>
              <textarea placeholder="Tell us about the property you are looking for..." rows="4" style="width:100%;box-sizing:border-box;font-family:'Jost',sans-serif;font-weight:200;padding:0.85rem 0;background:transparent;border:none;border-bottom:1px solid ${border};color:${offwhite};font-size:0.9rem;outline:none;resize:none"></textarea>
            </div>
            <button type="submit" style="font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;padding:1rem 2.5rem;background:${gold};color:${void_};border:none;cursor:pointer;align-self:flex-start;transition:opacity 0.3s">Submit Enquiry</button>
          </form>
        </div>
      </div>
    </div>
  </section>`

  const prFooter = `
  <footer style="padding:6rem 4rem 3rem;background:#050505;border-top:1px solid ${border}">
    <div style="max-width:1400px;margin:0 auto">
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:4rem;margin-bottom:5rem" class="ms-grid">
        <div>
          <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;font-weight:300;color:${offwhite};font-style:italic;margin-bottom:1.5rem;letter-spacing:0.05em">${businessName}</div>
          <p style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:200;color:${muted};line-height:1.9;max-width:320px">${content.heroSubtitle}</p>
        </div>
        <div>
          <div style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};margin-bottom:1.5rem">Navigate</div>
          <a href="#properties" style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:200;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem;transition:color 0.2s">Properties</a>
          <a href="#about" style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:200;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">About</a>
          <a href="#services" style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:200;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">Services</a>
          <a href="#contact" style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:200;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">Contact</a>
        </div>
        <div>
          <div style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};margin-bottom:1.5rem">Services</div>
          ${content.services.slice(0, 4).map(s => `<a href="#services" style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:200;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">${s.tags?.[0] || s.name}</a>`).join('')}
        </div>
        <div>
          <div style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};margin-bottom:1.5rem">Contact</div>
          <p style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:200;color:${muted};line-height:1.9">${locationInfo.address}<br/>${locationInfo.city}<br/>${locationInfo.phone}</p>
        </div>
      </div>
      <div style="border-top:1px solid ${border};padding-top:2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
        <p style="font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:200;color:${muted}">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
        <div style="display:flex;gap:2rem">
          <a href="#" style="font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:200;color:${muted};text-decoration:none">Privacy Policy</a>
          <a href="#" style="font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:200;color:${muted};text-decoration:none">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${void_};
      --bg-alt: #0d0d0d;
      --card-bg: #111111;
      --text: ${offwhite};
      --text-muted: ${muted};
      --border: ${border};
      --primary: ${gold};
      --secondary: ${secondaryColor};
    }
    @media(max-width:768px){
      .pr-hero-btns{flex-direction:column!important;width:100%}
      .pr-hero-btns a{text-align:center}
      .pr-hero-bottom{padding-top:clamp(4rem,10svh,7rem)!important}
      .pr-gallery-row1{grid-template-columns:1fr!important}
      .pr-gallery-row2{display:none!important}
      .pr-svc-heading{margin-bottom:2.5rem!important}
      .pr-testimonial-section{padding:70px 0!important}
      .pr-contact-inner{padding:0 1.25rem!important}
    }
  </style>

${buildStandardNav(businessName, content, navFlags)}

${heroSection}
${propertiesSection}
${aboutSection}
${servicesSection}
${testimonialSection}
${contactSection}
${prFooter}

</body>
</html>`
}


function buildCreativeTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about
  let _pi = 0

  const ink = '#0a0a08'
  const chalk = '#f7f5f0'
  const stone = '#e8e4dd'
  const dust = '#9a9590'
  const accent = primaryColor || '#d4522a'
  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light') + `<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet"/>`

  const heroSection = `
  <section style="background:${ink};min-height:calc(100vh - 64px);display:grid;grid-template-columns:1fr 1fr;overflow:hidden" class="ms-grid">
    <div class="cr-hero-content" style="display:flex;flex-direction:column;justify-content:space-between;padding:5rem 4rem;position:relative;z-index:1">
      <div style="font-family:'Space Grotesk',sans-serif;font-size:0.7rem;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;color:${dust}">Creative Studio</div>
      <div>
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
          <div style="width:40px;height:1px;background:${accent}"></div>
          <span style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;color:${accent}">${content.heroEyebrow || 'Portfolio'}</span>
        </div>
        <h1 style="font-family:'Instrument Serif',Georgia,serif;font-size:clamp(4rem,7vw,7rem);font-weight:400;color:${chalk};line-height:0.9;letter-spacing:-0.02em;margin-bottom:2.5rem;font-style:italic">${businessName}</h1>
        <p style="font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:300;color:${dust};line-height:1.8;max-width:420px;margin-bottom:3rem">${content.heroSubtitle}</p>
        <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
          <a href="#work" style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;padding:1rem 2.5rem;background:${accent};color:#fff;text-decoration:none">${content.ctaPrimary}</a>
          <a href="#about" style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:400;letter-spacing:0.12em;text-transform:uppercase;color:${dust};text-decoration:none;border-bottom:1px solid ${dust};padding-bottom:0.1rem">${content.ctaSecondary || 'About'}</a>
        </div>
      </div>
      <div style="display:flex;gap:3rem">
        ${content.stats.slice(0, 3).map(s => `
        <div>
          <div style="font-family:'Instrument Serif',Georgia,serif;font-size:2rem;font-weight:400;color:${chalk};font-style:italic">${s.value}</div>
          <div style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:${dust};margin-top:0.25rem">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="cr-hero-img" style="position:relative;overflow:hidden">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;filter:grayscale(20%)" />
      <div style="position:absolute;inset:0;background:linear-gradient(to right,${ink} 0%,transparent 30%)"></div>
      <div style="position:absolute;bottom:3rem;right:3rem;background:${accent};padding:1rem 1.5rem">
        <div style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:#fff">${content.badge || 'Available for Work'}</div>
      </div>
    </div>
  </section>`

  const marqueeSection = `
  <section style="background:${accent};padding:1.25rem 0;overflow:hidden;white-space:nowrap">
    <div style="display:inline-flex;gap:4rem;animation:marquee 20s linear infinite">
      ${[...content.services.map(s => s.name), ...content.services.map(s => s.name)].map(name => `<span style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:#fff">${name} &nbsp;&bull;</span>`).join('')}
    </div>
    <style>@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }</style>
  </section>`

  const workSection = `
  <section id="work" style="padding:120px 0;background:${chalk}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:5rem;flex-wrap:wrap;gap:1.5rem">
        <h2 style="font-family:'Instrument Serif',Georgia,serif;font-size:clamp(3rem,5vw,5.5rem);font-weight:400;color:${ink};font-style:italic;line-height:0.9">${content.galleryHeading || 'Selected Work'}</h2>
        <p style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:300;color:${dust};max-width:300px;line-height:1.7">${content.aboutMission || content.heroSubtitle}</p>
      </div>
      <div style="display:grid;grid-template-columns:7fr 5fr;gap:1.5rem;margin-bottom:1.5rem" class="ms-grid">
        <div class="cr-work-left-cell" style="position:relative;overflow:hidden;group">
          <div class="cr-work-main-img" style="height:580px;overflow:hidden">
            <img src="${stockPool[_pi++] || stockImages.cards[0]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="position:absolute;inset:0;background:rgba(10,10,8,0);transition:background 0.3s ease;display:flex;align-items:flex-end;padding:2rem" onmouseover="this.style.background='rgba(10,10,8,0.6)'" onmouseout="this.style.background='rgba(10,10,8,0)'">
            <div style="opacity:0;transform:translateY(10px);transition:all 0.3s ease" onmouseover="this.parentElement.style.opacity='1';this.style.opacity='1';this.style.transform='translateY(0)'" >
              <p style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:${accent};margin-bottom:0.4rem">${(content.features && content.features[0]) ? (content.features[0] as {name:string;description:string}).name : (content.services[0]?.tags?.[0] || 'Photography')}</p>
              <h3 style="font-family:'Instrument Serif',Georgia,serif;font-size:1.5rem;font-weight:400;color:#fff;font-style:italic">${(content.projectCaptions && content.projectCaptions[0]) || content.services[0]?.name || 'Editorial Series'}</h3>
            </div>
          </div>
          <div style="padding:1.25rem 0">
            <p style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:${dust};margin-bottom:0.35rem">${(content.features && content.features[0]) ? (content.features[0] as {name:string}).name : (content.services[0]?.tags?.[0] || 'Photography')}</p>
            <h3 style="font-family:'Instrument Serif',Georgia,serif;font-size:1.6rem;font-weight:400;color:${ink};font-style:italic">${(content.projectCaptions && content.projectCaptions[0]) || content.services[0]?.name || 'Editorial Series'}</h3>
          </div>
        </div>
        <div class="cr-work-right-cell" style="display:flex;flex-direction:column;gap:1.5rem">
          ${[1,2].map((idx) => `
          <div style="position:relative;overflow:hidden;flex:1">
            <div style="height:100%;min-height:250px;overflow:hidden">
              <img src="${stockPool[_pi++] || stockImages.cards[idx]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
            </div>
            <div style="padding:1rem 0">
              <p style="font-family:'Space Grotesk',sans-serif;font-size:0.6rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:${dust};margin-bottom:0.25rem">${content.services[idx]?.tags?.[0] || 'Creative'}</p>
              <h3 style="font-family:'Instrument Serif',Georgia,serif;font-size:1.2rem;font-weight:400;color:${ink};font-style:italic">${(content.projectCaptions && content.projectCaptions[idx]) || content.services[idx]?.name || 'Project'}</h3>
            </div>
          </div>`).join('')}
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5rem" class="ms-grid">
        ${[3,4,5].map((idx) => `
        <div>
          <div style="overflow:hidden;height:340px">
            <img src="${stockPool[_pi++] || stockImages.cards[idx]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="padding:1rem 0">
            <p style="font-family:'Space Grotesk',sans-serif;font-size:0.6rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:${dust};margin-bottom:0.25rem">${content.services[idx % content.services.length]?.tags?.[0] || 'Creative'}</p>
            <h3 style="font-family:'Instrument Serif',Georgia,serif;font-size:1.1rem;font-weight:400;color:${ink};font-style:italic">${(content.projectCaptions && content.projectCaptions[idx]) || content.services[idx % content.services.length]?.name || 'Project'}</h3>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  const servicesSection = `
  <section id="services" style="padding:120px 0;background:${ink}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:8rem;align-items:start" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${accent}"></div>
            <span style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;color:${accent}">Services</span>
          </div>
          <h2 style="font-family:'Instrument Serif',Georgia,serif;font-size:clamp(2.5rem,4vw,4rem);font-weight:400;color:${chalk};font-style:italic;line-height:1.1">${content.servicesHeading}</h2>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.85rem;font-weight:300;color:${dust};line-height:1.9;margin-top:1.5rem">${content.aboutMission || content.heroSubtitle}</p>
        </div>
        <div>
          ${content.services.map((s, i) => `
          <div style="display:flex;gap:2.5rem;padding:2rem 0;border-bottom:1px solid rgba(247,245,240,0.08);align-items:start">
            <div style="font-family:'Instrument Serif',Georgia,serif;font-size:1.2rem;font-weight:400;color:rgba(247,245,240,0.2);font-style:italic;flex-shrink:0;width:2.5rem">${String(i + 1).padStart(2, '0')}</div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem">
                <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:500;color:${chalk}">${s.name}</h3>
                <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
                  ${s.tags.slice(0, 2).map(tag => `<span style="font-family:'Space Grotesk',sans-serif;font-size:0.6rem;font-weight:400;letter-spacing:0.1em;text-transform:uppercase;padding:0.2rem 0.6rem;border:1px solid rgba(247,245,240,0.15);color:${dust}">${tag}</span>`).join('')}
                </div>
              </div>
              <p style="font-family:'Space Grotesk',sans-serif;font-size:0.85rem;font-weight:300;color:${dust};line-height:1.8">${s.description}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>`

  const aboutSection = `
  <section id="about" style="padding:120px 0;background:${stone}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:center" class="ms-grid">
        <div class="cr-about-img" style="position:relative">
          <div style="overflow:hidden;height:650px">
            <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <div style="position:absolute;top:-2rem;right:-2rem;width:180px;height:180px;border:1px solid rgba(10,10,8,0.15);z-index:-1"></div>
        </div>
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${accent}"></div>
            <span style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;color:${accent}">About</span>
          </div>
          <h2 style="font-family:'Instrument Serif',Georgia,serif;font-size:clamp(2.5rem,4vw,4rem);font-weight:400;color:${ink};font-style:italic;line-height:1.1;margin-bottom:2rem">${content.aboutHeading}</h2>
          ${content.aboutMission ? `<p style="font-family:'Instrument Serif',Georgia,serif;font-size:1.3rem;font-weight:400;color:${ink};font-style:italic;line-height:1.5;margin-bottom:2rem">${content.aboutMission}</p>` : ''}
          ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:300;color:#4a4a45;line-height:1.9;margin-bottom:1.25rem">${p}</p>`).join('')}
          <a href="#contact" style="display:inline-flex;align-items:center;gap:1rem;font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:${ink};text-decoration:none;margin-top:2rem;border-bottom:1px solid ${ink};padding-bottom:0.25rem">${content.ctaPrimary} &rarr;</a>
        </div>
      </div>
    </div>
  </section>`

  const testimonialSection = content.testimonial ? `
  <section style="padding:100px 0;background:${accent}">
    <div style="max-width:900px;margin:0 auto;padding:0 4rem;text-align:center">
      <div style="font-family:'Instrument Serif',Georgia,serif;font-size:6rem;font-weight:400;color:rgba(255,255,255,0.2);line-height:0.6;margin-bottom:2.5rem">&ldquo;</div>
      <p style="font-family:'Instrument Serif',Georgia,serif;font-size:clamp(1.5rem,3vw,2.5rem);font-weight:400;color:#fff;line-height:1.4;font-style:italic;margin-bottom:2.5rem">${content.testimonial.quote}</p>
      <div style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.7)">— ${content.testimonial.author}</div>
      ${content.testimonial.rating ? `<div style="color:rgba(255,255,255,0.8);font-size:1rem;letter-spacing:0.15em;margin-top:0.75rem">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
    </div>
  </section>` : ''

  const contactSection = `
  <section id="contact" style="padding:120px 0;background:${chalk}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:start" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${accent}"></div>
            <span style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;color:${accent}">Let's Talk</span>
          </div>
          <h2 style="font-family:'Instrument Serif',Georgia,serif;font-size:clamp(3rem,5vw,5rem);font-weight:400;color:${ink};font-style:italic;line-height:0.95;margin-bottom:2.5rem">${content.contactHeading}</h2>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:300;color:${dust};line-height:1.9;margin-bottom:3rem">${content.aboutMission || content.heroSubtitle}</p>
          <div style="display:flex;flex-direction:column;gap:1.5rem">
            <a href="mailto:hello@${businessName.toLowerCase().replace(/\s/g,'')}.com" style="font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:400;color:${ink};text-decoration:none;border-bottom:1px solid rgba(10,10,8,0.15);padding-bottom:1rem">hello@${businessName.toLowerCase().replace(/\s/g,'')}.com</a>
            <a href="tel:${locationInfo.phone}" style="font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:400;color:${ink};text-decoration:none;border-bottom:1px solid rgba(10,10,8,0.15);padding-bottom:1rem">${locationInfo.phone}</a>
            <span style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:300;color:${dust}">${locationInfo.address}, ${locationInfo.city}</span>
          </div>
        </div>
        <form style="display:flex;flex-direction:column;gap:2rem" onsubmit="return false">
          <div>
            <input type="text" placeholder="Your Name" style="width:100%;box-sizing:border-box;font-family:'Space Grotesk',sans-serif;font-weight:300;font-size:0.95rem;padding:1rem 0;background:transparent;border:none;border-bottom:1px solid rgba(10,10,8,0.15);color:${ink};outline:none" />
          </div>
          <div>
            <input type="email" placeholder="Email Address" style="width:100%;box-sizing:border-box;font-family:'Space Grotesk',sans-serif;font-weight:300;font-size:0.95rem;padding:1rem 0;background:transparent;border:none;border-bottom:1px solid rgba(10,10,8,0.15);color:${ink};outline:none" />
          </div>
          <div>
            <input type="text" placeholder="Project Type" style="width:100%;box-sizing:border-box;font-family:'Space Grotesk',sans-serif;font-weight:300;font-size:0.95rem;padding:1rem 0;background:transparent;border:none;border-bottom:1px solid rgba(10,10,8,0.15);color:${ink};outline:none" />
          </div>
          <div>
            <textarea placeholder="Tell me about your project..." rows="5" style="width:100%;box-sizing:border-box;font-family:'Space Grotesk',sans-serif;font-weight:300;font-size:0.95rem;padding:1rem 0;background:transparent;border:none;border-bottom:1px solid rgba(10,10,8,0.15);color:${ink};outline:none;resize:none"></textarea>
          </div>
          <button type="submit" style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;padding:1.1rem 3rem;background:${ink};color:${chalk};border:none;cursor:pointer;align-self:flex-start;transition:background 0.3s ease">Send Message</button>
        </form>
      </div>
    </div>
  </section>`

  const crFooter = `
  <footer style="padding:5rem 4rem 3rem;background:${ink};border-top:1px solid rgba(247,245,240,0.06)">
    <div style="max-width:1400px;margin:0 auto">
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:4rem;margin-bottom:4rem" class="ms-grid">
        <div>
          <div style="font-family:'Instrument Serif',Georgia,serif;font-size:2rem;font-weight:400;color:${chalk};font-style:italic;margin-bottom:1rem">${businessName}</div>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:300;color:${dust};line-height:1.9;max-width:340px">${content.heroSubtitle}</p>
        </div>
        <div>
          <div style="font-family:'Space Grotesk',sans-serif;font-size:0.6rem;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;color:${accent};margin-bottom:1.5rem">Work</div>
          <a href="#work" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:300;color:${dust};text-decoration:none;display:block;margin-bottom:0.75rem">Portfolio</a>
          <a href="#services" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:300;color:${dust};text-decoration:none;display:block;margin-bottom:0.75rem">Services</a>
          <a href="#about" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:300;color:${dust};text-decoration:none;display:block;margin-bottom:0.75rem">About</a>
          <a href="#contact" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:300;color:${dust};text-decoration:none;display:block;margin-bottom:0.75rem">Contact</a>
        </div>
        <div>
          <div style="font-family:'Space Grotesk',sans-serif;font-size:0.6rem;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;color:${accent};margin-bottom:1.5rem">Contact</div>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:300;color:${dust};line-height:1.9">${locationInfo.address}<br/>${locationInfo.city}<br/>${locationInfo.phone}</p>
        </div>
      </div>
      <div style="border-top:1px solid rgba(247,245,240,0.06);padding-top:2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
        <p style="font-family:'Space Grotesk',sans-serif;font-size:0.7rem;font-weight:300;color:${dust}">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
        <div style="display:flex;gap:2rem">
          <a href="#" style="font-family:'Space Grotesk',sans-serif;font-size:0.7rem;font-weight:300;color:${dust};text-decoration:none">Privacy</a>
          <a href="#" style="font-family:'Space Grotesk',sans-serif;font-size:0.7rem;font-weight:300;color:${dust};text-decoration:none">Terms</a>
        </div>
      </div>
    </div>
  </footer>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${chalk};
      --bg-alt: ${stone};
      --card-bg: #ffffff;
      --text: ${ink};
      --text-muted: ${dust};
      --border: rgba(10,10,8,0.1);
      --primary: ${accent};
      --secondary: ${secondaryColor};
    }
    @media(max-width:768px){
      .cr-hero-content{padding:clamp(5rem,12svh,8rem) 1.25rem 3rem!important}
      .cr-hero-img{display:none!important}
      .cr-work-main-img{display:none!important}
      .cr-work-right-cell{display:none!important}
      .cr-about-img{display:none!important}
    }
  </style>

${buildStandardNav(businessName, content, navFlags)}

${heroSection}
${marqueeSection}
${workSection}
${servicesSection}
${aboutSection}
${testimonialSection}
${contactSection}
${crFooter}

</body>
</html>`
}


function buildEventsTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about
  let _pi = 0

  const midnight = '#0d0d12'
  const parchment = '#faf8f4'
  const warmgrey = '#f0ece6'
  const muted = '#7a7570'
  const vivid = primaryColor || '#e8410a'
  const gold = secondaryColor || '#d4a853'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark') + `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>`

  const heroSection = `
  <section style="position:relative;min-height:calc(100vh - 64px);display:flex;align-items:center;overflow:hidden;background:${midnight}">
    <div style="position:absolute;inset:0">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;opacity:0.45" />
      <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(13,13,18,0.95) 0%,rgba(13,13,18,0.5) 50%,rgba(13,13,18,0.7) 100%)"></div>
    </div>
    <div style="position:relative;max-width:1400px;margin:0 auto;padding:0 4rem;width:100%;padding-top:100px;padding-bottom:100px">
      <div style="max-width:800px">
        <div style="display:inline-flex;align-items:center;gap:0.75rem;margin-bottom:2.5rem;background:rgba(232,65,10,0.12);border:1px solid rgba(232,65,10,0.3);padding:0.5rem 1.25rem">
          <div style="width:6px;height:6px;border-radius:50%;background:${vivid}"></div>
          <span style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid}">${content.heroEyebrow || 'Events & Entertainment'}</span>
        </div>
        <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(4.5rem,10vw,9rem);font-weight:300;color:${parchment};line-height:0.88;letter-spacing:-0.02em;margin-bottom:0.5rem">${businessName.split(' ').slice(0,2).join('<br/>')}</h1>
        ${businessName.split(' ').length > 2 ? `<h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(4.5rem,10vw,9rem);font-weight:300;color:${parchment};line-height:0.88;font-style:italic;letter-spacing:-0.02em;margin-bottom:2.5rem">${businessName.split(' ').slice(2).join(' ')}</h1>` : '<div style="margin-bottom:2.5rem"></div>'}
        <div style="display:flex;align-items:flex-start;gap:4rem;flex-wrap:wrap">
          <p style="font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:300;color:rgba(250,248,244,0.65);line-height:1.8;max-width:420px">${content.heroSubtitle}</p>
          <div style="display:flex;flex-direction:column;gap:1rem;flex-shrink:0">
            <a href="#contact" style="font-family:'DM Sans',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;padding:1.1rem 2.5rem;background:${vivid};color:#fff;text-decoration:none;display:inline-block">${content.ctaPrimary}</a>
            <a href="#services" style="font-family:'DM Sans',sans-serif;font-size:0.75rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;padding:1.1rem 2.5rem;border:1px solid rgba(250,248,244,0.2);color:${parchment};text-decoration:none;display:inline-block;text-align:center">${content.ctaSecondary || 'Our Services'}</a>
          </div>
        </div>
      </div>
    </div>
    <div style="position:absolute;bottom:0;left:0;right:0;display:flex;background:rgba(13,13,18,0.8);backdrop-filter:blur(10px);border-top:1px solid rgba(250,248,244,0.06)">
      ${content.stats.slice(0, 4).map((s, i) => `
      <div style="flex:1;padding:1.5rem 2rem;${i > 0 ? 'border-left:1px solid rgba(250,248,244,0.06)' : ''}">
        <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;font-weight:300;color:${parchment};line-height:1">${s.value}</div>
        <div style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:${muted};margin-top:0.35rem">${s.label}</div>
      </div>`).join('')}
    </div>
  </section>`

  const servicesSection = `
  <section id="services" style="padding:140px 0;background:${parchment}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:5rem;flex-wrap:wrap;gap:2rem">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${vivid}"></div>
            <span style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid}">What We Do</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3rem,5vw,5rem);font-weight:300;color:${midnight};line-height:1;font-style:italic">${content.servicesHeading}</h2>
        </div>
        <p style="font-family:'DM Sans',sans-serif;font-size:0.9rem;font-weight:300;color:${muted};max-width:300px;line-height:1.7">${content.aboutMission || content.heroSubtitle}</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1px solid rgba(13,13,18,0.08)" class="ms-grid">
        ${content.services.slice(0, 6).map((s, i) => `
        <div style="padding:2.5rem;${i % 3 > 0 ? 'border-left:1px solid rgba(13,13,18,0.08);' : ''}${i >= 3 ? 'border-top:1px solid rgba(13,13,18,0.08);' : ''}position:relative;overflow:hidden;background:${parchment};transition:background 0.3s ease" onmouseover="this.style.background='${warmgrey}'" onmouseout="this.style.background='${parchment}'">
          <div style="width:48px;height:48px;border-radius:50%;background:rgba(232,65,10,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem">
            <span style="font-size:1.2rem">${s.icon || '&#9733;'}</span>
          </div>
          <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.4rem;font-weight:400;color:${midnight};margin-bottom:0.75rem;font-style:italic">${s.name}</h3>
          <p style="font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:300;color:${muted};line-height:1.8;margin-bottom:1.5rem">${s.description}</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.4rem">
            ${s.tags.slice(0, 3).map(tag => `<span style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;padding:0.2rem 0.6rem;background:rgba(13,13,18,0.05);color:${muted}">${tag}</span>`).join('')}
          </div>
          <div style="position:absolute;bottom:0;left:0;width:0;height:2px;background:${vivid};transition:width 0.4s ease" onmouseover="this.parentElement.style.background='${warmgrey}';this.style.width='100%'" onmouseout="this.parentElement.style.background='${parchment}';this.style.width='0'"></div>
        </div>`).join('')}
      </div>
      <div style="text-align:center;margin-top:3rem">
        <a href="#contact" style="font-family:'DM Sans',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;padding:1.1rem 3rem;background:${midnight};color:${parchment};text-decoration:none;display:inline-block">${content.ctaPrimary}</a>
      </div>
    </div>
  </section>`

  const gallerySection = `
  <section id="gallery" style="padding:140px 0;background:${midnight}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
        <div style="width:30px;height:1px;background:${vivid}"></div>
        <span style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid}">Past Events</span>
      </div>
      <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3rem,5vw,5rem);font-weight:300;color:${parchment};font-style:italic;margin-bottom:4rem;line-height:1">${content.galleryHeading || 'Our Work'}</h2>
      <div style="display:grid;grid-template-columns:5fr 3fr 4fr;gap:1.5px;background:rgba(250,248,244,0.06);margin-bottom:1.5px" class="ms-grid">
        ${[0,1,2].map((i) => `
        <div ${i===0?'class="ev-gal-img1"':''} style="overflow:hidden;height:480px;position:relative">
          <img src="${stockPool[_pi++] || stockImages.cards[i]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease;filter:grayscale(15%)" onmouseover="this.style.transform='scale(1.04)';this.style.filter='grayscale(0%)'" onmouseout="this.style.transform='scale(1)';this.style.filter='grayscale(15%)'" />
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(13,13,18,0.8) 0%,transparent 50%)"></div>
          <div style="position:absolute;bottom:1.5rem;left:1.5rem">
            <div style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:${vivid};margin-bottom:0.35rem">${(content.projectCaptions && content.projectCaptions[i]) ? 'Event' : content.services[i]?.tags?.[0] || 'Event'}</div>
            <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.1rem;font-weight:300;color:${parchment};font-style:italic">${(content.projectCaptions && content.projectCaptions[i]) || content.services[i]?.name || 'Special Event'}</div>
          </div>
        </div>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:3fr 4fr 5fr;gap:1.5px;background:rgba(250,248,244,0.06)" class="ms-grid">
        ${[3,4,5].map((i) => `
        <div style="overflow:hidden;height:360px;position:relative">
          <img src="${stockPool[_pi++] || stockImages.cards[i]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease;filter:grayscale(15%)" onmouseover="this.style.transform='scale(1.04)';this.style.filter='grayscale(0%)'" onmouseout="this.style.transform='scale(1)';this.style.filter='grayscale(15%)'" />
        </div>`).join('')}
      </div>
    </div>
  </section>`

  const aboutSection = `
  <section id="about" style="padding:140px 0;background:${warmgrey}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:center" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${vivid}"></div>
            <span style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid}">Our Story</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.5rem,4vw,4.5rem);font-weight:300;color:${midnight};font-style:italic;line-height:1.05;margin-bottom:2.5rem">${content.aboutHeading}</h2>
          ${content.aboutMission ? `<p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.3rem;font-weight:300;color:${midnight};font-style:italic;line-height:1.5;margin-bottom:2rem;border-left:3px solid ${vivid};padding-left:1.5rem">${content.aboutMission}</p>` : ''}
          ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:'DM Sans',sans-serif;font-size:0.9rem;font-weight:300;color:${muted};line-height:1.9;margin-bottom:1.25rem">${p}</p>`).join('')}
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:2rem;margin-top:3rem;padding-top:3rem;border-top:1px solid rgba(13,13,18,0.1)" class="ms-grid">
            ${content.stats.slice(0, 4).map(s => `
            <div>
              <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2.5rem;font-weight:300;color:${vivid};line-height:1">${s.value}</div>
              <div style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:400;letter-spacing:0.1em;text-transform:uppercase;color:${muted};margin-top:0.4rem">${s.label}</div>
            </div>`).join('')}
          </div>
        </div>
        <div class="ev-about-img" style="position:relative">
          <div style="overflow:hidden;height:650px">
            <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <div style="position:absolute;top:-1rem;right:-1rem;bottom:1rem;left:1rem;border:1px solid rgba(232,65,10,0.2);z-index:-1;pointer-events:none"></div>
        </div>
      </div>
    </div>
  </section>`

  const testimonialSection = content.testimonial ? `
  <section style="padding:140px 0;background:${midnight};overflow:hidden">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:8rem;align-items:start" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${vivid}"></div>
            <span style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid}">Testimonials</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2rem,3vw,3.5rem);font-weight:300;color:${parchment};font-style:italic;line-height:1.1">Client Stories</h2>
        </div>
        <div style="display:flex;flex-direction:column;gap:3rem">
          <div>
            <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:5rem;font-weight:300;color:${vivid};line-height:0.6;opacity:0.3;margin-bottom:1.5rem">&ldquo;</div>
            <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.4rem,2.5vw,2rem);font-weight:300;color:${parchment};font-style:italic;line-height:1.5;margin-bottom:2rem">${content.testimonial.quote}</p>
            <div style="display:flex;align-items:center;gap:1.5rem">
              <div style="width:1px;height:40px;background:${vivid}"></div>
              <div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:500;color:${parchment};letter-spacing:0.08em;text-transform:uppercase">${content.testimonial.author}</div>
                ${content.testimonial.rating ? `<div style="color:${gold};font-size:0.75rem;margin-top:0.3rem">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
              </div>
            </div>
          </div>
          ${(() => {
            const fallbacks = getFallbackTestimonials(content, 'events-entertainment')
            return fallbacks.slice(0, 2).map(t => `
          <div style="padding-top:3rem;border-top:1px solid rgba(250,248,244,0.06)">
            <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.2rem;font-weight:300;color:rgba(250,248,244,0.6);font-style:italic;line-height:1.6;margin-bottom:1.5rem">${t.quote}</p>
            <div style="font-family:'DM Sans',sans-serif;font-size:0.75rem;font-weight:400;color:${muted};letter-spacing:0.08em">— ${t.author}</div>
          </div>`).join('')
          })()}
        </div>
      </div>
    </div>
  </section>` : ''

  const processSection = content.processSteps && content.processSteps.length > 0 ? `
  <section style="padding:120px 0;background:${vivid}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="text-align:center;margin-bottom:5rem">
        <div style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:1rem">${content.stepsHeading || 'How It Works'}</div>
        <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3rem,5vw,5rem);font-weight:300;color:#fff;font-style:italic;line-height:1">From Vision to Reality</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(${Math.min(content.processSteps.length, 4)},1fr);gap:0" class="ms-grid">
        ${content.processSteps.slice(0, 4).map((step, i) => `
        <div style="padding:2.5rem 2rem;${i > 0 ? 'border-left:1px solid rgba(255,255,255,0.15)' : ''}">
          <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:5rem;font-weight:300;color:rgba(255,255,255,0.15);line-height:1;margin-bottom:1.5rem">${step.step}</div>
          <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.4rem;font-weight:400;color:#fff;font-style:italic;margin-bottom:0.75rem">${step.title}</h3>
          <p style="font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:300;color:rgba(255,255,255,0.7);line-height:1.8">${step.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  const contactSection = `
  <section id="contact" style="padding:140px 0;background:${parchment}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:start" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${vivid}"></div>
            <span style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid}">Book Your Event</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3rem,5vw,5rem);font-weight:300;color:${midnight};font-style:italic;line-height:0.95;margin-bottom:2.5rem">${content.contactHeading}</h2>
          <p style="font-family:'DM Sans',sans-serif;font-size:0.9rem;font-weight:300;color:${muted};line-height:1.9;margin-bottom:3rem">${content.aboutMission || content.heroSubtitle}</p>
          <div style="display:flex;flex-direction:column;gap:2rem">
            <div style="display:flex;gap:1.5rem;align-items:flex-start">
              <div style="width:44px;height:44px;background:rgba(232,65,10,0.08);border:1px solid rgba(232,65,10,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem;color:${vivid}">&#9906;</div>
              <div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:${midnight};margin-bottom:0.35rem">Location</div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:300;color:${muted}">${locationInfo.address}, ${locationInfo.city}</div>
              </div>
            </div>
            <div style="display:flex;gap:1.5rem;align-items:flex-start">
              <div style="width:44px;height:44px;background:rgba(232,65,10,0.08);border:1px solid rgba(232,65,10,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem;color:${vivid}">&#9742;</div>
              <div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:${midnight};margin-bottom:0.35rem">Phone</div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:300;color:${muted}">${locationInfo.phone}</div>
              </div>
            </div>
            <div style="display:flex;gap:1.5rem;align-items:flex-start">
              <div style="width:44px;height:44px;background:rgba(232,65,10,0.08);border:1px solid rgba(232,65,10,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem;color:${vivid}">&#9993;</div>
              <div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:${midnight};margin-bottom:0.35rem">Email</div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:300;color:${muted}">hello@${businessName.toLowerCase().replace(/\s/g,'')}.com</div>
              </div>
            </div>
            ${content.contactHours ? `<div style="display:flex;gap:1.5rem;align-items:flex-start">
              <div style="width:44px;height:44px;background:rgba(232,65,10,0.08);border:1px solid rgba(232,65,10,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem;color:${vivid}">&#9200;</div>
              <div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:${midnight};margin-bottom:0.35rem">Hours</div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:300;color:${muted}">${content.contactHours.replace(/ · /g,'<br/>')}</div>
              </div>
            </div>` : ''}
          </div>
        </div>
        <div>
          <form style="display:flex;flex-direction:column;gap:1.5rem" onsubmit="return false">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem" class="ms-grid">
              <div>
                <label style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:${midnight};display:block;margin-bottom:0.6rem">Name</label>
                <input type="text" placeholder="Your name" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;font-weight:300;font-size:0.9rem;padding:0.85rem 1.25rem;background:${warmgrey};border:1px solid rgba(13,13,18,0.08);color:${midnight};outline:none" />
              </div>
              <div>
                <label style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:${midnight};display:block;margin-bottom:0.6rem">Email</label>
                <input type="email" placeholder="your@email.com" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;font-weight:300;font-size:0.9rem;padding:0.85rem 1.25rem;background:${warmgrey};border:1px solid rgba(13,13,18,0.08);color:${midnight};outline:none" />
              </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem" class="ms-grid">
              <div>
                <label style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:${midnight};display:block;margin-bottom:0.6rem">Event Type</label>
                <input type="text" placeholder="Wedding, Corporate..." style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;font-weight:300;font-size:0.9rem;padding:0.85rem 1.25rem;background:${warmgrey};border:1px solid rgba(13,13,18,0.08);color:${midnight};outline:none" />
              </div>
              <div>
                <label style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:${midnight};display:block;margin-bottom:0.6rem">Event Date</label>
                <input type="text" placeholder="DD / MM / YYYY" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;font-weight:300;font-size:0.9rem;padding:0.85rem 1.25rem;background:${warmgrey};border:1px solid rgba(13,13,18,0.08);color:${midnight};outline:none" />
              </div>
            </div>
            <div>
              <label style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:${midnight};display:block;margin-bottom:0.6rem">Tell Us About Your Event</label>
              <textarea placeholder="Guest count, venue, vision, budget..." rows="5" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;font-weight:300;font-size:0.9rem;padding:0.85rem 1.25rem;background:${warmgrey};border:1px solid rgba(13,13,18,0.08);color:${midnight};outline:none;resize:none"></textarea>
            </div>
            <button type="submit" style="font-family:'DM Sans',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;padding:1.1rem 3rem;background:${vivid};color:#fff;border:none;cursor:pointer;align-self:flex-start">Send Enquiry</button>
          </form>
        </div>
      </div>
    </div>
  </section>`

  const evtFooter = `
  <footer style="padding:6rem 4rem 3rem;background:${midnight};border-top:1px solid rgba(250,248,244,0.04)">
    <div style="max-width:1400px;margin:0 auto">
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:4rem;margin-bottom:5rem" class="ms-grid">
        <div>
          <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;font-weight:300;color:${parchment};font-style:italic;margin-bottom:1.5rem;letter-spacing:0.05em">${businessName}</div>
          <p style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:300;color:${muted};line-height:1.9;max-width:320px">${content.heroSubtitle}</p>
        </div>
        <div>
          <div style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid};margin-bottom:1.5rem">Navigate</div>
          <a href="#services" style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:300;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">Services</a>
          <a href="#gallery" style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:300;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">Gallery</a>
          <a href="#about" style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:300;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">About</a>
          <a href="#contact" style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:300;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">Contact</a>
        </div>
        <div>
          <div style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid};margin-bottom:1.5rem">Services</div>
          ${content.services.slice(0, 4).map(s => `<a href="#services" style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:300;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">${s.tags?.[0] || s.name}</a>`).join('')}
        </div>
        <div>
          <div style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid};margin-bottom:1.5rem">Contact</div>
          <p style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:300;color:${muted};line-height:1.9">${locationInfo.address}<br/>${locationInfo.city}<br/>${locationInfo.phone}</p>
        </div>
      </div>
      <div style="border-top:1px solid rgba(250,248,244,0.06);padding-top:2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
        <p style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:300;color:${muted}">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
        <div style="display:flex;gap:2rem">
          <a href="#" style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:300;color:${muted};text-decoration:none">Privacy Policy</a>
          <a href="#" style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:300;color:${muted};text-decoration:none">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${midnight};
      --bg-alt: ${parchment};
      --card-bg: ${parchment};
      --text: ${parchment};
      --text-muted: ${muted};
      --border: rgba(250,248,244,0.06);
      --primary: ${vivid};
      --secondary: ${gold};
    }
    @media(max-width:768px){
      .ev-gal-img1{display:none!important}
      .ev-about-img{display:none!important}
    }
  </style>

${buildStandardNav(businessName, content, navFlags)}

${heroSection}
${servicesSection}
${gallerySection}
${aboutSection}
${testimonialSection}
${processSection}
${contactSection}
${evtFooter}

</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { businessName, businessType, businessCategory, pages, primaryColor, secondaryColor, noColors, images, country, scrapeId, scrapeData: bodyScrapedData } = body
    const locationInfo = getLocationInfo(country || '')

    // Use scrape data from body (direct pass-through) or pull from Supabase via scrapeId
    let scrapeData: Record<string, unknown> | null = bodyScrapedData || null
    if (!scrapeData && scrapeId) {
      try {
        const { supabaseAdmin } = await import('@/lib/supabase-admin')
        const { data } = await supabaseAdmin
          .from('prospect_scrapes')
          .select('extracted_data')
          .eq('id', scrapeId)
          .single()
        if (data?.extracted_data) {
          scrapeData = data.extracted_data as Record<string, unknown>
          // Update status
          await supabaseAdmin.from('prospect_scrapes').update({ status: 'preview_generated' }).eq('id', scrapeId)
        }
      } catch {
        // Failed to load scrape — fall through to normal flow
      }
    }

    const effectiveBusinessName = (scrapeData?.businessName as string) || businessName
    const effectiveBusinessType = (scrapeData?.businessType as string) || businessType

    if (!effectiveBusinessName || !effectiveBusinessType) {
      return NextResponse.json(
        { success: false, error: 'businessName and businessType are required' },
        { status: 400 },
      )
    }

    // Ensure primary color has enough contrast for buttons on dark backgrounds
    const scrapedPrimary = (scrapeData?.brandColors as Record<string, string>)?.primary
    const rawPrimary = noColors ? '#2563EB' : (scrapedPrimary || primaryColor || '#6C5CE7')
    const pR = parseInt(rawPrimary.slice(1, 3), 16) || 0
    const pG = parseInt(rawPrimary.slice(3, 5), 16) || 0
    const pB = parseInt(rawPrimary.slice(5, 7), 16) || 0
    const luminance = (0.299 * pR + 0.587 * pG + 0.114 * pB) / 255
    // If color is too light (near white), fall back to a visible accent
    const primary = luminance > 0.85 ? '#6C5CE7' : rawPrimary
    const scrapedSecondary = (scrapeData?.brandColors as Record<string, string>)?.secondary
    const secondary = noColors ? '#10B981' : (scrapedSecondary || secondaryColor || '#00CEC9')
    const category: BusinessCategory = businessCategory || 'other'
    const variant = categoryVariant[category] || 'service'

    // Check for pre-written content first
    const preset: PresetContent | undefined = presetContent[effectiveBusinessType]

    // Build image queries from preset content if available
    const imageQueries: ImageQueries | undefined = preset ? {
      heroImageQuery: preset.heroImageQuery,
      heroBgImageQuery: preset.heroBgImageQuery,
      serviceImageQueries: preset.services.map(s => s.serviceImageQuery),
      galleryImageQueries: preset.galleryImageQueries,
      aboutImageQuery: preset.aboutImageQuery,
    } : undefined

    // Fetch stock images (with specific queries if preset content exists)
    const stockImgs = await fetchStockImages(category, businessType, imageQueries)

    let content: GeneratedContent

    if (preset) {
      // Use pre-written content — no Claude API call needed
      content = {
        heroEyebrow: preset.heroEyebrow,
        tagline: preset.tagline,
        heroSubtitle: preset.heroSubtitle,
        ctaPrimary: preset.ctaPrimary,
        ctaSecondary: preset.ctaSecondary,
        servicesHeading: preset.servicesHeading,
        services: preset.services,
        galleryHeading: preset.galleryHeading,
        aboutHeading: preset.aboutHeading,
        aboutText: preset.aboutText,
        stats: preset.stats,
        contactHeading: preset.contactHeading,
        contactHours: preset.contactHours,
        processSteps: preset.processSteps,
        heroAccent: preset.heroAccent,
        ctaNote: preset.ctaNote,
        badge: preset.badge,
        aboutMission: preset.aboutMission,
        testimonial: preset.testimonial,
        imageMood: preset.imageMood,
        heroImageQuery: preset.heroImageQuery,
        aboutImageQuery: preset.aboutImageQuery,
        galleryImageQueries: preset.galleryImageQueries,
        features: preset.features,
      }
    } else if (scrapeData) {
      // Use scraped content from prospect's website
      const sd = scrapeData
      const sdServices = (sd.services as { name: string; description: string; tags: string[] }[]) || []
      content = {
        heroEyebrow: (sd.heroEyebrow as string) || `${effectiveBusinessType.toUpperCase()}`,
        tagline: (sd.tagline as string) || `Welcome to <em>${effectiveBusinessName}</em>`,
        heroSubtitle: (sd.heroSubtitle as string) || '',
        ctaPrimary: (sd.ctaPrimary as string) || 'Get in Touch',
        ctaSecondary: (sd.ctaSecondary as string) || 'Learn More',
        servicesHeading: (sd.servicesHeading as string) || 'Our Services',
        services: sdServices.length > 0 ? sdServices : [
          { name: 'Service 1', description: 'Professional service tailored to your needs.', tags: ['Featured'] },
          { name: 'Service 2', description: 'Quality solutions delivered with care.', tags: ['Popular'] },
          { name: 'Service 3', description: 'Ongoing support and excellence.', tags: ['Trusted'] },
        ],
        galleryHeading: 'Our Work',
        aboutHeading: (sd.aboutHeading as string) || `About <em>${effectiveBusinessName}</em>`,
        aboutText: (sd.aboutText as string) || `${effectiveBusinessName} delivers professional ${effectiveBusinessType} services.\n\nWe are committed to quality and client satisfaction.`,
        stats: (sd.stats as { value: string; label: string }[]) || [
          { value: '10+', label: 'Years Experience' },
          { value: '500+', label: 'Happy Clients' },
          { value: '50+', label: 'Projects' },
          { value: '100%', label: 'Satisfaction' },
        ],
        contactHeading: (sd.contactHeading as string) || 'Ready to get started?',
        contactHours: (sd.contactHours as string) || undefined,
        aboutMission: (sd.aboutMission as string) || undefined,
        processSteps: [
          { step: '1', title: 'Get in Touch', description: 'Reach out and tell us what you need' },
          { step: '2', title: 'We Plan', description: 'We create a tailored approach for your project' },
          { step: '3', title: 'We Deliver', description: 'Professional execution with quality guaranteed' },
        ],
        projectCaptions: ['Featured Project', 'Recent Work', 'Client Project', 'Latest Design'],
        logoUrl: (sd.logoUrl as string) || undefined,
      }
    } else {
      // Generic fallback content — no external API calls
      const catPreset = categoryPresets[category] || categoryPresets['other']
      content = {
        heroEyebrow: `Premium ${businessType}`,
        tagline: `Welcome to <em>${businessName}</em>`,
        heroSubtitle: `Experience the finest ${businessType.toLowerCase()} services in your area.`,
        ctaPrimary: catPreset.ctaText,
        ctaSecondary: 'Learn More',
        servicesHeading: 'What We Offer',
        services: [
          { name: 'Consultation', description: `Get expert ${businessType.toLowerCase()} advice tailored to your specific needs and goals.`, tags: ['Featured'] },
          { name: 'Full Service', description: `Comprehensive ${businessType.toLowerCase()} solutions from start to finish, handled with care.`, tags: ['Popular'] },
          { name: 'Ongoing Support', description: `Continued partnership to ensure lasting results and your complete satisfaction.`, tags: ['Trusted'] },
        ],
        galleryHeading: 'Our Work',
        aboutHeading: `Where quality meets <em>excellence</em>`,
        aboutText: `At ${businessName}, we bring years of dedicated experience to every project.\n\nOur commitment to quality and client satisfaction drives everything we do.`,
        stats: [
          { value: '10+', label: 'Years Experience' },
          { value: '500+', label: 'Happy Clients' },
          { value: '50+', label: 'Projects Completed' },
          { value: '100%', label: 'Satisfaction' },
        ],
        contactHeading: 'Ready to get started?',
        processSteps: [
          { step: '1', title: 'Get in Touch', description: 'Reach out and tell us what you need' },
          { step: '2', title: 'We Plan', description: 'We create a tailored approach for your project' },
          { step: '3', title: 'We Deliver', description: 'Professional execution with quality guaranteed' },
        ],
        projectCaptions: ['Featured Project', 'Recent Work', 'Client Project', 'Latest Design'],
      }
    }

    // Replace Cape Town with prospect's city in all content strings
    const city = locationInfo.city
    if (city !== 'Cape Town') {
      const replaceInObj = (obj: Record<string, unknown>) => {
        for (const key of Object.keys(obj)) {
          const val = obj[key]
          if (typeof val === 'string') {
            obj[key] = val.replace(/Cape Town/g, city).replace(/CAPE TOWN/g, city.toUpperCase())
          } else if (Array.isArray(val)) {
            val.forEach((item, i) => {
              if (typeof item === 'string') val[i] = item.replace(/Cape Town/g, city).replace(/CAPE TOWN/g, city.toUpperCase())
              else if (typeof item === 'object' && item) replaceInObj(item as Record<string, unknown>)
            })
          } else if (typeof val === 'object' && val) {
            replaceInObj(val as Record<string, unknown>)
          }
        }
      }
      replaceInObj(content as unknown as Record<string, unknown>)
    }

    const templateData: TemplateData = {
      content,
      businessName: effectiveBusinessName,
      businessCategory: category,
      primaryColor: primary,
      secondaryColor: secondary,
      pages: pages || ['Home', 'About', 'Services', 'Contact'],
      images: (() => {
        const raw = Array.isArray(images) ? images.filter((u: string) => u && typeof u === 'string') : []
        if (raw.length === 0) return []
        // Pad scraped images to fill all template slots (hero + 4 service + 4 gallery + about = ~10)
        const padded = [...raw]
        while (padded.length < 10) {
          padded.push(raw[padded.length % raw.length])
        }
        return padded
      })(),
      stockImages: stockImgs,
      variant,
      locationInfo,
    }

    let htmlString: string
    // Category-specific templates
    if (category === 'property') {
      htmlString = buildPropertyTemplate(templateData)
    } else if (category === 'tech-digital') {
      htmlString = buildTechDigitalTemplate(templateData)
    } else if (category === 'retail') {
      htmlString = buildRetailTemplate(templateData)
    } else if (category === 'trades-construction') {
      htmlString = buildTradesTemplate(templateData)
    } else if (category === 'home-services') {
      htmlString = buildHomeServicesTemplate(templateData)
    } else if (category === 'health-wellness') {
      htmlString = buildHealthWellnessTemplate(templateData)
    } else if (category === 'food-hospitality') {
      htmlString = buildFoodHospitalityTemplate(templateData)
    } else if (category === 'pets') {
      htmlString = buildPetsTemplate(templateData)
    } else if (category === 'automotive') {
      htmlString = buildAutomotiveTemplate(templateData)
    } else if (category === 'fitness-sport') {
      htmlString = buildFitnessTemplate(templateData)
    } else if (category === 'events-entertainment') {
      htmlString = buildEventsTemplate(templateData)
    } else if (category === 'creative') {
      htmlString = buildCreativeTemplate(templateData)
    } else if (category === 'education') {
      htmlString = buildEducationTemplate(templateData)
    } else if (category === 'professional') {
      htmlString = buildProfessionalTemplate(templateData)
    } else {
      switch (variant) {
        case 'visual':
          htmlString = buildVisualTemplate(templateData)
          break
        case 'portfolio':
          htmlString = buildPortfolioTemplate(templateData)
          break
        case 'service':
        default:
          htmlString = buildServiceTemplate(templateData)
          break
      }
    }

    return NextResponse.json({
      success: true,
      data: { html: htmlString },
    })
  } catch (err) {
    console.error('[preview/generate] error:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to generate preview' },
      { status: 500 },
    )
  }
}
