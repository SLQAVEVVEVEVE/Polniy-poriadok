export {};

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    ym?: {
      (id: number, event: 'reachGoal', goalName: string, params?: any): void;
      (id: number, event: 'hit', url: string, options?: any): void;
      (id: number, event: string, nameOrUrl?: string, options?: any): void;
    };
  }
}

declare const gtag: typeof window.gtag;
declare const ym: typeof window.ym;