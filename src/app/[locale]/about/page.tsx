import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Heart, Globe, Users, Shield, Truck, Headphones } from 'lucide-react';
import { Container } from '@/components/ui';
import {
  generateAboutPageSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from '@/lib/schema';

const BASE_URL = 'https://watu-care.com';

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
      'Hong Kong medical distributor',
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

  // Generate JSON-LD schemas
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary via-secondary to-primary/80 py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-white/80 lg:text-xl">
              {t('hero.subtitle')}
            </p>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="bg-muted py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Heart className="h-8 w-8 text-accent" />
            </div>

            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="text-accent">&ldquo;Watu&rdquo;</span> {tMission('title')}{' '}
              <span className="text-secondary">{tMission('titleHighlight')}</span> {tMission('titleEnd')}
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              {tMission('description1')}{' '}
              <strong className="text-secondary">{tMission('highlight1')}</strong> {tMission('and')}{' '}
              <strong className="text-secondary">{tMission('highlight2')}</strong>.
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              {tMission('description2')}
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <p className="font-medium text-secondary">{tMission('asiaHub')}</p>
                <p className="text-sm text-muted-foreground">{tMission('asiaHubDesc')}</p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <p className="font-medium text-secondary">{tMission('healthcareFocus')}</p>
                <p className="text-sm text-muted-foreground">{tMission('healthcareFocusDesc')}</p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <p className="font-medium text-secondary">{tMission('developingEconomies')}</p>
                <p className="text-sm text-muted-foreground">{tMission('developingEconomiesDesc')}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t('values.title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t('values.subtitle')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-border bg-white p-8 shadow-soft transition-shadow hover:shadow-soft-md"
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-secondary">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
