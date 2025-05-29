import { getPosts } from '@/lib/content'
import { generateCollectionMetadata, generateOrganizationStructuredData } from '@/lib/seo'
import BlogPageClient from './BlogPageClient'
import { StructuredData } from '@/components/seo'

export async function generateMetadata() {
  const allPosts = await getPosts()
  const posts = allPosts.filter(post => post.status === 'published')
  
  return generateCollectionMetadata(
    'AI Marketing Blog',
    'Cutting-edge insights on AI marketing, automation strategies, and data-driven business transformation. Learn from expert analysis and real-world implementations.',
    '/blog',
    posts.length
  )
}

export default async function BlogPage() {
  const allPosts = await getPosts()
  const posts = allPosts.filter(post => post.status === 'published')
  const organizationData = generateOrganizationStructuredData()

  return (
    <>
      <StructuredData data={organizationData} />
      <BlogPageClient posts={posts} />
    </>
  )
}