'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

// This component is completely non-blocking and will not affect page load
// Analytics will only load after the page becomes interactive

export function AnalyticsWrapper() {
  // Don't load analytics in development
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  // Don't load analytics if user has opted out
  if (typeof window !== 'undefined' && localStorage.getItem('analytics-opt-out') === 'true') {
    return null;
  }

  // Load analytics scripts with a delay after page becomes interactive
  useEffect(() => {
    const loadAnalytics = () => {
      // Load Yandex.Metrika
      if (process.env.NEXT_PUBLIC_METRIKA_ID) {
        try {
          const script = document.createElement('script');
          script.innerHTML = `
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
                
                // Track page view after script loads
                k.addEventListener('load', function() {
                  try {
                    ym(${process.env.NEXT_PUBLIC_METRIKA_ID}, "hit", window.location.pathname);
                  } catch(e) {
                    console.warn('Yandex.Metrika hit error:', e);
                  }
                });
              } catch(e) {
                console.warn('Yandex.Metrika init error:', e);
              }
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          `;
          document.body.appendChild(script);
        } catch (e) {
          console.warn('Failed to load Yandex.Metrika:', e);
        }
      }

      // Load Google Analytics
      if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        try {
          // Load gtag.js
          const gtagScript = document.createElement('script');
          gtagScript.async = true;
          gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`;
          gtagScript.onerror = () => console.warn('Google Analytics script failed to load');
          
          // Add gtag config
          const configScript = document.createElement('script');
          configScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              transport_url: 'https://pp-msk.ru',
              // Disable features that might cause issues
              send_page_view: false,
              anonymize_ip: true,
              use_amp_client_id: false
            });
          `;
          
          // Add to document
          document.head.appendChild(gtagScript);
          document.head.appendChild(configScript);
        } catch (e) {
          console.warn('Failed to load Google Analytics:', e);
        }
      }
    };

    // Wait for page to be interactive before loading analytics
    if (document.readyState === 'complete') {
      // If page is already loaded, wait a bit more
      setTimeout(loadAnalytics, 1000);
    } else {
      // Wait for page to be interactive
      window.addEventListener('load', () => {
        setTimeout(loadAnalytics, 1000);
      }, { once: true });
    }

    // Cleanup function
    return () => {
      // Remove any dynamically added scripts
      document.querySelectorAll('script[src*="yandex"], script[src*="googletagmanager"]')
        .forEach(script => script.remove());
    };
  }, []);

  // This component doesn't render anything
  return null;
}
