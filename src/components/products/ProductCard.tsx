import Link from 'next/link';
import { FileText } from 'lucide-react';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  categorySlug: string;
  locale: string;
}

export function ProductCard({
  product,
  categorySlug,
  locale,
}: ProductCardProps): React.ReactElement {
  return (
    <Link
      href={`/${locale}/products/${categorySlug}/${product.id}`}
      className="group block h-full rounded-lg border border-border bg-background p-6 transition-all hover:border-primary hover:shadow-lg"
    >
      <div className="flex h-full flex-col">
        {/* Product Name */}
        <h3 className="mb-3 text-lg font-semibold text-secondary transition-colors group-hover:text-primary">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="mb-4 flex-grow text-sm text-foreground/70">
          {product.description}
        </p>

        {/* Specifications Count */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>
            {product.specifications.length} specification
            {product.specifications.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Sizes Badge (if available) */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-2 text-xs text-accent">
            {product.sizes.length} size{product.sizes.length !== 1 ? 's' : ''}{' '}
            available
          </div>
        )}
      </div>
    </Link>
  );
}
