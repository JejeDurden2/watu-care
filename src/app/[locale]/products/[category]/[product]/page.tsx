import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';
import {
  Breadcrumb,
  ProductDetail,
  RelatedProducts,
} from '@/components/products';
import {
  getAllCategories,
  getCategoryBySlug,
  getProductBySlug,
} from '@/lib/products';
import {
  generateProductSchema,
  generateBreadcrumbSchema,
} from '@/lib/schema';

const BASE_URL = 'https://watu-care.com';

interface ProductPageProps {
  params: Promise<{
    locale: string;
    category: string;
    product: string;
  }>;
}

export async function generateStaticParams(): Promise<
  Array<{ category: string; product: string }>
> {
  const categories = getAllCategories();
  const params: Array<{ category: string; product: string }> = [];

  for (const category of categories) {
    for (const product of category.products) {
      params.push({
        category: category.slug,
        product: product.id,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const {
    locale,
    category: categorySlug,
    product: productId,
  } = await params;
  const category = getCategoryBySlug(categorySlug);
  const product = getProductBySlug(categorySlug, productId);

  if (!category || !product) {
    return {
      title: 'Product Not Found',
    };
  }

  const title = `${product.name} - ${category.title}`;
  const description = `${product.description} Available from Watu Care - your trusted B2B medical supplies partner.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      category.title,
      'medical supplies',
      'wholesale',
      'B2B',
      ...(product.materials || []),
    ],
    openGraph: {
      title: `${product.name} | Watu Care`,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/products/${categorySlug}/${productId}`,
      images: [
        {
          url: product.image || `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Watu Care`,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/products/${categorySlug}/${productId}`,
      languages: {
        en: `${BASE_URL}/en/products/${categorySlug}/${productId}`,
        fr: `${BASE_URL}/fr/products/${categorySlug}/${productId}`,
      },
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps): Promise<React.ReactElement> {
  const { locale, category: categorySlug, product: productId } = await params;
  const t = await getTranslations('products');
  const category = getCategoryBySlug(categorySlug);
  const product = getProductBySlug(categorySlug, productId);

  if (!category || !product) {
    notFound();
  }

  // Generate JSON-LD schemas
  const productSchema = generateProductSchema(product, category, locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/${locale}` },
    { name: t('title'), url: `${BASE_URL}/${locale}/products` },
    { name: category.title, url: `${BASE_URL}/${locale}/products/${category.slug}` },
    { name: product.name },
  ]);

  return (
    <main className="py-16">
      {/* Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Container>
        {/* Breadcrumb */}
        <Breadcrumb
          locale={locale}
          items={[
            { label: 'Home', href: '/' },
            { label: t('title'), href: '/products' },
            { label: category.title, href: `/products/${category.slug}` },
            { label: product.name },
          ]}
        />

        {/* Product Detail */}
        <ProductDetail product={product} category={category} locale={locale} />

        {/* Related Products */}
        <RelatedProducts
          categorySlug={categorySlug}
          currentProductId={productId}
          locale={locale}
          limit={3}
        />
      </Container>
    </main>
  );
}
