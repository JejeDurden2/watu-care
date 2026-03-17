import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import {
  Building2,
  Stethoscope,
  Heart,
  Pill,
  Landmark,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui';
import { Breadcrumb } from '@/components/products';
import { getAllPersonas } from '@/data/personas';
import {
  generateBreadcrumbSchema,
  generateMarketItemListSchema,
  combineSchemas,
} from '@/lib/schema';
import { Link } from '@/i18n/routing';
import { BASE_URL } from '@/lib/constants';

const PERSONA_ICONS: Record<string, LucideIcon> = {
  Building2,
  Stethoscope,
  Heart,
  Pill,
  Landmark,
};

interface SolutionsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams(): Promise<
  Array<{ locale: string }>
> {
  const { locales } = await import('@/i18n/config');
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: SolutionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'personas' });

  const title = t('index.meta.title');
  const description = t('index.meta.description');

  return {
    title,
    description,
    keywords: [
      'medical supplies by sector',
      'hospital procurement',
      'clinic medical equipment',
      'NGO medical supplies',
      'pharmacy wholesale',
      'government healthcare procurement',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/solutions`,
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/solutions`,
      languages: {
        'x-default': `${BASE_URL}/en/solutions`,
        en: `${BASE_URL}/en/solutions`,
        fr: `${BASE_URL}/fr/solutions`,
      },
    },
  };
}

export default async function SolutionsPage({
  params,
}: SolutionsPageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  const t = await getTranslations('personas');
  const tNav = await getTranslations('nav');

  const personas = getAllPersonas();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tNav('home'), url: `${BASE_URL}/${locale}` },
    { name: t('breadcrumbLabel') },
  ]);

  const itemListSchema = generateMarketItemListSchema(
    personas.map((persona) => ({
      name: t(`${persona.slug}.hero.title`),
      url: `${BASE_URL}/${locale}/solutions/${persona.slug}`,
    })),
    t('breadcrumbLabel'),
  );

  const pageSchema = combineSchemas(breadcrumbSchema, itemListSchema);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-secondary to-primary/20 py-16 lg:py-24">
        <Container>
          <Breadcrumb
            items={[
              { label: tNav('home'), href: '/' },
              { label: t('breadcrumbLabel') },
            ]}
            variant="light"
          />
          <div className="mt-8 max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              {t('index.title')}
            </h1>
            <p className="text-lg text-white/80">
              {t('index.subtitle')}
            </p>
            <p className="mt-4 text-sm font-medium text-accent">
              {t('index.count', { count: personas.length })}
            </p>
          </div>
        </Container>
      </section>

      {/* Persona Cards */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {personas.map((persona) => {
              const Icon = PERSONA_ICONS[persona.icon] ?? Building2;
              return (
                <Link
                  key={persona.slug}
                  href={`/solutions/${persona.slug}`}
                  className="group flex flex-col rounded-xl border border-border bg-white p-6 transition-all hover:border-primary hover:shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${persona.color}`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        {t(`${persona.slug}.hero.eyebrow`)}
                      </p>
                      <p className="mt-1 font-semibold text-secondary group-hover:text-primary">
                        {t(`${persona.slug}.hero.title`)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`${persona.slug}.hero.subtitle`)}
                  </p>
                  <div className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-primary">
                    {t('index.learnMore')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
