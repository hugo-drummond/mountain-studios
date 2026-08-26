/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cklxsdlmdbdlkuywcooh.supabase.co' }
    ]
  },
  // The free website audit we sell checks for five security headers by name and
  // scores their presence. Our own site shipped with only Vercel's
  // strict-transport-security, so it scored 1/5 on its own report.
  //
  // The CSP here is deliberately permissive: app/layout.tsx carries three inline
  // <script> blocks (JSON-LD, gtag-init, meta-pixel), so 'unsafe-inline' on
  // script-src is required until those move to nonces. It still buys real
  // protection against framing, mixed content and untrusted script hosts.
  //
  // The origin allowlist below was taken from an actual PageSpeed Insights
  // network trace of the homepage, not guessed. Adding a third-party script
  // means adding its origin here or it will be blocked silently in the console.
  async headers() {
    // React Fast Refresh evaluates strings as JavaScript, so `next dev` throws
    // an EvalError on every page load without 'unsafe-eval'. It is dev-only —
    // a production build contains no react-refresh runtime — so the allowance
    // is scoped to development rather than weakening the shipped policy.
    const devEval = process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${devEval} https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://www.google.com https://www.gstatic.com`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://connect.facebook.net https://*.facebook.com https://*.supabase.co https://www.google.com",
      "frame-src 'self' blob: https://www.google.com https://td.doubleclick.net",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      'upgrade-insecure-requests',
    ].join('; ')

    const shared = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ]

    return [
      {
        // Everything except /p/. A generated client preview is arbitrary HTML
        // holding remote images, remote fonts and inline styles, and our CSP
        // would break it. The negative lookahead is what keeps /p/ out — Next
        // applies every matching source, so a separate looser entry for /p/
        // would not override this one, it would stack with it.
        source: '/((?!p/).*)',
        headers: [
          ...shared,
          // SAMEORIGIN, not DENY: the wizard renders its in-page preview in an
          // iframe from a blob: URL.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
      {
        source: '/p/:path*',
        headers: shared,
      },
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
