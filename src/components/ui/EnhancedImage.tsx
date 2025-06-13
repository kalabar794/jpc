'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { generateSEOImageData, getAccessibleImageUrl, getPlaceholderUrl } from '@/lib/cloudinary-enhanced'
import OptimizedImage from './OptimizedImage'

interface EnhancedImageProps {
  src: string
  alt: string
  title?: string
  width?: number
  height?: number
  layout?: 'full' | 'half' | 'third' | 'gallery'
  className?: string
  priority?: boolean
  // New enhanced features
  useEnhanced?: boolean // Feature flag to enable enhanced features
  generateAlt?: boolean // Auto-generate alt text
  improveAccessibility?: boolean // Apply accessibility enhancements
  responsive?: boolean // Use responsive srcset
  onAltGenerated?: (alt: string) => void // Callback when alt is generated
}

export default function EnhancedImage({
  src,
  alt,
  title,
  width = 1920,
  height = 1080,
  layout = 'full',
  className = '',
  priority = false,
  useEnhanced = false, // Default to false for safety
  generateAlt = false,
  improveAccessibility = false,
  responsive = false,
  onAltGenerated
}: EnhancedImageProps) {
  const [imageAlt, setImageAlt] = useState(alt)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Auto-generate alt text if enabled and no alt provided
  useEffect(() => {
    if (generateAlt && !alt && useEnhanced) {
      // TODO: Implement API call to generate alt text
      // For now, we'll use the filename as a fallback
      const filename = src.split('/').pop()?.split('.')[0] || 'Image'
      const generatedAlt = filename.replace(/[-_]/g, ' ')
      setImageAlt(generatedAlt)
      onAltGenerated?.(generatedAlt)
    }
  }, [src, alt, generateAlt, useEnhanced, onAltGenerated])

  // If not using enhanced features, fallback to OptimizedImage
  if (!useEnhanced) {
    return (
      <OptimizedImage
        src={src}
        alt={imageAlt}
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    )
  }

  // Generate enhanced image data
  const imageData = generateSEOImageData(src, imageAlt, {
    layout,
    width,
    height,
    priority,
    title: title || imageAlt
  })

  // Apply accessibility enhancements if needed
  const imageSrc = improveAccessibility
    ? getAccessibleImageUrl(src, ['improveContrast', 'sharpen'], { width, height })
    : imageData.src

  return (
    <figure className={`relative ${className}`} itemScope itemType="https://schema.org/ImageObject">
      <div className="relative overflow-hidden">
        {/* Main image with responsive srcset */}
        {responsive ? (
          <img
            src={imageSrc}
            srcSet={imageData.srcSet}
            sizes={imageData.sizes}
            alt={imageAlt}
            title={imageData.title}
            width={width}
            height={height}
            loading={imageData.loading}
            className={`transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => setError(true)}
            itemProp="contentUrl"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            title={imageData.title}
            width={width}
            height={height}
            priority={priority}
            placeholder="blur"
            blurDataURL={imageData.placeholder}
            className={`transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => setError(true)}
            itemProp="contentUrl"
          />
        )}

        {/* Loading state */}
        {isLoading && !error && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
        )}

        {/* Error state */}
        {error && (
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-lg mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">Failed to load image</p>
            </div>
          </div>
        )}
      </div>

      {/* SEO metadata */}
      <meta itemProp="name" content={imageData.title} />
      <meta itemProp="description" content={imageAlt} />
      <meta itemProp="width" content={width.toString()} />
      <meta itemProp="height" content={height.toString()} />
    </figure>
  )
}

// Responsive gallery image with enhanced features
export function EnhancedGalleryImage({
  src,
  alt,
  onClick,
  className = '',
  useEnhanced = false
}: {
  src: string
  alt: string
  onClick?: () => void
  className?: string
  useEnhanced?: boolean
}) {
  return (
    <div
      className={`cursor-pointer transform transition-transform hover:scale-105 ${className}`}
      onClick={onClick}
    >
      <EnhancedImage
        src={src}
        alt={alt}
        width={600}
        height={600}
        layout="gallery"
        className="rounded-lg"
        useEnhanced={useEnhanced}
        responsive={useEnhanced}
        improveAccessibility={useEnhanced}
      />
    </div>
  )
}

// SEO-optimized hero image
export function EnhancedHeroImage({
  src,
  alt,
  title,
  className = '',
  useEnhanced = false
}: {
  src: string
  alt: string
  title?: string
  className?: string
  useEnhanced?: boolean
}) {
  return (
    <EnhancedImage
      src={src}
      alt={alt}
      title={title}
      width={1920}
      height={1080}
      layout="full"
      className={className}
      priority
      useEnhanced={useEnhanced}
      responsive={useEnhanced}
      improveAccessibility={useEnhanced}
    />
  )
}