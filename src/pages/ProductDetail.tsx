import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Spinner } from '../components/ui';
import { useProductsQuery } from '../hooks';
import { useMetaTags } from '../hooks/useMetaTags';
import type { Product } from '../types';
import { SITE_URL } from '../utils/constants';
import { resolveProductImage } from '../utils/resolveProductImage';
import './ProductDetail.css';

interface ProductImageCarouselProps {
  images: string[];
  name: string;
}

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({ images, name }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const resolvedImages = useMemo(
    () => images.map((image) => resolveProductImage(image)),
    [images]
  );

  useEffect(() => {
    if (!resolvedImages || resolvedImages.length <= 1) return;
    if (isCarouselPaused) return;

    const intervalId = window.setInterval(() => {
      setCurrentImageIndex((prev: number) =>
        prev === resolvedImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [resolvedImages, isCarouselPaused]);

  const handlePrevImage = () => {
    if (resolvedImages.length > 0) {
      setCurrentImageIndex((prev: number) =>
        prev === 0 ? resolvedImages.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (resolvedImages.length > 0) {
      setCurrentImageIndex((prev: number) =>
        prev === resolvedImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsCarouselPaused(true);
  };

  return (
    <div
      className="image-carousel"
      onMouseEnter={() => setIsCarouselPaused(true)}
      onMouseLeave={() => setIsCarouselPaused(false)}
    >
      <div className="main-image">
        {resolvedImages.length > 0 ? (
          <>
            <img
              src={resolvedImages[currentImageIndex]}
              alt={`${name} - Imagen ${currentImageIndex + 1}`}
              loading="eager"
              decoding="async"
            />

            {resolvedImages.length > 1 && (
              <>
                <button
                  className="carousel-btn prev-btn"
                  onClick={handlePrevImage}
                  aria-label="Imagen anterior"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  className="carousel-btn next-btn"
                  onClick={handleNextImage}
                  aria-label="Imagen siguiente"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
                <div className="carousel-indicators">
                  {resolvedImages.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => handleThumbnailClick(index)}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="image-placeholder">
            <i className="fas fa-image fa-5x"></i>
            <p>Imagen no disponible</p>
          </div>
        )}
      </div>

      {resolvedImages.length > 1 && (
        <div className="thumbnails-container">
          {resolvedImages.map((image, index) => (
            <button
              key={index}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={image}
                alt={`Miniatura ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
  } = useProductsQuery();

  const [alertDismissed, setAlertDismissed] = useState(false);

  const product = (productsData?.products.find((p: Product) => p.id === id) || null) as Product | null;

  // Meta tags dinámicos para SEO
  useMetaTags({
    title: product?.name || 'Producto',
    description: product?.description || 'Descubre este producto de Fénix - Mobiliario institucional de calidad.',
    image: product?.images?.[0] 
      ? `${SITE_URL}${resolveProductImage(product.images[0])}`
      : `${SITE_URL}/images/branding/logo.jpeg`,
    url: `${SITE_URL}/producto/${id}`,
    type: 'product',
    keywords: product ? `${product.name}, ${product.category}, mobiliario` : 'mobiliario'
  });

  const notFoundProduct: Product = {
    id: id || 'unknown',
    code: 'UNK0000000',
    name: 'Producto no encontrado',
    description: 'El producto que buscas no está disponible en este momento.',
    category: 'mesas',
    subcategory: null,
    images: [],
    features: [],
    featured: false
  };

  const handleBack = () => {
    navigate(-1);
  };

  const displayProduct = product || notFoundProduct;

  if (isLoading || isError || !productsData) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            {isLoading ? (
              <Spinner label="Cargando producto..." />
            ) : !alertDismissed ? (
              <Alert
                title="No pudimos cargar el producto"
                message="Verifica tu conexion y vuelve a intentar."
                actionLabel="Reintentar"
                onAction={() => {
                  setAlertDismissed(false);
                  refetch();
                }}
                onClose={() => setAlertDismissed(true)}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i>
          Volver
        </button>

        <div className="product-detail-grid">
          <div className="product-image-section">
            <ProductImageCarousel
              key={displayProduct.id}
              images={displayProduct.images || []}
              name={displayProduct.name}
            />
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{displayProduct.name}</h1>

            <p className="product-full-description">{displayProduct.description}</p>

            {displayProduct.features && displayProduct.features.length > 0 && (
              <div className="product-features">
                <h3>Características principales:</h3>
                <ul>
                  {displayProduct.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="action-buttons">
              <Link to={`/contacto?producto=${displayProduct.id}`}>
                <Button variant="primary" size="lg">
                  <i className="fas fa-envelope"></i>
                  Solicitar Cotización
                </Button>
              </Link>
              <Link to="/catalogo">
                <Button variant="outline" size="lg">
                  Ver Catálogo
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="additional-info-section">
          <div className="info-grid">
            <div className="info-card">
              <i className="fas fa-truck fa-2x"></i>
              <h4>Envío Nacional</h4>
              <p>Entrega en todo el país</p>
            </div>
            <div className="info-card">
              <i className="fas fa-shield-alt fa-2x"></i>
              <h4>Garantía</h4>
              <p>Hasta 3 años de garantía</p>
            </div>
            <div className="info-card">
              <i className="fas fa-tools fa-2x"></i>
              <h4>Instalación</h4>
              <p>Servicio de instalación incluido</p>
            </div>
            <div className="info-card">
              <i className="fas fa-headset fa-2x"></i>
              <h4>Soporte</h4>
              <p>Asesoría técnica permanente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
