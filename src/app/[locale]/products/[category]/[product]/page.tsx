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
  const { category: categorySlug, product: productId } = await params;
  const category = getCategoryBySlug(categorySlug);
  const product = getProductBySlug(categorySlug, productId);

  if (!category || !product) {
    return {
      title: 'Product Not Found | Watu Care',
    };
  }

  return {
    title: `${product.name} | ${category.title} | Watu Care`,
    description: product.description,
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

  return (
    <main className="py-16">
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
