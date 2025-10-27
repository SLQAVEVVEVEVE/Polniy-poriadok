'use client';

export function ClientsStrip() {
  const clients = [
    { name: 'Client 1', logo: '/clients/client1.svg' },
    { name: 'Client 2', logo: '/clients/client2.svg' },
    { name: 'Client 3', logo: '/clients/client3.svg' },
    { name: 'Client 4', logo: '/clients/client4.svg' },
    { name: 'Client 5', logo: '/clients/client5.svg' },
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground">Нам доверяют</h2>
          <p className="mt-2 text-muted-foreground">Сотрудничаем с ведущими компаниями</p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {clients.map((client, index) => (
            <div 
              key={index}
              className="h-12 w-32 bg-muted rounded flex items-center justify-center"
              title={client.name}
            >
              <span className="text-muted-foreground">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
