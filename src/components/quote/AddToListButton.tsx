'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ListPlus, ListCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useQuoteStore } from '@/lib/quote-store';
import { Button } from '@/components/ui';
import type { Product, ProductCategory } from '@/types/product';

interface AddToListButtonProps {
  product: Product;
  category: ProductCategory;
  variant?: 'icon' | 'full';
  className?: string;
}

export function AddToListButton({
  product,
  category,
  variant = 'icon',
  className = '',
}: AddToListButtonProps): React.ReactElement {
  const t = useTranslations('quote');
  const { addItem, removeItem, isInList } = useQuoteStore();
  const [hydrated, setHydrated] = useState(false);
  const [inList, setInList] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setInList(isInList(product.id));
  }, [isInList, product.id]);

  // Update local state when store changes
  useEffect(() => {
    if (hydrated) {
      const unsubscribe = useQuoteStore.subscribe((state) => {
        setInList(state.items.some((i) => i.productId === product.id));
      });
      return unsubscribe;
    }
  }, [hydrated, product.id]);

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (inList) {
      removeItem(product.id);
      toast.success(t('toast.removed'));
    } else {
      addItem({
        productId: product.id,
        productName: product.name,
        categorySlug: category.slug,
        categoryTitle: category.title,
      });
      toast.success(t('toast.added'));
    }
  };

  if (!hydrated) {
    // Return placeholder to avoid hydration mismatch
    if (variant === 'icon') {
      return (
        <button
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm ${className}`}
          disabled
        >
          <ListPlus className="h-5 w-5 text-primary" />
        </button>
      );
    }
    return (
      <Button variant="outline" className={className} disabled>
        <ListPlus className="mr-2 h-4 w-4" />
        {t('addToList')}
      </Button>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:bg-white ${className}`}
        aria-label={inList ? t('removeFromList') : t('addToList')}
        title={inList ? t('removeFromList') : t('addToList')}
      >
        {inList ? (
          <ListCheck className="h-5 w-5 text-accent" />
        ) : (
          <ListPlus className="h-5 w-5 text-primary" />
        )}
      </button>
    );
  }

  return (
    <Button
      variant={inList ? 'secondary' : 'outline'}
      onClick={handleClick}
      className={className}
    >
      {inList ? (
        <>
          <ListCheck className="mr-2 h-4 w-4" />
          {t('addedToList')}
        </>
      ) : (
        <>
          <ListPlus className="mr-2 h-4 w-4" />
          {t('addToList')}
        </>
      )}
    </Button>
  );
}
