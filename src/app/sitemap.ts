import { MetadataRoute } from 'next'
import { getAllPosts, getAllProjects } from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jonathoncarter.com'
  
  // Get all blog posts and projects
  const posts = await getAllPosts()
  const projects = await getAllProjects()
  
  // Static pages
  const routes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/gallery/ai`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/gallery/photography`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ]

  // Blog posts
  const blogRoutes = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Project pages
  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...blogRoutes, ...projectRoutes]
}