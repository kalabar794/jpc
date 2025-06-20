/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove X-Powered-By header for security
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://identity.netlify.com https://res.cloudinary.com https://widget.cloudinary.com https://upload-widget.cloudinary.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com https://cloudinary.com",
              "media-src 'self' https://res.cloudinary.com",
              "connect-src 'self' https://api.cloudinary.com https://res.cloudinary.com https://identity.netlify.com wss://identity.netlify.com https://*.netlify.com https://*.netlify.app",
              "frame-src 'self' https://identity.netlify.com https://widget.cloudinary.com https://upload-widget.cloudinary.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://identity.netlify.com",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; '),
          },
          {
            key: 'X-Powered-By',
            value: '',
          },
        ],
      },
    ]
  },
}

export default nextConfig