/**
 * Servicio para monitorear Core Web Vitals
 * Envía métricas a Google Analytics automáticamente
 */

import {
  onCLS,
  onFCP,
  onINP,
  onLCP,
  onTTFB,
  type Metric,
} from 'web-vitals';

interface VitalMetrics {
  name: 'LCP' | 'INP' | 'CLS' | 'FCP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

type GtagWindow = Window & {
  gtag?: (event: string, action: string, params: Record<string, string | number>) => void;
};

/**
 * Iniciar tracking de Web Vitals
 * Envía datos a Google Analytics si está disponible
 */
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return;
  onLCP(sendMetricToAnalytics);
  onINP(sendMetricToAnalytics);
  onCLS(sendMetricToAnalytics);
  onFCP(sendMetricToAnalytics);
  onTTFB(sendMetricToAnalytics);
};

export const trackRuntimeErrors = () => {
  if (typeof window === 'undefined') return;

  const analyticsWindow = window as GtagWindow;
  if (!analyticsWindow.gtag) return;

  window.addEventListener('error', (event) => {
    analyticsWindow.gtag?.('event', 'runtime_error', {
      message: event.message || 'unknown_error',
      source: event.filename || 'unknown_source',
      line: event.lineno || 0,
      column: event.colno || 0,
      page_path: window.location.pathname,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason =
      typeof event.reason === 'string'
        ? event.reason
        : event.reason instanceof Error
          ? event.reason.message
          : 'unknown_rejection';

    analyticsWindow.gtag?.('event', 'runtime_rejection', {
      message: reason,
      page_path: window.location.pathname,
    });
  });
};

/**
 * Enviar métrica a Google Analytics
 */
function sendMetricToAnalytics(metric: Metric) {
  const analyticsWindow = window as GtagWindow;

  if (!analyticsWindow.gtag) {
    return;
  }

  const sanitizedMetric: VitalMetrics = {
    name: metric.name as VitalMetrics['name'],
    value: metric.value,
    rating: metric.rating,
  };

  analyticsWindow.gtag('event', 'web_vitals', {
    metric_id: sanitizedMetric.name,
    metric_value: Math.round(sanitizedMetric.value),
    metric_rating: sanitizedMetric.rating,
    page_path: window.location.pathname
  });

  if (!import.meta.env.PROD) {
    console.log(
      `📊 ${sanitizedMetric.name}: ${Math.round(sanitizedMetric.value)} (${sanitizedMetric.rating})`
    );
  }
}

export type { VitalMetrics };
