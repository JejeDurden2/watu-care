import { getRelatedProducts } from '@/lib/products';
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
  const relatedProducts = getRelatedProducts(
    categorySlug,
    currentProductId,
    limit,
  );

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-2xl font-bold text-secondary">
        More in this category
      </h2>
      <ProductGrid>
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categorySlug={categorySlug}
            locale={locale}
          />
        ))}
      </ProductGrid>
    </section>
  );
}
