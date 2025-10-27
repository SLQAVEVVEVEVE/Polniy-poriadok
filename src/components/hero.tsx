import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 bg-[url('/backgrounds/polny_poryadok_background.png')] bg-cover bg-center bg-no-repeat opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/60"></div>
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Электромонтажные работы в Москве и МО
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Профессиональные электромонтажные работы любой сложности. 
            Проектирование, монтаж, пусконаладка. Гарантия качества. Опыт более 10 лет.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button asChild size="lg" className="w-full sm:w-auto" aria-label="Оставить заявку на консультацию">
              <Link href="#contacts">Оставить заявку</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto" aria-label="Посмотреть все наши услуги">
              <Link href="#services">Наши услуги</Link>
            </Button>
          </div>
        </div>
        
        <div className="mx-auto mt-16 max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-background p-6 text-center shadow-sm border border-border/50">
            <div className="text-3xl font-bold text-primary md:text-4xl">10+</div>
            <div className="mt-2 text-base text-muted-foreground">Лет опыта</div>
          </div>
          <div className="rounded-xl bg-background p-6 text-center shadow-sm border border-border/50">
            <div className="text-3xl font-bold text-primary md:text-4xl">500+</div>
            <div className="mt-2 text-base text-muted-foreground">Завершенных проектов</div>
          </div>
          <div className="rounded-xl bg-background p-6 text-center shadow-sm border border-border/50 sm:col-span-2 lg:col-span-1">
            <div className="text-3xl font-bold text-primary md:text-4xl">24/7</div>
            <div className="mt-2 text-base text-muted-foreground">Поддержка клиентов</div>
          </div>
        </div>
      </div>
    </section>
  )
}
