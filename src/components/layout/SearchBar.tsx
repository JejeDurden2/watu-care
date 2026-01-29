'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useProductSearch } from '@/hooks/useProductSearch';
import { getCategoryGradient, getCategoryIcon } from '@/lib/product-images';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
  onResultClick?: () => void;
}

export function SearchBar({ className, onResultClick }: SearchBarProps): React.ReactElement {
  const t = useTranslations('search');
  const { query, setQuery, results, isSearching } = useProductSearch(300);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showResults = isOpen && query.trim().length > 0;
  const displayedResults = results.slice(0, 6);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
    onResultClick?.();
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={t('placeholder')}
          className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-8 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          aria-label={t('placeholder')}
          aria-expanded={showResults}
          aria-controls="search-results"
          aria-autocomplete="list"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
            aria-label={t('clear')}
          >
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {showResults && (
        <div
          id="search-results"
          role="listbox"
          className="absolute left-0 top-full z-50 mt-2 w-full min-w-[300px] overflow-hidden rounded-xl border border-border bg-background shadow-lg"
        >
          {displayedResults.length > 0 ? (
            <ul className="divide-y divide-border">
              {displayedResults.map(({ product, category }) => {
                const Icon = getCategoryIcon(category.slug);
                const gradient = getCategoryGradient(category.slug);
                return (
                  <li key={`${category.slug}-${product.id}`}>
                    <Link
                      href={`/products/${category.slug}/${product.id}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50"
                    >
                      <div
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white',
                          gradient
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {product.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {category.title}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              {t('noResults')}
            </div>
          )}

          {results.length > 6 && (
            <div className="border-t border-border px-4 py-2">
              <Link
                href={`/products?q=${encodeURIComponent(query)}`}
                onClick={handleResultClick}
                className="block text-center text-xs font-medium text-primary hover:underline"
              >
                {t('viewAll', { count: results.length })}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface MobileSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSearchOverlay({
  isOpen,
  onClose,
}: MobileSearchOverlayProps): React.ReactElement | null {
  const t = useTranslations('search');
  const { query, setQuery, results, isSearching } = useProductSearch(300);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayedResults = results.slice(0, 8);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleResultClick = () => {
    setQuery('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-background">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('placeholder')}
            className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            aria-label={t('placeholder')}
          />
          {isSearching ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="rounded p-1 text-muted-foreground hover:text-foreground"
              aria-label={t('clear')}
            >
              <X className="h-5 w-5" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-sm font-medium text-primary"
          >
            {t('cancel')}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {query.trim() && displayedResults.length > 0 ? (
            <ul className="divide-y divide-border">
              {displayedResults.map(({ product, category }) => {
                const Icon = getCategoryIcon(category.slug);
                const gradient = getCategoryGradient(category.slug);
                return (
                  <li key={`${category.slug}-${product.id}`}>
                    <Link
                      href={`/products/${category.slug}/${product.id}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-4 px-4 py-4 transition-colors active:bg-muted/50"
                    >
                      <div
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white',
                          gradient
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-foreground">
                          {product.name}
                        </p>
                        <p className="truncate text-sm text-muted-foreground">
                          {category.title}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : query.trim() ? (
            <div className="px-4 py-12 text-center text-muted-foreground">
              {t('noResults')}
            </div>
          ) : (
            <div className="px-4 py-12 text-center text-muted-foreground">
              {t('startTyping')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
