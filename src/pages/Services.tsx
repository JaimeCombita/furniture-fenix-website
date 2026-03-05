import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { useMetaTags } from '../hooks/useMetaTags';
import { SERVICES } from '../utils/constants';
import './Services.css';

const ServicesPage: React.FC = () => {
  // Meta tags para SEO
  useMetaTags({
    title: 'Nuestros Servicios',
    description: 'Descubre los servicios integrales de Fénix para tus proyectos de mobiliario institucional: consultoría, diseño, fabricación e instalación.',
    image: 'https://furniture-fenix-website.vercel.app/images/branding/logo.jpeg',
    url: 'https://furniture-fenix-website.vercel.app/servicios',
    type: 'website',
    keywords: 'servicios, consultoría, diseño, fabricación, instalación'
  });

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <h1>Nuestros Servicios</h1>
          <p className="services-subtitle">
            Soluciones integrales para tus proyectos de mobiliario institucional
          </p>
        </div>
      </section>

      <section className="section main-services-section">
        <div className="container">
          <h2 className="section-title">Servicios Destacados</h2>
          <p className="section-subtitle">
            Acompañamiento completo desde el diseño hasta la instalación
          </p>
          
          <div className="services-grid">
            {SERVICES.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  <i className={`fas fa-${service.icon}`}></i>
                </div>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section additional-services-section">
        <div className="container">
          <h2 className="section-title">Servicios Adicionales</h2>
          
          <div className="additional-services-grid">
            <div className="additional-service">
              <i className="fas fa-truck fa-3x"></i>
              <h4>Transporte y Entrega</h4>
              <p>
                Logística especializada con entrega en todo el territorio nacional. 
                Manejo cuidadoso y entregas programadas según tus necesidades.
              </p>
            </div>
            
            <div className="additional-service">
              <i className="fas fa-tools fa-3x"></i>
              <h4>Instalación Profesional</h4>
              <p>
                Equipo técnico capacitado para el montaje e instalación de todo el 
                mobiliario. Garantizamos un trabajo limpio y profesional.
              </p>
            </div>
            
            <div className="additional-service">
              <i className="fas fa-shield-alt fa-3x"></i>
              <h4>Garantía Extendida</h4>
              <p>
                Todos nuestros productos cuentan con garantía de fábrica. Ofrecemos 
                servicio técnico especializado y repuestos originales.
              </p>
            </div>
            
            <div className="additional-service">
              <i className="fas fa-headset fa-3x"></i>
              <h4>Soporte Técnico</h4>
              <p>
                Atención personalizada para resolver cualquier consulta o inconveniente. 
                Disponible durante toda la vida útil del producto.
              </p>
            </div>
            
            <div className="additional-service">
              <i className="fas fa-file-contract fa-3x"></i>
              <h4>Contratos Marco</h4>
              <p>
                Soluciones de suministro continuo para entidades públicas y privadas. 
                Simplificamos tus procesos de adquisición.
              </p>
            </div>
            
            <div className="additional-service">
              <i className="fas fa-recycle fa-3x"></i>
              <h4>Reciclaje de Mobiliario</h4>
              <p>
                Programa de disposición responsable de mobiliario antiguo. 
                Contribuimos con el cuidado del medio ambiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <h2 className="section-title">Nuestro Proceso de Trabajo</h2>
          <p className="section-subtitle">
            Metodología probada para garantizar el éxito de tu proyecto
          </p>
          
          <div className="process-timeline">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Contacto Inicial</h4>
                <p>
                  Recibimos tu solicitud y agendamos una reunión para entender 
                  tus necesidades específicas.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Asesoría y Diseño</h4>
                <p>
                  Nuestros expertos diseñan una solución personalizada con 
                  especificaciones técnicas detalladas.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Cotización</h4>
                <p>
                  Presentamos una propuesta económica transparente con todos 
                  los detalles del proyecto.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Fabricación</h4>
                <p>
                  Producimos tu mobiliario con altos estándares de calidad y 
                  control en cada etapa.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h4>Entrega e Instalación</h4>
                <p>
                  Coordinamos la logística y realizamos la instalación 
                  profesional en tus instalaciones.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">6</div>
              <div className="step-content">
                <h4>Seguimiento</h4>
                <p>
                  Mantenemos contacto para asegurar tu satisfacción y ofrecer 
                  soporte continuo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section sectors-section">
        <div className="container">
          <h2 className="section-title">Sectores que Atendemos</h2>
          
          <div className="sectors-grid">
            <div className="sector-card">
              <i className="fas fa-school fa-3x"></i>
              <h4>Educación</h4>
              <p>Colegios, universidades e institutos</p>
            </div>
            
            <div className="sector-card">
              <i className="fas fa-building fa-3x"></i>
              <h4>Gobierno</h4>
              <p>Entidades públicas y alcaldías</p>
            </div>
            
            <div className="sector-card">
              <i className="fas fa-hospital fa-3x"></i>
              <h4>Salud</h4>
              <p>Hospitales y centros médicos</p>
            </div>
            
            <div className="sector-card">
              <i className="fas fa-briefcase fa-3x"></i>
              <h4>Empresas</h4>
              <p>Oficinas corporativas</p>
            </div>
            
            <div className="sector-card">
              <i className="fas fa-balance-scale fa-3x"></i>
              <h4>Judicial</h4>
              <p>Juzgados y fiscalías</p>
            </div>
            
            <div className="sector-card">
              <i className="fas fa-landmark fa-3x"></i>
              <h4>Financiero</h4>
              <p>Bancos y cooperativas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>¿Necesitas asesoría para tu proyecto?</h2>
            <p>
              Nuestro equipo de expertos está listo para ayudarte a encontrar 
              la mejor solución para tu institución
            </p>
            <div className="cta-buttons">
              <Link to="/contacto">
                <Button variant="primary" size="lg">
                  Contáctanos
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
      </section>
    </div>
  );
};

export default ServicesPage;
