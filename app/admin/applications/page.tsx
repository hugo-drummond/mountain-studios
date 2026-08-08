import { crmAdmin } from '@/lib/crm'
import ApplicationsTable, { type Application } from '@/components/admin/ApplicationsTable'

export const dynamic = 'force-dynamic'

export default async function ApplicationsPage() {
  let applications: Application[] = []
  let loadError: string | null = null

  try {
    const { data, error } = await crmAdmin()
      .from('rep_applications')
      .select('*')
      // Unscored rows sort to the top: they are the ones the rescan still owes
      // work on, and burying them would hide the failure.
      .order('screened_at', { ascending: true, nullsFirst: true })
      .order('ai_score', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .limit(500)

    if (error) throw error
    applications = (data ?? []) as Application[]
  } catch (err) {
    loadError = err instanceof Error ? err.message : String(err)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-slate-100">Rep applications</h1>
        <p className="text-sm text-slate-500 mt-1">
          Every application from /careers/sales-rep, read and scored by a model. Nothing is deleted —
          low scores sort to the bottom, they don&apos;t disappear.
        </p>
      </div>

      {loadError ? (
        <div className="bg-[#13131a] border border-red-900/50 rounded-xl p-4">
          <p className="text-sm text-red-300">Could not load applications.</p>
          <p className="text-xs text-slate-500 mt-1 font-mono">{loadError}</p>
        </div>
      ) : (
        <ApplicationsTable applications={applications} />
      )}
    </div>
  )
}
