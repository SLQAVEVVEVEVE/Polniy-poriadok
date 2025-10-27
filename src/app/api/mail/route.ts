import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET() {
  const isConfigured = [
    'BREVO_API_KEY',
    'EMAIL_FROM',
    'EMAIL_TO'
  ].every(key => {
    const value = process.env[key];
    return value !== undefined && value.trim() !== '';
  });

  return NextResponse.json({
    ok: true,
    configured: isConfigured,
    missing: {
      BREVO_API_KEY: !process.env.BREVO_API_KEY?.trim(),
      EMAIL_FROM: !process.env.EMAIL_FROM?.trim(),
      EMAIL_TO: !process.env.EMAIL_TO?.trim()
    },
    // Don't expose actual values, just show if they're set
    env: {
      BREVO_API_KEY: !!process.env.BREVO_API_KEY,
      EMAIL_FROM: !!process.env.EMAIL_FROM,
      EMAIL_TO: !!process.env.EMAIL_TO,
      NODE_ENV: process.env.NODE_ENV,
    }
  });
}

// Prevent other HTTP methods
export function POST() {
  return new NextResponse('Method not allowed', { status: 405 });
}
