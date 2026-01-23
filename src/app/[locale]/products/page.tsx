import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';
import { CategoryCard, ProductGrid } from '@/components/products';
import { getAllCategories } from '@/lib/products';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Medical Products & Supplies | Watu Care',
    description:
      'Browse our comprehensive range of medical devices, PPE, and healthcare supplies across 10 categories. Premium quality products from leading Asian manufacturers.',
  };
}

interface ProductsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ProductsPage({
  params,
}: ProductsPageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  const t = await getTranslations('products');
  const categories = getAllCategories();

  return (
    <main className="py-16">
      <Container>
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-secondary md:text-5xl">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70">
            {t('subtitle')}
          </p>
        </div>

        {/* Categories Grid */}
        <ProductGrid>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              locale={locale}
            />
          ))}
        </ProductGrid>
      </Container>
    </main>
  );
}
