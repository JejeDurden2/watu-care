'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, X, ChevronRight, Globe, Search } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button, Container, LanguageSwitcher } from '@/components/ui';
import { QuoteListBadge } from '@/components/quote';
import { useQuoteStore } from '@/lib/quote-store';
import { SearchBar, MobileSearchOverlay } from '@/components/layout/SearchBar';

export function Header(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    <>
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
              <SearchBar className="w-48 xl:w-56" />
              <LanguageSwitcher />
              <QuoteListBadge />
              <Button size="sm" onClick={openModal}>
                {t('requestQuote')}
              </Button>
            </div>

            {/* Mobile: Actions + Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="inline-flex items-center justify-center rounded-lg p-2 text-secondary transition-colors hover:bg-secondary/10"
                aria-label={t('search')}
              >
                <Search className="h-5 w-5" />
              </button>
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
      </header>

      {/* Mobile Navigation Drawer - Outside header to avoid backdrop-filter containment */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
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
            className="absolute right-0 top-0 h-full w-full max-w-[300px] shadow-2xl flex flex-col bg-white"
          >
            {/* Drawer Header */}
            <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5 bg-white">
              <Image
                src="/logo.png"
                alt="Watu Care"
                width={120}
                height={35}
                className="h-8 w-auto"
              />
              <button
                type="button"
                onClick={closeMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 bg-white">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium text-gray-900 transition-all hover:bg-gray-50 active:scale-[0.98]"
                    onClick={closeMenu}
                  >
                    {link.label}
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                ))}
              </div>

              {/* Language Section */}
              <div className="mt-6 border-t border-gray-100 pt-6">
                <div className="mb-3 flex items-center gap-2 px-4 text-xs font-medium uppercase tracking-wider text-gray-400">
                  <Globe className="h-3.5 w-3.5" />
                  {t('language') || 'Language'}
                </div>
                <div className="px-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </nav>

            {/* Drawer Footer */}
            <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
              <p className="text-center text-xs text-gray-400">
                © {new Date().getFullYear()} Watu Care
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search Overlay */}
      <MobileSearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
