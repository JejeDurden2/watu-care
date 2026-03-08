import { useRef, useEffect } from 'react';
import { trackSearchQuery, trackSearchResultClick } from '@/lib/analytics';

/**
 * Tracks search queries (once per settled query ≥ 3 chars) and provides
 * a handler that tracks result clicks before running a cleanup callback.
 */
export function useSearchTracking(
  query: string,
  resultCount: number,
  isSearching: boolean,
  onResultCleanup: (productId?: string) => void,
): (productId?: string) => void {
  const lastTrackedQuery = useRef('');

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length >= 3 && trimmed !== lastTrackedQuery.current && !isSearching) {
      lastTrackedQuery.current = trimmed;
      trackSearchQuery(trimmed, resultCount);
    }
  }, [query, resultCount, isSearching]);

  return (productId?: string) => {
    if (productId) {
      trackSearchResultClick(productId, query);
    }
    onResultCleanup(productId);
  };
}
