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
      // Keyed by route, so every entry point that can reach runAudit() needs
      // its own entry. /api/chat starts audits too since the chatbot was given
      // the ability to run one, and it shipped without this — the render threw
      // "/var/task/node_modules/@sparticuz/chromium/bin does not exist" and the
      // visitor silently got the plain written report instead of the PDF.
      // Adding an audit caller without adding it here will do that again.
      '/api/audit/**': [
        './lib/audit-report/**',
        './public/images/audit-report/**',
        './node_modules/@sparticuz/chromium/bin/**',
      ],
      '/api/chat/**': [
        './lib/audit-report/**',
        './public/images/audit-report/**',
        './node_modules/@sparticuz/chromium/bin/**',
      ],
    },
  },
}
module.exports = nextConfig
