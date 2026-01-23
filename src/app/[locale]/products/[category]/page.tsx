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
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  const title = `${category.title} - Medical Supplies`;
  const description = `${category.longDescription} Shop ${category.products.length} products from Watu Care.`;

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
          url: category.image || `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: category.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.title} | Watu Care`,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/products/${categorySlug}`,
      languages: {
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
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  // Generate Breadcrumb JSON-LD
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/${locale}` },
    { name: t('title'), url: `${BASE_URL}/${locale}/products` },
    { name: category.title },
  ]);

  // Generate ItemList schema for products
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.title,
    description: category.longDescription,
    numberOfItems: category.products.length,
    itemListElement: category.products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        url: `${BASE_URL}/${locale}/products/${category.slug}/${product.id}`,
      },
    })),
  };

  return (
    <main className="py-16">
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
