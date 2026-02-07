import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import {
  Hero,
  WhyUs,
  Categories,
  HowItWorks,
  FAQ,
  CTA,
} from '@/components/sections';
import { generateFAQSchema } from '@/lib/schema';

const BASE_URL = 'https://watu-care.com';

const faqKeys = [
  'moq',
  'delivery',
  'regions',
  'certifications',
  'payment',
  'support',
] as const;

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const title = t('title');
  const description = t('description');

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: [
      'medical supplies Africa',
      'medical devices Middle East',
      'PPE wholesale',
      'B2B medical equipment',
      'healthcare supplies Hong Kong',
      'wholesale medical devices',
      'hospital equipment supplier',
      'medical consumables Africa',
      'surgical supplies Middle East',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}`,
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'Watu Care - Medical Supplies for Africa & Middle East',
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'x-default': `${BASE_URL}/en`,
        en: `${BASE_URL}/en`,
        fr: `${BASE_URL}/fr`,
      },
    },
  };
}

export default async function Home({
  params,
}: HomePageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });

  // Generate FAQ schema for rich snippets
  const faqSchema = generateFAQSchema(
    faqKeys.map((key) => ({
      question: t(`${key}Question`),
      answer: t(`${key}Answer`),
    })),
  );

  return (
    <main>
      {/* FAQ JSON-LD for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Hero />
      <Categories />
      <WhyUs />
      <HowItWorks />
      <FAQ />
      <CTA />
    </main>
  );
}
