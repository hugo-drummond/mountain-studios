import { Suspense } from 'react'
import NotificationsFeed from '@/components/admin/NotificationsFeed'

export const dynamic = 'force-dynamic'

export default function AdminPage() {
  return (
    <div className="p-6">
      <Suspense fallback={<NotificationsSkeleton />}>
        <NotificationsFeed />
      </Suspense>
    </div>
  )
}

function NotificationsSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-[#13131a] border border-[#1e1e2e] rounded-xl p-4 h-24" />
      ))}
    </div>
  )
}
