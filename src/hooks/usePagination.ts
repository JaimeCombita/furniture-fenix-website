import { useCallback, useMemo, useState } from 'react';

interface UsePaginationResult<T> {
  currentPage: number;
  totalPages: number;
  currentItems: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  itemCount: number;
  itemsPerPage: number;
}

export const usePagination = <T,>(items: T[], itemsPerPage: number = 12): UsePaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const currentItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, safeCurrentPage, itemsPerPage]);

  const goToPage = useCallback(
    (page: number) => {
      const clampedPage = Math.min(Math.max(page, 1), totalPages);
      setCurrentPage(clampedPage);
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [goToPage, currentPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [goToPage, currentPage]);

  return {
    currentPage: safeCurrentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
    itemCount: items.length,
    itemsPerPage,
  };
};
