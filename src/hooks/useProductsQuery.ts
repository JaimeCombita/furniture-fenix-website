import { useQuery } from '@tanstack/react-query';
import { loadProductsData } from '../services/productData.loader';

const PRODUCTS_QUERY_KEY = ['products'];

export const useProductsQuery = () => {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: loadProductsData,
  });
};
