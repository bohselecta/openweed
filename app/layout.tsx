import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OpenWeed - Cannabis Delivery Network',
  description: 'Your local weed network — delivered by people you know. Connect with verified drivers in your area for safe, reliable cannabis delivery.',
  keywords: 'cannabis, delivery, weed, marijuana, local, drivers, Austin, Texas',
  authors: [{ name: 'OpenWeed Team' }],
  creator: 'OpenWeed',
  publisher: 'OpenWeed',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://openweed.co'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'OpenWeed - Cannabis Delivery Network',
    description: 'Your local weed network — delivered by people you know.',
    url: 'https://openweed.co',
    siteName: 'OpenWeed',
    images: [
      {
        url: '/graphic-logo.png',
        width: 1200,
        height: 630,
        alt: 'OpenWeed Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenWeed - Cannabis Delivery Network',
    description: 'Your local weed network — delivered by people you know.',
    images: ['/graphic-logo.png'],
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
