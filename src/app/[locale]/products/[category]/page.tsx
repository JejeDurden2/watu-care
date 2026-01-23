import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';
import {
  Breadcrumb,
  CategoryIcon,
  ProductCard,
  ProductGrid,
} from '@/components/products';
import { getAllCategories, getCategoryBySlug } from '@/lib/products';

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

export async function generateStaticParams(): Promise<
  Array<{ category: string }>
> {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: 'Category Not Found | Watu Care',
    };
  }

  return {
    title: `${category.title} | Medical Supplies | Watu Care`,
    description: category.longDescription,
  };
}

export default async function CategoryPage({
  params,
}: CategoryPageProps): Promise<React.ReactElement> {
  const { locale, category: categorySlug } = await params;
  const t = await getTranslations('products');
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <main className="py-16">
      <Container>
        {/* Breadcrumb */}
        <Breadcrumb
          locale={locale}
          items={[
            { label: 'Home', href: '/' },
            { label: t('title'), href: '/products' },
            { label: category.title },
          ]}
        />

        {/* Category Header */}
        <div className="mb-12">
          <div
            className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-lg ${category.color}`}
          >
            <CategoryIcon slug={category.iconSlug} className="h-8 w-8" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-secondary md:text-5xl">
            {category.title}
          </h1>
          <p className="max-w-3xl text-lg text-foreground/70">
            {category.longDescription}
          </p>
          <p className="mt-4 text-sm font-medium text-primary">
            {category.products.length} product
            {category.products.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Products Grid */}
        <ProductGrid>
          {category.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              category={category}
              locale={locale}
            />
          ))}
        </ProductGrid>
      </Container>
    </main>
  );
}
