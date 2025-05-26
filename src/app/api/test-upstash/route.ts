import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasUpstashUrl: !!process.env.UPSTASH_REDIS_REST_URL,
    hasUpstashToken: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    hasKvUrl: !!process.env.KV_REST_API_URL,
    hasKvToken: !!process.env.KV_REST_API_TOKEN,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  })
}