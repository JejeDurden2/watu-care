'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/ui';
import { useQuoteStore } from '@/lib/quote-store';
import { MobileSearchOverlay } from '@/components/layout/SearchBar';
import { DesktopNav } from '@/components/layout/DesktopNav';
import { MobileNavOverlay } from '@/components/layout/MobileNavOverlay';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import { cn } from '@/lib/utils';

export function Header(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const lastScrollYRef = useRef(0);
  const t = useTranslations('nav');
  const openModal = useQuoteStore((state) => state.openModal);

  const navLinks = [
    { href: '/products', label: t('products') },
    { href: '/markets', label: t('markets') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Scroll detection: isScrolled + scroll direction (throttled via rAF)
  useEffect(() => {
    let rafId = 0;
    const handleScroll = (): void => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 20);

        if (currentScrollY > lastScrollYRef.current + 5) {
          setScrollDirection('down');
        } else if (currentScrollY < lastScrollYRef.current - 5) {
          setScrollDirection('up');
        }

        lastScrollYRef.current = currentScrollY;
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

  // Smart header hidden on mobile when scrolling down (and not at top)
  const isSmartHidden = scrollDirection === 'down' && isScrolled;

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 header-glass header-smart',
          isScrolled && 'header-glass-scrolled',
          isSmartHidden && 'header-smart-hidden lg:transform-none'
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
                width={280}
                height={80}
                className={cn(
                  'h-16 w-auto drop-shadow-sm header-logo md:h-20',
                  isScrolled && 'header-logo-scrolled'
                )}
                style={{ width: 'auto' }}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav navLinks={navLinks} onRequestQuote={openModal} />
          </nav>
        </Container>
      </header>

      {/* Mobile Bottom Dock — fixed at bottom, thumb-friendly */}
      <MobileBottomBar
        isMenuOpen={isMenuOpen}
        onToggleMenu={toggleMenu}
        onOpenSearch={() => setIsSearchOpen(true)}
        onRequestQuote={openModal}
      />

      {/* Mobile Navigation Overlay — full-screen */}
      <MobileNavOverlay isOpen={isMenuOpen} navLinks={navLinks} onClose={closeMenu} />

      {/* Mobile Search Overlay */}
      <MobileSearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
