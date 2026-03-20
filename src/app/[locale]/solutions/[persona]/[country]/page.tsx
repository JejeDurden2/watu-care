import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import {
  Building2,
  Stethoscope,
  Heart,
  Pill,
  Landmark,
  CheckCircle,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container, Button, QuoteModalButton } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { PseoHeroBackground, PseoHeroPulse, PseoHealthcareContext } from '@/components/sections';
import { getPersonaBySlug } from '@/data/personas';
import { getCategoryBySlug } from '@/lib/products';
import { getTier1Countries, getCountryBySlug } from '@/data/countries';
import { Breadcrumb } from '@/components/products';
import {
  generateBreadcrumbSchema,
  generatePersonaCountryServiceSchema,
  generateFAQSchema,
  combineSchemas,
} from '@/lib/schema';
import { FAQAccordion } from '@/app/[locale]/faq/FAQAccordion';
import { BASE_URL } from '@/lib/constants';

/** Personas that have country-specific pages */
const COUNTRY_PAGE_PERSONAS = ['ngos', 'government'] as const;

const PERSONA_ICONS: Record<string, LucideIcon> = {
  Building2,
  Stethoscope,
  Heart,
  Pill,
  Landmark,
};

interface PersonaCountryPageProps {
  params: Promise<{ locale: string; persona: string; country: string }>;
}

export async function generateStaticParams(): Promise<
  Array<{ locale: string; persona: string; country: string }>
