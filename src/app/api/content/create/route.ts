import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, slug, ...data } = body
    
    if (!type || !slug) {
      return NextResponse.json({ error: 'Type and slug are required' }, { status: 400 })
    }
    
    // Extract content/description
    const content = data.content || data.description || ''
    delete data.content
    delete data.description
    
    // Create frontmatter
    const frontmatter = matter.stringify(content, data)
    
    // Determine directory
    const contentDir = path.join(process.cwd(), 'content', type === 'post' ? 'posts' : 'projects')
    const filePath = path.join(contentDir, `${slug}.md`)
    
    // Check if file already exists
    try {
      await fs.access(filePath)
      return NextResponse.json({ error: 'Content with this slug already exists' }, { status: 409 })
    } catch {
      // File doesn't exist, we can create it
    }
    
    // Ensure directory exists
    await fs.mkdir(contentDir, { recursive: true })
    
    // Write file
    await fs.writeFile(filePath, frontmatter)
    
    return NextResponse.json({ success: true, slug, type })
  } catch (error) {
    console.error('Error creating content:', error)
    // In production, we can't write to the filesystem
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ 
        error: 'Content creation is not available in production. Please create content locally and push to Git.', 
        details: 'Vercel serverless functions cannot write to the filesystem.'
      }, { status: 501 })
    }
    return NextResponse.json({ error: 'Failed to create content', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}