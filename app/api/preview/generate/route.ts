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
    // Fallback to first result if all are "used"
    const fallback = photos[0]
    return fallback?.src?.landscape || fallback?.src?.large2x || fallback?.src?.large || null
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

    const svcQueries = queries.serviceImageQueries || []
    const svcResults: (string | null)[] = []
    for (let i = 0; i < 3; i++) {
      svcResults.push(await fetchPexelsImage(svcQueries[i] || `${typeName} ${i}`, apiKey, 'landscape', usedUrls))
    }

    const galQueries = queries.galleryImageQueries || []
    const galResults: (string | null)[] = []
    for (let i = 0; i < 4; i++) {
      galResults.push(await fetchPexelsImage(galQueries[i] || `${typeName} space ${i}`, apiKey, 'landscape', usedUrls))
    }

    const fallback = (url: string | null, seed: string) => url || `https://picsum.photos/seed/${seed}/600/400`

    return {
      hero: fallback(heroUrl, `${typeName}-hero`),
      cards: [
        fallback(svcResults[0], `${typeName}-svc0`),
        fallback(svcResults[1], `${typeName}-svc1`),
        fallback(svcResults[2], `${typeName}-svc2`),
        fallback(galResults[0], `${typeName}-gal0`),
        fallback(galResults[1], `${typeName}-gal1`),
        fallback(galResults[2], `${typeName}-gal2`),
        fallback(galResults[3], `${typeName}-gal3`),
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

  return { hero: heroUrl, cards: cardUrls, avatar: avatarUrl }
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
  projectCaptions?: string[]
  // Extended fields from preset content
  heroAccent?: string
  ctaNote?: string
  badge?: string
  aboutMission?: string
  testimonial?: { quote: string; author: string; rating: number }
  imageMood?: string
  heroImageQuery?: string
  aboutImageQuery?: string
  galleryImageQueries?: string[]
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

function buildCssVars(fonts: { headingFamily: string }, primaryColor: string, secondaryColor: string, theme: Theme = 'dark'): string {
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
      --primary: ${primaryColor};
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
    .ms-mobile-menu { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 150; flex-direction: column; align-items: center; justify-content: center; gap: 1.5rem; }
    .ms-mobile-menu.open { display: flex; }
    .ms-mobile-menu a { color: #fff; text-decoration: none; font-family: var(--body-font); font-size: 1.2rem; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.75rem 2rem; border: 1px solid rgba(255,255,255,0.2); border-radius: 999px; transition: all 0.3s; }
    .ms-mobile-menu a:hover { border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.05); }
    .ms-close { position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none; color: #fff; font-size: 2rem; cursor: pointer; line-height: 1; }

    @media (max-width: 768px) {
      .ms-burger { display: flex; }
      .ms-nav-links { display: none !important; }
      nav { padding: 0 1rem !important; height: auto !important; min-height: 56px; }

      section { padding: 40px 0 !important; }
      section > div { padding: 0 1.25rem !important; }

      /* All multi-col grids → 1 col */
      .ms-grid { grid-template-columns: 1fr !important; }

      /* Flex process rows → vertical */
      .ms-flex { flex-direction: column !important; }
      .ms-flex > svg, .ms-arrow { transform: rotate(90deg); margin: 0.5rem auto !important; padding: 0 !important; }

      /* Hero sections */
      section:first-of-type { min-height: auto !important; padding-top: 30px !important; padding-bottom: 30px !important; }

      /* Fixed heights → sensible mobile height */
      .ms-img { height: 220px !important; }

      /* Sticky → static on mobile */
      .ms-sticky { position: static !important; }

      /* Footer */
      footer div { grid-template-columns: 1fr !important; }
      footer > div > div { grid-template-columns: 1fr !important; gap: 2rem !important; }

      /* Scale type */
      h1 { font-size: clamp(1.6rem, 7vw, 2.2rem) !important; line-height: 1.15 !important; }
      h2 { font-size: clamp(1.3rem, 5vw, 1.8rem) !important; }

      /* Form */
      form .ms-grid { grid-template-columns: 1fr !important; }

      /* Gallery cells */
      .pf-cell { height: 180px !important; }
    }

    @media (max-width: 480px) {
      section { padding: 30px 0 !important; }
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
  <div id="ms-mob-menu" class="ms-mobile-menu">
    <button class="ms-close" onclick="this.parentElement.classList.remove('open')">&times;</button>
    ${menuLinks.map(l => `<a href="${l.href}" onclick="this.parentElement.classList.remove('open')">${l.label}</a>`).join('\n    ')}
    <a href="#contact" onclick="this.parentElement.classList.remove('open')" style="background:var(--primary);border-color:var(--primary)">${content.ctaPrimary}</a>
  </div>`
}

function buildStandardNav(businessName: string, content: GeneratedContent, navFlags: ReturnType<typeof resolveNavLinks>): string {
  const allLinks = navFlags.allLinks
  const desktopLinks = allLinks.slice(0, 3).map(l =>
    `<a href="${l.href}" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:0.85rem;font-weight:400">${l.label}</a>`
  )
  const hasOverflow = allLinks.length > 3

  return `
  <nav class="ms-sticky" style="background:var(--primary);position:sticky;top:0;z-index:100">
    <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 2rem">
      <a href="#" style="font-family:var(--heading-font);font-size:1.3rem;font-weight:700;color:#fff;text-decoration:none">${businessName}</a>
      <div style="display:flex;align-items:center;gap:2rem">
        <div class="ms-nav-links" style="display:flex;align-items:center;gap:2rem">
          ${desktopLinks.join('\n          ')}
        </div>
        ${hasOverflow ? `<button onclick="document.getElementById('ms-mob-menu').classList.add('open')" style="background:none;border:none;color:#fff;font-size:1.4rem;cursor:pointer;padding:0.25rem;line-height:1" class="ms-nav-links" aria-label="More">&#9776;</button>` : ''}
        <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:var(--primary);background:#fff;padding:0.55rem 1.5rem;border-radius:999px;text-decoration:none">${content.ctaPrimary}</a>
      </div>
      ${buildBurgerButton('#fff')}
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
  const serviceLinks = content.services.map(s =>
    `<a href="#services" style="color:var(--text-muted);text-decoration:none;font-size:0.85rem;transition:color 0.2s;display:block;margin-bottom:0.6rem">${s.name}</a>`
  ).join('\n            ')

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

// ---------- Visual Template (photo-heavy) ----------
function buildVisualTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]
  const galleryImgs = [
    images[4] || stockImages.cards[3],
    stockImages.cards[4],
    stockImages.cards[5],
  ]

  const servicesSection = `
    <section id="services" style="padding:100px 0;background:var(--bg-alt)">
      <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
        <p style="font-size:0.85rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--primary);margin-bottom:1rem;font-family:var(--body-font);font-weight:600">${content.heroEyebrow}</p>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);margin-bottom:3rem;line-height:1.2">${content.servicesHeading}</h2>
        <div class="ms-grid" style="display:grid;grid-template-columns:55% 45%;gap:3rem;align-items:start">
          <!-- Left: featured image -->
          <div class="ms-img" style="overflow:hidden;border-radius:16px;height:520px">
            <img src="${serviceImgs[0]}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <!-- Right: stacked services list -->
          <div>
            ${content.services.map((s, i) => `
              <div style="border-top:1px solid var(--border);padding:1.5rem 0${i === content.services.length - 1 ? ';border-bottom:1px solid var(--border)' : ''}">
                <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.15em;color:var(--text-muted);margin-bottom:0.5rem">0${i + 1}</div>
                <h3 style="font-family:var(--heading-font);font-size:1.4rem;font-weight:400;color:var(--text);margin:0 0 0.75rem 0;line-height:1.2">${s.name}</h3>
                <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.7;margin:0 0 1rem 0">${s.description}</p>
                <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
                  ${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.75rem;padding:0.3rem 0.75rem;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--text-muted);border:1px solid var(--border)">${t}</span>`).join('')}
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>`

  const gallerySection = `
    <section id="gallery" style="padding:100px 0;background:var(--bg)">
      <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);margin-bottom:3rem;text-align:center;line-height:1.2">${content.galleryHeading}</h2>
        <div class="ms-grid" style="display:grid;grid-template-columns:1.2fr 1fr;gap:1.5rem;grid-template-rows:auto auto">
          <div class="ms-img" style="grid-row:1/3;border-radius:16px;overflow:hidden;min-height:400px">
            <img src="${galleryImgs[0]}" alt="Gallery" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <div style="border-radius:16px;overflow:hidden;min-height:190px">
            <img src="${galleryImgs[1]}" alt="Gallery" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <div style="border-radius:16px;overflow:hidden;min-height:190px">
            <img src="${galleryImgs[2]}" alt="Gallery" style="width:100%;height:100%;object-fit:cover" />
          </div>
        </div>
      </div>
    </section>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor)}

${buildStandardNav(businessName, content, navFlags)}

  <!-- Hero -->
  <section style="position:relative;min-height:90vh;display:flex;align-items:center;overflow:hidden">
    <div style="position:absolute;inset:0">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.6) 50%,rgba(0,0,0,0.75) 100%)"></div>
    </div>
    <div style="position:relative;max-width:1100px;margin:0 auto;padding:6rem 2rem 0;width:100%">
      ${content.badge ? `<div style="display:inline-block;font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.08em;padding:0.4rem 1rem;border-radius:999px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.8);margin-bottom:1.75rem">${content.badge}</div>` : ''}
      <p style="font-family:var(--body-font);font-size:0.85rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);margin-bottom:2rem;font-weight:600;text-shadow:0 1px 3px rgba(0,0,0,0.4)">${content.heroEyebrow}</p>
      <h1 style="font-family:var(--heading-font);font-size:clamp(3rem,6vw,5rem);font-weight:400;color:var(--text);line-height:1.05;margin-bottom:1.5rem;max-width:700px">${content.tagline}</h1>
      <p style="font-family:var(--body-font);font-size:1.15rem;color:var(--text-muted);max-width:520px;line-height:1.7;margin-bottom:${content.heroAccent ? '1rem' : '2.5rem'}">${content.heroSubtitle}</p>
      ${content.heroAccent ? `<p style="font-family:var(--body-font);font-size:1.2rem;color:var(--primary);font-weight:600;margin-bottom:2.5rem;text-shadow:0 1px 3px rgba(0,0,0,0.4)">${content.heroAccent}</p>` : ''}
      <div style="display:flex;gap:1rem;align-items:center">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.95rem;font-weight:600;padding:1rem 2.5rem;background:var(--primary);color:#fff;border-radius:999px;text-decoration:none;transition:opacity 0.2s">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:var(--body-font);font-size:0.95rem;font-weight:500;padding:1rem 2rem;background:transparent;color:var(--text);border:1px solid rgba(255,255,255,0.25);border-radius:999px;text-decoration:none;transition:all 0.2s">${content.ctaSecondary}</a>
      </div>
      ${content.ctaNote ? `<p style="font-family:var(--body-font);font-size:0.8rem;color:rgba(255,255,255,0.5);margin-top:1rem">${content.ctaNote}</p>` : ''}
    </div>
  </section>

  ${servicesSection}
  ${gallerySection}
  ${buildAboutSection(content)}
  ${buildTestimonialSection(content)}
  ${buildContactSection(content, locationInfo)}

${buildFooter(businessName, content)}

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

  // Light cards get a subtle shadow; dark cards get border
  const cardStyle = theme === 'light'
    ? 'border-radius:16px;background:var(--card-bg);box-shadow:0 1px 3px rgba(0,0,0,0.08),0 1px 2px rgba(0,0,0,0.06);padding:2rem'
    : 'border-radius:16px;background:var(--card-bg);border:1px solid var(--border);padding:2rem'

  const serviceCardStyle = theme === 'light'
    ? 'border-radius:16px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.06),0 4px 16px rgba(0,0,0,0.04);border:1px solid rgba(0,0,0,0.06);padding:2.5rem 2rem;transition:box-shadow 0.2s,transform 0.2s'
    : 'border-radius:16px;background:var(--card-bg);border:1px solid var(--border);padding:2.5rem 2rem;transition:box-shadow 0.2s,transform 0.2s'

  const servicesSection = `
    <section id="services" style="padding:100px 0;background:var(--bg-alt)">
      <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
        <p style="font-size:0.85rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--primary);margin-bottom:1rem;font-family:var(--body-font);font-weight:600">${content.heroEyebrow}</p>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);margin-bottom:3rem;line-height:1.2">${content.servicesHeading}</h2>
        <div class="ms-flex" style="display:flex;align-items:stretch;gap:1.5rem">
          ${content.services.map((s, i) => `${i > 0 ? `
            <div class="ms-arrow" style="display:flex;align-items:center;flex-shrink:0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="display:block">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>` : ''}
            <div style="flex:1;${serviceCardStyle}">
              <div style="width:64px;height:64px;border-radius:50%;background:rgba(${pr},${pg},${pb},0.1);display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem">
                <span style="font-size:1.6rem;color:var(--primary)">${s.icon ? (iconMap[s.icon] || defaultServiceIcons[i] || defaultServiceIcons[0]) : (defaultServiceIcons[i] || defaultServiceIcons[0])}</span>
              </div>
              <h3 style="font-family:var(--heading-font);font-size:1.25rem;font-weight:600;color:var(--text);margin:0 0 0.75rem 0">${s.name}</h3>
              <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.7;margin:0">${s.description}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>`

  // Professional categories get a Werksmans-inspired image grid + stats bar instead of "How It Works"
  const isProfessionalCategory = businessCategory === 'professional'
  const showProcessSection = !isProfessionalCategory

  const steps = content.processSteps || [
    { step: '1', title: 'Get in Touch', description: 'Reach out and tell us what you need' },
    { step: '2', title: 'We Plan', description: 'We create a tailored approach for your project' },
    { step: '3', title: 'We Deliver', description: 'Professional execution with quality guaranteed' },
  ]

  // Werksmans-style image grid + stats bar for professional types
  const tileLabels = ['Who We Are', 'Our Approach', 'Our Work', 'Our Team']
  const tileImgs = [
    stockImages.cards[3] || stockImages.hero,
    stockImages.cards[4] || stockImages.cards[0],
    stockImages.cards[5] || stockImages.cards[1],
    stockImages.cards[6] || stockImages.cards[2],
  ]
  const statIcons = ['&#9878;', '&#9734;', '&#9823;'] // scales, star, person — generic professional

  const professionalSection = !isProfessionalCategory ? '' : `
    <section style="padding:0;background:var(--bg)">
      <!-- 2x2 greyscale image grid with accent label pills -->
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:0">
        ${tileImgs.map((img, i) => `
        <div class="ms-img" style="position:relative;height:280px;overflow:hidden">
          <img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover;filter:grayscale(100%)" />
          <div style="position:absolute;bottom:1.25rem;left:1.25rem;font-family:var(--body-font);font-size:0.95rem;font-weight:700;color:#1a1a1a;padding:0.65rem 1.25rem;background:rgba(${pr},${pg},${pb},0.85);backdrop-filter:blur(4px)">${tileLabels[i]}</div>
        </div>`).join('')}
      </div>
      <!-- Stats bar -->
      <div style="background:var(--bg-alt);border-top:3px solid var(--primary);padding:60px 2rem">
        <div class="ms-grid" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(${Math.min(content.stats.length, 3)},1fr);gap:3rem;text-align:center">
          ${content.stats.slice(0, 3).map((s, i) => `
          <div>
            <div style="font-size:2rem;color:var(--primary);margin-bottom:0.75rem">${statIcons[i % statIcons.length]}</div>
            <div style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:var(--text);margin-bottom:0.35rem">${s.value}</div>
            <div style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;color:var(--text)">${s.label}</div>
            ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem">${s.sublabel}</div>` : ''}
          </div>`).join('')}
        </div>
      </div>
    </section>`

  const processSection = isProfessionalCategory ? professionalSection : !showProcessSection ? '' : `
    <section id="gallery" style="padding:100px 0;background:var(--bg)">
      <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);margin-bottom:1rem;text-align:center;line-height:1.2">How It Works</h2>
        <p style="font-family:var(--body-font);font-size:1rem;color:var(--text-muted);text-align:center;margin-bottom:4rem;max-width:500px;margin-left:auto;margin-right:auto">A simple, straightforward process designed around you.</p>
        <div class="ms-flex" style="display:flex;align-items:stretch;gap:0">
          ${steps.map((s, i) => `${i > 0 ? `
            <div class="ms-arrow" style="display:flex;align-items:center;flex-shrink:0;padding:0 0.75rem">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>` : ''}
            <div style="flex:1;${cardStyle};text-align:center;display:flex;flex-direction:column;align-items:center">
              <div style="width:72px;height:72px;border-radius:50%;background:rgba(${pr},${pg},${pb},0.08);display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem">
                <span style="font-family:var(--heading-font);font-size:1.75rem;font-weight:700;color:var(--primary)">${s.step}</span>
              </div>
              <h3 style="font-family:var(--heading-font);font-size:1.2rem;font-weight:700;color:var(--text);margin:0 0 0.75rem 0">${s.title}</h3>
              <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.7;margin:0">${s.description}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, theme)}

${buildStandardNav(businessName, content, navFlags)}

  <!-- Hero -->
  <section style="position:relative;min-height:90vh;display:flex;align-items:center;overflow:hidden">
    ${theme === 'dark' ? '' : `<div style="position:absolute;inset:0">
      <img src="${images[0] || stockImages.hero}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.65) 50%,rgba(0,0,0,0.8) 100%)"></div>
    </div>`}
    <div style="position:relative;max-width:1100px;margin:0 auto;padding:6rem 2rem 0;width:100%">
      ${content.badge ? `<div style="display:inline-block;font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.08em;padding:0.4rem 1rem;border-radius:999px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.8);margin-bottom:1.75rem">${content.badge}</div>` : ''}
      <p style="font-family:var(--body-font);font-size:0.85rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);margin-bottom:2rem;font-weight:600;text-shadow:0 1px 3px rgba(0,0,0,0.4)">${content.heroEyebrow}</p>
      <h1 style="font-family:var(--heading-font);font-size:clamp(3rem,6vw,5rem);font-weight:400;color:#f5f5f0;line-height:1.05;margin-bottom:1.5rem;max-width:700px">${content.tagline}</h1>
      <p style="font-family:var(--body-font);font-size:1.15rem;color:#a3a3a0;max-width:520px;line-height:1.7;margin-bottom:${content.heroAccent ? '1rem' : '2.5rem'}">${content.heroSubtitle}</p>
      ${content.heroAccent ? `<p style="font-family:var(--body-font);font-size:1.2rem;color:var(--primary);font-weight:600;margin-bottom:2.5rem;text-shadow:0 1px 3px rgba(0,0,0,0.4)">${content.heroAccent}</p>` : ''}
      <div style="display:flex;gap:1rem;align-items:center;margin-bottom:${content.ctaNote ? '0.75rem' : '4rem'}">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.95rem;font-weight:600;padding:1rem 2.5rem;background:var(--primary);color:#fff;border-radius:999px;text-decoration:none;transition:opacity 0.2s">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:var(--body-font);font-size:0.95rem;font-weight:500;padding:1rem 2rem;background:transparent;color:#f5f5f0;border:1px solid rgba(255,255,255,0.25);border-radius:999px;text-decoration:none;transition:all 0.2s">${content.ctaSecondary}</a>
      </div>
      ${content.ctaNote ? `<p style="font-family:var(--body-font);font-size:0.8rem;color:rgba(255,255,255,0.5);margin-bottom:4rem">${content.ctaNote}</p>` : ''}
      <!-- Stats row -->
      <div style="display:flex;gap:3rem;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.12)">
        ${content.stats.slice(0, 4).map(s => `
          <div>
            <div style="font-family:var(--heading-font);font-size:2.25rem;font-weight:700;color:#f5f5f0">${s.value}</div>
            <div style="font-family:var(--body-font);font-size:0.85rem;color:#a3a3a0;margin-top:0.25rem">${s.label}</div>
            ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.75rem;color:rgba(255,255,255,0.35);margin-top:0.15rem">${s.sublabel}</div>` : ''}
          </div>`).join('')}
      </div>
    </div>
  </section>

  ${servicesSection}
  ${processSection}
  ${buildAboutSection(content)}
  ${buildTestimonialSection(content)}
  ${buildContactSection(content, locationInfo)}

${buildFooter(businessName, content, theme)}

</body>
</html>`
}

