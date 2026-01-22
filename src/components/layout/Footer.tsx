import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/ui';

const quickLinks = [
  { href: '#products', label: 'Products' },
  { href: '#about', label: 'About Us' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#quote', label: 'Request Quote' },
];

const productCategories = [
  'Procedure Packs & Drapes',
  'Tubes & Airway Management',
  'Dressing & Kits',
  'Medical Equipment',
];

export function Footer(): React.ReactElement {
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
              Connecting Asia&apos;s leading manufacturers with healthcare providers
              across Africa and the Middle East.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground">
              Products
            </h4>
            <ul className="space-y-2">
              {productCategories.map((category) => (
                <li key={category}>
                  <span className="text-sm text-secondary-foreground/70">
                    {category}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground">
              Contact
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
            &copy; {new Date().getFullYear()} Watu Care. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
