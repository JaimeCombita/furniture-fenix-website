import React from 'react';
import { COMPANY_INFO } from '../../utils/constants';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <img src="/logo.png" alt="Logo Fénix" className="footer-logo-img" />
            <h3>{COMPANY_INFO.name}</h3>
            <p className="footer-tagline">{COMPANY_INFO.tagline}</p>
            <p className="footer-description">
              Soluciones de calidad para el sector público y privado
            </p>
          </div>

          <div className="footer-col">
            <h4>Contacto</h4>
            <ul className="footer-contact">
              <li>
                <i className="fas fa-phone"></i>
                <span>{COMPANY_INFO.phone}</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>{COMPANY_INFO.email}</span>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <span>{COMPANY_INFO.schedule}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2026 {COMPANY_INFO.fullName}. NIT: {COMPANY_INFO.nit}. 
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
