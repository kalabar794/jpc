import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

// Blog Post type
export interface BlogPost {
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
  }
  sys: {
    id: string
    createdAt: string
    updatedAt: string
  }
}

// Get all blog posts
export async function getBlogPosts() {
  const entries = await client.getEntries<BlogPost>({
    content_type: 'blogPost',
    order: ['-fields.publishedDate'],
  })
  
  return entries.items
}

// Get single blog post by slug
export async function getBlogPost(slug: string) {
  const entries = await client.getEntries<BlogPost>({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  })
  
  return entries.items[0] || null
}

// Get featured posts
export async function getFeaturedPosts() {
  const entries = await client.getEntries<BlogPost>({
    content_type: 'blogPost',
    'fields.featured': true,
    order: ['-fields.publishedDate'],
    limit: 3,
  })
  
  return entries.items
}