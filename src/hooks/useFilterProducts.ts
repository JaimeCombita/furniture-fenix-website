import { useMemo } from 'react';
import type { Product, ProductCategory } from '../types';
import { useProductsQuery } from './useProductsQuery';

interface UseFilterProductsOptions {
  category?: ProductCategory | 'all';
  subcategory?: string | null;
  searchQuery?: string;
}

/**
 * Hook for filtering products based on category, subcategory, and search query
 * @param category - The category to filter by ('all' for all categories)
 * @param subcategory - The subcategory to filter by (optional)
 * @param searchQuery - The search query to filter by (optional)
 * @returns Array of filtered products
 */
export const useFilterProducts = ({
  category = 'all',
  subcategory = null,
  searchQuery = '',
}: UseFilterProductsOptions = {}): Product[] => {
  const { data: productsData } = useProductsQuery();

  const filteredProducts = useMemo(() => {
    if (!productsData || !productsData.products) return [];

    return productsData.products.filter((product: Product) => {
      // Filter by category
      if (category !== 'all' && product.category !== category) {
        return false;
      }

      // Filter by subcategory
      if (subcategory && product.subcategory !== subcategory) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;

        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.shortDescription?.toLowerCase().includes(query) ||
          product.features?.some((feature: string) =>
            feature.toLowerCase().includes(query)
          )
        );
      }

      return true;
    });
  }, [productsData, category, subcategory, searchQuery]);

  return filteredProducts;
};
