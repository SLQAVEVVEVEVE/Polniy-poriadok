import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getServiceBySlug, servicesData } from '@/lib/services-data';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-6 pl-0">
            <Link href="/services" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Назад к услугам
            </Link>
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {service.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {service.excerpt}
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <h2>Что входит в услугу:</h2>
          <ul className="space-y-2">
            {service.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start">
                <svg className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-primary/5 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Заказать {service.title.toLowerCase()}</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Оставьте заявку и наш специалист свяжется с вами для уточнения деталей и расчета стоимости работ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="#contacts">
                Оставить заявку
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="tel:+74951234567">
                Позвонить нам
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
