import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../ui';
import type { Product } from '../../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card hover className="product-card">
      <Link to={`/producto/${product.id}`} className="product-image-link">
        <div className="product-image">
          {product.images && product.images.length > 0 ? (
            <img src={product.images[0]} alt={product.name} />
          ) : (
            <div className="product-placeholder">
              <i className="fas fa-image"></i>
            </div>
          )}
        </div>
      </Link>
      
      <div className="product-content">
        <h3 className="product-name">
          <Link to={`/producto/${product.id}`}>{product.name}</Link>
        </h3>
        
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <Link to={`/producto/${product.id}`}>
            <Button variant="outline" size="sm">
              Ver Detalles
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
