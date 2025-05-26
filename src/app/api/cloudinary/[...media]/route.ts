import {
  createMediaHandler,
} from 'next-tinacms-cloudinary/dist/handlers'
import { isAuthorized } from '@tinacms/auth'

const handler = createMediaHandler({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  authorized: async (req, _res): Promise<boolean> => {
    // Log environment info for debugging
    console.log('Cloudinary Auth Check:', {
      hasCloudName: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      hasApiKey: !!process.env.CLOUDINARY_API_KEY,
      hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
      tinaToken: process.env.TINA_TOKEN,
      nodeEnv: process.env.NODE_ENV
    })
    
    // Allow in local development
    if (process.env.TINA_TOKEN === 'local') {
      return true
    }
    
    try {
      // In production, check TinaCMS authorization
      const user = await isAuthorized(req)
      return !!(user && user.verified)
    } catch (e) {
      console.error('TinaCMS Auth Error:', e)
      return false
    }
  },
})

// Convert the handler for Next.js App Router
export async function POST(request: Request, { params }: { params: Promise<{ media: string[] }> }) {
  const { media } = await params
  
  // Create a mock req/res for the handler
  const req = {
    method: 'POST',
    url: `/${media.join('/')}`,
    headers: Object.fromEntries(request.headers.entries()),
    body: await request.formData(),
  }
  
  return new Promise<Response>((resolve) => {
    const res = {
      status: (code: number) => ({
        json: (data: any) => resolve(new Response(JSON.stringify(data), {
          status: code,
          headers: { 'Content-Type': 'application/json' },
        })),
        send: (data: any) => resolve(new Response(data, { status: code })),
      }),
      json: (data: any) => resolve(new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      })),
      send: (data: any) => resolve(new Response(data)),
      setHeader: () => res,
    }
    
    handler(req as any, res as any)
  })
}

export async function GET(request: Request, { params }: { params: Promise<{ media: string[] }> }) {
  const { media } = await params
  
  // Create a mock req/res for the handler
  const req = {
    method: 'GET',
    url: `/${media.join('/')}`,
    headers: Object.fromEntries(request.headers.entries()),
    query: Object.fromEntries(new URL(request.url).searchParams),
  }
  
  return new Promise<Response>((resolve) => {
    const res = {
      status: (code: number) => ({
        json: (data: any) => resolve(new Response(JSON.stringify(data), {
          status: code,
          headers: { 'Content-Type': 'application/json' },
        })),
        send: (data: any) => resolve(new Response(data, { status: code })),
      }),
      json: (data: any) => resolve(new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      })),
      send: (data: any) => resolve(new Response(data)),
      setHeader: () => res,
    }
    
    handler(req as any, res as any)
  })
}

export async function DELETE(request: Request, { params }: { params: Promise<{ media: string[] }> }) {
  const { media } = await params
  
  // Create a mock req/res for the handler
  const req = {
    method: 'DELETE',
    url: `/${media.join('/')}`,
    headers: Object.fromEntries(request.headers.entries()),
    query: Object.fromEntries(new URL(request.url).searchParams),
  }
  
  return new Promise<Response>((resolve) => {
    const res = {
      status: (code: number) => ({
        json: (data: any) => resolve(new Response(JSON.stringify(data), {
          status: code,
          headers: { 'Content-Type': 'application/json' },
        })),
        send: (data: any) => resolve(new Response(data, { status: code })),
      }),
      json: (data: any) => resolve(new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      })),
      send: (data: any) => resolve(new Response(data)),
      setHeader: () => res,
    }
    
    handler(req as any, res as any)
  })
}