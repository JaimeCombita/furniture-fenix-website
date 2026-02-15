import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { HomePage } from './pages/Home';
import { CatalogPage } from './pages/Catalog';
import { ContactPage } from './pages/Contact';
import { ServicesPage } from './pages/Services';
import { ProductDetailPage } from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalogo" element={<CatalogPage />} />
          <Route path="servicios" element={<ServicesPage />} />
          <Route path="producto/:id" element={<ProductDetailPage />} />
          <Route path="contacto" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
