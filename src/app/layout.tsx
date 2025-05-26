import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { TinaProvider } from '@/components/providers/TinaProvider'
import Navigation from '@/components/ui/Navigation'
import { defaultMetadata } from '@/lib/metadata'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = defaultMetadata

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