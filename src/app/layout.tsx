import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import Navigation from '@/components/ui/Navigation'
import { defaultMetadata, generateEnhancedPersonStructuredData, generateEnhancedOrganizationStructuredData } from '@/lib/metadata'
import StructuredData from '@/components/seo/StructuredData'
import Script from 'next/script'

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jpc-kappa.vercel.app'
  
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="beforeInteractive" />
        <StructuredData data={generateEnhancedPersonStructuredData(siteUrl)} />
        <StructuredData data={generateEnhancedOrganizationStructuredData(siteUrl)} />
      </head>
      <body className="min-h-screen bg-white dark:bg-dark-background text-gray-900 dark:text-dark-text antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <Navigation />
          <div className="relative pt-20">
            {children}
          </div>
        </ThemeProvider>
        <Script
          src="/netlify-identity-init.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}