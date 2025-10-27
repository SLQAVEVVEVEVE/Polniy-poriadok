'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, Phone, Mail } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { trackEvent } from '@/lib/analytics';  // Update this import

export function Header() {
  const handlePhoneClick = () => {
    trackEvent('contact_call_click', {
      phone: '+74956405863',
      location: 'header'
    })
  }

  const handleEmailClick = () => {
    trackEvent('contact_mail_click', {
      email: 'info@pp-msk.ru',
      location: 'header'
    })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 transition-all duration-300 hover:bg-background/90 md:bg-background/95 md:backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
          Полный <span className="text-primary">⚡</span> Порядок
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="#about" className="transition-colors hover:text-primary">
            О нас
          </Link>
          <Link href="#services" className="transition-colors hover:text-primary" onClick={(e) => {
            e.preventDefault();
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Услуги
          </Link>
          <Link href="#objects" className="transition-colors hover:text-primary">
            Объекты
          </Link>
          <Link href="#projects" className="transition-colors hover:text-primary">
            Наши работы
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+74956405863" 
              onClick={handlePhoneClick}
              className="flex items-center gap-2 font-medium hover:underline"
            >
              <Phone className="h-4 w-4" />
              +7 (495) 640-58-63
            </a>
            <a 
              href="mailto:info@stroykomplekt-msk.ru" 
              onClick={handleEmailClick}
              className="flex items-center gap-2 font-medium hover:underline"
            >
              <Mail className="h-4 w-4" />
              info@stroykomplekt-msk.ru
            </a>
          </div>
          
          <Button asChild className="hidden md:inline-flex">
            <Link href="#contacts">
              Заявка инженеру
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] flex flex-col">
              <nav className="flex-1 grid gap-4 text-lg font-medium pt-2">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold mb-6"
                >
                  <span>Полный ⚡ Порядок</span>
                </Link>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-accent transition-colors"
                >
                  О нас
                </Link>
                <Link
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    (document.querySelector('button[aria-expanded="true"]') as HTMLButtonElement)?.click(); // Close the mobile menu
                  }}
                  className="text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-accent transition-colors"
                >
                  Услуги
                </Link>
                <Link
                  href="#objects"
                  className="text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-accent transition-colors"
                >
                  Объекты
                </Link>
                <Link
                  href="#projects"
                  className="text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-accent transition-colors"
                >
                  Наши работы
                </Link>
              </nav>
              
              <div className="mt-auto pb-6 px-3">
                <div className="flex flex-col gap-3">
                  <Button asChild className="w-full" size="lg" onClick={handlePhoneClick}>
                    <a href="tel:+74956405863">
                      <Phone className="mr-2 h-4 w-4" />
                      +7 (495) 640-58-63
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full" size="lg" onClick={handleEmailClick}>
                    <a href="mailto:info@pp-msk.ru">
                      <Mail className="mr-2 h-4 w-4" />
                      Написать нам
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}