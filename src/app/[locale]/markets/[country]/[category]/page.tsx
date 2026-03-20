import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { MapPin, ArrowRight } from 'lucide-react';
import { Container, Button } from '@/components/ui';
import {
  Breadcrumb,
  CategoryIcon,
  ProductCard,
  ProductGrid,
} from '@/components/products';
import { CategoryCard, PseoHeroBackground, PseoHeroPulse } from '@/components/sections';
import { getAllCategories, getCategoryBySlug } from '@/lib/products';
import { getTier1Countries, getCountryBySlug } from '@/data/countries';
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateMarketItemListSchema,
  combineSchemas,
} from '@/lib/schema';
import { Link } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n/config';
import { MarketQuoteButton } from '../MarketQuoteButton';
import { BASE_URL } from '@/lib/constants';

interface CategoryCountryPageProps {
  params: Promise<{
    locale: Locale;
    country: string;
    category: string;
  }>;
}

export async function generateStaticParams(): Promise<
  Array<{ locale: Locale; country: string; category: string }>
> {
  const tier1Countries = getTier1Countries();
  const categories = getAllCategories();

  return locales.flatMap((locale) =>
    tier1Countries.flatMap((country) =>
      categories.map((category) => ({
        locale,
        country: country.slug,
        category: category.slug,
      }))
    )
  );
}

export async function generateMetadata({
  params,
}: CategoryCountryPageProps): Promise<Metadata> {
  const { locale, country: countrySlug, category: categorySlug } = await params;
  const t = await getTranslations({ locale, namespace: 'markets' });
  const tProducts = await getTranslations({ locale, namespace: 'products' });

  const country = getCountryBySlug(countrySlug);
  const category = getCategoryBySlug(categorySlug);

  if (!country || country.tier !== 1 || !category) {
    return { title: 'Not Found' };
  }

  const countryName = t.has(`countries.${countrySlug}`)
    ? t(`countries.${countrySlug}`)
    : country.name;

  const categoryName = tProducts.has(`categories.${categorySlug}.title`)
    ? tProducts(`categories.${categorySlug}.title`)
    : category.title;

  const title = t('meta.categoryTitleTemplate', {
    category: categoryName,
    country: countryName,
  });
  const description = t('meta.categoryDescriptionTemplate', {
    category: categoryName,
    country: countryName,
  });

  return {
    title,
    description,
    keywords: [
      `${categoryName} ${countryName}`,
      `${categoryName} supplier ${countryName}`,
      `buy ${categoryName} ${countryName}`,
      `wholesale ${categoryName}`,
      'medical supplies',
      'B2B healthcare',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/markets/${countrySlug}/${categorySlug}`,
      images: [
        {
          url: category.image || `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${categoryName} in ${countryName}`,
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/markets/${countrySlug}/${categorySlug}`,
      languages: {
        'x-default': `${BASE_URL}/en/markets/${countrySlug}/${categorySlug}`,
        en: `${BASE_URL}/en/markets/${countrySlug}/${categorySlug}`,
        fr: `${BASE_URL}/fr/markets/${countrySlug}/${categorySlug}`,
      },
    },
  };
}

