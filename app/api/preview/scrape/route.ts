import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
const FETCH_TIMEOUT = 15000

const SYSTEM_PROMPT = `You are a business website analyzer for a web design agency. Extract information from the provided website content and return ONLY valid JSON — no markdown fences, no explanation, no preamble.

Return this exact structure:
{
  "businessName": "string",
  "businessType": "string — one of: restaurant, cafe, bakery, bar, butcher, catering, fast-food, food-truck, juice-bar, pizza-shop, sushi-restaurant, ice-cream-shop, wine-shop, guest-house, hotel, retail-store, boutique, florist, gift-shop, jeweller, furniture-store, hardware-store, bookshop, pharmacy, toy-store, electronics-store, sports-store, art-gallery, grocery, thrift-store, garden-centre, dentist, doctor, physiotherapist, chiropractor, optometrist, hair-salon, beauty-salon, massage-therapist, dietitian, psychologist, speech-therapist, occupational-therapist, audiologist, podiatrist, holistic-health, tattoo-studio, personal-trainer, yoga-studio, gym, martial-arts, dance-studio, swimming, golf-coach, sports-coaching, dog-groomer, pet-shop, kennels, dog-walker, dog-trainer, pet-services, veterinarian, event-planner, dj, wedding-venue, photo-booth, party-supplies, entertainer, venue-hire, plumber, electrician, builder, carpenter, welder, paving-tiling, roofer, painter, glazier, locksmith, plasterer, fencing, scaffolding, demolition, solar-energy, hvac, borehole-irrigation, lawyer, accountant, consultant, financial-advisor, insurance-broker, recruitment, marketing-agency, business-coach, translation, notary, debt-counsellor, customs-broker, cleaning-service, landscaper, pest-control, security, moving-removals, pool-service, laundry, appliance-repair, handyman, upholstery, waste-removal, music-school, tutor, driving-school, language-school, preschool, after-school, training-academy, art-classes, coding-classes, first-aid-training, auto-mechanic, panel-beater, car-wash, tyre-shop, car-dealership, auto-electrician, tow-truck, motorcycle-shop, web-developer, it-support, app-developer, digital-marketing, ecommerce, cybersecurity, data-analytics, photographer, videographer, graphic-designer, interior-designer, copywriter, print-shop, music-producer, craft-goods, fashion-designer, animator, real-estate, architect, surveyor, property-management, home-staging, town-planner, other",
  "heroEyebrow": "Short uppercase label, 3-5 words about the business",
  "tagline": "Compelling headline, 6-10 words. Use <em> on ONE key word for italic accent.",
  "heroSubtitle": "One sentence, 12-18 words, expanding on what the business does",
  "ctaPrimary": "Primary button text, 2-4 words",
  "ctaSecondary": "Secondary button text, 2-3 words",
  "servicesHeading": "Section heading for services, 2-4 words",
  "services": [
    { "name": "Service name", "description": "One sentence, 10-15 words", "tags": ["Tag1", "Tag2"] }
  ],
  "aboutHeading": "About heading with <em> on one word, 4-8 words",
  "aboutText": "Two short paragraphs separated by \\n\\n. Total 40-60 words.",
  "aboutMission": "One sentence mission statement, 10-15 words",
  "stats": [
    { "value": "15+", "label": "Years Experience" },
    { "value": "500+", "label": "Relevant metric" },
    { "value": "50+", "label": "Another metric" },
    { "value": "98%", "label": "Satisfaction metric" }
  ],
  "contactHeading": "Contact heading as a question, 5-8 words",
  "contactHours": "Business hours string or null",
  "phone": "string or null",
  "email": "string or null",
  "address": "string or null",
  "socialLinks": { "facebook": "url or null", "instagram": "url or null" },
  "brandColors": { "primary": "#hex or null", "secondary": "#hex or null", "accent": "#hex or null" },
  "imageUrls": ["array of up to 6 absolute image URLs from the site — logo, hero, team, products"]
}

Rules:
- CRITICAL: The businessName MUST come from the PAGE TITLE, logo text, or domain name — NOT from generic descriptions. If the title says "Coimbra Bakery" that IS the business name.
- The businessType MUST be one of the exact values listed above. Pick the closest match.
- Look for phone numbers, addresses, and hours in the footer/contact sections. Extract them exactly as shown — don't return null if the data is there.
- If BRAND COLOURS are provided, use them for brandColors.primary and brandColors.secondary.
- Stats should be realistic for the business type. Use numbers from the site if available, otherwise generate plausible ones.
- The tagline should NOT include the business name.
- Services array should have exactly 3 items. Tags should be specific to the service (not generic like "Popular").
- If you genuinely can't find certain info, use null. But try hard — check footer text for phone/address/hours.
- Content should feel professional and polished — you're a copywriter, not a scraper.
- Image URLs must be absolute (start with https://).`

// ── Helpers ──────────────────────────────────────────────────────────────────

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function makeAbsolute(src: string, baseUrl: string): string {
  if (src.startsWith('http')) return src
  try {
    return new URL(src, baseUrl).href
  } catch {
    return src
  }
}

function cleanHtml(html: string, baseUrl: string): { text: string; images: string[]; title: string; metaDesc: string } {
  // Extract title and meta description BEFORE stripping
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : ''
  const metaMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i)
  const metaDesc = metaMatch ? metaMatch[1].trim() : ''

  // Remove script, style, svg, noscript — but KEEP nav, footer, header (they have business info)
  let cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')

  // Extract image src attributes
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi
  const images: string[] = []
  let match
  while ((match = imgRegex.exec(cleaned)) !== null) {
    const src = makeAbsolute(match[1], baseUrl)
    if (src.startsWith('http') && !src.includes('data:') && !src.includes('.svg')) {
      images.push(src)
    }
  }

  // Strip all remaining HTML tags
  const text = cleaned
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#\d+;/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return { text, images: [...new Set(images)].slice(0, 20), title, metaDesc }
}

