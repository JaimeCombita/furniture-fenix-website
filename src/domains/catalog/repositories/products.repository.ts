import { loadCombinedProductsData } from '../../../data';
import type { CategoryInfo, Product } from '../../../types';

export type ProductsData = {
  categories: CategoryInfo[];
  products: Product[];
};

export interface ProductsRepository {
  getProductsData: () => Promise<ProductsData>;
}

let cachedProductsData: ProductsData | null = null;

const localProductsRepository: ProductsRepository = {
  getProductsData: async () => {
    if (cachedProductsData) {
      return cachedProductsData;
    }

    cachedProductsData = await loadCombinedProductsData();
    return cachedProductsData;
  },
};

export const productsRepository: ProductsRepository = localProductsRepository;
