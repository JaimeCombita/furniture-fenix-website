import { useCallback, useMemo, useState } from 'react';

interface UseLoadMoreResult<T> {
  visibleItems: T[];
  canLoadMore: boolean;
  loadMore: () => void;
  reset: () => void;
  visibleCount: number;
  totalItems: number;
}

export const useLoadMore = <T,>(items: T[], itemsPerPage: number = 12): UseLoadMoreResult<T> => {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount);
  }, [items, visibleCount]);

  const canLoadMore = visibleCount < items.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + itemsPerPage, items.length));
  }, [itemsPerPage, items.length]);

  const reset = useCallback(() => {
    setVisibleCount(itemsPerPage);
  }, [itemsPerPage]);

  return {
    visibleItems,
    canLoadMore,
    loadMore,
    reset,
    visibleCount,
    totalItems: items.length,
  };
};
