import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import {
  MapPin,
  Clock,
  Truck,
  Shield,
  DollarSign,
} from 'lucide-react';
import { Container, Button } from '@/components/ui';
import { Breadcrumb } from '@/components/products';
import { CategoryCard, PseoHeroBackground, PseoHeroPulse, PseoHealthcareContext } from '@/components/sections';
import { getAllCategories } from '@/lib/products';
import { getTier1Countries, getCountryBySlug } from '@/data/countries';
import {
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
  generateMarketItemListSchema,
  combineSchemas,
} from '@/lib/schema';
import { Link } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n/config';
import { MarketQuoteButton } from './MarketQuoteButton';
import { BASE_URL } from '@/lib/constants';

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
  const t = await getTranslations({ locale, namespace: 'markets' });
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
      url: `${BASE_URL}/${locale}/markets/${countrySlug}`,
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
      canonical: `${BASE_URL}/${locale}/markets/${countrySlug}`,
      languages: {
        'x-default': `${BASE_URL}/en/markets/${countrySlug}`,
        en: `${BASE_URL}/en/markets/${countrySlug}`,
        fr: `${BASE_URL}/fr/markets/${countrySlug}`,
      },
    },
  };
}

export default async function CountryMarketPage({
  params,
}: CountryPageProps): Promise<React.ReactElement> {
  const { locale, country: countrySlug } = await params;
  const t = await getTranslations('markets');
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

  // Resolve translated country data (falls back to data file)
  const healthcareContext = t.has(`countryData.${countrySlug}.healthcareContext`)
    ? t(`countryData.${countrySlug}.healthcareContext`)
    : country.healthcareContext;

  const marketHighlights: string[] | undefined = t.has(`countryData.${countrySlug}.marketHighlights`)
    ? (t.raw(`countryData.${countrySlug}.marketHighlights`) as string[])
    : country.marketHighlights;

  const keyFacilities: string[] | undefined = t.has(`countryData.${countrySlug}.keyFacilities`)
    ? (t.raw(`countryData.${countrySlug}.keyFacilities`) as string[])
    : country.keyFacilities;

  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tNav('home'), url: `${BASE_URL}/${locale}` },
    { name: t('breadcrumb.markets'), url: `${BASE_URL}/${locale}/markets` },
    { name: countryName },
  ]);

  const localBusinessSchema = generateLocalBusinessSchema(
    country.name,
    countrySlug,
    locale
  );

  const categoryListSchema = generateMarketItemListSchema(
    categories.map((cat) => ({
      name: tProducts.has(`categories.${cat.slug}.title`)
        ? tProducts(`categories.${cat.slug}.title`)
        : cat.title,
      url: `${BASE_URL}/${locale}/markets/${countrySlug}/${cat.slug}`,
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
      <section className="relative overflow-hidden bg-secondary py-16 lg:py-24">
        <PseoHeroBackground />

        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { label: tNav('home'), href: '/' },
              { label: t('breadcrumb.markets'), href: '/markets' },
              { label: countryName },
            ]}
            variant="light"
          />

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90">
                <MapPin className="h-4 w-4" />
                {t.has(`countryData.${countrySlug}.subRegion`)
                  ? t(`countryData.${countrySlug}.subRegion`)
                  : country.subRegion}
              </div>

              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {t('hero.titlePrefix')}{' '}
                <span className="text-accent">{countryName}</span>
              </h1>

              <p className="mb-8 text-lg text-white/80 md:text-xl">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <MarketQuoteButton variant="white" />
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

            {/* Pulse — right side, desktop only */}
            <PseoHeroPulse />
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="border-b border-border py-12">
        <Container>
          <dl className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 bg-background px-6 py-8"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <dt className="font-semibold text-secondary">{feature.title}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {feature.description}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Healthcare Market Context */}
      {healthcareContext && (
        <PseoHealthcareContext
          healthcareTitle={t('content.healthcareMarketTitle', { country: countryName })}
          healthcareContext={healthcareContext}
          highlightsTitle={t('content.marketHighlightsTitle')}
          highlights={marketHighlights}
          facilitiesTitle={t('content.keyFacilitiesTitle')}
          facilitiesSubtitle={t('content.keyFacilitiesSubtitle', { country: countryName })}
          facilities={keyFacilities}
        />
      )}

      {/* Product Categories */}
      <section className="bg-muted/30 py-16">
        <Container>
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-secondary md:text-4xl">
              {t('content.categoriesTitle', { country: countryName })}
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
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
                  href={`/markets/${countrySlug}/${category.slug}`}
                />
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/products">{t('content.viewFullCatalog')}</Link>
            </Button>
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
                  href={`/markets/${otherCountry.slug}`}
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
            <MarketQuoteButton variant="white" />
          </div>
        </Container>
      </section>
    </main>
  );
}
