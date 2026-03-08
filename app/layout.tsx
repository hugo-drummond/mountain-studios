import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import './globals.css'
import RecaptchaProvider from '../components/site/RecaptchaProvider'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  variable: '--font-source-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mountain Studios',
  description: 'Web Design · Cape Town · One conversation. Done.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={sourceSans.variable} style={{ fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif', margin: 0 }}>
        <RecaptchaProvider>{children}</RecaptchaProvider>
      </body>
    </html>
  )
}
