import { getPosts } from '@/lib/content'
import BlogPageClient from './BlogPageClient'
import { generateMetadata as generateMeta } from '@/lib/metadata'

export const metadata = generateMeta(
  'Blog',
  'Insights on AI marketing, automation strategies, and data-driven business transformation. Learn from real-world case studies and industry trends.',
  '/blog'
)

export default async function BlogPage() {
  // Get all published posts
  const allPosts = await getPosts()
  const publishedPosts = allPosts.filter(post => post.status === 'published')

  return <BlogPageClient posts={publishedPosts} />
}