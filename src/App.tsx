import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/queryClient';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/Home'));
const CatalogPage = lazy(() => import('./pages/Catalog'));
const ContactPage = lazy(() => import('./pages/Contact'));
const ServicesPage = lazy(() => import('./pages/Services'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetail'));

// Loading component
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
    <div>Cargando...</div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
            <Route path="catalogo" element={<Suspense fallback={<PageLoader />}><CatalogPage /></Suspense>} />
            <Route path="servicios" element={<Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>} />
            <Route path="producto/:id" element={<Suspense fallback={<PageLoader />}><ProductDetailPage /></Suspense>} />
            <Route path="contacto" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
