'use client';

import { Suspense } from 'react';
import { NotFoundContent } from './not-found-content';

export default function NotFound() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    }>
      <NotFoundContent />
    </Suspense>
  );
}
