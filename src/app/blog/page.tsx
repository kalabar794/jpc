import { getPosts } from '@/lib/content'
import BlogPageClient from './BlogPageClient'
import { generateMetadata as generateMeta } from '@/lib/metadata'

export const metadata = generateMeta(
  'Blog',
  'Insights on AI marketing, automation strategies, and data-driven business transformation. Learn from real-world case studies and industry trends.',
  '/blog'
)

export default async function BlogPage() {
  const allPosts = await getPosts()
  const posts = allPosts.filter(post => post.status === 'published')

  return <BlogPageClient posts={posts} />
}