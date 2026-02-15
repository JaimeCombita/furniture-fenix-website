import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryBanner.css';

interface CategoryBannerProps {
  imageSrc: string;
  category: string;
  subcategory?: string | null;
  buttonText?: string;
  description?: string;
}

export const CategoryBanner: React.FC<CategoryBannerProps> = ({
  imageSrc,
  category,
  subcategory = null,
  buttonText = 'Ver productos',
  description
}) => {
  const catalogUrl = subcategory 
    ? `/catalogo?categoria=${category}&subcategoria=${subcategory}`
    : `/catalogo?categoria=${category}`;

  return (
    <Link to={catalogUrl} className="category-banner" title={description}>
      <div className="category-banner-image" style={{ backgroundImage: `url(${imageSrc})` }}>
        <div className="category-banner-overlay">
          <button className="category-banner-button">
            {buttonText}
          </button>
        </div>
      </div>
    </Link>
  );
};
