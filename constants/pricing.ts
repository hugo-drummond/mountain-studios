export type PageType =
  | 'home'
  | 'about'
  | 'services'
  | 'contact'
  | 'gallery'
  | 'blog'
  | 'testimonials'
  | 'ecommerce'
  | 'booking'
  | 'other'

export type CurrencyCode = 'ZAR' | 'USD' | 'GBP' | 'EUR' | 'AUD'

export type Region = 'South Africa' | 'United States' | 'United Kingdom' | 'Europe' | 'Australia' | 'Other'

export interface PagePrice {
  label: string
  zarPrice: number
}

export const pagePrices: Record<PageType, PagePrice> = {
  home: { label: 'Home', zarPrice: 2000 },
  about: { label: 'About', zarPrice: 1200 },
  services: { label: 'Services', zarPrice: 1200 },
  contact: { label: 'Contact', zarPrice: 800 },
  gallery: { label: 'Gallery', zarPrice: 1500 },
  blog: { label: 'Blog', zarPrice: 1800 },
  testimonials: { label: 'Testimonials', zarPrice: 800 },
  ecommerce: { label: 'E-commerce', zarPrice: 5000 },
  booking: { label: 'Booking', zarPrice: 1200 },
  other: { label: 'Other', zarPrice: 1200 },
}

export const singlePagePrice = 4500 // ZAR for home-only site

export const depositPercentage = 50
export const monthlyRetainerZAR = 500

export const regionCurrencyMap: Record<Region, { currency: CurrencyCode; multiplier: number }> = {
  'South Africa': { currency: 'ZAR', multiplier: 1.0 },
  'United States': { currency: 'USD', multiplier: 3.0 },
  'United Kingdom': { currency: 'GBP', multiplier: 3.0 },
  'Europe': { currency: 'EUR', multiplier: 3.0 },
  'Australia': { currency: 'AUD', multiplier: 3.0 },
  'Other': { currency: 'USD', multiplier: 3.0 },
}

export const budgetRanges: Record<CurrencyCode, string[]> = {
  ZAR: ['R3,500–R5,000', 'R6,000–R9,000', 'R9,000–R14,000', 'R14,000+'],
  USD: ['$500–$750', '$850–$1,300', '$1,300–$2,000', '$2,000+'],
  GBP: ['£400–£600', '£700–£1,100', '£1,100–£1,600', '£1,600+'],
  EUR: ['€450–€700', '€800–€1,200', '€1,200–€1,800', '€1,800+'],
  AUD: ['A$750–A$1,100', 'A$1,300–A$2,000', 'A$2,000–A$3,000', 'A$3,000+'],
}

export function calculateQuote(
  pages: PageType[],
  multiplier: number,
  fxRate: number // ZAR to target currency
): {
  items: { label: string; zarPrice: number; localPrice: number }[]
  totalZAR: number
  totalLocal: number
  depositLocal: number
  retainerLocal: number
} {
  const isSinglePage = pages.length === 1 && pages[0] === 'home'

  const items = pages.map((page) => {
    const zarPrice = isSinglePage ? singlePagePrice : pagePrices[page].zarPrice
    const internationalZAR = zarPrice * multiplier
    return {
      label: pagePrices[page].label,
      zarPrice: internationalZAR,
      localPrice: internationalZAR * fxRate,
    }
  })

  const totalZAR = items.reduce((sum, i) => sum + i.zarPrice, 0)
  const totalLocal = items.reduce((sum, i) => sum + i.localPrice, 0)
  const depositLocal = totalLocal * (depositPercentage / 100)
  const retainerLocal = monthlyRetainerZAR * multiplier * fxRate

  return { items, totalZAR, totalLocal, depositLocal, retainerLocal }
}
