'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button, Container, LanguageSwitcher } from '@/components/ui';
import { QuoteListBadge } from '@/components/quote';
import { useQuoteStore } from '@/lib/quote-store';
import { cn } from '@/lib/utils';

export function Header(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const openModal = useQuoteStore((state) => state.openModal);

  const navLinks = [
    { href: '#products', label: t('products') },
    { href: '#about', label: t('about') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <Container>
        <nav className="flex h-20 items-center justify-between md:h-28">
          {/* Logo - Enhanced visibility */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg transition-transform hover:scale-105"
          >
            <Image
              src="/logo.png"
              alt="Watu Care"
              width={240}
              height={70}
              className="h-16 w-auto drop-shadow-lg md:h-20"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-secondary"
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitcher />
            <QuoteListBadge />
            <Button size="sm" onClick={openModal}>
              {t('requestQuote')}
            </Button>
          </div>

          {/* Mobile: Language Switcher + Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-secondary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out lg:hidden',
            isMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-4 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <QuoteListBadge />
            <Button size="sm" className="w-full" onClick={() => { setIsMenuOpen(false); openModal(); }}>
              {t('requestQuote')}
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
