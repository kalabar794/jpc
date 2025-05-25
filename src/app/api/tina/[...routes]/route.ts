import { TinaNodeBackend, LocalBackendAuthProvider, createLocalDatabase } from '@tinacms/datalayer'
import { TinaCloudBackendAuthProvider } from '@tinacms/auth'

import databaseClient from '../../../../../tina/__generated__/databaseClient'

const isLocal = process.env.TINA_TOKEN === 'local' || !process.env.TINA_TOKEN

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : TinaCloudBackendAuthProvider(),
  databaseClient: isLocal
    ? createLocalDatabase()
    : databaseClient,
})

export async function GET(request: Request, { params }: { params: Promise<{ routes: string[] }> }) {
  const { routes } = await params
  
  // Convert Next.js Request to req/res format expected by TinaNodeBackend
  const req = {
    method: 'GET',
    url: `/${routes.join('/')}`,
    headers: Object.fromEntries(request.headers.entries()),
    query: Object.fromEntries(new URL(request.url).searchParams),
  }
  
  // Create response wrapper
  const res = await new Promise<Response>((resolve) => {
    const mockRes = {
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
      setHeader: () => mockRes,
    }
    
    handler(req as any, mockRes as any)
  })
  
  return res
}

export async function POST(request: Request, { params }: { params: Promise<{ routes: string[] }> }) {
  const { routes } = await params
  const body = await request.text()
  
  // Convert Next.js Request to req/res format expected by TinaNodeBackend
  const req = {
    method: 'POST',
    url: `/${routes.join('/')}`,
    headers: Object.fromEntries(request.headers.entries()),
    body,
    query: Object.fromEntries(new URL(request.url).searchParams),
  }
  
  // Create response wrapper
  const res = await new Promise<Response>((resolve) => {
    const mockRes = {
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
      setHeader: () => mockRes,
    }
    
    handler(req as any, mockRes as any)
  })
  
  return res
}