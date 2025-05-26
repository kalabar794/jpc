import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'TinaCMS configuration check',
    config: {
      hasClientId: !!process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
      hasTinaToken: !!process.env.TINA_TOKEN,
      clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
      tokenPrefix: process.env.TINA_TOKEN?.substring(0, 10) + '...',
      branch: process.env.NEXT_PUBLIC_TINA_BRANCH || 'main',
    },
    mediaConfig: {
      hasCloudinaryCloudName: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      cloudinaryCloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    }
  })
}