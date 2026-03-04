/**
 * Unified Products Data Loader
 * Carga dinámicamente las categorías y productos
 * Permite dividir el archivo products.json sin cambiar la interfaz de uso
 */

import categoriesData from './categories.json';
import type { CategoryInfo, Product } from '../types';

type CombinedProductsData = {
  categories: CategoryInfo[];
  products: Product[];
};

let cachedCombinedData: CombinedProductsData | null = null;

const CATEGORY_CODE_REGEX = /^[A-Z0-9]{3}$/;
const PRODUCT_CODE_REGEX = /^[A-Z0-9]{6}[0-9]{4}$/;

const validateCombinedData = (categories: CategoryInfo[], products: Product[]) => {
  const categoryCodes = new Set<string>();
  const productCodes = new Set<string>();

  for (const category of categories) {
    if (!CATEGORY_CODE_REGEX.test(category.code)) {
      throw new Error(`Invalid category code: ${category.id} -> ${category.code}`);
    }

    if (categoryCodes.has(category.code)) {
      throw new Error(`Duplicate category code: ${category.code}`);
    }
    categoryCodes.add(category.code);

    const subcategoryCodes = new Set<string>();
    for (const subcategory of category.subcategories || []) {
      if (!CATEGORY_CODE_REGEX.test(subcategory.code)) {
        throw new Error(
          `Invalid subcategory code: ${category.id}/${subcategory.id} -> ${subcategory.code}`
        );
      }

      if (subcategoryCodes.has(subcategory.code)) {
        throw new Error(`Duplicate subcategory code in ${category.id}: ${subcategory.code}`);
      }
      subcategoryCodes.add(subcategory.code);
    }
  }

  const categoryMap = new Map(categories.map((category) => [category.id, category]));

  for (const product of products) {
    if (!PRODUCT_CODE_REGEX.test(product.code)) {
      throw new Error(`Invalid product code: ${product.id} -> ${product.code}`);
    }

    if (productCodes.has(product.code)) {
      throw new Error(`Duplicate product code: ${product.code}`);
    }
    productCodes.add(product.code);

    const category = categoryMap.get(product.category);
    if (!category) {
      throw new Error(`Product category not found: ${product.id} -> ${product.category}`);
    }

    const expectedSubcategoryCode = product.subcategory
      ? category.subcategories?.find((sub) => sub.id === product.subcategory)?.code
      : '000';

    if (!expectedSubcategoryCode) {
      throw new Error(
        `Product subcategory not found: ${product.id} -> ${product.category}/${product.subcategory}`
      );
    }

    const expectedPrefix = `${category.code}${expectedSubcategoryCode}`;
    if (!product.code.startsWith(expectedPrefix)) {
      throw new Error(
        `Product code prefix mismatch: ${product.id} -> ${product.code} (expected prefix ${expectedPrefix})`
      );
    }
  }
};

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
    const productsData = productsModule.default;
    const products = (productsData.products || productsData) as Product[];
    const categories = categoriesData.categories as CategoryInfo[];

    validateCombinedData(categories, products);

    // Combinar categorías y productos
    cachedCombinedData = {
      categories,
      products
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
