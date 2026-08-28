// `/temp` is a scratch route that is nonetheless publicly reachable. Same
// reasoning as app/brief/layout.tsx: the page is a client component, so the
// noindex has to live in a layout, and robots.txt alone would not keep the URL
// out of results.
export const metadata = {
  robots: { index: false, follow: false },
}

export default function TempLayout({ children }: { children: React.ReactNode }) {
  return children
}
