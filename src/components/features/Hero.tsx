import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';
import promoImageDefault from '../../assets/images/hero-promo.svg';
import productsData from '../../data/products.json';
import './Hero.css';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  promoImage?: string;
  promoTitle?: string;
  promoText?: string;
  useProductPromo?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText = 'Contáctanos',
  ctaLink = '/contacto',
  promoImage,
  promoTitle = 'Semana de Proyectos 2026',
  promoText = 'Atención preferente y precios especiales en mobiliario institucional por tiempo limitado.',
  useProductPromo = false
}) => {
  const shuffledProducts = React.useMemo(() => {
    const products = productsData.products
      .filter((product) => Array.isArray(product.images) && product.images.length > 0)
      .map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description || product.shortDescription || '',
        image: product.images[0]
      }));

    const result = [...products];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }, []);

  const [promoIndex, setPromoIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isFading, setIsFading] = React.useState(false);
  const [textLimit, setTextLimit] = React.useState(150);
  const fadeTimeoutRef = React.useRef<number | null>(null);

  const advanceSlide = React.useCallback((direction: 1 | -1 = 1) => {
    if (shuffledProducts.length === 0) {
      return;
    }

    setIsFading(true);
    if (fadeTimeoutRef.current) {
      window.clearTimeout(fadeTimeoutRef.current);
    }
    fadeTimeoutRef.current = window.setTimeout(() => {
      setPromoIndex((current) => {
        const length = shuffledProducts.length;
        return (current + direction + length) % length;
      });
      setIsFading(false);
    }, 300);
  }, [shuffledProducts.length]);

  React.useEffect(() => {
    if (!useProductPromo || shuffledProducts.length === 0 || isPaused) {
      if (isPaused) {
        setIsFading(false);
      }
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      advanceSlide();
    }, 10000);

    return () => {
      window.clearInterval(intervalId);
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [useProductPromo, shuffledProducts.length, isPaused, advanceSlide]);

  React.useEffect(() => {
    const updateLimit = () => {
      setTextLimit(window.innerWidth <= 768 ? 80 : 170);
    };

    updateLimit();
    window.addEventListener('resize', updateLimit);

    return () => {
      window.removeEventListener('resize', updateLimit);
    };
  }, []);

  const promoProduct = useProductPromo ? shuffledProducts[promoIndex] : null;
  const resolvedPromoImage = promoProduct?.image || promoImage || promoImageDefault;
  const resolvedPromoTitle = promoProduct?.name || promoTitle;
  const resolvedPromoText = promoProduct?.description || promoText;
  const displayPromoText = React.useMemo(() => {
    if (resolvedPromoText.length > textLimit) {
      return `${resolvedPromoText.slice(0, textLimit - 3).trim()}...`;
    }
    return resolvedPromoText;
  }, [resolvedPromoText, textLimit]);
  const handleTogglePause = () => {
    setIsPaused((current) => !current);
  };
  const handleNextSlide = () => {
    advanceSlide();
  };
  const handlePrevSlide = () => {
    advanceSlide(-1);
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-grid">
          <div className="hero-text">
            <h2 className="hero-title">{title}</h2>
            <p className="hero-subtitle">{subtitle}</p>
          </div>
          <div className="hero-promo" aria-label="Promoción destacada">
            <h3 className="promo-title">{resolvedPromoTitle}</h3>
            <button
              type="button"
              className="promo-image-button"
              onClick={handleTogglePause}
              aria-pressed={isPaused}
              aria-label={isPaused ? 'Reanudar cambio de productos' : 'Pausar cambio de productos'}
            >
              <img
                className={`promo-image ${isFading ? 'is-fading' : ''}`}
                src={resolvedPromoImage}
                alt={promoProduct?.name || 'Promoción vigente en mobiliario institucional'}
              />
            </button>
            <p className="promo-text">{displayPromoText}</p>
            <div className="promo-controls">
              <button
                type="button"
                className="promo-prev"
                onClick={handlePrevSlide}
              >
                Anterior
              </button>
              <button
                type="button"
                className="promo-toggle"
                onClick={handleTogglePause}
                aria-pressed={isPaused}
              >
                {isPaused ? 'Reanudar' : 'Pausar'}
              </button>
              <button
                type="button"
                className="promo-next"
                onClick={handleNextSlide}
              >
                Siguiente
              </button>
            </div>
          </div>
          <div className="hero-cta">
            <Link to={ctaLink}>
              <Button variant="primary" size="lg">
                {ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
