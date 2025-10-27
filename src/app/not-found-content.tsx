'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function NotFoundContent() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Страница не найдена</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        К сожалению, мы не смогли найти запрашиваемую страницу.
      </p>
      <Button asChild>
        <Link href="/">
          Вернуться на главную
        </Link>
      </Button>
    </div>
  );
}
