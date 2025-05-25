import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { TinaProvider } from '@/components/providers/TinaProvider'
import Navigation from '@/components/ui/Navigation'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Jonathon - AI & Marketing Expert',
    default: 'Jonathon - AI & Marketing Expert | Portfolio',
  },
  description: 'Professional portfolio showcasing AI-powered marketing solutions, creative projects, and innovative digital strategies.',
  keywords: ['AI Marketing', 'Digital Strategy', 'Portfolio', 'Creative Solutions', 'Automation'],
  authors: [{ name: 'Jonathon' }],
  creator: 'Jonathon',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Jonathon - AI & Marketing Expert',
    description: 'Professional portfolio showcasing AI-powered marketing solutions and creative projects.',
    siteName: 'Jonathon Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jonathon - AI & Marketing Expert',
    description: 'Professional portfolio showcasing AI-powered marketing solutions and creative projects.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-dark-background text-gray-900 dark:text-dark-text antialiased">
        <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
          <TinaProvider>
            <Navigation />
            <div className="relative">
              {children}
            </div>
          </TinaProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}