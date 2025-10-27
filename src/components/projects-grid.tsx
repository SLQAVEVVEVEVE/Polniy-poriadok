'use client';

import { Button } from '@/components/ui/button';

export function ProjectsGrid() {
  return (
    <section className="relative py-20 bg-white">
      <div className="absolute inset-0 z-0 bg-projects opacity-15 pointer-events-none"></div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/20 via-white/40 to-white/60 pointer-events-none"></div>
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Примеры выполненных проектов
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Реализованные проекты по электромонтажным работам
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Жилой комплекс "Эко Парк"',
              description: 'Электромонтаж в новостройке',
              year: '2023',
              details: 'Более 100 квартир с полной разводкой электрики'
            },
            {
              title: 'Бизнес-центр "Плаза"',
              description: 'Комплексный электромонтаж',
              year: '2023',
              details: '5 этажей офисных помещений'
            },
            {
              title: 'ТРЦ "Галерея"',
              description: 'Электроснабжение торгового центра',
              year: '2022',
              details: 'Общая площадь 15,000 м²'
            },
            {
              title: 'ЖК "Резиденции на набережной"',
              description: 'Электромонтаж премиум-класса',
              year: '2022',
              details: 'Элитная отделка и умный дом'
            },
            {
              title: 'Отель "Президент"',
              description: 'Полный цикл электромонтажных работ',
              year: '2021',
              details: '4-звездочный отель на 150 номеров'
            },
            {
              title: 'Спортивный комплекс "Олимп"',
              description: 'Электроснабжение и освещение',
              year: '2021',
              details: 'Современное спортивное сооружение'
            }
          ].map((project, index) => (
            <div key={index} className="group flex flex-col h-full overflow-hidden rounded-xl border border-border/50 bg-white/80 backdrop-blur-sm shadow-sm transition-all hover:shadow-md hover:border-primary/20">
              <div className="aspect-[4/3] bg-muted/50">
                <div className="flex h-full items-center justify-center text-muted-foreground/50">
                  <span className="text-sm">Фото проекта</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-primary">{project.year}</span>
                  <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/50 rounded-full">
                    {project.details}
                  </span>
                </div>
                <h3 className="text-xl font-semibold leading-tight line-clamp-2">{project.title}</h3>
                <p className="mt-2 text-muted-foreground line-clamp-2 text-sm">{project.description}</p>
                <div className="mt-auto pt-4">
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    Подробнее
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
