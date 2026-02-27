/**
 * Unified Products Data Loader
 * Carga dinámicamente las categorías y productos
 * Permite dividir el archivo products.json sin cambiar la interfaz de uso
 */

import categoriesData from './categories.json';
import type { CategoryInfo } from '../types';

let cachedCombinedData: any = null;

/**
 * Carga y combina todas las fuentes de datos
 */
export const loadCombinedProductsData = async () => {
  if (cachedCombinedData) {
    return cachedCombinedData;
  }

  try {
    // Importar dinámicamente el JSON de productos
    const productsModule = await import('./products.json');
    const products = productsModule.default;

    // Combinar categorías y productos
    cachedCombinedData = {
      categories: categoriesData.categories as CategoryInfo[],
      products: products.products || products
    };

    return cachedCombinedData;
  } catch (error) {
    console.error('Error loading products data:', error);
    throw error;
  }
};

/**
 * Obtiene solo las categorías
 */
export const getCategories = (): CategoryInfo[] => {
  return categoriesData.categories as CategoryInfo[];
};
