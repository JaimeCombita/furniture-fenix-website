import React from 'react';
import { CategoryBanner } from './CategoryBanner';
import landingBannersData from '../../data/landing-banners.json';
import { resolveLandingImage } from '../../utils/resolveLandingImage';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-single-column">
          <div className="hero-text">
            <h1 className="hero-title">Equipamos los espacios donde se construye el país</h1>
            <p className="hero-subtitle">Sillas de oficina importadas y mobiliario nacional con estándares institucionales y comerciales</p>
          </div>
          <div className="hero-image-container">
                <img
              className="hero-main-image"
              src={resolveLandingImage('img-4.PNG')}
              alt="Mobiliario Fénix"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
            />
          </div>
          <div className="hero-banners-grid">
            {landingBannersData.banners.map((banner) => (
              <CategoryBanner
                key={banner.id}
                imageSrc={banner.imagePath}
                category={banner.category}
                subcategory={banner.subcategory}
                buttonText={banner.buttonText}
                description={banner.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
