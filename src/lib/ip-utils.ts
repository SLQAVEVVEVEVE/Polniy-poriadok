import { NextRequest } from 'next/server';

export function getClientIp(req: NextRequest | Request): string {
  // For local development
  if (process.env.NODE_ENV === 'development') {
    return '127.0.0.1';
  }

  // Try to get IP from headers (common in production with proxies)
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // Cloudflare
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  // Fallback to remote address
  if ('nextUrl' in req && req.nextUrl) {
    return req.nextUrl.hostname;
  }

  // Last resort fallback
  return 'unknown-ip';
}
