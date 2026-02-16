/**
 * Servicio para monitorear Core Web Vitals
 * Envía métricas a Google Analytics automáticamente
 */

interface VitalMetrics {
  name: 'LCP' | 'FID' | 'CLS' | 'FCP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

/**
 * Iniciar tracking de Web Vitals
 * Envía datos a Google Analytics si está disponible
 */
export const trackWebVitals = () => {
  // Verificar si estamos en el navegador
  if (typeof window === 'undefined') return;
  
  // LCP - Largest Contentful Paint (ideal < 2.5s)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        const lcp = lastEntry.renderTime || lastEntry.loadTime;
        const rating = getLCPRating(lcp);
        
        sendMetricToAnalytics({
          name: 'LCP',
          value: Math.round(lcp),
          rating
        });
        
        if (!import.meta.env.PROD) {
          console.log(`📊 LCP: ${Math.round(lcp)}ms (${rating})`);
        }
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('LCP tracking not supported', e);
    }
    
    // CLS - Cumulative Layout Shift (ideal < 0.1)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        
        const rating = getCLSRating(clsValue);
        sendMetricToAnalytics({
          name: 'CLS',
          value: Math.round(clsValue * 10000) / 10000,
          rating
        });
        
        if (!import.meta.env.PROD) {
          console.log(`📊 CLS: ${(clsValue * 100).toFixed(2)}% (${rating})`);
        }
      });
      
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.warn('CLS tracking not supported', e);
    }
    
    // FID - First Input Delay (ideal < 100ms)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstInput = entries[0];
        
        const fid = (firstInput as any).processingDuration;
        const rating = getFIDRating(fid);
        
        sendMetricToAnalytics({
          name: 'FID',
          value: Math.round(fid),
          rating
        });
        
        if (!import.meta.env.PROD) {
          console.log(`📊 FID: ${Math.round(fid)}ms (${rating})`);
        }
      });
      
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.warn('FID tracking not supported', e);
    }
  }
  
  // FCP - First Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        const fcp = lastEntry.startTime;
        
        if (!import.meta.env.PROD) {
          console.log(`📊 FCP: ${Math.round(fcp)}ms`);
        }
      });
      
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch (e) {
      console.warn('FCP tracking not supported', e);
    }
  }
  
  // TTFB - Time to First Byte
  if ('performance' in window && 'timing' in performance) {
    const perf = window.performance.timing;
    const ttfb = perf.responseStart - perf.navigationStart;
    
    if (!import.meta.env.PROD) {
      console.log(`📊 TTFB: ${Math.round(ttfb)}ms`);
    }
  }
};

/**
 * Calificar LCP (Largest Contentful Paint)
 */
function getLCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
  if (value < 2500) return 'good';
  if (value < 4000) return 'needs-improvement';
  return 'poor';
}

/**
 * Calificar FID (First Input Delay)
 */
function getFIDRating(value: number): 'good' | 'needs-improvement' | 'poor' {
  if (value < 100) return 'good';
  if (value < 300) return 'needs-improvement';
  return 'poor';
}

/**
 * Calificar CLS (Cumulative Layout Shift)
 */
function getCLSRating(value: number): 'good' | 'needs-improvement' | 'poor' {
  if (value < 0.1) return 'good';
  if (value < 0.25) return 'needs-improvement';
  return 'poor';
}

/**
 * Enviar métrica a Google Analytics
 */
function sendMetricToAnalytics(metric: VitalMetrics) {
  // Verificar si gtag está disponible (Google Analytics)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'web_vitals', {
      metric_id: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
      page_path: window.location.pathname
    });
  }
}

export type { VitalMetrics };
