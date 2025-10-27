'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

interface AnalyticsWrapperProps {
  METRIKA_ID?: string;
  GA_MEASUREMENT_ID?: string;
}

export function AnalyticsWrapper({ METRIKA_ID, GA_MEASUREMENT_ID }: AnalyticsWrapperProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run on client-side and if we're in production
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return;
    }

    // Check if user has opted out
    if (localStorage.getItem('analytics-opt-out') === 'true') {
      return;
    }

    try {
      if (pathname) {
        const url = `${pathname}${searchParams ? `?${searchParams.toString()}` : ''}`;
        
        // Track page view in Yandex.Metrika
        if (window.ym && METRIKA_ID) {
          try {
            window.ym(Number(METRIKA_ID), 'hit', url);
          } catch (e) {
            console.warn('Yandex.Metrika error:', e);
          }
        }
        
        // Track page view in Google Analytics
        if (window.gtag && GA_MEASUREMENT_ID) {
          try {
            window.gtag('config', GA_MEASUREMENT_ID, {
              page_path: url,
              transport_url: 'https://pp-msk.ru',
            });
          } catch (e) {
            console.warn('Google Analytics error:', e);
          }
        }
      }
    } catch (e) {
      console.warn('Analytics error:', e);
    }
  }, [pathname, searchParams, METRIKA_ID, GA_MEASUREMENT_ID]);

  // Don't load analytics in development or if user has opted out
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  // Don't load analytics if user has opted out
  if (typeof window !== 'undefined' && localStorage.getItem('analytics-opt-out') === 'true') {
    return null;
  }

  return (
    <>
      {/* Yandex.Metrika counter - Loaded with error handling */}
      {METRIKA_ID && (
        <Script
          id="yandex-metrika"
          strategy="lazyOnload"
          onError={(e) => {
            console.warn('Yandex.Metrika script failed to load', e);
          }}
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                try {
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) { return; }
                  }
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r;
                  k.onerror=function(){console.warn('Yandex.Metrika script load failed')};
                  a.parentNode.insertBefore(k,a);
                } catch(e) {
                  console.warn('Yandex.Metrika init error:', e);
                }
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              try {
                ym(${METRIKA_ID}, "init", {
                  clickmap: true,
                  trackLinks: true,
                  accurateTrackBounce: true,
                  webvisor: true,
                  trackHash: true
                });
              } catch(e) {
                console.warn('Yandex.Metrika config error:', e);
              }
            `,
          }}
        />
      )}

      {/* Google Analytics - Loaded with error handling */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            id="gtag-script"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="lazyOnload"
            onError={(e) => {
              console.warn('Google Analytics script failed to load', e);
            }}
          />
          <Script 
            id="google-analytics" 
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                    transport_url: 'https://pp-msk.ru',
                  });
                } catch(e) {
                  console.warn('Google Analytics error:', e);
                }
              `,
            }}
          />
        </>
      )}
    </>
  );
}
