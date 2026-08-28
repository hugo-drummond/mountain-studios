import type { MetadataRoute } from 'next'

// ---------------------------------------------------------------------------
// Served at /robots.txt by Next's App Router. There was none before this, so
// every private route was crawlable by default.
//
// **AI crawlers are deliberately allowed.** GPTBot, ClaudeBot, PerplexityBot,
// Google-Extended and the rest all read this file, and getting named in AI
// answers is the point of the AEO work — so there is one rule set, it applies
// to everybody, and it blocks only the paths below. Do not add a per-bot
// `disallow: '/'` block here without deciding to give that up.
//
// Note what this file cannot do: it stops a crawler *reading* a page, not the
// URL *appearing* in results. Google will still list a blocked URL, bare and
// description-less, if something links to it — and because it may not fetch the
// page, it never sees the `noindex` that would have removed it. So the real
// guard is the `noindex` on the pages themselves (`decorate()` in
// lib/shared-preview.ts for /p, and the layout metadata for /admin and /brief).
// This file is the second layer, not the first.
// ---------------------------------------------------------------------------

const SITE_URL = 'https://mountainstudios.co.za'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',       // admin screens
        '/brief/',      // one per lead, private
        '/p/',          // generated client previews
        '/temp',        // scratch route
        '/api/',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
