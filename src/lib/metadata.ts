import { Metadata } from 'next'
import { getSiteSettingsSync } from './content'

// Advanced SEO keyword targets for AI marketing authority - optimized for top 3 rankings
const HIGH_VALUE_KEYWORDS = [
  // Primary target keywords for top 3 rankings
  'AI marketing consultant',
  'AI marketing strategy consultant', 
  'AI marketing automation expert',
  'AI marketing specialist consultant',
  
  // High-value commercial keywords
  'hire AI marketing consultant',
  'best AI marketing consultant',
  'AI marketing consulting services',
  'AI marketing strategy development',
  
  // Long-tail semantic keywords
  'AI-powered marketing campaigns expert',
  'machine learning marketing consultant',
  'ChatGPT marketing strategy consultant',
  'AI marketing ROI optimization',
  'marketing automation consulting services',
  'AI marketing tools consultant',
  'predictive marketing analytics expert',
  'AI content marketing specialist',
  'marketing AI implementation consultant',
  
  // Location-based keywords for local SEO
  'AI marketing consultant near me',
  'AI marketing consultant services',
  'professional AI marketing consultant'
]

// Schema.org enhanced structured data for better rankings
const ENHANCED_SCHEMA_DATA = {
  organization: {
    '@type': 'Organization',
    name: 'Jonathon AI Marketing Consulting',
    description: 'Leading AI marketing consultant specializing in automation strategies, ChatGPT marketing, and ROI-driven campaigns',
    url: 'https://jpc-kappa.vercel.app',
    logo: 'https://jpc-kappa.vercel.app/logo.png',
    sameAs: [
      'https://linkedin.com/in/jonathon',
      'https://twitter.com/jonathon'
    ],
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Marketing Strategy Consulting',
            description: 'Expert AI marketing strategy development and implementation'
          }
        },
        {
          '@type': 'Offer', 
          itemOffered: {
            '@type': 'Service',
            name: 'Marketing Automation Setup',
            description: 'Complete marketing automation workflow implementation'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service', 
            name: 'ChatGPT Marketing Training',
            description: 'ChatGPT prompt engineering and marketing optimization'
          }
        }
      ]
    }
  },
  
  person: {
    '@type': 'Person',
    name: 'Jonathon',
    jobTitle: 'AI Marketing Consultant & Automation Expert',
    description: 'Expert AI marketing consultant with proven track record in automation strategies, ChatGPT marketing, and ROI optimization',
    url: 'https://jpc-kappa.vercel.app',
    sameAs: [
      'https://linkedin.com/in/jonathon',
      'https://twitter.com/jonathon'
    ],
    knowsAbout: [
      'AI Marketing Strategy',
      'Marketing Automation',
      'ChatGPT Marketing',
      'Machine Learning Marketing', 
      'Predictive Analytics',
      'ROI Optimization',
      'Digital Marketing Strategy'
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'AI Marketing Consultant',
      occupationLocation: {
        '@type': 'Place',
        name: 'Worldwide'
      },
      skills: [
        'AI Marketing Strategy',
        'Marketing Automation',
        'ChatGPT Prompt Engineering',
        'ROI Analysis',
        'Campaign Optimization'
      ]
    }
  }
}

// Blog post schema types for structured data
export interface BlogPostMetadata {
  title: string
  description: string
  slug: string
  publishDate: string
  modifiedDate?: string
  author: string
  category: string
  tags: string[]
  readTime: number
  image?: string
  excerpt: string
}

// Structured data generators
export function generateBlogPostStructuredData(post: BlogPostMetadata, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
      url: siteUrl,
      jobTitle: 'AI Marketing Specialist',
      alumniOf: 'University of Leicester',
      knowsAbout: ['AI Marketing', 'Marketing Automation', 'Digital Strategy']
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jonathon AI Marketing',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`
      }
    },
    datePublished: post.publishDate,
    dateModified: post.modifiedDate || post.publishDate,
    image: post.image ? `${siteUrl}${post.image}` : `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}`,
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    articleSection: post.category,
    keywords: post.tags.join(', '),
    timeRequired: `PT${post.readTime}M`,
    about: {
      '@type': 'Thing',
      name: 'AI Marketing',
      description: 'Artificial Intelligence applications in marketing and automation'
    }
  }
}

export function generatePersonStructuredData(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jonathon Carter',
    jobTitle: 'AI Marketing Specialist',
    description: 'Expert in AI-powered marketing strategies, automation, and data-driven campaign optimization',
    url: siteUrl,
    sameAs: [
      'https://linkedin.com/in/jonathon-ai-marketing',
      'https://twitter.com/jonathon_ai'
    ],
    knowsAbout: [
      'Artificial Intelligence Marketing',
      'Marketing Automation',
      'Data-Driven Marketing',
      'Campaign Optimization',
      'Machine Learning Applications',
      'Digital Transformation'
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Leicester',
      address: 'Leicester, UK'
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: "Master's in Marketing Management",
        credentialCategory: 'degree',
        educationalLevel: 'Master'
      }
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Independent AI Marketing Consultant'
    }
  }
}

