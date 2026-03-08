'use client'

import { useState } from 'react'

export default function MomentBankPage() {
  const [form, setForm] = useState({
    creator_name: '',
    channel_url: '',
    platform: 'youtube',
    email: '',
    niche: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/momentbank/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Something went wrong')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setErrorMsg('Network error — please try again')
      setStatus('error')
    }
  }

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          <span className="text-white">Moment</span>
          <span className="text-blue-400">Bank</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-2">
          We clip your best moments and post them everywhere — so you can focus on creating.
        </p>
        <p className="text-slate-500">
          YouTube Shorts, TikTok, Instagram Reels — all handled.
        </p>
      </div>

      {/* How it works */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              step: '1',
              title: 'You create',
              desc: 'Keep making your content as usual. We watch your uploads automatically.',
            },
            {
              step: '2',
              title: 'We clip',
              desc: 'AI finds your best moments. We edit, caption, and format for every platform.',
            },
            {
              step: '3',
              title: 'You grow',
              desc: 'Clips go live on our channels with links back to you. New viewers find your content.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold mb-3">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Signup form */}
        {status === 'success' ? (
          <div className="max-w-md mx-auto text-center bg-green-900/20 border border-green-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-2">Application received!</h2>
            <p className="text-slate-400">
              We&apos;ll review your channel and get back to you within 48 hours.
            </p>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Apply for a free trial
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Creator / Channel name</label>
                <input
                  type="text"
                  required
                  value={form.creator_name}
                  onChange={(e) => update('creator_name', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. MrBeast"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Channel URL</label>
                <input
                  type="url"
                  required
                  value={form.channel_url}
                  onChange={(e) => update('channel_url', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="https://youtube.com/@yourchannel"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Platform</label>
                <select
                  value={form.platform}
                  onChange={(e) => update('platform', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="youtube">YouTube</option>
                  <option value="twitch">Twitch</option>
                  <option value="kick">Kick</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Content niche</label>
                <input
                  type="text"
                  value={form.niche}
                  onChange={(e) => update('niche', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. gaming, commentary, vlogs"
                />
              </div>

              {errorMsg && (
                <p className="text-red-400 text-sm">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {status === 'loading' ? 'Submitting...' : 'Apply now'}
              </button>

              <p className="text-xs text-slate-500 text-center">
                No payment required. We&apos;ll start with a free trial week.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
