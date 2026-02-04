import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, COMPANY_INFO } from '../../utils/constants';
import './Navigation.css';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  React.useEffect(() => {
    onClose();
    setExpandedMenu(null);
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
        {NAV_LINKS.map((link) => (
          <li key={link.path}>
            {'children' in link && link.children ? (
              <>
                <button
                  className={`nav-link nav-dropdown ${isActive(link.path) ? 'active' : ''}`}
                  onClick={() => toggleSubmenu(link.path)}
                >
                  <i className={`fas fa-${link.icon}`}></i>
                  <span>{link.label}</span>
                  <i className={`fas fa-chevron-${expandedMenu === link.path ? 'up' : 'down'} submenu-icon`}></i>
                </button>
                {expandedMenu === link.path && (
                  <ul className="nav-submenu">
                    {link.children.map((child: any) => {
                      const isActive = child.active !== false;
                      return (
                        <li key={child.path} className={!isActive ? 'disabled' : ''}>
                          {isActive ? (
                            <Link
                              to={child.path}
                              className="nav-sublink"
                              onClick={onClose}
                            >
                              {child.label}
                            </Link>
                          ) : (
                            <span className="nav-sublink disabled">
                              {child.label}
                              <span className="coming-soon-badge">Proximamente</span>
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            ) : (
              <Link
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={onClose}
              >
                <i className={`fas fa-${link.icon}`}></i>
                <span>{link.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="nav-footer">
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
      </div>
      </nav>
    </>
  );
};
