// Enhanced SEO utilities for AI marketing blog
import { Metadata } from 'next'
import { Post } from './content'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stalwart-smakager-b57fc1.netlify.app'

interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  author: string
  siteName: string
  url: string
  image?: string
  type: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  category?: string
  tags?: string[]
  readingTime?: number
}

// AI Marketing focused keywords for better SEO
export const AI_MARKETING_KEYWORDS = [
  'AI marketing',
  'marketing automation',
  'ChatGPT marketing',
  'artificial intelligence marketing',
  'AI-powered campaigns',
  'machine learning marketing',
  'generative AI marketing',
  'AI personalization',
  'predictive analytics marketing',
  'AI content creation',
  'marketing AI tools',
  'automated marketing strategies',
  'AI customer insights',
  'intelligent marketing',
  'AI marketing trends',
  'marketing optimization AI',
  'AI advertising',
  'conversational AI marketing',
  'AI email marketing',
  'AI social media marketing'
]

// Generate comprehensive metadata for blog posts
export function generateBlogPostMetadata(post: Post): Metadata {
  const url = `${siteUrl}/blog/${post.slug}`
  const readingTime = Math.ceil(post.content.split(' ').length / 200)
  
  // Enhanced SEO title
  const seoTitle = post.seo?.title || `${post.title} | AI Marketing Expert`
  
  // Enhanced SEO description
  const seoDescription = post.seo?.description || post.excerpt
  
  // Combine post-specific keywords with AI marketing keywords (with safety checks)
  const postKeywords = post.seo?.keywords ? 
    (typeof post.seo.keywords === 'string' ? post.seo.keywords.split(', ') : post.seo.keywords) : []
  const postTags = Array.isArray(post.tags) ? post.tags : []
  const allKeywords = Array.from(new Set([...postKeywords, ...postTags, ...AI_MARKETING_KEYWORDS.slice(0, 10)]))
  
  // Generate Open Graph image
  const ogImage = post.heroImage || `/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&readTime=${readingTime}`

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: allKeywords,
    authors: [{ name: post.author || 'Jonathon' }],
    creator: post.author || 'Jonathon',
    publisher: 'Jonathon - AI Marketing Expert',
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
      title: seoTitle,
      description: seoDescription,
      url,
      siteName: 'Jonathon - AI Marketing Expert',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author || 'Jonathon'],
      section: post.category,
      tags: Array.isArray(post.tags) ? post.tags : [],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [ogImage],
      creator: '@jonathonai',
    },
    alternates: {
      canonical: url,
    },
    other: {
      'article:reading_time': readingTime.toString(),
      'article:word_count': post.content.split(' ').length.toString(),
    },
  }
}

// Generate structured data (JSON-LD) for blog posts
export function generateBlogPostStructuredData(post: Post) {
  const url = `${siteUrl}/blog/${post.slug}`
  const readingTime = Math.ceil(post.content.split(' ').length / 200)
  const wordCount = post.content.split(' ').length
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage || `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}`,
    url,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'Jonathon',
      url: siteUrl,
      sameAs: [
        'https://twitter.com/jonathonai',
        'https://linkedin.com/in/jonathon'
      ]
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jonathon - AI Marketing Expert',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    articleSection: post.category,
    keywords: Array.isArray(post.tags) ? post.tags.join(', ') : '',
    wordCount,
    timeRequired: `PT${readingTime}M`,
    about: {
      '@type': 'Thing',
      name: 'AI Marketing',
      description: 'Artificial Intelligence applications in marketing and automation'
    },
    mentions: Array.isArray(post.tags) ? post.tags.map(tag => ({
      '@type': 'Thing',
      name: tag
    })) : []
  }
}

// Generate FAQ structured data for AI marketing content
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

// Generate How-To structured data for tutorial content
export function generateHowToStructuredData(title: string, steps: Array<{name: string, text: string, image?: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: `Step-by-step guide: ${title}`,
    totalTime: 'PT30M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0'
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Computer or mobile device'
      },
      {
        '@type': 'HowToSupply', 
        name: 'Internet connection'
      }
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'ChatGPT or AI marketing tools'
      }
    ],
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image
    }))
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(path: string, title: string) {
  const breadcrumbs = [
    { name: 'Home', url: siteUrl },
    { name: 'Blog', url: `${siteUrl}/blog` },
    { name: title, url: `${siteUrl}${path}` }
  ]
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

// Generate organization structured data
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Jonathon - AI Marketing Expert',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'AI marketing expert specializing in automation, data-driven strategies, and measurable ROI improvements.',
    sameAs: [
      'https://twitter.com/jonathonai',
      'https://linkedin.com/in/jonathon'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${siteUrl}/contact`
    },
    founder: {
      '@type': 'Person',
      name: 'Jonathon',
      jobTitle: 'AI Marketing Expert',
      url: siteUrl
    },
    areaServed: 'Worldwide',
    serviceType: 'AI Marketing Consulting'
  }
}

// Enhanced metadata for collection pages
export function generateCollectionMetadata(
  title: string,
  description: string,
  path: string,
  itemCount?: number
): Metadata {
  const url = `${siteUrl}${path}`
  
  return {
    title: `${title} | AI Marketing Expert`,
    description,
    keywords: AI_MARKETING_KEYWORDS,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`],
    },
    alternates: {
      canonical: url,
    },
    other: itemCount ? {
      'page:item_count': itemCount.toString(),
    } : {},
  }
}