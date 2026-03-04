/**
 * Product Data Lazy Loader
 * Carga los datos de productos de forma dinámica sin incluirlos en el bundle inicial
 */

import { productsRepository } from '../domains/catalog';
import type { ProductsData } from '../domains/catalog';

export const loadProductsData = async (): Promise<ProductsData> => {
  return productsRepository.getProductsData();
};

// Hook para usar en componentes
export const useProductsData = () => {
  return loadProductsData();
};