> {
  const { locales } = await import('@/i18n/config');
  const tier1Countries = getTier1Countries();

  return locales.flatMap((locale) =>
    COUNTRY_PAGE_PERSONAS.flatMap((persona) =>
      tier1Countries.map((country) => ({
        locale,
        persona,
        country: country.slug,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: PersonaCountryPageProps): Promise<Metadata> {
  const { locale, persona: personaSlug, country: countrySlug } = await params;
  const persona = getPersonaBySlug(personaSlug);
  const country = getCountryBySlug(countrySlug);

  if (!persona || !country || country.tier !== 1) {
    return { title: 'Not Found' };
  }

  const t = await getTranslations({ locale, namespace: 'personas' });
  const tMarkets = await getTranslations({ locale, namespace: 'markets' });

  const personaTitle = t(`${personaSlug}.hero.title`);
  const countryName = tMarkets.has(`countries.${countrySlug}`)
    ? tMarkets(`countries.${countrySlug}`)
    : country.name;

  const title = t('countryPage.metaTitle', {
    persona: personaTitle,
    country: countryName,
  });
  const description = t('countryPage.metaDescription', {
    persona: personaTitle,
    country: countryName,
  });

  return {
    title,
    description,
    keywords: [
      `${personaTitle} ${countryName}`,
      `medical supplies ${countryName}`,
      `${personaSlug} medical equipment ${countryName}`,
      'wholesale medical supplies',
      'B2B healthcare',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/solutions/${personaSlug}/${countrySlug}`,
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
      canonical: `${BASE_URL}/${locale}/solutions/${personaSlug}/${countrySlug}`,
      languages: {
        'x-default': `${BASE_URL}/en/solutions/${personaSlug}/${countrySlug}`,
        en: `${BASE_URL}/en/solutions/${personaSlug}/${countrySlug}`,
        fr: `${BASE_URL}/fr/solutions/${personaSlug}/${countrySlug}`,
      },
    },
  };
}

export default async function PersonaCountryPage({
  params,
}: PersonaCountryPageProps): Promise<React.ReactElement> {
  const { locale, persona: personaSlug, country: countrySlug } = await params;
  const persona = getPersonaBySlug(personaSlug);
  const country = getCountryBySlug(countrySlug);

  if (!persona || !country || country.tier !== 1) {
    notFound();
  }

  const t = await getTranslations('personas');
  const tNav = await getTranslations('nav');
  const tProducts = await getTranslations('products');
  const tMarkets = await getTranslations('markets');

  const Icon = PERSONA_ICONS[persona.icon] ?? Building2;

  const personaTitle = t(`${personaSlug}.hero.title`);
  const countryName = tMarkets.has(`countries.${countrySlug}`)
    ? tMarkets(`countries.${countrySlug}`)
    : country.name;

  // Resolve translated country data (falls back to data file)
  const healthcareContext = tMarkets.has(`countryData.${countrySlug}.healthcareContext`)
    ? tMarkets(`countryData.${countrySlug}.healthcareContext`)
    : country.healthcareContext;

  const marketHighlights: string[] | undefined = tMarkets.has(`countryData.${countrySlug}.marketHighlights`)
    ? (tMarkets.raw(`countryData.${countrySlug}.marketHighlights`) as string[])
    : country.marketHighlights;

  const keyFacilities: string[] | undefined = tMarkets.has(`countryData.${countrySlug}.keyFacilities`)
    ? (tMarkets.raw(`countryData.${countrySlug}.keyFacilities`) as string[])
    : country.keyFacilities;

  // Reuse persona pain points and how-we-help
  const painPointItems = t.raw(
    `${personaSlug}.painPoints.items`,
  ) as Array<{ title: string; description: string }>;
  const howWeHelpItems = t.raw(
    `${personaSlug}.howWeHelp.items`,
  ) as Array<{ title: string; description: string }>;

  // Resolve recommended categories
  const recommendedCategories = persona.recommendedCategories
    .map((slug) => getCategoryBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  // FAQ (reuse persona FAQ if exists)
  const faqKey = `${personaSlug}.faq`;
  const rawFaq = t.has(faqKey)
    ? (t.raw(faqKey) as Array<{ q: string; a: string }>)
    : [];
  const faqItems = rawFaq.map((item) => ({
    question: item.q,
    answer: item.a,
  }));
  const faqSchema = faqItems.length > 0 ? generateFAQSchema(faqItems) : null;

  // Schema
  const pageSchema = combineSchemas(
    generateBreadcrumbSchema([
      { name: tNav('home'), url: `${BASE_URL}/${locale}` },
      {
        name: t('breadcrumbLabel'),
        url: `${BASE_URL}/${locale}/solutions`,
      },
      {
        name: personaTitle,
        url: `${BASE_URL}/${locale}/solutions/${personaSlug}`,
      },
      { name: countryName },
    ]),
    generatePersonaCountryServiceSchema(
      personaTitle,
      countryName,
      countrySlug,
      personaSlug,
      locale,
    ),
    ...(faqSchema ? [faqSchema] : []),
  );

  return (
    <main className="min-h-[100dvh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary py-20 lg:py-28">
        <PseoHeroBackground />
        <Container className="relative z-10">
          <Breadcrumb
            variant="light"
            items={[
              { label: tNav('home'), href: '/' },
              { label: t('breadcrumbLabel'), href: '/solutions' },
              {
                label: personaTitle,
                href: `/solutions/${personaSlug}`,
              },
              { label: countryName },
            ]}
          />

          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {t(`${personaSlug}.hero.eyebrow`)}
            </span>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${persona.color}`}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/90">
                  <MapPin className="h-4 w-4" />
                  {countryName}
                </div>
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tighter text-white md:text-5xl lg:text-6xl">
                {personaTitle}{' '}
                <span className="text-accent">{countryName}</span>
              </h1>
              <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-white/70">
                {t('countryPage.heroSubtitle', {
                  persona: personaTitle.toLowerCase(),
                  country: countryName,
                })}
              </p>

              <div className="mt-6">
                <QuoteModalButton
                  size="lg"
                  className="bg-white text-secondary hover:bg-white/90"
                  analyticsLocation="persona_country_hero"
                >
                  {t(`${personaSlug}.hero.cta`)}
                </QuoteModalButton>
              </div>
            </div>

            <PseoHeroPulse />
          </div>
        </Container>
      </section>

      {/* Healthcare Context */}
      {healthcareContext && (
        <PseoHealthcareContext
          healthcareTitle={t('countryPage.healthcareTitle', { country: countryName })}
          healthcareContext={healthcareContext}
          highlightsTitle={t('countryPage.highlightsTitle', { country: countryName })}
          highlights={marketHighlights}
          facilitiesTitle={t('countryPage.facilitiesTitle', { country: countryName })}
          facilitiesSubtitle={t('countryPage.facilitiesSubtitle', { country: countryName })}
          facilities={keyFacilities}
        />
      )}

      {/* Pain Points */}
      <section className="section-muted py-20 lg:py-32" data-animate>
        <Container>
          <div className="mb-14 max-w-xl">
            <div className="mb-5 h-px w-16 bg-accent" />
            <h2 className="font-display text-4xl font-bold tracking-tighter text-secondary lg:text-5xl">
              {t(`${personaSlug}.painPoints.title`)}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {painPointItems.map((item, index) => (
              <div
                key={index}
                className="stagger-item rounded-2xl border border-border bg-white p-8"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <CheckCircle
                    className="h-5 w-5 text-primary"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-secondary">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How We Help */}
      <section
        className="section-dark relative overflow-hidden py-20 lg:py-28"
        data-animate
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="pattern-dots-light absolute inset-0" />
          <div className="absolute -bottom-10 left-0 h-[350px] w-[350px] rounded-full bg-accent/8 blur-[120px]" />
        </div>
        <Container className="relative">
          <div className="mb-14 max-w-xl">
            <div className="mb-5 h-px w-16 bg-accent" />
            <h2 className="font-display text-4xl font-bold tracking-tighter text-white lg:text-5xl">
              {t(`${personaSlug}.howWeHelp.title`)}
            </h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {howWeHelpItems.map((item, index) => (
              <div key={index} className="stagger-item">
                <div className="mb-4 font-display text-4xl font-bold tracking-tighter text-primary/30">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/55">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Recommended Categories — links to /markets/{country}/{category} */}
      <section className="py-20 lg:py-32" data-animate>
        <Container>
          <div className="mb-12 max-w-xl">
            <div className="mb-5 h-px w-16 bg-accent" />
            <h2 className="font-display text-4xl font-bold tracking-tighter text-secondary">
              {t('countryPage.categoriesTitle', { country: countryName })}
            </h2>
            <p className="mt-4 font-body text-lg text-muted-foreground">
              {t('countryPage.categoriesSubtitle', {
                persona: personaTitle.toLowerCase(),
                country: countryName,
              })}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/markets/${countrySlug}/${category.slug}`}
                className="group stagger-item flex items-center justify-between rounded-xl border border-border bg-white p-6 transition-all hover:border-primary hover:shadow-sm"
              >
                <div>
                  <p className="font-display font-semibold text-secondary group-hover:text-primary">
                    {tProducts.has(`categories.${category.slug}.title`)
                      ? tProducts(`categories.${category.slug}.title`)
                      : category.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tProducts.has(`categories.${category.slug}.description`)
                      ? tProducts(`categories.${category.slug}.description`)
                      : category.description}
                  </p>
                </div>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      {faqItems.length > 0 && (
        <section className="py-16 lg:py-24">
          <Container>
            <div className="mb-5 h-px w-16 bg-accent" />
            <h2 className="font-display text-2xl font-bold tracking-tight text-secondary">
              {t(`${personaSlug}.faqTitle`)}
            </h2>
            <div className="mt-4">
              <FAQAccordion items={faqItems} />
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-border bg-muted/40 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tighter text-secondary md:text-4xl">
              {t(`${personaSlug}.cta.title`)}
            </h2>
            <p className="mt-4 font-body text-lg text-muted-foreground">
              {t(`${personaSlug}.cta.subtitle`)}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <QuoteModalButton
                size="lg"
                analyticsLocation="persona_country_cta"
              >
                {t(`${personaSlug}.cta.primary`)}
              </QuoteModalButton>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">
                  {t(`${personaSlug}.cta.secondary`)}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
