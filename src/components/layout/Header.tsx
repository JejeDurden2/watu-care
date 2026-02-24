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
import { cn } from '@/lib/utils';

export function Header(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Scroll detection for header state
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      <header
        className={cn(
          'sticky top-0 z-50 header-glass',
          isScrolled && 'header-glass-scrolled'
        )}
      >
        <Container>
          <nav
            className={cn(
              'flex items-center justify-between transition-[height] duration-300 ease-out',
              isScrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-20'
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              className="relative z-50 flex items-center gap-2 rounded-lg"
            >
              <Image
                src="/logo.png"
                alt="Watu Care"
                width={240}
                height={70}
                className={cn(
                  'h-12 w-auto drop-shadow-sm header-logo md:h-14',
                  isScrolled && 'header-logo-scrolled'
                )}
                style={{ width: 'auto' }}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center lg:flex">
              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-link-underline rounded-lg px-3 py-2 text-sm font-medium text-secondary/70 transition-colors hover:text-secondary active:scale-[0.98]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mx-4 h-5 w-px bg-border/60" aria-hidden="true" />

              <div className="flex items-center gap-3">
                <SearchBar className="w-44 xl:w-52" />
                <LanguageSwitcher />
                <QuoteListBadge />
              </div>

              <div className="ml-4">
                <Button
                  size="sm"
                  onClick={openModal}
                  className="shadow-[0_2px_12px_-3px_hsl(var(--accent)/0.4)]"
                >
                  {t('requestQuote')}
                </Button>
              </div>
            </div>

            {/* Mobile: Actions + Menu Button */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-secondary/70 transition-colors hover:bg-secondary/5 hover:text-secondary active:scale-[0.97]"
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
                className="relative z-50 inline-flex h-9 w-9 items-center justify-center rounded-lg text-secondary/70 transition-colors hover:bg-secondary/5 hover:text-secondary active:scale-[0.97]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? t('closeNavigation') : t('openNavigation')}
              >
                <span className="sr-only">{isMenuOpen ? t('closeMenu') : t('openMenu')}</span>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="absolute inset-0 bg-secondary/30 animate-backdrop-fade-in"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t('mobileNav')}
            className="absolute right-0 top-0 h-full w-full max-w-[300px] animate-slide-in-right flex flex-col bg-white/95 backdrop-blur-xl shadow-depth-lg"
          >
            {/* Drawer Header */}
            <div className="flex h-14 items-center justify-between border-b border-border/30 px-5">
              <Image
                src="/logo.png"
                alt="Watu Care"
                width={120}
                height={35}
                className="h-7 w-auto"
                style={{ width: 'auto' }}
              />
              <button
                type="button"
                onClick={closeMenu}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-secondary/60 transition-colors hover:bg-secondary/5 hover:text-secondary active:scale-[0.95]"
                aria-label={t('closeNavigation')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-3 py-5">
              <div className="space-y-0.5">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'stagger-item flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-secondary transition-all hover:bg-secondary/5 active:scale-[0.98]',
                      `stagger-delay-${index + 1}`
                    )}
                    onClick={closeMenu}
                  >
                    {link.label}
                    <ChevronRight className="h-4 w-4 text-secondary/30" />
                  </Link>
                ))}
              </div>

              {/* Language Section */}
              <div className="mt-8 border-t border-border/30 pt-6">
                <div
                  className={cn(
                    'stagger-item mb-3 flex items-center gap-2 px-4 text-xs font-medium uppercase tracking-wider text-secondary/40',
                    'stagger-delay-4'
                  )}
                >
                  <Globe className="h-3.5 w-3.5" />
                  {t('language')}
                </div>
                <div className={cn('stagger-item px-2', 'stagger-delay-5')}>
                  <LanguageSwitcher />
                </div>
              </div>
            </nav>

            {/* Drawer Footer */}
            <div className="border-t border-border/30 px-5 py-4 bg-muted/30">
              <p className="text-center text-xs text-secondary/30">
                &copy; {new Date().getFullYear()} Watu Care
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
