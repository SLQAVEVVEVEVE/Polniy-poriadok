'use client';

export function ObjectsGrid() {
  return (
    <section className="py-20 bg-muted/10">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Наши объекты
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Примеры выполненных работ по электромонтажу
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Квартира в ЖК "Солнечный"',
              description: 'Полный электромонтаж 3-комнатной квартиры',
              area: '85 м²',
              time: '14 дней'
            },
            {
              title: 'Загородный дом в Подмосковье',
              description: 'Электромонтаж частного дома с участком',
              area: '150 м²',
              time: '21 день'
            },
            {
              title: 'Офисный центр',
              description: 'Электромонтаж офисных помещений',
              area: '300 м²',
              time: '30 дней'
            },
            {
              title: 'Кафе "Уют"',
              description: 'Электромонтаж кафе с нуля',
              area: '120 м²',
              time: '18 дней'
            },
            {
              title: 'Магазин "Продукты"',
              description: 'Электромонтаж торгового зала и подсобных помещений',
              area: '200 м²',
              time: '25 дней'
            },
            {
              title: 'Квартира в новостройке',
              description: 'Черновая и чистовая электрика в новостройке',
              area: '65 м²',
              time: '12 дней'
            }
          ].map((object, index) => (
            <div key={index} className="flex flex-col h-full overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all hover:shadow-md">
              <div className="aspect-[4/3] bg-muted/50">
                <div className="flex h-full items-center justify-center text-muted-foreground/50">
                  <span className="text-sm">Изображение объекта</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold leading-tight">{object.title}</h3>
                <p className="mt-2 text-muted-foreground line-clamp-2">{object.description}</p>
                <div className="mt-6 pt-4 border-t border-border/20 flex items-center justify-between text-sm text-muted-foreground">
                  <span className="font-medium">{object.area}</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{object.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
