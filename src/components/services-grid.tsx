'use client';

export function ServicesGrid() {
  return (
    <section className="relative py-20 bg-white">
      <div className="absolute inset-0 bg-[url('/backgrounds/services_background.png')] bg-contain bg-top-right bg-no-repeat opacity-10 lg:bg-fixed"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-white/80"></div>
      <div className="container relative z-10">
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
            <div key={index} className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-all hover:border-primary/20">
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
