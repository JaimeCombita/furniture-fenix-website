import React, { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero, CategoryCard } from '../components/features';
import { Alert, Button, Card, Spinner } from '../components/ui';
import { CATEGORIES, SERVICES } from '../utils/constants';
import { useProductsQuery } from '../hooks';
import { useMetaTags } from '../hooks/useMetaTags';
import nuestroTrabajoVideo from '../assets/nuestro-trabajo.mp4';
import trabajoImagen1 from '../assets/images/landing/img-5.jpeg';
import trabajoImagen2 from '../assets/images/landing/img-6.jpeg';
import trabajoImagen3 from '../assets/images/landing/img-8.jpeg';
import './Home.css';

type WorkMediaItem = {
  id: string;
  type: 'video' | 'image';
  src: string;
  alt: string;
};

export const HomePage: React.FC = () => {
  // Meta tags para SEO
  useMetaTags({
    title: 'Inicio',
    description: 'Fénix - Mobiliario institucional de calidad para licitaciones gubernamentales. Mesas, sillas, lockers, carpas y sombrillas de excelente calidad.',
    image: 'https://furniture-fenix-website.vercel.app/images/landing/hero-image.jpg',
    url: 'https://furniture-fenix-website.vercel.app/',
    type: 'website',
    keywords: 'mobiliario institucional, mesas, sillas, lockers, carpas, sombrillas, licitaciones'
  });

  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
  } = useProductsQuery();

  const [alertDismissed, setAlertDismissed] = useState(false);
  const [currentWorkMediaIndex, setCurrentWorkMediaIndex] = useState(0);

  useEffect(() => {
    if (isError) {
      setAlertDismissed(false);
    }
  }, [isError]);

  const aboutChecklistItems = [
    'Somos punto de fábrica',
    'Asesoria y visita personalizada',
    'Envios a nivel Nacional',
    'Clientes satisfechos',
    'Entregas ágiles y oportunas',
    'Soporte y garantía',
    'Personal profesional certificado',
    'Confiabilidad y respaldo'
  ];

  const workMediaItems = useMemo<WorkMediaItem[]>(
    () => [
      {
        id: 'nuestro-trabajo-video',
        type: 'video',
        src: nuestroTrabajoVideo,
        alt: 'Video de trabajos realizados por Fénix'
      },
      {
        id: 'nuestro-trabajo-imagen-1',
        type: 'image',
        src: trabajoImagen1,
        alt: 'Proyecto realizado por Fénix - imagen 1'
      },
      {
        id: 'nuestro-trabajo-imagen-2',
        type: 'image',
        src: trabajoImagen2,
        alt: 'Proyecto realizado por Fénix - imagen 2'
      },
      {
        id: 'nuestro-trabajo-imagen-3',
        type: 'image',
        src: trabajoImagen3,
        alt: 'Proyecto realizado por Fénix - imagen 3'
      }
    ],
    []
  );

  const handleNextWorkMedia = () => {
    setCurrentWorkMediaIndex((currentIndex) => (currentIndex + 1) % workMediaItems.length);
  };

  const handlePrevWorkMedia = () => {
    setCurrentWorkMediaIndex((currentIndex) => (currentIndex - 1 + workMediaItems.length) % workMediaItems.length);
  };

  const getWorkMediaPositionClass = (index: number) => {
    const previousIndex = (currentWorkMediaIndex - 1 + workMediaItems.length) % workMediaItems.length;
    const nextIndex = (currentWorkMediaIndex + 1) % workMediaItems.length;

    if (index === currentWorkMediaIndex) return 'is-active';
    if (index === previousIndex) return 'is-prev';
    if (index === nextIndex) return 'is-next';
    return 'is-hidden';
  };

  // Contar productos por categoría
  const productCountByCategory = useMemo(() => {
    if (!productsData) return {};
    const counts: Record<string, number> = {};
    productsData.products.forEach((product: any) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, [productsData]);

  // Ordenar categorías: activas primero, luego inactivas
  const sortedCategories = useMemo(() => {
    const hiddenCategoryIds = new Set([
      'mobiliario-escolar',
      'mobiliario-oficina',
      'accesorios'
    ]);

    return CATEGORIES
      .filter((category) => !hiddenCategoryIds.has(category.id))
      .sort((a, b) => {
        if (a.active === b.active) return 0;
        return a.active ? -1 : 1;
      });
  }, []);

  return (
    <div className="home-page">
      <Hero />

      <section className="section categories-section">
        <div className="container">
          <h2 className="section-title">Nuestros Productos</h2>
          <p className="section-subtitle">Soluciones completas de mobiliario institucional</p>
          
          {isLoading ? (
            <div className="categories-grid">
              <Spinner label="Cargando productos..." />
            </div>
          ) : isError && !alertDismissed ? (
            <Alert
              title="No pudimos cargar los productos"
              message="Verifica tu conexion y vuelve a intentar."
              actionLabel="Reintentar"
              onAction={() => refetch()}
              onClose={() => setAlertDismissed(true)}
            />
          ) : (
            <div className="categories-grid">
              {sortedCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  productCount={productCountByCategory[category.id] || 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">¿Por qué elegirnos?</h2>
              <p>
                Con más de 12 años de experiencia en el mercado, Fénix se ha consolidado 
                como un proveedor confiable de mobiliario institucional para el sector 
                público y privado.
              </p>
              <ul className="check-list">
                {aboutChecklistItems.map((item) => (
                  <li key={item}>
                    <i className="fas fa-check-circle"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="about-image">
              <div className="about-media-carousel" aria-label="Galería de trabajos de Fénix">
                <div className="about-media-track">
                  {workMediaItems.map((media, index) => (
                    <div key={media.id} className={`about-media-slide ${getWorkMediaPositionClass(index)}`}>
                      {media.type === 'video' ? (
                        <video
                          className="about-media-item"
                          controls={index === currentWorkMediaIndex}
                          preload="metadata"
                          poster={trabajoImagen1}
                        >
                          <source src={media.src} type="video/mp4" />
                          Tu navegador no soporta reproducción de video.
                        </video>
                      ) : (
                        <img className="about-media-item" src={media.src} alt={media.alt} loading="lazy" />
                      )}
                    </div>
                  ))}
                </div>

                {workMediaItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="about-media-nav about-media-nav-prev"
                      onClick={handlePrevWorkMedia}
                      aria-label="Elemento anterior"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button
                      type="button"
                      className="about-media-nav about-media-nav-next"
                      onClick={handleNextWorkMedia}
                      aria-label="Elemento siguiente"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>

                    <div className="about-media-dots" role="tablist" aria-label="Seleccionar multimedia">
                      {workMediaItems.map((media, index) => (
                        <button
                          key={media.id}
                          type="button"
                          className={`about-media-dot ${index === currentWorkMediaIndex ? 'active' : ''}`}
                          onClick={() => setCurrentWorkMediaIndex(index)}
                          aria-label={`Ir al elemento ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="section-subtitle">Soluciones integrales para tu proyecto</p>
          
          <div className="services-grid-cards">
            {SERVICES.slice(0, 3).map((service) => (
              <Card key={service.id} hover className="service-card">
                <div className="service-icon">
                  <i className={`fas fa-${service.icon}`}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-lg">
            <Link to="/servicios">
              <Button variant="secondary">Ver todos los servicios</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>¿Listo para iniciar tu proyecto?</h2>
          <p>Solicita una cotización sin compromiso y recibe atención personalizada</p>
          <Link to="/contacto">
            <Button variant="primary" size="lg">Contactar ahora</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
