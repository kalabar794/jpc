// Content layer for reading markdown files

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const contentDirectory = path.join(process.cwd(), 'content')

// Content types
export interface Project {
  title: string
  slug: string
  date: string
  featured: boolean
  status: 'draft' | 'published' | 'archived'
  heroImage?: string
  excerpt: string
  content: string
  techStack: string[]
  metrics: {
    roi?: string
    engagement?: string
    efficiency?: string
    custom1Label?: string
    custom1Value?: string
    custom2Label?: string
    custom2Value?: string
  }
  projectUrl?: string
  githubUrl?: string
  category: string
  color?: string
  gallery?: Array<{
    image: string
    alt: string
    caption: string
  }>
}

export interface Post {
  title: string
  slug: string
  date: string
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  heroImage?: string
  excerpt: string
  content: string
  tags: string[]
  category: string
  readTime?: number
  author?: string
  seo?: {
    title?: string
    description?: string
    keywords?: string | string[]
  }
}

export interface GalleryImage {
  id: string
  title: string
  imageUrl: string
  alt: string
  description?: string
  category: string
  tool?: string
  date: string
  tags?: string[]
  featured: boolean
  coverImage?: string
}

export interface SiteSettings {
  site: {
    title: string
    description: string
    author: string
    email: string
  }
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
    instagram?: string
  }
  seo?: {
    defaultTitle?: string
    defaultDescription?: string
  }
}

// Helper function to read and parse markdown files
function readMarkdownFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  // Convert markdown to HTML
  const htmlContent = marked(content)
  
  return { frontmatter: data, content: htmlContent }
}

// Get all projects
export async function getProjects(): Promise<Project[]> {
  return getAllProjects()
}

// Get a single project by slug
export async function getProject(slug: string): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find(project => project.slug === slug) || null
}

// Get featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects()
  return projects.filter(project => project.featured && project.status === 'published')
}

// Get all blog posts
export async function getPosts(): Promise<Post[]> {
  return getAllPosts()
}

// Get a single post by slug
export async function getPost(slug: string): Promise<Post | null> {
  const posts = await getPosts()
  return posts.find(post => post.slug === slug) || null
}

// Get featured posts
export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getPosts()
  return posts.filter(post => post.featured && post.status === 'published')
}

// Get gallery images
export async function getGalleryImages(category?: string): Promise<GalleryImage[]> {
  return getAllGalleryImages(category)
}

// Get site settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return getSiteSettingsSync()
}

// Sync version for SSG
export function getSiteSettingsSync(): SiteSettings | null {
  const settingsPath = path.join(contentDirectory, 'settings', 'site.md')
  
  if (!fs.existsSync(settingsPath)) {
    return null
  }
  
  const { frontmatter } = readMarkdownFile(settingsPath)
  return frontmatter as SiteSettings
}

// Get About page content
export async function getAboutContent() {
  const aboutPath = path.join(contentDirectory, 'pages', 'about.md')
  
  if (!fs.existsSync(aboutPath)) {
    return null
  }
  
  const { frontmatter, content } = readMarkdownFile(aboutPath)
  return { ...frontmatter, content }
}

// Sync version for SSG
export function getAboutContentSync() {
  const aboutPath = path.join(contentDirectory, 'pages', 'about.md')
  
  if (!fs.existsSync(aboutPath)) {
    return null
  }
  
  const { frontmatter, content } = readMarkdownFile(aboutPath)
  return { ...frontmatter, content }
}

// Sync versions for SSG
export function getAllProjects(): Project[] {
  const projectsDirectory = path.join(contentDirectory, 'projects')
  
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }
  
  const filenames = fs.readdirSync(projectsDirectory)
  
  const projects = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const filePath = path.join(projectsDirectory, name)
      const { frontmatter, content } = readMarkdownFile(filePath)
      
      return {
        ...frontmatter,
        content,
        slug: frontmatter.slug || name.replace(/\.md$/, ''),
        // Provide defaults for missing required fields
        techStack: frontmatter.techStack || frontmatter.tags || [],
        metrics: frontmatter.metrics || {},
        projectUrl: frontmatter.projectUrl || frontmatter.demoUrl,
        githubUrl: frontmatter.githubUrl
      } as Project
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return projects
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects()
  return projects.find(project => project.slug === slug) || null
}

export function getAllPosts(): Post[] {
  const postsDirectory = path.join(contentDirectory, 'posts')
  
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const filenames = fs.readdirSync(postsDirectory)
  
  const posts = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const filePath = path.join(postsDirectory, name)
      const { frontmatter, content } = readMarkdownFile(filePath)
      
      return {
        ...frontmatter,
        content,
        slug: frontmatter.slug || name.replace(/\.md$/, ''),
      } as Post
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return posts
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export function getAllGalleryImages(category?: string): GalleryImage[] {
  const galleriesDirectory = path.join(contentDirectory, 'galleries')
  
  let images: GalleryImage[] = []
  
  // Read AI Gallery
  const aiGalleryPath = path.join(galleriesDirectory, 'ai-gallery.md')
  if (fs.existsSync(aiGalleryPath)) {
    const { frontmatter } = readMarkdownFile(aiGalleryPath)
    if (frontmatter.images && Array.isArray(frontmatter.images)) {
      const aiImages = frontmatter.images.map((img: any, index: number) => ({
        id: `ai-${index}-${img.title.toLowerCase().replace(/\s+/g, '-')}`,
        title: img.title,
        imageUrl: img.image,
        alt: img.title,
        description: img.description,
        category: 'AI Art',
        tool: img.model || 'AI Generated',
        date: img.date,
        tags: img.tags || [],
        featured: img.featured || false,
        prompt: img.prompt,
        style: img.style
      } as GalleryImage & { prompt?: string; style?: string }))
      images = [...images, ...aiImages]
    }
  }
  
  // Read Photography Gallery
  const photoGalleryPath = path.join(galleriesDirectory, 'photography-gallery.md')
  if (fs.existsSync(photoGalleryPath)) {
    const { frontmatter } = readMarkdownFile(photoGalleryPath)
    if (frontmatter.images && Array.isArray(frontmatter.images)) {
      const photoImages = frontmatter.images.map((img: any, index: number) => ({
        id: `photo-${index}-${img.title.toLowerCase().replace(/\s+/g, '-')}`,
        title: img.title,
        imageUrl: img.image,
        alt: img.title,
        description: img.description,
        category: img.category || 'Photography',
        tool: img.camera || 'Camera',
        date: img.date,
        tags: img.tags || [],
        featured: img.featured || false,
        location: img.location,
        camera: img.camera,
        settings: img.settings
      } as GalleryImage & { location?: string; camera?: string; settings?: string }))
      images = [...images, ...photoImages]
    }
  }
  
  // Sort images by featured first, then by date
  images = images.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
  
  // Filter by category if specified
  if (category) {
    images = images.filter(image => 
      category === 'AI Art' ? image.category === 'AI Art' : image.category !== 'AI Art'
    )
  }
  
  return images
}