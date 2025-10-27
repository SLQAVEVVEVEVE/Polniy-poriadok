import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="relative border-t bg-[#0A0A0A] text-white">
      <div className="absolute inset-0 z-0 bg-footer opacity-30 mix-blend-multiply pointer-events-none"></div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0A0A0A]/95 via-[#0A0A0A]/90 to-[#1A1A1A] pointer-events-none"></div>
      <div className="container relative z-10 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Полный <span className="text-primary">⚡</span> Порядок</h3>
            <p className="text-sm text-gray-300">
              Профессиональные электромонтажные работы в Москве и Московской области
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Москва, ул. Никулинская, д. 2, к. 1</li>
              <li>
                <a href="tel:+74956405863" className="hover:underline">
                  +7 (495) 640-58-63
                </a>
              </li>
              <li>
                <a href="mailto:info@pp-msk.ru" className="hover:underline">
                  info@pp-msk.ru
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Навигация</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/#services" className="hover:text-primary transition-colors">Услуги</Link></li>
              <li><Link href="/#objects" className="hover:text-primary transition-colors">Объекты</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Проекты</Link></li>
              <li><Link href="/contacts" className="hover:text-primary transition-colors">Контакты</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Документы</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Политика конфиденциальности</Link></li>
              <li><Link href="/consent" className="hover:text-primary transition-colors">Согласие на обработку данных</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p className="text-gray-400">© {currentYear} Полный ⚡ Порядок. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
