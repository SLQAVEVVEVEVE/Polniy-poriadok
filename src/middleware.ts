import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import rateLimit from './lib/rate-limit';
import { getClientIp } from './lib/ip-utils';

// Initialize rate limiter
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 100, // 100 requests per minute per IP
});

// Paths that should bypass all middleware processing
const BYPASS_PATHS = [
  '/_next/',
  '/favicon.ico',
  '/sitemap.xml',
  '/robots.txt',
  '/api/health',
];

// Methods that should bypass rate limiting
const ALLOWED_METHODS = ['GET', 'HEAD', 'OPTIONS'];

// Apply rate limiting only to specific paths
const RATE_LIMITED_PATHS = ['/api/contact'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and other non-API routes
  if (BYPASS_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Skip rate limiting for non-API routes and allowed methods
  if (!RATE_LIMITED_PATHS.some(path => pathname.startsWith(path)) || 
      ALLOWED_METHODS.includes(request.method)) {
    return NextResponse.next();
  }

  try {
    const ip = getClientIp(request) || 'unknown';
    const result = await limiter.check(ip);

    if (!result.success) {
      const response = new NextResponse('Too many requests', { status: 429 });
      response.headers.set('Retry-After', String(Math.ceil((result.resetTime.getTime() - Date.now()) / 1000)));
      response.headers.set('X-RateLimit-Limit', String(result.limit));
      response.headers.set('X-RateLimit-Remaining', String(result.remaining));
      response.headers.set('X-RateLimit-Reset', String(Math.floor(result.resetTime.getTime() / 1000)));
      return response;
    }

    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', String(result.limit));
    response.headers.set('X-RateLimit-Remaining', String(result.remaining));
    response.headers.set('X-RateLimit-Reset', String(Math.floor(result.resetTime.getTime() / 1000)));

    // Security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
  } catch (error) {
    console.error('Rate limiting error:', error);
    // In case of error, allow the request but log it
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
