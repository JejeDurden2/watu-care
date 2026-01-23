import Link from 'next/link';
import type { ProductCategory } from '@/types/product';

interface CategoryCardProps {
  category: ProductCategory;
  locale: string;
}

export function CategoryCard({
  category,
  locale,
}: CategoryCardProps): React.ReactElement {
  const Icon = category.icon;

  return (
    <Link
      href={`/${locale}/products/${category.slug}`}
      className="group block h-full rounded-lg border border-border bg-background p-6 transition-all hover:border-primary hover:shadow-lg"
    >
      <div className="flex h-full flex-col">
        {/* Icon */}
        <div
          className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${category.color}`}
        >
          <Icon className="h-6 w-6" />
        </div>

        {/* Category Title */}
        <h3 className="mb-3 text-xl font-semibold text-secondary transition-colors group-hover:text-primary">
          {category.title}
        </h3>

        {/* Category Description */}
        <p className="mb-4 flex-grow text-sm text-foreground/70">
          {category.description}
        </p>

        {/* Product Count */}
        <div className="text-sm font-medium text-primary">
          {category.products.length} product
          {category.products.length !== 1 ? 's' : ''}
        </div>
      </div>
    </Link>
  );
}
