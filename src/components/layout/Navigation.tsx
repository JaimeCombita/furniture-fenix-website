import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_INFO } from '../../utils/constants';
import productsData from '../../data/products.json';
import './Navigation.css';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  React.useEffect(() => {
    onClose();
    setExpandedMenu(null);
    setExpandedSubmenu(null);
  }, [location.pathname]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleSubmenu = (path: string) => {
    setExpandedMenu(expandedMenu === path ? null : path);
    setExpandedSubmenu(null);
  };

  const toggleSubSubmenu = (path: string) => {
    setExpandedSubmenu(expandedSubmenu === path ? null : path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <div 
        className={`nav-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
        <div className="nav-header">
          <h2>Menú</h2>
          <button className="close-menu" onClick={onClose} aria-label="Cerrar menú">
            <i className="fas fa-times"></i>
          </button>
        </div>

      <ul className="nav-list">
        <li>
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={onClose}
          >
            <i className="fas fa-home"></i>
            <span>Inicio</span>
          </Link>
        </li>
        {/* <li>
          <Link
            to="/sobre-empresa"
            className={`nav-link ${isActive('/sobre-empresa') ? 'active' : ''}`}
            onClick={onClose}
          >
            <i className="fas fa-building"></i>
            <span>Sobre la Empresa</span>
          </Link>
        </li> */}
        <li>
          <button
            className={`nav-link nav-dropdown ${isActive('/catalogo') ? 'active' : ''}`}
            onClick={() => toggleSubmenu('/catalogo')}
          >
            <i className="fas fa-th"></i>
            <span>Catálogo</span>
            <i className={`fas fa-chevron-${expandedMenu === '/catalogo' ? 'up' : 'down'} submenu-icon`}></i>
          </button>
          {expandedMenu === '/catalogo' && (
            <ul className="nav-submenu">
              {productsData.categories.filter(cat => cat.active).map((category) => (
                <li key={category.id}>
                  {category.subcategories && category.subcategories.length > 0 ? (
                    <>
                      <button
                        className={`nav-sublink nav-dropdown-item ${expandedSubmenu === category.id ? 'expanded' : ''}`}
                        onClick={() => toggleSubSubmenu(category.id)}
                      >
                        <span>{category.name}</span>
                        <i className={`fas fa-chevron-${expandedSubmenu === category.id ? 'up' : 'down'}`}></i>
                      </button>
                      {expandedSubmenu === category.id && (
                        <ul className="nav-subsubmenu">
                          {category.subcategories.map((subcat) => (
                            <li key={subcat.id}>
                              <Link
                                to={`/catalogo?categoria=${category.id}&subcategoria=${subcat.id}`}
                                className="nav-subsublink"
                                onClick={onClose}
                              >
                                {subcat.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={`/catalogo?categoria=${category.id}`}
                      className="nav-sublink"
                      onClick={onClose}
                    >
                      {category.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <Link
            to="/servicios"
            className={`nav-link ${isActive('/servicios') ? 'active' : ''}`}
            onClick={onClose}
          >
            <i className="fas fa-tools"></i>
            <span>Servicios</span>
          </Link>
        </li>
        {/* <li>
          <Link
            to="/proyectos"
            className={`nav-link ${isActive('/proyectos') ? 'active' : ''}`}
            onClick={onClose}
          >
            <i className="fas fa-briefcase"></i>
            <span>Proyectos</span>
          </Link>
        </li> */}
        <li>
          <Link
            to="/contacto"
            className={`nav-link ${isActive('/contacto') ? 'active' : ''}`}
            onClick={onClose}
          >
            <i className="fas fa-envelope"></i>
            <span>Contáctenos</span>
          </Link>
        </li>
      </ul>

      {/* <div className="nav-footer">
        <div className="social-links">
          <a href={COMPANY_INFO.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href={COMPANY_INFO.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href={COMPANY_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href={COMPANY_INFO.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div> */}
      </nav>
    </>
  );
};
