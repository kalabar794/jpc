import { getAllGalleryImages } from '@/lib/content'
import PhotographyClient from './PhotographyClient'

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