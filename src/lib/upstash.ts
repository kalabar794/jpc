import { Redis } from '@upstash/redis'

// Initialize Redis client - will use env vars: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export interface ContentData {
  id: string
  type: 'post' | 'project'
  slug: string
  title: string
  status: string
  date: string
  content?: string
  description?: string
  heroImage?: string
  excerpt?: string
  featured?: boolean
  category?: string
  tags?: string[]
  techStack?: string[]
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
  og?: {
    title?: string
    description?: string
    image?: string
  }
  [key: string]: any
}

// Content operations
export async function getAllContent(type: 'post' | 'project'): Promise<ContentData[]> {
  try {
    const keys = await redis.keys(`content:${type}:*`)
    if (!keys.length) return []
    
    const contents = await Promise.all(
      keys.map(key => redis.get<ContentData>(key))
    )
    
    return contents
      .filter(Boolean)
      .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()) as ContentData[]
  } catch (error) {
    console.error('Error fetching content:', error)
    return []
  }
}

export async function getContent(type: 'post' | 'project', slug: string): Promise<ContentData | null> {
  try {
    const content = await redis.get<ContentData>(`content:${type}:${slug}`)
    return content
  } catch (error) {
    console.error('Error fetching content:', error)
    return null
  }
}

export async function createContent(data: Omit<ContentData, 'id'>): Promise<boolean> {
  try {
    const id = Date.now().toString()
    const contentData: ContentData = {
      ...data,
      id,
      date: data.date || new Date().toISOString()
    }
    
    await redis.set(`content:${data.type}:${data.slug}`, contentData)
    return true
  } catch (error) {
    console.error('Error creating content:', error)
    return false
  }
}

export async function updateContent(
  type: 'post' | 'project',
  slug: string,
  updates: Partial<ContentData>
): Promise<boolean> {
  try {
    const existing = await getContent(type, slug)
    if (!existing) return false
    
    const updated = { ...existing, ...updates }
    await redis.set(`content:${type}:${slug}`, updated)
    
    // If slug changed, delete old key
    if (updates.slug && updates.slug !== slug) {
      await redis.del(`content:${type}:${slug}`)
      await redis.set(`content:${type}:${updates.slug}`, updated)
    }
    
    return true
  } catch (error) {
    console.error('Error updating content:', error)
    return false
  }
}

export async function deleteContent(type: 'post' | 'project', slug: string): Promise<boolean> {
  try {
    await redis.del(`content:${type}:${slug}`)
    return true
  } catch (error) {
    console.error('Error deleting content:', error)
    return false
  }
}// Force rebuild Mon May 26 16:24:04 PDT 2025
