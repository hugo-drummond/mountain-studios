import type { PageSelection } from '@/types'

// Mirror of server-side config/config.js pricing
const PRICING = {
  basePriceGBP: 499,
  pricePerPageGBP: 99,
  pricePerExtraSectionGBP: 29,
  customPagePriceGBP: 79,
  depositPercentage: 50,
  baseSectionsIncluded: 3,
}

export interface PriceBreakdown {
  base: number
  pages: { count: number; subtotal: number }
  extraSections: { count: number; subtotal: number }
  customPages: { count: number; subtotal: number }
  totalGBP: number
  depositGBP: number
}

export function calculateBriefPrice(pages: PageSelection[]): PriceBreakdown {
  const standardPages = pages.filter((p) => !p.is_custom)
  const customPages = pages.filter((p) => p.is_custom)

  const pagesSubtotal = standardPages.length * PRICING.pricePerPageGBP
  const customPagesSubtotal = customPages.length * PRICING.customPagePriceGBP

  let extraSections = 0
  for (const page of pages) {
    const extra = Math.max(0, page.sections - PRICING.baseSectionsIncluded)
    extraSections += extra
  }
  const extraSectionsSubtotal = extraSections * PRICING.pricePerExtraSectionGBP

  const totalGBP =
    PRICING.basePriceGBP + pagesSubtotal + customPagesSubtotal + extraSectionsSubtotal

  return {
    base: PRICING.basePriceGBP,
    pages: { count: standardPages.length, subtotal: pagesSubtotal },
    extraSections: { count: extraSections, subtotal: extraSectionsSubtotal },
    customPages: { count: customPages.length, subtotal: customPagesSubtotal },
    totalGBP,
    depositGBP: Math.round(totalGBP * (PRICING.depositPercentage / 100)),
  }
}
