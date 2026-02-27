import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui';
import type { CategoryInfo } from '../../types';
import { resolveCatalogImage } from '../../utils/resolveCatalogImage';
import './CategoryCard.css';

interface CategoryCardProps {
  category: CategoryInfo;
  productCount?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, productCount = 0 }) => {
  const imageSrc = category.image ? resolveCatalogImage(category.image) : null;

  const cardContent = (
    <Card hover className={`category-card ${!category.active ? 'disabled' : ''}`}>
      <div className="category-image">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={category.name}
            className="category-image-img"
          />
        ) : (
          <i className={`fas fa-${category.icon}`}></i>
        )}
      </div>
      <h3 className="category-name">{category.name}</h3>
      <p className="category-description">{category.description}</p>
      {category.active && productCount > 0 && (
        <p className="product-count">{productCount} {productCount === 1 ? 'producto' : 'productos'}</p>
      )}
      {!category.active && <p className="coming-soon">Próximamente</p>}
    </Card>
  );

  if (!category.active) {
    return <div className="category-card-link disabled">{cardContent}</div>;
  }

  return (
    <Link to={`/catalogo?categoria=${category.id}`} className="category-card-link">
      {cardContent}
    </Link>
  );
};
