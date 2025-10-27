'use client';

export function WhyUs() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Почему выбирают нас
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Наши преимущества, которые делают нас лучшим выбором для вашего проекта
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Опыт',
              description: 'Более 10 лет успешной работы в сфере электромонтажа'
            },
            {
              title: 'Качество',
              description: 'Используем только проверенные материалы и оборудование'
            },
            {
              title: 'Гарантия',
              description: 'Предоставляем гарантию на все виды работ'
            },
            {
              title: 'Скорость',
              description: 'Оперативное выполнение работ любой сложности'
            },
            {
              title: 'Команда',
              description: 'Квалифицированные специалисты с большим опытом работы'
            },
            {
              title: 'Под ключ',
              description: 'Полный комплекс услуг от проекта до сдачи объекта'
            }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-card rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
