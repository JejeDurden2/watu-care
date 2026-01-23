import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/ui';

const quickLinksKeys = [
  { href: '/products', key: 'products' },
  { href: '/about', key: 'aboutUs' },
  { href: '/contact', key: 'requestQuote' },
];

const productCategoryKeys = [
  'procedurePacks',
  'tubesAirway',
  'dressing',
  'equipment',
];

export async function Footer(): Promise<React.ReactElement> {
  const t = await getTranslations('footer');
  const tCategories = await getTranslations('categories');

  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <Container>
        <div className="grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <Image
              src="/logo.png"
              alt="Watu Care"
              width={140}
              height={40}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-secondary-foreground/80">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2">
              {quickLinksKeys.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground">
              {t('productsTitle')}
            </h4>
            <ul className="space-y-2">
              {productCategoryKeys.map((key) => (
                <li key={key}>
                  <span className="text-sm text-secondary-foreground/70">
                    {tCategories(key)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground">
              {t('contact')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-secondary-foreground/70">
                  Hong Kong SAR
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a
                  href="mailto:contact@watu-care.com"
                  className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground"
                >
                  contact@watu-care.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-secondary-foreground/70">
                  +852 XXXX XXXX
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/10 py-6">
          <p className="text-center text-sm text-secondary-foreground/60">
            &copy; {new Date().getFullYear()} {t('copyright')}
          </p>
        </div>
      </Container>
    </footer>
  );
}
