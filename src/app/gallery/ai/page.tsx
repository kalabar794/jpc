import { Metadata } from 'next'
import { getAllGalleryImages } from '@/lib/content'
import AIGalleryClient from './AIGalleryClient'
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

export default function AIGalleryPage() {
  // Load gallery images on server side
  let images: any[] = []
  try {
    const galleryImages = getAllGalleryImages()
    images = galleryImages.filter(img => img.category === 'AI Art')
  } catch (error) {
    console.error('Failed to load AI gallery:', error)
  }

  return <AIGalleryClient images={images} />
}