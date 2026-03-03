'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, X, Search } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button, Container } from '@/components/ui';
import { QuoteListBadge } from '@/components/quote';
import { useQuoteStore } from '@/lib/quote-store';
import { MobileSearchOverlay } from '@/components/layout/SearchBar';
import { DesktopNav } from '@/components/layout/DesktopNav';
import { MobileDrawer } from '@/components/layout/MobileDrawer';
import { cn } from '@/lib/utils';

export function Header(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations('nav');
  const openModal = useQuoteStore((state) => state.openModal);

  const navLinks = [
    { href: '/products', label: t('products') },
    { href: '/suppliers', label: t('suppliers') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
    { href: '/faq', label: t('faq') },
  ];

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Scroll detection for header state (throttled via rAF)
  useEffect(() => {
    let rafId = 0;
    const handleScroll = (): void => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        rafId = 0;
      });
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

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
            <DesktopNav navLinks={navLinks} onRequestQuote={openModal} />

            {/* Mobile: Actions + Menu Button */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-secondary/70 transition-colors hover:bg-secondary/5 hover:text-secondary active:scale-[0.97]"
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
                className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-lg text-secondary/70 transition-colors hover:bg-secondary/5 hover:text-secondary active:scale-[0.97]"
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
      <MobileDrawer isOpen={isMenuOpen} navLinks={navLinks} onClose={closeMenu} />

      {/* Mobile Search Overlay */}
      <MobileSearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
