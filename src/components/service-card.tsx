'use client';

import Link from 'next/link';
import { Service } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: Service & { categories?: string[] };
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md", className)}>
      <Link href={`/services/${service.slug}`} className="block h-full">
        <div className="aspect-video overflow-hidden bg-muted">
          {service.image ? (
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted/50">
              <span className="text-muted-foreground">Изображение отсутствует</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold leading-tight">{service.title}</h3>
          {service.description && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {service.description}
            </p>
          )}
          {service.categories && service.categories.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {service.categories.slice(0, 2).map((category) => (
                <span 
                  key={category} 
                  className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {category}
                </span>
              ))}
              {service.categories.length > 2 && (
                <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  +{service.categories.length - 2}
                </span>
              )}
            </div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium">
              {service.price ? `от ${service.price} ₽` : 'Цена по запросу'}
            </span>
            <span className="inline-flex items-center text-sm text-primary transition-colors group-hover:text-primary/80">
              Подробнее
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1 h-4 w-4"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
