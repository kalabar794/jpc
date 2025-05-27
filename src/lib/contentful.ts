import { createClient } from 'contentful'

const client = process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN 
  ? createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    })
  : null

// Blog Post type
export interface BlogPost {
  contentTypeId: 'blogPost'
  fields: {
    title: string
    slug: string
    excerpt: string
    content: string
    heroImage?: {
      fields: {
        file: {
          url: string
        }
      }
    }
    publishedDate: string
    category: string
    tags?: string[]
    seoTitle?: string
    seoDescription?: string
    seoKeywords?: string[]
    featured?: boolean
  }
}

// Get all blog posts
export async function getBlogPosts() {
  if (!client) {
    console.log('Contentful not configured, skipping blog posts fetch')
    return []
  }
  
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      order: ['-fields.publishedDate'],
    })
    
    return entries.items
  } catch (error) {
    console.error('Error fetching blog posts from Contentful:', error)
    return []
  }
}

// Get single blog post by slug
export async function getBlogPost(slug: string) {
  if (!client) {
    console.log('Contentful not configured, skipping blog post fetch')
    return null
  }
  
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    })
    
    return entries.items[0] || null
  } catch (error) {
    console.error('Error fetching blog post from Contentful:', error)
    return null
  }
}

// Get featured posts
export async function getFeaturedPosts() {
  if (!client) {
    console.log('Contentful not configured, skipping featured posts fetch')
    return []
  }
  
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.featured': true,
      order: ['-fields.publishedDate'],
      limit: 3,
    })
    
    return entries.items
  } catch (error) {
    console.error('Error fetching featured posts from Contentful:', error)
    return []
  }
}