'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import type { Lead, Meeting, Brief } from '@/types'
import StatusBadge from './StatusBadge'
import ActionButtons from './ActionButtons'
import { useAdminAuth } from './AdminAuthContext'

interface LeadWithRelations extends Lead {
  meetings: Meeting[]
  brief: Brief | null
}

interface Props {
  leadId: string | null
  onClose: () => void
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function MeetingTypeLabel({ type }: { type: Meeting['meeting_type'] }) {
  const labels: Record<Meeting['meeting_type'], string> = {
    discovery: 'Discovery Call',
    brief_review: 'Brief Review',
    progress_review: 'Progress Review',
  }
  return <>{labels[type] ?? type}</>
}

function MeetingStatusDot({ status }: { status: Meeting['status'] }) {
  const colours: Record<Meeting['status'], string> = {
    scheduled: 'bg-blue-400',
    completed: 'bg-emerald-400',
    no_show: 'bg-red-400',
    cancelled: 'bg-slate-400',
  }
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full shrink-0 mt-1.5 ${colours[status] ?? 'bg-slate-400'}`}
    />
  )
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value && value !== 0) return null
  return (
    <div>
      <dt className="text-xs text-slate-500 mb-0.5">{label}</dt>
      <dd className="text-sm text-slate-300">{value}</dd>
    </div>
  )
}

export default function LeadSidebar({ leadId, onClose }: Props) {
  const { token } = useAdminAuth()
  const [lead, setLead] = useState<LeadWithRelations | null>(null)
  const [loading, setLoading] = useState(false)
  const [notes, setNotes] = useState('')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const notesRef = useRef(notes)
  notesRef.current = notes

  const fetchLead = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/leads/${id}`)
      const data = await res.json()
      if (data.success) {
        setLead(data.data)
        setNotes(data.data.notes ?? '')
      }
    } catch {
      // silently fail — sidebar will show empty state
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (leadId) {
      fetchLead(leadId)
    } else {
      setLead(null)
    }
  }, [leadId, fetchLead])

  async function saveNotes() {
    if (!lead) return
    setSaveStatus('saving')
    try {
      await fetch(`/api/leads/${lead.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'x-admin-token': token } : {}),
        },
        body: JSON.stringify({ notes: notesRef.current }),
      })
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch {
      setSaveStatus('idle')
    }
  }

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!leadId) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <aside
        className="fixed right-0 top-0 h-full z-40 w-[480px] bg-[#13131a] border-l border-[#1e1e2e] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {loading || !lead ? (
          <div className="flex-1 flex flex-col">
            {/* Header skeleton */}
            <div className="px-6 py-5 border-b border-[#1e1e2e] flex items-start justify-between">
              {loading ? (
                <div className="space-y-2 animate-pulse flex-1">
                  <div className="h-6 w-48 bg-slate-700 rounded" />
                  <div className="h-4 w-32 bg-slate-800 rounded" />
                </div>
              ) : (
                <p className="text-slate-400 text-sm">Lead not found</p>
              )}
              <button
                onClick={onClose}
                className="ml-4 text-slate-400 hover:text-slate-200 transition-colors shrink-0"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {loading && (
              <div className="flex-1 p-6 space-y-4 animate-pulse">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-12 bg-slate-800 rounded-lg" />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#1e1e2e] shrink-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-slate-100 truncate">
                    {lead.business_name}
                  </h2>
                  <p className="text-sm text-slate-400 mt-0.5">
                    {lead.full_name && <span>{lead.full_name} · </span>}
                    <a
                      href={`mailto:${lead.email}`}
                      className="hover:text-indigo-400 transition-colors"
                    >
                      {lead.email}
                    </a>
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-200 transition-colors shrink-0 mt-0.5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-3">
                <StatusBadge status={lead.status} />
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-5 space-y-7">

                {/* Timeline */}
                {lead.meetings.length > 0 && (
                  <section>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      Timeline
                    </h3>
                    <ol className="space-y-3">
                      {lead.meetings.map((m) => (
                        <li key={m.id} className="flex gap-3">
                          <MeetingStatusDot status={m.status} />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium text-slate-200">
                                📅 <MeetingTypeLabel type={m.meeting_type} />
                              </span>
                              <span
                                className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                                  m.status === 'completed'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : m.status === 'scheduled'
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : m.status === 'no_show'
                                    ? 'bg-red-500/20 text-red-400'
                                    : 'bg-slate-500/20 text-slate-400'
                                }`}
                              >
                                {m.status.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {formatDateTime(m.meeting_time)}
                            </p>
                            {m.meeting_link && (
                              <a
                                href={m.meeting_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors mt-0.5 inline-block"
                              >
                                Join link →
                              </a>
                            )}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                {/* Lead details */}
                <section>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Lead Details
                  </h3>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <DetailRow label="Business type" value={lead.business_type_custom ?? lead.business_type} />
                    <DetailRow label="Region" value={lead.region} />
                    <DetailRow label="Currency" value={lead.currency_code} />
                    <DetailRow label="Phone" value={lead.phone} />
                    {(lead.quote_amount_local || lead.quote_amount_gbp) && (
                      <div className="col-span-2">
                        <dt className="text-xs text-slate-500 mb-0.5">Quote</dt>
                        <dd className="text-sm text-slate-300">
                          {lead.currency_code} {lead.quote_amount_local?.toLocaleString()}
                          {lead.quote_amount_gbp && (
                            <span className="text-slate-500 ml-1.5">
                              (£{lead.quote_amount_gbp?.toLocaleString()} GBP)
                            </span>
                          )}
                        </dd>
                      </div>
                    )}
                    <DetailRow label="Source" value={lead.source} />
                    <DetailRow label="Heard from" value={lead.heard_from} />
                    {lead.style && <DetailRow label="Style" value={lead.style} />}
                    {(lead.primary_colour || lead.secondary_colour) && (
                      <div className="col-span-2">
                        <dt className="text-xs text-slate-500 mb-1">Colours</dt>
                        <dd className="flex items-center gap-2">
                          {lead.primary_colour && (
                            <span className="flex items-center gap-1.5 text-sm text-slate-300">
                              <span
                                className="w-4 h-4 rounded border border-white/10 shrink-0"
                                style={{ backgroundColor: lead.primary_colour }}
                              />
                              {lead.primary_colour}
                            </span>
                          )}
                          {lead.secondary_colour && (
                            <span className="flex items-center gap-1.5 text-sm text-slate-300">
                              <span
                                className="w-4 h-4 rounded border border-white/10 shrink-0"
                                style={{ backgroundColor: lead.secondary_colour }}
                              />
                              {lead.secondary_colour}
                            </span>
                          )}
                        </dd>
                      </div>
                    )}
                    {lead.pages_selected && lead.pages_selected.length > 0 && (
                      <div className="col-span-2">
                        <dt className="text-xs text-slate-500 mb-1">Pages selected</dt>
                        <dd className="flex flex-wrap gap-1.5">
                          {lead.pages_selected.map((p, i) => (
                            <span
                              key={i}
                              className="text-xs bg-slate-800 text-slate-300 border border-[#1e1e2e] px-2 py-0.5 rounded-full"
                            >
                              {p.name} ({p.sections})
                            </span>
                          ))}
                        </dd>
                      </div>
                    )}
                  </dl>
                </section>

                {/* Brief section */}
                {lead.brief && (
                  <section>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      Brief
                    </h3>
                    <div className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Status</span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                            lead.brief.status === 'submitted'
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                              : lead.brief.status === 'sent'
                              ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                              : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                          }`}
                        >
                          {lead.brief.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Deposit</span>
                        <span className="text-sm text-slate-300">
                          {lead.brief.deposit_paid ? (
                            <span className="text-emerald-400 font-medium">Paid</span>
                          ) : (
                            <span className="text-yellow-400">Pending</span>
                          )}
                          {lead.brief.deposit_amount && (
                            <span className="text-slate-500 ml-1.5">
                              ({lead.brief.currency_code} {lead.brief.deposit_amount?.toLocaleString()})
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Rate locked</span>
                        <span
                          className={`text-sm font-medium ${lead.brief.rate_locked ? 'text-emerald-400' : 'text-slate-400'}`}
                        >
                          {lead.brief.rate_locked ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <a
                        href={`/brief/${lead.brief.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors pt-1"
                      >
                        View brief form →
                      </a>
                    </div>
                  </section>
                )}

                {/* Notes */}
                <section>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Notes
                    </h3>
                    {saveStatus === 'saving' && (
                      <span className="text-xs text-slate-500">Saving…</span>
                    )}
                    {saveStatus === 'saved' && (
                      <span className="text-xs text-emerald-400">Saved</span>
                    )}
                  </div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onBlur={saveNotes}
                    rows={4}
                    placeholder="Add internal notes…"
                    className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent resize-none"
                  />
                </section>

                {/* Action buttons */}
                <section>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Actions
                  </h3>
                  <ActionButtons
                    lead={lead}
                    brief={lead.brief}
                    onAction={() => fetchLead(lead.id)}
                  />
                </section>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
