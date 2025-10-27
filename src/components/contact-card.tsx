'use client';

import { Button } from '@/components/ui/button';
import { MapPin, Clock, Mail, Phone } from 'lucide-react';

export function ContactCard() {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
          <div>
            <h4 className="font-medium">Адрес</h4>
            <p className="text-sm text-muted-foreground">
              г. Москва, ул. Никулинская, д. 2, к. 1
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Clock className="h-5 w-5 mt-0.5 text-muted-foreground" />
          <div>
            <h4 className="font-medium">Часы работы</h4>
            <p className="text-sm text-muted-foreground">
              Пн-Пт: 9:00 - 18:00<br />
              Сб-Вс: Выходной
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Phone className="h-5 w-5 mt-0.5 text-muted-foreground" />
          <div>
            <h4 className="font-medium">Телефон</h4>
            <a 
              href="tel:+74951234567" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              +7 (495) 123-45-67
            </a>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
          <div>
            <h4 className="font-medium">Email</h4>
            <a 
              href="mailto:info@example.com" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              info@example.com
            </a>
          </div>
        </div>
      </div>
      <Button className="mt-6 w-full" size="lg">
        Заказать звонок
      </Button>
    </div>
  );
}
