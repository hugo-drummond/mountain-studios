// ---------------------------------------------------------------------------
// One <script type="application/ld+json"> block.
//
// The site's structured data was a single ProfessionalService object inline in
// app/layout.tsx and nothing else — no Organization, no per-page nodes. Rather
// than repeat that dangerouslySetInnerHTML pattern in ten files, every page
// renders this and passes an object from lib/schema.ts.
//
// A server component: JSON-LD has to be in the HTML the crawler is served, so
// it must never depend on hydration. Client pages can still render it — Next
// server-renders a client component's first paint — but keep it out of any
// branch that only runs after mount.
//
// next.config.js already allows 'unsafe-inline' on script-src, so no nonce is
// needed. If that policy is ever tightened to nonces, every caller of this
// component is the list of places to fix.
// ---------------------------------------------------------------------------

export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
