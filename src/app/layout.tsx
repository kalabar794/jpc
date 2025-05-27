import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import Navigation from '@/components/ui/Navigation'
import { defaultMetadata } from '@/lib/metadata'
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
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="beforeInteractive" />
      </head>
      <body className="min-h-screen bg-white dark:bg-dark-background text-gray-900 dark:text-dark-text antialiased">
        <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
          <Navigation />
          <div className="relative">
            {children}
          </div>
        </ThemeProvider>
        <Script
          id="netlify-identity-redirect"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (window.netlifyIdentity) {
                window.netlifyIdentity.on("init", user => {
                  if (!user) {
                    window.netlifyIdentity.on("login", () => {
                      document.location.href = "/admin/";
                    });
                  }
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}