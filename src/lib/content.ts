// Content layer for reading markdown files

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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
    keywords?: string[]
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

// Helper function to read and parse markdown files
function readMarkdownFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { frontmatter: data, content }
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
export async function getSiteSettings() {
  const settingsPath = path.join(contentDirectory, 'settings', 'site.md')
  
  if (!fs.existsSync(settingsPath)) {
    return null
  }
  
  const { frontmatter } = readMarkdownFile(settingsPath)
  return frontmatter
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
  const galleryDirectory = path.join(contentDirectory, 'gallery')
  
  if (!fs.existsSync(galleryDirectory)) {
    return []
  }

  // Read from AI and Photography subdirectories
  const aiDir = path.join(galleryDirectory, 'ai')
  const photoDir = path.join(galleryDirectory, 'photography')
  
  let images: GalleryImage[] = []
  
  // Read AI gallery
  if (fs.existsSync(aiDir)) {
    const aiFiles = fs.readdirSync(aiDir).filter(name => name.endsWith('.md'))
    const aiImages = aiFiles.map(name => {
      const filePath = path.join(aiDir, name)
      const { frontmatter } = readMarkdownFile(filePath)
      
      return {
        id: frontmatter.slug || name.replace(/\.md$/, ''),
        title: frontmatter.title,
        imageUrl: frontmatter.image,
        alt: frontmatter.title,
        description: frontmatter.description,
        category: 'AI Art',
        tool: frontmatter.model || 'AI Generated',
        date: frontmatter.date,
        tags: frontmatter.tags || [],
        featured: frontmatter.featured || false,
        prompt: frontmatter.prompt,
        style: frontmatter.style,
        order: frontmatter.order || 0
      } as GalleryImage & { prompt?: string; style?: string; order: number }
    })
    images = [...images, ...aiImages]
  }
  
  // Read Photography gallery
  if (fs.existsSync(photoDir)) {
    const photoFiles = fs.readdirSync(photoDir).filter(name => name.endsWith('.md'))
    const photoImages = photoFiles.map(name => {
      const filePath = path.join(photoDir, name)
      const { frontmatter } = readMarkdownFile(filePath)
      
      return {
        id: frontmatter.slug || name.replace(/\.md$/, ''),
        title: frontmatter.title,
        imageUrl: frontmatter.image,
        alt: frontmatter.title,
        description: frontmatter.description,
        category: frontmatter.category || 'Photography',
        tool: frontmatter.camera || 'Camera',
        date: frontmatter.date,
        tags: frontmatter.tags || [],
        featured: frontmatter.featured || false,
        location: frontmatter.location,
        camera: frontmatter.camera,
        settings: frontmatter.settings,
        order: frontmatter.order || 0
      } as GalleryImage & { location?: string; camera?: string; settings?: string; order: number }
    })
    images = [...images, ...photoImages]
  }
  
  // If no CMS content, return some sample images
  if (images.length === 0) {
    return [
      {
        id: '1',
        title: 'AI-Generated Landscape',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        alt: 'Beautiful AI-generated mountain landscape',
        description: 'A stunning mountain landscape created using advanced AI algorithms',
        category: 'AI Art',
        tool: 'Midjourney',
        date: '2025-01-15',
        tags: ['landscape', 'mountains', 'nature'],
        featured: true
      },
      {
        id: '2',
        title: 'Neural Network Visualization',
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2125&q=80',
        alt: 'Abstract neural network visualization',
        description: 'Data visualization showing neural network architecture',
        category: 'Data Visualization',
        tool: 'Custom Code',
        date: '2025-01-10',
        tags: ['neural networks', 'data', 'abstract'],
        featured: false
      },
      {
        id: '3',
        title: 'Portrait Study',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        alt: 'AI-enhanced portrait photography',
        description: 'Portrait enhanced with AI-powered post-processing techniques',
        category: 'Photography',
        tool: 'Photoshop + AI',
        date: '2025-01-08',
        tags: ['portrait', 'photography', 'enhancement'],
        featured: true
      },
      {
        id: '4',
        title: 'Futuristic Cityscape',
        imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        alt: 'Futuristic city at night',
        description: 'Cyberpunk-inspired cityscape generated with AI',
        category: 'AI Art',
        tool: 'DALL-E 3',
        date: '2025-01-05',
        tags: ['cyberpunk', 'city', 'futuristic'],
        featured: false
      },
      {
        id: '5',
        title: 'Abstract Composition',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        alt: 'Colorful abstract digital art',
        description: 'Abstract digital composition exploring color and form',
        category: 'Digital Art',
        tool: 'Procreate',
        date: '2025-01-03',
        tags: ['abstract', 'colorful', 'digital'],
        featured: true
      },
      {
        id: '6',
        title: 'Macro Photography',
        imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
        alt: 'Close-up nature photography',
        description: 'Detailed macro shot enhanced with computational photography',
        category: 'Photography',
        tool: 'Camera + AI',
        date: '2025-01-01',
        tags: ['macro', 'nature', 'detail'],
        featured: false
      }
    ]
  }
  
  const filenames = fs.readdirSync(galleryDirectory)
  
  let images = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const filePath = path.join(galleryDirectory, name)
      const { frontmatter } = readMarkdownFile(filePath)
      
      return {
        ...frontmatter,
        id: frontmatter.id || name.replace(/\.md$/, ''),
        imageUrl: frontmatter.image || frontmatter.imageUrl,
      } as GalleryImage
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  if (category) {
    images = images.filter(image => image.category === category)
  }
  
  return images
}