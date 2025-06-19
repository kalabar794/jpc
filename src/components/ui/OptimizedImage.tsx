'use client'

import Image from 'next/image'
import { useState } from 'react'
import { getOptimizedImageUrl, getCloudinaryImageProps } from '@/lib/cloudinary-client'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: string | number
  crop?: string
  onLoad?: () => void
  onError?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 'auto',
  crop = 'fill',
  onLoad,
  onError
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Handle image loading states
  const handleLoad = () => {
    setImageLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setImageError(true)
    onError?.()
  }

  // Use Cloudinary if available, otherwise fallback to original
  const isCloudinaryEnabled = !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  
  if (isCloudinaryEnabled && !src.startsWith('http') && !src.startsWith('/')) {
    // Use Cloudinary for optimization
    const imageProps = getCloudinaryImageProps(src, alt, { width, height, priority })
    
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          {...imageProps}
          {...(fill ? { fill: true } : {})}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          className={`transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          alt={alt}
        />
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {imageError && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-300 rounded-lg mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Image not found</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Fallback for regular images or when Cloudinary is not configured
  const imageSrc = src.startsWith('http') ? src : `/uploads/${src}`
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        {...(fill ? { fill: true } : { width, height: height || Math.round(width * 0.6) })}
        sizes={sizes}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-300 rounded-lg mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Image not found</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Responsive image component for hero sections
export function HeroImage({
  src,
  alt,
  className = '',
  priority = true
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      className={className}
      priority={priority}
      sizes="100vw"
      quality="80"
      crop="fill"
    />
  )
}

// Gallery thumbnail component
export function GalleryThumbnail({
  src,
  alt,
  onClick,
  className = ''
}: {
  src: string
  alt: string
  onClick?: () => void
  className?: string
}) {
  return (
    <div
      className={`relative cursor-pointer transform transition-transform hover:scale-105 ${className}`}
      onClick={onClick}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        width={400}
        height={400}
        className="rounded-lg"
        quality="80"
        crop="fill"
      />
    </div>
  )
}