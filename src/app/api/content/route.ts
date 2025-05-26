import { NextResponse } from 'next/server'
import { getAllContent } from '@/lib/upstash'

export async function GET() {
  try {
    // Get all posts and projects from Upstash
    const [posts, projects] = await Promise.all([
      getAllContent('post'),
      getAllContent('project')
    ])

    // Combine and format for the admin panel
    const content = [
      ...posts.map(post => ({
        title: post.title || 'Untitled',
        slug: post.slug,
        type: 'post' as const,
        status: post.status || 'draft',
        date: post.date || new Date().toISOString()
      })),
      ...projects.map(project => ({
        title: project.title || 'Untitled',
        slug: project.slug,
        type: 'project' as const,
        status: project.status || 'draft',
        date: project.date || new Date().toISOString()
      }))
    ]

    // Sort by date
    content.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}