// ---------- Portfolio Template (gallery-focused) ----------
function buildPortfolioTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]
  const galleryImgs = [
    images[4] || stockImages.cards[3],
    images[5] || stockImages.cards[4],
    images[6] || stockImages.cards[5],
    images[7] || stockImages.cards[6],
    images[8] || stockImages.cards[7],
  ]

  const captions = content.projectCaptions || ['Featured Project', 'Recent Work', 'Client Project', 'Latest Design']

  const servicesSection = `
    <style>
      .pf-acc-btn { cursor:pointer;width:100%;background:none;border:none;padding:0;text-align:left }
      .pf-acc-body { overflow:hidden;max-height:0;transition:max-height 0.35s ease }
      .pf-acc-body.pf-open { max-height:300px }
      .pf-acc-icon { transition:transform 0.3s ease;font-size:1.5rem;color:var(--text-muted) }
      .pf-acc-icon.pf-open { transform:rotate(45deg) }
    </style>
    <section id="services" style="padding:100px 0;background:var(--bg-alt)">
      <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);margin-bottom:3rem;line-height:1.2">${content.servicesHeading}</h2>
        <div class="ms-grid" style="display:grid;grid-template-columns:55% 45%;gap:3rem;align-items:start">
          <!-- Left: service image -->
          <div class="ms-sticky" style="position:sticky;top:2rem">
            <div class="ms-img" style="overflow:hidden;height:560px">
              ${serviceImgs.map((img, i) => `<img id="pf-svc-img-${i}" src="${img}" alt="" style="width:100%;height:100%;object-fit:cover;display:${i === 0 ? 'block' : 'none'}" />`).join('')}
            </div>
          </div>
          <!-- Right: accordion -->
          <div>
            ${content.services.map((s, i) => `
              <div style="border-top:1px solid var(--border)${i === content.services.length - 1 ? ';border-bottom:1px solid var(--border)' : ''}">
                <button class="pf-acc-btn" onclick="(function(){var items=document.querySelectorAll('.pf-acc-body');var icons=document.querySelectorAll('.pf-acc-icon');var imgs=document.querySelectorAll('[id^=pf-svc-img]');items.forEach(function(el,j){if(j===${i}){el.classList.toggle('pf-open');icons[j].classList.toggle('pf-open')}else{el.classList.remove('pf-open');icons[j].classList.remove('pf-open')}});imgs.forEach(function(el,j){el.style.display=j===${i}?'block':'none'})})()" style="display:flex;align-items:center;justify-content:space-between;padding:1.75rem 0;width:100%;background:none;border:none;cursor:pointer">
                  <div>
                    <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.15em;color:var(--text-muted);margin-bottom:0.5rem">0${i + 1}</div>
                    <h3 style="font-family:var(--heading-font);font-size:clamp(1.4rem,2.5vw,1.8rem);font-weight:400;color:var(--text);margin:0;line-height:1.2">${s.name}</h3>
                  </div>
                  <span class="pf-acc-icon${i === 0 ? ' pf-open' : ''}">+</span>
                </button>
                <div class="pf-acc-body${i === 0 ? ' pf-open' : ''}" style="padding:0 0 1.5rem">
                  <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.7;margin:0 0 1rem 0">${s.description}</p>
                  <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
                    ${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.75rem;padding:0.3rem 0.75rem;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--text-muted);border:1px solid var(--border)">${t}</span>`).join('')}
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>`

  const gallerySection = `
    <style>
      .pf-cell { position:relative;overflow:hidden }
      .pf-cell img { width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.4s ease }
      .pf-cell:hover img { transform:scale(1.03) }
      .pf-cap { position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);opacity:0;transition:opacity 0.3s ease }
      .pf-cell:hover .pf-cap { opacity:1 }
      .pf-cap span { font-family:var(--body-font);font-size:0.95rem;color:#fff;font-weight:500;letter-spacing:0.03em }
    </style>
    <section id="gallery" style="padding:80px 0 0;background:var(--bg)">
      <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);margin-bottom:3rem;text-align:center;line-height:1.2">${content.galleryHeading}</h2>
      </div>
      <div style="max-width:1200px;margin:0 auto">
        <div class="ms-grid" style="display:grid;grid-template-columns:65% 35%;height:400px;gap:2px">
          <div class="pf-cell">
            <img src="${galleryImgs[0]}" alt="${captions[0] || 'Project'}" />
            <div class="pf-cap"><span>${captions[0] || 'Project'}</span></div>
          </div>
          <div class="pf-cell">
            <img src="${galleryImgs[1]}" alt="${captions[1] || 'Project'}" />
            <div class="pf-cap"><span>${captions[1] || 'Project'}</span></div>
          </div>
        </div>
        <div class="ms-grid" style="display:grid;grid-template-columns:40% 60%;height:340px;gap:2px;margin-top:2px">
          <div class="pf-cell">
            <img src="${galleryImgs[2]}" alt="${captions[2] || 'Project'}" />
            <div class="pf-cap"><span>${captions[2] || 'Project'}</span></div>
          </div>
          <div class="pf-cell">
            <img src="${galleryImgs[3]}" alt="${captions[3] || 'Project'}" />
            <div class="pf-cap"><span>${captions[3] || 'Project'}</span></div>
          </div>
        </div>
        ${galleryImgs[4] ? `<div style="display:grid;grid-template-columns:1fr;height:360px;gap:2px;margin-top:2px">
          <div class="pf-cell">
            <img src="${galleryImgs[4]}" alt="${captions[4] || 'Project'}" />
            <div class="pf-cap"><span>${captions[4] || 'Project'}</span></div>
          </div>
        </div>` : ''}
      </div>
    </section>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor)}

${buildStandardNav(businessName, content, navFlags)}

  <!-- Hero — dramatic full-bleed with heavier gradient -->
  <section style="position:relative;min-height:90vh;display:flex;align-items:center;justify-content:center;overflow:hidden;text-align:center">
    <div style="position:absolute;inset:0">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.75) 60%,rgba(0,0,0,0.88) 100%)"></div>
    </div>
    <div style="position:relative;max-width:800px;margin:0 auto;padding:6rem 2rem 0">
      ${content.badge ? `<div style="display:inline-block;font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.08em;padding:0.4rem 1rem;border-radius:999px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.8);margin-bottom:1.75rem">${content.badge}</div>` : ''}
      <p style="font-family:var(--body-font);font-size:0.85rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);margin-bottom:2rem;font-weight:600;text-shadow:0 1px 3px rgba(0,0,0,0.4)">${content.heroEyebrow}</p>
      <h1 style="font-family:var(--heading-font);font-size:clamp(3rem,6vw,5.5rem);font-weight:400;color:var(--text);line-height:1.05;margin-bottom:1.5rem">${content.tagline}</h1>
      <p style="font-family:var(--body-font);font-size:1.15rem;color:var(--text-muted);max-width:520px;margin:0 auto ${content.heroAccent ? '1rem' : '2.5rem'};line-height:1.7">${content.heroSubtitle}</p>
      ${content.heroAccent ? `<p style="font-family:var(--body-font);font-size:1.2rem;color:var(--primary);font-weight:600;margin-bottom:2.5rem;text-shadow:0 1px 3px rgba(0,0,0,0.4)">${content.heroAccent}</p>` : ''}
      <div style="display:flex;gap:1rem;justify-content:center">
        <a href="#gallery" style="font-family:var(--body-font);font-size:0.95rem;font-weight:600;padding:1rem 2.5rem;background:var(--primary);color:#fff;border-radius:999px;text-decoration:none;transition:opacity 0.2s">${content.ctaPrimary}</a>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.95rem;font-weight:500;padding:1rem 2rem;background:transparent;color:var(--text);border:1px solid rgba(255,255,255,0.25);border-radius:999px;text-decoration:none;transition:all 0.2s">${content.ctaSecondary}</a>
      </div>
      ${content.ctaNote ? `<p style="font-family:var(--body-font);font-size:0.8rem;color:rgba(255,255,255,0.5);margin-top:1rem">${content.ctaNote}</p>` : ''}
    </div>
  </section>

  ${servicesSection}
  ${gallerySection}
  ${buildAboutSection(content)}
  ${buildTestimonialSection(content)}
  ${buildContactSection(content, locationInfo)}

${buildFooter(businessName, content)}

</body>
</html>`
}

// ---------- Property Template (v0 Real Estate–inspired) ----------
function buildPropertyTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]

  const prBg = '#ffffff'
  const prAlt = '#faf7f4'
  const prText = '#1a1a2e'
  const prMuted = '#64748b'
  const prCopper = primaryColor || '#b5651d'

  // Section 1: Full-bleed hero — tracked eyebrow, huge serif business name, subtitle, 2 CTAs
  const heroSection = `
  <section style="position:relative;min-height:90vh;display:flex;align-items:center;justify-content:center;overflow:hidden;text-align:center">
    <div style="position:absolute;inset:0">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:rgba(0,0,0,0.45)"></div>
    </div>
    <div style="position:relative;max-width:900px;padding:0 2rem">
      <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:500;color:rgba(255,255,255,0.7);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:1.5rem">${content.heroEyebrow || 'Premium Real Estate Services'}</p>
      <h1 style="font-family:var(--heading-font);font-size:clamp(3rem,7vw,5.5rem);font-weight:700;color:#fff;line-height:1;margin-bottom:1.5rem;text-transform:uppercase;letter-spacing:0.02em">${businessName}</h1>
      <p style="font-family:var(--body-font);font-size:1.05rem;color:rgba(255,255,255,0.8);max-width:600px;margin:0 auto 2rem;line-height:1.7">${content.heroSubtitle}</p>
      <div style="display:flex;gap:0.75rem;justify-content:center">
        <a href="#properties" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--body-font);font-size:0.9rem;font-weight:500;padding:0.85rem 2rem;border:1px solid rgba(255,255,255,0.5);color:#fff;border-radius:8px;text-decoration:none">View Properties &rarr;</a>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;padding:0.85rem 2rem;background:${prCopper};color:#fff;border-radius:8px;text-decoration:none">${content.ctaPrimary}</a>
      </div>
    </div>
  </section>`

  // Section 2: About — photo left with floating stat badge, eyebrow + heading + paragraphs + stats right
  const aboutParagraphs = content.aboutText.split('\n').filter(p => p.trim())
  const aboutSection = `
  <section id="about" style="padding:80px 2rem;background:${prBg}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center">
      <div style="position:relative">
        <div class="ms-img" style="border-radius:16px;overflow:hidden;height:550px">
          <img src="${serviceImgs[0]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div style="position:absolute;bottom:-1.5rem;right:-1.5rem;background:${prCopper};border-radius:12px;padding:1.5rem 2rem;color:#fff">
          <div style="font-family:var(--heading-font);font-size:1.8rem;font-weight:700;line-height:1">${content.stats[0]?.value || '15+'}</div>
          <div style="font-family:var(--body-font);font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;margin-top:0.25rem">${content.stats[0]?.label || 'Years of Excellence'}</div>
        </div>
      </div>
      <div>
        <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:500;color:${prMuted};letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.5rem">About Us</p>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:${prText};margin-bottom:1.5rem">${content.aboutHeading}</h2>
        ${aboutParagraphs.map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:${prMuted};line-height:1.8;margin-bottom:1rem">${p}</p>`).join('')}
        <div class="ms-grid" style="display:grid;grid-template-columns:repeat(${Math.min(content.stats.length, 4)},1fr);gap:1.5rem;margin-top:2rem">
          ${content.stats.slice(0, 4).map(s => `
          <div>
            <div style="font-family:var(--heading-font);font-size:1.5rem;font-weight:700;color:${prCopper}">${s.value}</div>
            <div style="font-family:var(--body-font);font-size:0.8rem;color:${prMuted}">${s.label}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>`

  // Section 3: Featured Properties — eyebrow + heading + 3 property cards with "For Sale" badge
  const propertiesSection = `
  <section id="properties" style="padding:80px 2rem;background:${prAlt}">
    <div style="max-width:1200px;margin:0 auto;text-align:center">
      <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:500;color:${prMuted};letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.5rem">Our Portfolio</p>
      <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:${prText};margin-bottom:1rem">${content.galleryHeading || 'Featured Properties'}</h2>
      <p style="font-family:var(--body-font);font-size:1rem;color:${prMuted};margin-bottom:3rem">${content.aboutMission || content.heroSubtitle}</p>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;text-align:left">
        ${content.services.slice(0, 3).map((s, i) => `
        <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
          <div class="ms-img" style="position:relative;height:250px;overflow:hidden">
            <img src="${serviceImgs[i % serviceImgs.length]}" alt="" style="width:100%;height:100%;object-fit:cover" />
            <div style="position:absolute;top:1rem;left:1rem;background:${prCopper};color:#fff;font-family:var(--body-font);font-size:0.7rem;font-weight:600;padding:0.35rem 0.75rem;border-radius:4px">For Sale</div>
          </div>
          <div style="padding:1.5rem">
            <div style="display:flex;align-items:center;gap:0.35rem;margin-bottom:0.35rem">
              <span style="color:${prMuted};font-size:0.85rem">&#9906;</span>
              <span style="font-family:var(--body-font);font-size:0.8rem;color:${prMuted}">${s.tags[0] || locationInfo.city}</span>
            </div>
            <h3 style="font-family:var(--heading-font);font-size:1.15rem;font-weight:700;color:${prText};margin-bottom:0.5rem">${s.name}</h3>
            <p style="font-family:var(--body-font);font-size:0.85rem;color:${prMuted};line-height:1.6">${s.description}</p>
          </div>
        </div>`).join('')}
      </div>
      <a href="#contact" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:${prCopper};text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;margin-top:2.5rem">View All Properties &rarr;</a>
    </div>
  </section>`

  // Section 4: Services — eyebrow + heading + 2x2 icon cards
  const servicesSection = `
  <section id="services" style="padding:80px 2rem;background:${prAlt}">
    <div style="max-width:1200px;margin:0 auto;text-align:center">
      <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:500;color:${prMuted};letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.5rem">What We Offer</p>
      <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:${prText};margin-bottom:1rem">${content.servicesHeading}</h2>
      <p style="font-family:var(--body-font);font-size:1rem;color:${prMuted};margin-bottom:3rem">${content.heroSubtitle}</p>
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;text-align:left">
        ${content.services.map(s => `
        <div style="border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:2rem">
          <div style="font-size:2rem;color:${prCopper};margin-bottom:1rem">${mapIcon(s.icon)}</div>
          <h3 style="font-family:var(--heading-font);font-size:1.15rem;font-weight:700;color:${prText};margin-bottom:0.5rem">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:${prMuted};line-height:1.7">${s.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 5: Testimonials — copper bg, 3 quote cards with quote marks
  const testimonialSection = content.testimonial ? `
  <section style="padding:80px 2rem;background:${prCopper}">
    <div style="max-width:1200px;margin:0 auto;text-align:center">
      <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:500;color:rgba(255,255,255,0.7);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.5rem">Client Stories</p>
      <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:#fff;margin-bottom:3rem">${content.galleryHeading ? 'What Our Clients Say' : 'What Our Clients Say'}</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;text-align:left">
        <div style="border:1px solid rgba(255,255,255,0.2);border-radius:12px;padding:2rem">
          <div style="font-size:2.5rem;color:rgba(255,255,255,0.3);line-height:1;margin-bottom:1rem">&#10077;</div>
          <p style="font-family:var(--body-font);font-size:0.95rem;color:rgba(255,255,255,0.9);line-height:1.7;margin-bottom:1.5rem">"${content.testimonial.quote}"</p>
          <div style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:#fff">${content.testimonial.author.split(',')[0]}</div>
          <div style="font-family:var(--body-font);font-size:0.8rem;color:rgba(255,255,255,0.6)">${content.testimonial.author.split(',')[1]?.trim() || ''}</div>
        </div>
        ${[0,1].map(i => `
        <div style="border:1px solid rgba(255,255,255,0.2);border-radius:12px;padding:2rem">
          <div style="font-size:2.5rem;color:rgba(255,255,255,0.3);line-height:1;margin-bottom:1rem">&#10077;</div>
          <p style="font-family:var(--body-font);font-size:0.95rem;color:rgba(255,255,255,0.9);line-height:1.7;margin-bottom:1.5rem">"${i === 0 ? 'Sold our property above asking price. Expert marketing and negotiation.' : 'Patient guidance through every step. Now proud homeowners!'}"</p>
          <div style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:#fff">${i === 0 ? 'Robert W.' : 'Emily & David P.'}</div>
          <div style="font-family:var(--body-font);font-size:0.8rem;color:rgba(255,255,255,0.6)">${i === 0 ? 'Seller' : 'First-time Buyers'}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  // Section 6: Contact — 2-column: info left, form card right
  const contactSection = `
  <section id="contact" style="padding:80px 2rem;background:${prBg}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:start">
      <div>
        <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:500;color:${prCopper};letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.5rem">Get In Touch</p>
        <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:${prText};margin-bottom:1rem">${content.contactHeading}</h2>
        <p style="font-family:var(--body-font);font-size:0.95rem;color:${prMuted};line-height:1.7;margin-bottom:2.5rem">${content.aboutMission || content.heroSubtitle}</p>
        <div style="display:flex;flex-direction:column;gap:1.5rem">
          <div style="display:flex;align-items:center;gap:1rem">
            <div style="width:44px;height:44px;border-radius:50%;background:rgba(${parseInt(prCopper.slice(1,3),16)},${parseInt(prCopper.slice(3,5),16)},${parseInt(prCopper.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;color:${prCopper};font-size:1.1rem">&#9906;</div>
            <div><div style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:${prText}">Office Location</div><div style="font-family:var(--body-font);font-size:0.85rem;color:${prMuted}">${locationInfo.address}, ${locationInfo.city}</div></div>
          </div>
          <div style="display:flex;align-items:center;gap:1rem">
            <div style="width:44px;height:44px;border-radius:50%;background:rgba(${parseInt(prCopper.slice(1,3),16)},${parseInt(prCopper.slice(3,5),16)},${parseInt(prCopper.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;color:${prCopper};font-size:1.1rem">&#9742;</div>
            <div><div style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:${prText}">Phone</div><div style="font-family:var(--body-font);font-size:0.85rem;color:${prMuted}">${locationInfo.phone}</div></div>
          </div>
          <div style="display:flex;align-items:center;gap:1rem">
            <div style="width:44px;height:44px;border-radius:50%;background:rgba(${parseInt(prCopper.slice(1,3),16)},${parseInt(prCopper.slice(3,5),16)},${parseInt(prCopper.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;color:${prCopper};font-size:1.1rem">&#9993;</div>
            <div><div style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:${prText}">Email</div><div style="font-family:var(--body-font);font-size:0.85rem;color:${prMuted}">hello@${businessName.toLowerCase().replace(/\s/g,'')}.com</div></div>
          </div>
          ${content.contactHours ? `<div style="display:flex;align-items:center;gap:1rem">
            <div style="width:44px;height:44px;border-radius:50%;background:rgba(${parseInt(prCopper.slice(1,3),16)},${parseInt(prCopper.slice(3,5),16)},${parseInt(prCopper.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;color:${prCopper};font-size:1.1rem">&#9200;</div>
            <div><div style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:${prText}">Hours</div><div style="font-family:var(--body-font);font-size:0.85rem;color:${prMuted}">${content.contactHours.replace(/ · /g, '<br />')}</div></div>
          </div>` : ''}
        </div>
      </div>
      <div style="background:#fff;border-radius:16px;padding:2.5rem;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
        <h3 style="font-family:var(--heading-font);font-size:1.2rem;font-weight:700;color:${prText};margin-bottom:1.5rem">Send Us a Message</h3>
        <form style="display:flex;flex-direction:column;gap:1rem" onsubmit="return false">
          <div><label style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${prText};display:block;margin-bottom:0.35rem">Full Name</label><input type="text" placeholder="Your name" style="width:100%;box-sizing:border-box;font-family:var(--body-font);padding:0.75rem 1rem;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:0.9rem;outline:none" /></div>
          <div><label style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${prText};display:block;margin-bottom:0.35rem">Email Address</label><input type="email" placeholder="your@email.com" style="width:100%;box-sizing:border-box;font-family:var(--body-font);padding:0.75rem 1rem;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:0.9rem;outline:none" /></div>
          <div><label style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${prText};display:block;margin-bottom:0.35rem">Phone Number</label><input type="tel" placeholder="${locationInfo.phone}" style="width:100%;box-sizing:border-box;font-family:var(--body-font);padding:0.75rem 1rem;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:0.9rem;outline:none" /></div>
          <div><label style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${prText};display:block;margin-bottom:0.35rem">Message</label><textarea placeholder="Tell us about your real estate needs..." rows="4" style="width:100%;box-sizing:border-box;font-family:var(--body-font);padding:0.75rem 1rem;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:0.9rem;outline:none;resize:none"></textarea></div>
          <button type="submit" style="font-family:var(--body-font);padding:0.85rem 2rem;background:${prCopper};color:#fff;border:none;border-radius:8px;font-size:0.95rem;font-weight:600;cursor:pointer;width:100%">Send Message</button>
        </form>
      </div>
    </div>
  </section>`

  // Footer — 4-column: logo+desc | quick links | services | connect
  const prFooter = `
  <footer style="padding:4rem 2rem 2rem;background:${prText}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:3rem">
      <div>
        <div style="font-family:var(--heading-font);font-size:1.3rem;font-weight:700;color:#fff;margin-bottom:1rem">${businessName}</div>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.5);line-height:1.7;max-width:320px;margin-bottom:1.5rem">${content.heroSubtitle}</p>
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:#fff;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:1rem">Quick Links</h4>
        <a href="#properties" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Properties</a>
        <a href="#about" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">About Us</a>
        <a href="#services" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Services</a>
        <a href="#contact" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Contact</a>
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:#fff;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:1rem">Services</h4>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">${s.name}</a>`).join('')}
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:#fff;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:1rem">Connect</h4>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.5);margin-bottom:0.5rem">hello@${businessName.toLowerCase().replace(/\s/g,'')}.com</p>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.5)">${locationInfo.phone}</p>
      </div>
    </div>
    <div style="max-width:1200px;margin:2rem auto 0;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center">
      <p style="font-family:var(--body-font);font-size:0.75rem;color:rgba(255,255,255,0.3)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      <div style="display:flex;gap:1.5rem">
        <a href="#" style="font-family:var(--body-font);font-size:0.75rem;color:rgba(255,255,255,0.3);text-decoration:none">Privacy Policy</a>
        <a href="#" style="font-family:var(--body-font);font-size:0.75rem;color:rgba(255,255,255,0.3);text-decoration:none">Terms of Service</a>
      </div>
    </div>
  </footer>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')}
  <style>
    :root {
      --bg: ${prBg};
      --bg-alt: ${prAlt};
      --card-bg: ${prBg};
      --text: ${prText};
      --text-muted: ${prMuted};
      --border: rgba(0,0,0,0.06);
    }
  </style>

${buildStandardNav(businessName, content, navFlags)}

  ${heroSection}
  ${aboutSection}
  ${propertiesSection}
  ${servicesSection}
  ${testimonialSection}
  ${contactSection}

${prFooter}

</body>
</html>`
}

// ---------- Events-Entertainment Template (Zola–inspired) ----------
function buildEventsTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]

  const evtBg = '#ffffff'
  const evtText = '#1a1a1a'
  const evtMuted = '#6b6b6b'
  const evtTeal = primaryColor || '#2a6b6b'

  // Section 1: Full-bleed hero — centered text on photo
  const heroSection = `
  <section style="position:relative;min-height:90vh;display:flex;align-items:center;justify-content:center;overflow:hidden">
    <div style="position:absolute;inset:0">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:rgba(0,0,0,0.4)"></div>
    </div>
    <div style="position:relative;text-align:center;max-width:800px;padding:0 2rem">
      <h1 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5vw,4.5rem);font-weight:400;color:#fff;line-height:1.15;margin-bottom:1.25rem"><em>${content.tagline}</em></h1>
      <p style="font-family:var(--body-font);font-size:1.05rem;color:rgba(255,255,255,0.85);line-height:1.7;margin-bottom:2rem;max-width:550px;margin-left:auto;margin-right:auto">${content.heroSubtitle}</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:0.75rem">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.85rem 2rem;background:#fff;color:${evtText};border-radius:999px;text-decoration:none">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.85rem 2rem;background:transparent;color:#fff;border:1px solid #fff;border-radius:999px;text-decoration:none">${content.ctaSecondary}</a>
      </div>
    </div>
  </section>`

  // Section 2: Service grid — 3-column cards with arrow links + photos
  const serviceGrid = `
  <section id="services" style="padding:80px 2rem;background:${evtBg}">
    <div style="max-width:1200px;margin:0 auto">
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 3fr;gap:0;border:1px solid rgba(0,0,0,0.08);border-radius:16px;overflow:hidden">
        <div style="padding:2.5rem 2rem;display:flex;flex-direction:column;justify-content:center;border-right:1px solid rgba(0,0,0,0.08)">
          <h2 style="font-family:var(--heading-font);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:400;color:${evtText};line-height:1.3;margin-bottom:0.75rem"><em>${content.servicesHeading}</em></h2>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:${evtMuted};line-height:1.7">${content.aboutMission || content.heroSubtitle}</p>
        </div>
        <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr)">
          ${content.services.map((s, i) => `
          <div style="border-left:${i > 0 ? '1px solid rgba(0,0,0,0.08)' : 'none'};padding:1.5rem">
            <h3 style="font-family:var(--body-font);font-size:0.95rem;font-weight:600;color:${evtText};margin-bottom:0.35rem">${s.name} &rarr;</h3>
            <p style="font-family:var(--body-font);font-size:0.8rem;color:${evtMuted};line-height:1.6;margin-bottom:1rem">${s.description}</p>
            <div class="ms-img" style="border-radius:12px;overflow:hidden;height:200px">
              <img src="${serviceImgs[i % serviceImgs.length]}" alt="" style="width:100%;height:100%;object-fit:cover" />
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>`

  // Section 3: Alternating 50/50 feature sections — teal bg blocks
  const featureSections = content.services.slice(0, 2).map((s, i) => `
  <section style="background:${i % 2 === 0 ? evtTeal : evtBg}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;min-height:70vh">
      ${i % 2 === 0 ? `
      <div style="overflow:hidden">
        <img src="${serviceImgs[i % serviceImgs.length]}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>
      <div style="display:flex;flex-direction:column;justify-content:center;padding:4rem 3rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,3rem);font-weight:400;color:#fff;line-height:1.2;margin-bottom:1.25rem"><em>${s.name}</em></h2>
        <p style="font-family:var(--body-font);font-size:1rem;color:rgba(255,255,255,0.8);line-height:1.7;margin-bottom:2rem">${s.description}</p>
        <div style="display:flex;gap:0.75rem">
          <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.75rem 1.5rem;background:#fff;color:${evtText};border-radius:999px;text-decoration:none">${content.ctaPrimary}</a>
          <a href="#about" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.75rem 1.5rem;border:1px solid #fff;color:#fff;border-radius:999px;text-decoration:none">${content.ctaSecondary}</a>
        </div>
      </div>` : `
      <div style="display:flex;flex-direction:column;justify-content:center;padding:4rem 3rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,3rem);font-weight:400;color:${evtText};line-height:1.2;margin-bottom:1.25rem"><em>${s.name}</em></h2>
        <p style="font-family:var(--body-font);font-size:1rem;color:${evtMuted};line-height:1.7;margin-bottom:2rem">${s.description}</p>
        <div style="display:flex;gap:0.75rem">
          <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.75rem 1.5rem;background:${evtText};color:#fff;border-radius:999px;text-decoration:none">${content.ctaPrimary}</a>
          <a href="#about" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.75rem 1.5rem;border:1px solid ${evtText};color:${evtText};border-radius:999px;text-decoration:none">${content.ctaSecondary}</a>
        </div>
      </div>
      <div style="overflow:hidden">
        <img src="${serviceImgs[i % serviceImgs.length]}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>`}
    </div>
  </section>`).join('')

  // Section 4: About / expert advisors — photo left, text right
  const aboutSection = `
  <section id="about" style="padding:80px 2rem;background:${evtBg}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.2fr 1fr;gap:4rem;align-items:center">
      <div class="ms-img" style="border-radius:16px;overflow:hidden;height:450px">
        <img src="${serviceImgs[2] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>
      <div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:400;color:${evtText};line-height:1.3;margin-bottom:1.5rem">${content.aboutHeading}</h2>
        ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:${evtMuted};line-height:1.8;margin-bottom:1rem">${p}</p>`).join('')}
        <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.75rem 1.5rem;background:${evtText};color:#fff;border-radius:999px;text-decoration:none;margin-top:1rem">${content.ctaPrimary}</a>
      </div>
    </div>
  </section>`

  // Section 5: Category icon grid
  const categoryGrid = content.services.length > 0 ? `
  <section style="padding:60px 2rem;background:${evtBg};border-top:1px solid rgba(0,0,0,0.06)">
    <div style="max-width:1200px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:400;color:${evtText};margin-bottom:2.5rem">${content.galleryHeading || content.servicesHeading}</h2>
      <div style="display:flex;flex-wrap:wrap;gap:2.5rem;justify-content:center">
        ${content.services.map(s => `
        <div style="text-align:center">
          <div style="width:64px;height:64px;border-radius:50%;background:${evtTeal};display:flex;align-items:center;justify-content:center;margin:0 auto 0.75rem">
            <span style="font-size:1.2rem;color:#fff">${s.icon || '&#9733;'}</span>
          </div>
          <span style="font-family:var(--body-font);font-size:0.8rem;color:${evtText}">${s.name}</span>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  // Testimonial
  const testimonialSection = content.testimonial ? `
  <section style="padding:60px 2rem;background:${evtBg};border-top:1px solid rgba(0,0,0,0.06)">
    <div style="max-width:700px;margin:0 auto;text-align:center">
      <p style="font-family:var(--heading-font);font-size:1.2rem;font-weight:400;color:${evtText};line-height:1.7;font-style:italic;margin-bottom:1rem">"${content.testimonial.quote}"</p>
      <p style="font-family:var(--body-font);font-size:0.85rem;color:${evtMuted};font-weight:500">— ${content.testimonial.author}</p>
    </div>
  </section>` : ''

  // Footer
  const evtFooter = `
  <footer style="padding:4rem 2rem 2rem;background:${evtBg};border-top:1px solid rgba(0,0,0,0.08)">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr 1fr 1.5fr;gap:3rem">
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;color:${evtText};margin-bottom:1rem">Services</h4>
        ${content.services.map(s => `<a href="#services" style="color:${evtMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">${s.name}</a>`).join('')}
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;color:${evtText};margin-bottom:1rem">About</h4>
        <a href="#about" style="color:${evtMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Our Story</a>
        <a href="#contact" style="color:${evtMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Contact Us</a>
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;color:${evtText};margin-bottom:1rem">Support</h4>
        <a href="#" style="color:${evtMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Privacy Policy</a>
        <a href="#" style="color:${evtMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Terms of Service</a>
      </div>
      <div>
        <div style="font-family:var(--heading-font);font-size:1.3rem;font-weight:700;color:${evtText};margin-bottom:0.5rem">${businessName}</div>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${evtMuted};line-height:1.6;margin-bottom:1rem">${content.heroSubtitle}</p>
        <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:0.8rem;font-weight:600;padding:0.6rem 1.25rem;background:${evtText};color:#fff;border-radius:999px;text-decoration:none">${content.ctaPrimary}</a>
      </div>
    </div>
    <div style="max-width:1200px;margin:2rem auto 0;padding-top:2rem;border-top:1px solid rgba(0,0,0,0.06);text-align:center">
      <p style="font-family:var(--body-font);font-size:0.75rem;color:${evtMuted}">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
    </div>
  </footer>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')}
  <style>
    :root {
      --bg: ${evtBg};
      --bg-alt: #f5f5f5;
      --card-bg: ${evtBg};
      --text: ${evtText};
      --text-muted: ${evtMuted};
      --border: rgba(0,0,0,0.06);
    }
  </style>

${buildStandardNav(businessName, content, navFlags)}

  ${heroSection}
  ${serviceGrid}
  ${featureSections}
  ${aboutSection}
  ${categoryGrid}
  ${testimonialSection}
  ${buildContactSection(content, locationInfo)}

${evtFooter}

</body>
</html>`
}

// ---------- Professional Template (Mishcon–inspired) ----------
function buildProfessionalTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]

  const proBg = '#2a2a2a'
  const proText = '#f5f5f0'
  const proMuted = '#a0a0a0'
  const proRed = primaryColor || '#c0392b'

  // Section 1: Full-bleed hero with heading overlay + subtitle + red CTA
  const heroSection = `
  <section style="position:relative;min-height:90vh;display:flex;align-items:flex-end;overflow:hidden">
    <div style="position:absolute;inset:0">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.55) 100%)"></div>
    </div>
    <div style="position:relative;max-width:1300px;margin:0 auto;padding:0 2rem 5rem;width:100%">
      <h1 style="font-family:var(--heading-font);font-size:clamp(2.5rem,4.5vw,4rem);font-weight:400;color:#fff;line-height:1.15;margin-bottom:1rem;max-width:600px">${content.tagline}</h1>
      <p style="font-family:var(--body-font);font-size:1rem;color:rgba(255,255,255,0.8);max-width:450px;line-height:1.7;margin-bottom:2rem">${content.heroSubtitle}</p>
      <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.75rem 1.75rem;background:${proRed};color:#fff;border-radius:4px;text-decoration:none">${content.ctaPrimary}</a>
    </div>
  </section>`

  // Section 2: 4-column (or 3) service cards — photos + title + description + red link
  const serviceCards = `
  <section id="services" style="padding:80px 2rem;background:${proBg}">
    <div class="ms-grid" style="max-width:1300px;margin:0 auto;display:grid;grid-template-columns:repeat(${Math.min(content.services.length, 4)},1fr);gap:2rem">
      ${content.services.map((s, i) => `
      <div>
        <div class="ms-img" style="height:200px;overflow:hidden;margin-bottom:1.25rem">
          <img src="${serviceImgs[i % serviceImgs.length]}" alt="" style="width:100%;height:100%;object-fit:cover;filter:grayscale(0.3)" />
        </div>
        <h3 style="font-family:var(--heading-font);font-size:1.15rem;font-weight:400;color:${proText};margin-bottom:0.75rem">${s.name}</h3>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${proMuted};line-height:1.7;margin-bottom:1rem">${s.description}</p>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;color:${proRed};text-decoration:none;font-weight:500">${content.ctaSecondary || 'Read more'}</a>
      </div>`).join('')}
    </div>
  </section>`

  // Section 3: People / about — full-width photo bg with heading + text overlay
  const peopleSection = `
  <section id="about" style="position:relative;min-height:70vh;display:flex;align-items:center;overflow:hidden">
    <div style="position:absolute;inset:0">
      <img src="${serviceImgs[1] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.2) 100%)"></div>
    </div>
    <div style="position:relative;max-width:1300px;margin:0 auto;padding:0 2rem;width:100%">
      <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,3rem);font-weight:400;color:#fff;line-height:1.2;margin-bottom:1rem;font-style:italic">${content.aboutHeading}</h2>
      <p style="font-family:var(--body-font);font-size:0.95rem;color:rgba(255,255,255,0.8);max-width:450px;line-height:1.7;margin-bottom:1.5rem">${content.aboutText.split('\n')[0]}</p>
      <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.65rem 1.5rem;background:${proRed};color:#fff;border-radius:4px;text-decoration:none">${content.ctaSecondary || 'Learn More'}</a>
    </div>
  </section>`

  // Werksmans-style 2x2 image grid with accent label pills
  const tileLabels = ['Who We Are', 'Our Approach', 'Our Work', 'Our Team']
  const tileImgs = [
    stockImages.cards[3] || `https://picsum.photos/seed/${businessName}-tile0/600/600`,
    stockImages.cards[4] || `https://picsum.photos/seed/${businessName}-tile1/600/600`,
    stockImages.cards[5] || `https://picsum.photos/seed/${businessName}-tile2/600/600`,
    stockImages.cards[6] || `https://picsum.photos/seed/${businessName}-tile3/600/600`,
  ]

  const imageGridSection = `
  <section style="padding:40px 2rem;background:${proBg}">
    <div class="ms-grid" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:8px">
      ${tileImgs.map((img, i) => `
      <div style="position:relative;aspect-ratio:1;overflow:hidden">
        <img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover" />
        <div style="position:absolute;bottom:1rem;left:1rem;font-family:var(--body-font);font-size:0.85rem;font-weight:700;color:#1a1a1a;padding:0.5rem 1rem;background:var(--primary)">${tileLabels[i]}</div>
      </div>`).join('')}
    </div>
  </section>`

  // Testimonial
  const testimonialSection = content.testimonial ? `
  <section style="padding:60px 2rem;background:${proBg};border-top:1px solid rgba(255,255,255,0.08)">
    <div style="max-width:800px;margin:0 auto;text-align:center">
      <p style="font-family:var(--heading-font);font-size:1.2rem;font-weight:400;color:${proText};line-height:1.7;font-style:italic;margin-bottom:1rem">"${content.testimonial.quote}"</p>
      <p style="font-family:var(--body-font);font-size:0.85rem;color:${proMuted};font-weight:500">— ${content.testimonial.author}</p>
    </div>
  </section>` : ''

  // Full-width image
  const fullImage = `
  <section style="height:40vh;overflow:hidden">
    <img src="${serviceImgs[2] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
  </section>`

  // Footer — dark, 4-column links + subscribe + social
  const proFooter = `
  <footer style="padding:4rem 2rem 2rem;background:#1e1e1e">
    <div class="ms-grid" style="max-width:1300px;margin:0 auto;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:3rem">
      <div>
        <div style="font-family:var(--heading-font);font-size:1.3rem;font-weight:400;color:${proText};margin-bottom:0.35rem">${businessName}</div>
        <p style="font-family:var(--body-font);font-size:0.75rem;color:${proMuted};font-style:italic;margin-bottom:1.5rem">${content.heroEyebrow || ''}</p>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${proMuted};line-height:1.7;max-width:280px">${content.heroSubtitle}</p>
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;color:${proText};margin-bottom:1rem">Navigate</h4>
        <a href="#about" style="color:${proMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">About Us</a>
        <a href="#services" style="color:${proMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Services</a>
        <a href="#contact" style="color:${proMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Contact Us</a>
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;color:${proText};margin-bottom:1rem">Services</h4>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="color:${proMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">${s.name}</a>`).join('')}
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;color:${proText};margin-bottom:1rem">Legal</h4>
        <a href="#" style="color:${proMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Privacy Policy</a>
        <a href="#" style="color:${proMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Terms of Service</a>
        <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:0.8rem;font-weight:600;padding:0.5rem 1.25rem;border:1px solid ${proRed};color:${proRed};text-decoration:none;margin-top:1rem">Subscribe</a>
      </div>
    </div>
    <div style="max-width:1300px;margin:2rem auto 0;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.06);text-align:left">
      <p style="font-family:var(--body-font);font-size:0.75rem;color:rgba(255,255,255,0.3)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
    </div>
  </footer>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark')}
  <style>
    :root {
      --bg: ${proBg};
      --bg-alt: #333333;
      --card-bg: #333333;
      --text: ${proText};
      --text-muted: ${proMuted};
      --border: rgba(255,255,255,0.08);
    }
  </style>

