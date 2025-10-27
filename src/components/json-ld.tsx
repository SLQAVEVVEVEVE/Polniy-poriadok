'use client';

interface JsonLdProps {
  data: Record<string, any>;
  id?: string;
}

export function JsonLd({ data, id = 'json-ld' }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          ...data,
        }),
      }}
    />
  );
}
