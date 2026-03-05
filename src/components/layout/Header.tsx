import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../../utils/constants';
import logoJpeg from '../../assets/images/branding/logo.jpeg';
import './Header.css';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src={logoJpeg} alt="Logo Fénix" className="logo-img" />
            <div className="logo-text">
              <h1>{COMPANY_INFO.name}</h1>
              <p className="tagline">{COMPANY_INFO.tagline}</p>
            </div>
          </Link>
          <button 
            className="menu-toggle" 
            onClick={onMenuToggle}
            aria-label="Abrir menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};
