"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { trackPageView } from '@/lib/analytics';

interface AnalyticsProps {
  env: {
    METRIKA_ID?: string
    GA_MEASUREMENT_ID?: string
  }
}

export function Analytics({ env }: AnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { METRIKA_ID, GA_MEASUREMENT_ID } = env || {}

  useEffect(() => {
    if (!METRIKA_ID && !GA_MEASUREMENT_ID) return
    
    const url = pathname + searchParams.toString()
    trackPageView(url);
  }, [pathname, searchParams, METRIKA_ID, GA_MEASUREMENT_ID])

  if (!METRIKA_ID && !GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      {/* Yandex.Metrika counter */}
      {METRIKA_ID && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${METRIKA_ID}, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </Script>
      )}

      {/* Google tag (gtag.js) */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}
      
      {/* Yandex Metrika noscript fallback */}
      {METRIKA_ID && (
        <noscript>
          <div>
            <img 
              src={`https://mc.yandex.ru/watch/${METRIKA_ID}`} 
              style={{ position: 'absolute', left: '-9999px' }} 
              alt="" 
            />
          </div>
        </noscript>
      )}
    </>
    
  )
  
}