export default async function CategoryCountryPage({
  params,
}: CategoryCountryPageProps): Promise<React.ReactElement> {
  const { locale, country: countrySlug, category: categorySlug } = await params;
  const t = await getTranslations('markets');
  const tNav = await getTranslations('nav');
  const tProducts = await getTranslations('products');

  const country = getCountryBySlug(countrySlug);
  const category = getCategoryBySlug(categorySlug);

  if (!country || country.tier !== 1 || !category) {
    notFound();
  }

  const allCategories = getAllCategories();
  const otherCategories = allCategories.filter((c) => c.slug !== categorySlug).slice(0, 4);

  const countryName = t.has(`countries.${countrySlug}`)
    ? t(`countries.${countrySlug}`)
    : country.name;

  const categoryName = tProducts.has(`categories.${categorySlug}.title`)
    ? tProducts(`categories.${categorySlug}.title`)
    : category.title;

  const categoryDesc = tProducts.has(`categories.${categorySlug}.longDescription`)
    ? tProducts(`categories.${categorySlug}.longDescription`)
    : category.longDescription;

  // Helper to get translated product description
  const getProductDescription = (productId: string, fallback: string): string =>
    tProducts.has(`items.${productId}.description`)
      ? tProducts(`items.${productId}.description`)
      : fallback;

  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tNav('home'), url: `${BASE_URL}/${locale}` },
    { name: t('breadcrumb.markets'), url: `${BASE_URL}/${locale}/markets` },
    { name: countryName, url: `${BASE_URL}/${locale}/markets/${countrySlug}` },
    { name: categoryName },
  ]);

  const serviceSchema = generateServiceSchema(
    categoryName,
    countryName,
    countrySlug,
    categorySlug,
    locale
  );

  const productListSchema = generateMarketItemListSchema(
    category.products.map((product) => ({
      name: product.name,
      url: `${BASE_URL}/${locale}/products/${categorySlug}/${product.id}`,
      description: getProductDescription(product.id, product.description),
    })),
    `${categoryName} Available in ${countryName}`
  );

  const combinedSchema = combineSchemas(
    breadcrumbSchema,
    serviceSchema,
    productListSchema
  );

  return (
    <main>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary py-16 lg:py-20">
        <PseoHeroBackground />

        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { label: tNav('home'), href: '/' },
              { label: t('breadcrumb.markets'), href: '/markets' },
              { label: countryName, href: `/markets/${countrySlug}` },
              { label: categoryName },
            ]}
            variant="light"
          />

          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="flex items-start gap-6">
              <div
                className={`hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 md:flex`}
              >
                <CategoryIcon slug={category.iconSlug} className="h-10 w-10 text-white" />
              </div>

              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/90">
                  <MapPin className="h-4 w-4" />
                  {countryName}
                </div>

                <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  {categoryName}
                </h1>

                <p className="mb-6 text-lg text-white/80">{categoryDesc}</p>

                <p className="text-sm font-medium text-accent">
                  {tProducts('productCount', { count: category.products.length })}{' '}
                  {tProducts('available')}
                </p>
              </div>
            </div>

            {/* Pulse — right side, desktop only */}
            <PseoHeroPulse />
          </div>
        </Container>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <Container>
          <div className="mb-10">
            <h2 className="mb-2 text-2xl font-bold text-secondary">
              {t('content.categoryProductsTitle', { category: categoryName })}
            </h2>
            <p className="text-muted-foreground">
              {t('content.categoryProductsSubtitle', {
                category: categoryName,
                country: countryName,
              })}
            </p>
          </div>

          <ProductGrid>
            {category.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                category={category}
              />
            ))}
          </ProductGrid>
        </Container>
      </section>

      {/* Related Categories */}
      <section className="border-t border-border bg-muted/30 py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-bold text-secondary">
            {t('content.relatedCategoriesTitle', { country: countryName })}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {otherCategories.map((otherCategory) => {
              const otherCategoryName = tProducts.has(
                `categories.${otherCategory.slug}.title`
              )
                ? tProducts(`categories.${otherCategory.slug}.title`)
                : otherCategory.title;
              const otherCategoryDesc = tProducts.has(
                `categories.${otherCategory.slug}.description`
              )
                ? tProducts(`categories.${otherCategory.slug}.description`)
                : otherCategory.description;

              return (
                <CategoryCard
                  key={otherCategory.slug}
                  slug={otherCategory.slug}
                  title={otherCategoryName}
                  description={otherCategoryDesc}
                  href={`/markets/${countrySlug}/${otherCategory.slug}`}
                />
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href={`/markets/${countrySlug}`}>
                {t('content.categoriesTitle', { country: countryName })}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-secondary via-secondary to-primary/80 py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              {t('content.requestQuoteTitle', { country: countryName })}
            </h2>
            <p className="mb-8 text-white/80">
              {t('content.requestQuoteSubtitle', { country: countryName })}
            </p>
            <MarketQuoteButton variant="white" />
          </div>
        </Container>
      </section>
    </main>
  );
}
