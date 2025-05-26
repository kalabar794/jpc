import { NextResponse } from 'next/server'
import { getContent, updateContent } from '@/lib/upstash'

export async function GET(
  request: Request,
  { params }: { params: { type: string; slug: string } }
) {
  try {
    const { type, slug } = params
    const content = await getContent(type as 'post' | 'project', slug)
    
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }
    
    return NextResponse.json(content)
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
    
    // Update content in Upstash
    const success = await updateContent(
      type as 'post' | 'project',
      slug,
      body
    )
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
  }
}