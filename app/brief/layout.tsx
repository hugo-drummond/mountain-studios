// `/brief/[id]` is one page per lead and holds what that business told us, so it
// must never be indexed. The page itself is a client component and cannot export
// metadata, which is why this layout exists — it does nothing else.
//
// robots.txt also disallows /brief/, but that only stops the fetch: a blocked
// URL can still be listed bare if something links to it, and a crawler that
// never fetches the page never sees this tag. Both layers are needed.
export const metadata = {
  robots: { index: false, follow: false },
}

export default function BriefLayout({ children }: { children: React.ReactNode }) {
  return children
}
