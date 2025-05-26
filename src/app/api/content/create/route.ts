import { NextResponse } from 'next/server'
import { createContent } from '@/lib/upstash'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, slug, ...data } = body
    
    if (!type || !slug) {
      return NextResponse.json({ error: 'Type and slug are required' }, { status: 400 })
    }
    
    // Create content in Upstash
    const success = await createContent({
      type,
      slug,
      ...data
    })
    
    if (success) {
      return NextResponse.json({ success: true, slug, type })
    } else {
      return NextResponse.json({ error: 'Failed to create content' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error creating content:', error)
    return NextResponse.json({ 
      error: 'Failed to create content', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}