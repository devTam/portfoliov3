import type { Metadata } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-mono',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tammybatubo.com'),
  title: 'Tammy Inoma-Batubo | Senior Software Engineer Portfolio',
  description:
    '5+ years of experience in full-stack development. Specialized in React, TypeScript, Node.js, and Web3. Available for freelance and team opportunities.',
  keywords: [
    'software engineer',
    'full-stack developer',
    'React',
    'TypeScript',
    'Node.js',
    'Web3',
  ],
  openGraph: {
    title: 'Tammy Inoma-Batubo | Senior Software Engineer',
    description: 'Portfolio showcasing 5+ years of software development experience',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tammy Inoma-Batubo | Senior Software Engineer',
    description: 'Portfolio showcasing 5+ years of software development experience',
  },
  icons: {
    icon: '/ai-avatar.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
