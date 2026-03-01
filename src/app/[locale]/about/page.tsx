import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Globe, Users, Shield, Truck, Headphones, Heart } from 'lucide-react';
import { Container, Button } from '@/components/ui';
import { Link } from '@/i18n/routing';
import {
  generateAboutPageSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from '@/lib/schema';
import { BASE_URL } from '@/lib/constants';

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const title = t('meta.title');
  const description = t('meta.description');

  return {
    title,
    description,
    keywords: [
      'Watu Care',
      'medical supplies company',
      'B2B healthcare',
      'medical supply distributor',
      'Africa healthcare partner',
      'Middle East medical supplies',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/about`,
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'About Watu Care',
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        'x-default': `${BASE_URL}/en/about`,
        en: `${BASE_URL}/en/about`,
        fr: `${BASE_URL}/fr/about`,
      },
    },
  };
}

export default async function AboutPage({
  params,
}: AboutPageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  const t = await getTranslations('about');
  const tMission = await getTranslations('mission');

  const pageSchema = combineSchemas(
    generateAboutPageSchema(locale),
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE_URL}/${locale}` },
      { name: t('meta.title') },
    ]),
  );

  const values = [
    {
      icon: Shield,
      title: t('values.quality'),
      description: t('values.qualityDesc'),
    },
    {
      icon: Truck,
      title: t('values.reliability'),
      description: t('values.reliabilityDesc'),
    },
    {
      icon: Headphones,
      title: t('values.support'),
      description: t('values.supportDesc'),
    },
  ];

  return (
    <main>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* ── Hero: Split Screen ──────────────────────────────────────────── */}
      <section className="gradient-hero relative overflow-hidden lg:flex lg:min-h-[100dvh] lg:items-center">
        {/* Ambient layers */}
        <div className="pointer-events-none absolute inset-0">
          <div className="pattern-dots-light absolute inset-0" />
          <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]" />
          <div className="absolute -bottom-20 left-1/3 h-[300px] w-[300px] rounded-full bg-accent/8 blur-[100px]" />
        </div>

        <Container className="relative z-10 py-24 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.65fr] lg:gap-20">

            {/* Left — text block */}
            <div>
              <div className="stagger-item stagger-delay-1 mb-6 flex items-center gap-3">
                <div className="h-px w-12 bg-accent" />
                <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {t('ourStory')}
                </span>
              </div>

              <h1 className="stagger-item stagger-delay-2 font-display text-5xl font-bold leading-[0.95] tracking-tighter text-white md:text-6xl lg:text-7xl">
                {t('hero.title')}
              </h1>

              <p className="stagger-item stagger-delay-3 mt-6 max-w-lg font-body text-lg leading-relaxed text-white/60">
                {t('hero.subtitle')}
              </p>

              <div className="stagger-item stagger-delay-4 mt-10 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">{t('getInTouch')}</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white hover:text-secondary"
                  asChild
                >
                  <Link href="/products">{t('browseProducts')}</Link>
                </Button>
              </div>
            </div>

            {/* Right — stat block (desktop only) */}
            <div className="stagger-item stagger-delay-5 hidden lg:block">
              <div className="overflow-hidden rounded-3xl border border-white/10">
                <div className="divide-y divide-white/10">
                  <div className="bg-white/4 px-8 py-8">
                    <p className="font-display text-6xl font-bold tracking-tighter text-white">
                      {t('stats.skus')}
                    </p>
                    <p className="mt-2 font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                      {t('stats.skusLabel')}
                    </p>
                  </div>
                  <div className="px-8 py-8">
                    <p className="font-display text-6xl font-bold tracking-tighter text-accent">
                      {t('stats.countries')}
                    </p>
                    <p className="mt-2 font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                      {t('stats.countriesLabel')}
                    </p>
                  </div>
                  <div className="px-8 py-8">
                    <p className="font-display text-6xl font-bold tracking-tighter text-white">
                      {t('stats.units')}
                    </p>
                    <p className="mt-2 font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                      {t('stats.unitsLabel')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ── Story: Editorial Asymmetric ─────────────────────────────────── */}
      <section className="section-muted py-20 lg:py-32" data-animate>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_2.5fr] lg:gap-20">

            {/* Left — decorative column */}
            <div className="flex flex-col items-start">
              <span
                className="select-none font-display text-[120px] font-bold leading-none text-primary/15 lg:text-[160px]"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <div className="mt-4 hidden lg:block">
                <p
                  className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {t('ourStory')}
                </p>
              </div>
            </div>

            {/* Right — editorial text */}
            <div>
              <div className="mb-8 flex items-center gap-3">
                <div className="h-px w-10 bg-accent" />
                <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {t('whyWatu')}
                </span>
              </div>

              <p className="font-body text-lg leading-relaxed text-foreground/80">
                {tMission('story1')}
              </p>
              <p className="mt-5 font-body text-lg leading-relaxed text-foreground/80">
                {tMission('story2')}
              </p>

              <blockquote className="my-10 border-l-4 border-accent pl-6">
                <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-secondary">
                  {tMission('story5')}
                </p>
                <p className="mt-3 font-body text-base italic text-accent">
                  {tMission('story6')} {tMission('story7')}
                </p>
              </blockquote>

              <p className="font-body text-lg leading-relaxed text-foreground/80">
                {tMission('story3')}
              </p>
              <p className="mt-5 font-body text-lg leading-relaxed text-foreground/80">
                {tMission('story4')}
              </p>

              <p className="mt-8 font-display text-xl font-semibold tracking-tight text-secondary">
                {tMission('story8')}
              </p>
            </div>

          </div>
        </Container>
      </section>

      {/* ── Values: Numbered Rows ───────────────────────────────────────── */}
      <section className="bg-background py-20 lg:py-28" data-animate>
        <Container>

          {/* Section header — left aligned */}
          <div className="mb-14 max-w-xl">
            <div className="mb-5 h-px w-16 bg-accent" />
            <h2 className="font-display text-4xl font-bold tracking-tighter text-secondary lg:text-5xl">
              {t('values.title')}
            </h2>
            <p className="mt-4 font-body text-lg text-muted-foreground">
              {t('values.subtitle')}
            </p>
          </div>

          {/* Numbered rows */}
          <div className="divide-y divide-border">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group -mx-4 grid grid-cols-[64px_1fr] items-start gap-6 rounded-xl px-4 py-10 transition-colors duration-200 hover:bg-muted/50 lg:grid-cols-[80px_56px_1fr] lg:items-center lg:gap-10 lg:py-12"
              >
                {/* Number */}
                <span className="font-display text-4xl font-bold tracking-tighter text-primary/20 transition-colors duration-200 group-hover:text-primary/40 lg:text-5xl">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Icon — desktop only */}
                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/8 transition-colors duration-200 group-hover:bg-primary/15 lg:flex">
                  <value.icon className="h-7 w-7 text-primary" aria-hidden="true" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-secondary lg:text-2xl">
                    {value.title}
                  </h3>
                  <p className="mt-2 font-body text-base leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mission statement */}
          <p className="mt-14 max-w-3xl border-t border-border pt-10 font-body text-lg leading-relaxed text-muted-foreground">
            {t('values.mission')}
          </p>

        </Container>
      </section>

      {/* ── Mission Pillars: Dark, Horizontal ──────────────────────────── */}
      <section className="section-dark relative overflow-hidden py-20 lg:py-28" data-animate>
        <div className="pointer-events-none absolute inset-0">
          <div className="pattern-dots-light absolute inset-0" />
          <div className="absolute -bottom-10 left-0 h-[350px] w-[350px] rounded-full bg-accent/8 blur-[120px]" />
        </div>

        <Container className="relative">

          <div className="mb-14 flex items-center gap-4">
            <div className="h-px w-12 bg-accent" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {t('howWeWork')}
            </span>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/10">

            <div className="sm:pr-10 lg:pr-16">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <Globe className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-white lg:text-2xl">
                {tMission('asiaHub')}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/55">
                {tMission('asiaHubDesc')}
              </p>
            </div>

            <div className="sm:px-10 lg:px-16">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                <Heart className="h-6 w-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-white lg:text-2xl">
                {tMission('healthcareFocus')}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/55">
                {tMission('healthcareFocusDesc')}
              </p>
            </div>

            <div className="sm:pl-10 lg:pl-16">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <Users className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-white lg:text-2xl">
                {tMission('developingEconomies')}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/55">
                {tMission('developingEconomiesDesc')}
              </p>
            </div>

          </div>
        </Container>
      </section>
    </main>
  );
}
