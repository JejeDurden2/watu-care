import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';
import { CategoryCard, ProductGrid } from '@/components/products';
import { getAllCategories } from '@/lib/products';
import { generateBreadcrumbSchema } from '@/lib/schema';

const BASE_URL = 'https://watu-care.com';

interface ProductsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });

  const title = t('title');
  const description = t('subtitle');

  return {
    title,
    description,
    keywords: [
      'medical products',
      'medical supplies catalog',
      'PPE wholesale',
      'medical devices',
      'healthcare equipment',
      'B2B medical supplies',
      'Africa medical supplies',
      'Middle East healthcare',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/products`,
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'Watu Care Medical Products Catalog',
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/products`,
      languages: {
        en: `${BASE_URL}/en/products`,
        fr: `${BASE_URL}/fr/products`,
      },
    },
  };
}

export default async function ProductsPage({
  params,
}: ProductsPageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  const t = await getTranslations('products');
  const categories = getAllCategories();

  // Generate Breadcrumb JSON-LD
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/${locale}` },
    { name: t('title') },
  ]);

  return (
    <main className="py-16">
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

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
