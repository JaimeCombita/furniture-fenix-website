import React from 'react';
import { Link } from 'react-router-dom';
import { Hero, CategoryCard } from '../components/features';
import { Button, Card } from '../components/ui';
import { CATEGORIES, SERVICES } from '../utils/constants';
import './Home.css';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Hero
        title="Equipamos los espacios donde se construye el país"
        subtitle="Sillas de oficina impotadas y mobiliario nacional con estandares institucionales"
        ctaText="Contáctanos"
        ctaLink="/contacto"
        promoTitle="Producto destacado"
        promoText="Descubre nuestra selección de mobiliario institucional."
        useProductPromo
      />

      <section className="section categories-section">
        <div className="container">
          <h2 className="section-title">Nuestros Productos</h2>
          <p className="section-subtitle">Soluciones completas de mobiliario institucional</p>
          
          <div className="categories-grid">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="section about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">¿Por qué elegirnos?</h2>
              <p>
                Con más de 15 años de experiencia en el mercado, Fénix se ha consolidado 
                como un proveedor confiable de mobiliario institucional para el sector 
                público y privado.
              </p>
              <ul className="check-list">
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Experiencia en licitaciones públicas</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Fabricación nacional de calidad</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Personalización según necesidades</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Cumplimiento de normativas</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Garantía extendida</span>
                </li>
              </ul>
              <Link to="/sobre-empresa">
                <Button variant="secondary">Conoce más</Button>
              </Link>
            </div>
            <div className="about-image">
              <div className="placeholder-image">
                <i className="fas fa-industry"></i>
                <p>Imagen de la empresa</p>
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
