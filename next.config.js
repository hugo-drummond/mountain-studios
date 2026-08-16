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
    outputFileTracingIncludes: {
      '/api/audit/**': ['./lib/audit-report/**', './public/images/audit-report/**'],
    },
  },
}
module.exports = nextConfig
