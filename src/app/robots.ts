import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jpc-kappa.vercel.app'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/test/',
        '/_next/',
        '/uploads/temp/',
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}