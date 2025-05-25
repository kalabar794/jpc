import { getPosts } from '@/lib/content'
import BlogPageClient from './BlogPageClient'

export default async function BlogPage() {
  // Get all published posts
  const allPosts = await getPosts()
  const publishedPosts = allPosts.filter(post => post.status === 'published')

  return <BlogPageClient posts={publishedPosts} />
}