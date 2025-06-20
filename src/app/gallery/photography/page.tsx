import { Metadata } from 'next'
import { getGalleryImages } from '@/lib/content'
import PhotoGallery from '@/components/gallery/PhotoGallery'
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

export default async function PhotographyPage() {
  const images = await getGalleryImages('Photography')

  return (
    <PhotoGallery 
      images={images}
      title="Photography Gallery"
      subtitle="Discover stunning moments captured through the lens"
    />
  )
}