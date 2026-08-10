import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHash } from 'crypto'
import Link from 'next/link'

const COOKIE_NAME = 'agency_admin'
const SALT = 'agency-salt'

function isValidSession(): boolean {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false

  const expected = createHash('sha256').update(password + SALT).digest('hex')
  const cookieStore = cookies()
  const value = cookieStore.get(COOKIE_NAME)?.value
  if (!value) return false

  // Constant-time comparison
  if (value.length !== expected.length) return false
  let diff = 0
  for (let i = 0; i < value.length; i++) {
    diff |= value.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return diff === 0
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isValidSession()) {
    redirect('/admin/login')
  }

  return (
    <div className="flex h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-[#13131a] border-r border-[#1e1e2e] flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-[#1e1e2e]">
          <span className="inline-flex items-center gap-2 text-slate-200 font-semibold text-sm">
            <span className="w-6 h-6 rounded bg-indigo-600 inline-block shrink-0" />
            Agency Backend
          </span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-slate-100 hover:bg-white/5 transition-colors"
          >
            <span className="text-base">🔔</span>
            Notifications
          </Link>
          <Link
            href="/admin/previews"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-slate-100 hover:bg-white/5 transition-colors"
          >
            <span className="text-base">🔗</span>
            Shared previews
          </Link>
        </nav>
        <div className="px-3 py-4 border-t border-[#1e1e2e]">
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

// Server component — form action for logout
function LogoutButton() {
  return (
    <form action="/api/admin/auth/logout" method="POST">
      <button
        type="submit"
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors text-left"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Sign out
      </button>
    </form>
  )
}
