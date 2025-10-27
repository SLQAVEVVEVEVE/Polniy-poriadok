import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t bg-gray-50">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Полный <span className="text-primary">⚡</span> Порядок</h3>
            <p className="text-sm text-muted-foreground">
              Профессиональные электромонтажные работы в Москве и Московской области
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Контакты</h4>
            <ul className="space-y-2 text-sm">
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
            <ul className="space-y-2 text-sm">
              <li><Link href="/#services" className="hover:underline">Услуги</Link></li>
              <li><Link href="/#objects" className="hover:underline">Объекты</Link></li>
              <li><Link href="/projects" className="hover:underline">Проекты</Link></li>
              <li><Link href="/contacts" className="hover:underline">Контакты</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Документы</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:underline">Политика конфиденциальности</Link></li>
              <li><Link href="/consent" className="hover:underline">Согласие на обработку данных</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} ООО «Стройкомплект». Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
