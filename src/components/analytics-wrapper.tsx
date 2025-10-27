'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

// Analytics completely disabled for testing
export function AnalyticsWrapper() {
  // Don't load any analytics
  return null;
}