async function fetchWithTimeout(url: string, timeout: number): Promise<Response | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
    })
    clearTimeout(timer)
    return res
  } catch {
    clearTimeout(timer)
    return null
  }
}

async function callDeepSeek(text: string): Promise<Record<string, unknown> | null> {
  if (!DEEPSEEK_API_KEY) throw new Error('Missing DEEPSEEK_API_KEY')

  // Truncate to ~12k chars to stay within token limits
  const truncated = text.slice(0, 12000)

  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        temperature: 0.1,
        max_tokens: 1500,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: truncated },
        ],
      }),
    })

    const data = await res.json()
    const content = data.choices?.[0]?.message?.content?.trim()
    if (!content) continue

    // Strip markdown fences if present
    const jsonStr = content.replace(/^```json?\s*/i, '').replace(/```\s*$/i, '').trim()

    try {
      return JSON.parse(jsonStr)
    } catch {
      // Retry once
      continue
    }
  }

  return null
}

// ── POST handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Normalize URL
    let normalizedUrl = url.trim()
    if (!normalizedUrl.startsWith('http')) {
      normalizedUrl = 'https://' + normalizedUrl
    }

    const domain = getDomain(normalizedUrl)

    // Check for existing recent scrape (within 30 days)
    try {
      const { data: existing } = await supabaseAdmin
        .from('prospect_scrapes')
        .select('id, extracted_data')
        .eq('source_domain', domain)
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (existing) {
        return NextResponse.json({
          success: true,
          id: existing.id,
          data: existing.extracted_data,
          cached: true,
        })
      }
    } catch {
      // No cached result — proceed with scraping
    }

    // Fetch homepage
    const homeRes = await fetchWithTimeout(normalizedUrl, FETCH_TIMEOUT)
    if (!homeRes || !homeRes.ok) {
      return NextResponse.json({
        error: 'Could not access this website. It may be blocking automated requests.',
      }, { status: 403 })
    }

    let html = await homeRes.text()

    // Try to fetch /about page
    const aboutPaths = ['/about', '/about-us', '/about-us/']
    for (const path of aboutPaths) {
      try {
        const aboutUrl = new URL(path, normalizedUrl).href
        const aboutRes = await fetchWithTimeout(aboutUrl, 8000)
        if (aboutRes && aboutRes.ok) {
          const aboutHtml = await aboutRes.text()
          html += '\n\n--- ABOUT PAGE ---\n\n' + aboutHtml
          break
        }
      } catch {
        // Skip if about page doesn't exist
      }
    }

    // Clean HTML and extract text + images
    const { text, images, title, metaDesc } = cleanHtml(html, normalizedUrl)

    if (text.length < 100) {
      return NextResponse.json({
        error: "This website doesn't have enough text content to analyze.",
      }, { status: 422 })
    }

    // Call DeepSeek for extraction
    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json({
        error: 'AI extraction is not configured. Missing DEEPSEEK_API_KEY.',
      }, { status: 500 })
    }

    // Try to extract brand colours from CSS/inline styles
    const hexMatches = html.match(/#[0-9a-fA-F]{6}/g) || []
    const colourCounts: Record<string, number> = {}
    for (const c of hexMatches) {
      const lower = c.toLowerCase()
      // Skip near-white, near-black, and common greys
      if (['#ffffff', '#000000', '#333333', '#666666', '#999999', '#cccccc', '#f5f5f5', '#eeeeee', '#dddddd'].includes(lower)) continue
      colourCounts[lower] = (colourCounts[lower] || 0) + 1
    }
    const topColours = Object.entries(colourCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(e => e[0])
    const colourHint = topColours.length > 0 ? `\nBRAND COLOURS FOUND IN CSS: ${topColours.join(', ')}` : ''

    const contextHeader = `PAGE TITLE: ${title}\nMETA DESCRIPTION: ${metaDesc}\nURL: ${normalizedUrl}${colourHint}\n\n`
    const textWithImages = contextHeader + text + '\n\nImages found on site:\n' + images.slice(0, 10).join('\n')
    const extracted = await callDeepSeek(textWithImages)

    if (!extracted) {
      return NextResponse.json({
        error: 'Could not extract business information from this site.',
      }, { status: 422 })
    }

    // Add scraped images to extracted data if DeepSeek didn't find any
    if (!extracted.imageUrls || (extracted.imageUrls as string[]).length === 0) {
      extracted.imageUrls = images.slice(0, 6)
    }

    // Save to Supabase
    let scrapeId: string | null = null
    try {
      const { data: row, error } = await supabaseAdmin
        .from('prospect_scrapes')
        .insert({
          source_url: normalizedUrl,
          source_domain: domain,
          extracted_data: extracted,
          business_name: (extracted.businessName as string) || null,
          business_type: (extracted.businessType as string) || null,
          status: 'scraped',
        })
        .select('id')
        .single()

      if (!error && row) {
        scrapeId = row.id
      }
    } catch {
      // Supabase save failed — still return the data, just without persistence
      console.error('[scrape] Failed to save to Supabase')
    }

    return NextResponse.json({
      success: true,
      id: scrapeId,
      data: extracted,
      cached: false,
    })
  } catch (err) {
    console.error('[scrape] Unexpected error:', err)
    return NextResponse.json({
      error: 'An unexpected error occurred while analyzing this website.',
    }, { status: 500 })
  }
}
