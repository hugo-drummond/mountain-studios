import { revalidatePath } from 'next/cache'
import { crmAdmin } from '@/lib/crm'
import { invalidateCache } from '@/lib/chatbot/questions'

// ---------------------------------------------------------------------------
// /admin/chat-questions
//
// What visitors have asked the chatbot, most-asked first, and the place to turn
// any of it into a canned answer.
//
// Tick "Approved" on a row and that question stops going to DeepSeek: the text
// in the box is what gets sent, word for word, instantly. Leave it unticked and
// the row is only a record of the question having been asked.
//
// A server component behind the /admin cookie, mutating through server actions.
// Server action POSTs go to this same path, so middleware.ts covers them under
// its /admin/:path* matcher — no second auth surface to get wrong.
// ---------------------------------------------------------------------------

export const dynamic = 'force-dynamic'

interface Row {
  id: string
  question: string
  answer: string | null
  approved: boolean
  asked_count: number
  last_asked_at: string
  created_at: string
}

async function save(formData: FormData) {
  'use server'

  const id = String(formData.get('id') ?? '')
  const answer = String(formData.get('answer') ?? '').trim()
  const approved = formData.get('approved') === 'on'

  if (!id) return

  // Approving a row with nothing in the box would serve an empty reply.
  await crmAdmin()
    .from('chat_questions')
    .update({ answer: answer || null, approved: approved && answer.length > 0 })
    .eq('id', id)

  invalidateCache()
  revalidatePath('/admin/chat-questions')
}

async function remove(formData: FormData) {
  'use server'

  const id = String(formData.get('id') ?? '')
  if (!id) return

  await crmAdmin().from('chat_questions').delete().eq('id', id)

  invalidateCache()
  revalidatePath('/admin/chat-questions')
}

export default async function ChatQuestionsPage() {
  const { data, error } = await crmAdmin()
    .from('chat_questions')
    .select('id, question, answer, approved, asked_count, last_asked_at, created_at')
    .order('asked_count', { ascending: false })
    .order('last_asked_at', { ascending: false })
    .limit(300)

  // 42P01 is "relation does not exist" — the migration has not been run yet.
  // Worth saying so plainly rather than rendering an empty page that looks like
  // nobody has asked anything.
  if (error) {
    const missingTable = (error as { code?: string }).code === '42P01'
    return (
      <div className="p-8">
        <h1 className="text-xl font-semibold text-slate-100 mb-3">Chat questions</h1>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-5 text-sm text-amber-200/90 max-w-2xl">
          {missingTable ? (
            <>
              <p className="font-medium mb-2">The chat_questions table does not exist yet.</p>
              <p className="text-amber-200/70">
                Run <code className="text-amber-200">supabase/migrations/chat_questions.sql</code> in the
                Supabase SQL editor. Until then the chatbot works exactly as before — it just asks the
                model every time and keeps no record.
              </p>
            </>
          ) : (
            <p>Could not load questions: {error.message}</p>
          )}
        </div>
      </div>
    )
  }

  const rows = (data ?? []) as Row[]
  const approvedCount = rows.filter((r) => r.approved).length
  const totalAsked = rows.reduce((sum, r) => sum + r.asked_count, 0)

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-xl font-semibold text-slate-100">Chat questions</h1>
      <p className="mt-1.5 text-sm text-slate-400">
        What people have asked the chatbot, most asked first. Write an answer and tick Approved to
        serve it directly — that question stops costing a model call and always comes back worded the
        same way.
      </p>

      <div className="mt-5 flex gap-6 text-sm text-slate-400">
        <span>
          <strong className="text-slate-200">{rows.length}</strong> distinct questions
        </span>
        <span>
          <strong className="text-slate-200">{totalAsked}</strong> times asked
        </span>
        <span>
          <strong className="text-emerald-400">{approvedCount}</strong> answered directly
        </span>
      </div>

      {rows.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">
          Nothing asked yet. Questions appear here as visitors use the chat.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {rows.map((row) => (
            <li
              key={row.id}
              className="rounded-lg border border-[#1e1e2e] bg-[#13131a] p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm text-slate-100 font-medium">{row.question}</p>
                <div className="flex items-center gap-2 shrink-0">
                  {row.approved && (
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                      Approved
                    </span>
                  )}
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-400">
                    asked {row.asked_count}&times;
                  </span>
                </div>
              </div>

              <form action={save} className="mt-3">
                <input type="hidden" name="id" value={row.id} />
                <textarea
                  name="answer"
                  rows={3}
                  defaultValue={row.answer ?? ''}
                  placeholder="The exact reply to send for this question"
                  className="w-full rounded-md border border-[#1e1e2e] bg-[#0a0a0f] px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                />
                <div className="mt-2 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      name="approved"
                      defaultChecked={row.approved}
                      className="h-4 w-4 rounded border-[#1e1e2e] bg-[#0a0a0f]"
                    />
                    Approved — serve this instead of asking the model
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="submit"
                      formAction={remove}
                      className="rounded-md px-3 py-1.5 text-sm text-slate-500 hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
