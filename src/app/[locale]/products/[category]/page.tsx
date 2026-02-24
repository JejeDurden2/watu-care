import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Container, Button, QuoteModalButton } from '@/components/ui';
import { Link } from '@/i18n/routing';
import {
  Breadcrumb,
  CategoryIcon,
  ProductCard,
} from '@/components/products';
import { getAllCategories, getCategoryBySlug } from '@/lib/products';
import { generateBreadcrumbSchema } from '@/lib/schema';

const BASE_URL = 'https://watu-care.com';

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
  const { locale, category: categorySlug } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  // Get translated category title
  const categoryTitle = t.has(`categories.${categorySlug}.title`)
    ? t(`categories.${categorySlug}.title`)
    : category.title;

  // Get translated long description for metadata
  const categoryLongDesc = t.has(`categories.${categorySlug}.longDescription`)
    ? t(`categories.${categorySlug}.longDescription`)
    : category.longDescription;

  const title = `${categoryTitle} - Medical Supplies`;
  const description = `${categoryLongDesc} ${category.products.length} products available — request a wholesale quote from Watu Care.`;

  return {
    title,
    description,
    keywords: [
      category.title,
      'medical supplies',
      'wholesale',
      'B2B',
      'healthcare',
      'Africa',
      'Middle East',
    ],
    openGraph: {
      title: `${category.title} | Watu Care`,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/products/${categorySlug}`,
      images: [
        {
          url: category.image || `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: category.title,
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/products/${categorySlug}`,
      languages: {
        'x-default': `${BASE_URL}/en/products/${categorySlug}`,
        en: `${BASE_URL}/en/products/${categorySlug}`,
        fr: `${BASE_URL}/fr/products/${categorySlug}`,
      },
    },
  };
}

export default async function CategoryPage({
  params,
}: CategoryPageProps): Promise<React.ReactElement> {
  const { locale, category: categorySlug } = await params;
  const t = await getTranslations('products');
  const tNav = await getTranslations('nav');
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  // Get translated category title and description
  const categoryTitle = t.has(`categories.${categorySlug}.title`)
    ? t(`categories.${categorySlug}.title`)
    : category.title;
  const categoryDescription = t.has(`categories.${categorySlug}.longDescription`)
    ? t(`categories.${categorySlug}.longDescription`)
    : category.longDescription;

  // Helper to get translated product description
  const getProductDescription = (productId: string, fallback: string): string =>
    t.has(`items.${productId}.description`)
      ? t(`items.${productId}.description`)
      : fallback;

  // Generate Breadcrumb JSON-LD
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tNav('home'), url: `${BASE_URL}/${locale}` },
    { name: t('title'), url: `${BASE_URL}/${locale}/products` },
    { name: categoryTitle },
  ]);

  // Generate ItemList schema for products
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: categoryTitle,
    description: categoryDescription,
    numberOfItems: category.products.length,
    itemListElement: category.products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: getProductDescription(product.id, product.description),
        url: `${BASE_URL}/${locale}/products/${category.slug}/${product.id}`,
      },
    })),
  };

  return (
    <main className="min-h-[100dvh]">
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {/* ItemList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />

      {/* Gradient hero band */}
      <section className="gradient-hero py-16 lg:py-24">
        <Container>
          <Breadcrumb
            locale={locale}
            variant="light"
            items={[
              { label: tNav('home'), href: '/' },
              { label: t('title'), href: '/products' },
              { label: categoryTitle },
            ]}
          />

          {/* Asymmetric split: content left, count + CTA right */}
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              {/* Icon badge */}
              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl ${category.color}`}
              >
                <CategoryIcon slug={category.iconSlug} className="h-7 w-7" />
              </div>

              {/* Accent rule */}
              <div className="mb-4 h-px w-12 bg-accent" />

              <h1 className="stagger-item stagger-delay-1 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {categoryTitle}
              </h1>
              <p className="stagger-item stagger-delay-2 mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
                {categoryDescription}
              </p>
            </div>

            {/* Right: count + quote CTA */}
            <div className="stagger-item stagger-delay-3 flex flex-col items-start gap-4 lg:items-end lg:pb-1">
              <div className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm">
                {t('productCount', { count: category.products.length })}{' '}
                {t('available')}
              </div>
              <QuoteModalButton size="md" className="bg-white text-secondary hover:bg-white/90">
                {tNav('requestQuote')}
              </QuoteModalButton>
            </div>
          </div>
        </Container>
      </section>

      {/* Products grid section */}
      <section className="py-16 lg:py-24">
        <Container>
          <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
            data-animate
          >
            {category.products.map((product, index) => (
              <div
                key={product.id}
                className="stagger-item"
                style={{ animationDelay: `${index * 60}ms` } as React.CSSProperties}
              >
                <ProductCard product={product} category={category} />
              </div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-20 border-t border-border pt-12">
            <p className="mb-5 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {t('categories.title')}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <QuoteModalButton size="lg">{tNav('requestQuote')}</QuoteModalButton>
              <Button variant="outline" size="lg" asChild>
                <Link href="/products">{t('backToCategories')}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
