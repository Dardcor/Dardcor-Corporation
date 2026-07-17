import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dardcor Corporation - AI Ecosystem for Modern Development',
  description:
    'Dardcor Ecosystem: AI-powered chat, autonomous coding IDE, and multi-provider AI agent. Deploy agents that plan, code, test, and ship.',
  keywords: ['AI Ecosystem', 'Autonomous Agent', 'AI Code Editor', 'Dardcor AI', 'Dardcor Code', 'Terminal Agent', 'Artificial Intelligence', 'Software Development'],
  openGraph: {
    title: 'Dardcor Corporation - AI Ecosystem for Modern Development',
    description:
      'Three products. One vision. Dardcor AI, Dardcor Code, and Dardcor Agent — built for the AI-native era.',
    type: 'website',
    siteName: 'Dardcor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dardcor Corporation - AI Ecosystem for Modern Development',
    description:
      'Three products. One vision. Dardcor AI, Dardcor Code, and Dardcor Agent — built for the AI-native era.',
  },
  robots: { index: true, follow: true },
}

export const viewport = {
  themeColor: '#04060C',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dardcor Corporation',
  url: 'https://dardcor.web.id',
  description: 'AI Ecosystem for Modern Development including Dardcor AI, Dardcor Code, and Dardcor Agent.',
  sameAs: [
    'https://github.com/Dardcor',
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-[var(--color-bg)] text-[var(--color-white)] antialiased min-h-screen overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
