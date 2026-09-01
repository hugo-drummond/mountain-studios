import type { MetadataRoute } from 'next'
import { ANSWERS } from './answers/answers'

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
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// /answers IS in this list, as of 1 Sep 2026. It was pulled out on 31 Aug and
// that was a mistake, so read this before pulling it out again.
//
// The intent was that those pages are for AI assistants to read and cite, not
// for a prospect to browse into. Removing them from the sitemap did nothing for
// the second half and quietly broke the first. Nobody browses a sitemap — it is
// a crawler file. What actually keeps a prospect out is the absence of any
// internal link, and that stays true: no nav entry, no footer entry, no
// homepage FAQ link, nothing.
//
// What it broke: with no sitemap entry and no inbound link, a crawler had no
// path to these pages at all. public/llms.txt lists them, but llms.txt is not a
// discovery mechanism — no search engine uses it to find pages, it is read by
// some assistants once they are already on the domain. Google AI Overviews
// draws on the Google index, and ChatGPT and Perplexity search on top of search
// indexes. Not indexed means not citable, so the pages built for AEO were
// invisible to the exact systems they exist for.
//
// The trade-off, stated plainly: they can now surface in an ordinary Google
// search for something like "website cost south africa". That is the same coin
// as being citable — both come from the index. You cannot have one without the
// other. The only thing genuinely in our control is browsability from our own
// site, and that is still shut.
//
// The individual answer pages go in; the /answers hub does not. The hub is a
// browsable index and nothing cites it — a crawler reaches it from the
// breadcrumb on any answer page if it ever matters.
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
  // Read off ANSWERS rather than retyped. This is not the glob the note above
  // warns against — it is one curated, typed array — and it means a new answer
  // page cannot be published without its sitemap entry, which is exactly the
  // drift that hid these pages in the first place.
  ...ANSWERS.map((a): Entry => ({
    path: `/answers/${a.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  })),
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
