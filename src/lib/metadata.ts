import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jpc-kappa.vercel.app'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jonathon | AI Marketing & Automation Expert',
    template: '%s | Jonathon'
  },
  description: 'Transform your business with AI-powered marketing strategies. Specializing in automated campaigns, data-driven solutions, and measurable ROI improvements.',
  keywords: ['AI marketing', 'marketing automation', 'data-driven marketing', 'digital transformation', 'GPT-4 marketing', 'AI campaigns'],
  authors: [{ name: 'Jonathon' }],
  creator: 'Jonathon',
  publisher: 'Jonathon',
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
    siteName: 'Jonathon - AI Marketing Expert',
    title: 'Jonathon | AI Marketing & Automation Expert',
    description: 'Transform your business with AI-powered marketing strategies. Specializing in automated campaigns, data-driven solutions, and measurable ROI improvements.',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Jonathon - AI Marketing Expert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jonathon | AI Marketing & Automation Expert',
    description: 'Transform your business with AI-powered marketing strategies.',
    images: ['/api/og'],
    creator: '@jonathon', // Update with your Twitter handle
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