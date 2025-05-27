import { getPosts } from '@/lib/content'
import { getBlogPosts } from '@/lib/contentful'
import BlogPageClient from './BlogPageClient'
import { generateMetadata as generateMeta } from '@/lib/metadata'

export const metadata = generateMeta(
  'Blog',
  'Insights on AI marketing, automation strategies, and data-driven business transformation. Learn from real-world case studies and industry trends.',
  '/blog'
)

export default async function BlogPage() {
  let posts = []
  
  try {
    // Try Contentful first
    const contentfulPosts = await getBlogPosts()
    posts = contentfulPosts.map((post: any) => ({
      title: post.fields?.title || '',
      slug: post.fields?.slug || '',
      excerpt: post.fields?.excerpt || '',
      date: post.fields?.publishedDate || new Date().toISOString(),
      category: post.fields?.category || '',
      tags: post.fields?.tags || [],
      heroImage: post.fields?.heroImage?.fields?.file?.url || null,
      status: 'published' as const,
      featured: post.fields?.featured || false,
      content: '',
      seo: {
        title: post.fields?.seoTitle || '',
        description: post.fields?.seoDescription || '',
        keywords: post.fields?.seoKeywords || ''
      }
    }))
  } catch (error) {
    // Fallback to markdown files if Contentful not configured
    console.log('Using local markdown files')
    const allPosts = await getPosts()
    posts = allPosts.filter(post => post.status === 'published')
  }

  return <BlogPageClient posts={posts} />
}