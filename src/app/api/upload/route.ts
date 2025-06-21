import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    // In a production app, you would check for:
    // 1. Valid session cookie
    // 2. User authentication
    // 3. Upload permissions
    // For now, we'll use a server-side secret key check from headers or cookies
    
    // This is a temporary auth check - replace with proper authentication
    const isAuthorized = false; // Set to true only for authorized users
    
    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if Cloudinary is configured
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
        !process.env.CLOUDINARY_API_KEY || 
        !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { error: 'Cloudinary not configured' },
        { status: 500 }
      )
    }

    // Get the form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'portfolio', // Organize uploads in a folder
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    // Return the upload result
    return NextResponse.json({
      success: true,
      url: (response as any).secure_url,
      public_id: (response as any).public_id,
      format: (response as any).format,
      width: (response as any).width,
      height: (response as any).height,
    })
  } catch (error) {
    // Log detailed error server-side for debugging
    console.error('Upload error:', error)
    
    // Return generic error to client to avoid information disclosure
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}