import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import arcjet, { shield, detectBot } from "@arcjet/next";
import { hashIP } from '@/lib/privacy';

// Create Arcjet instance for middleware
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // Shield protects against common attacks
    shield({
      mode: "LIVE",
    }),
    // Bot detection for protected routes
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Allow Google, Bing, etc.
        "CATEGORY:MONITOR", // Allow uptime monitors
        "CATEGORY:PREVIEW", // Allow social media previews
      ],
    }),
  ],
});

export async function middleware(request: NextRequest) {
  // Only protect specific routes
  const protectedPaths = [
    '/gallery/ai',
    '/gallery/photography',
    '/gallery/test',
    '/api/upload',
  ];

  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    // Check with Arcjet
    const decision = await aj.protect(request);

    if (decision.isDenied()) {
      // Log denied requests for monitoring with hashed IP for privacy
      const hashedIp = await hashIP(request.ip);
      console.log('Arcjet denied request:', {
        path: request.nextUrl.pathname,
        reason: decision.reason,
        hashedIp,
        timestamp: new Date().toISOString(),
      });

      // Return appropriate error based on reason
      if (decision.reason.isBot()) {
        return new NextResponse('Bot detected. Access denied.', { status: 403 });
      } else if (decision.reason.isShield()) {
        return new NextResponse('Request blocked for security reasons.', { status: 403 });
      }
      
      return new NextResponse('Access denied.', { status: 403 });
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};