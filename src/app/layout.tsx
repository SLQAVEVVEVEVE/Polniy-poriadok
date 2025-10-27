import './globals.css'
import '@/styles/backgrounds.css'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { AnalyticsWrapper } from '@/components/analytics-wrapper'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { JsonLd } from '@/components/json-ld'
import { generateOrganizationSchema } from '@/lib/structured-data'

// Preload critical resources
const preloadLinks = [
  { href: '/backgrounds/polny_poryadok_background.png', as: 'image', type: 'image/png' },
  { href: '/favicon.ico', as: 'image', type: 'image/x-icon' },
];

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  title: 'Полный ⚡ Порядок - Электромонтажные работы в Москве и МО',
  description: 'Профессиональные электромонтажные работы любой сложности. Проектирование, монтаж, пусконаладка. Гарантия качества. Опыт более 10 лет.',
  metadataBase: new URL('https://pp-msk.ru'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Полный ⚡ Порядок - Электромонтажные работы в Москве и МО',
    description: 'Профессиональные электромонтажные работы любой сложности. Гарантия качества. Опыт более 10 лет.',
    url: 'https://pp-msk.ru',
    siteName: 'Полный ⚡ Порядок',
    locale: 'ru_RU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        
        {/* Preload critical resources */}
        {preloadLinks.map((link, index) => (
          <link 
            key={index}
            rel="preload"
            href={link.href}
            as={link.as}
            type={link.type}
            crossOrigin="anonymous"
          />
        ))}
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://mc.yandex.ru" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        
        {/* Preload fonts */}
        <link
          rel="preload"
          href="/fonts/Inter.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <JsonLd data={generateOrganizationSchema()} id="organization-schema" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
        <Suspense>
          <AnalyticsWrapper 
            METRIKA_ID={process.env.NEXT_PUBLIC_METRIKA_ID}
            GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          />
        </Suspense>
      </body>
    </html>
  )
}
