// Project related types
export type ProjectCategory = 'Наружные сети' | 'Подстанции' | 'Кабельные линии' | 'Коммерческие' | 'Жилая';

export interface Service {
  title: string;
  slug: string;
  excerpt: string;
  description?: string;
  bullets: string[];
  categories: string[];
  price?: number;
  image?: string;
  order?: number;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: number;
  area?: string;
  blurb: string;
}

// Form related types
export interface ContactFormData {
  name: string;
  phone: string;
  message?: string;
  honeypot?: string;
  startedAt?: number;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Component props
export interface AnalyticsProps {
  env: {
    METRIKA_ID?: string;
    GA_MEASUREMENT_ID?: string;
  };
}