export function generateOrganizationStructuredData(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Jonathon AI Marketing',
    description: 'AI-powered marketing consulting and automation services',
    url: siteUrl,
    founder: {
      '@type': 'Person',
      name: 'Jonathon Carter'
    },
    areaServed: ['United States', 'United Kingdom', 'Global'],
    serviceType: [
      'AI Marketing Strategy',
      'Marketing Automation',
      'Campaign Optimization',
      'Data Analytics',
      'Digital Transformation'
    ],
    priceRange: '$$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Marketing Audit',
            description: 'Comprehensive analysis of current marketing performance with AI optimization recommendations'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Marketing Automation Setup',
            description: 'End-to-end implementation of AI-powered marketing automation systems'
          }
        }
      ]
    }
  }
}

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
  
  // Fallback if no settings file - optimized for "AI marketing consultant" rankings
  return {
    title: 'AI Marketing Consultant | Expert AI Marketing Strategy & Automation | Jonathon',
    description: 'Leading AI marketing consultant specializing in automation strategies, ChatGPT marketing, and ROI-driven campaigns. Transform your business with proven AI marketing expertise and measurable results.',
    author: 'Jonathon',
    siteName: 'Jonathon - AI Marketing Consultant'
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
  keywords: HIGH_VALUE_KEYWORDS,
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

// Enhanced helper function to generate page-specific metadata
export function generateEnhancedPersonStructuredData(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    ...ENHANCED_SCHEMA_DATA.person,
    url: siteUrl
  }
}

export function generateEnhancedOrganizationStructuredData(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    ...ENHANCED_SCHEMA_DATA.organization,
    url: siteUrl
  }
}

// Enhanced FAQ Schema for better featured snippets
export function generateFAQStructuredData(faqs: Array<{question: string, answer: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// Service Schema for better local SEO
export function generateServiceStructuredData(serviceName: string, description: string, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'Person',
      name: 'Jonathon',
      jobTitle: 'AI Marketing Consultant'
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: ENHANCED_SCHEMA_DATA.organization.hasOfferCatalog,
    url: siteUrl
  }
}

export function generateMetadata(
  title: string,
  description: string,
  path: string = '',
  options: {
    image?: string
    keywords?: string[]
    type?: 'website' | 'article'
    publishDate?: string
    modifiedDate?: string
    author?: string
    category?: string
    structuredData?: any
    isHomepage?: boolean
  } = {}
): Metadata {
  const url = `${siteUrl}${path}`
  const ogImage = options.image || `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description.substring(0, 100))}`
  
  // Enhanced SEO for homepage and key pages
  const enhancedKeywords = options.isHomepage 
    ? HIGH_VALUE_KEYWORDS.slice(0, 10) // Top 10 keywords for homepage
    : HIGH_VALUE_KEYWORDS.filter(keyword => 
        title.toLowerCase().includes(keyword.toLowerCase()) ||
        description.toLowerCase().includes(keyword.toLowerCase())
      )
  
  const combinedKeywords = [...(options.keywords || []), ...enhancedKeywords]
  
  const metadata: Metadata = {
    title,
    description,
    keywords: combinedKeywords,
    openGraph: {
      title,
      description,
      url,
      type: options.type || 'website',
      images: [{ 
        url: ogImage, 
        width: 1200, 
        height: 630, 
        alt: title 
      }],
      siteName: siteMetadata.siteName,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@jonathon_ai',
    },
    alternates: {
      canonical: url,
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
  }

  // Add article-specific metadata for blog posts
  if (options.type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: options.publishDate,
      modifiedTime: options.modifiedDate,
      authors: [options.author || siteMetadata.author],
      section: options.category,
    }
  }

  return metadata
}

// Blog-specific metadata generator
export function generateBlogPostMetadata(post: BlogPostMetadata): Metadata {
  const structuredData = generateBlogPostStructuredData(post, siteUrl)
  
  return generateMetadata(
    post.title,
    post.description,
    `/blog/${post.slug}`,
    {
      image: post.image,
      keywords: [...HIGH_VALUE_KEYWORDS, ...post.tags],
      type: 'article',
      publishDate: post.publishDate,
      modifiedDate: post.modifiedDate,
      author: post.author,
      category: post.category,
      structuredData
    }
  )
}

// Generate keyword-rich metadata for specific pages
export function generateServicePageMetadata(
  service: string,
  description: string,
  keywords: string[]
): Metadata {
  return generateMetadata(
    `${service} | AI Marketing Expert`,
    description,
    `/${service.toLowerCase().replace(/\s+/g, '-')}`,
    {
      keywords: [...HIGH_VALUE_KEYWORDS, ...keywords],
      type: 'website'
    }
  )
}