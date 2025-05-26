import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  try {
    const contentDir = path.join(process.cwd(), 'content')
    const content = []

    // Get all posts
    const postsDir = path.join(contentDir, 'posts')
    try {
      const postFiles = await fs.readdir(postsDir)
      for (const file of postFiles) {
        if (file.endsWith('.md')) {
          const filePath = path.join(postsDir, file)
          const fileContent = await fs.readFile(filePath, 'utf-8')
          const { data } = matter(fileContent)
          content.push({
            title: data.title || 'Untitled',
            slug: data.slug || file.replace('.md', ''),
            type: 'post',
            status: data.status || 'draft',
            date: data.date || new Date().toISOString()
          })
        }
      }
    } catch (error) {
      console.error('Error reading posts:', error)
    }

    // Get all projects
    const projectsDir = path.join(contentDir, 'projects')
    try {
      const projectFiles = await fs.readdir(projectsDir)
      for (const file of projectFiles) {
        if (file.endsWith('.md')) {
          const filePath = path.join(projectsDir, file)
          const fileContent = await fs.readFile(filePath, 'utf-8')
          const { data } = matter(fileContent)
          content.push({
            title: data.title || 'Untitled',
            slug: data.slug || file.replace('.md', ''),
            type: 'project',
            status: data.status || 'draft',
            date: data.date || new Date().toISOString()
          })
        }
      }
    } catch (error) {
      console.error('Error reading projects:', error)
    }

    // Sort by date
    content.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}