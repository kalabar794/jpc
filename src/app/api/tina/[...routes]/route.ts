import { createDatabase, createLocalDatabase } from '@tinacms/datalayer'
import { TinaNodeBackend, LocalBackendAuth } from '@tinacms/auth'

import databaseClient from '../../../../../tina/__generated__/databaseClient'

const isLocal = process.env.TINA_TOKEN === 'local' || !process.env.TINA_TOKEN

const handler = TinaNodeBackend({
  auth: isLocal ? LocalBackendAuth : undefined,
  databaseClient: isLocal
    ? createLocalDatabase()
    : createDatabase({
        branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || 'main',
        clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
        token: process.env.TINA_TOKEN!,
      }),
})

export async function GET(request: Request, { params }: { params: Promise<{ routes: string[] }> }) {
  const { routes } = await params
  return handler({
    endpoint: routes.join('/'),
    init: {
      headers: Object.fromEntries(request.headers),
    },
  })
}

export async function POST(request: Request, { params }: { params: Promise<{ routes: string[] }> }) {
  const { routes } = await params
  const body = await request.text()
  
  return handler({
    endpoint: routes.join('/'),
    init: {
      method: 'POST',
      headers: Object.fromEntries(request.headers),
      body,
    },
  })
}