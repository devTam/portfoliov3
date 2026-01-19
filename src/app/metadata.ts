import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tammy Inoma-Batubo | Senior Software Engineer Portfolio',
  description:
    '5+ years of experience in full-stack development. Specialized in React, TypeScript, Node.js, and Web3. Available for freelance and team opportunities.',
  keywords: [
    'software engineer',
    'full-stack developer',
    'frontend developer',
    'frontend engineer',
    'React',
    'TypeScript',
    'Node.js',
    'Web3',
  ],
  openGraph: {
    title: 'Tammy Inoma-Batubo | Senior Software Engineer',
    description: 'Portfolio showcasing 5+ years of software development experience',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tammy Inoma-Batubo Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tammy Inoma-Batubo | Senior Software Engineer',
    description: 'Portfolio showcasing 5+ years of software development experience',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}
