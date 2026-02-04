import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';
import promoImageDefault from '../../assets/images/hero-promo.svg';
import './Hero.css';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  promoImage?: string;
  promoBadge?: string;
  promoTitle?: string;
  promoText?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText = 'Solicitar Cotización',
  ctaLink = '/contacto',
  backgroundImage,
  promoImage,
  promoBadge = 'Evento destacado',
  promoTitle = 'Semana de Proyectos 2026',
  promoText = 'Atención preferente y precios especiales en mobiliario institucional por tiempo limitado.'
}) => {
  const resolvedPromoImage = promoImage || promoImageDefault;

  return (
    <section 
      className="hero" 
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-grid">
          <div className="hero-text">
            <h2 className="hero-title">{title}</h2>
            <p className="hero-subtitle">{subtitle}</p>
          </div>
          <div className="hero-promo" aria-label="Promoción destacada">
            <h3 className="promo-title">{promoTitle}</h3>
            <img
              className="promo-image"
              src={resolvedPromoImage}
              alt="Promoción vigente en mobiliario institucional"
            />
            <p className="promo-text">{promoText}</p>
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
