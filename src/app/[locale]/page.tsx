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

const BASE_URL = 'https://watu-care.com';

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
        en: `${BASE_URL}/en`,
        fr: `${BASE_URL}/fr`,
      },
    },
  };
}

export default function Home(): React.ReactElement {
  return (
    <main>
      <Hero />
      <Categories />
      <WhyUs />
      <HowItWorks />
      <FAQ />
      <CTA />
    </main>
  );
}
