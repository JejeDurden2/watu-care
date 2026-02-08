import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import {
  MapPin,
  Clock,
  Truck,
  Shield,
  DollarSign,
  Building2,
  CheckCircle,
} from 'lucide-react';
import { Container, Button } from '@/components/ui';
import { Breadcrumb } from '@/components/products';
import { CategoryCard, SupplierHeroGraphic } from '@/components/sections';
import { getAllCategories } from '@/lib/products';
import { getTier1Countries, getCountryBySlug } from '@/data/countries';
import {
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
  generateSupplierItemListSchema,
  combineSchemas,
} from '@/lib/schema';
import { Link } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n/config';
import { SupplierQuoteButton } from './SupplierQuoteButton';

const BASE_URL = 'https://watu-care.com';

interface CountryPageProps {
  params: Promise<{
    locale: Locale;
    country: string;
  }>;
}

export async function generateStaticParams(): Promise<
  Array<{ locale: Locale; country: string }>
> {
  const tier1Countries = getTier1Countries();
  return locales.flatMap((locale) =>
    tier1Countries.map((country) => ({
      locale,
      country: country.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  const { locale, country: countrySlug } = await params;
  const t = await getTranslations({ locale, namespace: 'suppliers' });
  const country = getCountryBySlug(countrySlug);

  if (!country || country.tier !== 1) {
    return { title: 'Not Found' };
  }

  const countryName = t.has(`countries.${countrySlug}`)
    ? t(`countries.${countrySlug}`)
    : country.name;

  const title = t('meta.titleTemplate', { country: countryName });
  const description = t('meta.descriptionTemplate', { country: countryName });

  return {
    title,
    description,
    keywords: [
      `medical supplies ${countryName}`,
      `medical equipment ${countryName}`,
      `healthcare supplier ${countryName}`,
      `PPE supplier ${countryName}`,
      'wholesale medical supplies',
      'B2B healthcare',
      country.region === 'africa' ? 'Africa medical supplies' : 'Middle East medical supplies',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/suppliers/${countrySlug}`,
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `Medical Supplies in ${countryName}`,
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/suppliers/${countrySlug}`,
      languages: {
        en: `${BASE_URL}/en/suppliers/${countrySlug}`,
        fr: `${BASE_URL}/fr/suppliers/${countrySlug}`,
      },
    },
  };
}

export default async function CountrySupplierPage({
  params,
}: CountryPageProps): Promise<React.ReactElement> {
  const { locale, country: countrySlug } = await params;
  const t = await getTranslations('suppliers');
  const tNav = await getTranslations('nav');
  const tProducts = await getTranslations('products');

  const country = getCountryBySlug(countrySlug);
  if (!country || country.tier !== 1) {
    notFound();
  }

  const categories = getAllCategories();
  const tier1Countries = getTier1Countries().filter((c) => c.slug !== countrySlug);

  const countryName = t.has(`countries.${countrySlug}`)
    ? t(`countries.${countrySlug}`)
    : country.name;

  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tNav('home'), url: `${BASE_URL}/${locale}` },
    { name: t('breadcrumb.suppliers'), url: `${BASE_URL}/${locale}/suppliers` },
    { name: countryName },
  ]);

  const localBusinessSchema = generateLocalBusinessSchema(
    country.name,
    country.code,
    locale
  );

  const categoryListSchema = generateSupplierItemListSchema(
    categories.map((cat) => ({
      name: tProducts.has(`categories.${cat.slug}.title`)
        ? tProducts(`categories.${cat.slug}.title`)
        : cat.title,
      url: `${BASE_URL}/${locale}/suppliers/${countrySlug}/${cat.slug}`,
    })),
    `Medical Supply Categories in ${countryName}`
  );

  const combinedSchema = combineSchemas(
    breadcrumbSchema,
    localBusinessSchema,
    categoryListSchema
  );

  // Features with translations
  const features = [
    {
      icon: Clock,
      title: t('features.fastResponse'),
      description: t('features.fastResponseDesc', { country: countryName }),
    },
    {
      icon: Truck,
      title: t('features.directShipping'),
      description: t('features.directShippingDesc', { country: countryName }),
    },
    {
      icon: Shield,
      title: t('features.qualityProducts'),
      description: t('features.qualityProductsDesc'),
    },
    {
      icon: DollarSign,
      title: t('features.competitivePricing'),
      description: t('features.competitivePricingDesc'),
    },
  ];

  return (
    <main>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-primary/20 py-16 lg:py-24">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>

        <Container className="relative z-10">
          <Breadcrumb
            locale={locale}
            items={[
              { label: tNav('home'), href: '/' },
              { label: t('breadcrumb.suppliers'), href: '/suppliers' },
              { label: countryName },
            ]}
            variant="light"
          />

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90">
                <MapPin className="h-4 w-4" />
                {country.subRegion}
              </div>

              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {t('hero.titlePrefix')}{' '}
                <span className="text-accent">{countryName}</span>
              </h1>

              <p className="mb-8 text-lg text-white/80 md:text-xl">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <SupplierQuoteButton variant="white" />
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/products">{tNav('products')}</Link>
                </Button>
              </div>
            </div>

            {/* Hero Graphic */}
            <div className="hidden h-72 lg:block lg:h-80">
              <SupplierHeroGraphic countryName={countryName} />
            </div>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="border-b border-border py-12">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 rounded-xl bg-background p-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Healthcare Market Context */}
      {country.healthcareContext && (
        <section className="py-16">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-secondary">
                  {t('content.healthcareMarketTitle', { country: countryName })}
                </h2>
                <p className="text-lg leading-relaxed text-foreground/80">
                  {country.healthcareContext}
                </p>

                {country.marketHighlights && (
                  <div className="mt-8">
                    <h3 className="mb-4 font-semibold text-secondary">
                      {t('content.marketHighlightsTitle')}
                    </h3>
                    <ul className="space-y-3">
                      {country.marketHighlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3">
                          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                          <span className="text-foreground/80">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {country.keyFacilities && (
                <div className="rounded-2xl bg-muted/50 p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold text-secondary">
                      {t('content.keyFacilitiesTitle')}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {country.keyFacilities.map((facility) => (
                      <li
                        key={facility}
                        className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm"
                      >
                        <div className="h-2 w-2 rounded-full bg-accent" />
                        <span className="font-medium text-secondary">{facility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Product Categories */}
      <section className="bg-muted/30 py-16">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-secondary md:text-4xl">
              {t('content.categoriesTitle', { country: countryName })}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t('content.categoriesSubtitle', { country: countryName })}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => {
              const categoryTitle = tProducts.has(`categories.${category.slug}.title`)
                ? tProducts(`categories.${category.slug}.title`)
                : category.title;
              const categoryDesc = tProducts.has(`categories.${category.slug}.description`)
                ? tProducts(`categories.${category.slug}.description`)
                : category.description;

              return (
                <CategoryCard
                  key={category.slug}
                  slug={category.slug}
                  title={categoryTitle}
                  description={categoryDesc}
                  productCount={category.products.length}
                  href={`/suppliers/${countrySlug}/${category.slug}`}
                />
              );
            })}
          </div>
        </Container>
      </section>

      {/* Other Countries */}
      <section className="py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-bold text-secondary">
            {t('content.otherCountriesTitle')}
          </h2>
          <div className="flex flex-wrap gap-3">
            {tier1Countries.map((otherCountry) => {
              const otherCountryName = t.has(`countries.${otherCountry.slug}`)
                ? t(`countries.${otherCountry.slug}`)
                : otherCountry.name;

              return (
                <Link
                  key={otherCountry.slug}
                  href={`/suppliers/${otherCountry.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  {otherCountryName}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-secondary via-secondary to-primary/80 py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              {t('content.requestQuoteTitle', { country: countryName })}
            </h2>
            <p className="mb-8 text-lg text-white/80">
              {t('content.requestQuoteSubtitle', { country: countryName })}
            </p>
            <SupplierQuoteButton variant="white" />
          </div>
        </Container>
      </section>
    </main>
  );
}
