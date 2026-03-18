import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
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

async function fetchPexelsImage(query: string, apiKey: string, orientation: string = 'landscape'): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3&orientation=${orientation}`,
      { headers: { Authorization: apiKey } },
    )
    const data = await res.json()
    const photo = data.photos?.[0]
    return photo?.src?.landscape || photo?.src?.large2x || photo?.src?.large || null
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

  // If we have specific queries from preset content, use them for targeted results
  if (queries?.heroImageQuery || queries?.serviceImageQueries?.length || queries?.galleryImageQueries?.length) {
    const allFetches: Promise<string | null>[] = []

    // Hero image (prefer heroBgImageQuery for service variants — moody/dark background shots)
    allFetches.push(fetchPexelsImage(queries.heroBgImageQuery || queries.heroImageQuery || typeName, apiKey))

    // Service images (up to 3)
    const svcQueries = queries.serviceImageQueries || []
    for (let i = 0; i < 3; i++) {
      allFetches.push(fetchPexelsImage(svcQueries[i] || typeName, apiKey))
    }

    // Gallery images (up to 4)
    const galQueries = queries.galleryImageQueries || []
    for (let i = 0; i < 4; i++) {
      allFetches.push(fetchPexelsImage(galQueries[i] || typeName, apiKey))
    }

    const results = await Promise.all(allFetches)
    const fallback = (i: number, seed: string) => results[i] || `https://picsum.photos/seed/${seed}/600/400`

    return {
      hero: fallback(0, `${typeName}-hero`),
      cards: [
        fallback(1, `${typeName}-svc0`),
        fallback(2, `${typeName}-svc1`),
        fallback(3, `${typeName}-svc2`),
        fallback(4, `${typeName}-gal0`),
        fallback(5, `${typeName}-gal1`),
        fallback(6, `${typeName}-gal2`),
        fallback(7, `${typeName}-gal3`),
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

  const heroUrl = photos[0]?.src?.landscape || photos[0]?.src?.large2x || `https://picsum.photos/seed/${typeName}-hero/1200/600`

  const cardUrls: string[] = []
  for (let i = 1; i < photos.length && cardUrls.length < 7; i++) {
    cardUrls.push(photos[i].src?.medium || photos[i].src?.large)
  }
  while (cardUrls.length < 7) {
    cardUrls.push(`https://picsum.photos/seed/${typeName}-card${cardUrls.length}/600/400`)
  }

  const avatarUrl = photos[1]?.src?.tiny || `https://picsum.photos/seed/${typeName}-avatar/200/200`

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

function buildContentPrompt(data: {
  businessName: string
  businessType: string
  businessCategory: BusinessCategory
  pages: string[]
  variant: TemplateVariant
}): string {
  const { businessName, businessType, businessCategory, pages, variant } = data
  const preset = categoryPresets[businessCategory] || categoryPresets['other']

  let variantFields = ''
  if (variant === 'service') {
    variantFields = `
  "processSteps": [
    { "step": "1", "title": "Step title, 2-4 words", "description": "What happens in this step, 8-12 words" },
    { "step": "2", "title": "Step title, 2-4 words", "description": "What happens in this step, 8-12 words" },
    { "step": "3", "title": "Step title, 2-4 words", "description": "What happens in this step, 8-12 words" }
  ],`
  } else if (variant === 'portfolio') {
    variantFields = `
  "projectCaptions": ["Caption for project 1, 3-5 words", "Caption for project 2, 3-5 words", "Caption for project 3, 3-5 words", "Caption for project 4, 3-5 words"],`
  }

  let variantHint = ''
  if (variant === 'service') {
    variantHint = '\nThis is a SERVICE business — no photos will be shown on cards. Services should focus on outcomes and value, not visual descriptions.'
  } else if (variant === 'portfolio') {
    variantHint = '\nThis is a PORTFOLIO/VISUAL business — the layout will be gallery-focused. Keep service descriptions minimal and punchy.'
  }

  return `Generate JSON content for a ${businessType} called "${businessName}".
Tone: ${preset.tone}
CTA text: "${preset.ctaText}"
Pages the user selected: ${pages.join(', ')}${variantHint}

Return ONLY valid JSON (no markdown, no backticks, no explanation). Start with { and end with }.
{
  "heroEyebrow": "Short uppercase label, 3-5 words, e.g. 'Premium ${businessType} Experience'",
  "tagline": "Compelling headline, 6-10 words. Use <em> on one word for italic accent.",
  "heroSubtitle": "One sentence, 10-18 words, expanding on the tagline",
  "ctaPrimary": "${preset.ctaText}",
  "ctaSecondary": "Secondary CTA text, 2-3 words like 'Our Portfolio' or 'Learn More'",
  "servicesHeading": "Section heading for the services area, 2-4 words",
  "services": [
    { "name": "Service name relevant to a ${businessType}", "description": "One sentence, 10-15 words", "tags": ["Tag1", "Tag2"] },
    { "name": "Service name relevant to a ${businessType}", "description": "One sentence, 10-15 words", "tags": ["Tag1", "Tag2"] },
    { "name": "Service name relevant to a ${businessType}", "description": "One sentence, 10-15 words", "tags": ["Tag1", "Tag2"] }
  ],${variantFields}
  "galleryHeading": "Short gallery section heading, 2-4 words",
  "aboutHeading": "About section heading with <em> on one word for italic accent, 4-8 words",
  "aboutText": "Two short paragraphs about the business separated by \\n\\n. Total 40-60 words.",
  "stats": [
    { "value": "15+", "label": "Years Experience" },
    { "value": "500+", "label": "Relevant metric for a ${businessType}" },
    { "value": "50+", "label": "Another relevant metric" },
    { "value": "98%", "label": "Client Satisfaction" }
  ],
  "contactHeading": "Contact section heading as a question, 5-8 words"
}

Make all content specific and authentic for a ${businessType}. No generic placeholder text.`
}

// ---------- Shared template helpers ----------

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
}

// Determines which extra nav links to show (selected pages beyond Home).
// All sections always render on the home page regardless.
function resolveNavLinks(pages: string[]) {
  const lowerPages = pages.map(p => p.toLowerCase())
  return {
    navServices: lowerPages.some(p => ['services', 'menu', 'treatments', 'classes', 'courses', 'products'].some(k => p.includes(k))),
    navGallery: lowerPages.some(p => ['gallery', 'portfolio', 'work', 'projects'].some(k => p.includes(k))),
    navAbout: lowerPages.some(p => p.includes('about')),
    navContact: lowerPages.some(p => ['contact', 'booking', 'appointment'].some(k => p.includes(k))),
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
    em { font-style: italic; }`
}

function buildNav(businessName: string, content: GeneratedContent, navFlags: ReturnType<typeof resolveNavLinks>): string {
  // Nav links — only pages the user selected show here
  const navLinks: string[] = []
  if (navFlags.navServices) navLinks.push('<a href="#services" style="color:rgba(255,255,255,0.75);text-decoration:none;font-size:0.85rem;letter-spacing:0.08em;text-transform:uppercase;transition:color 0.2s">Services</a>')
  if (navFlags.navGallery) navLinks.push('<a href="#gallery" style="color:rgba(255,255,255,0.75);text-decoration:none;font-size:0.85rem;letter-spacing:0.08em;text-transform:uppercase;transition:color 0.2s">Gallery</a>')
  if (navFlags.navAbout) navLinks.push('<a href="#about" style="color:rgba(255,255,255,0.75);text-decoration:none;font-size:0.85rem;letter-spacing:0.08em;text-transform:uppercase;transition:color 0.2s">About</a>')
  if (navFlags.navContact) navLinks.push('<a href="#contact" style="color:rgba(255,255,255,0.75);text-decoration:none;font-size:0.85rem;letter-spacing:0.08em;text-transform:uppercase;transition:color 0.2s">Contact</a>')

  return `
  <nav style="position:absolute;top:0;left:0;right:0;z-index:100;padding:0 2rem">
    <div style="max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:72px">
      <a href="#" style="font-family:var(--heading-font);font-size:1.6rem;font-weight:800;color:#fff;text-decoration:none;letter-spacing:0.12em;text-transform:uppercase">${businessName}</a>
      <div style="display:flex;align-items:center;gap:2rem">
        ${navLinks.join('\n        ')}
        <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.6rem 1.5rem;background:var(--primary);color:#fff;border-radius:999px;text-decoration:none;letter-spacing:0.04em;transition:opacity 0.2s">${content.ctaPrimary}</a>
      </div>
    </div>
  </nav>`
}

function buildFooter(businessName: string, content: GeneratedContent, theme: Theme = 'dark'): string {
  const serviceLinks = content.services.map(s =>
    `<a href="#services" style="color:var(--text-muted);text-decoration:none;font-size:0.85rem;transition:color 0.2s;display:block;margin-bottom:0.6rem">${s.name}</a>`
  ).join('\n            ')

  return `
  <footer style="padding:4rem 2rem 2rem;background:${theme === 'light' ? '#f0f0f0' : '#0a0a0a'};border-top:1px solid var(--border)">
    <div style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem">
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

  const testimonialHtml = content.testimonial ? `
          <div style="margin-top:2rem;padding:1.5rem;background:var(--card-bg);border-radius:12px;border:1px solid var(--border)">
            <div style="font-family:var(--body-font);font-size:0.95rem;color:var(--text);line-height:1.7;font-style:italic;margin-bottom:0.75rem">"${content.testimonial.quote}"</div>
            <div style="display:flex;align-items:center;gap:0.5rem">
              <div style="font-family:var(--body-font);font-size:0.85rem;color:var(--text-muted);font-weight:500">${content.testimonial.author}</div>
              ${content.testimonial.rating ? `<div style="color:#f59e0b;font-size:0.8rem">${'★'.repeat(content.testimonial.rating)}</div>` : ''}
            </div>
          </div>` : ''

  return `
    <section id="about" style="padding:100px 0;background:var(--bg-alt)">
      <div style="max-width:1100px;margin:0 auto;padding:0 2rem;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start">
        <div>
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);line-height:1.2;margin:0 0 2rem 0">${content.aboutHeading}</h2>
          ${content.aboutMission ? `<p style="font-family:var(--body-font);font-size:1.15rem;color:var(--text);line-height:1.6;font-style:italic;font-weight:600;margin:0 0 2rem 0">${content.aboutMission}</p>` : ''}
          ${aboutParagraphs.map(p => `<p style="font-family:var(--body-font);font-size:1rem;color:var(--text-muted);line-height:1.8;margin:0 0 1rem 0">${p}</p>`).join('')}
        </div>
        <div>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;padding-top:1rem">
            ${content.stats.slice(0, 4).map(s => `
              <div>
                <div style="font-family:var(--heading-font);font-size:2rem;font-weight:700;color:var(--text)">${s.value}</div>
                <div style="font-family:var(--body-font);font-size:0.85rem;color:var(--text-muted)">${s.label}</div>
                ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.75rem;color:var(--text-muted);opacity:0.7;margin-top:0.15rem">${s.sublabel}</div>` : ''}
              </div>
            `).join('')}
          </div>${testimonialHtml}
        </div>
      </div>
    </section>`
}

function buildContactSection(content: GeneratedContent): string {
  const hasHours = !!content.contactHours

  if (!hasHours) {
    // Simple centered layout (no hours info)
    return `
    <section id="contact" style="padding:100px 0;background:var(--bg)">
      <div style="max-width:600px;margin:0 auto;padding:0 2rem;text-align:center">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,2.5rem);font-weight:400;color:var(--text);margin-bottom:3rem;line-height:1.2">${content.contactHeading}</h2>
        <form style="display:flex;flex-direction:column;gap:1.25rem" onsubmit="return false">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
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
        <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:start">
          <div>
            <div style="margin-bottom:2rem">
              <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text);font-weight:600;margin-bottom:0.75rem">Address</div>
              <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.7">123 Main Road, Cape Town, 8001</p>
            </div>
            <div style="margin-bottom:2rem">
              <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text);font-weight:600;margin-bottom:0.75rem">Get in Touch</div>
              <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.7">hello@yourbusiness.co.za<br />021 000 0000</p>
            </div>
            <div>
              <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text);font-weight:600;margin-bottom:0.75rem">Trading Hours</div>
              <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.7">${content.contactHours?.replace(/ · /g, '<br />') ?? ''}</p>
            </div>
          </div>
          <form style="display:flex;flex-direction:column;gap:1.25rem" onsubmit="return false">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
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
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages } = data
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
        <div style="display:grid;grid-template-columns:55% 45%;gap:3rem;align-items:start">
          <!-- Left: featured image -->
          <div style="overflow:hidden;border-radius:16px;height:520px">
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
        <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:1.5rem;grid-template-rows:auto auto">
          <div style="grid-row:1/3;border-radius:16px;overflow:hidden;min-height:400px">
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

${buildNav(businessName, content, navFlags)}

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
  ${buildContactSection(content)}

${buildFooter(businessName, content)}

</body>
</html>`
}

// ---------- Service Template (icon cards, process section) ----------
// Light theme for most service businesses; dark for tech-digital
function buildServiceTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages } = data
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
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem">
          ${content.services.map((s, i) => `
            <div style="${serviceCardStyle}">
              <div style="width:64px;height:64px;border-radius:50%;background:rgba(${pr},${pg},${pb},0.1);display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem">
                <span style="font-size:1.6rem;color:var(--primary)">${s.icon ? (iconMap[s.icon] || defaultServiceIcons[i] || defaultServiceIcons[0]) : (defaultServiceIcons[i] || defaultServiceIcons[0])}</span>
              </div>
              <h3 style="font-family:var(--heading-font);font-size:1.25rem;font-weight:600;color:var(--text);margin:0 0 0.75rem 0">${s.name}</h3>
              <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.7;margin:0">${s.description}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>`

  // "How It Works" process section instead of gallery
  const steps = content.processSteps || [
    { step: '1', title: 'Get in Touch', description: 'Reach out and tell us what you need' },
    { step: '2', title: 'We Plan', description: 'We create a tailored approach for your project' },
    { step: '3', title: 'We Deliver', description: 'Professional execution with quality guaranteed' },
  ]

  const processSection = `
    <section id="gallery" style="padding:100px 0;background:var(--bg)">
      <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);margin-bottom:1rem;text-align:center;line-height:1.2">How It Works</h2>
        <p style="font-family:var(--body-font);font-size:1rem;color:var(--text-muted);text-align:center;margin-bottom:4rem;max-width:500px;margin-left:auto;margin-right:auto">A simple, straightforward process designed around you.</p>
        <!-- Icons -->
        <div style="display:flex;justify-content:space-around;align-items:center;position:relative;margin-bottom:0">
          ${steps.map(s => `
            <div style="display:flex;flex-direction:column;align-items:center;flex:1">
              <div style="width:110px;height:110px;border-radius:50%;background:rgba(${pr},${pg},${pb},0.06);border:2px solid rgba(${pr},${pg},${pb},0.12);display:flex;align-items:center;justify-content:center;position:relative;z-index:2">
                <span style="font-family:var(--heading-font);font-size:2.25rem;font-weight:700;color:var(--primary)">${s.step}</span>
              </div>
            </div>`).join('')}
        </div>
        <!-- Connector line with dots -->
        <div style="position:relative;height:28px;margin:0">
          <div style="position:absolute;top:12px;left:calc(100% / 6);right:calc(100% / 6);height:3px;background:rgba(${pr},${pg},${pb},0.2);z-index:1"></div>
          <div style="position:relative;display:flex;justify-content:space-around;z-index:2">
            ${steps.map(() => `
              <div style="flex:1;display:flex;justify-content:center">
                <div style="width:14px;height:14px;border-radius:50%;background:var(--primary);margin-top:6px"></div>
              </div>`).join('')}
          </div>
        </div>
        <!-- Text -->
        <div style="display:flex;justify-content:space-around;margin-top:1.5rem">
          ${steps.map(s => `
            <div style="flex:1;padding:0 2rem;text-align:center">
              <h3 style="font-family:var(--heading-font);font-size:1.2rem;font-weight:700;color:var(--text);margin:0 0 0.75rem 0">${s.title}</h3>
              <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.7;margin:0">${s.description}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, theme)}

${buildNav(businessName, content, navFlags)}

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
  ${buildContactSection(content)}

${buildFooter(businessName, content, theme)}

</body>
</html>`
}

// ---------- Portfolio Template (gallery-focused) ----------
function buildPortfolioTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages } = data
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
        <div style="display:grid;grid-template-columns:55% 45%;gap:3rem;align-items:start">
          <!-- Left: service image -->
          <div style="position:sticky;top:2rem">
            <div style="overflow:hidden;height:560px">
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
        <div style="display:grid;grid-template-columns:65% 35%;height:400px;gap:2px">
          <div class="pf-cell">
            <img src="${galleryImgs[0]}" alt="${captions[0] || 'Project'}" />
            <div class="pf-cap"><span>${captions[0] || 'Project'}</span></div>
          </div>
          <div class="pf-cell">
            <img src="${galleryImgs[1]}" alt="${captions[1] || 'Project'}" />
            <div class="pf-cap"><span>${captions[1] || 'Project'}</span></div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:40% 60%;height:340px;gap:2px;margin-top:2px">
          <div class="pf-cell">
            <img src="${galleryImgs[2]}" alt="${captions[2] || 'Project'}" />
            <div class="pf-cap"><span>${captions[2] || 'Project'}</span></div>
          </div>
          <div class="pf-cell">
            <img src="${galleryImgs[3]}" alt="${captions[3] || 'Project'}" />
            <div class="pf-cap"><span>${captions[3] || 'Project'}</span></div>
          </div>
        </div>
      </div>
    </section>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor)}

${buildNav(businessName, content, navFlags)}

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
  ${buildContactSection(content)}

${buildFooter(businessName, content)}

</body>
</html>`
}

// ---------- Property Template (505 State Street–inspired) ----------
function buildPropertyTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages } = data
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

  // Property nav uses pill buttons instead of plain links
  const propNavLinks: string[] = []
  if (navFlags.navServices) propNavLinks.push(`<a href="#services" style="font-family:var(--body-font);font-size:0.85rem;font-weight:500;padding:0.5rem 1.25rem;border:1px solid rgba(255,255,255,0.35);border-radius:999px;color:#fff;text-decoration:none;transition:all 0.2s">Services</a>`)
  if (navFlags.navGallery) propNavLinks.push(`<a href="#gallery" style="font-family:var(--body-font);font-size:0.85rem;font-weight:500;padding:0.5rem 1.25rem;border:1px solid rgba(255,255,255,0.35);border-radius:999px;color:#fff;text-decoration:none;transition:all 0.2s">Gallery</a>`)
  if (navFlags.navAbout) propNavLinks.push(`<a href="#about" style="font-family:var(--body-font);font-size:0.85rem;font-weight:500;padding:0.5rem 1.25rem;border:1px solid rgba(255,255,255,0.35);border-radius:999px;color:#fff;text-decoration:none;transition:all 0.2s">About</a>`)

  const propNav = `
  <nav style="position:absolute;top:0;left:0;right:0;z-index:100;padding:0 2rem">
    <div style="max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:72px">
      <a href="#" style="font-family:var(--heading-font);font-size:1.6rem;font-weight:700;color:#fff;text-decoration:none;letter-spacing:0.04em">${businessName}</a>
      <div style="display:flex;align-items:center;gap:0.75rem">
        ${propNavLinks.join('\n        ')}
        <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.5rem 1.25rem;background:#fff;color:#111;border-radius:999px;text-decoration:none;transition:opacity 0.2s">${content.ctaPrimary}</a>
      </div>
    </div>
  </nav>`

  // Section 1: Full-bleed hero with headline overlay
  const heroSection = `
  <section style="position:relative;min-height:100vh;display:flex;align-items:flex-end;overflow:hidden">
    <div style="position:absolute;inset:0">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.5) 70%,rgba(0,0,0,0.7) 100%)"></div>
    </div>
    <div style="position:relative;max-width:1100px;margin:0 auto;padding:0 2rem 6rem;width:100%">
      <h1 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5.5vw,4.5rem);font-weight:400;color:#fff;line-height:1.1;margin-bottom:1.25rem;max-width:700px">${content.tagline}</h1>
      <p style="font-family:var(--body-font);font-size:1.1rem;color:rgba(255,255,255,0.75);max-width:500px;line-height:1.7;margin-bottom:2rem">${content.heroSubtitle}</p>
      <a href="#contact" style="font-family:var(--body-font);font-size:0.9rem;font-weight:500;padding:0.85rem 2rem;background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.5);border-radius:999px;text-decoration:none;transition:all 0.2s;display:inline-block">${content.ctaPrimary}</a>
    </div>
  </section>`

  // Section 2: Full-width atmospheric photo
  const atmosphericPhoto = `
  <section style="height:70vh;overflow:hidden">
    <img src="${galleryImgs[0]}" alt="" style="width:100%;height:100%;object-fit:cover" />
  </section>`

  // Section 3: Large statement text
  const statementText = content.aboutMission || content.heroSubtitle
  const statementSection = `
  <section style="padding:100px 2rem;background:var(--bg)">
    <div style="max-width:1100px;margin:0 auto">
      <p style="font-family:var(--heading-font);font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:400;color:var(--text);line-height:1.35;max-width:900px">${statementText}</p>
    </div>
  </section>`

  // Section 4: Services — 60/40 split (photo left, text right)
  const featuresSection = `
  <section id="services" style="padding:100px 0;background:var(--bg)">
    <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
      <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:4rem;align-items:start;margin-bottom:5rem">
        <div style="overflow:hidden;border-radius:0;height:600px">
          <img src="${serviceImgs[0]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div style="padding-top:2rem">
          <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--primary);margin-bottom:1rem;font-weight:600">${content.heroEyebrow}</p>
          <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:400;color:var(--text);line-height:1.2;margin-bottom:1.5rem">${content.servicesHeading}</h2>
          <p style="font-family:var(--body-font);font-size:1rem;color:var(--text-muted);line-height:1.8;margin-bottom:2rem">${content.services[0]?.description || ''}</p>
          <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:500;padding:0.75rem 1.75rem;background:var(--text);color:var(--bg);border-radius:999px;text-decoration:none;display:inline-block;transition:opacity 0.2s">More Details</a>
        </div>
      </div>
      ${content.services.slice(1).map((s, i) => `
      <div style="display:grid;grid-template-columns:${i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr'};gap:4rem;align-items:start;margin-bottom:${i < content.services.length - 2 ? '5rem' : '0'}">
        ${i % 2 === 0 ? `
        <div style="padding-top:2rem">
          <h3 style="font-family:var(--heading-font);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:400;color:var(--text);line-height:1.2;margin-bottom:1rem">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:1rem;color:var(--text-muted);line-height:1.8;margin-bottom:1.5rem">${s.description}</p>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
            ${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.75rem;padding:0.35rem 0.85rem;border-radius:999px;border:1px solid var(--border);color:var(--text-muted)">${t}</span>`).join('')}
          </div>
        </div>
        <div style="overflow:hidden;height:450px">
          <img src="${serviceImgs[(i + 1) % serviceImgs.length]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>` : `
        <div style="overflow:hidden;height:450px">
          <img src="${serviceImgs[(i + 1) % serviceImgs.length]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div style="padding-top:2rem">
          <h3 style="font-family:var(--heading-font);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:400;color:var(--text);line-height:1.2;margin-bottom:1rem">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:1rem;color:var(--text-muted);line-height:1.8;margin-bottom:1.5rem">${s.description}</p>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
            ${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.75rem;padding:0.35rem 0.85rem;border-radius:999px;border:1px solid var(--border);color:var(--text-muted)">${t}</span>`).join('')}
          </div>
        </div>`}
      </div>`).join('')}
    </div>
  </section>`

  // Section 5: Lifestyle statement image with text overlay
  const lifestyleSection = `
  <section style="position:relative;height:80vh;display:flex;align-items:center;justify-content:center;overflow:hidden">
    <div style="position:absolute;inset:0">
      <img src="${serviceImgs[1]}" alt="" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:rgba(0,0,0,0.35)"></div>
    </div>
    <div style="position:relative;text-align:center;max-width:900px;padding:0 2rem">
      <h2 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5vw,4rem);font-weight:400;color:#fff;line-height:1.15">${content.aboutHeading}</h2>
    </div>
  </section>`

  // Section 6: Stats row
  const statsSection = `
  <section style="padding:80px 2rem;background:var(--bg-alt);border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
    <div style="max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center">
      ${content.stats.slice(0, 4).map(s => `
        <div style="text-align:center;flex:1">
          <div style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:var(--text);margin-bottom:0.5rem">${s.value}</div>
          <div style="font-family:var(--body-font);font-size:0.85rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em">${s.label}</div>
          ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.75rem;color:var(--text-muted);opacity:0.7;margin-top:0.25rem">${s.sublabel}</div>` : ''}
        </div>`).join('')}
    </div>
  </section>`

  // Section 7: Gallery — photo grid (asymmetric, 505-style)
  const gallerySection = `
  <section id="gallery" style="padding:100px 0;background:var(--bg)">
    <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
      <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);margin-bottom:3rem;line-height:1.2">${content.galleryHeading}</h2>
      <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:1rem;margin-bottom:1rem">
        <div style="overflow:hidden;height:420px">
          <img src="${galleryImgs[1]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div style="overflow:hidden;height:420px">
          <img src="${galleryImgs[2]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1.4fr;gap:1rem">
        <div style="overflow:hidden;height:350px">
          <img src="${galleryImgs[3]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div style="overflow:hidden;height:350px">
          <img src="${serviceImgs[2]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
      </div>
    </div>
  </section>`

  // Section 8: About — text left, testimonial right
  const aboutParagraphs = content.aboutText.split('\n').filter(p => p.trim())
  const testimonialHtml = content.testimonial ? `
    <div style="margin-top:2.5rem;padding:2rem;background:var(--card-bg);border-left:3px solid var(--primary)">
      <p style="font-family:var(--body-font);font-size:1rem;color:var(--text);line-height:1.7;font-style:italic;margin-bottom:0.75rem">"${content.testimonial.quote}"</p>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <span style="font-family:var(--body-font);font-size:0.85rem;color:var(--text-muted);font-weight:500">${content.testimonial.author}</span>
        ${content.testimonial.rating ? `<span style="color:#f59e0b;font-size:0.8rem">${'★'.repeat(content.testimonial.rating)}</span>` : ''}
      </div>
    </div>` : ''

  const aboutSection = `
  <section id="about" style="padding:100px 0;background:var(--bg-alt)">
    <div style="max-width:1100px;margin:0 auto;padding:0 2rem;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start">
      <div>
        <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--primary);margin-bottom:1rem;font-weight:600">About</p>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,2.8rem);font-weight:400;color:var(--text);line-height:1.2;margin-bottom:2rem">${content.aboutHeading}</h2>
        ${aboutParagraphs.map(p => `<p style="font-family:var(--body-font);font-size:1rem;color:var(--text-muted);line-height:1.8;margin-bottom:1rem">${p}</p>`).join('')}
      </div>
      <div>
        <div style="overflow:hidden;height:400px;margin-bottom:0">
          <img src="${serviceImgs[2]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>${testimonialHtml}
      </div>
    </div>
  </section>`

  // Property footer — giant brand name style
  const propFooter = `
  <footer style="padding:5rem 2rem 2rem;background:#0a0a0a;border-top:1px solid var(--border)">
    <div style="max-width:1100px;margin:0 auto">
      <div style="font-family:var(--heading-font);font-size:clamp(3rem,8vw,7rem);font-weight:700;color:var(--text);line-height:1;margin-bottom:3rem;letter-spacing:-0.02em">${businessName}</div>
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;padding-top:2rem;border-top:1px solid var(--border)">
        <div>
          <p style="font-family:var(--body-font);font-size:0.85rem;color:var(--text-muted);line-height:1.6;max-width:280px">${content.heroSubtitle}</p>
        </div>
        <div>
          <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text);margin-bottom:1rem;font-weight:600">Services</div>
          ${content.services.map(s => `<a href="#services" style="color:var(--text-muted);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.6rem">${s.name}</a>`).join('')}
        </div>
        <div>
          <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text);margin-bottom:1rem;font-weight:600">Company</div>
          <a href="#about" style="color:var(--text-muted);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.6rem">About Us</a>
          <a href="#gallery" style="color:var(--text-muted);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.6rem">Gallery</a>
          <a href="#contact" style="color:var(--text-muted);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.6rem">Contact</a>
        </div>
        <div>
          <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text);margin-bottom:1rem;font-weight:600">Legal</div>
          <a href="#" style="color:var(--text-muted);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.6rem">Privacy Policy</a>
          <a href="#" style="color:var(--text-muted);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.6rem">Terms of Service</a>
        </div>
      </div>
      <div style="margin-top:2rem;padding-top:2rem;border-top:1px solid var(--border);text-align:center">
        <div style="font-family:var(--body-font);font-size:0.8rem;color:var(--text-muted)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</div>
      </div>
    </div>
  </footer>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor)}

${propNav}

  ${heroSection}
  ${atmosphericPhoto}
  ${statementSection}
  ${featuresSection}
  ${lifestyleSection}
  ${statsSection}
  ${gallerySection}
  ${aboutSection}
  ${buildContactSection(content)}

${propFooter}

</body>
</html>`
}

