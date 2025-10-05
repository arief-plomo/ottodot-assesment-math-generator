import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingSpinner } from './components/loading-spinner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'Math Adventure - Primary 5',
    template: '%s | Math Adventure'
  },
  description: 'AI-powered interactive math problem generator for Primary 5 students with Singapore Math curriculum',
  keywords: ['math', 'primary 5', 'singapore', 'education', 'AI', 'learning'],
  authors: [{ name: 'Math Adventure Team' }],
  creator: 'Math Adventure',
  publisher: 'Math Adventure',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://math-adventure.com'),
  openGraph: {
    type: 'website',
    locale: 'en_SG',
    url: 'https://math-adventure.com',
    title: 'Math Adventure - Primary 5',
    description: 'AI-powered interactive math problem generator for Primary 5 students',
    siteName: 'Math Adventure',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Math Adventure - Interactive Learning Platform'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Math Adventure - Primary 5',
    description: 'AI-powered interactive math problem generator for Primary 5 students',
    images: ['/twitter-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body 
        className={`${inter.className} antialiased min-h-screen bg-background text-foreground overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* Skip Navigation Links */}
        <div className="sr-only">
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <a href="#navigation" className="skip-link">
            Skip to navigation
          </a>
        </div>

        <ErrorBoundary>
          <div className="relative flex min-h-screen flex-col">
            <Suspense 
              fallback={
                <div 
                  className="flex h-screen items-center justify-center"
                  role="status"
                  aria-label="Loading application"
                >
                  <LoadingSpinner size="lg" text="Loading Math Adventure..." />
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
        </ErrorBoundary>
        
        {/* Background decorative elements */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]" />
      </body>
    </html>
  )
}
