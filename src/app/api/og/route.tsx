import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get parameters
    const title = searchParams.get('title') || 'Jonathon'
    const subtitle = searchParams.get('subtitle') || 'AI Marketing & Automation Expert'
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
            }}
          />
          
          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '60px',
              zIndex: 1,
            }}
          >
            <h1
              style={{
                fontSize: title.length > 20 ? '60px' : '80px',
                fontWeight: 'bold',
                color: 'white',
                margin: 0,
                marginBottom: '20px',
                textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>
            
            <p
              style={{
                fontSize: '32px',
                color: 'rgba(255, 255, 255, 0.9)',
                margin: 0,
                fontWeight: '500',
              }}
            >
              {subtitle}
            </p>
            
            {/* Logo/Brand */}
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: 'white',
                  opacity: 0.9,
                }}
              />
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white',
                  opacity: 0.9,
                }}
              >
                Jonathon
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.error('OG Image generation failed:', e)
    return new Response('Failed to generate image', { status: 500 })
  }
}