${buildStandardNav(businessName, content, navFlags)}

  ${heroSection}
  ${imageGridSection}
  ${serviceCards}
  ${peopleSection}
  ${testimonialSection}
  ${fullImage}
  ${buildContactSection(content, locationInfo)}

${proFooter}

</body>
</html>`
}

// ---------- Education Template (Preply–inspired) ----------
function buildEducationTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]

  const eduBg = '#ffffff'
  const eduText = '#1a1a1a'
  const eduMuted = '#6b6b6b'
  const eduPink = '#f8c8d8'

  // Section 1: Split hero — pink bg, heading left, photo right
  const heroSection = `
  <section style="background:${eduPink};overflow:hidden">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;min-height:80vh;align-items:center;padding:0 2rem">
      <div style="padding:3rem 0">
        <h1 style="font-family:var(--heading-font);font-size:clamp(2.5rem,4.5vw,4rem);font-weight:700;color:${eduText};line-height:1.1;margin-bottom:1.5rem">${content.tagline}</h1>
        <p style="font-family:var(--body-font);font-size:1.05rem;color:${eduText};line-height:1.7;margin-bottom:2rem;max-width:420px;opacity:0.8">${content.heroSubtitle}</p>
        <a href="#contact" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--body-font);font-size:1rem;font-weight:600;padding:1rem 2.5rem;background:${eduText};color:#fff;border-radius:8px;text-decoration:none">${content.ctaPrimary} &rarr;</a>
      </div>
      <div style="display:flex;justify-content:center;align-items:flex-end;height:100%">
        <img src="${heroImg}" alt="" style="max-width:100%;max-height:85vh;object-fit:contain;border-radius:12px" />
      </div>
    </div>
  </section>`

  // Section 2: Stats row
  const statsSection = `
  <section style="padding:60px 2rem;background:${eduBg}">
    <div style="max-width:1200px;margin:0 auto;display:flex;justify-content:center;align-items:center;gap:3rem;flex-wrap:wrap">
      ${content.stats.slice(0, 5).map((s, i) => `
      <div style="text-align:center;${i < content.stats.length - 1 ? 'padding-right:3rem;border-right:1px solid rgba(0,0,0,0.1)' : ''}">
        <div style="font-family:var(--heading-font);font-size:1.8rem;font-weight:700;color:${eduText}">${s.value}</div>
        <div style="font-family:var(--body-font);font-size:0.85rem;color:${eduMuted}">${s.label}</div>
      </div>`).join('')}
    </div>
  </section>`

  // Section 3: 3-column service cards with icons + arrows
  const serviceGrid = `
  <section id="services" style="padding:60px 2rem;background:${eduBg}">
    <div style="max-width:1200px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:700;color:${eduText};margin-bottom:2rem;text-align:center;text-transform:capitalize">${content.servicesHeading}</h2>
    <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem">
      ${content.services.map(s => `
      <div style="border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:1.5rem;display:flex;align-items:center;gap:1rem">
        <div style="font-size:1.5rem;flex-shrink:0">${s.icon || '&#9998;'}</div>
        <div style="flex:1">
          <h3 style="font-family:var(--heading-font);font-size:1.1rem;font-weight:700;color:${eduText}">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:0.8rem;color:${eduMuted}">${s.description}</p>
        </div>
        <span style="font-size:1.2rem;color:${eduMuted}">&rsaquo;</span>
      </div>`).join('')}
    </div>
    </div>
  </section>`

  // Section 4: TeachMe2-style 3-step process — circles + dashed connector + text
  const processSteps = content.processSteps || [
    { step: '1', title: content.services[0]?.name || 'Step 1', description: content.services[0]?.description || '' },
    { step: '2', title: content.services[1]?.name || 'Step 2', description: content.services[1]?.description || '' },
    { step: '3', title: content.services[2]?.name || 'Step 3', description: content.services[2]?.description || '' },
  ]
  const stepColors = [primaryColor, secondaryColor || '#f5a623', '#6c63ff']
  const processSection = `
  <section style="padding:80px 2rem;background:${eduBg}">
    <div style="max-width:1000px;margin:0 auto;text-align:center">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:700;color:${eduText};margin-bottom:4rem;text-transform:capitalize"><span style="color:var(--primary)">3 Simple Steps</span> To Get Your Child Back On Track</h2>
      <!-- Steps: circle + connector + text in one grid -->
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:start;gap:0;margin-bottom:3rem">
        ${processSteps.slice(0, 3).map((step, i) => `${i > 0 ? `<div style="border-top:3px dashed #ccc;margin-top:32px;align-self:start"></div>` : ''}<div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:1.5rem">
          <div style="width:64px;height:64px;border-radius:50%;background:${stepColors[i]};display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--heading-font);font-size:1.5rem;font-weight:700;flex-shrink:0">${step.step}</div>
          <div>
            <h3 style="font-family:var(--body-font);font-size:0.85rem;font-weight:700;color:${eduText};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.75rem">${step.title}</h3>
            <p style="font-family:var(--body-font);font-size:0.9rem;color:${eduMuted};line-height:1.7">${step.description}</p>
          </div>
        </div>`).join('')}
      </div>
      <div style="margin-top:3rem">
        <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:1rem;font-weight:600;padding:1rem 2.5rem;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none">${content.ctaPrimary}</a>
      </div>
    </div>
  </section>`

  // Section 6: 50/50 testimonial — photo left, bold quote right
  const testimonialSection = content.testimonial ? `
  <section style="padding:80px 2rem;background:${eduBg}">
    <div style="max-width:1200px;margin:0 auto">
      <p style="font-family:var(--body-font);font-size:1rem;color:${eduMuted};text-align:center;margin-bottom:3rem">${content.aboutMission || content.heroSubtitle}</p>
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center">
        <div class="ms-img" style="border-radius:16px;overflow:hidden;height:450px">
          <img src="${serviceImgs[1] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div>
          <p style="font-family:var(--heading-font);font-size:clamp(1.3rem,2.5vw,1.8rem);font-weight:700;color:${eduText};line-height:1.4;margin-bottom:1.5rem">${content.testimonial.quote}</p>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:${eduMuted}">— ${content.testimonial.author}</p>
        </div>
      </div>
    </div>
  </section>` : ''

  // Section 7: About split — teal hero
  const aboutSection = `
  <section id="about" style="padding:80px 2rem;background:var(--primary)">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center">
      <div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:700;color:#fff;margin-bottom:1rem">${content.aboutHeading}</h2>
        ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:rgba(255,255,255,0.8);line-height:1.8;margin-bottom:1rem">${p}</p>`).join('')}
        <div style="display:flex;gap:0.75rem;margin-top:1.5rem">
          <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.85rem 2rem;background:#fff;color:${eduText};border-radius:8px;text-decoration:none">${content.ctaPrimary}</a>
          <a href="#services" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.85rem 2rem;border:1px solid #fff;color:#fff;border-radius:8px;text-decoration:none">${content.ctaSecondary}</a>
        </div>
      </div>
      <div class="ms-img" style="border-radius:16px;overflow:hidden;height:400px">
        <img src="${serviceImgs[2] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>
    </div>
  </section>`

  // Section 8: Pink CTA banner with contact form inside
  const eduContactSection = `
  <section id="contact" style="padding:80px 2rem;background:${eduPink}">
    <div style="max-width:700px;margin:0 auto;text-align:center">
      <h2 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5vw,4.5rem);font-weight:700;color:${eduText};line-height:1.1;margin-bottom:1rem">${content.contactHeading}</h2>
      <p style="font-family:var(--body-font);font-size:1rem;color:${eduText};opacity:0.7;margin-bottom:3rem">${content.heroSubtitle}</p>
      <form style="display:flex;flex-direction:column;gap:1.25rem;text-align:left" onsubmit="return false">
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <input type="text" placeholder="Name" style="font-family:var(--body-font);padding:0.9rem 1.25rem;background:#fff;border:1px solid rgba(0,0,0,0.1);border-radius:12px;color:${eduText};font-size:0.95rem;outline:none" />
          <input type="email" placeholder="Email" style="font-family:var(--body-font);padding:0.9rem 1.25rem;background:#fff;border:1px solid rgba(0,0,0,0.1);border-radius:12px;color:${eduText};font-size:0.95rem;outline:none" />
        </div>
        <textarea placeholder="Your message" rows="4" style="font-family:var(--body-font);padding:0.9rem 1.25rem;background:#fff;border:1px solid rgba(0,0,0,0.1);border-radius:12px;color:${eduText};font-size:0.95rem;outline:none;resize:none"></textarea>
        <button type="submit" style="font-family:var(--body-font);padding:1rem 2.5rem;background:#fff;color:${eduText};border:none;border-radius:12px;font-size:1rem;font-weight:600;cursor:pointer">Send Message</button>
      </form>
    </div>
  </section>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')}
  <style>
    :root {
      --bg: ${eduBg};
      --bg-alt: #f5f5f5;
      --card-bg: ${eduBg};
      --text: ${eduText};
      --text-muted: ${eduMuted};
      --border: rgba(0,0,0,0.06);
    }
  </style>

