/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cklxsdlmdbdlkuywcooh.supabase.co' }
    ]
  },
  // Next 14 keeps this under `experimental`; at the top level it is silently
  // ignored and the audit PDF's template and cover art never reach the
  // serverless bundle, so every production render fails with ENOENT.
  experimental: {
    // @sparticuz/chromium resolves its Chrome binary relative to its own
    // node_modules directory. Webpack relocates the package into a chunk, the
    // bin/ folder is left behind, and executablePath() throws. Keeping it (and
    // puppeteer-core with it) external leaves the real package on disk.
    serverComponentsExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],
    outputFileTracingIncludes: {
      // The chromium bin/ folder holds the brotli-compressed browser. Marking
      // the package external keeps it out of the webpack chunk, but tracing
      // still has to be told to ship these — nothing imports them, so they are
      // invisible to static analysis.
      //
      // Keyed by route, and ONLY the audit routes get this. Adding /api/chat
      // here — which it needed while it rendered PDFs in-process — shipped the
      // 66MB browser into the chat function and made its cold start so slow
      // that DeepSeek could not answer inside the 20s timeout. Every chat
      // message on production returned the fallback apology.
      //
      // The chatbot now triggers /api/audit/run over HTTP instead of rendering
      // anything itself, so Chrome belongs in exactly one place. Do not add
      // another route here — give it the HTTP trigger instead.
      '/api/audit/**': [
        './lib/audit-report/**',
        './public/images/audit-report/**',
        './node_modules/@sparticuz/chromium/bin/**',
      ],
    },
  },
}
module.exports = nextConfig
