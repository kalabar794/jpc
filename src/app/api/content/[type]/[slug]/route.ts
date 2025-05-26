import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export async function GET(
  request: Request,
  { params }: { params: { type: string; slug: string } }
) {
  try {
    const { type, slug } = params
    const contentDir = path.join(process.cwd(), 'content', type === 'post' ? 'posts' : 'projects')
    const filePath = path.join(contentDir, `${slug}.md`)
    
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    return NextResponse.json({
      ...data,
      content: content.trim()
    })
  } catch (error) {
    console.error('Error reading content:', error)
    return NextResponse.json({ error: 'Content not found' }, { status: 404 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { type: string; slug: string } }
) {
  try {
    const { type, slug } = params
    const body = await request.json()
    
    // Extract content/description from body
    const content = body.content || body.description || ''
    delete body.content
    delete body.description
    
    // Create frontmatter
    const frontmatter = matter.stringify(content, body)
    
    // Write to file
    const contentDir = path.join(process.cwd(), 'content', type === 'post' ? 'posts' : 'projects')
    const filePath = path.join(contentDir, `${slug}.md`)
    
    await fs.writeFile(filePath, frontmatter)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
  }
}