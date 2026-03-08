'use client'

import type { LeadStatus } from '@/types'

const STATUS_COLOURS: Record<LeadStatus, string> = {
  new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  quoted: 'bg-blue-400/20 text-blue-300 border-blue-400/30',
  booked: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  meeting_one_done: 'bg-purple-400/20 text-purple-300 border-purple-400/30',
  brief_sent: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  brief_received: 'bg-indigo-400/20 text-indigo-300 border-indigo-400/30',
  deposit_pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  deposit_paid: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  meeting_two_booked: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  meeting_two_done: 'bg-violet-400/20 text-violet-300 border-violet-400/30',
  awaiting_final_payment: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  nurture: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
  final_payment_received: 'bg-green-500/20 text-green-400 border-green-500/30',
  building: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  review: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  complete: 'bg-green-400/20 text-green-300 border-green-400/30',
  lost: 'bg-red-500/20 text-red-400 border-red-500/30',
}

function formatLabel(status: LeadStatus): string {
  return status
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function StatusBadge({ status }: { status: LeadStatus }) {
  const colours = STATUS_COLOURS[status] ?? 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colours}`}
    >
      {formatLabel(status)}
    </span>
  )
}
