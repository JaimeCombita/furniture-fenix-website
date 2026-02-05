import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import productsData from '../data/products.json';
import type { Product } from '../types';
import './ProductDetail.css';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = (productsData.products.find(p => p.id === id) || null) as Product | null;

  const notFoundProduct: Product = {
    id: id || 'unknown',
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

  const handlePrevImage = () => {
    if (displayProduct.images && displayProduct.images.length > 0) {
      setCurrentImageIndex((prev: number) => 
        prev === 0 ? displayProduct.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (displayProduct.images && displayProduct.images.length > 0) {
      setCurrentImageIndex((prev: number) => 
        prev === displayProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i>
          Volver
        </button>

        <div className="product-detail-grid">
          <div className="product-image-section">
            <div className="image-carousel">
              <div className="main-image">
                {displayProduct.images && displayProduct.images.length > 0 ? (
                  <>
                    <img 
                      src={displayProduct.images[currentImageIndex]} 
                      alt={`${displayProduct.name} - Imagen ${currentImageIndex + 1}`}
                    />
                    
                    {displayProduct.images.length > 1 && (
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
                          {displayProduct.images.map((_, index) => (
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

              {displayProduct.images && displayProduct.images.length > 1 && (
                <div className="thumbnails-container">
                  {displayProduct.images.map((image, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <img src={image} alt={`Miniatura ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
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
