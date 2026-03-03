import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container, Button } from '@/components/ui';
import { Link } from '@/i18n/routing';
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from '@/lib/schema';
import { BASE_URL } from '@/lib/constants';
import { FAQAccordion } from './FAQAccordion';

const FAQ_KEYS = [
  'moq',
  'delivery',
  'regions',
  'certifications',
  'payment',
  'support',
] as const;

interface FAQPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });

  const title = t('meta.title');
  const description = t('meta.description');

  return {
    title,
    description,
    keywords: [
      'Watu Care FAQ',
      'medical supplies questions',
      'wholesale medical FAQ',
      'B2B healthcare FAQ',
      'medical equipment ordering',
      'Africa medical supplies',
      'Middle East medical supplies',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/faq`,
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'Watu Care FAQ',
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/faq`,
      languages: {
        'x-default': `${BASE_URL}/en/faq`,
        en: `${BASE_URL}/en/faq`,
        fr: `${BASE_URL}/fr/faq`,
      },
    },
  };
}

export default async function FAQPage({
  params,
}: FAQPageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  const t = await getTranslations('faq');
  const tNav = await getTranslations('nav');

  const faqItems = FAQ_KEYS.map((key) => ({
    question: t(`${key}Question`),
    answer: t(`${key}Answer`),
  }));

  const pageSchema = combineSchemas(
    generateFAQSchema(faqItems),
    generateBreadcrumbSchema([
      { name: tNav('home'), url: `${BASE_URL}/${locale}` },
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

      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="pattern-dots-light absolute inset-0" />
          <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]" />
        </div>

        <Container className="relative z-10">
          <div className="mb-5 h-px w-16 bg-accent" />
          <h1 className="font-display text-4xl font-bold tracking-tighter text-white md:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-white/60">
            {t('pageSubtitle')}
          </p>
        </Container>
      </section>

      {/* FAQ List */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FAQAccordion items={faqItems} />
          </div>
        </Container>
      </section>

      {/* CTA: Still have questions? */}
      <section className="border-t border-border bg-muted/40 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tighter text-secondary">
              {t('stillHaveQuestions')}
            </h2>
            <p className="mt-4 font-body text-lg text-muted-foreground">
              {t('stillHaveQuestionsDesc')}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/contact">{t('contactUs')}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">{t('viewProducts')}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
