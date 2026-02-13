import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/features';
import type { Product, ProductCategory } from '../types';
import productsData from '../data/products.json';
import { useLocation } from 'react-router-dom';
import './Catalog.css';

export const CatalogPage: React.FC = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('categoria');
    const subcategoryParam = params.get('subcategoria');
    const categoryMatch = categoryParam
      ? productsData.categories.find((cat) => cat.id === categoryParam)
      : null;

    if (categoryMatch) {
      setSelectedCategory(categoryMatch.id as ProductCategory);
      if (subcategoryParam && categoryMatch.subcategories?.some((sub) => sub.id === subcategoryParam)) {
        setSelectedSubcategory(subcategoryParam);
      } else {
        setSelectedSubcategory(null);
      }
      return;
    }

    setSelectedCategory('all');
    setSelectedSubcategory(null);
  }, [location.search]);

  useEffect(() => {
    const filtered = (selectedCategory === 'all' 
      ? productsData.products
      : productsData.products.filter(p => {
          if (p.category !== selectedCategory) return false;
          if (selectedSubcategory && p.subcategory !== selectedSubcategory) return false;
          return true;
        })) as Product[];
    
    setProducts(filtered);
  }, [selectedCategory, selectedSubcategory]);

  const handleCategoryChange = (category: ProductCategory | 'all') => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const currentCategoryData = selectedCategory !== 'all' 
    ? productsData.categories.find(c => c.id === selectedCategory)
    : null;

  return (
    <div className="catalog-page">
      <div className="catalog-hero">
        <div className="container">
          <h1>Catálogo de Productos</h1>
          <p>Encuentra el mobiliario perfecto para tu institución</p>
        </div>
      </div>

      <div className="container">
        <section className="catalog-content">
          <aside className="catalog-sidebar">
            <h3>Categorías</h3>
            <ul className="category-filter">
              <li>
                <button
                  className={selectedCategory === 'all' ? 'active' : ''}
                  onClick={() => handleCategoryChange('all')}
                >
                  Todos los productos
                </button>
              </li>
              {productsData.categories.filter(cat => cat.active).map((cat) => (
                <li key={cat.id}>
                  <button
                    className={selectedCategory === cat.id ? 'active' : ''}
                    onClick={() => handleCategoryChange(cat.id as ProductCategory)}
                  >
                    <i className={`fas fa-${cat.icon}`}></i>
                    {cat.name}
                  </button>
                  {selectedCategory === cat.id && cat.subcategories && cat.subcategories.length > 0 && (
                    <ul className="subcategory-filter">
                      {cat.subcategories.map((subcat) => (
                        <li key={subcat.id}>
                          <button
                            className={selectedSubcategory === subcat.id ? 'active' : ''}
                            onClick={() => setSelectedSubcategory(subcat.id)}
                          >
                            {subcat.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          <div className="catalog-main">
            <div className="catalog-header">
              <h2>
                {selectedCategory === 'all' 
                  ? 'Todos los productos' 
                  : currentCategoryData?.name}
                {selectedSubcategory && currentCategoryData?.subcategories && (
                  <> - {currentCategoryData.subcategories.find(s => s.id === selectedSubcategory)?.name}</>
                )}
              </h2>
              <p className="products-count">{products.length} producto(s)</p>
            </div>

            {products.length > 0 ? (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <i className="fas fa-box-open"></i>
                <p>No hay productos disponibles en esta categoría</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
