// Cloudinary configuration and utilities
// Only import cloudinary on the server side
let cloudinary: any

if (typeof window === 'undefined') {
  const { v2 } = require('cloudinary')
  cloudinary = v2
  
  // Configure Cloudinary
  if (process.env.CLOUDINARY_API_KEY) {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }
}

// Image optimization helper
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: string | number
    format?: string
    crop?: string
  } = {}
): string {
  const {
    width = 800,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill'
  } = options

  // If no Cloudinary cloud name, return original URL
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    return publicId.startsWith('http') ? publicId : `/uploads/${publicId}`
  }

  const transformations = [
    `q_${quality}`,
    `f_${format}`,
    width ? `w_${width}` : null,
    height ? `h_${height}` : null,
    crop ? `c_${crop}` : null,
  ].filter(Boolean).join(',')

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`
}

// Note: Direct upload is handled through the /api/upload endpoint
// This keeps the Cloudinary API credentials secure on the server side

// Generate responsive image sizes
export function getResponsiveImageUrls(publicId: string): {
  thumbnail: string
  small: string
  medium: string
  large: string
  xlarge: string
} {
  return {
    thumbnail: getOptimizedImageUrl(publicId, { width: 150, height: 150 }),
    small: getOptimizedImageUrl(publicId, { width: 400 }),
    medium: getOptimizedImageUrl(publicId, { width: 800 }),
    large: getOptimizedImageUrl(publicId, { width: 1200 }),
    xlarge: getOptimizedImageUrl(publicId, { width: 1920 }),
  }
}

// For Next.js Image component integration
export function getCloudinaryImageProps(
  publicId: string,
  alt: string,
  options: {
    width?: number
    height?: number
    priority?: boolean
  } = {}
) {
  const { width = 800, height, priority = false } = options

  return {
    src: getOptimizedImageUrl(publicId, { width, height }),
    alt,
    width,
    height: height || Math.round(width * 0.6), // 16:10 ratio default
    priority,
    placeholder: 'blur' as const,
    blurDataURL: getOptimizedImageUrl(publicId, { 
      width: 10, 
      height: 10, 
      quality: 1 
    }),
  }
}

export default cloudinary