// ---------- Health-Wellness Template (ivee–inspired) ----------
function buildHealthWellnessTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages } = data
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

  const hwBg = '#ffffff'
  const hwAlt = '#e8f0f4'
  const hwText = '#1a3a4a'
  const hwMuted = '#5a7280'
  const hwGreen = '#5a7a5a'
  const hwCoral = '#e8734a'

  // Nav — logo left, links center, two CTAs right
  const hwNavLinks: string[] = []
  if (navFlags.navServices) hwNavLinks.push(`<a href="#services" style="font-family:var(--body-font);font-size:0.8rem;color:${hwText};text-decoration:none;font-weight:500;letter-spacing:0.08em;text-transform:uppercase">Services</a>`)
  if (navFlags.navAbout) hwNavLinks.push(`<a href="#about" style="font-family:var(--body-font);font-size:0.8rem;color:${hwText};text-decoration:none;font-weight:500;letter-spacing:0.08em;text-transform:uppercase">About</a>`)
  if (navFlags.navContact) hwNavLinks.push(`<a href="#contact" style="font-family:var(--body-font);font-size:0.8rem;color:${hwText};text-decoration:none;font-weight:500;letter-spacing:0.08em;text-transform:uppercase">Contact</a>`)

  const hwNav = `
  <nav style="background:${hwBg};position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(0,0,0,0.06)">
    <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:68px;padding:0 2rem">
      <a href="#" style="font-family:var(--heading-font);font-size:1.4rem;font-weight:700;color:${hwText};text-decoration:none">${businessName}</a>
      <div style="display:flex;align-items:center;gap:2rem">
        ${hwNavLinks.join('\n        ')}
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;padding:0.6rem 1.25rem;background:${hwCoral};color:#fff;border-radius:6px;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase">${content.ctaPrimary}</a>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;padding:0.6rem 1.25rem;border:1px solid ${hwText};color:${hwText};border-radius:6px;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase">${content.ctaSecondary || 'Call Us'}</a>
      </div>
    </div>
  </nav>`

  // Section 1: Split hero — photo left, heading + CTA right
  const heroSection = `
  <section style="display:grid;grid-template-columns:1fr 1fr;min-height:80vh;background:${hwAlt}">
    <div style="overflow:hidden">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
    </div>
    <div style="display:flex;flex-direction:column;justify-content:center;padding:4rem 3rem">
      <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${hwGreen};letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem">${content.heroEyebrow}</p>
      <h1 style="font-family:var(--heading-font);font-size:clamp(2.2rem,3.5vw,3.2rem);font-weight:400;color:${hwText};line-height:1.2;margin-bottom:1.25rem">${content.tagline}</h1>
      <p style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:${hwText};letter-spacing:0.08em;text-transform:uppercase;margin-bottom:2rem;line-height:1.7">${content.heroSubtitle}</p>
      <a href="#contact" style="display:block;text-align:center;max-width:350px;font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:1rem 2rem;background:${hwCoral};color:#fff;border-radius:6px;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase">${content.ctaPrimary}</a>
    </div>
  </section>`

  // Section 2: Stats row — large serif numbers
  const statsSection = `
  <section style="padding:80px 2rem;background:${hwBg}">
    <div style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(${Math.min(content.stats.length, 4)},1fr);gap:2rem;text-align:center">
      ${content.stats.slice(0, 4).map(s => `
      <div>
        <div style="font-family:var(--heading-font);font-size:clamp(2.5rem,5vw,4rem);font-weight:400;color:${hwText};line-height:1;margin-bottom:0.5rem">${s.value}</div>
        <div style="font-family:var(--body-font);font-size:0.75rem;color:${hwMuted};letter-spacing:0.12em;text-transform:uppercase;font-weight:500">${s.label}</div>
      </div>`).join('')}
    </div>
  </section>`

  // Section 3: Centered statement — green label + serif heading + paragraph
  const statementSection = `
  <section style="padding:80px 2rem;background:${hwBg};text-align:center">
    <div style="max-width:750px;margin:0 auto">
      <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${hwGreen};letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem">${content.badge || 'Our Approach'}</p>
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:400;color:${hwText};line-height:1.3;margin-bottom:1.5rem">${content.aboutHeading}</h2>
      <p style="font-family:var(--body-font);font-size:1rem;color:${hwMuted};line-height:1.8">${content.aboutMission || content.heroSubtitle}</p>
    </div>
  </section>`

  // Section 4: Service cards — 2-column, pastel bg + description + CTA
  const serviceCards = `
  <section id="services" style="padding:60px 2rem;background:${hwBg}">
    <div style="max-width:1200px;margin:0 auto">
      <div style="text-align:center;margin-bottom:3rem">
        <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${hwGreen};letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem">${content.heroEyebrow}</p>
        <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:400;color:${hwText};line-height:1.3">${content.servicesHeading}</h2>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
        ${content.services.map((s, i) => `
        <div style="display:grid;grid-template-columns:1fr 1fr;border-radius:16px;overflow:hidden;min-height:350px;border:1px solid rgba(0,0,0,0.06)">
          <div style="padding:2.5rem 2rem;display:flex;flex-direction:column;justify-content:space-between">
            <div>
              <p style="font-family:var(--body-font);font-size:0.7rem;font-weight:600;color:${hwGreen};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:0.75rem">${s.tags[0] || 'Service'}</p>
              <h3 style="font-family:var(--heading-font);font-size:clamp(1.3rem,2vw,1.7rem);font-weight:400;color:${hwText};line-height:1.25;margin-bottom:0.75rem">${s.name}</h3>
              <p style="font-family:var(--body-font);font-size:0.9rem;color:${hwMuted};line-height:1.7">${s.description}</p>
            </div>
            <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:0.75rem;font-weight:600;padding:0.7rem 1.5rem;background:${hwCoral};color:#fff;border-radius:6px;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase;margin-top:1.5rem;align-self:flex-start">${content.ctaSecondary || 'Learn More'}</a>
          </div>
          <div style="overflow:hidden;background:${i % 2 === 0 ? '#f0d9cc' : hwAlt}">
            <img src="${serviceImgs[i % serviceImgs.length]}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 5: 50/50 mission — photo left, text right
  const missionSection = `
  <section id="about" style="padding:100px 2rem;background:${hwAlt}">
    <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center">
      <div style="overflow:hidden;border-radius:16px;height:500px">
        <img src="${serviceImgs[1] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>
      <div>
        <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${hwGreen};letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem">Our Mission</p>
        <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:400;color:${hwText};line-height:1.3;margin-bottom:1.5rem">${content.aboutHeading}</h2>
        ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:${hwMuted};line-height:1.8;margin-bottom:1rem">${p}</p>`).join('')}
        <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:0.8rem;font-weight:600;padding:0.85rem 2rem;background:${hwCoral};color:#fff;border-radius:6px;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase;margin-top:1rem">${content.ctaSecondary || 'Learn More'}</a>
      </div>
    </div>
  </section>`

  // Section 6: Testimonial color cards
  const testimonialSection = content.testimonial ? `
  <section style="padding:80px 2rem;background:${hwBg}">
    <div style="max-width:1200px;margin:0 auto">
      <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${hwGreen};letter-spacing:0.15em;text-transform:uppercase;margin-bottom:3rem">What Others Say About ${businessName}</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
        ${[
          { bg: '#f0ddd0', color: hwText },
          { bg: '#1a5a6a', color: '#fff' },
          { bg: '#e8ddd0', color: hwText },
        ].map((card, i) => {
          const quote = i === 0 && content.testimonial ? content.testimonial.quote : (content.services[i]?.description || content.heroSubtitle)
          const author = i === 0 && content.testimonial ? content.testimonial.author : (content.services[i]?.name || 'Happy Client')
          return `
        <div style="background:${card.bg};border-radius:16px;padding:2.5rem 2rem;min-height:350px;display:flex;flex-direction:column;justify-content:space-between">
          <p style="font-family:var(--body-font);font-size:1.05rem;color:${card.color};line-height:1.7">${quote}</p>
          <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${card.color};letter-spacing:0.1em;text-transform:uppercase;margin-top:2rem">${author}</p>
        </div>`
        }).join('')}
      </div>
    </div>
  </section>` : ''

  // Section 7: Team / process steps
  const teamSection = content.processSteps ? `
  <section style="padding:80px 2rem;background:${hwBg}">
    <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1.5fr;gap:4rem;align-items:start">
      <div>
        <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${hwGreen};letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem">How It Works</p>
        <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:400;color:${hwText};line-height:1.3;margin-bottom:1.5rem">${content.galleryHeading || 'Your Journey With Us'}</h2>
        <p style="font-family:var(--body-font);font-size:0.95rem;color:${hwMuted};line-height:1.8">${content.aboutMission || content.heroSubtitle}</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
        ${content.processSteps.map(step => `
        <div style="background:${hwAlt};border-radius:16px;padding:2rem;text-align:center">
          <p style="font-family:var(--body-font);font-size:0.7rem;font-weight:600;color:${hwGreen};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">Step ${step.step}</p>
          <h3 style="font-family:var(--heading-font);font-size:1.15rem;font-weight:400;color:${hwText};margin-bottom:0.5rem">${step.title}</h3>
          <p style="font-family:var(--body-font);font-size:0.85rem;color:${hwMuted};line-height:1.7">${step.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  // Section 8: 3-column contact cards
  const contactCards = `
  <section id="contact" style="padding:80px 2rem;background:${hwBg}">
    <div style="max-width:900px;margin:0 auto;text-align:center">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:400;color:${hwText};margin-bottom:1rem">${content.contactHeading}</h2>
      <p style="font-family:var(--body-font);font-size:0.95rem;color:${hwMuted};line-height:1.7;margin-bottom:3rem;max-width:600px;margin-left:auto;margin-right:auto">${content.aboutMission || content.heroSubtitle}</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-bottom:3rem">
        <div style="background:${hwAlt};border-radius:16px;padding:2.5rem 1.5rem;text-align:center">
          <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${hwText};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">Phone</p>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:var(--primary)">021 000 0000</p>
        </div>
        <div style="background:${hwAlt};border-radius:16px;padding:2.5rem 1.5rem;text-align:center">
          <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${hwText};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">Address</p>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:var(--primary)">123 Main Road, Cape Town</p>
        </div>
        <div style="background:${hwAlt};border-radius:16px;padding:2.5rem 1.5rem;text-align:center">
          <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:${hwText};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem">Email</p>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:var(--primary)">hello@${businessName.toLowerCase().replace(/\s/g, '')}.co.za</p>
        </div>
      </div>
      <form style="display:flex;flex-direction:column;gap:1.25rem;max-width:600px;margin:0 auto" onsubmit="return false">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <input type="text" placeholder="Name" style="font-family:var(--body-font);padding:0.9rem 1.25rem;background:${hwAlt};border:1px solid rgba(0,0,0,0.06);border-radius:12px;color:${hwText};font-size:0.95rem;outline:none" />
          <input type="email" placeholder="Email" style="font-family:var(--body-font);padding:0.9rem 1.25rem;background:${hwAlt};border:1px solid rgba(0,0,0,0.06);border-radius:12px;color:${hwText};font-size:0.95rem;outline:none" />
        </div>
        <textarea placeholder="Your message" rows="4" style="font-family:var(--body-font);padding:0.9rem 1.25rem;background:${hwAlt};border:1px solid rgba(0,0,0,0.06);border-radius:12px;color:${hwText};font-size:0.95rem;outline:none;resize:none"></textarea>
        <button type="submit" style="font-family:var(--body-font);padding:1rem 2.5rem;background:${hwCoral};color:#fff;border:none;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer;letter-spacing:0.06em;text-transform:uppercase">${content.ctaPrimary}</button>
      </form>
    </div>
  </section>`

  // Footer — dark teal bg
  const hwFooter = `
  <footer style="padding:4rem 2rem 2rem;background:${hwText};color:#fff">
    <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:3rem">
      <div>
        <h3 style="font-family:var(--heading-font);font-size:1.5rem;font-weight:400;color:#fff;margin-bottom:1rem">Stay in the loop</h3>
        <form style="display:flex;border-radius:8px;overflow:hidden;border:1px solid rgba(255,255,255,0.2);max-width:320px" onsubmit="return false">
          <input type="email" placeholder="Your email address" style="flex:1;font-family:var(--body-font);padding:0.75rem 1rem;background:transparent;border:none;color:#fff;font-size:0.85rem;outline:none;letter-spacing:0.04em;text-transform:uppercase" />
          <button type="submit" style="padding:0.75rem;background:transparent;border:none;color:#fff;cursor:pointer;font-size:1rem">&#10132;</button>
        </form>
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:#fff;margin-bottom:1rem">Popular</div>
        ${content.services.slice(0, 3).map(s => `<a href="#services" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.8rem;display:block;margin-bottom:0.5rem;letter-spacing:0.04em;text-transform:uppercase">${s.name}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:#fff;margin-bottom:1rem">Learn More</div>
        <a href="#about" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.8rem;display:block;margin-bottom:0.5rem;letter-spacing:0.04em;text-transform:uppercase">About Us</a>
        <a href="#contact" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.8rem;display:block;margin-bottom:0.5rem;letter-spacing:0.04em;text-transform:uppercase">Contact Us</a>
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:#fff;margin-bottom:1rem">Fine Print</div>
        <a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.8rem;display:block;margin-bottom:0.5rem;letter-spacing:0.04em;text-transform:uppercase">Privacy Policy</a>
        <a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.8rem;display:block;margin-bottom:0.5rem;letter-spacing:0.04em;text-transform:uppercase">Terms of Service</a>
      </div>
    </div>
    <div style="max-width:1200px;margin:2rem auto 0;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.1);text-align:center">
      <p style="font-family:var(--body-font);font-size:0.75rem;color:rgba(255,255,255,0.4)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
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

${hwNav}

  ${heroSection}
  ${statsSection}
  ${statementSection}
  ${serviceCards}
  ${missionSection}
  ${testimonialSection}
  ${teamSection}
  ${contactCards}

${hwFooter}

</body>
</html>`
}

// ---------- Home-Services Template (Helpling–inspired) ----------
function buildHomeServicesTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages } = data
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

  // Nav — logo left, links center, CTA right
  const homeNavLinks: string[] = []
  if (navFlags.navServices) homeNavLinks.push(`<a href="#services" style="font-family:var(--body-font);font-size:0.9rem;color:${homeText};text-decoration:none;font-weight:500">Services</a>`)
  if (navFlags.navAbout) homeNavLinks.push(`<a href="#about" style="font-family:var(--body-font);font-size:0.9rem;color:${homeText};text-decoration:none;font-weight:500">About</a>`)
  if (navFlags.navContact) homeNavLinks.push(`<a href="#contact" style="font-family:var(--body-font);font-size:0.9rem;color:${homeText};text-decoration:none;font-weight:500">Contact</a>`)

  const homeNav = `
  <nav style="background:${homeBg};position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(0,0,0,0.06)">
    <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:68px;padding:0 2rem">
      <a href="#" style="font-family:var(--heading-font);font-size:1.5rem;font-weight:700;color:var(--primary);text-decoration:none">${businessName}</a>
      <div style="display:flex;align-items:center;gap:2rem">
        ${homeNavLinks.join('\n        ')}
      </div>
      <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.6rem 1.5rem;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none">${content.ctaPrimary}</a>
    </div>
  </nav>`

  // Section 1: Split hero — green bg left with heading + CTA, photo right
  const heroSection = `
  <section style="display:grid;grid-template-columns:1fr 1fr;min-height:80vh">
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
  const processSection = `
  <section style="padding:80px 2rem;background:${homeBg};text-align:center">
    <div style="max-width:1100px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.6rem,2.5vw,2.2rem);font-weight:700;color:${homeText};margin-bottom:3rem">${content.servicesHeading || 'How It Works'}</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2.5rem;margin-bottom:2.5rem">
        ${processSteps.slice(0, 3).map(step => `
        <div>
          <div style="width:72px;height:72px;border-radius:16px;background:rgba(${parseInt(primaryColor.slice(1,3),16)},${parseInt(primaryColor.slice(3,5),16)},${parseInt(primaryColor.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem">
            <span style="font-family:var(--heading-font);font-size:1.5rem;font-weight:700;color:var(--primary)">${step.step}</span>
          </div>
          <h3 style="font-family:var(--heading-font);font-size:1.05rem;font-weight:700;color:${homeText};margin-bottom:0.5rem">${step.title}</h3>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:${homeMuted};line-height:1.7">${step.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 3: Stats row — dark green bg
  const statsSection = `
  <section style="padding:60px 2rem;background:var(--primary)">
    <div style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(${Math.min(content.stats.length, 4)},1fr);gap:2rem;text-align:center">
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
      <div style="display:grid;grid-template-columns:repeat(${Math.min(content.services.length, 4)},1fr);gap:2rem">
        ${content.services.slice(0, 4).map(s => `
        <div style="text-align:left">
          <div style="width:56px;height:56px;border-radius:12px;background:rgba(${parseInt(primaryColor.slice(1,3),16)},${parseInt(primaryColor.slice(3,5),16)},${parseInt(primaryColor.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;margin-bottom:1rem">
            <span style="font-size:1.3rem;color:var(--primary)">${s.icon || '&#10003;'}</span>
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
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
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
    <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center">
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
      <div style="border-radius:16px;overflow:hidden;height:450px">
        <img src="${serviceImgs[0]}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>
    </div>
  </section>`

  // Section 7: 3-column support/FAQ cards
  const supportCards = `
  <section style="padding:80px 2rem;background:${homeAlt}">
    <div style="max-width:1100px;margin:0 auto;text-align:center">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.6rem,2.5vw,2.2rem);font-weight:700;color:${homeText};margin-bottom:3rem">${content.contactHeading}</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
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
      <a href="#contact" style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;padding:0.85rem 2.5rem;background:var(--secondary);color:#fff;border-radius:8px;text-decoration:none">${content.ctaPrimary}</a>
    </div>
  </section>`

  // Footer
  const homeFooter = `
  <footer style="padding:4rem 2rem 2rem;background:${homeAlt};border-top:1px solid rgba(0,0,0,0.06)">
    <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr;gap:3rem">
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
  ${processSection}
  ${statsSection}
  ${benefitsSection}
  ${testimonialSection}
  ${featureSection}
  ${supportCards}
  ${buildContactSection(content)}
  ${ctaBanner}

${homeFooter}

</body>
</html>`
}

// ---------- Trades-Construction Template (Plumb London–inspired) ----------
function buildTradesTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages } = data
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

  // Trades uses a clean light theme with blue accent
  const tradesBg = '#ffffff'
  const tradesAltBg = '#f5f7fa'
  const tradesText = '#1a1a2e'
  const tradesMuted = '#6b7280'

  // Top bar — tagline left, CTA right
  const topBar = `
  <div style="background:${tradesAltBg};padding:0.5rem 2rem;border-bottom:1px solid rgba(0,0,0,0.06)">
    <div style="max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center">
      <p style="font-family:var(--body-font);font-size:0.75rem;color:var(--primary);font-weight:600">${content.badge || content.heroEyebrow}</p>
      <a href="#contact" style="font-family:var(--body-font);font-size:0.75rem;color:${tradesText};text-decoration:none;font-weight:500">&#9993; ${content.ctaPrimary}</a>
    </div>
  </div>`

  // Nav — logo left, links center, phone CTA right
  const tradesNavLinks: string[] = []
  if (navFlags.navServices) tradesNavLinks.push(`<a href="#services" style="font-family:var(--body-font);font-size:0.9rem;color:${tradesText};text-decoration:none;font-weight:500;transition:color 0.2s">Services</a>`)
  if (navFlags.navAbout) tradesNavLinks.push(`<a href="#about" style="font-family:var(--body-font);font-size:0.9rem;color:${tradesText};text-decoration:none;font-weight:500;transition:color 0.2s">About Us</a>`)
  if (navFlags.navContact) tradesNavLinks.push(`<a href="#contact" style="font-family:var(--body-font);font-size:0.9rem;color:${tradesText};text-decoration:none;font-weight:500;transition:color 0.2s">Contact Us</a>`)

  const tradesNav = `
  ${topBar}
  <nav style="background:${tradesBg};position:sticky;top:0;z-index:100;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
    <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:72px;padding:0 2rem">
      <a href="#" style="font-family:var(--heading-font);font-size:1.5rem;font-weight:700;color:${tradesText};text-decoration:none;letter-spacing:0.02em">${businessName}</a>
      <div style="display:flex;align-items:center;gap:2rem">
        ${tradesNavLinks.join('\n        ')}
      </div>
      <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.7rem 1.75rem;background:var(--primary);color:#fff;border-radius:999px;text-decoration:none;display:flex;align-items:center;gap:0.5rem;transition:opacity 0.2s">&#9742; ${content.ctaPrimary}</a>
    </div>
  </nav>`

  // Section 1: Split hero — photo left, text + CTAs right, rating badge
  const ratingHtml = content.testimonial ? `
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
        <span style="font-family:var(--body-font);font-size:0.8rem;color:${tradesMuted};padding:0.3rem 0.75rem;border:1px solid rgba(0,0,0,0.1);border-radius:999px">Rated ${content.testimonial.rating}/5</span>
        <span style="color:#f59e0b;font-size:1.1rem">${'&#9733;'.repeat(content.testimonial.rating || 5)}</span>
      </div>` : ''

  const heroSection = `
  <section style="background:${tradesAltBg};overflow:hidden">
    <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;min-height:80vh">
      <div style="overflow:hidden">
        <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>
      <div style="display:flex;flex-direction:column;justify-content:center;padding:4rem 3rem">
        ${ratingHtml}
        <h1 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:${tradesText};line-height:1.15;margin-bottom:1.25rem">${content.tagline}</h1>
        <p style="font-family:var(--body-font);font-size:1rem;color:${tradesMuted};line-height:1.7;margin-bottom:2rem;max-width:450px">${content.heroSubtitle}</p>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
          <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.85rem 2rem;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;display:flex;align-items:center;gap:0.5rem;transition:opacity 0.2s">&#9993; ${content.ctaPrimary}</a>
          <a href="tel:0000000000" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.85rem 2rem;background:${tradesText};color:#fff;border-radius:8px;text-decoration:none;display:flex;align-items:center;gap:0.5rem">&#9742; Call Us</a>
        </div>
      </div>
    </div>
  </section>`

  // Section 2: Promo banner — accent color strip
  const promoBanner = `
  <section style="background:var(--primary);padding:1.25rem 2rem">
    <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between">
      <p style="font-family:var(--body-font);font-size:1rem;color:#fff;font-weight:500">${content.aboutMission || content.heroSubtitle}</p>
      <a href="#services" style="font-family:var(--body-font);font-size:0.85rem;color:#fff;text-decoration:none;font-weight:600;white-space:nowrap">Learn more &rsaquo;</a>
    </div>
  </section>`

  // Section 3: 4-column trust cards — white cards with icons
  const trustCards = `
  <section style="padding:80px 2rem;background:${tradesBg}">
    <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(${Math.min(content.stats.length, 4)},1fr);gap:1.5rem">
      ${content.stats.slice(0, 4).map(s => `
      <div style="background:${tradesBg};border:1px solid rgba(0,0,0,0.06);border-radius:12px;padding:2rem 1.5rem;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.04)">
        <div style="font-size:1.5rem;color:var(--primary);margin-bottom:0.75rem">${s.value}</div>
        <h3 style="font-family:var(--heading-font);font-size:1rem;font-weight:700;color:var(--primary);margin-bottom:0.5rem">${s.label}</h3>
        ${s.sublabel ? `<p style="font-family:var(--body-font);font-size:0.85rem;color:${tradesMuted};line-height:1.6">${s.sublabel}</p>` : ''}
      </div>`).join('')}
    </div>
  </section>`

  // Section 4: Our Services — heading with underline accent + service grid
  const servicesSection = `
  <section id="services" style="padding:80px 2rem;background:${tradesAltBg}">
    <div style="max-width:1200px;margin:0 auto">
      <div style="text-align:center;margin-bottom:3rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:${tradesText};display:inline-block;position:relative">${content.servicesHeading}
          <span style="position:absolute;bottom:-4px;left:0;width:40%;height:4px;background:var(--primary);border-radius:2px"></span>
        </h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem">
        ${content.services.map(s => `
        <div style="background:${tradesBg};border:1px solid rgba(0,0,0,0.06);border-radius:12px;padding:2rem;display:flex;gap:1.25rem;align-items:start;box-shadow:0 2px 8px rgba(0,0,0,0.04)">
          <div style="font-size:1.75rem;color:var(--primary);flex-shrink:0">${s.icon || '&#9881;'}</div>
          <div>
            <h3 style="font-family:var(--heading-font);font-size:1.1rem;font-weight:700;color:${tradesText};margin-bottom:0.5rem">${s.name}</h3>
            <p style="font-family:var(--body-font);font-size:0.9rem;color:${tradesMuted};line-height:1.7">${s.description}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 5: Green CTA banner
  const ctaBanner = `
  <section style="background:var(--secondary);padding:3.5rem 2rem">
    <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem">
      <div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:700;color:#fff;margin-bottom:0.5rem">${content.contactHeading}</h2>
        <p style="font-family:var(--body-font);font-size:1rem;color:rgba(255,255,255,0.85)">${content.heroSubtitle}</p>
      </div>
      <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:0.85rem 2rem;background:#fff;color:${tradesText};border-radius:8px;text-decoration:none;transition:opacity 0.2s">${content.ctaPrimary}</a>
    </div>
  </section>`

  // Section 6: Why Choose Us — heading + 2x2 icon grid
  const whyChooseUs = `
  <section style="padding:80px 2rem;background:${tradesBg}">
    <div style="max-width:1200px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:${tradesText};margin-bottom:3rem;display:inline-block;position:relative">${content.aboutHeading}
        <span style="position:absolute;bottom:-4px;left:0;width:40%;height:4px;background:var(--primary);border-radius:2px"></span>
      </h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:2.5rem 4rem">
        ${content.processSteps ? content.processSteps.map(step => `
        <div style="display:flex;gap:1rem;align-items:start">
          <div style="width:48px;height:48px;border-radius:50%;background:rgba(${parseInt(primaryColor.slice(1,3),16)},${parseInt(primaryColor.slice(3,5),16)},${parseInt(primaryColor.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <span style="color:var(--primary);font-size:1.1rem">&#10003;</span>
          </div>
          <div>
            <h3 style="font-family:var(--heading-font);font-size:1rem;font-weight:700;color:${tradesText};margin-bottom:0.35rem">${step.title}</h3>
            <p style="font-family:var(--body-font);font-size:0.9rem;color:${tradesMuted};line-height:1.7">${step.description}</p>
          </div>
        </div>`).join('') : content.stats.slice(0, 4).map(s => `
        <div style="display:flex;gap:1rem;align-items:start">
          <div style="width:48px;height:48px;border-radius:50%;background:rgba(${parseInt(primaryColor.slice(1,3),16)},${parseInt(primaryColor.slice(3,5),16)},${parseInt(primaryColor.slice(5,7),16)},0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <span style="color:var(--primary);font-size:1.1rem">&#10003;</span>
          </div>
          <div>
            <h3 style="font-family:var(--heading-font);font-size:1rem;font-weight:700;color:${tradesText};margin-bottom:0.35rem">${s.label}</h3>
            ${s.sublabel ? `<p style="font-family:var(--body-font);font-size:0.9rem;color:${tradesMuted};line-height:1.7">${s.sublabel}</p>` : ''}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 7: About — text left + accordion-style services, photo right
  const aboutParagraphs = content.aboutText.split('\n').filter(p => p.trim())
  const aboutSection = `
  <section id="about" style="padding:80px 2rem;background:${tradesAltBg}">
    <div style="max-width:1200px;margin:0 auto">
      <h2 style="font-family:var(--heading-font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:${tradesText};text-align:center;margin-bottom:3rem">${businessName}</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start">
        <div>
          <div style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:${tradesText};padding:0.75rem 0;border-bottom:1px solid rgba(0,0,0,0.08);margin-bottom:1.5rem">About Us</div>
          ${aboutParagraphs.map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:${tradesMuted};line-height:1.8;margin-bottom:1rem">${p}</p>`).join('')}
          ${content.services.slice(0, 3).map(s => `
          <div style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:${tradesText};padding:0.75rem 0;border-bottom:1px solid rgba(0,0,0,0.08)">${s.name}</div>`).join('')}
        </div>
        <div style="border-radius:12px;overflow:hidden;height:500px">
          <img src="${serviceImgs[0]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
      </div>
    </div>
  </section>`

  // Section 8: Coverage / areas — image left, heading + tag list right
  const coverageSection = `
  <section style="padding:80px 2rem;background:${tradesBg}">
    <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center">
      <div style="border-radius:12px;overflow:hidden;height:400px">
        <img src="${serviceImgs[1] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
      </div>
      <div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:700;color:${tradesText};margin-bottom:2rem">${content.galleryHeading || 'Areas We Cover'}</h2>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem">
          ${content.services.map(s => s.tags).flat().slice(0, 9).map(t => `
          <div style="display:flex;align-items:center;gap:0.5rem">
            <span style="color:var(--primary);font-size:0.9rem">&#9745;</span>
            <span style="font-family:var(--body-font);font-size:0.85rem;color:var(--primary);font-weight:500">${t}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>`

  // Testimonial section
  const testimonialSection = content.testimonial ? `
  <section style="padding:60px 2rem;background:${tradesAltBg}">
    <div style="max-width:800px;margin:0 auto;text-align:center">
      <div style="color:#f59e0b;font-size:1.2rem;margin-bottom:1rem">${'&#9733;'.repeat(content.testimonial.rating || 5)}</div>
      <p style="font-family:var(--body-font);font-size:1.1rem;color:${tradesText};line-height:1.7;font-style:italic;margin-bottom:1rem">"${content.testimonial.quote}"</p>
      <p style="font-family:var(--body-font);font-size:0.9rem;color:${tradesMuted};font-weight:600">— ${content.testimonial.author}</p>
    </div>
  </section>` : ''

  // Trades footer
  const tradesFooter = `
  <footer style="padding:4rem 2rem 2rem;background:${tradesText};color:#fff">
    <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem">
      <div>
        <div style="font-family:var(--heading-font);font-size:1.3rem;font-weight:700;color:#fff;margin-bottom:0.75rem">${businessName}</div>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.6);line-height:1.6;max-width:280px">${content.heroSubtitle}</p>
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.8);margin-bottom:1rem;font-weight:600">Services</div>
        ${content.services.map(s => `<a href="#services" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">${s.name}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.8);margin-bottom:1rem;font-weight:600">Company</div>
        <a href="#about" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">About Us</a>
        <a href="#contact" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Contact</a>
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.8);margin-bottom:1rem;font-weight:600">Legal</div>
        <a href="#" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Privacy Policy</a>
        <a href="#" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.85rem;display:block;margin-bottom:0.5rem">Terms of Service</a>
      </div>
    </div>
    <div style="max-width:1200px;margin:2rem auto 0;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.1);text-align:center">
      <p style="font-family:var(--body-font);font-size:0.8rem;color:rgba(255,255,255,0.4)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
    </div>
  </footer>`

  return `${buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')}
  <style>
    :root {
      --bg: ${tradesBg};
      --bg-alt: ${tradesAltBg};
      --card-bg: ${tradesBg};
      --text: ${tradesText};
      --text-muted: ${tradesMuted};
      --border: rgba(0,0,0,0.06);
    }
  </style>

${tradesNav}

  ${heroSection}
  ${promoBanner}
  ${trustCards}
  ${servicesSection}
  ${ctaBanner}
  ${whyChooseUs}
  ${aboutSection}
  ${coverageSection}
  ${testimonialSection}
  ${buildContactSection(content)}

${tradesFooter}

</body>
</html>`
}

// ---------- Retail Template (Public Pool–inspired) ----------
function buildRetailTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages } = data
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

  // Retail nav — categories left, centered brand, icons right
  const retailNavLinks: string[] = []
  if (navFlags.navServices) retailNavLinks.push(`<a href="#services" style="font-family:var(--body-font);font-size:0.8rem;font-weight:500;color:${retailText};text-decoration:none;letter-spacing:0.12em;text-transform:uppercase">${content.servicesHeading || 'Shop'}</a>`)
  if (navFlags.navAbout) retailNavLinks.push(`<a href="#about" style="font-family:var(--body-font);font-size:0.8rem;font-weight:500;color:${retailText};text-decoration:none;letter-spacing:0.12em;text-transform:uppercase">About</a>`)
  if (navFlags.navContact) retailNavLinks.push(`<a href="#contact" style="font-family:var(--body-font);font-size:0.8rem;font-weight:500;color:${retailText};text-decoration:none;letter-spacing:0.12em;text-transform:uppercase">Contact</a>`)

  const retailNav = `
  <div style="background:var(--primary);padding:0.5rem 0;text-align:center;overflow:hidden">
    <p style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:#fff;letter-spacing:0.08em;white-space:nowrap">${content.badge || content.heroEyebrow || 'Free Delivery on All Orders Over R500'}</p>
  </div>
  <nav style="background:${retailBg};border-bottom:1px solid rgba(0,0,0,0.06);position:sticky;top:0;z-index:100">
    <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;height:70px;padding:0 2rem">
      <div style="display:flex;align-items:center;gap:1.5rem">
        ${retailNavLinks.join('\n        ')}
      </div>
      <a href="#" style="font-family:var(--heading-font);font-size:clamp(1.4rem,2.5vw,1.8rem);font-weight:700;color:var(--primary);text-decoration:none;letter-spacing:0.02em;text-align:center">${businessName}</a>
      <div style="display:flex;align-items:center;justify-content:flex-end;gap:1rem">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${retailText};text-decoration:none;letter-spacing:0.1em;text-transform:uppercase">${content.ctaPrimary}</a>
      </div>
    </div>
  </nav>`

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
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;margin-top:2rem">
        ${serviceImgs.map((img, i) => `
        <div style="display:flex;flex-direction:column;align-items:center">
          <div style="width:280px;height:280px;border-radius:50%;overflow:hidden;border:2px solid var(--primary);margin-bottom:1rem">
            <img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <p style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;color:${retailText};letter-spacing:0.1em;text-transform:uppercase">${content.services[i]?.name || ''}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // Section 3: 50/50 split — overlapping photos left, heading + CTA right
  const splitSection = `
  <section style="padding:80px 2rem;background:${retailBg}">
    <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.1fr 1fr;gap:4rem;align-items:center">
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
      <div style="display:grid;grid-template-columns:1fr 2fr 1fr;gap:2rem;align-items:center;max-width:900px;margin:0 auto">
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

  // Section 6: Service / product cards — 3 items with images and names
  const productCards = `
  <section id="services" style="padding:80px 2rem;background:${retailBg}">
    <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:2rem">
      ${content.services.map((s, i) => `
      <div style="text-align:center">
        <div style="border-radius:50%;overflow:hidden;width:100%;aspect-ratio:1;border:2px solid rgba(0,0,0,0.06);margin-bottom:1.25rem">
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
  ${buildContactSection(content)}

${retailFooter}

</body>
</html>`
}

// ---------- Tech-Digital Template (Plain.com–inspired) ----------
function buildTechDigitalTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages } = data
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
  if (navFlags.navServices) techNavLinks.push(`<a href="#services" style="color:var(--text-muted);text-decoration:none;font-size:0.9rem;font-weight:500;transition:color 0.2s">Services</a>`)
  if (navFlags.navAbout) techNavLinks.push(`<a href="#about" style="color:var(--text-muted);text-decoration:none;font-size:0.9rem;font-weight:500;transition:color 0.2s">About</a>`)
  if (navFlags.navContact) techNavLinks.push(`<a href="#contact" style="color:var(--text-muted);text-decoration:none;font-size:0.9rem;font-weight:500;transition:color 0.2s">Contact</a>`)

  const techNav = `
  <nav style="position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(15,15,15,0.85);backdrop-filter:blur(12px);border-bottom:1px solid var(--border)">
    <div style="max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 2rem">
      <a href="#" style="font-family:var(--heading-font);font-size:1.3rem;font-weight:700;color:#fff;text-decoration:none;display:flex;align-items:center;gap:0.5rem">
        <span style="color:var(--primary);font-size:1.1rem">&#9670;</span> ${businessName}
      </a>
      <div style="display:flex;align-items:center;gap:2rem">
        ${techNavLinks.join('\n        ')}
      </div>
      <div style="display:flex;align-items:center;gap:0.75rem">
        <a href="#about" style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;padding:0.5rem 1.1rem;border:1px solid var(--border);border-radius:6px;color:var(--text);text-decoration:none;letter-spacing:0.06em;text-transform:uppercase;transition:border-color 0.2s">${content.ctaSecondary}</a>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;padding:0.5rem 1.1rem;background:var(--primary);border:1px solid var(--primary);border-radius:6px;color:#fff;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase;transition:opacity 0.2s">${content.ctaPrimary}</a>
      </div>
    </div>
  </nav>`

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
    <div style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
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
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;margin-bottom:${i < content.services.length - 1 ? '6rem' : '0'}">
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
      <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:5rem;align-items:start;padding:3rem 0;${i < (content.processSteps?.length || 0) - 1 ? 'border-bottom:1px solid var(--border)' : ''}">
        <div>
          <h3 style="font-family:var(--heading-font);font-size:1.35rem;font-weight:600;color:var(--text);line-height:1.3;margin-bottom:0.75rem">${step.title}</h3>
          <a href="#contact" style="font-family:var(--body-font);font-size:0.75rem;font-weight:600;color:var(--primary);text-decoration:none;letter-spacing:0.1em;text-transform:uppercase">${content.ctaPrimary} &rarr;</a>
        </div>
        <p style="font-family:var(--body-font);font-size:1rem;color:var(--text-muted);line-height:1.8">${step.description}</p>
      </div>`).join('') : aboutParagraphs.map((p, i) => `
      <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:5rem;align-items:start;padding:3rem 0;${i < aboutParagraphs.length - 1 ? 'border-bottom:1px solid var(--border)' : ''}">
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
      <div style="max-width:800px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;border-radius:12px;overflow:hidden;border:1px solid var(--border)">
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
    <div style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(${Math.min(content.stats.length, 4)},1fr);gap:2rem;text-align:center">
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
  ${buildContactSection(content)}
  ${finalCta}

${buildFooter(businessName, content, 'dark')}

</body>
</html>`
}

// ---------- POST handler ----------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { businessName, businessType, businessCategory, pages, primaryColor, secondaryColor, noColors, images } = body

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
      // Ask Claude for content JSON
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

      const claudeRes = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 768,
        messages: [
          {
            role: 'user',
            content: buildContentPrompt({
              businessName,
              businessType,
              businessCategory: category,
              pages: pages || ['Home', 'About', 'Services', 'Contact'],
              variant,
            }),
          },
        ],
      })

      let jsonString = ''
      if (claudeRes.content[0]?.type === 'text') {
        jsonString = claudeRes.content[0].text
      }

      // Strip markdown fences if present
      jsonString = jsonString.trim()
      if (jsonString.startsWith('```')) {
        jsonString = jsonString.slice(jsonString.indexOf('\n') + 1)
      }
      if (jsonString.endsWith('```')) {
        jsonString = jsonString.slice(0, jsonString.lastIndexOf('```'))
      }
      jsonString = jsonString.trim()

      try {
        content = JSON.parse(jsonString)
      } catch {
        // Retry: extract JSON between first { and last }
        try {
          const firstBrace = jsonString.indexOf('{')
          const lastBrace = jsonString.lastIndexOf('}')
          if (firstBrace !== -1 && lastBrace > firstBrace) {
            content = JSON.parse(jsonString.slice(firstBrace, lastBrace + 1))
          } else {
            throw new Error('No JSON object found')
          }
        } catch {
          // Fallback content
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
      }
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
