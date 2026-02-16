import React, { useMemo, useEffect, useState } from 'react';
import { ProductCard } from '../components/features';
import { Alert, Spinner } from '../components/ui';
import type { ProductCategory } from '../types';
import { useFilterProducts, useLoadMore, useProductsQuery } from '../hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import './Catalog.css';

const CatalogPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
  } = useProductsQuery();

  const [alertDismissed, setAlertDismissed] = useState(false);

  useEffect(() => {
    if (isError) {
      setAlertDismissed(false);
    }
  }, [isError]);

  const { selectedCategory, selectedSubcategory } = useMemo(() => {
    if (!productsData) return { selectedCategory: 'all' as const, selectedSubcategory: null };
    
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('categoria');
    const subcategoryParam = params.get('subcategoria');
    const categoryMatch = categoryParam
      ? productsData.categories.find((cat: any) => cat.id === categoryParam)
      : null;

    if (categoryMatch) {
      const hasSubcategory = subcategoryParam && categoryMatch.subcategories?.some((sub: any) => sub.id === subcategoryParam);
      return {
        selectedCategory: categoryMatch.id as ProductCategory,
        selectedSubcategory: hasSubcategory ? subcategoryParam : null
      };
    }

    return {
      selectedCategory: 'all' as const,
      selectedSubcategory: null
    };
  }, [location.search, productsData]);

  // Use the useFilterProducts hook instead of filtering manually
  const products = useFilterProducts({
    category: selectedCategory,
    subcategory: selectedSubcategory,
  });

  const {
    visibleItems,
    canLoadMore,
    loadMore,
    reset,
    visibleCount,
    totalItems,
  } = useLoadMore(products, 12);

  const updateCatalogSearch = (category: ProductCategory | 'all', subcategory: string | null = null) => {
    const params = new URLSearchParams();

    if (category !== 'all') {
      params.set('categoria', category);
      if (subcategory) {
        params.set('subcategoria', subcategory);
      }
    }

    const search = params.toString();
    navigate({ pathname: '/catalogo', search: search ? `?${search}` : '' });
  };

  const handleCategoryChange = (category: ProductCategory | 'all') => {
    updateCatalogSearch(category, null);
  };

  const handleSubcategoryChange = (category: ProductCategory, subcategory: string) => {
    updateCatalogSearch(category, subcategory);
  };

  useEffect(() => {
    reset();
  }, [selectedCategory, selectedSubcategory, reset]);

  const currentCategoryData = selectedCategory !== 'all' && productsData
    ? productsData.categories.find((c: any) => c.id === selectedCategory)
    : null;

  if (isLoading || isError || !productsData) {
    return (
      <div className="catalog-page">
        <div className="catalog-hero">
          <div className="container">
            <h1>Catálogo de Productos</h1>
            <p>Encuentra el mobiliario perfecto para tu institución</p>
          </div>
        </div>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            {isLoading ? (
              <Spinner label="Cargando catalogo..." />
            ) : !alertDismissed ? (
              <Alert
                title="No pudimos cargar el catalogo"
                message="Verifica tu conexion y vuelve a intentar."
                actionLabel="Reintentar"
                onAction={() => refetch()}
                onClose={() => setAlertDismissed(true)}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }

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
              {productsData.categories.filter((cat: any) => cat.active).map((cat: any) => (
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
                      {cat.subcategories.map((subcat: any) => (
                        <li key={subcat.id}>
                          <button
                            className={selectedSubcategory === subcat.id ? 'active' : ''}
                            onClick={() => handleSubcategoryChange(cat.id as ProductCategory, subcat.id)}
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
                  <> - {currentCategoryData.subcategories.find((s: any) => s.id === selectedSubcategory)?.name}</>
                )}
              </h2>
              <p className="products-count">{totalItems} producto(s)</p>
            </div>

            {products.length > 0 ? (
              <div className="products-grid">
                {visibleItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <i className="fas fa-box-open"></i>
                <p>No hay productos disponibles en esta categoría</p>
              </div>
            )}

            {products.length > 0 && canLoadMore && (
              <div className="load-more">
                <button type="button" onClick={loadMore}>
                  Cargar mas
                </button>
                <p className="load-more-count">
                  Mostrando {visibleCount} de {totalItems}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CatalogPage;
