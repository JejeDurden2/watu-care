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
import { getAllPersonas, getPersonaBySlug } from '@/data/personas';
import { getCategoryBySlug } from '@/lib/products';
import { getTier1Countries } from '@/data/countries';
import {
  generateBreadcrumbSchema,
  generatePersonaPageSchema,
  combineSchemas,
} from '@/lib/schema';
import { BASE_URL } from '@/lib/constants';

// Static icon lookup — avoids dynamic imports
const PERSONA_ICONS: Record<string, LucideIcon> = {
  Building2,
  Stethoscope,
  Heart,
  Pill,
  Landmark,
};

interface PersonaPageProps {
  params: Promise<{ locale: string; persona: string }>;
}

export async function generateStaticParams(): Promise<
  Array<{ locale: string; persona: string }>
> {
  const { locales } = await import('@/i18n/config');
  const personas = getAllPersonas();
  return locales.flatMap((locale) =>
    personas.map((p) => ({ locale, persona: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: PersonaPageProps): Promise<Metadata> {
  const { locale, persona: personaSlug } = await params;
  const persona = getPersonaBySlug(personaSlug);
  if (!persona) return { title: 'Not Found' };

  const t = await getTranslations({ locale, namespace: 'personas' });
  const title = t(`${personaSlug}.meta.title`);
  const description = t(`${personaSlug}.meta.description`);
  const keywordsRaw = t(`${personaSlug}.meta.keywords`);

  return {
    title,
    description,
    keywords: keywordsRaw.split(',').map((k) => k.trim()),
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/for/${personaSlug}`,
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
      canonical: `${BASE_URL}/${locale}/for/${personaSlug}`,
      languages: {
        'x-default': `${BASE_URL}/en/for/${personaSlug}`,
        en: `${BASE_URL}/en/for/${personaSlug}`,
        fr: `${BASE_URL}/fr/for/${personaSlug}`,
      },
    },
  };
}

export default async function PersonaPage({
  params,
}: PersonaPageProps): Promise<React.ReactElement> {
  const { locale, persona: personaSlug } = await params;
  const persona = getPersonaBySlug(personaSlug);
  if (!persona) notFound();

  const t = await getTranslations('personas');
  const tNav = await getTranslations('nav');
  const tProducts = await getTranslations('products');
  const tMarkets = await getTranslations('markets');

  const tier1Countries = getTier1Countries();
  const Icon = PERSONA_ICONS[persona.icon] ?? Building2;

  const title = t(`${personaSlug}.meta.title`);
  const description = t(`${personaSlug}.meta.description`);

  // Resolve recommended categories
  const recommendedCategories = persona.recommendedCategories
    .map((slug) => getCategoryBySlug(slug))
    .filter(
      (c): c is NonNullable<typeof c> => c !== undefined,
    );

  // Retrieve typed arrays from i18n
  const painPointItems = t.raw(
    `${personaSlug}.painPoints.items`,
  ) as Array<{ title: string; description: string }>;
  const howWeHelpItems = t.raw(
    `${personaSlug}.howWeHelp.items`,
  ) as Array<{ title: string; description: string }>;

  // Schema
  const pageSchema = combineSchemas(
    generateBreadcrumbSchema([
      { name: tNav('home'), url: `${BASE_URL}/${locale}` },
      {
        name: t('breadcrumbLabel'),
        url: `${BASE_URL}/${locale}/for/${personaSlug}`,
      },
      { name: t(`${personaSlug}.hero.title`) },
    ]),
    generatePersonaPageSchema(personaSlug, title, description, locale),
  );

  return (
    <main className="min-h-[100dvh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="pattern-dots-light absolute inset-0" />
          <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]" />
          <div className="absolute -bottom-20 left-1/3 h-[300px] w-[300px] rounded-full bg-accent/8 blur-[100px]" />
        </div>
        <Container className="relative z-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {t(`${personaSlug}.hero.eyebrow`)}
            </span>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            <div>
              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl ${persona.color}`}
              >
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tighter text-white md:text-5xl lg:text-6xl">
                {t(`${personaSlug}.hero.title`)}
              </h1>
              <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-white/70">
                {t(`${personaSlug}.hero.subtitle`)}
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end lg:pb-1">
              <QuoteModalButton
                size="lg"
                className="bg-white text-secondary hover:bg-white/90"
              >
                {t(`${personaSlug}.hero.cta`)}
              </QuoteModalButton>
            </div>
          </div>
        </Container>
      </section>

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

      {/* Recommended Categories */}
      <section className="py-20 lg:py-32" data-animate>
        <Container>
          <div className="mb-12 max-w-xl">
            <div className="mb-5 h-px w-16 bg-accent" />
            <h2 className="font-display text-4xl font-bold tracking-tighter text-secondary">
              {t(`${personaSlug}.categories.title`)}
            </h2>
            <p className="mt-4 font-body text-lg text-muted-foreground">
              {t(`${personaSlug}.categories.subtitle`)}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
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

      {/* Trust Stats */}
      <section className="section-muted py-16 lg:py-20" data-animate>
        <Container>
          <h2 className="mb-10 font-display text-3xl font-bold tracking-tighter text-secondary">
            {t(`${personaSlug}.trust.title`)}
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {(['1', '2', '3'] as const).map((n) => (
              <div key={n} className="stagger-item text-center">
                <p className="font-display text-5xl font-bold tracking-tighter text-primary">
                  {t(`${personaSlug}.trust.stat${n}Value`)}
                </p>
                <p className="mt-2 font-body text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {t(`${personaSlug}.trust.stat${n}Label`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Markets We Serve */}
      <section className="py-16 lg:py-24" data-animate>
        <Container>
          <div className="rounded-2xl bg-muted/50 p-8 lg:p-10">
            <h2 className="font-display text-2xl font-bold tracking-tight text-secondary">
              {t(`${personaSlug}.markets.title`)}
            </h2>
            <p className="mt-2 font-body text-base text-muted-foreground">
              {t(`${personaSlug}.markets.subtitle`)}
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {tier1Countries.map((country) => {
                const countryName = tMarkets.has(
                  `countries.${country.slug}`,
                )
                  ? tMarkets(`countries.${country.slug}`)
                  : country.name;
                return (
                  <Link
                    key={country.slug}
                    href={`/markets/${country.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-primary hover:bg-primary/5"
                  >
                    <MapPin
                      className="h-3.5 w-3.5 text-primary"
                      aria-hidden="true"
                    />
                    {countryName}
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

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
              <QuoteModalButton size="lg">
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
