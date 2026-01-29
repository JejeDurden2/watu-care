import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Mail, MapPin, Phone } from 'lucide-react';
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

  // Generate JSON-LD schemas
  const pageSchema = combineSchemas(
    generateContactPageSchema(locale),
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE_URL}/${locale}` },
      { name: t('meta.title') },
    ]),
  );

  const contactInfo = [
    {
      icon: MapPin,
      title: t('info.location'),
      value: 'Hong Kong SAR',
    },
    {
      icon: Mail,
      title: t('info.email'),
      value: 'contact@watu-care.com',
      href: 'mailto:contact@watu-care.com',
    },
    {
      icon: Phone,
      title: t('info.phone'),
      value: '+212 662 258 045',
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

      {/* Contact Info Section */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight">
                {t('getInTouch')}
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                {t('description')}
              </p>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-secondary">{item.title}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-muted-foreground transition-colors hover:text-primary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="rounded-2xl border border-border bg-muted p-8 lg:p-12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Mail className="h-8 w-8 text-accent" />
              </div>

              <h3 className="mb-4 text-2xl font-bold text-secondary">
                {t('cta.title')}
              </h3>
              <p className="mb-6 text-muted-foreground">
                {t('cta.description')}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <a href="mailto:contact@watu-care.com">
                    {t('cta.emailButton')}
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/products">{t('cta.productsButton')}</Link>
                </Button>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                {t('cta.response')}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
