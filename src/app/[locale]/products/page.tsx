import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container, QuoteModalButton } from '@/components/ui';
import { CategoryCard } from '@/components/products';
import { getAllCategories, getTotalProductCount } from '@/lib/products';
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
        'x-default': `${BASE_URL}/en/products`,
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
  const tNav = await getTranslations('nav');
  const categories = getAllCategories();
  const totalCount = getTotalProductCount();

  // Generate Breadcrumb JSON-LD
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/${locale}` },
    { name: t('title') },
  ]);

  return (
    <main className="min-h-[100dvh] py-16">
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Container>
        {/* Asymmetric split header — left-aligned H1, right CTA */}
        <div className="mb-16 grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-end">
          <div>
            <div className="mb-5 h-px w-12 bg-accent" />
            <h1 className="stagger-item stagger-delay-1 text-4xl font-bold text-secondary md:text-5xl lg:text-6xl">
              {t('title')}
            </h1>
            <p className="stagger-item stagger-delay-2 mt-4 max-w-lg text-lg text-foreground/70">
              {t('subtitle')}
            </p>
          </div>
          <div className="stagger-item stagger-delay-3 flex flex-col items-start gap-4 lg:items-end lg:pb-1">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {totalCount}+ products · {categories.length} categories
            </p>
            <QuoteModalButton size="md">{tNav('requestQuote')}</QuoteModalButton>
          </div>
        </div>

        {/* Categories grid — auto-fill, staggered */}
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
          data-animate
        >
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="stagger-item"
              style={{ animationDelay: `${index * 70}ms` } as React.CSSProperties}
            >
              <CategoryCard
                category={category}
                locale={locale}
              />
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
