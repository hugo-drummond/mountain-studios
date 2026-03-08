'use client'

import { useState, useEffect } from 'react'
import type { Lead, Brief, BookingSlot } from '@/types'
import { useAdminAuth } from './AdminAuthContext'

interface Props {
  lead: Lead
  brief?: Brief | null
  onAction: () => void
}

interface ToastMessage {
  id: number
  message: string
}

function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  function showError(message: string) {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  return { toasts, showError }
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  )
}

// ─── Slot picker modal ────────────────────────────────────────────────────────

interface SlotPickerModalProps {
  leadId: string
  token: string | null
  onClose: () => void
  onBooked: () => void
  showError: (msg: string) => void
}

function SlotPickerModal({ leadId, token, onClose, onBooked, showError }: SlotPickerModalProps) {
  const [slots, setSlots] = useState<BookingSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingSlot, setBookingSlot] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSlots() {
      try {
        const res = await fetch('/api/bookings/slots?meeting_type=brief_review')
        const data = await res.json()
        if (data.success) {
          setSlots(data.data ?? [])
        } else {
          showError('Failed to load available slots')
        }
      } catch {
        showError('Failed to load available slots')
      } finally {
        setLoading(false)
      }
    }
    fetchSlots()
  }, [showError])

  async function handleBook(slot: BookingSlot) {
    setBookingSlot(slot.datetime)
    try {
      const res = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'x-admin-token': token } : {}),
        },
        body: JSON.stringify({
          lead_id: leadId,
          meeting_type: 'brief_review',
          slot_datetime: slot.datetime,
          slot_end_datetime: slot.end_datetime,
        }),
      })
      const data = await res.json()
      if (data.success) {
        onBooked()
        onClose()
      } else {
        showError(data.error ?? 'Failed to book meeting')
      }
    } catch {
      showError('Failed to book meeting')
    } finally {
      setBookingSlot(null)
    }
  }

  // Group slots by date
  const slotsByDate = slots.reduce<Record<string, BookingSlot[]>>((acc, slot) => {
    const date = new Date(slot.datetime).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    if (!acc[date]) acc[date] = []
    acc[date].push(slot)
    return acc
  }, {})

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#13131a] border border-[#1e1e2e] rounded-xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1e2e]">
          <h3 className="text-slate-200 font-semibold">Book Meeting Two</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-5">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Spinner />
              <span className="ml-2 text-slate-400 text-sm">Loading slots…</span>
            </div>
          ) : slots.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-10">No available slots found.</p>
          ) : (
            <div className="space-y-5">
              {Object.entries(slotsByDate).map(([date, dateSlots]) => (
                <div key={date}>
                  <p className="text-xs font-medium text-slate-400 mb-2">{date}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {dateSlots
                      .filter((s) => s.available)
                      .map((slot) => {
                        const time = new Date(slot.datetime).toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                        const isBooking = bookingSlot === slot.datetime
                        return (
                          <button
                            key={slot.datetime}
                            onClick={() => handleBook(slot)}
                            disabled={!!bookingSlot}
                            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 border border-indigo-600/30 disabled:opacity-50 transition-colors"
                          >
                            {isBooking ? <Spinner /> : time}
                          </button>
                        )
                      })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main ActionButtons ───────────────────────────────────────────────────────

export default function ActionButtons({ lead, brief, onAction }: Props) {
  const { token } = useAdminAuth()
  const { toasts, showError } = useToast()
  const [loading, setLoading] = useState<string | null>(null)
  const [showSlotPicker, setShowSlotPicker] = useState(false)

  async function callApi(
    url: string,
    method: 'POST' | 'PATCH' = 'POST',
    body?: Record<string, unknown>
  ) {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'x-admin-token': token } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    })
    const data = await res.json()
    if (!res.ok || !data.success) {
      throw new Error(data.error ?? `Request failed (${res.status})`)
    }
    return data
  }

  async function handleSendBrief() {
    setLoading('send_brief')
    try {
      await callApi(`/api/admin/leads/${lead.id}/send-brief`)
      onAction()
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to send brief')
    } finally {
      setLoading(null)
    }
  }

  async function handleOutcome(outcome: 'proceed' | 'nurture') {
    if (outcome === 'nurture') {
      const confirmed = window.confirm(
        'Are you sure you want to move this lead to Nurture? They will be added to the nurture list.'
      )
      if (!confirmed) return
    }
    setLoading(`outcome_${outcome}`)
    try {
      await callApi(`/api/admin/leads/${lead.id}/outcome`, 'POST', { outcome })
      onAction()
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : `Failed to set outcome: ${outcome}`)
    } finally {
      setLoading(null)
    }
  }

  async function handleGenerateSite() {
    if (!brief?.id) {
      showError('No brief found for this lead')
      return
    }
    setLoading('generate_site')
    try {
      await callApi(`/api/admin/briefs/${brief.id}/generate`)
      onAction()
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to start site generation')
    } finally {
      setLoading(null)
    }
  }

  async function handleScheduleProgressReview() {
    // Simple prompt for date/time — in production this would be a slot picker
    const slot = window.prompt('Enter meeting date/time (ISO format, e.g. 2025-09-01T10:00:00):')
    if (!slot) return
    setLoading('progress_review')
    try {
      await callApi(`/api/admin/leads/${lead.id}/schedule-progress-review`, 'POST', {
        slot_datetime: slot,
      })
      onAction()
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to schedule progress review')
    } finally {
      setLoading(null)
    }
  }

  const btnBase =
    'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <>
      {/* Toast notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-red-500/90 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg border border-red-400/50 backdrop-blur-sm"
          >
            {t.message}
          </div>
        ))}
      </div>

      {/* Slot picker modal */}
      {showSlotPicker && (
        <SlotPickerModal
          leadId={lead.id}
          token={token}
          onClose={() => setShowSlotPicker(false)}
          onBooked={onAction}
          showError={showError}
        />
      )}

      {/* Action buttons by status */}
      <div className="flex flex-wrap gap-2">
        {lead.status === 'meeting_one_done' && (
          <button
            onClick={handleSendBrief}
            disabled={loading === 'send_brief'}
            className={`${btnBase} bg-indigo-600 hover:bg-indigo-500 text-white`}
          >
            {loading === 'send_brief' ? <Spinner /> : '📋'}
            Send Brief Form
          </button>
        )}

        {lead.status === 'meeting_two_done' && (
          <>
            <button
              onClick={() => handleOutcome('proceed')}
              disabled={!!loading}
              className={`${btnBase} bg-emerald-600 hover:bg-emerald-500 text-white`}
            >
              {loading === 'outcome_proceed' ? <Spinner /> : '✓'}
              Proceed
            </button>
            <button
              onClick={() => handleOutcome('nurture')}
              disabled={!!loading}
              className={`${btnBase} bg-amber-600 hover:bg-amber-500 text-white`}
            >
              {loading === 'outcome_nurture' ? <Spinner /> : '🌱'}
              Nurture
            </button>
          </>
        )}

        {lead.status === 'deposit_paid' && (
          <button
            onClick={() => setShowSlotPicker(true)}
            disabled={!!loading}
            className={`${btnBase} bg-violet-600 hover:bg-violet-500 text-white`}
          >
            📅 Book Meeting Two
          </button>
        )}

        {lead.status === 'final_payment_received' && (
          <button
            onClick={handleGenerateSite}
            disabled={loading === 'generate_site'}
            className={`${btnBase} bg-teal-600 hover:bg-teal-500 text-white`}
          >
            {loading === 'generate_site' ? <Spinner /> : '🚀'}
            Generate Site
          </button>
        )}

        {lead.status === 'building' && (
          <button
            onClick={handleScheduleProgressReview}
            disabled={loading === 'progress_review'}
            className={`${btnBase} bg-cyan-600 hover:bg-cyan-500 text-white`}
          >
            {loading === 'progress_review' ? <Spinner /> : '📅'}
            Schedule Progress Review
          </button>
        )}
      </div>
    </>
  )
}
