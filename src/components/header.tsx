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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
          Полный <span className="text-primary">⚡</span> Порядок
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="#about" className="transition-colors hover:text-primary">
            О нас
          </Link>
          <Link href="/services" className="transition-colors hover:text-primary">
            Услуги
          </Link>
          <Link href="#objects" className="transition-colors hover:text-primary">
            Объекты
          </Link>
          <Link href="#projects" className="transition-colors hover:text-primary">
            Наши работы
          </Link>
          <Link href="#contacts" className="transition-colors hover:text-primary">
            Контакты
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
          
          <Button asChild>
            <Link href="#contacts">
              Заявка инженеру
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 pt-6">
                <Link href="#about" className="py-2 font-medium">
                  О нас
                </Link>
                <Link href="#services" className="py-2 font-medium">
                  Услуги
                </Link>
                <Link href="#objects" className="py-2 font-medium">
                  Объекты
                </Link>
                <Link href="#projects" className="py-2 font-medium">
                  Наши работы
                </Link>
                <Link href="#contacts" className="py-2 font-medium">
                  Контакты
                </Link>
                <div className="pt-4 border-t mt-2 space-y-3">
                  <a 
                    href="tel:+74956405863" 
                    onClick={handlePhoneClick}
                    className="flex items-center gap-2 py-2 font-medium"
                  >
                    <Phone className="h-4 w-4" />
                    +7 (495) 640-58-63
                  </a>
                  <a 
                    href="mailto:info@stroykomplekt-msk.ru" 
                    onClick={handleEmailClick}
                    className="flex items-center gap-2 py-2 font-medium"
                  >
                    <Mail className="h-4 w-4" />
                    info@stroykomplekt-msk.ru
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}