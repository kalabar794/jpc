// Enhanced Cloudinary utilities with advanced features
// These work alongside existing functions without breaking them

import { getOptimizedImageUrl } from './cloudinary-client'

// Advanced transformation options
export interface EnhancedImageOptions {
  width?: number
  height?: number
  quality?: string | number
  format?: string
  crop?: string
  gravity?: string // New: AI-based cropping
  effect?: string[] // New: Effects like sharpen, improve
  dpr?: string | number // New: Device pixel ratio
  responsive?: boolean // New: Generate responsive URLs
  generateAlt?: boolean // New: AI alt text
}

// Enhanced optimization with new features
export function getEnhancedImageUrl(
  publicId: string,
  options: EnhancedImageOptions = {}
): string {
  const {
    width = 800,
    height,
    quality = 'auto:best',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
    effect = [],
    dpr = 'auto'
  } = options

  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    return publicId.startsWith('http') ? publicId : `/uploads/${publicId}`
  }

  // Build transformation array with new features
  const transformations = [
    `q_${quality}`,
    `f_${format}`,
    `dpr_${dpr}`,
    width ? `w_${width}` : null,
    height ? `h_${height}` : null,
    crop ? `c_${crop}` : null,
    gravity && crop ? `g_${gravity}` : null,
    ...effect.map(e => `e_${e}`),
  ].filter(Boolean).join(',')

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`
}

// Generate srcset for responsive images
export function generateSrcSet(
  publicId: string,
  breakpoints: number[] = [320, 480, 768, 1024, 1366, 1920],
  options: Omit<EnhancedImageOptions, 'width'> = {}
): string {
  return breakpoints
    .map(width => {
      const url = getEnhancedImageUrl(publicId, { ...options, width })
      return `${url} ${width}w`
    })
    .join(', ')
}

// Generate sizes attribute based on layout
export function generateSizes(layout: 'full' | 'half' | 'third' | 'gallery' = 'full'): string {
  const sizesMap = {
    full: '100vw',
    half: '(max-width: 768px) 100vw, 50vw',
    third: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    gallery: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
  }
  return sizesMap[layout]
}

// Get low-quality placeholder for blur effect
export function getPlaceholderUrl(publicId: string): string {
  return getEnhancedImageUrl(publicId, {
    width: 20,
    height: 20,
    quality: 1,
    effect: ['blur:1000']
  })
}

// SEO-friendly image data structure
export interface SEOImageData {
  src: string
  srcSet: string
  sizes: string
  alt: string
  title?: string
  loading?: 'lazy' | 'eager'
  placeholder?: string
  width: number
  height: number
}

// Generate complete image data with SEO optimization
export function generateSEOImageData(
  publicId: string,
  alt: string,
  options: {
    layout?: 'full' | 'half' | 'third' | 'gallery'
    width?: number
    height?: number
    priority?: boolean
    title?: string
    breakpoints?: number[]
  } = {}
): SEOImageData {
  const {
    layout = 'full',
    width = 1920,
    height = 1080,
    priority = false,
    title,
    breakpoints
  } = options

  return {
    src: getEnhancedImageUrl(publicId, { width, height }),
    srcSet: generateSrcSet(publicId, breakpoints),
    sizes: generateSizes(layout),
    alt,
    title: title || alt,
    loading: priority ? 'eager' : 'lazy',
    placeholder: getPlaceholderUrl(publicId),
    width,
    height
  }
}

// Accessibility enhancement transformations
export const accessibilityTransforms = {
  improveContrast: 'e_improve',
  sharpen: 'e_sharpen',
  brighten: 'e_brightness:10',
  assistColorblind: 'e_assist_colorblind'
}

// Check if image needs accessibility enhancements
export function getAccessibleImageUrl(
  publicId: string,
  enhancements: (keyof typeof accessibilityTransforms)[] = ['improveContrast'],
  baseOptions: EnhancedImageOptions = {}
): string {
  const effects = enhancements.map(e => accessibilityTransforms[e].replace('e_', ''))
  return getEnhancedImageUrl(publicId, {
    ...baseOptions,
    effect: [...(baseOptions.effect || []), ...effects]
  })
}