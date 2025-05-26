import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  try {
    // Test Cloudinary configuration
    const config = {
      hasCloudName: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      hasApiKey: !!process.env.CLOUDINARY_API_KEY,
      hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    }
    
    // Try to fetch existing resources to verify connection
    let resources = null
    try {
      const result = await cloudinary.api.resources({ max_results: 1 })
      resources = result.resources.length
    } catch (error) {
      console.error('Cloudinary API error:', error)
    }
    
    return NextResponse.json({
      status: 'Cloudinary configuration test',
      config,
      connected: resources !== null,
      resourceCount: resources,
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to test Cloudinary',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}