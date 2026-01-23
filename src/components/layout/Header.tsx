'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button, Container, LanguageSwitcher } from '@/components/ui';
import { QuoteListBadge } from '@/components/quote';
import { useQuoteStore } from '@/lib/quote-store';

export function Header(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations('nav');
  const openModal = useQuoteStore((state) => state.openModal);

  const navLinks = [
    { href: '/products', label: t('products') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  // Focus trap within mobile menu
  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <Container>
        <nav className="flex h-20 items-center justify-between md:h-28">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50 flex items-center gap-2 rounded-lg transition-transform hover:scale-105"
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
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-secondary"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <QuoteListBadge />
            <Button size="sm" onClick={openModal}>
              {t('requestQuote')}
            </Button>
          </div>

          {/* Mobile: Actions + Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <QuoteListBadge />
            <Button size="sm" onClick={openModal}>
              {t('requestQuote')}
            </Button>
            <button
              ref={menuButtonRef}
              type="button"
              className="relative z-50 inline-flex items-center justify-center rounded-lg p-2 text-secondary transition-colors hover:bg-secondary/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="absolute right-0 top-0 h-full w-full max-w-xs shadow-2xl"
            style={{ backgroundColor: '#ffffff' }}
          >
            {/* Drawer Header */}
            <div
              className="flex h-20 items-center justify-between border-b border-border px-4"
              style={{ backgroundColor: '#ffffff' }}
            >
              <span className="text-sm font-medium text-muted-foreground">Menu</span>
              <button
                type="button"
                onClick={closeMenu}
                className="inline-flex items-center justify-center rounded-lg p-2 text-secondary transition-colors hover:bg-secondary/10"
                aria-label="Close navigation menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav
              className="flex flex-col gap-1 p-4"
              style={{ backgroundColor: '#ffffff' }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-3 text-base font-medium text-secondary transition-colors hover:bg-secondary/5"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-3 h-px bg-border" />

              <div className="px-4">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
