import type { MetadataRoute } from 'next'

// ---------------------------------------------------------------------------
// Served at /sitemap.xml by Next's App Router. There was no sitemap of any kind
// before this, so the only route a crawler could reach was whatever it found by
// following links from the homepage.
//
// The list is written out by hand rather than read off the filesystem. A glob
// would happily publish `/admin`, `/temp` and every `/brief/[id]`, and the
// failure would be silent — a sitemap is not rendered anywhere a person looks.
// Adding a public page means adding a line here — and in two other hand-written
// places: the "Pages on this site" section of lib/chatbot/knowledge.ts, and
// public/llms.txt. All three are hand-written on purpose.
//
// Deliberately absent, and they must stay absent:
//   /admin/*     — admin screens
//   /brief/[id]  — one per lead, private
//   /p/*         — generated client previews, served as raw documents
//   /temp        — scratch route
//   /answers/*   — see below
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// /answers is deliberately NOT in this list.
//
// Those pages publish the real price ladder, and the decision (31 Aug 2026) is
// that they are for AI assistants to read and cite, not for a prospect to find
// by browsing the site or by searching Google. They carry no internal link from
// anywhere on the site either — nav, footers and the homepage FAQ link were all
// removed.
//
// They stay listed in public/llms.txt and stay crawlable in robots.txt, which
// is the whole point: an assistant can still read and cite them.
//
// Understand what this does NOT do. When an assistant cites one of these pages
// it hands the reader the URL, and the reader is often the prospect. Keeping
// them out of the sitemap stops people stumbling onto the prices; it does not
// keep the prices private.
// ---------------------------------------------------------------------------

const SITE_URL = 'https://mountainstudios.co.za'

type Entry = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

const PAGES: Entry[] = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/web-design', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/paid-ads', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/aeo', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/business-automation', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/work', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/start-your-project', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/careers/sales-rep', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/refer/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return PAGES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
