import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { MapPin, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { Breadcrumb } from '@/components/products';
import { getTier1Countries } from '@/data/countries';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { Link } from '@/i18n/routing';

const BASE_URL = 'https://watu-care.com';

interface SuppliersPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: SuppliersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'suppliers' });

  const title = t('index.meta.title');
  const description = t('index.meta.description');

  return {
    title,
    description,
    keywords: [
      'medical supplies Africa',
      'medical supplies Middle East',
      'healthcare supplier by country',
      'PPE wholesale Africa',
      'medical equipment Middle East',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/suppliers`,
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'Watu Care - Medical Supplies by Country',
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/suppliers`,
      languages: {
        'x-default': `${BASE_URL}/en/suppliers`,
        en: `${BASE_URL}/en/suppliers`,
        fr: `${BASE_URL}/fr/suppliers`,
      },
    },
  };
}

export default async function SuppliersPage({
  params,
}: SuppliersPageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  const t = await getTranslations('suppliers');
  const tNav = await getTranslations('nav');

  const tier1Countries = getTier1Countries();
  const africaCountries = tier1Countries.filter((c) => c.region === 'africa');
  const middleEastCountries = tier1Countries.filter((c) => c.region === 'middle-east');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tNav('home'), url: `${BASE_URL}/${locale}` },
    { name: t('breadcrumb.suppliers') },
  ]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-secondary to-primary/20 py-16 lg:py-24">
        <Container>
          <Breadcrumb
            locale={locale}
            items={[
              { label: tNav('home'), href: '/' },
              { label: t('breadcrumb.suppliers') },
            ]}
            variant="light"
          />
          <div className="mt-8 max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              {t('index.title')}
            </h1>
            <p className="text-lg text-white/80">
              {t('index.description')}
            </p>
            <p className="mt-4 text-sm font-medium text-accent">
              {t('index.countriesCount', { count: tier1Countries.length })}
            </p>
          </div>
        </Container>
      </section>

      {/* Africa */}
      <section className="py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-bold text-secondary">
            {t('regions.africa')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {africaCountries.map((country) => {
              const countryName = t.has(`countries.${country.slug}`)
                ? t(`countries.${country.slug}`)
                : country.name;

              return (
                <Link
                  key={country.slug}
                  href={`/suppliers/${country.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-white p-4 transition-all hover:border-primary hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-secondary">{countryName}</p>
                      <p className="text-xs text-muted-foreground">{country.subRegion}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Middle East */}
      <section className="border-t border-border bg-muted/30 py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-bold text-secondary">
            {t('regions.middle-east')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {middleEastCountries.map((country) => {
              const countryName = t.has(`countries.${country.slug}`)
                ? t(`countries.${country.slug}`)
                : country.name;

              return (
                <Link
                  key={country.slug}
                  href={`/suppliers/${country.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-white p-4 transition-all hover:border-primary hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-secondary">{countryName}</p>
                      <p className="text-xs text-muted-foreground">{country.subRegion}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
