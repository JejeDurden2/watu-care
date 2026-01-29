'use client';

import { useTranslations } from 'next-intl';
import { getRelatedProducts, getCategoryBySlug } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { ProductGrid } from './ProductGrid';

interface RelatedProductsProps {
  categorySlug: string;
  currentProductId: string;
  locale: string;
  limit?: number;
}

export function RelatedProducts({
  categorySlug,
  currentProductId,
  locale,
  limit = 4,
}: RelatedProductsProps): React.ReactElement | null {
  const t = useTranslations('products');
  const category = getCategoryBySlug(categorySlug);
  const relatedProducts = getRelatedProducts(
    categorySlug,
    currentProductId,
    limit,
  );

  if (!category || relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-2xl font-bold text-secondary">
        {t('moreInCategory')}
      </h2>
      <ProductGrid>
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            category={category}
            locale={locale}
          />
        ))}
      </ProductGrid>
    </section>
  );
}
