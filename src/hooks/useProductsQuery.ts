import { useQuery } from '@tanstack/react-query';
import { productsRepository } from '../domains/catalog';

const PRODUCTS_QUERY_KEY = ['products'];

export const useProductsQuery = () => {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: productsRepository.getProductsData,
  });
};
