import { Metadata } from 'next';

type SchemaOrgData = Record<string, any>;

/**
 * Generates Organization/LocalBusiness schema.org data
 */
export function generateOrganizationSchema(): SchemaOrgData {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pp-msk.ru';
  
  return {
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#organization`,
    name: 'Полный ⚡ Порядок',
    alternateName: 'Полный Порядок',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Профессиональные электромонтажные работы в Москве и Московской области',
    telephone: '+74951234567',
    email: 'info@pp-msk.ru',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Примерная, д. 1',
      addressLocality: 'Москва',
      postalCode: '123456',
      addressCountry: 'RU',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://vk.com/example',
      'https://t.me/example',
    ],
  };
}

/**
 * Generates BreadcrumbList schema.org data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; item: string }>): SchemaOrgData {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stroykomplekt-msk.ru';
  
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item.startsWith('http') ? item.item : `${baseUrl}${item.item}`,
    })),
  };
}

/**
 * Generates WebPage schema.org data
 */
export function generateWebPageSchema({
  name,
  description,
  url,
  breadcrumbs,
}: {
  name: string;
  description: string;
  url: string;
  breadcrumbs?: Array<{ name: string; item: string }>;
}): SchemaOrgData {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stroykomplekt-msk.ru';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  return {
    '@type': 'WebPage',
    name,
    description,
    url: fullUrl,
    ...(breadcrumbs && {
      breadcrumb: generateBreadcrumbSchema(breadcrumbs),
    }),
  };
}
