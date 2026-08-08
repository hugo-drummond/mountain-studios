'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export interface Application {
  id: string
  full_name: string
  email: string
  phone: string
  province: string
  city: string
  why_sales: string
  persuasion: string
  work_rights: boolean
  has_laptop: boolean
  cv_path: string | null
  status: string
  source: string
  created_at: string
  ai_score: number | null
  ai_verdict: 'strong' | 'maybe' | 'junk' | null
  ai_summary: string | null
  ai_flags: string[] | null
  screened_at: string | null
}

type Filter = 'strong' | 'maybe' | 'junk' | 'unscored' | 'all'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'strong', label: 'Strong' },
  { key: 'maybe', label: 'Maybe' },
  { key: 'junk', label: 'Junk' },
  { key: 'unscored', label: 'Unscored' },
  { key: 'all', label: 'All' },
]

const STATUS_ACTIONS = [
  { value: 'shortlisted', label: 'Shortlist' },
  { value: 'rejected', label: 'Reject' },
  { value: 'hired', label: 'Hired' },
]

function scoreColour(score: number | null): string {
  if (score === null) return 'text-slate-500 border-slate-700'
  if (score >= 70) return 'text-emerald-300 border-emerald-800/60'
  if (score >= 35) return 'text-amber-300 border-amber-800/60'
  return 'text-slate-500 border-slate-700'
}

function statusBadge(status: string): string {
  switch (status) {
    case 'shortlisted': return 'bg-indigo-500/15 text-indigo-300'
    case 'hired': return 'bg-emerald-500/15 text-emerald-300'
    case 'rejected': return 'bg-slate-500/15 text-slate-400'
    default: return 'bg-white/5 text-slate-400'
  }
}

function when(iso: string): string {
  return new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function ApplicationsTable({ applications }: { applications: Application[] }) {
  const router = useRouter()
  const [filter, setFilter] = useState<Filter>('strong')
  const [open, setOpen] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)
  const [rescanning, setRescanning] = useState(false)

  const unscored = applications.filter(a => a.screened_at === null).length

  // Opening this page repairs anything the fire-and-forget screening missed.
  // Runs once, only when there is actually something to fix.
  useEffect(() => {
    if (unscored === 0 || rescanning) return
    setRescanning(true)
    fetch('/api/careers/screen', { method: 'POST' })
      .then(r => r.json())
      .then(d => { if (d?.screened > 0) router.refresh() })
      .catch(() => {})
      .finally(() => setRescanning(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unscored])

  const counts = useMemo(() => ({
    strong: applications.filter(a => a.ai_verdict === 'strong').length,
    maybe: applications.filter(a => a.ai_verdict === 'maybe').length,
    junk: applications.filter(a => a.ai_verdict === 'junk').length,
    unscored,
    all: applications.length,
  }), [applications, unscored])

  const visible = useMemo(() => {
    if (filter === 'all') return applications
    if (filter === 'unscored') return applications.filter(a => a.screened_at === null)
    return applications.filter(a => a.ai_verdict === filter)
  }, [applications, filter])

  async function setStatus(id: string, status: string) {
    setBusy(id)
    try {
      await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      router.refresh()
    } finally {
      setBusy(null)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filter === f.key
                ? 'bg-indigo-600 text-white'
                : 'bg-[#13131a] text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {f.label}
            <span className="ml-2 text-xs opacity-60">{counts[f.key]}</span>
          </button>
        ))}
        {rescanning && (
          <span className="text-xs text-slate-500 ml-2">Screening {unscored} unscored…</span>
        )}
      </div>

      {visible.length === 0 ? (
        <div className="bg-[#13131a] border border-[#1e1e2e] rounded-xl p-8 text-center">
          <p className="text-sm text-slate-500">
            {applications.length === 0 ? 'No applications yet.' : 'Nothing in this bucket.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {visible.map(a => {
            const isOpen = open === a.id
            return (
              <div key={a.id} className="bg-[#13131a] border border-[#1e1e2e] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : a.id)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className={`shrink-0 w-12 h-12 rounded-lg border flex items-center justify-center text-sm font-semibold ${scoreColour(a.ai_score)}`}>
                    {a.ai_score ?? '–'}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-slate-100">{a.full_name}</span>
                      <span className="text-xs text-slate-500">{a.city}, {a.province}</span>
                      {a.status !== 'new' && (
                        <span className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded ${statusBadge(a.status)}`}>
                          {a.status}
                        </span>
                      )}
                      {!a.work_rights && (
                        <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-red-500/15 text-red-300">
                          no work rights
                        </span>
                      )}
                    </span>
                    <span className="block text-xs text-slate-500 mt-1 truncate">
                      {a.ai_summary || (a.screened_at ? 'No summary.' : 'Not screened yet.')}
                    </span>
                  </span>

                  <span className="shrink-0 text-xs text-slate-600">{when(a.created_at)}</span>
                </button>

                {isOpen && (
                  <div className="border-t border-[#1e1e2e] p-4 space-y-4">
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
                      <span className="text-slate-400">
                        <span className="text-slate-600">Email </span>
                        <a href={`mailto:${a.email}`} className="hover:text-indigo-300">{a.email}</a>
                      </span>
                      <span className="text-slate-400">
                        <span className="text-slate-600">Phone </span>
                        <a href={`tel:${a.phone}`} className="hover:text-indigo-300">{a.phone}</a>
                      </span>
                      <span className="text-slate-400">
                        <span className="text-slate-600">Laptop + internet </span>
                        {a.has_laptop ? 'Yes' : 'No'}
                      </span>
                      <span className="text-slate-400">
                        <span className="text-slate-600">Work rights </span>
                        {a.work_rights ? 'Yes' : 'No'}
                      </span>
                      {a.cv_path && (
                        <a
                          href={`/api/admin/applications/${a.id}/cv`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-300 hover:text-indigo-200"
                        >
                          Open CV ↗
                        </a>
                      )}
                    </div>

                    {a.ai_flags && a.ai_flags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {a.ai_flags.map(flag => (
                          <span key={flag} className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300/90">
                            {flag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-600 mb-1.5">
                        Why sales, and why this role
                      </p>
                      <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{a.why_sales}</p>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-600 mb-1.5">
                        A time they sold or convinced someone
                      </p>
                      <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{a.persuasion}</p>
                    </div>

                    <div className="flex gap-2 pt-1">
                      {STATUS_ACTIONS.map(action => (
                        <button
                          key={action.value}
                          onClick={() => setStatus(a.id, action.value)}
                          disabled={busy === a.id || a.status === action.value}
                          className="px-3 py-1.5 rounded-lg text-xs bg-white/5 text-slate-300 hover:bg-white/10 hover:text-slate-100 disabled:opacity-40 disabled:cursor-default transition-colors"
                        >
                          {a.status === action.value ? `✓ ${action.label}` : action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
