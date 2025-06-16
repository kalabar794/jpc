import { Metadata } from 'next'
import { getAllGalleryImages } from '@/lib/content'
import PhotographyClient from './PhotographyClient'
import { generateMetadata } from '@/lib/metadata'

export const metadata: Metadata = generateMetadata(
  'Photography Gallery | Professional Marketing Photography | Jonathon',
  'Professional photography portfolio showcasing landscape, architectural, and product photography. High-quality visual content for marketing and branding projects.',
  '/gallery/photography',
  {
    keywords: [
      'marketing photography',
      'professional photography portfolio',
      'landscape photography',
      'architectural photography',
      'product photography',
      'visual content marketing',
      'brand photography',
      'commercial photography'
    ]
  }
)

export default function PhotographyPage() {
  // Load gallery images on server side
  let images: any[] = []
  try {
    const galleryImages = getAllGalleryImages()
    images = galleryImages.filter(img => img.category !== 'AI Art')
  } catch (error) {
    console.error('Failed to load photography gallery:', error)
  }

  return <PhotographyClient images={images} />
}