${buildStandardNav(businessName, content, navFlags)}

  ${heroSection}
  ${statsSection}
  ${serviceGrid}
  ${processSection}
  ${testimonialSection}
  ${aboutSection}
  ${eduContactSection}

${buildFooter(businessName, content, 'light')}

</body>
</html>`
}

// ---------- Creative Template (Lusion–inspired, dark portfolio) ----------
function buildCreativeTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]
  const galleryImgs = [
    images[4] || stockImages.cards[3],
    stockImages.cards[4],
    stockImages.cards[5],
    stockImages.cards[6],
  ]

  const crBg = '#f5f5f0'
  const crText = '#0a0a0a'
  const crMuted = '#6b6b6b'

  // Section 1: Hero — subtitle top right, full-bleed image, "SCROLL TO EXPLORE" label
  const heroSection = `
  <section style="background:${crBg};padding:0 2rem">
    <div style="max-width:1400px;margin:0 auto">
      <div style="display:flex;justify-content:space-between;align-items:start;padding:2rem 0">
        <div></div>
        <p style="font-family:var(--body-font);font-size:1.05rem;color:${crText};max-width:500px;line-height:1.7">${content.heroSubtitle}</p>
      </div>
      <div style="border-radius:16px;overflow:hidden;height:70vh;margin-bottom:1rem">
        <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>
      <p style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:${crMuted};text-align:center;padding:1rem 0">+ &nbsp;&nbsp;&nbsp;&nbsp; + &nbsp;&nbsp;&nbsp;&nbsp; Scroll to explore &nbsp;&nbsp;&nbsp;&nbsp; + &nbsp;&nbsp;&nbsp;&nbsp; +</p>
    </div>
  </section>`

  // Section 2: Meet the Artists / Team — upriseart-inspired
  const artistNames = ['Alex Morgan', 'Jordan Ellis', 'Riley Chen']
  const artistLocations = [locationInfo.city, locationInfo.city, locationInfo.city]
  const artistBios = [
    content.services[0]?.description || '',
    content.services[1]?.description || '',
    content.services[2]?.description || '',
  ]
  const meetSection = `
  <section style="padding:100px 2rem;background:${crBg}">
    <div style="max-width:1400px;margin:0 auto;text-align:center">
      <h2 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5vw,4rem);font-weight:400;color:${crText};margin-bottom:1rem;font-style:italic">Meet the Artists</h2>
      <a href="#" style="font-family:var(--body-font);font-size:0.9rem;color:${crText};text-decoration:underline;text-underline-offset:4px;margin-bottom:3rem;display:inline-block">View All</a>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;text-align:left;margin-top:2rem">
        ${[0,1,2].map(i => `
        <div>
          <div class="ms-img" style="height:450px;overflow:hidden;margin-bottom:1.25rem">
            <img src="${serviceImgs[i % serviceImgs.length]}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <h3 style="font-family:var(--heading-font);font-size:1.3rem;font-weight:400;color:${crText};margin-bottom:0.25rem;font-style:italic">${artistNames[i]}</h3>
          <p style="font-family:var(--body-font);font-size:0.85rem;color:${crMuted};font-weight:500;margin-bottom:0.75rem">${artistLocations[i]}</p>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:${crText};line-height:1.7;margin-bottom:1rem">${artistBios[i]}</p>
          <a href="#" style="font-family:var(--body-font);font-size:0.85rem;color:${crText};text-decoration:underline;text-underline-offset:4px">View Artist</a>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 3: About — photo left, text right
  const aboutSection = `
  <section id="about" style="padding:80px 2rem;background:${crBg}">
    <div class="ms-grid" style="max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center">
      <div class="ms-img" style="border-radius:16px;overflow:hidden;height:500px">
        <img src="${serviceImgs[0]}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>
      <div>
        ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:var(--body-font);font-size:1.1rem;color:${crText};line-height:1.8;margin-bottom:1.5rem">${p}</p>`).join('')}
        <a href="#contact" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.75rem 1.5rem;background:rgba(0,0,0,0.06);color:${crText};border-radius:999px;text-decoration:none;letter-spacing:0.04em;text-transform:uppercase">&#9679; ${content.ctaSecondary || 'About Us'}</a>
      </div>
    </div>
  </section>`

  // Section 4: Featured Work — 2-column portfolio grid with tag labels (even rows)
  const allPortfolioImgs = [...serviceImgs, ...galleryImgs].filter(Boolean)
  const portfolioGrid = `
  <section id="gallery" style="padding:80px 2rem;background:${crBg}">
    <div style="max-width:1400px;margin:0 auto">
      <div style="display:flex;justify-content:space-between;align-items:end;margin-bottom:3rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(3rem,5vw,4.5rem);font-weight:500;color:${crText};line-height:1">${content.servicesHeading}</h2>
        <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:${crMuted};max-width:300px;text-align:right">${content.aboutMission || content.heroSubtitle}</p>
      </div>
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
        ${content.services.slice(0, 4).map((s, i) => `
        <div>
          <div class="ms-img" style="border-radius:12px;overflow:hidden;height:400px;margin-bottom:1rem">
            <img src="${allPortfolioImgs[i % allPortfolioImgs.length]}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <p style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:${crMuted};margin-bottom:0.35rem">${s.tags.join(' &#8226; ')}</p>
          <h3 style="font-family:var(--heading-font);font-size:1.3rem;font-weight:500;color:${crText};display:flex;align-items:center;gap:0.5rem">&rarr; ${s.name}</h3>
        </div>`).join('')}
      </div>
      <div style="text-align:center;margin-top:3rem">
        <a href="#services" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.75rem 1.5rem;background:rgba(0,0,0,0.06);color:${crText};border-radius:999px;text-decoration:none;letter-spacing:0.04em;text-transform:uppercase">&#9679; See all projects</a>
      </div>
    </div>
  </section>`

  // Section 5: Services list
  const servicesList = `
  <section id="services" style="padding:80px 2rem;background:${crBg}">
    <div style="max-width:1000px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:500;color:${crText};margin-bottom:3rem">${content.servicesHeading}</h2>
      ${content.services.map(s => `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:1.5rem 0;border-bottom:1px solid rgba(0,0,0,0.08)">
        <h3 style="font-family:var(--body-font);font-size:1rem;font-weight:600;color:${crText}">${s.name}</h3>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${crMuted}">${s.description}</p>
      </div>`).join('')}
    </div>
  </section>`

  // Footer — Lusion style: address, socials, newsletter
  const crFooter = `
  <footer style="padding:5rem 2rem 2rem;background:${crBg};border-top:1px solid rgba(0,0,0,0.08)">
    <div class="ms-grid" style="max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr 1.5fr;gap:4rem">
      <div>
        <p style="font-family:var(--body-font);font-size:0.9rem;color:${crText};line-height:1.7">${locationInfo.address}<br />${locationInfo.city}, ${locationInfo.postcode}<br />${locationInfo.country}</p>
      </div>
      <div>
        <p style="font-family:var(--body-font);font-size:0.9rem;color:${crText};margin-bottom:0.5rem">General enquiries</p>
        <p style="font-family:var(--body-font);font-size:0.9rem;color:${crMuted};margin-bottom:2rem">hello@${businessName.toLowerCase().replace(/\s/g, '')}.com</p>
        <p style="font-family:var(--body-font);font-size:0.9rem;color:${crText};margin-bottom:0.5rem">New business</p>
        <p style="font-family:var(--body-font);font-size:0.9rem;color:${crMuted}">work@${businessName.toLowerCase().replace(/\s/g, '')}.com</p>
      </div>
      <div>
        <h3 style="font-family:var(--heading-font);font-size:1.5rem;font-weight:500;color:${crText};margin-bottom:1.5rem">Subscribe to our newsletter</h3>
        <form style="display:flex;border-bottom:1px solid ${crText};padding-bottom:0.5rem;max-width:400px" onsubmit="return false">
          <input type="email" placeholder="Your email" style="flex:1;font-family:var(--body-font);padding:0.5rem 0;background:transparent;border:none;color:${crText};font-size:0.9rem;outline:none" />
          <button type="submit" style="background:transparent;border:none;color:${crText};cursor:pointer;font-size:1.1rem">&rarr;</button>
        </form>
      </div>
    </div>
    <div style="max-width:1400px;margin:3rem auto 0;padding-top:1.5rem;border-top:1px solid rgba(0,0,0,0.08);text-align:left">
      <p style="font-family:var(--body-font);font-size:0.75rem;color:${crMuted}">&copy; ${new Date().getFullYear()} ${businessName}.</p>
    </div>
  </footer>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')}
  <style>
    :root {
      --bg: ${crBg};
      --bg-alt: #eeeee8;
      --card-bg: #ffffff;
      --text: ${crText};
      --text-muted: ${crMuted};
      --border: rgba(0,0,0,0.08);
    }
  </style>

${buildStandardNav(businessName, content, navFlags)}

  ${heroSection}
  ${meetSection}
  ${aboutSection}
  ${portfolioGrid}
  ${servicesList}
  ${buildContactSection(content, locationInfo)}

${crFooter}

</body>
</html>`
}

// ---------- Fitness-Sport Template (EverybodyFights–inspired) ----------
function buildFitnessTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]

  const fitBg = '#111111'
  const fitText = '#ffffff'
  const fitMuted = '#999999'
  const fitOrange = primaryColor || '#e85d26'

  // Promo bar
  const promoBanner = `
  <div style="background:${fitOrange};padding:0.6rem 2rem;text-align:center">
    <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:#fff;letter-spacing:0.04em">${content.badge || content.heroEyebrow}</p>
  </div>`

  // Section 1: Full-bleed dark hero
  const heroSection = `
  <section style="position:relative;min-height:85vh;display:flex;align-items:flex-end;overflow:hidden">
    <div style="position:absolute;inset:0">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.6) 100%)"></div>
    </div>
    <div style="position:relative;max-width:1300px;margin:0 auto;padding:0 2rem 5rem;width:100%">
      <h1 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5vw,4rem);font-weight:700;color:#fff;line-height:1.1;margin-bottom:1.5rem;text-transform:uppercase;letter-spacing:0.08em;max-width:700px">${content.tagline}</h1>
      <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.85rem 2rem;background:#fff;color:${fitBg};text-decoration:none;letter-spacing:0.1em;text-transform:uppercase">${content.ctaPrimary}</a>
    </div>
  </section>`

  // Section 2: Class types — name only, no icons
  const classTypes = `
  <section id="services" style="padding:80px 2rem;background:${fitBg};text-align:center">
    <div style="max-width:1200px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:700;color:${fitText};letter-spacing:0.15em;text-transform:uppercase;margin-bottom:3rem">${content.servicesHeading}</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(${Math.min(content.services.length, 4)},1fr);gap:2.5rem">
        ${content.services.map(s => `
        <div style="text-align:center">
          <h3 style="font-family:var(--heading-font);font-size:0.8rem;font-weight:700;color:${fitText};letter-spacing:0.15em;text-transform:uppercase">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:0.8rem;color:${fitMuted};line-height:1.6;margin-top:0.5rem">${s.description}</p>
          <div style="display:flex;gap:0.5rem;justify-content:center;margin-top:0.75rem;flex-wrap:wrap">
            ${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.65rem;padding:0.2rem 0.5rem;border:1px solid rgba(255,255,255,0.15);color:${fitMuted};text-transform:uppercase;letter-spacing:0.05em">${t}</span>`).join('')}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 3: Awards / trust strip
  const awardsStrip = `
  <section style="padding:60px 2rem;background:${fitBg};text-align:center;border-top:1px solid rgba(255,255,255,0.08);border-bottom:1px solid rgba(255,255,255,0.08)">
    <div style="max-width:1100px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1rem,2vw,1.3rem);font-weight:700;color:${fitText};letter-spacing:0.15em;text-transform:uppercase;margin-bottom:2rem">${content.aboutMission || content.heroEyebrow}</h2>
      <div style="display:flex;justify-content:center;align-items:center;gap:3rem;flex-wrap:wrap">
        ${content.stats.slice(0, 4).map(s => `
        <div style="text-align:center">
          <div style="font-family:var(--heading-font);font-size:1.8rem;font-weight:700;color:${fitText}">${s.value}</div>
          <div style="font-family:var(--body-font);font-size:0.75rem;color:${fitMuted};letter-spacing:0.08em;text-transform:uppercase;margin-top:0.25rem">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 4: 3-column location/service cards with photo bg
  const locationCards = `
  <section style="padding:80px 2rem;background:${fitBg}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
      ${content.services.slice(0, 3).map((s, i) => `
      <div class="ms-img" style="position:relative;min-height:350px;border-radius:8px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border:1px solid ${fitOrange}">
        <div style="position:absolute;inset:0">
          <img src="${serviceImgs[i % serviceImgs.length]}" alt="" style="width:100%;height:100%;object-fit:cover" />
          <div style="position:absolute;inset:0;background:rgba(0,0,0,0.55)"></div>
        </div>
        <div style="position:relative;padding:2rem">
          <h3 style="font-family:var(--heading-font);font-size:clamp(1.2rem,2vw,1.6rem);font-weight:700;color:${fitText};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.75);margin-bottom:1.25rem">${s.description}</p>
          <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:0.75rem;font-weight:600;padding:0.65rem 1.5rem;background:#fff;color:${fitBg};text-decoration:none;letter-spacing:0.1em;text-transform:uppercase">${content.ctaSecondary || 'Discover'}</a>
        </div>
      </div>`).join('')}
    </div>
  </section>`

  // Section 5: Gallery — 3-column photo grid
  const gallerySection = `
  <section style="padding:0;background:${fitBg}">
    <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:0">
      ${serviceImgs.map(img => `
      <div class="ms-img" style="height:350px;overflow:hidden">
        <img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>`).join('')}
    </div>
  </section>`

  // Section 6: HYP-style packages — 3 cards with bg images
  const packagesSection = `
  <section id="about" style="padding:80px 2rem;background:${fitBg}">
    <div style="max-width:1200px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:700;color:${fitOrange};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">${content.galleryHeading || 'Packages'}</h2>
      <div style="width:50px;height:3px;background:${fitOrange};margin-bottom:3rem"></div>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
        ${content.services.slice(0, 3).map((s, i) => `
        <div class="ms-img" style="position:relative;min-height:400px;border-radius:8px;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end">
          <div style="position:absolute;inset:0">
            <img src="${serviceImgs[i % serviceImgs.length]}" alt="" style="width:100%;height:100%;object-fit:cover" />
            <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.75) 100%)"></div>
          </div>
          <div style="position:relative;padding:2rem">
            <h3 style="font-family:var(--heading-font);font-size:clamp(1.3rem,2vw,1.8rem);font-weight:700;color:${fitText};letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.5rem">${s.name}</h3>
            <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.7);margin-bottom:1.25rem">${s.description}</p>
            ${s.tags.map(t => `<div style="font-family:var(--body-font);font-size:0.8rem;color:${fitText};padding:0.35rem 0;border-bottom:1px solid rgba(255,255,255,0.1)">&#10003; &nbsp;${t}</div>`).join('')}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Footer
  const fitFooter = `
  <footer style="padding:4rem 2rem 2rem;background:${fitBg};border-top:1px solid rgba(255,255,255,0.08)">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:3rem">
      <div>
        <h3 style="font-family:var(--heading-font);font-size:0.85rem;font-weight:700;color:${fitText};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:1rem">About Us</h3>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${fitMuted};line-height:1.7;max-width:350px">${content.aboutText.split('\n')[0]}</p>
        <a href="#about" style="display:inline-block;font-family:var(--body-font);font-size:0.85rem;color:${fitText};text-decoration:underline;text-underline-offset:4px;margin-top:1rem">Learn More</a>
      </div>
      <div>
        <h3 style="font-family:var(--heading-font);font-size:0.85rem;font-weight:700;color:${fitText};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:1rem">Links</h3>
        ${content.services.slice(0, 3).map(s => `<a href="#services" style="color:${fitMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">${s.name}</a>`).join('')}
        <a href="#contact" style="color:${fitMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Contact Us</a>
      </div>
      <div>
        <h3 style="font-family:var(--heading-font);font-size:0.85rem;font-weight:700;color:${fitText};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:1rem">Follow Us</h3>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${fitMuted}">hello@${businessName.toLowerCase().replace(/\s/g, '')}.com</p>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${fitMuted};margin-top:0.5rem">${locationInfo.phone}</p>
      </div>
    </div>
    <div style="max-width:1200px;margin:2rem auto 0;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.08);text-align:left">
      <p style="font-family:var(--body-font);font-size:0.75rem;color:rgba(255,255,255,0.3)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
    </div>
  </footer>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark')}
  <style>
    :root {
      --bg: ${fitBg};
      --bg-alt: #1a1a1a;
      --card-bg: #1a1a1a;
      --text: ${fitText};
      --text-muted: ${fitMuted};
      --border: rgba(255,255,255,0.08);
    }
  </style>

${promoBanner}
${buildStandardNav(businessName, content, navFlags)}

  ${heroSection}
  ${awardsStrip}
  ${classTypes}
  ${locationCards}
  ${gallerySection}
  ${packagesSection}
  ${buildContactSection(content, locationInfo)}

${fitFooter}

</body>
</html>`
}

