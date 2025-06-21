import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jonathoncarter.com'
  
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