import { getAllGalleryImages } from '@/lib/content'
import AIGalleryClient from './AIGalleryClient'

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