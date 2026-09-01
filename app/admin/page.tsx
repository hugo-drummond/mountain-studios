import Link from 'next/link'

// The notifications dashboard that used to live here ran on the legacy
// agency-backend database, which never had credentials in production. It went
// with the rest of that stack on 1 Sep 2026. These two pages are what is left,
// and both run on the CRM database.
const PAGES = [
  { href: '/admin/previews', label: 'Previews', blurb: 'Every generated client preview, and the link to share or revoke each one.' },
  { href: '/admin/chat-questions', label: 'Chat questions', blurb: 'What visitors have asked the chatbot, and which answers were served from cache.' },
]

export default function AdminHome() {
  return (
    <main style={{ padding: '3rem 1.5rem', maxWidth: '48rem', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Admin</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {PAGES.map(p => (
          <Link
            key={p.href}
            href={p.href}
            style={{
              display: 'block', padding: '1.25rem', borderRadius: '0.5rem',
              border: '1px solid #e3e0ea', textDecoration: 'none', color: 'inherit',
            }}
          >
            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>{p.label}</strong>
            <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{p.blurb}</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
