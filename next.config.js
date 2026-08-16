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
      '/api/audit/**': ['./lib/audit-report/**', './public/images/audit-report/**'],
    },
  },
}
module.exports = nextConfig
