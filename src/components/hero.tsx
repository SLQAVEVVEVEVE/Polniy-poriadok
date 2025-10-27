import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-hero">
        <div className="absolute inset-0 bg-black/10" />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/20 to-white/60" />
      
      {/* Content */}
      <div className="container relative z-10 flex min-h-screen items-center justify-center px-0 sm:px-4">
        <div className="w-full max-w-4xl text-center">
          <div className="w-full px-4">
            <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl break-words">
              Электромонтажные работы в Москве и МО
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
              Профессиональные электромонтажные работы любой сложности. 
              Проектирование, монтаж, пусконаладка. Гарантия качества. Опыт более 10 лет.
            </p>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button asChild size="lg" className="w-full sm:w-auto" aria-label="Оставить заявку на консультацию">
              <Link href="#contacts">Оставить заявку</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto" aria-label="Узнать больше об услугах">
              <Link href="#services">Наши услуги</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
