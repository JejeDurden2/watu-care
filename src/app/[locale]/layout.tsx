import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n/config';
import { Header, Footer } from '@/components/layout';
import { QuoteProvider } from '@/components/providers/QuoteProvider';
import { QuoteModal } from '@/components/quote';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateMedicalBusinessSchema,
  combineSchemas,
} from '@/lib/schema';

const BASE_URL = 'https://watu-care.com';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams(): Array<{ locale: Locale }> {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const title = t('title');
  const description = t('description');

  return {
    title: {
      default: title,
      template: `%s | Watu Care`,
    },
    description,
    keywords: [
      'medical devices',
      'PPE',
      'personal protective equipment',
      'wholesale medical supplies',
      'B2B medical',
      'healthcare equipment',
      'Africa healthcare',
      'Middle East medical supplies',
      'medical wholesale Hong Kong',
      'surgical supplies',
      'hospital equipment',
      'medical consumables',
    ],
    authors: [{ name: 'Watu Care', url: BASE_URL }],
    creator: 'Watu Care',
    publisher: 'Watu Care',
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}`,
      siteName: 'Watu Care',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'Watu Care - Medical Supplies for Africa & Middle East',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'Medical Supplies',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props): Promise<React.ReactElement> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  // Generate JSON-LD structured data using @graph for cleaner implementation
  const globalSchema = combineSchemas(
    generateOrganizationSchema(),
    generateWebSiteSchema(locale),
    generateMedicalBusinessSchema(),
  );

  return (
    <html lang={locale} className={`${spaceGrotesk.variable} ${ibmPlexSans.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <QuoteProvider>
            {/* JSON-LD Structured Data (consolidated @graph) */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(globalSchema),
              }}
            />
            <Header />
            <main>{children}</main>
            <Footer />
            <QuoteModal />
          </QuoteProvider>
        </NextIntlClientProvider>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
