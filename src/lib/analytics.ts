// src/lib/analytics.ts
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    ym?: (id: number, event: string, eventName: string, options?: any) => void;
  }
}

export function trackEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', name, params);
  }

  // Yandex Metrika
  if (window.ym && process.env.NEXT_PUBLIC_METRIKA_ID) {
    try {
      window.ym(
        Number(process.env.NEXT_PUBLIC_METRIKA_ID),
        'reachGoal',
        name,
        params
      );
    } catch (e) {
      console.error('Yandex Metrika error:', e);
    }
  }
}

export function trackPageView(url: string) {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if (window.gtag && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }

  // Yandex Metrika
  if (window.ym && process.env.NEXT_PUBLIC_METRIKA_ID) {
    try {
      window.ym(Number(process.env.NEXT_PUBLIC_METRIKA_ID), 'hit', url);
    } catch (e) {
      console.error('Yandex Metrika error:', e);
    }
  }
}