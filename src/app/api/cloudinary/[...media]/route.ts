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

// CORS headers for Cloudinary
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Convert the handler for Next.js App Router
export async function POST(request: Request, { params }: { params: Promise<{ media: string[] }> }) {
  try {
    const { media } = await params
    
    // Check if Cloudinary environment variables are set
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Missing Cloudinary environment variables')
      return new Response(JSON.stringify({ error: 'Cloudinary not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    
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
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })),
          send: (data: any) => resolve(new Response(data, { status: code, headers: corsHeaders })),
        }),
        json: (data: any) => resolve(new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })),
        send: (data: any) => resolve(new Response(data, { headers: corsHeaders })),
        setHeader: () => res,
      }
      
      handler(req as any, res as any)
    })
  } catch (error) {
    console.error('Cloudinary POST error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ media: string[] }> }) {
  try {
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
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })),
          send: (data: any) => resolve(new Response(data, { status: code, headers: corsHeaders })),
        }),
        json: (data: any) => resolve(new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })),
        send: (data: any) => resolve(new Response(data, { headers: corsHeaders })),
        setHeader: () => res,
      }
      
      handler(req as any, res as any)
    })
  } catch (error) {
    console.error('Cloudinary GET error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ media: string[] }> }) {
  try {
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
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })),
          send: (data: any) => resolve(new Response(data, { status: code, headers: corsHeaders })),
        }),
        json: (data: any) => resolve(new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })),
        send: (data: any) => resolve(new Response(data, { headers: corsHeaders })),
        setHeader: () => res,
      }
      
      handler(req as any, res as any)
    })
  } catch (error) {
    console.error('Cloudinary DELETE error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
}

// Handle CORS preflight requests
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  })
}