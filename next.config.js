/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // React and build optimizations
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  productionBrowserSourceMaps: false, // Disable source maps in production for better performance
  
  // Environment variables
  env: {
    METRIKA_ID: process.env.NEXT_PUBLIC_METRIKA_ID,
    GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://stroykomplekt-msk.ru',
  },
  
  // Security headers (complementary to vercel.json)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  
  // Enable React's experimental features if needed
  experimental: {
    // Enable concurrent features
    // serverComponents: true,
    // concurrentFeatures: true,
    // Enable new link behavior
    // newNextLinkBehavior: true,
  },
  
  // Enable static exports for static site generation
  // output: 'export', // Uncomment for static export
};

// Security headers configuration
const securityHeaders = [
  // Prevent clickjacking
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Enable XSS protection
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Prevent MIME type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Referrer policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Permissions policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
];

module.exports = nextConfig;