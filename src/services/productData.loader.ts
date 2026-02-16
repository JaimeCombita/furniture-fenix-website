/**
 * Product Data Lazy Loader
 * Carga los datos de productos de forma dinámica sin incluirlos en el bundle inicial
 */

import { loadCombinedProductsData } from '../data';

let cachedProductData: any = null;

export const loadProductsData = async () => {
  // Si ya están cacheados, devolver del cache
  if (cachedProductData) {
    return cachedProductData;
  }

  try {
    // Cargar datos combinados
    cachedProductData = await loadCombinedProductsData();
    return cachedProductData;
  } catch (error) {
    console.error('Error loading products data:', error);
    throw error;
  }
};

// Hook para usar en componentes
export const useProductsData = () => {
  return loadProductsData();
};
