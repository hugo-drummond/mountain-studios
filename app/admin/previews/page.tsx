import { crmAdmin } from '@/lib/crm'
import PreviewsTable, { type SharedPreview } from '@/components/admin/PreviewsTable'

export const dynamic = 'force-dynamic'

export default async function PreviewsPage() {
  let previews: SharedPreview[] = []
  let loadError: string | null = null

  try {
    const { data, error } = await crmAdmin()
      .from('shared_previews')
      .select('id, token, business_name, created_by, created_at, expires_at, revoked, view_count, first_viewed_at, last_viewed_at, claimed_at, claim_name, claim_phone, claim_note')
      .order('created_at', { ascending: false })
      .limit(300)

    if (error) throw error
    previews = (data ?? []) as SharedPreview[]
  } catch (err) {
    loadError = err instanceof Error ? err.message : String(err)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-slate-100">Shared previews</h1>
        <p className="text-sm text-slate-500 mt-1">
          Links reps have sent to prospects. View counts ignore link-preview bots, so a view here means
          a person actually opened it.
        </p>
      </div>

      {loadError ? (
        <div className="bg-[#13131a] border border-red-900/50 rounded-xl p-4">
          <p className="text-sm text-red-300">Could not load previews.</p>
          <p className="text-xs text-slate-500 mt-1 font-mono">{loadError}</p>
        </div>
      ) : (
        <PreviewsTable previews={previews} />
      )}
    </div>
  )
}
