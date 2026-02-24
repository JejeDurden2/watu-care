import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Container, Button } from '@/components/ui';
import { Link } from '@/i18n/routing';
import {
  generateContactPageSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from '@/lib/schema';

const BASE_URL = 'https://watu-care.com';

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  const title = t('meta.title');
  const description = t('meta.description');

  return {
    title,
    description,
    keywords: [
      'contact Watu Care',
      'medical supplies quote',
      'B2B healthcare inquiry',
      'wholesale medical contact',
      'Africa medical supplier contact',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/contact`,
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'Contact Watu Care',
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        'x-default': `${BASE_URL}/en/contact`,
        en: `${BASE_URL}/en/contact`,
        fr: `${BASE_URL}/fr/contact`,
      },
    },
  };
}

export default async function ContactPage({
  params,
}: ContactPageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  const t = await getTranslations('contact');

  const pageSchema = combineSchemas(
    generateContactPageSchema(locale),
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE_URL}/${locale}` },
      { name: t('meta.title') },
    ]),
  );

  return (
    <main>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* ── Hero: Split Screen ──────────────────────────────────────────── */}
      <section className="gradient-hero relative overflow-hidden">
        {/* Ambient layers */}
        <div className="pointer-events-none absolute inset-0">
          <div className="pattern-dots-light absolute inset-0" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]" />
          <div className="absolute -bottom-20 left-1/4 h-[300px] w-[300px] rounded-full bg-accent/8 blur-[100px]" />
        </div>

        <Container className="relative z-10">
          <div className="grid min-h-[90dvh] items-center lg:grid-cols-2">

            {/* Left — text block */}
            <div className="py-24 lg:py-32 lg:pr-16">
              <div className="stagger-item stagger-delay-1 mb-5 flex items-center gap-3">
                <div className="h-px w-12 bg-accent" />
                <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Watu Care
                </span>
              </div>

              <h1 className="stagger-item stagger-delay-2 font-display text-5xl font-bold leading-[0.95] tracking-tighter text-white md:text-6xl lg:text-7xl">
                {t('hero.title')}
              </h1>

              <p className="stagger-item stagger-delay-3 mt-6 max-w-md font-body text-lg leading-relaxed text-white/60">
                {t('description')}
              </p>
            </div>

            {/* Right — contact rows */}
            <div className="stagger-item stagger-delay-4 border-t border-white/10 pb-16 pt-8 lg:border-l lg:border-t-0 lg:py-32 lg:pl-16">
              <div className="divide-y divide-white/10">

                <div className="flex items-center gap-5 py-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/8">
                    <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                      {t('info.location')}
                    </p>
                    <p className="mt-0.5 font-body text-lg font-medium text-white">
                      Hong Kong SAR
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 py-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/8">
                    <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                      {t('info.email')}
                    </p>
                    <a
                      href="mailto:contact@watu-care.com"
                      className="mt-0.5 block font-body text-lg font-medium text-white transition-colors hover:text-primary"
                    >
                      contact@watu-care.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-5 py-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/8">
                    <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                      {t('info.phone')}
                    </p>
                    <a
                      href="tel:+212662258045"
                      className="mt-0.5 block font-body text-lg font-medium text-white transition-colors hover:text-primary"
                    >
                      +212 662 258 045
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-5 py-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/8">
                    <Clock className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                      {t('info.hours')}
                    </p>
                    <p className="mt-0.5 font-body text-base text-white/70">
                      {t('info.hoursValue')}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ── CTA Strip: Full-Width Dark ───────────────────────────────────── */}
      <section className="overflow-hidden bg-secondary" aria-label="Contact call to action">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] lg:min-h-[380px]">

          {/* Left — primary CTA */}
          <div className="relative flex flex-col justify-center overflow-hidden px-8 py-16 lg:px-16 lg:py-20">
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-[300px] w-[300px] rounded-full bg-primary/15 blur-[100px]" />
            <div className="relative">
              <div className="mb-5 h-px w-12 bg-accent" />
              <h2 className="font-display text-3xl font-bold italic leading-tight tracking-tighter text-white lg:text-4xl">
                {t('cta.title')}
              </h2>
              <p className="mt-4 max-w-md font-body text-base leading-relaxed text-white/60">
                {t('cta.description')}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className="bg-white text-secondary hover:bg-white/90"
                  asChild
                >
                  <a href="mailto:contact@watu-care.com">
                    <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                    {t('cta.emailButton')}
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/products">{t('cta.productsButton')}</Link>
                </Button>
              </div>
              <p className="mt-6 font-body text-sm text-white/35">
                {t('cta.response')}
              </p>
            </div>
          </div>

          {/* Right — trust stats */}
          <div className="relative flex flex-col justify-center bg-white/5 px-8 py-16 lg:px-16 lg:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
              aria-hidden="true"
            />
            <div className="relative space-y-10">
              <div className="border-l-2 border-accent/40 pl-5">
                <p className="font-display text-4xl font-bold tracking-tighter text-white">
                  ISO
                </p>
                <p className="mt-1 font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                  Certified products
                </p>
              </div>
              <div className="border-l-2 border-accent/40 pl-5">
                <p className="font-display text-4xl font-bold tracking-tighter text-white">
                  48h
                </p>
                <p className="mt-1 font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                  Response time
                </p>
              </div>
              <div className="border-l-2 border-accent/40 pl-5">
                <p className="font-display text-4xl font-bold tracking-tighter text-white">
                  30+
                </p>
                <p className="mt-1 font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                  Countries served
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
