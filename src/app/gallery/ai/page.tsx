import { Metadata } from 'next'
import { getGalleryImages } from '@/lib/content'
import PhotoGallery from '@/components/gallery/PhotoGallery'
import { generateMetadata } from '@/lib/metadata'

export const metadata: Metadata = generateMetadata(
  'AI Gallery | AI-Generated Art & Marketing Visuals | Jonathon',
  'Explore innovative AI-generated artwork and marketing visuals. See how AI tools like DALL-E, Midjourney, and Stable Diffusion create compelling visual content for modern marketing.',
  '/gallery/ai',
  {
    keywords: [
      'AI-generated art',
      'AI marketing visuals',
      'DALL-E marketing images',
      'Midjourney marketing',
      'AI visual content',
      'marketing AI tools',
      'AI creative examples',
      'AI artwork portfolio'
    ]
  }
)

export default async function AIGalleryPage() {
  const images = await getGalleryImages('AI Art')

  return (
    <PhotoGallery 
      images={images}
      title="AI Gallery"
      subtitle="Creative AI-generated artwork and visual experiments"
    />
  )
}