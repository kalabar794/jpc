import { Metadata } from 'next'
import { getSiteSettingsSync } from './content'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jpc-kappa.vercel.app'

// Get site settings for metadata
function getSiteMetadata() {
  const settings = getSiteSettingsSync()
  
  if (settings) {
    return {
      title: settings.seo?.defaultTitle || settings.site.title,
      description: settings.seo?.defaultDescription || settings.site.description,
      author: settings.site.author,
      siteName: settings.site.title
    }
  }
  
  // Fallback if no settings file
  return {
    title: 'Jonathon | AI Marketing & Automation Expert',
    description: 'Transform your business with AI-powered marketing strategies. Specializing in automated campaigns, data-driven solutions, and measurable ROI improvements.',
    author: 'Jonathon',
    siteName: 'Jonathon - AI Marketing Expert'
  }
}

const siteMetadata = getSiteMetadata()

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.author}`
  },
  description: siteMetadata.description,
  keywords: ['AI marketing', 'marketing automation', 'data-driven marketing', 'digital transformation', 'GPT-4 marketing', 'AI campaigns'],
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  publisher: siteMetadata.author,
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteMetadata.siteName,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: siteMetadata.siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: ['/api/og'],
    creator: `@${siteMetadata.author.toLowerCase()}`,
  },
  verification: {
    google: '', // Add your Google Search Console verification code later
  },
}

// Helper function to generate page-specific metadata
export function generateMetadata(
  title: string,
  description: string,
  path: string = '',
  image?: string
): Metadata {
  const url = `${siteUrl}${path}`
  const ogImage = image || `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description.substring(0, 100))}`
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ 
        url: ogImage, 
        width: 1200, 
        height: 630, 
        alt: title 
      }],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}