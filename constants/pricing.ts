// Pricing is quoted per job, not computed.
//
// This file used to hold a full ZAR price list (per-page prices, a single-page
// rate, a monthly retainer) alongside a region→currency map with a flat 3×
// international multiplier — a second pricing system parallel to the GBP one in
// config/config.js. Both are gone: Mountain Studios sells in South Africa only,
// and every project is priced on its own merits by an admin when the brief is
// sent (see app/api/admin/leads/[id]/send-brief).
//
// Only PageType survives, because the intake form still uses it to describe
// which pages a client wants.

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
