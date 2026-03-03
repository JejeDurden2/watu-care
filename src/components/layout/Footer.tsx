import Image from 'next/image';
import { Mail, MapPin, Phone, Linkedin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/ui';

const quickLinksKeys = [
  { href: '/products', key: 'products' },
  { href: '/suppliers', key: 'suppliers' },
  { href: '/about', key: 'aboutUs' },
  { href: '/contact', key: 'requestQuote' },
  { href: '/faq', key: 'faq' },
];

const productCategoryLinks = [
  { slug: 'gloves', href: '/products/gloves' },
  { slug: 'infection-prevention-ppe', href: '/products/infection-prevention-ppe' },
  { slug: 'surgical', href: '/products/surgical' },
  { slug: 'wound-care', href: '/products/wound-care' },
  { slug: 'airway-respiratory', href: '/products/airway-respiratory' },
  { slug: 'patient-care-equipment', href: '/products/patient-care-equipment' },
];

export async function Footer(): Promise<React.ReactElement> {
  const t = await getTranslations('footer');
  const tProducts = await getTranslations('products');

  return (
    <footer className="footer-accent-border bg-secondary text-secondary-foreground">
      <Container>
        {/* Main grid: brand column (wider) + 3 link columns */}
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-8 lg:py-16">

          {/* Brand Column */}
          <div className="space-y-5">
            <Image
              src="/logo.png"
              alt="Watu Care"
              width={140}
              height={40}
              className="h-10 w-auto brightness-0 invert"
              style={{ width: 'auto' }}
            />
            <p className="max-w-xs text-sm leading-relaxed text-secondary-foreground/70">
              {t('description')}
            </p>
            {/* Geographic tagline */}
            <p className="text-xs tracking-widest text-accent/60 uppercase">
              Asia &middot; Africa &middot; Middle East
            </p>
            {/* LinkedIn — integrated in brand column */}
            <div className="pt-1">
              <a
                href="https://www.linkedin.com/company/watu-care"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-secondary-foreground/50 transition-colors hover:text-primary"
                aria-label="Watu Care on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
                <span className="text-xs font-medium tracking-wide">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary-foreground/50">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2.5">
              {quickLinksKeys.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/65 transition-colors hover:text-primary"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary-foreground/50">
              {t('productsTitle')}
            </h4>
            <ul className="space-y-2.5">
              {productCategoryLinks.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={item.href}
                    className="text-sm text-secondary-foreground/65 transition-colors hover:text-primary"
                  >
                    {tProducts(`categories.${item.slug}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary-foreground/50">
              {t('contact')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent/70" />
                <span className="text-sm text-secondary-foreground/65">
                  {t('location')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent/70" />
                <a
                  href={`mailto:${t('email')}`}
                  className="text-sm text-secondary-foreground/65 transition-colors hover:text-primary"
                >
                  {t('email')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent/70" />
                <span className="text-sm text-secondary-foreground/65">
                  {t('phone')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar — single row, space-between */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-secondary-foreground/10 py-6 sm:flex-row">
          <p className="text-xs text-secondary-foreground/40">
            &copy; {new Date().getFullYear()} {t('copyright')}
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs text-secondary-foreground/35 transition-colors hover:text-secondary-foreground/65"
            >
              {t('privacy')}
            </Link>
            <Link
              href="/terms"
              className="text-xs text-secondary-foreground/35 transition-colors hover:text-secondary-foreground/65"
            >
              {t('terms')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
