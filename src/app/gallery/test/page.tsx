import { Metadata } from 'next'
import { getGalleryImages } from '@/lib/content'
import PhotoGallery from '@/components/gallery/PhotoGallery'

export const metadata: Metadata = {
  title: 'Test Gallery - AI Artwork',
  description: 'Test gallery featuring AI-generated artwork with full-screen viewer'
}

export default async function TestGalleryPage() {
  const images = await getGalleryImages('AI Art')

  return (
    <PhotoGallery 
      images={images}
      title="AI Gallery Test"
      subtitle="Experience AI-generated artwork with enhanced viewing"
    />
  )
}