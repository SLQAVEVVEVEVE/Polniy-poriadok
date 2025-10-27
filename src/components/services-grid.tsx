'use client';

export function ServicesGrid() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Наши услуги
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Полный спектр электромонтажных работ под ключ
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Электромонтаж квартир',
              description: 'Полный комплекс работ по электромонтажу в квартирах под ключ'
            },
            {
              title: 'Электромонтаж домов',
              description: 'Наружный и внутренний электромонтаж частных домов и коттеджей'
            },
            {
              title: 'Офисный электромонтаж',
              description: 'Электромонтажные работы в офисных и коммерческих помещениях'
            },
            {
              title: 'Проектирование',
              description: 'Разработка проектов электроснабжения любой сложности'
            },
            {
              title: 'Ремонт и замена проводки',
              description: 'Качественный ремонт и замена старой электропроводки'
            },
            {
              title: 'Аварийные работы',
              description: 'Срочный вызов электрика для устранения неисправностей'
            }
          ].map((service, index) => (
            <div key={index} className="p-6 bg-card rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
