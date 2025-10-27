import { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Контакты | Полный ⚡ Порядок',
  description: 'Свяжитесь с нами для консультации по электромонтажным работам в Москве и МО',
};

export default function ContactsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">Контакты</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Наши контакты</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg">Телефон</h3>
                <a href="tel:+74956405863" className="text-primary hover:underline">+7 (495) 640-58-63</a>
              </div>
              <div>
                <h3 className="font-medium text-lg">Email</h3>
                <a href="mailto:info@pp-msk.ru" className="text-primary hover:underline">info@pp-msk.ru</a>
              </div>
              <div>
                <h3 className="font-medium text-lg">Адрес</h3>
                <p>г. Москва, ул. Электромонтажная, д. 1</p>
                <p className="text-sm text-muted-foreground">(по предварительной записи)</p>
              </div>
              <div>
                <h3 className="font-medium text-lg">Режим работы</h3>
                <p>Пн-Пт: 9:00 - 20:00</p>
                <p>Сб-Вс: по договоренности</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Написать нам</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
