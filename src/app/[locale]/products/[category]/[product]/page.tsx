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

  const t = await getTranslations({ locale, namespace: 'products' });

  // Get translated product name and description for metadata
  const productName = t.has(`items.${productId}.name`)
    ? t(`items.${productId}.name`)
    : product.name;
  const productDesc = t.has(`items.${productId}.description`)
    ? t(`items.${productId}.description`)
    : product.description;
  const categoryTitle = t.has(`categories.${categorySlug}.title`)
    ? t(`categories.${categorySlug}.title`)
    : category.title;

  const title = `${productName} - ${categoryTitle}`;
  const description = `${productDesc} Source in bulk from Watu Care — wholesale B2B medical supplier for Africa and the Middle East.`;

  return {
    title,
    description,
    keywords: [
      productName,
      categoryTitle,
      'medical supplies',
      'wholesale',
      'B2B',
      ...(product.materials || []),
    ],
    openGraph: {
      title: `${productName} | Watu Care`,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/products/${categorySlug}/${productId}`,
      images: [
        {
          url: product.image || `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: productName,
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/products/${categorySlug}/${productId}`,
      languages: {
        'x-default': `${BASE_URL}/en/products/${categorySlug}/${productId}`,
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
  const tNav = await getTranslations('nav');
  const category = getCategoryBySlug(categorySlug);
  const product = getProductBySlug(categorySlug, productId);

  if (!category || !product) {
    notFound();
  }

  // Get translated category title
  const categoryTitle = t.has(`categories.${categorySlug}.title`)
    ? t(`categories.${categorySlug}.title`)
    : category.title;

  // Get translated product name
  const productName = t.has(`items.${productId}.name`)
    ? t(`items.${productId}.name`)
    : product.name;

  // Get translated product description
  const productDescription = t.has(`items.${productId}.description`)
    ? t(`items.${productId}.description`)
    : product.description;

  // Generate JSON-LD schemas
  const productSchema = generateProductSchema(product, category, locale, productDescription);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tNav('home'), url: `${BASE_URL}/${locale}` },
    { name: t('title'), url: `${BASE_URL}/${locale}/products` },
    { name: categoryTitle, url: `${BASE_URL}/${locale}/products/${category.slug}` },
    { name: productName },
  ]);

  return (
    <main className="min-h-[100dvh] pb-24 pt-0">
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

      {/* Thin accent strip */}
      <div className="h-0.5 bg-primary" />

      <div className="pt-10">
        <Container>
          {/* Breadcrumb */}
          <Breadcrumb
            locale={locale}
            items={[
              { label: tNav('home'), href: '/' },
              { label: t('title'), href: '/products' },
              { label: categoryTitle, href: `/products/${category.slug}` },
              { label: productName },
            ]}
          />

          {/* Product Detail */}
          <div className="stagger-item stagger-delay-1">
            <ProductDetail product={product} category={category} />
          </div>

          {/* Related Products */}
          <div className="stagger-item stagger-delay-3">
            <RelatedProducts
              categorySlug={categorySlug}
              currentProductId={productId}
              limit={3}
            />
          </div>
        </Container>
      </div>
    </main>
  );
}
