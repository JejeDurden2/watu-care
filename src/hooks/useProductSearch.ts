'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getAllCategories } from '@/lib/products';
import type { Product, ProductCategory } from '@/types/product';

export interface SearchResult {
  product: Product;
  category: ProductCategory;
  translatedName: string;
  translatedDescription: string;
  translatedCategoryTitle: string;
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
  const t = useTranslations('products');

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
      const categoryTitle = t.has(`categories.${category.slug}.title`)
        ? t(`categories.${category.slug}.title`)
        : category.title;

      for (const product of category.products) {
        const productName = t.has(`items.${product.id}.name`)
          ? t(`items.${product.id}.name`)
          : product.name;
        const productDescription = t.has(`items.${product.id}.description`)
          ? t(`items.${product.id}.description`)
          : product.description;

        const normalizedName = normalizeString(productName);
        const normalizedDescription = normalizeString(productDescription);

        if (
          normalizedName.includes(normalizedQuery) ||
          normalizedDescription.includes(normalizedQuery)
        ) {
          searchResults.push({
            product,
            category,
            translatedName: productName,
            translatedDescription: productDescription,
            translatedCategoryTitle: categoryTitle,
          });
        }
      }
    }

    return searchResults.sort((a, b) => {
      const aNameMatch = normalizeString(a.translatedName).includes(normalizedQuery);
      const bNameMatch = normalizeString(b.translatedName).includes(normalizedQuery);
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      return a.translatedName.localeCompare(b.translatedName);
    });
  }, [debouncedQuery, categories, t]);

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
