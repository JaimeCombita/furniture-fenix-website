import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ContactForm } from '../components/features';
import { useMetaTags } from '../hooks/useMetaTags';
import { COMPANY_INFO } from '../utils/constants';
import './Contact.css';

const ContactPage: React.FC = () => {
  // Meta tags para SEO
  useMetaTags({
    title: 'Contáctanos',
    description: 'Contacta con Fénix - Mobiliario institucional. Solicita cotizaciones, consultas y más información sobre nuestros productos.',
    image: 'https://furniture-fenix-website.vercel.app/images/branding/logo.png',
    url: 'https://furniture-fenix-website.vercel.app/contacto',
    type: 'website',
    keywords: 'contacto, cotización, información, consultas'
  });

  const [searchParams] = useSearchParams();
  const productId = searchParams.get('producto');

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Contáctanos</h1>
          <p className="contact-subtitle">
            Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos lo antes posible.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-form-section">
              <h2>Envíanos un mensaje</h2>
              {productId && (
                <p className="product-notice">
                  <i className="fas fa-info-circle"></i>
                  Consulta sobre producto: {productId}
                </p>
              )}
              <ContactForm productId={productId || undefined} />
            </div>

            <div className="contact-info-section">
              <h2>Información de contacto</h2>
              
              <div className="info-card">
                <div className="info-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <h3>Teléfono</h3>
                    <p>{COMPANY_INFO.phone}</p>
                  </div>
                </div>

                <div className="info-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h3>Email</h3>
                    <p>{COMPANY_INFO.email}</p>
                  </div>
                </div>

                <div className="info-item">
                  <i className="fab fa-whatsapp"></i>
                  <div>
                    <h3>WhatsApp</h3>
                    <p>{COMPANY_INFO.whatsapp}</p>
                    <a 
                      href={COMPANY_INFO.social.whatsapp} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="whatsapp-link"
                    >
                      Enviar mensaje
                    </a>
                  </div>
                </div>

                <div className="info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h3>Ubicación</h3>
                    <p>{COMPANY_INFO.address}</p>
                  </div>
                </div>

                <div className="info-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <h3>Horario</h3>
                    <p>{COMPANY_INFO.schedule}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
