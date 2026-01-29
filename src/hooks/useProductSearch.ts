'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import { getAllCategories } from '@/lib/products';
import type { Product, ProductCategory } from '@/types/product';

export interface SearchResult {
  product: Product;
  category: ProductCategory;
}

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function useProductSearch(debounceMs = 300): {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isSearching: boolean;
} {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query === '') {
      setDebouncedQuery('');
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  const categories = useMemo(() => getAllCategories(), []);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const normalizedQuery = normalizeString(debouncedQuery.trim());
    const searchResults: SearchResult[] = [];

    for (const category of categories) {
      for (const product of category.products) {
        const normalizedName = normalizeString(product.name);
        const normalizedDescription = normalizeString(product.description);

        if (
          normalizedName.includes(normalizedQuery) ||
          normalizedDescription.includes(normalizedQuery)
        ) {
          searchResults.push({ product, category });
        }
      }
    }

    return searchResults.sort((a, b) => {
      const aNameMatch = normalizeString(a.product.name).includes(normalizedQuery);
      const bNameMatch = normalizeString(b.product.name).includes(normalizedQuery);
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      return a.product.name.localeCompare(b.product.name);
    });
  }, [debouncedQuery, categories]);

  const handleSetQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  return {
    query,
    setQuery: handleSetQuery,
    results,
    isSearching,
  };
}
