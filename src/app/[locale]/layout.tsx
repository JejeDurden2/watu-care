import type { Metadata } from 'next';
import Script from 'next/script';
import { Nunito, IBM_Plex_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n/config';
import { Header, Footer } from '@/components/layout';
import { QuoteProvider } from '@/components/providers/QuoteProvider';
import { ScrollAnimations } from '@/components/providers/ScrollAnimations';
import { QuoteModal } from '@/components/quote';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  combineSchemas,
} from '@/lib/schema';
import { BASE_URL } from '@/lib/constants';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
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
      'medical wholesale',
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
    generateWebSiteSchema(),
  );

  return (
    <html lang={locale} className={`${nunito.variable} ${ibmPlexSans.variable}`} suppressHydrationWarning data-scroll-behavior="smooth">
      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NNHGQDH2');`}
      </Script>
      <body className="font-sans" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NNHGQDH2"
            height="0"
            width="0"
            title="Google Tag Manager"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
            <div className="pb-24 lg:pb-0">
              {children}
            </div>
            <Footer />
            <QuoteModal />
            <ScrollAnimations />
          </QuoteProvider>
        </NextIntlClientProvider>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
