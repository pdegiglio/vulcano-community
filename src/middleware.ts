import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';
  
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  // Get user session if available
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  const userInfo = token ? 
    `${token.email} (${token.name}, Apt: ${token.apartmentNumber})` : 
    'anonymous';

  // Skip logging for static assets and API routes that are too noisy
  const skipPaths = [
    '/_next/',
    '/favicon.ico',
    '/api/auth/session', // Too frequent
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.svg',
    '.css',
    '.js',
    '.woff',
    '.woff2'
  ];

  const shouldSkip = skipPaths.some(path => pathname.includes(path));
  
  if (!shouldSkip) {
    // Log page access
    console.log(`[ACCESS] ${userInfo} accessed ${pathname} from IP: ${clientIP} | UA: ${userAgent.substring(0, 100)}`);
  }

  // Log authentication-related events
  if (pathname.startsWith('/auth/')) {
    console.log(`[AUTH] Authentication page accessed: ${pathname} from IP: ${clientIP} by ${userInfo}`);
  }

  if (pathname.startsWith('/members') && !token) {
    console.log(`[ACCESS] Unauthorized access attempt to ${pathname} from IP: ${clientIP}`);
  }

  if (pathname.startsWith('/api/')) {
    console.log(`[API] ${request.method} ${pathname} from IP: ${clientIP} by ${userInfo}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};