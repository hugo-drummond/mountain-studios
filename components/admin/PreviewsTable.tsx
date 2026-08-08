'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export interface SharedPreview {
  id: string
  token: string
  business_name: string
  created_by: string | null
  created_at: string
  expires_at: string
  revoked: boolean
  view_count: number
  first_viewed_at: string | null
  last_viewed_at: string | null
  claimed_at: string | null
  claim_name: string | null
  claim_phone: string | null
  claim_note: string | null
}

function when(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })
}

function state(p: SharedPreview): { label: string; className: string } {
  if (p.claimed_at) return { label: 'Claimed', className: 'bg-emerald-500/15 text-emerald-300' }
  if (p.revoked) return { label: 'Revoked', className: 'bg-slate-500/15 text-slate-400' }
  if (new Date(p.expires_at) < new Date()) return { label: 'Expired', className: 'bg-slate-500/15 text-slate-400' }
  if (p.view_count > 0) return { label: 'Opened', className: 'bg-indigo-500/15 text-indigo-300' }
  return { label: 'Not opened', className: 'bg-white/5 text-slate-400' }
}

export default function PreviewsTable({ previews }: { previews: SharedPreview[] }) {
  const router = useRouter()
  const [copied, setCopied] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)

  async function copy(token: string) {
    const url = `${window.location.origin}/p/${token}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(token)
      setTimeout(() => setCopied(null), 1800)
    } catch {
      window.prompt('Copy this link', url)
    }
  }

  async function revoke(id: string, revoked: boolean) {
    setBusy(id)
    try {
      await fetch(`/api/preview/manage/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ revoked: !revoked }),
      })
      router.refresh()
    } finally {
      setBusy(null)
    }
  }

  if (previews.length === 0) {
    return (
      <div className="bg-[#13131a] border border-[#1e1e2e] rounded-xl p-8 text-center">
        <p className="text-sm text-slate-500">No previews shared yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {previews.map(p => {
        const s = state(p)
        return (
          <div key={p.id} className="bg-[#13131a] border border-[#1e1e2e] rounded-xl p-4">
            <div className="flex items-start gap-4 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-slate-100">{p.business_name}</span>
                  <span className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded ${s.className}`}>
                    {s.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Sent {when(p.created_at)}
                  {p.created_by ? ` by ${p.created_by}` : ''} · expires {when(p.expires_at)}
                  {p.view_count > 0 && ` · ${p.view_count} view${p.view_count === 1 ? '' : 's'}, last ${when(p.last_viewed_at)}`}
                </p>

                {p.claimed_at && (
                  <div className="mt-3 rounded-lg bg-emerald-500/5 border border-emerald-900/40 p-3">
                    <p className="text-xs text-emerald-300">
                      {p.claim_name} · <a href={`tel:${p.claim_phone}`} className="underline">{p.claim_phone}</a>
                      <span className="text-slate-500"> — claimed {when(p.claimed_at)}</span>
                    </p>
                    {p.claim_note && (
                      <p className="text-xs text-slate-400 mt-2 whitespace-pre-wrap leading-relaxed">{p.claim_note}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`/p/${p.token}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs bg-white/5 text-slate-300 hover:bg-white/10 hover:text-slate-100 transition-colors"
                >
                  Open
                </a>
                <button
                  onClick={() => copy(p.token)}
                  className="px-3 py-1.5 rounded-lg text-xs bg-white/5 text-slate-300 hover:bg-white/10 hover:text-slate-100 transition-colors"
                >
                  {copied === p.token ? 'Copied' : 'Copy link'}
                </button>
                <button
                  onClick={() => revoke(p.id, p.revoked)}
                  disabled={busy === p.id}
                  className="px-3 py-1.5 rounded-lg text-xs bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 disabled:opacity-40 transition-colors"
                >
                  {p.revoked ? 'Restore' : 'Revoke'}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
