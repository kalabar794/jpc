// Simple JSON storage using JSONBin.io (free tier: 10,000 requests)
// No Vercel deployments triggered!

const BIN_ID = process.env.JSONBIN_BIN_ID
const API_KEY = process.env.JSONBIN_API_KEY
const BASE_URL = 'https://api.jsonbin.io/v3'

export interface ContentItem {
  id: string
  type: 'post' | 'project'
  slug: string
  title: string
  content: string
  date: string
  [key: string]: any
}

export async function getAllContent(): Promise<ContentItem[]> {
  if (!BIN_ID || !API_KEY) {
    console.error('JSONBin not configured')
    return []
  }

  try {
    const response = await fetch(`${BASE_URL}/b/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY
      }
    })
    
    if (!response.ok) throw new Error('Failed to fetch content')
    
    const data = await response.json()
    return data.record.content || []
  } catch (error) {
    console.error('Error fetching content:', error)
    return []
  }
}

export async function saveContent(content: ContentItem[]): Promise<boolean> {
  if (!BIN_ID || !API_KEY) {
    console.error('JSONBin not configured')
    return false
  }

  try {
    const response = await fetch(`${BASE_URL}/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY
      },
      body: JSON.stringify({ content })
    })
    
    return response.ok
  } catch (error) {
    console.error('Error saving content:', error)
    return false
  }
}

export async function createContent(item: Omit<ContentItem, 'id'>): Promise<boolean> {
  const content = await getAllContent()
  const newItem: ContentItem = {
    ...item,
    id: Date.now().toString(),
    date: new Date().toISOString()
  }
  
  content.push(newItem)
  return await saveContent(content)
}

export async function updateContent(id: string, updates: Partial<ContentItem>): Promise<boolean> {
  const content = await getAllContent()
  const index = content.findIndex(item => item.id === id)
  
  if (index === -1) return false
  
  content[index] = { ...content[index], ...updates }
  return await saveContent(content)
}

export async function deleteContent(id: string): Promise<boolean> {
  const content = await getAllContent()
  const filtered = content.filter(item => item.id !== id)
  return await saveContent(filtered)
}