// ---------- Automotive Template (Polestar visual + Clutch structure) ----------
function buildAutomotiveTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]
  const galleryImgs = [
    images[4] || stockImages.cards[3],
    stockImages.cards[4],
    stockImages.cards[5],
  ]

  // Section 1: Full-bleed cinematic hero — Polestar style
  const heroSection = `
  <section style="position:relative;min-height:90vh;display:flex;align-items:flex-end;overflow:hidden">
    <div style="position:absolute;inset:0">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.5) 80%)"></div>
    </div>
    <div style="position:relative;max-width:1300px;margin:0 auto;padding:0 2rem 5rem;width:100%">
      <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.7);margin-bottom:0.5rem">${content.heroEyebrow}</p>
      <h1 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,3rem);font-weight:500;color:#fff;line-height:1.25;margin-bottom:0.75rem;max-width:550px">${content.tagline}</h1>
      <p style="font-family:var(--body-font);font-size:0.95rem;color:rgba(255,255,255,0.75);max-width:450px;line-height:1.7;margin-bottom:1.5rem">${content.heroSubtitle}</p>
      <a href="#services" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--body-font);font-size:0.85rem;font-weight:500;padding:0.75rem 1.5rem;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.25);color:#fff;text-decoration:none">${content.ctaPrimary} &rarr;</a>
    </div>
  </section>`

  // Section 2: 2-column service showcase — Polestar model cards style
  const serviceShowcase = `
  <section style="padding:0;background:var(--bg);border-bottom:1px solid var(--border)">
    <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr">
      ${content.services.slice(0, 2).map((s, i) => `
      <div style="padding:3rem 2.5rem;border-${i === 0 ? 'right' : 'left'}:1px solid var(--border)">
        <h3 style="font-family:var(--heading-font);font-size:1.3rem;font-weight:500;color:var(--text);margin-bottom:0.5rem">${s.name}</h3>
        <p style="font-family:var(--body-font);font-size:0.9rem;color:var(--text-muted);line-height:1.7;margin-bottom:1rem">${s.description}</p>
        <a href="#services" style="font-family:var(--body-font);font-size:0.85rem;color:var(--text);text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem;font-weight:500">${content.ctaSecondary || 'Learn more'} &rarr;</a>
        <div class="ms-img" style="margin-top:2rem;height:280px;overflow:hidden">
          <img src="${serviceImgs[i]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
      </div>`).join('')}
    </div>
  </section>`

  // Section 3: Large CTA links — Polestar "Book a test drive" style
  const ctaLinks = `
  <section style="padding:80px 2rem;background:var(--bg)">
    <div style="max-width:1300px;margin:0 auto">
      ${content.services.slice(0, 3).map(s => `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:2rem 0;border-bottom:1px solid var(--border)">
        <h3 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3.5rem);font-weight:500;color:var(--text)">${s.name}</h3>
        <span style="font-size:2rem;color:var(--text-muted)">&rsaquo;</span>
      </div>`).join('')}
    </div>
  </section>`

  // Section 4: How it works — removed for automotive (process steps don't suit car dealerships)

  // Section 5: Why choose us — Clutch 4-column with left border accent
  const whySection = `
  <section style="padding:80px 2rem;background:var(--bg)">
    <div style="max-width:1200px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:500;color:var(--text);text-align:center;margin-bottom:3rem">${content.aboutHeading}</h2>
      <div class="ms-grid" style="border:1px solid var(--border);border-radius:12px;display:grid;grid-template-columns:repeat(${Math.min(content.stats.length, 4)},1fr)">
        ${content.stats.slice(0, 4).map((s, i) => `
        <div style="padding:2rem;${i < Math.min(content.stats.length, 4) - 1 ? 'border-right:1px solid var(--border)' : ''}">
          <div style="border-left:3px solid var(--primary);padding-left:1rem">
            <h3 style="font-family:var(--heading-font);font-size:1.05rem;font-weight:600;color:var(--text);margin-bottom:0.5rem">${s.label}</h3>
            <p style="font-family:var(--body-font);font-size:0.85rem;color:var(--text-muted);line-height:1.7">${s.sublabel || s.value}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 6: Full-bleed feature image — Polestar sustainability style
  const featureImage = `
  <section id="about" style="position:relative;min-height:60vh;display:flex;align-items:flex-end;overflow:hidden">
    <div style="position:absolute;inset:0">
      <img src="${galleryImgs[0] || serviceImgs[2]}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,0.5) 100%)"></div>
    </div>
    <div style="position:relative;max-width:1300px;margin:0 auto;padding:0 2rem 4rem;width:100%">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:500;color:#fff;margin-bottom:0.5rem">${content.aboutHeading}</h2>
      <p style="font-family:var(--body-font);font-size:0.95rem;color:rgba(255,255,255,0.75);max-width:450px;line-height:1.7;margin-bottom:1.25rem">${content.aboutText.split('\n')[0]}</p>
      <a href="#contact" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--body-font);font-size:0.85rem;font-weight:500;padding:0.7rem 1.25rem;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.25);color:#fff;text-decoration:none">${content.ctaSecondary || 'Read more'} &rarr;</a>
    </div>
  </section>`

  // Section 7: 3-column product/service cards — uses unique images per card (service imgs + gallery imgs)
  const allCardImgs = [...serviceImgs, ...galleryImgs].filter(Boolean)
  const productCards = `
  <section style="padding:80px 2rem;background:var(--bg)">
    <div style="max-width:1200px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:500;color:var(--text);text-align:center;margin-bottom:3rem">${content.galleryHeading || content.servicesHeading}</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
        ${content.services.map((s, i) => `
        <div style="border:1px solid var(--border);border-radius:12px;overflow:hidden">
          <div class="ms-img" style="height:220px;overflow:hidden">
            <img src="${allCardImgs[i % allCardImgs.length]}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <div style="padding:1.5rem">
            <h3 style="font-family:var(--heading-font);font-size:1rem;font-weight:600;color:var(--text);margin-bottom:0.35rem">${s.name}</h3>
            <p style="font-family:var(--body-font);font-size:0.85rem;color:var(--text-muted);line-height:1.6;margin-bottom:1rem">${s.description}</p>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
              ${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.7rem;padding:0.25rem 0.6rem;border-radius:4px;background:var(--card-bg);border:1px solid var(--border);color:var(--text-muted)">${t}</span>`).join('')}
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Testimonial
  const testimonialSection = content.testimonial ? `
  <section style="padding:60px 2rem;background:var(--bg);border-top:1px solid var(--border)">
    <div style="max-width:800px;margin:0 auto;text-align:center">
      <div style="color:#f59e0b;font-size:1.1rem;margin-bottom:1rem">${'&#9733;'.repeat(content.testimonial.rating || 5)}</div>
      <p style="font-family:var(--body-font);font-size:1.05rem;color:var(--text);line-height:1.7;font-style:italic;margin-bottom:1rem">"${content.testimonial.quote}"</p>
      <p style="font-family:var(--body-font);font-size:0.85rem;color:var(--text-muted);font-weight:500">— ${content.testimonial.author}</p>
    </div>
  </section>` : ''

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark')}

${buildStandardNav(businessName, content, navFlags)}

  ${heroSection}
  ${serviceShowcase}
  ${ctaLinks}
  ${whySection}
  ${featureImage}
  ${productCards}
  ${testimonialSection}
  ${buildContactSection(content, locationInfo)}

${buildFooter(businessName, content, 'dark')}

</body>
</html>`
}

// ---------- Pets Template (WOOOF–inspired) ----------
function buildPetsTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]

  const petBg = '#c5d9b2'
  const petDark = '#3a5a3a'
  const petText = '#2d4a2d'
  const petMuted = '#5a7a5a'

  // Section 1: Split hero — large heading left, rounded photo right
  const heroSection = `
  <section style="padding:80px 2rem;background:${petBg}">
    <div class="ms-grid" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;min-height:70vh">
      <div>
        <h1 style="font-family:var(--heading-font);font-size:clamp(2.5rem,4.5vw,4rem);font-weight:400;color:${petText};line-height:1.15;margin-bottom:1.5rem">${content.tagline}</h1>
        <p style="font-family:var(--body-font);font-size:1.1rem;color:${petMuted};line-height:1.7;margin-bottom:1rem">${content.heroSubtitle}</p>
        <a href="#about" style="font-family:var(--body-font);font-size:1.1rem;color:${petText};text-decoration:underline;text-underline-offset:4px;font-weight:500">${content.ctaSecondary || 'Read about us.'}</a>
      </div>
      <div class="ms-img" style="border-radius:24px;overflow:hidden;height:500px">
        <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>
    </div>
  </section>`

  // Section 2: 50/50 — photo left, heading + underline CTA right
  const featureSection = `
  <section id="services" style="padding:80px 2rem;background:${petBg}">
    <div class="ms-grid" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center">
      <div class="ms-img" style="border-radius:24px;overflow:hidden;height:450px">
        <img src="${serviceImgs[0]}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>
      <div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,3rem);font-weight:400;color:${petText};line-height:1.15;margin-bottom:1rem">${content.servicesHeading}</h2>
        <p style="font-family:var(--body-font);font-size:1rem;color:${petMuted};line-height:1.7;margin-bottom:1rem">${content.aboutMission || content.heroSubtitle}</p>
        <a href="#services" style="font-family:var(--body-font);font-size:1rem;color:${petText};text-decoration:underline;text-underline-offset:4px;font-weight:500">${content.ctaSecondary || 'Check out our services.'}</a>
      </div>
    </div>
  </section>`

  // Section 3: 50/50 reversed — heading left, photo right
  const featureSection2 = `
  <section style="padding:80px 2rem;background:${petBg}">
    <div class="ms-grid" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center">
      <div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,3rem);font-weight:400;color:${petText};line-height:1.15;margin-bottom:1rem">${content.aboutHeading}</h2>
        <p style="font-family:var(--body-font);font-size:1rem;color:${petMuted};line-height:1.7;margin-bottom:1rem">${content.aboutText.split('\n')[0]}</p>
        <a href="#contact" style="font-family:var(--body-font);font-size:1rem;color:${petText};text-decoration:underline;text-underline-offset:4px;font-weight:500">${content.ctaPrimary}</a>
      </div>
      <div class="ms-img" style="border-radius:24px;overflow:hidden;height:450px">
        <img src="${serviceImgs[1]}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>
    </div>
  </section>`

  // Section 4: Brand/centered section — large brand name + subtitle
  const brandSection = `
  <section style="padding:120px 2rem;background:${petBg};text-align:center">
    <div style="max-width:800px;margin:0 auto">
      <div style="font-family:var(--heading-font);font-size:clamp(3rem,6vw,5rem);font-weight:700;color:${petDark};letter-spacing:0.04em;margin-bottom:1rem">${businessName}</div>
      <p style="font-family:var(--body-font);font-size:1.1rem;color:${petMuted};letter-spacing:0.08em;text-transform:uppercase">${content.heroEyebrow}</p>
    </div>
  </section>`

  // Section 5: Service cards
  const serviceCards = `
  <section style="padding:80px 2rem;background:${petBg}">
    <div style="max-width:1100px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:400;color:${petText};text-align:center;margin-bottom:3rem">${content.servicesHeading}</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
        ${content.services.map((s, i) => `
        <div style="background:rgba(255,255,255,0.4);border-radius:20px;padding:2rem;text-align:center">
          <div style="width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,0.6);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem">
            <span style="font-size:1.3rem">${s.icon || '&#128062;'}</span>
          </div>
          <h3 style="font-family:var(--heading-font);font-size:1.1rem;font-weight:600;color:${petText};margin-bottom:0.5rem">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:${petMuted};line-height:1.7">${s.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 6: Testimonials — 3 review cards
  const testimonialSection = content.testimonial ? `
  <section style="padding:80px 2rem;background:${petBg}">
    <div style="max-width:1100px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:400;color:${petText};text-align:center;margin-bottom:3rem">What ${businessName} clients are saying</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
        ${[0,1,2].map(i => {
          const t = i === 0 && content.testimonial ? content.testimonial : null
          const quote = t ? t.quote : (content.services[i]?.description || content.heroSubtitle)
          const author = t ? t.author : (content.services[i]?.name || 'Happy Customer')
          const rating = t ? t.rating : 5
          const colors = ['#f59e0b', '#4a9e4a', '#6a7aba']
          return `
        <div style="background:rgba(255,255,255,0.5);border-radius:20px;padding:2rem">
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem">
            <div style="width:40px;height:40px;border-radius:50%;background:${colors[i % 3]};display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--body-font);font-size:0.85rem;font-weight:600">${author.charAt(0)}</div>
            <div>
              <div style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:${petText}">${author}</div>
            </div>
          </div>
          <div style="color:#f59e0b;font-size:0.85rem;margin-bottom:0.75rem">${'&#9733;'.repeat(rating)}</div>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:${petMuted};line-height:1.7">${quote}</p>
        </div>`
        }).join('')}
      </div>
    </div>
  </section>` : ''

  // Footer — sage green bg, 4-column
  const petFooter = `
  <footer style="padding:60px 2rem 30px;background:${petBg}">
    <div class="ms-grid" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:3rem;align-items:start">
      <div>
        <div style="font-family:var(--heading-font);font-size:1.5rem;font-weight:700;color:#fff;margin-bottom:0.5rem">${businessName}</div>
      </div>
      ${content.contactHours ? `<div>
        <h4 style="font-family:var(--body-font);font-size:0.9rem;font-weight:700;color:${petText};margin-bottom:0.75rem">Hours</h4>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${petMuted};line-height:1.7">${content.contactHours.replace(/ · /g, '<br />')}</p>
      </div>` : `<div>
        <h4 style="font-family:var(--body-font);font-size:0.9rem;font-weight:700;color:${petText};margin-bottom:0.75rem">Services</h4>
        ${content.services.slice(0, 3).map(s => `<p style="font-family:var(--body-font);font-size:0.85rem;color:${petMuted};margin-bottom:0.35rem">${s.name}</p>`).join('')}
      </div>`}
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.9rem;font-weight:700;color:${petText};margin-bottom:0.75rem">Contact</h4>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${petMuted};line-height:1.7">${locationInfo.phone}</p>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${petMuted};line-height:1.7">hello@${businessName.toLowerCase().replace(/\s/g, '')}.com</p>
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.9rem;font-weight:700;color:${petText};margin-bottom:0.75rem">Location</h4>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${petMuted};line-height:1.7">${locationInfo.address}<br />${locationInfo.city}, ${locationInfo.postcode}</p>
      </div>
    </div>
    <div style="max-width:1100px;margin:2rem auto 0;padding-top:1.5rem;border-top:1px solid rgba(0,0,0,0.08);text-align:center">
      <p style="font-family:var(--body-font);font-size:0.75rem;color:${petMuted}">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
    </div>
  </footer>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')}
  <style>
    :root {
      --bg: ${petBg};
      --bg-alt: ${petBg};
      --card-bg: rgba(255,255,255,0.4);
      --text: ${petText};
      --text-muted: ${petMuted};
      --border: rgba(0,0,0,0.08);
    }
  </style>

${buildStandardNav(businessName, content, navFlags)}

  ${heroSection}
  ${featureSection}
  ${featureSection2}
  ${brandSection}
  ${serviceCards}
  ${testimonialSection}
  ${buildContactSection(content, locationInfo)}

${petFooter}

</body>
</html>`
}

// ---------- Food-Hospitality Template (Crafto Restaurant–inspired) ----------
function buildFoodHospitalityTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]
  const galleryImgs = [
    images[4] || stockImages.cards[3],
    stockImages.cards[4],
    stockImages.cards[5],
    stockImages.cards[6],
  ]

  const foodBg = '#ffffff'
  const foodText = '#232323'
  const foodMuted = '#777777'
  const foodOlive = '#7a8a2a'
  const foodGold = '#c9a030'

  // Section 1: Hero — full-bleed food photo with gold circle overlay + heading
  const heroSection = `
  <section style="position:relative;min-height:90vh;display:flex;align-items:center;justify-content:center;overflow:hidden">
    <div style="position:absolute;inset:0">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:rgba(0,0,0,0.4)"></div>
    </div>
    <div style="position:relative;text-align:center;z-index:2">
      <div style="width:clamp(350px,50vw,550px);height:clamp(350px,50vw,550px);border-radius:50%;background:${foodGold};display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto;padding:3rem">
        <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:#fff;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem">${content.heroEyebrow}</p>
        <h1 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3.5rem);font-weight:700;color:#fff;line-height:1.1;margin-bottom:1.5rem;text-transform:uppercase;letter-spacing:0.04em">${content.tagline}</h1>
        <a href="#services" style="display:inline-block;font-family:var(--body-font);font-size:0.8rem;font-weight:600;padding:0.85rem 2rem;background:${foodText};color:#fff;text-decoration:none;letter-spacing:0.1em;text-transform:uppercase">${content.ctaSecondary || 'View Menu'} &rarr;</a>
      </div>
    </div>
  </section>`

  // Section 2: About split — large plate photo left, heading + text right
  const aboutSplit = `
  <section id="about" style="padding:100px 2rem;background:${foodBg}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center">
      <div style="position:relative">
        <div style="border-radius:50%;overflow:hidden;width:90%;aspect-ratio:1;margin:0 auto">
          <img src="${serviceImgs[0]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
      </div>
      <div>
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
          <span style="display:block;width:30px;height:2px;background:${foodGold}"></span>
          <span style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${foodGold};letter-spacing:0.12em;text-transform:uppercase">${content.badge || content.heroEyebrow}</span>
        </div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:${foodText};line-height:1.1;margin-bottom:1.5rem;text-transform:uppercase">${content.aboutHeading}</h2>
        ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:${foodMuted};line-height:1.8;margin-bottom:1rem">${p}</p>`).join('')}
        <div style="display:flex;align-items:center;gap:1.5rem;margin-top:2rem">
          <a href="#contact" style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;padding:0.85rem 2rem;background:${foodText};color:#fff;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase">${content.ctaPrimary}</a>
        </div>
      </div>
    </div>
  </section>`

  // Section 3: 3-column trust bar — icons + text
  const trustBar = `
  <section style="padding:60px 2rem;background:${foodBg};border-top:1px solid rgba(0,0,0,0.06);border-bottom:1px solid rgba(0,0,0,0.06)">
    <div class="ms-grid" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:2rem">
      ${content.stats.slice(0, 3).map(s => `
      <div style="display:flex;align-items:center;gap:1.25rem">
        <div style="width:64px;height:64px;border-radius:50%;border:1px solid rgba(0,0,0,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span style="font-size:1.3rem;color:${foodText}">${s.value.charAt(0) === '&' ? s.value : '&#9733;'}</span>
        </div>
        <div>
          <h3 style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:${foodText};letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.25rem">${s.label}</h3>
          <p style="font-family:var(--body-font);font-size:0.85rem;color:${foodMuted}">${s.sublabel || s.value}</p>
        </div>
      </div>`).join('')}
    </div>
  </section>`

  // Section 4: Menu — olive label + heading + service items as menu rows
  const menuSection = `
  <section id="services" style="padding:80px 2rem;background:${foodBg}">
    <div style="max-width:1000px;margin:0 auto;text-align:center">
      <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${foodOlive};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:0.75rem">- ${content.heroEyebrow} -</p>
      <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:${foodText};text-transform:uppercase;margin-bottom:3rem">${content.servicesHeading}</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:2rem 3rem">
        ${content.services.map((s, i) => `
        <div style="display:flex;align-items:center;gap:1rem;text-align:left">
          <div style="width:80px;height:80px;border-radius:50%;overflow:hidden;flex-shrink:0">
            <img src="${serviceImgs[i % serviceImgs.length]}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <div style="flex:1">
            <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:0.25rem">
              <h3 style="font-family:var(--heading-font);font-size:0.95rem;font-weight:600;color:${foodText}">${s.name}</h3>
            </div>
            <p style="font-family:var(--body-font);font-size:0.8rem;color:${foodMuted};line-height:1.6">${s.description}</p>
            <div style="display:flex;gap:0.5rem;margin-top:0.35rem">
              ${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.7rem;color:${foodOlive}">${t}</span>`).join(' <span style="color:rgba(0,0,0,0.2)">&#8226;</span> ')}
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 5: Gallery — olive label + heading + photo grid
  const gallerySection = `
  <section id="gallery" style="padding:80px 2rem;background:${foodBg}">
    <div style="max-width:1200px;margin:0 auto;text-align:center">
      <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${foodOlive};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:0.75rem">- ${content.badge || 'Specials Choice'} -</p>
      <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:${foodText};text-transform:uppercase;margin-bottom:3rem">${content.galleryHeading}</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
        ${galleryImgs.slice(0, 3).map(img => `
        <div class="ms-img" style="border-radius:12px;overflow:hidden;height:300px">
          <img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 6: Testimonial — large quote
  const testimonialSection = content.testimonial ? `
  <section style="padding:80px 2rem;background:${foodBg}">
    <div style="max-width:900px;margin:0 auto;text-align:center">
      <div style="width:64px;height:64px;border-radius:50%;background:${foodGold};display:flex;align-items:center;justify-content:center;margin:0 auto 2rem">
        <span style="font-size:1.5rem;color:#fff">&#10077;</span>
      </div>
      <p style="font-family:var(--heading-font);font-size:clamp(1.1rem,2vw,1.4rem);font-weight:600;color:${foodText};line-height:1.7;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:1.5rem">${content.testimonial.quote}</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:0.75rem">
        <span style="font-family:var(--body-font);font-size:0.85rem;font-style:italic;color:${foodGold}">${content.testimonial.author}</span>
        ${content.testimonial.rating ? `<span style="color:#f59e0b;font-size:0.85rem">${'&#9733;'.repeat(content.testimonial.rating)}</span>` : ''}
      </div>
    </div>
  </section>` : ''

  // Section 7: Review strip
  const reviewStrip = `
  <section style="padding:1.5rem 2rem;background:${foodBg};border-top:1px solid rgba(0,0,0,0.06);border-bottom:1px solid rgba(0,0,0,0.06)">
    <div style="max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:1rem">
      <div style="display:flex;gap:0.15rem">
        ${[1,2,3,4,5].map(() => `<span style="color:${foodGold};font-size:1.1rem">&#9733;</span>`).join('')}
      </div>
      <p style="font-family:var(--body-font);font-size:0.95rem;color:${foodText}"><strong>${content.stats[0]?.value || '500+'}</strong> ${content.stats[0]?.label || 'happy customers'}</p>
    </div>
  </section>`

  // Section 8: Full-width food image
  const fullImage = `
  <section style="padding:0;height:50vh;overflow:hidden">
    <img src="${galleryImgs[3] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
  </section>`

  // Section 9: 4-column contact footer
  const contactRow = `
  <section style="padding:60px 2rem;background:${foodBg}">
    <div class="ms-grid" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center">
      <div>
        <div style="font-size:1.5rem;color:${foodText};margin-bottom:0.75rem">&#9993;</div>
        <h3 style="font-family:var(--heading-font);font-size:0.8rem;font-weight:700;color:${foodText};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">About ${businessName}</h3>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${foodMuted}">${content.heroSubtitle}</p>
      </div>
      <div>
        <div style="font-size:1.5rem;color:${foodText};margin-bottom:0.75rem">&#9742;</div>
        <h3 style="font-family:var(--heading-font);font-size:0.8rem;font-weight:700;color:${foodText};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">Let's Talk</h3>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${foodMuted}">${locationInfo.phone}</p>
      </div>
      <div>
        <div style="font-size:1.5rem;color:${foodText};margin-bottom:0.75rem">&#9993;</div>
        <h3 style="font-family:var(--heading-font);font-size:0.8rem;font-weight:700;color:${foodText};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">${content.ctaPrimary}</h3>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${foodMuted}">hello@${businessName.toLowerCase().replace(/\s/g, '')}.com</p>
      </div>
      <div>
        <div style="font-size:1.5rem;color:${foodText};margin-bottom:0.75rem">&#9906;</div>
        <h3 style="font-family:var(--heading-font);font-size:0.8rem;font-weight:700;color:${foodText};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">Visit Us</h3>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${foodMuted}">${locationInfo.address}, ${locationInfo.city}</p>
      </div>
    </div>
  </section>`

  // Footer
  const foodFooter = `
  <footer style="padding:2rem;background:${foodBg};border-top:1px solid rgba(0,0,0,0.06);text-align:center">
    <div style="font-family:var(--heading-font);font-size:1.3rem;font-weight:700;color:${foodText};margin-bottom:0.5rem">${businessName}</div>
    <p style="font-family:var(--body-font);font-size:0.75rem;color:${foodMuted}">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
  </footer>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')}
  <style>
    :root {
      --bg: ${foodBg};
      --bg-alt: #f9f7f4;
      --card-bg: ${foodBg};
      --text: ${foodText};
      --text-muted: ${foodMuted};
      --border: rgba(0,0,0,0.06);
    }
  </style>

${buildStandardNav(businessName, content, navFlags)}

  ${heroSection}
  ${aboutSplit}
  ${trustBar}
  ${menuSection}
  ${gallerySection}
  ${testimonialSection}
  ${reviewStrip}
  ${fullImage}
  ${buildContactSection(content, locationInfo)}
  ${contactRow}

${foodFooter}

</body>
</html>`
}

// ---------- Health-Wellness Template (v0 Dentistry–inspired) ----------
function buildHealthWellnessTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]
  const hwBg = '#ffffff'
  const hwAlt = '#f8faf8'
  const hwText = '#1a1a2e'
  const hwMuted = '#64748b'
  const hwTeal = primaryColor || '#0d9488'

  // Section 1: Full-bleed hero — eyebrow, serif business name, subtitle, 2 CTAs
  const heroSection = `
  <section style="position:relative;min-height:90vh;display:flex;align-items:center;overflow:hidden">
    <div style="position:absolute;inset:0">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,0.85) 0%,rgba(255,255,255,0.6) 100%)"></div>
    </div>
    <div style="position:relative;max-width:1200px;margin:0 auto;padding:0 2rem;width:100%">
      <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${hwTeal};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:1rem">${content.heroEyebrow || 'Welcome To'}</p>
      <h1 style="font-family:var(--heading-font);font-size:clamp(3rem,6vw,5rem);font-weight:700;color:${hwText};line-height:1.05;margin-bottom:1.5rem">${businessName}</h1>
      <p style="font-family:var(--body-font);font-size:1.05rem;color:${hwMuted};max-width:550px;line-height:1.7;margin-bottom:2rem">${content.heroSubtitle}</p>
      <div style="display:flex;gap:0.75rem">
        <a href="#contact" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--body-font);font-size:0.9rem;font-weight:600;padding:0.85rem 2rem;background:${hwTeal};color:#fff;border-radius:8px;text-decoration:none">${content.ctaPrimary} &rarr;</a>
        <a href="#services" style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;padding:0.85rem 2rem;border:1px solid ${hwText};color:${hwText};border-radius:8px;text-decoration:none">${content.ctaSecondary || 'Our Services'}</a>
      </div>
    </div>
  </section>`

  // Section 2: About — photo left, teal eyebrow + serif heading + paragraphs + stats right
  const aboutParagraphs = content.aboutText.split('\n').filter(p => p.trim())
  const aboutSection = `
  <section id="about" style="padding:80px 2rem;background:${hwBg}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center">
      <div class="ms-img" style="border-radius:16px;overflow:hidden;height:550px">
        <img src="${serviceImgs[0]}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>
      <div>
        <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${hwTeal};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">${content.badge || 'About Us'}</p>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:${hwText};margin-bottom:1.5rem">${content.aboutHeading}</h2>
        ${aboutParagraphs.map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:${hwMuted};line-height:1.8;margin-bottom:1rem">${p}</p>`).join('')}
        <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:2rem">
          ${content.stats.slice(0, 3).map(s => `
          <div style="text-align:center">
            <div style="width:44px;height:44px;border-radius:50%;background:rgba(${parseInt(hwTeal.slice(1,3),16)},${parseInt(hwTeal.slice(3,5),16)},${parseInt(hwTeal.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 0.5rem;color:${hwTeal};font-size:1.1rem">&#9733;</div>
            <div style="font-family:var(--heading-font);font-size:1.5rem;font-weight:700;color:${hwText}">${s.value}</div>
            <div style="font-family:var(--body-font);font-size:0.8rem;color:${hwMuted}">${s.label}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>`

  // Section 3: Services — teal eyebrow, serif heading, subtitle, 4-column icon cards
  const servicesSection = `
  <section id="services" style="padding:80px 2rem;background:${hwBg};text-align:center">
    <div style="max-width:1200px;margin:0 auto">
      <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${hwTeal};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">What We Offer</p>
      <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:${hwText};margin-bottom:1rem">${content.servicesHeading}</h2>
      <p style="font-family:var(--body-font);font-size:1rem;color:${hwMuted};margin-bottom:3rem">${content.aboutMission || content.heroSubtitle}</p>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(${Math.min(content.services.length, 4)},1fr);gap:1.5rem">
        ${content.services.map(s => `
        <div style="border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:2rem;text-align:left">
          <div style="width:48px;height:48px;border-radius:50%;background:rgba(${parseInt(hwTeal.slice(1,3),16)},${parseInt(hwTeal.slice(3,5),16)},${parseInt(hwTeal.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem">
            <span style="color:${hwTeal};font-size:1.2rem">${mapIcon(s.icon)}</span>
          </div>
          <h3 style="font-family:var(--heading-font);font-size:1.1rem;font-weight:700;color:${hwText};margin-bottom:0.5rem">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:${hwMuted};line-height:1.7">${s.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 4: Testimonials — dark bg, teal eyebrow, 3 quote cards with teal quote marks
  const testimonialSection = content.testimonial ? `
  <section id="testimonials" style="padding:80px 2rem;background:${hwText}">
    <div style="max-width:1200px;margin:0 auto;text-align:center">
      <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${hwTeal};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">Testimonials</p>
      <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:#fff;margin-bottom:3rem">${content.galleryHeading || 'What Our Patients Say'}</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;text-align:left">
        <div style="border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:2rem;position:relative">
          <div style="position:absolute;top:1.5rem;right:1.5rem;font-size:3rem;color:rgba(${parseInt(hwTeal.slice(1,3),16)},${parseInt(hwTeal.slice(3,5),16)},${parseInt(hwTeal.slice(5,7),16)},0.3);line-height:1">&#10077;</div>
          <p style="font-family:var(--body-font);font-size:0.95rem;color:rgba(255,255,255,0.85);line-height:1.7;margin-bottom:1.5rem">"${content.testimonial.quote}"</p>
          <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:1rem">
            <div style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:#fff">${content.testimonial.author.split(',')[0]}</div>
            <div style="font-family:var(--body-font);font-size:0.8rem;color:rgba(255,255,255,0.5)">${content.testimonial.author.split(',')[1]?.trim() || 'Patient'}</div>
          </div>
        </div>
        ${[0,1].map(i => `
        <div style="border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:2rem;position:relative">
          <div style="position:absolute;top:1.5rem;right:1.5rem;font-size:3rem;color:rgba(${parseInt(hwTeal.slice(1,3),16)},${parseInt(hwTeal.slice(3,5),16)},${parseInt(hwTeal.slice(5,7),16)},0.3);line-height:1">&#10077;</div>
          <p style="font-family:var(--body-font);font-size:0.95rem;color:rgba(255,255,255,0.85);line-height:1.7;margin-bottom:1.5rem">"${i === 0 ? 'Professional, gentle, and they truly care about their patients.' : 'Wonderful with kids and adults alike. Highly recommend!'}"</p>
          <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:1rem">
            <div style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:#fff">${i === 0 ? 'Michael R.' : 'Jennifer L.'}</div>
            <div style="font-family:var(--body-font);font-size:0.8rem;color:rgba(255,255,255,0.5)">Patient</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  // Section 5: Contact — 2-column: info left, form card right
  const contactSection = `
  <section id="contact" style="padding:80px 2rem;background:${hwBg}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:start">
      <div>
        <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${hwTeal};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">Get In Touch</p>
        <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:${hwText};margin-bottom:1rem">${content.contactHeading}</h2>
        <p style="font-family:var(--body-font);font-size:0.95rem;color:${hwMuted};line-height:1.7;margin-bottom:2.5rem">${content.aboutMission || content.heroSubtitle}</p>
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
          <div style="display:flex;align-items:center;gap:0.75rem">
            <div style="width:40px;height:40px;border-radius:50%;background:rgba(${parseInt(hwTeal.slice(1,3),16)},${parseInt(hwTeal.slice(3,5),16)},${parseInt(hwTeal.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;color:${hwTeal};font-size:1rem;flex-shrink:0">&#9906;</div>
            <div><div style="font-family:var(--heading-font);font-size:0.85rem;font-weight:700;color:${hwText}">Address</div><div style="font-family:var(--body-font);font-size:0.8rem;color:${hwMuted}">${locationInfo.address}, ${locationInfo.city}</div></div>
          </div>
          <div style="display:flex;align-items:center;gap:0.75rem">
            <div style="width:40px;height:40px;border-radius:50%;background:rgba(${parseInt(hwTeal.slice(1,3),16)},${parseInt(hwTeal.slice(3,5),16)},${parseInt(hwTeal.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;color:${hwTeal};font-size:1rem;flex-shrink:0">&#9742;</div>
            <div><div style="font-family:var(--heading-font);font-size:0.85rem;font-weight:700;color:${hwText}">Phone</div><div style="font-family:var(--body-font);font-size:0.8rem;color:${hwMuted}">${locationInfo.phone}</div></div>
          </div>
          <div style="display:flex;align-items:center;gap:0.75rem">
            <div style="width:40px;height:40px;border-radius:50%;background:rgba(${parseInt(hwTeal.slice(1,3),16)},${parseInt(hwTeal.slice(3,5),16)},${parseInt(hwTeal.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;color:${hwTeal};font-size:1rem;flex-shrink:0">&#9993;</div>
            <div><div style="font-family:var(--heading-font);font-size:0.85rem;font-weight:700;color:${hwText}">Email</div><div style="font-family:var(--body-font);font-size:0.8rem;color:${hwMuted}">hello@${businessName.toLowerCase().replace(/\s/g,'')}.com</div></div>
          </div>
          ${content.contactHours ? `<div style="display:flex;align-items:center;gap:0.75rem">
            <div style="width:40px;height:40px;border-radius:50%;background:rgba(${parseInt(hwTeal.slice(1,3),16)},${parseInt(hwTeal.slice(3,5),16)},${parseInt(hwTeal.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;color:${hwTeal};font-size:1rem;flex-shrink:0">&#9200;</div>
            <div><div style="font-family:var(--heading-font);font-size:0.85rem;font-weight:700;color:${hwText}">Hours</div><div style="font-family:var(--body-font);font-size:0.8rem;color:${hwMuted}">${content.contactHours.replace(/ · /g, '<br />')}</div></div>
          </div>` : ''}
        </div>
      </div>
      <div style="background:#fff;border-radius:16px;padding:2.5rem;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
        <h3 style="font-family:var(--heading-font);font-size:1.2rem;font-weight:700;color:${hwText};margin-bottom:0.5rem">Send Us a Message</h3>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${hwMuted};margin-bottom:1.5rem">We'll get back to you as soon as possible.</p>
        <form style="display:flex;flex-direction:column;gap:1rem" onsubmit="return false">
          <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
            <div><label style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${hwText};display:block;margin-bottom:0.35rem">First Name</label><input type="text" placeholder="John" style="width:100%;box-sizing:border-box;font-family:var(--body-font);padding:0.75rem 1rem;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:0.9rem;outline:none" /></div>
            <div><label style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${hwText};display:block;margin-bottom:0.35rem">Last Name</label><input type="text" placeholder="Doe" style="width:100%;box-sizing:border-box;font-family:var(--body-font);padding:0.75rem 1rem;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:0.9rem;outline:none" /></div>
          </div>
          <div><label style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${hwText};display:block;margin-bottom:0.35rem">Email</label><input type="email" placeholder="john@example.com" style="width:100%;box-sizing:border-box;font-family:var(--body-font);padding:0.75rem 1rem;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:0.9rem;outline:none" /></div>
          <div><label style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${hwText};display:block;margin-bottom:0.35rem">Phone</label><input type="tel" placeholder="${locationInfo.phone}" style="width:100%;box-sizing:border-box;font-family:var(--body-font);padding:0.75rem 1rem;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:0.9rem;outline:none" /></div>
          <div><label style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${hwText};display:block;margin-bottom:0.35rem">Message</label><textarea placeholder="Tell us about your needs..." rows="4" style="width:100%;box-sizing:border-box;font-family:var(--body-font);padding:0.75rem 1rem;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:0.9rem;outline:none;resize:none"></textarea></div>
          <button type="submit" style="font-family:var(--body-font);padding:0.85rem 2rem;background:${hwTeal};color:#fff;border:none;border-radius:8px;font-size:0.95rem;font-weight:600;cursor:pointer;width:100%">Send Message</button>
        </form>
      </div>
    </div>
  </section>`

  // Footer — 3-column: logo+desc | services | company, copyright bar
  const hwFooter = `
  <footer style="padding:4rem 2rem 2rem;background:${hwAlt};border-top:1px solid rgba(0,0,0,0.06)">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:3rem">
      <div>
        <div style="font-family:var(--heading-font);font-size:1.3rem;font-weight:700;color:${hwText};margin-bottom:1rem">${businessName}</div>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${hwMuted};line-height:1.7;max-width:320px">${content.heroSubtitle}</p>
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.85rem;font-weight:700;color:${hwText};margin-bottom:1rem">Services</h4>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="color:${hwMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">${s.name}</a>`).join('')}
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.85rem;font-weight:700;color:${hwText};margin-bottom:1rem">Company</h4>
        <a href="#about" style="color:${hwMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">About Us</a>
        <a href="#contact" style="color:${hwMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Contact</a>
        <a href="#" style="color:${hwMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Privacy Policy</a>
      </div>
    </div>
    <div style="max-width:1200px;margin:2rem auto 0;padding-top:2rem;border-top:1px solid rgba(0,0,0,0.08);display:flex;justify-content:space-between;align-items:center">
      <p style="font-family:var(--body-font);font-size:0.75rem;color:${hwMuted}">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      <div style="display:flex;gap:1.5rem">
        <a href="#" style="font-family:var(--body-font);font-size:0.75rem;color:${hwMuted};text-decoration:none">Privacy Policy</a>
        <a href="#" style="font-family:var(--body-font);font-size:0.75rem;color:${hwMuted};text-decoration:none">Terms of Service</a>
      </div>
    </div>
  </footer>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')}
  <style>
    :root {
      --bg: ${hwBg};
      --bg-alt: ${hwAlt};
      --card-bg: ${hwBg};
      --text: ${hwText};
      --text-muted: ${hwMuted};
      --border: rgba(0,0,0,0.06);
    }
  </style>

${buildStandardNav(businessName, content, navFlags)}

  ${heroSection}
  ${aboutSection}
  ${servicesSection}
  ${testimonialSection}
  ${contactSection}

${hwFooter}

</body>
</html>`
}

// ---------- Home-Services Template (Helpling–inspired) ----------
function buildHomeServicesTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]

  const homeBg = '#ffffff'
  const homeAlt = '#f7f9f7'
  const homeText = '#1a1a2e'
  const homeMuted = '#6b7280'
  const homeGreenBg = '#5a7a5a'

  // Section 1: Split hero — green bg left with heading + CTA, photo right
  const heroSection = `
  <section class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;min-height:80vh">
    <div style="background:var(--primary);display:flex;flex-direction:column;justify-content:center;padding:4rem 3rem">
      <h1 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:#fff;line-height:1.2;margin-bottom:1.5rem">${content.tagline}</h1>
      <p style="font-family:var(--body-font);font-size:1.05rem;color:rgba(255,255,255,0.8);line-height:1.7;margin-bottom:2rem;max-width:420px">${content.heroSubtitle}</p>
      <div style="display:flex;gap:0.75rem;max-width:420px">
        <a href="#contact" style="flex:1;text-align:center;font-family:var(--body-font);font-size:0.9rem;font-weight:600;padding:0.85rem 1.5rem;background:#fff;color:var(--primary);border-radius:8px;text-decoration:none">${content.ctaPrimary}</a>
        <a href="#services" style="flex:1;text-align:center;font-family:var(--body-font);font-size:0.9rem;font-weight:600;padding:0.85rem 1.5rem;border:2px solid rgba(255,255,255,0.5);color:#fff;border-radius:8px;text-decoration:none">${content.ctaSecondary}</a>
      </div>
    </div>
    <div style="overflow:hidden">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
    </div>
  </section>`

  // Section 2: 3-step process — centered heading + 3 icon columns
  const processSteps = content.processSteps || [
    { step: '1', title: content.services[0]?.name || 'Step 1', description: content.services[0]?.description || '' },
    { step: '2', title: content.services[1]?.name || 'Step 2', description: content.services[1]?.description || '' },
    { step: '3', title: content.services[2]?.name || 'Step 3', description: content.services[2]?.description || '' },
  ]
  const stepIcons = ['&#127968;', '&#128188;', '&#128666;']
  const processSection = `
  <section style="padding:80px 2rem;background:${homeAlt};text-align:center">
    <div style="max-width:1100px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.6rem,2.5vw,2.2rem);font-weight:700;color:${homeText};margin-bottom:3rem">How It Works</h2>
      <div class="ms-flex" style="display:flex;align-items:stretch;gap:1.5rem;margin-bottom:2.5rem">
        ${processSteps.slice(0, 3).map((step, i) => `${i > 0 ? `
        <div class="ms-arrow" style="display:flex;align-items:center;flex-shrink:0">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>` : ''}
        <div style="flex:1;padding:2.5rem 1.5rem;background:${homeBg};border:1px solid rgba(0,0,0,0.06);border-radius:16px;text-align:center">
          <div style="width:72px;height:72px;border-radius:50%;background:rgba(${parseInt(primaryColor.slice(1,3),16)},${parseInt(primaryColor.slice(3,5),16)},${parseInt(primaryColor.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem">
            <span style="font-size:1.8rem">${stepIcons[i] || '&#9733;'}</span>
          </div>
          <h3 style="font-family:var(--heading-font);font-size:1.05rem;font-weight:700;color:${homeText};margin-bottom:0.5rem">${step.title}</h3>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:${homeMuted};line-height:1.7;margin-bottom:1rem">${step.description}</p>
          <a href="#contact" style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;padding:0.5rem 1.25rem;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none">${content.ctaPrimary}</a>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 3: Stats row — dark green bg
  const statsSection = `
  <section style="padding:60px 2rem;background:var(--primary)">
    <div class="ms-grid" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(${Math.min(content.stats.length, 4)},1fr);gap:2rem;text-align:center">
      ${content.stats.slice(0, 4).map(s => `
      <div>
        <div style="font-family:var(--body-font);font-size:0.8rem;color:rgba(255,255,255,0.7);margin-bottom:0.25rem">${s.sublabel || ''}</div>
        <div style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:#fff;line-height:1">${s.value}</div>
        <div style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.75);margin-top:0.35rem">${s.label}</div>
      </div>`).join('')}
    </div>
  </section>`

  // Section 4: 4-column benefits with green-tinted icons
  const benefitsSection = `
  <section id="services" style="padding:80px 2rem;background:${homeBg};text-align:center">
    <div style="max-width:1100px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.6rem,2.5vw,2.2rem);font-weight:700;color:${homeText};margin-bottom:3rem">${content.aboutHeading}</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(${Math.min(content.services.length, 4)},1fr);gap:2rem">
        ${content.services.slice(0, 4).map(s => `
        <div style="text-align:left">
          <div style="width:56px;height:56px;border-radius:12px;background:rgba(${parseInt(primaryColor.slice(1,3),16)},${parseInt(primaryColor.slice(3,5),16)},${parseInt(primaryColor.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;margin-bottom:1rem">
            <span style="font-size:1.3rem;color:var(--primary)">${mapIcon(s.icon)}</span>
          </div>
          <h3 style="font-family:var(--heading-font);font-size:1rem;font-weight:700;color:${homeText};margin-bottom:0.5rem">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:0.85rem;color:${homeMuted};line-height:1.7">${s.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 5: 3-column testimonial cards with avatar + stars
  const testimonialSection = content.testimonial ? `
  <section style="padding:80px 2rem;background:${homeAlt}">
    <div style="max-width:1100px;margin:0 auto;text-align:center">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.6rem,2.5vw,2.2rem);font-weight:700;color:${homeText};margin-bottom:0.75rem">${content.galleryHeading || 'What Our Customers Say'}</h2>
      <p style="font-family:var(--body-font);font-size:0.95rem;color:${homeMuted};margin-bottom:3rem">${content.aboutMission || 'Read reviews from happy customers.'}</p>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
        ${[0,1,2].map(i => {
          const t = i === 0 && content.testimonial ? content.testimonial : null
          const quote = t ? t.quote : (content.services[i]?.description || '')
          const author = t ? t.author : (content.services[i]?.name || 'Happy Customer')
          const rating = t ? t.rating : 5
          return `
        <div style="background:${homeBg};border:1px solid rgba(0,0,0,0.06);border-radius:16px;padding:2rem 1.5rem;text-align:center;position:relative;margin-top:2rem">
          <div style="width:64px;height:64px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--heading-font);font-size:1.2rem;font-weight:700;position:absolute;top:-32px;left:50%;transform:translateX(-50%)">${author.charAt(0)}</div>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:${homeMuted};line-height:1.7;font-style:italic;margin-top:1.5rem;margin-bottom:1rem">"${quote}"</p>
          <p style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:${homeText};margin-bottom:0.5rem">${author}</p>
          <div style="color:#f59e0b;font-size:0.9rem">${'&#9733;'.repeat(rating)}</div>
        </div>`
        }).join('')}
      </div>
    </div>
  </section>` : ''

  // Section 6: 50/50 feature — bullet list left, photo right
  const aboutParagraphs = content.aboutText.split('\n').filter(p => p.trim())
  const featureSection = `
  <section id="about" style="padding:80px 2rem;background:${homeBg}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center">
      <div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:700;color:${homeText};margin-bottom:1.5rem">${content.aboutHeading}</h2>
        ${aboutParagraphs.map(p => `<div style="display:flex;align-items:start;gap:0.75rem;margin-bottom:0.75rem">
          <span style="color:var(--primary);font-size:1rem;flex-shrink:0;margin-top:2px">&#9632;</span>
          <p style="font-family:var(--body-font);font-size:0.95rem;color:${homeMuted};line-height:1.7">${p}</p>
        </div>`).join('')}
        <div style="display:flex;gap:0.75rem;margin-top:2rem">
          <a href="#contact" style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;padding:0.85rem 2rem;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none">${content.ctaPrimary}</a>
        </div>
      </div>
      <div class="ms-img" style="border-radius:16px;overflow:hidden;height:450px">
        <img src="${serviceImgs[0]}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>
    </div>
  </section>`

  // Section 7: 3-column support/FAQ cards
  const supportCards = `
  <section style="padding:80px 2rem;background:${homeAlt}">
    <div style="max-width:1100px;margin:0 auto;text-align:center">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.6rem,2.5vw,2.2rem);font-weight:700;color:${homeText};margin-bottom:3rem">${content.contactHeading}</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
        ${content.services.slice(0, 3).map(s => `
        <div style="background:${homeBg};border:1px solid rgba(0,0,0,0.06);border-radius:16px;padding:2.5rem 1.5rem;text-align:center">
          <div style="width:56px;height:56px;border-radius:12px;background:rgba(${parseInt(primaryColor.slice(1,3),16)},${parseInt(primaryColor.slice(3,5),16)},${parseInt(primaryColor.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem">
            <span style="font-size:1.2rem;color:var(--primary)">${s.icon || '&#9881;'}</span>
          </div>
          <h3 style="font-family:var(--heading-font);font-size:1rem;font-weight:700;color:${homeText};margin-bottom:0.5rem">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:0.85rem;color:${homeMuted};line-height:1.7">${s.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // CTA banner — dark green bg
  const ctaBanner = `
  <section style="padding:60px 2rem;background:var(--primary)">
    <div style="max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:700;color:#fff;max-width:600px">${content.aboutMission || content.heroSubtitle}</h2>
      <a href="#contact" style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;padding:0.85rem 2.5rem;background:#fff;color:${homeText};border-radius:8px;text-decoration:none">${content.ctaPrimary}</a>
    </div>
  </section>`

  // Footer
  const homeFooter = `
  <footer style="padding:4rem 2rem 2rem;background:${homeAlt};border-top:1px solid rgba(0,0,0,0.06)">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr;gap:3rem">
      <div>
        <div style="font-family:var(--heading-font);font-size:1.3rem;font-weight:700;color:var(--primary);margin-bottom:0.75rem">${businessName}</div>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${homeMuted};line-height:1.6;max-width:300px">${content.heroSubtitle}</p>
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:${homeText};margin-bottom:1rem;font-weight:600">Services</div>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="color:${homeMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">${s.name}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:${homeText};margin-bottom:1rem;font-weight:600">Company</div>
        <a href="#about" style="color:${homeMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">About</a>
        <a href="#contact" style="color:${homeMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Contact</a>
        <a href="#" style="color:${homeMuted};text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Privacy Policy</a>
      </div>
    </div>
    <div style="max-width:1200px;margin:2rem auto 0;padding-top:2rem;border-top:1px solid rgba(0,0,0,0.08);text-align:center">
      <p style="font-family:var(--body-font);font-size:0.8rem;color:${homeMuted}">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
    </div>
  </footer>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')}
  <style>
    :root {
      --bg: ${homeBg};
      --bg-alt: ${homeAlt};
      --card-bg: ${homeBg};
      --text: ${homeText};
      --text-muted: ${homeMuted};
      --border: rgba(0,0,0,0.06);
    }
  </style>

${homeNav}

  ${heroSection}
  ${benefitsSection}
  ${statsSection}
  ${processSection}
  ${featureSection}
  ${testimonialSection}
  ${ctaBanner}
  ${buildContactSection(content, locationInfo)}

${homeFooter}

</body>
</html>`
}

// ---------- Trades-Construction Template (Plumb London–inspired) ----------
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
function mapIcon(icon?: string): string {
  if (!icon) return '&#9881;'
  return iconMap[icon] || '&#9881;'
}

function buildTradesTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]

  const trBg = '#ffffff'
  const trAlt = '#f8fafc'
  const trText = '#0f172a'
  const trMuted = '#64748b'
  const trBlue = primaryColor || '#2563eb'

  // Nav — logo left, links center, phone + blue CTA right
  const trNavLinks: string[] = []
  if (navFlags.navServices) trNavLinks.push(`<a href="#services" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:0.85rem;font-weight:400">Services</a>`)
  if (navFlags.navAbout) trNavLinks.push(`<a href="#about" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:0.85rem;font-weight:400">About</a>`)
  trNavLinks.push(`<a href="#testimonials" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:0.85rem;font-weight:400">Testimonials</a>`)
  if (navFlags.navContact) trNavLinks.push(`<a href="#contact" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:0.85rem;font-weight:400">Contact</a>`)

  const trNav = `
  <nav class="ms-sticky" style="background:var(--primary);position:sticky;top:0;z-index:100">
    <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 2rem">
      <a href="#" style="font-family:var(--heading-font);font-size:1.3rem;font-weight:700;color:#fff;text-decoration:none">${businessName}</a>
      <div style="display:flex;align-items:center;gap:2rem">
        <div class="ms-nav-links" style="display:flex;align-items:center;gap:2rem">
          ${trNavLinks.join('\n          ')}
        </div>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:var(--primary);background:#fff;padding:0.55rem 1.5rem;border-radius:999px;text-decoration:none">${content.ctaPrimary}</a>
      </div>
      ${buildBurgerButton('#fff')}
    </div>
  </nav>
  ${buildMobileMenu(content)}`

  // Section 1: Full-bleed hero with badge, heading, subtitle, 2 CTAs, trust strip
  const heroSection = `
  <section style="position:relative;min-height:90vh;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden">
    <div style="position:absolute;inset:0">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.65) 100%)"></div>
    </div>
    <div style="position:relative;max-width:1200px;margin:0 auto;padding:0 2rem 3rem;width:100%">
      <div style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(0,0,0,0.4);backdrop-filter:blur(8px);padding:0.5rem 1rem;border-radius:999px;margin-bottom:1.5rem">
        <span style="width:8px;height:8px;border-radius:50%;background:#22c55e"></span>
        <span style="font-family:var(--body-font);font-size:0.8rem;color:#fff;font-weight:500">${content.badge || content.heroEyebrow}</span>
      </div>
      <h1 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5vw,4rem);font-weight:700;color:#fff;line-height:1.1;margin-bottom:1.25rem;max-width:700px">${content.tagline}</h1>
      <p style="font-family:var(--body-font);font-size:1.05rem;color:rgba(255,255,255,0.8);max-width:550px;line-height:1.7;margin-bottom:2rem">${content.heroSubtitle}</p>
      <div style="display:flex;gap:0.75rem;margin-bottom:3rem">
        <a href="#contact" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--body-font);font-size:0.9rem;font-weight:600;padding:0.85rem 2rem;background:${trBlue};color:#fff;border-radius:8px;text-decoration:none">${content.ctaPrimary} &rarr;</a>
        <a href="#services" style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;padding:0.85rem 2rem;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.25);color:#fff;border-radius:8px;text-decoration:none">${content.ctaSecondary || 'View Our Services'}</a>
      </div>
      <div style="display:flex;gap:3rem">
        ${content.stats.slice(0, 3).map(s => `
        <div style="display:flex;align-items:center;gap:0.75rem">
          <div style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;color:#fff;font-size:1rem">&#9733;</div>
          <div>
            <div style="font-family:var(--heading-font);font-size:0.95rem;font-weight:700;color:#fff">${s.label}</div>
            <div style="font-family:var(--body-font);font-size:0.75rem;color:rgba(255,255,255,0.6)">${s.sublabel || s.value}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 2: Dark band — mission + stats row
  const darkBand = `
  <section style="background:${trText};padding:60px 2rem">
    <div style="max-width:1200px;margin:0 auto;display:flex;justify-content:center;gap:4rem;flex-wrap:wrap">
      ${content.stats.slice(0, 4).map(s => `
      <div style="text-align:center">
        <div style="font-family:var(--heading-font);font-size:2rem;font-weight:700;color:${trBlue}">${s.value}</div>
        <div style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.6);margin-top:0.25rem">${s.label}</div>
      </div>`).join('')}
    </div>
  </section>`

  // Section 3: Services — blue eyebrow, heading, subtitle, 3x2 icon cards
  const servicesSection = `
  <section id="services" style="padding:80px 2rem;background:${trBg}">
    <div style="max-width:1200px;margin:0 auto">
      <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${trBlue};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">Our Services</p>
      <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:${trText};margin-bottom:1rem">${content.servicesHeading}</h2>
      <p style="font-family:var(--body-font);font-size:1rem;color:${trMuted};max-width:600px;line-height:1.7;margin-bottom:3rem">${content.aboutMission || content.heroSubtitle}</p>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
        ${content.services.map(s => `
        <div style="border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:2rem">
          <div style="width:48px;height:48px;border-radius:12px;background:rgba(${parseInt(trBlue.slice(1,3),16)},${parseInt(trBlue.slice(3,5),16)},${parseInt(trBlue.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem">
            <span style="color:${trBlue};font-size:1.2rem">${mapIcon(s.icon)}</span>
          </div>
          <h3 style="font-family:var(--heading-font);font-size:1.1rem;font-weight:700;color:${trText};margin-bottom:0.5rem">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:${trMuted};line-height:1.7;margin-bottom:1rem">${s.description}</p>
          <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;color:${trBlue};text-decoration:none;font-weight:500;display:inline-flex;align-items:center;gap:0.35rem">Learn More &rarr;</a>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 4: About — photo left with floating stat badge, text + checkmarks right
  const aboutParagraphs = content.aboutText.split('\n').filter(p => p.trim())
  const aboutSection = `
  <section id="about" style="padding:80px 2rem;background:${trAlt}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center">
      <div style="position:relative">
        <div class="ms-img" style="border-radius:16px;overflow:hidden;height:550px">
          <img src="${serviceImgs[0]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div style="position:absolute;bottom:-1.5rem;right:-1.5rem;background:#fff;border-radius:12px;padding:1rem 1.5rem;box-shadow:0 4px 20px rgba(0,0,0,0.1);display:flex;align-items:center;gap:0.75rem">
          <div style="width:48px;height:48px;border-radius:50%;background:${trBlue};display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--heading-font);font-size:1rem;font-weight:700">${content.stats[0]?.value || '15+'}</div>
          <div>
            <div style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:${trText}">${content.stats[0]?.label || 'Years Experience'}</div>
            <div style="font-family:var(--body-font);font-size:0.75rem;color:${trMuted}">${content.stats[0]?.sublabel || 'Serving our community'}</div>
          </div>
        </div>
      </div>
      <div>
        <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${trBlue};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">About Us</p>
        <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:${trText};margin-bottom:1.5rem">${content.aboutHeading}</h2>
        ${aboutParagraphs.map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:${trMuted};line-height:1.8;margin-bottom:1rem">${p}</p>`).join('')}
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-top:1.5rem">
          ${content.services.map(s => s.tags).flat().slice(0, 6).map(t => `
          <div style="display:flex;align-items:center;gap:0.5rem">
            <span style="color:${trBlue};font-size:1rem">&#10003;</span>
            <span style="font-family:var(--body-font);font-size:0.85rem;color:${trText};font-weight:500">${t}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>`

  // Section 5: Testimonials — blue eyebrow, heading, 3 cards with stars
  const testimonialSection = content.testimonial ? `
  <section id="testimonials" style="padding:80px 2rem;background:${trAlt}">
    <div style="max-width:1200px;margin:0 auto;text-align:center">
      <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${trBlue};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">Testimonials</p>
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:${trText};margin-bottom:1rem">What Our Customers Say</h2>
      <p style="font-family:var(--body-font);font-size:1rem;color:${trMuted};margin-bottom:3rem">Don't just take our word for it.</p>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;text-align:left">
        <div style="border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:2rem">
          <div style="color:#f59e0b;font-size:1rem;margin-bottom:1rem">${'&#9733;'.repeat(content.testimonial.rating || 5)}</div>
          <p style="font-family:var(--body-font);font-size:0.95rem;color:${trText};line-height:1.7;margin-bottom:1.5rem">"${content.testimonial.quote}"</p>
          <div style="border-top:1px solid rgba(0,0,0,0.06);padding-top:1rem">
            <div style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:${trText}">${content.testimonial.author.split(',')[0]}</div>
            <div style="font-family:var(--body-font);font-size:0.8rem;color:${trMuted}">${content.testimonial.author.split(',')[1]?.trim() || 'Customer'}</div>
          </div>
        </div>
        ${content.stats.slice(1, 3).map((s, i) => `
        <div style="border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:2rem">
          <div style="color:#f59e0b;font-size:1rem;margin-bottom:1rem">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p style="font-family:var(--body-font);font-size:0.95rem;color:${trText};line-height:1.7;margin-bottom:1.5rem">"${i === 0 ? 'Professional, reliable, and fair pricing. Couldn\'t ask for more.' : 'Fast response time and excellent workmanship. Highly recommend.'}"</p>
          <div style="border-top:1px solid rgba(0,0,0,0.06);padding-top:1rem">
            <div style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:${trText}">${i === 0 ? 'Mike R.' : 'Jennifer L.'}</div>
            <div style="font-family:var(--body-font);font-size:0.8rem;color:${trMuted}">${i === 0 ? 'Business Owner' : 'Homeowner'}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  // Section 6: Stats row — coloured numbers
  const statsRow = `
  <section style="padding:60px 2rem;background:${trBg}">
    <div style="max-width:900px;margin:0 auto;display:flex;justify-content:center;gap:5rem;flex-wrap:wrap;text-align:center">
      ${content.stats.slice(0, 3).map(s => `
      <div>
        <div style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${trBlue}">${s.value}</div>
        <div style="font-family:var(--body-font);font-size:0.85rem;color:${trMuted}">${s.label}</div>
      </div>`).join('')}
    </div>
  </section>`

  // Section 7: Contact — 2-column: info left, form right
  const contactSection = `
  <section id="contact" style="padding:80px 2rem;background:${trAlt}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:start">
      <div>
        <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${trBlue};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">Contact Us</p>
        <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:${trText};margin-bottom:1rem">${content.contactHeading}</h2>
        <p style="font-family:var(--body-font);font-size:0.95rem;color:${trMuted};line-height:1.7;margin-bottom:2.5rem">${content.heroSubtitle}</p>
        <div style="display:flex;flex-direction:column;gap:1.5rem">
          <div style="display:flex;align-items:center;gap:1rem">
            <div style="width:44px;height:44px;border-radius:50%;background:rgba(${parseInt(trBlue.slice(1,3),16)},${parseInt(trBlue.slice(3,5),16)},${parseInt(trBlue.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;color:${trBlue};font-size:1.1rem">&#9742;</div>
            <div><div style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:${trText}">Phone</div><div style="font-family:var(--body-font);font-size:0.85rem;color:${trMuted}">${locationInfo.phone}</div></div>
          </div>
          <div style="display:flex;align-items:center;gap:1rem">
            <div style="width:44px;height:44px;border-radius:50%;background:rgba(${parseInt(trBlue.slice(1,3),16)},${parseInt(trBlue.slice(3,5),16)},${parseInt(trBlue.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;color:${trBlue};font-size:1.1rem">&#9993;</div>
            <div><div style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:${trText}">Email</div><div style="font-family:var(--body-font);font-size:0.85rem;color:${trMuted}">hello@${businessName.toLowerCase().replace(/\s/g,'')}.com</div></div>
          </div>
          <div style="display:flex;align-items:center;gap:1rem">
            <div style="width:44px;height:44px;border-radius:50%;background:rgba(${parseInt(trBlue.slice(1,3),16)},${parseInt(trBlue.slice(3,5),16)},${parseInt(trBlue.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;color:${trBlue};font-size:1.1rem">&#9906;</div>
            <div><div style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:${trText}">Service Area</div><div style="font-family:var(--body-font);font-size:0.85rem;color:${trMuted}">${locationInfo.city} &amp; surrounds</div></div>
          </div>
          ${content.contactHours ? `<div style="display:flex;align-items:center;gap:1rem">
            <div style="width:44px;height:44px;border-radius:50%;background:rgba(${parseInt(trBlue.slice(1,3),16)},${parseInt(trBlue.slice(3,5),16)},${parseInt(trBlue.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;color:${trBlue};font-size:1.1rem">&#9200;</div>
            <div><div style="font-family:var(--heading-font);font-size:0.9rem;font-weight:700;color:${trText}">Hours</div><div style="font-family:var(--body-font);font-size:0.85rem;color:${trMuted}">${content.contactHours.replace(/ · /g, '<br />')}</div></div>
          </div>` : ''}
        </div>
      </div>
      <div style="background:#fff;border-radius:16px;padding:2.5rem;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
        <h3 style="font-family:var(--heading-font);font-size:1.2rem;font-weight:700;color:${trText};margin-bottom:0.5rem">Send Us a Message</h3>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${trMuted};margin-bottom:1.5rem">We'll get back to you as soon as possible.</p>
        <form style="display:flex;flex-direction:column;gap:1rem" onsubmit="return false">
          <div><label style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${trText};display:block;margin-bottom:0.35rem">Name</label><input type="text" placeholder="Your name" style="width:100%;box-sizing:border-box;font-family:var(--body-font);padding:0.75rem 1rem;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:0.9rem;outline:none" /></div>
          <div><label style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${trText};display:block;margin-bottom:0.35rem">Email</label><input type="email" placeholder="your@email.com" style="width:100%;box-sizing:border-box;font-family:var(--body-font);padding:0.75rem 1rem;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:0.9rem;outline:none" /></div>
          <div><label style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${trText};display:block;margin-bottom:0.35rem">Phone</label><input type="tel" placeholder="${locationInfo.phone}" style="width:100%;box-sizing:border-box;font-family:var(--body-font);padding:0.75rem 1rem;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:0.9rem;outline:none" /></div>
          <div><label style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${trText};display:block;margin-bottom:0.35rem">Message</label><textarea placeholder="Tell us about your project..." rows="4" style="width:100%;box-sizing:border-box;font-family:var(--body-font);padding:0.75rem 1rem;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:0.9rem;outline:none;resize:none"></textarea></div>
          <button type="submit" style="font-family:var(--body-font);padding:0.85rem 2rem;background:${trBlue};color:#fff;border:none;border-radius:8px;font-size:0.95rem;font-weight:600;cursor:pointer;width:100%">Send Message</button>
        </form>
      </div>
    </div>
  </section>`

  // Footer — 3-column: logo+desc+phone | quick links | contact
  const trFooter = `
  <footer style="padding:4rem 2rem 2rem;background:${trText}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:3rem">
      <div>
        <div style="font-family:var(--heading-font);font-size:1.3rem;font-weight:700;color:#fff;margin-bottom:1rem">${businessName}</div>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.5);line-height:1.7;max-width:320px;margin-bottom:1.5rem">${content.heroSubtitle}</p>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.6)">&#9742; ${locationInfo.phone}</p>
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:#fff;margin-bottom:1rem">Quick Links</h4>
        <a href="#services" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Services</a>
        <a href="#about" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">About</a>
        <a href="#testimonials" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Testimonials</a>
        <a href="#contact" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Contact</a>
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:#fff;margin-bottom:1rem">Contact</h4>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.5);margin-bottom:0.5rem">&#9742; ${locationInfo.phone}</p>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.5);margin-bottom:0.5rem">&#9993; hello@${businessName.toLowerCase().replace(/\s/g,'')}.com</p>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.5)">&#9906; ${locationInfo.city} &amp; surrounds</p>
      </div>
    </div>
    <div style="max-width:1200px;margin:2rem auto 0;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center">
      <p style="font-family:var(--body-font);font-size:0.75rem;color:rgba(255,255,255,0.3)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      <p style="font-family:var(--body-font);font-size:0.75rem;color:rgba(255,255,255,0.3)">${content.badge || ''}</p>
    </div>
  </footer>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')}
  <style>
    :root {
      --bg: ${trBg};
      --bg-alt: ${trAlt};
      --card-bg: ${trBg};
      --text: ${trText};
      --text-muted: ${trMuted};
      --border: rgba(0,0,0,0.08);
    }
  </style>

${trNav}

  ${heroSection}
  ${darkBand}
  ${servicesSection}
  ${aboutSection}
  ${testimonialSection}
  ${statsRow}
  ${contactSection}

${trFooter}

</body>
</html>`
}

// ---------- Retail Template (Public Pool–inspired) ----------
function buildRetailTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]
  const galleryImgs = [
    images[4] || stockImages.cards[3],
    stockImages.cards[4],
    stockImages.cards[5],
    stockImages.cards[6],
  ]

  // Retail uses a warm light theme
  const retailBg = '#f5f0eb'
  const retailCardBg = '#ffffff'
  const retailText = '#1a1a1a'
  const retailMuted = '#6b6560'

  // Retail nav — standardised: primary bg, business name + links left, white pill CTA right
  const retailNavLinks: string[] = []
  if (navFlags.navServices) retailNavLinks.push(`<a href="#services" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:0.85rem;font-weight:400">${content.servicesHeading || 'Shop'}</a>`)
  if (navFlags.navAbout) retailNavLinks.push(`<a href="#about" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:0.85rem;font-weight:400">About</a>`)
  if (navFlags.navContact) retailNavLinks.push(`<a href="#contact" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:0.85rem;font-weight:400">Contact</a>`)

  const retailNav = `
  <nav class="ms-sticky" style="background:var(--primary);position:sticky;top:0;z-index:100">
    <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 2rem">
      <a href="#" style="font-family:var(--heading-font);font-size:1.3rem;font-weight:700;color:#fff;text-decoration:none">${businessName}</a>
      <div style="display:flex;align-items:center;gap:2rem">
        <div class="ms-nav-links" style="display:flex;align-items:center;gap:2rem">
          ${retailNavLinks.join('\n          ')}
        </div>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:var(--primary);background:#fff;padding:0.55rem 1.5rem;border-radius:999px;text-decoration:none">${content.ctaPrimary}</a>
      </div>
      ${buildBurgerButton('#fff')}
    </div>
  </nav>
  ${buildMobileMenu(content)}`

  // Section 1: Full-bleed hero — huge heading overlay on lifestyle photo
  const heroSection = `
  <section style="position:relative;min-height:85vh;display:flex;align-items:center;overflow:hidden;background:${retailBg}">
    <div style="position:absolute;inset:1rem;border-radius:20px;overflow:hidden">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.35) 100%)"></div>
    </div>
    <div style="position:relative;max-width:1100px;margin:0 auto;padding:0 3rem;width:100%;text-align:center">
      <h1 style="font-family:var(--heading-font);font-size:clamp(3rem,7vw,6rem);font-weight:900;color:#fff;line-height:0.95;margin-bottom:1.5rem;text-transform:uppercase;letter-spacing:-0.02em">${content.tagline}</h1>
      <p style="font-family:var(--body-font);font-size:1.1rem;color:rgba(255,255,255,0.85);max-width:500px;margin:0 auto 2rem;line-height:1.6">${content.heroSubtitle}</p>
      <a href="#services" style="display:inline-block;font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:1rem 2.5rem;background:var(--secondary);color:#fff;border-radius:999px;text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;transition:transform 0.2s">${content.ctaPrimary}</a>
    </div>
  </section>`

  // Section 2: "Jump In" — centered heading + subtitle + 3 product circles
  const collectionSection = `
  <section style="padding:100px 2rem;background:${retailBg};text-align:center">
    <div style="max-width:1100px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5.5vw,4.5rem);font-weight:900;color:var(--primary);line-height:0.95;margin-bottom:1rem;text-transform:uppercase">${content.servicesHeading}</h2>
      <p style="font-family:var(--body-font);font-size:1.05rem;color:${retailMuted};line-height:1.7;max-width:500px;margin:0 auto 2rem">${content.aboutMission || content.heroSubtitle}</p>
      <a href="#services" style="display:inline-block;font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:1rem 2.5rem;background:var(--primary);color:#fff;border-radius:999px;text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:3rem">${content.ctaSecondary || 'Shop All'}</a>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(${Math.min(content.services.length, 4)},1fr);gap:1.5rem;margin-top:2rem">
        ${content.services.slice(0, 4).map((s, i) => `
        <div style="display:flex;flex-direction:column;align-items:center">
          <div style="width:100%;aspect-ratio:1;border-radius:16px;overflow:hidden;margin-bottom:1rem">
            <img src="${i < serviceImgs.length ? serviceImgs[i] : (galleryImgs[i - serviceImgs.length] || heroImg)}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <h3 style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${retailText};letter-spacing:0.1em;text-transform:uppercase">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:0.8rem;color:${retailMuted};line-height:1.6;text-align:center;margin-top:0.5rem">${s.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 3: 50/50 split — overlapping photos left, heading + CTA right
  const splitSection = `
  <section style="padding:80px 2rem;background:${retailBg}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.1fr 1fr;gap:4rem;align-items:center">
      <div style="position:relative;min-height:500px">
        <div style="position:absolute;top:0;left:0;width:65%;height:75%;border-radius:16px;overflow:hidden;z-index:1">
          <img src="${galleryImgs[0]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div style="position:absolute;bottom:0;right:0;width:55%;height:65%;border-radius:16px;overflow:hidden;z-index:2;box-shadow:0 8px 30px rgba(0,0,0,0.1)">
          <img src="${galleryImgs[1]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
      </div>
      <div style="text-align:center;padding:2rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4.5vw,3.5rem);font-weight:900;color:var(--primary);line-height:0.95;margin-bottom:1rem;text-transform:uppercase">${content.aboutHeading}</h2>
        <p style="font-family:var(--body-font);font-size:1rem;color:${retailMuted};line-height:1.7;margin-bottom:2rem">${content.aboutText.split('\n')[0]}</p>
        <a href="#services" style="display:inline-block;font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:1rem 2.5rem;background:var(--secondary);color:#fff;border-radius:999px;text-decoration:none;letter-spacing:0.1em;text-transform:uppercase">${content.ctaPrimary}</a>
      </div>
    </div>
  </section>`

  // Section 4: Full-width product image — rounded corners, soft bg
  const fullWidthImage = `
  <section style="padding:40px 2rem;background:${retailBg}">
    <div style="max-width:1200px;margin:0 auto;border-radius:24px;overflow:hidden;height:60vh">
      <img src="${galleryImgs[2] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
    </div>
  </section>`

  // Section 5: Colored feature section — bold bg, heading, product center, 4 numbered features
  const featureSection = `
  <section style="padding:80px 2rem;background:var(--primary);border-radius:24px;margin:40px 1rem;text-align:center">
    <div style="max-width:1100px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5.5vw,4.5rem);font-weight:900;color:#fff;line-height:0.95;margin-bottom:1.5rem;text-transform:uppercase">${content.galleryHeading || 'Why Choose Us'}</h2>
      <p style="font-family:var(--body-font);font-size:1.05rem;color:rgba(255,255,255,0.8);line-height:1.7;max-width:550px;margin:0 auto 3rem">${content.services[0]?.description || content.heroSubtitle}</p>
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 2fr 1fr;gap:2rem;align-items:center;max-width:900px;margin:0 auto">
        <div>
          ${content.stats.slice(0, 2).map((s, i) => `
          <div style="margin-bottom:${i === 0 ? '3rem' : '0'};text-align:center">
            <div style="font-family:var(--heading-font);font-size:2.5rem;font-weight:700;color:rgba(255,255,255,0.3);line-height:1">${i + 1}</div>
            <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:#fff;letter-spacing:0.12em;text-transform:uppercase;margin-top:0.25rem">${s.label}</p>
          </div>`).join('')}
        </div>
        <div style="border-radius:16px;overflow:hidden">
          <img src="${serviceImgs[0]}" alt="" style="width:100%;height:auto;display:block" />
        </div>
        <div>
          ${content.stats.slice(2, 4).map((s, i) => `
          <div style="margin-bottom:${i === 0 ? '3rem' : '0'};text-align:center">
            <div style="font-family:var(--heading-font);font-size:2.5rem;font-weight:700;color:rgba(255,255,255,0.3);line-height:1">${i + 3}</div>
            <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:#fff;letter-spacing:0.12em;text-transform:uppercase;margin-top:0.25rem">${s.label}</p>
          </div>`).join('')}
        </div>
      </div>
      <a href="#services" style="display:inline-block;font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:1rem 2.5rem;background:var(--secondary);color:#fff;border-radius:999px;text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;margin-top:3rem">${content.ctaPrimary}</a>
    </div>
  </section>`

  // Section 6: People / product cards — even grid with square images
  // Pick the largest even-friendly count: 4→2x2, 3→1x3, 2→1x2, 6→2x3
  const cardItems = content.services.slice(0, content.services.length <= 3 ? content.services.length : content.services.length % 2 === 0 ? content.services.length : content.services.length - 1)
  const gridCols = cardItems.length === 4 ? 2 : cardItems.length >= 6 ? 3 : cardItems.length
  const productCards = `
  <section id="services" style="padding:80px 2rem;background:${retailBg}">
    <div class="ms-grid" style="max-width:${gridCols <= 2 ? '800' : '1200'}px;margin:0 auto;display:grid;grid-template-columns:repeat(${gridCols},1fr);gap:2rem">
      ${cardItems.map((s, i) => `
      <div style="text-align:center">
        <div style="border-radius:8px;overflow:hidden;width:100%;aspect-ratio:1;margin-bottom:1.25rem">
          <img src="${serviceImgs[i % serviceImgs.length]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <h3 style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${retailText};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:0.5rem">${s.name}</h3>
        <p style="font-family:var(--body-font);font-size:0.9rem;color:${retailMuted};line-height:1.6">${s.description}</p>
      </div>`).join('')}
    </div>
  </section>`

  // Section 7: About — full-bleed textured photo with heading overlay + CTA
  const aboutSection = `
  <section id="about" style="position:relative;min-height:70vh;display:flex;align-items:center;justify-content:center;overflow:hidden;margin:0 1rem;border-radius:24px">
    <div style="position:absolute;inset:0">
      <img src="${galleryImgs[3] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:rgba(0,0,0,0.35)"></div>
    </div>
    <div style="position:relative;text-align:center;padding:3rem">
      <h2 style="font-family:var(--heading-font);font-size:clamp(3rem,6vw,5rem);font-weight:900;color:#fff;line-height:0.95;text-transform:uppercase;margin-bottom:2rem">About<br />${businessName}</h2>
      <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.85rem 2.5rem;border:2px solid #fff;color:#fff;border-radius:999px;text-decoration:none;letter-spacing:0.1em;text-transform:uppercase">${content.ctaSecondary || 'Learn More'}</a>
    </div>
  </section>`

  // Section 8: Community / social strip
  const communitySection = content.testimonial ? `
  <section style="padding:80px 2rem;background:${retailBg}">
    <div style="max-width:800px;margin:0 auto;text-align:center">
      <p style="font-family:var(--body-font);font-size:0.85rem;font-weight:700;color:var(--primary);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1.5rem">#${businessName.replace(/\s/g, '').toUpperCase()}</p>
      <p style="font-family:var(--body-font);font-size:1.1rem;color:${retailMuted};line-height:1.7;font-style:italic;margin-bottom:1rem">"${content.testimonial.quote}"</p>
      <p style="font-family:var(--body-font);font-size:0.9rem;color:${retailText};font-weight:600">— ${content.testimonial.author}</p>
    </div>
  </section>` : ''

  // Retail footer — centered logo, links, newsletter, socials
  const retailFooter = `
  <footer style="padding:60px 2rem 30px;background:${retailBg};border-top:1px solid rgba(0,0,0,0.08)">
    <div style="max-width:600px;margin:0 auto;text-align:center">
      <div style="font-family:var(--heading-font);font-size:1.8rem;font-weight:700;color:var(--primary);margin-bottom:1.5rem">${businessName}</div>
      <div style="display:flex;justify-content:center;gap:2rem;margin-bottom:2rem">
        ${content.services.slice(0, 3).map(s => `<a href="#services" style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${retailText};text-decoration:none;letter-spacing:0.12em;text-transform:uppercase">${s.name}</a>`).join('')}
        <a href="#about" style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${retailText};text-decoration:none;letter-spacing:0.12em;text-transform:uppercase">About</a>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${retailText};text-decoration:none;letter-spacing:0.12em;text-transform:uppercase">Contact</a>
      </div>
      <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${retailText};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:1rem">Join Our Newsletter</p>
      <form style="display:flex;max-width:400px;margin:0 auto 2rem;border-radius:999px;overflow:hidden;border:1px solid rgba(0,0,0,0.1)" onsubmit="return false">
        <input type="email" placeholder="Your email..." style="flex:1;font-family:var(--body-font);padding:0.75rem 1.25rem;border:none;background:${retailCardBg};color:${retailText};font-size:0.85rem;outline:none;letter-spacing:0.06em;text-transform:uppercase" />
        <button type="submit" style="font-family:var(--body-font);padding:0.75rem 1.5rem;background:var(--secondary);color:#fff;border:none;font-size:0.75rem;font-weight:700;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase">Sign Up</button>
      </form>
      <div style="padding-top:1.5rem;border-top:1px solid rgba(0,0,0,0.06)">
        <div style="display:flex;justify-content:center;gap:1.5rem;margin-bottom:0.75rem">
          <a href="#" style="font-family:var(--body-font);font-size:0.7rem;color:${retailMuted};text-decoration:none;letter-spacing:0.08em;text-transform:uppercase">Privacy Policy</a>
          <a href="#" style="font-family:var(--body-font);font-size:0.7rem;color:${retailMuted};text-decoration:none;letter-spacing:0.08em;text-transform:uppercase">Terms &amp; Conditions</a>
        </div>
        <p style="font-family:var(--body-font);font-size:0.7rem;color:${retailMuted};letter-spacing:0.06em;text-transform:uppercase">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      </div>
    </div>
  </footer>`

  // Retail uses a custom light palette — override CSS vars
  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')}
  <style>
    :root {
      --bg: ${retailBg};
      --bg-alt: #ebe6e0;
      --card-bg: ${retailCardBg};
      --text: ${retailText};
      --text-muted: ${retailMuted};
      --border: rgba(0,0,0,0.08);
    }
  </style>

${retailNav}

  ${heroSection}
  ${collectionSection}
  ${splitSection}
  ${fullWidthImage}
  ${featureSection}
  ${productCards}
  ${aboutSection}
  ${communitySection}
  ${buildContactSection(content, locationInfo)}

${retailFooter}

</body>
</html>`
}

// ---------- Tech-Digital Template (Plain.com–inspired) ----------
function buildTechDigitalTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
  ]

  // Tech nav — clean, two CTAs (outline + filled)
  const techNavLinks: string[] = []
  if (navFlags.navServices) techNavLinks.push(`<a href="#services" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:0.85rem;font-weight:400">Services</a>`)
  if (navFlags.navAbout) techNavLinks.push(`<a href="#about" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:0.85rem;font-weight:400">About</a>`)
  if (navFlags.navContact) techNavLinks.push(`<a href="#contact" style="color:rgba(255,255,255,0.8);text-decoration:none;font-size:0.85rem;font-weight:400">Contact</a>`)

  const techNav = `
  <nav class="ms-sticky" style="background:var(--primary);position:sticky;top:0;z-index:100">
    <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 2rem">
      <a href="#" style="font-family:var(--heading-font);font-size:1.3rem;font-weight:700;color:#fff;text-decoration:none">${businessName}</a>
      <div style="display:flex;align-items:center;gap:2rem">
        <div class="ms-nav-links" style="display:flex;align-items:center;gap:2rem">
          ${techNavLinks.join('\n          ')}
        </div>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:var(--primary);background:#fff;padding:0.55rem 1.5rem;border-radius:999px;text-decoration:none">${content.ctaPrimary}</a>
      </div>
      ${buildBurgerButton('#fff')}
    </div>
  </nav>
  ${buildMobileMenu(content)}`

  // Section 1: Centered text hero — green accent heading + screenshot below
  const heroSection = `
  <section style="padding:160px 2rem 80px;text-align:center;background:var(--bg)">
    <div style="max-width:800px;margin:0 auto">
      ${content.badge ? `<div style="display:inline-block;font-family:var(--body-font);font-size:0.75rem;padding:0.4rem 1rem;border:1px solid var(--border);border-radius:999px;color:var(--text-muted);margin-bottom:1.5rem;letter-spacing:0.04em">${content.badge}</div>` : ''}
      <h1 style="font-family:var(--heading-font);font-size:clamp(2.8rem,5.5vw,4.2rem);font-weight:700;line-height:1.1;margin-bottom:1.5rem">
        <span style="color:var(--primary)">${content.heroAccent || content.tagline.split(' ').slice(0, 2).join(' ')}</span><br />
        <span style="color:var(--text)">${content.heroAccent ? content.tagline : content.tagline.split(' ').slice(2).join(' ')}</span>
      </h1>
      <p style="font-family:var(--body-font);font-size:1.15rem;color:var(--text-muted);line-height:1.7;max-width:600px;margin:0 auto 2.5rem">${content.heroSubtitle}</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:0.75rem;margin-bottom:4rem">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.75rem 1.5rem;background:var(--primary);color:#fff;border-radius:6px;text-decoration:none;letter-spacing:0.04em;text-transform:uppercase;transition:opacity 0.2s">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.75rem 1.5rem;border:1px solid var(--primary);color:var(--primary);border-radius:6px;text-decoration:none;letter-spacing:0.04em;text-transform:uppercase;transition:background 0.2s">${content.ctaSecondary}</a>
      </div>
    </div>
    <div style="max-width:1000px;margin:0 auto;border-radius:12px;overflow:hidden;border:1px solid var(--border);box-shadow:0 25px 60px rgba(0,0,0,0.5)">
      <img src="${heroImg}" alt="" style="width:100%;height:auto;display:block" />
    </div>
  </section>`

  // Section 2: 3-column feature cards
  const featureCards = `
  <section style="padding:100px 2rem;background:var(--bg)">
    <div class="ms-grid" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
      ${content.services.slice(0, 3).map(s => `
      <div style="background:var(--card-bg);border:1px solid var(--border);border-radius:12px;padding:2.5rem 2rem">
        <div style="font-size:2rem;margin-bottom:1.25rem">${s.icon || '&#9672;'}</div>
        <h3 style="font-family:var(--heading-font);font-size:1.25rem;font-weight:600;color:var(--text);margin-bottom:0.75rem">${s.name}</h3>
        <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.7">${s.description}</p>
      </div>`).join('')}
    </div>
  </section>`

  // Section 3: Logo / trust strip
  const trustStrip = `
  <section style="padding:60px 2rem;background:var(--bg);border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
    <div style="max-width:1100px;margin:0 auto;text-align:center">
      <p style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--text-muted);margin-bottom:2rem;font-weight:600">${content.heroEyebrow}</p>
      <div style="display:flex;justify-content:center;align-items:center;gap:3rem;flex-wrap:wrap">
        ${content.stats.slice(0, 4).map(s => `
        <div style="font-family:var(--heading-font);font-size:1.15rem;font-weight:600;color:var(--text-muted);letter-spacing:0.02em">${s.value} ${s.label}</div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 4: Problem statement — large centered text
  const problemStatement = `
  <section style="padding:120px 2rem;background:var(--bg);text-align:center">
    <div style="max-width:850px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(2.2rem,4.5vw,3.5rem);font-weight:700;color:var(--text);line-height:1.15;margin-bottom:1.5rem">${content.servicesHeading}</h2>
      <p style="font-family:var(--body-font);font-size:1.1rem;color:var(--text-muted);line-height:1.7;max-width:650px;margin:0 auto">${content.aboutMission || content.heroSubtitle}</p>
    </div>
  </section>`

  // Section 5: Alternating feature showcases (badge + heading + text left, image right, then swap)
  const featureShowcases = content.services.length > 0 ? `
  <section id="services" style="padding:60px 2rem 100px;background:var(--bg)">
    <div style="max-width:1100px;margin:0 auto">
      ${content.services.map((s, i) => `
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;margin-bottom:${i < content.services.length - 1 ? '6rem' : '0'}">
        ${i % 2 === 0 ? `
        <div>
          <div style="display:inline-block;font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;padding:0.35rem 0.85rem;border:1px solid var(--border);border-radius:6px;color:var(--text-muted);margin-bottom:1.25rem;font-weight:600">${s.tags[0] || 'Feature'}</div>
          <h3 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:var(--text);line-height:1.15;margin-bottom:1rem">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:1rem;color:var(--text-muted);line-height:1.8;margin-bottom:1.5rem">${s.description}</p>
          <a href="#contact" style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:var(--primary);text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;display:inline-flex;align-items:center;gap:0.5rem">${content.ctaPrimary} <span style="font-size:1.1rem">&rarr;</span></a>
        </div>
        <div style="border-radius:12px;overflow:hidden;border:1px solid var(--border)">
          <img src="${serviceImgs[i % serviceImgs.length]}" alt="" style="width:100%;height:350px;object-fit:cover" />
        </div>` : `
        <div style="border-radius:12px;overflow:hidden;border:1px solid var(--border)">
          <img src="${serviceImgs[i % serviceImgs.length]}" alt="" style="width:100%;height:350px;object-fit:cover" />
        </div>
        <div>
          <div style="display:inline-block;font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;padding:0.35rem 0.85rem;border:1px solid var(--border);border-radius:6px;color:var(--text-muted);margin-bottom:1.25rem;font-weight:600">${s.tags[0] || 'Feature'}</div>
          <h3 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:var(--text);line-height:1.15;margin-bottom:1rem">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:1rem;color:var(--text-muted);line-height:1.8;margin-bottom:1.5rem">${s.description}</p>
          <a href="#contact" style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:var(--primary);text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;display:inline-flex;align-items:center;gap:0.5rem">${content.ctaPrimary} <span style="font-size:1.1rem">&rarr;</span></a>
        </div>`}
      </div>`).join('')}
    </div>
  </section>` : ''

  // Section 6: Dark accent section — "Speed, meet power" style
  const darkAccentSection = `
  <section style="padding:120px 2rem;background:#0a0a0a;border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
    <div style="max-width:1100px;margin:0 auto;text-align:center">
      <h2 style="font-family:var(--heading-font);font-size:clamp(2.2rem,4.5vw,3.5rem);font-weight:700;color:var(--primary);line-height:1.15;margin-bottom:1rem">${content.aboutHeading}</h2>
      <p style="font-family:var(--body-font);font-size:1.1rem;color:rgba(255,255,255,0.65);line-height:1.7;max-width:650px;margin:0 auto">${content.aboutText.split('\n')[0]}</p>
    </div>
  </section>`

  // Section 7: Two-column value props with divider lines (Plain.com "When you need..." pattern)
  const aboutParagraphs = content.aboutText.split('\n').filter(p => p.trim())
  const valueProps = `
  <section id="about" style="padding:100px 2rem;background:var(--bg)">
    <div style="max-width:1000px;margin:0 auto">
      ${content.processSteps ? content.processSteps.map((step, i) => `
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1.2fr;gap:5rem;align-items:start;padding:3rem 0;${i < (content.processSteps?.length || 0) - 1 ? 'border-bottom:1px solid var(--border)' : ''}">
        <div>
          <h3 style="font-family:var(--heading-font);font-size:1.35rem;font-weight:600;color:var(--text);line-height:1.3;margin-bottom:0.75rem">${step.title}</h3>
          <a href="#contact" style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:var(--primary);text-decoration:none;letter-spacing:0.1em;text-transform:uppercase">${content.ctaPrimary} &rarr;</a>
        </div>
        <p style="font-family:var(--body-font);font-size:1rem;color:var(--text-muted);line-height:1.8">${step.description}</p>
      </div>`).join('') : aboutParagraphs.map((p, i) => `
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1.2fr;gap:5rem;align-items:start;padding:3rem 0;${i < aboutParagraphs.length - 1 ? 'border-bottom:1px solid var(--border)' : ''}">
        <div>
          <h3 style="font-family:var(--heading-font);font-size:1.35rem;font-weight:600;color:var(--text);line-height:1.3">${content.stats[i]?.label || 'Our Approach'}</h3>
        </div>
        <p style="font-family:var(--body-font);font-size:1rem;color:var(--text-muted);line-height:1.8">${p}</p>
      </div>`).join('')}
    </div>
  </section>`

  // Section 8: Testimonial card
  const testimonialSection = content.testimonial ? `
  <section style="padding:100px 2rem;background:var(--bg-alt)">
    <div style="max-width:1100px;margin:0 auto">
      <p style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--text-muted);margin-bottom:1.5rem;font-weight:600;text-align:center">What our clients say</p>
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:700;color:var(--text);text-align:center;margin-bottom:3rem">Take their word for it</h2>
      <div class="ms-grid" style="max-width:800px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;border-radius:12px;overflow:hidden;border:1px solid var(--border)">
        <div style="background:var(--card-bg);padding:3rem;display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="font-size:1.5rem;color:var(--primary);margin-bottom:1.5rem">&#10077;&#10077;</div>
            <p style="font-family:var(--body-font);font-size:1.05rem;color:var(--text-muted);line-height:1.7;font-style:italic">${content.testimonial.quote}</p>
          </div>
          <div style="margin-top:2rem;display:flex;align-items:center;gap:0.75rem">
            <div style="width:40px;height:40px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--body-font);font-size:0.85rem;font-weight:600">${content.testimonial.author.charAt(0)}</div>
            <div>
              <div style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;color:var(--text)">${content.testimonial.author}</div>
              ${content.testimonial.rating ? `<div style="color:#f59e0b;font-size:0.75rem">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
            </div>
          </div>
        </div>
        <div style="overflow:hidden">
          <img src="${serviceImgs[2] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
      </div>
    </div>
  </section>` : ''

  // Section 9: Stats row
  const statsSection = `
  <section style="padding:80px 2rem;background:var(--bg);border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
    <div class="ms-grid" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(${Math.min(content.stats.length, 4)},1fr);gap:2rem;text-align:center">
      ${content.stats.slice(0, 4).map(s => `
      <div>
        <div style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:var(--primary);margin-bottom:0.5rem">${s.value}</div>
        <div style="font-family:var(--body-font);font-size:0.85rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;font-weight:500">${s.label}</div>
        ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.75rem;color:var(--text-muted);opacity:0.7;margin-top:0.25rem">${s.sublabel}</div>` : ''}
      </div>`).join('')}
    </div>
  </section>`

  // Section 10: Final CTA
  const finalCta = `
  <section style="padding:120px 2rem;background:var(--bg);text-align:center">
    <div style="max-width:700px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:var(--text);line-height:1.15;margin-bottom:2rem">${content.contactHeading}</h2>
      <div style="display:flex;align-items:center;justify-content:center;gap:0.75rem">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.85rem 2rem;background:var(--primary);color:#fff;border-radius:6px;text-decoration:none;letter-spacing:0.04em;text-transform:uppercase">${content.ctaPrimary}</a>
        <a href="#about" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.85rem 2rem;border:1px solid var(--primary);color:var(--primary);border-radius:6px;text-decoration:none;letter-spacing:0.04em;text-transform:uppercase">${content.ctaSecondary}</a>
      </div>
    </div>
  </section>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark')}

${techNav}

  ${heroSection}
  ${featureCards}
  ${trustStrip}
  ${problemStatement}
  ${featureShowcases}
  ${darkAccentSection}
  ${valueProps}
  ${testimonialSection}
  ${statsSection}
  ${buildContactSection(content, locationInfo)}
  ${finalCta}

${buildFooter(businessName, content, 'dark')}

</body>
</html>`
}

// ---------- POST handler ----------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { businessName, businessType, businessCategory, pages, primaryColor, secondaryColor, noColors, images, country } = body
    const locationInfo = getLocationInfo(country || '')

    if (!businessName || !businessType) {
      return NextResponse.json(
        { success: false, error: 'businessName and businessType are required' },
        { status: 400 },
      )
    }

    // Ensure primary color has enough contrast for buttons on dark backgrounds
    const rawPrimary = noColors ? '#2563EB' : (primaryColor || '#6C5CE7')
    const pR = parseInt(rawPrimary.slice(1, 3), 16) || 0
    const pG = parseInt(rawPrimary.slice(3, 5), 16) || 0
    const pB = parseInt(rawPrimary.slice(5, 7), 16) || 0
    const luminance = (0.299 * pR + 0.587 * pG + 0.114 * pB) / 255
    // If color is too light (near white), fall back to a visible accent
    const primary = luminance > 0.85 ? '#6C5CE7' : rawPrimary
    const secondary = noColors ? '#10B981' : (secondaryColor || '#00CEC9')
    const category: BusinessCategory = businessCategory || 'other'
    const variant = categoryVariant[category] || 'service'

    // Check for pre-written content first
    const preset: PresetContent | undefined = presetContent[businessType]

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
      businessName,
      businessCategory: category,
      primaryColor: primary,
      secondaryColor: secondary,
      pages: pages || ['Home', 'About', 'Services', 'Contact'],
      images: Array.isArray(images) ? images : [],
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
