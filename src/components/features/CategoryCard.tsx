import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui';
import type { CategoryInfo } from '../../types';
import './CategoryCard.css';

interface CategoryCardProps {
  category: CategoryInfo;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const cardContent = (
    <Card hover className={`category-card ${!category.active ? 'disabled' : ''}`}>
      <div className="category-icon">
        <i className={`fas fa-${category.icon}`}></i>
      </div>
      <h3 className="category-name">{category.name}</h3>
      <p className="category-description">{category.description}</p>
      {!category.active && <p className="coming-soon">Próximamente</p>}
    </Card>
  );

  if (!category.active) {
    return <div className="category-card-link disabled">{cardContent}</div>;
  }

  return (
    <Link to={`/catalogo#${category.id}`} className="category-card-link">
      {cardContent}
    </Link>
  );
};
