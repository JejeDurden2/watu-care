import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';
import { generateBreadcrumbSchema } from '@/lib/schema';

const BASE_URL = 'https://watu-care.com';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

const sectionKeys = [
  'collect',
  'use',
  'sharing',
  'cookies',
  'security',
  'contact',
] as const;

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/privacy`,
      languages: {
        en: `${BASE_URL}/en/privacy`,
        fr: `${BASE_URL}/fr/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: PrivacyPageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  const t = await getTranslations('privacy');
  const tNav = await getTranslations('nav');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tNav('home'), url: `${BASE_URL}/${locale}` },
    { name: t('title') },
  ]);

  return (
    <main className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-3xl font-bold text-secondary">
            {t('title')}
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">
            {t('lastUpdated')}
          </p>
          <p className="mb-8 text-foreground/80">{t('intro')}</p>

          <div className="space-y-8">
            {sectionKeys.map((key) => (
              <section key={key}>
                <h2 className="mb-3 text-xl font-semibold text-secondary">
                  {t(`sections.${key}.title`)}
                </h2>
                <p className="leading-relaxed text-foreground/80">
                  {t(`sections.${key}.content`)}
                </p>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
