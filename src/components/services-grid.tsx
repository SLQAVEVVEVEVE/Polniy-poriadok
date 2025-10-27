'use client';

import { useState } from 'react';
import Image from 'next/image';

type Service = {
  id: string;
  title: string;
  description: string;
  categories: string[];
  price?: string;
};

const servicesData: Service[] = [
  {
    id: '1',
    title: 'Электромонтаж квартир',
    description: 'Полный комплекс работ по электромонтажу в квартирах под ключ',
    categories: ['electrical', 'residential'],
    price: 'от 2 500 ₽/м²'
  },
  {
    id: '2',
    title: 'Электромонтаж домов',
    description: 'Наружный и внутренний электромонтаж частных домов и коттеджей',
    categories: ['electrical', 'residential', 'outdoor'],
    price: 'от 3 000 ₽/м²'
  },
  {
    id: '3',
    title: 'Офисный электромонтаж',
    description: 'Электромонтажные работы в офисных и коммерческих помещениях',
    categories: ['electrical', 'commercial'],
    price: 'от 1 800 ₽/м²'
  },
  {
    id: '4',
    title: 'Проектирование',
    description: 'Разработка проектов электроснабжения любой сложности',
    categories: ['design', 'planning'],
    price: 'от 300 ₽/м²'
  },
  {
    id: '5',
    title: 'Ремонт и замена электропроводки',
    description: 'Качественный ремонт и замена старой электропроводки',
    categories: ['electrical', 'maintenance'],
    price: 'от 2 000 ₽'
  },
  {
    id: '6',
    title: 'Установка электрощитов',
    description: 'Монтаж и сборка распределительных щитов',
    categories: ['electrical', 'installation'],
    price: 'от 5 000 ₽'
  },
  {
    id: '7',
    title: 'Монтаж систем заземления',
    description: 'Установка контура заземления для частных домов',
    categories: ['electrical', 'outdoor', 'safety'],
    price: 'от 15 000 ₽'
  },
  {
    id: '8',
    title: 'Монтаж систем молниезащиты',
    description: 'Установка наружной и внутренней молниезащиты',
    categories: ['electrical', 'safety', 'outdoor'],
    price: 'от 20 000 ₽'
  },
  {
    id: '9',
    title: 'Установка розеток и выключателей',
    description: 'Монтаж и подключение электроустановочных изделий',
    categories: ['electrical', 'installation'],
    price: 'от 500 ₽/шт'
  }
];

const categories = [
  { id: 'all', name: 'Все услуги' },
  { id: 'electrical', name: 'Электромонтаж' },
  { id: 'design', name: 'Проектирование' },
  { id: 'residential', name: 'Квартиры и дома' },
  { id: 'commercial', name: 'Коммерческие объекты' },
  { id: 'safety', name: 'Безопасность' },
  { id: 'outdoor', name: 'Наружные работы' },
  { id: 'maintenance', name: 'Обслуживание' },
  { id: 'installation', name: 'Установка' },
  { id: 'planning', name: 'Планирование' }
];

export function ServicesGrid() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = activeCategory === 'all' 
    ? servicesData 
    : servicesData.filter(service => service.categories.includes(activeCategory));

  return (
    <section className="relative py-20 bg-white" id="services">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/10"></div>
        <Image
          src="/backgrounds/services_background.png"
          alt=""
          fill
          className="object-cover md:object-contain object-right-top"
          style={{
            opacity: 0.7,
            filter: 'contrast(1.1) brightness(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-white/70"></div>
      </div>
      <div className="container relative z-10">
        <div className="mx-auto max-w-5xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Наши услуги
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Полный спектр электромонтажных работ под ключ
          </p>
          
          {/* Category Filter */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white/80 text-foreground hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <div key={service.id} className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-all hover:border-primary/20 flex flex-col">
              <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-muted-foreground flex-grow">{service.description}</p>
              {service.price && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <span className="text-primary font-medium">{service.price}</span>
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {service.categories.slice(0, 2).map((category) => {
                  const categoryName = categories.find(c => c.id === category)?.name || category;
                  return (
                    <span 
                      key={category} 
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                    >
                      {categoryName}
                    </span>
                  );
                })}
                {service.categories.length > 2 && (
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-400 rounded-full">
                    +{service.categories.length - 2}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
