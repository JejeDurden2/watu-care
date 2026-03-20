'use client';

import { Search, ClipboardList } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { QuoteListBadge } from '@/components/quote';
import { cn } from '@/lib/utils';

interface MobileBottomBarProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onOpenSearch: () => void;
  onRequestQuote: () => void;
}

export function MobileBottomBar({
  isMenuOpen,
  onToggleMenu,
  onOpenSearch,
  onRequestQuote,
}: MobileBottomBarProps): React.ReactElement | null {
  const t = useTranslations('nav');

  if (isMenuOpen) return null;

  return (
    <div className="fixed bottom-5 left-4 right-4 z-50 lg:hidden animate-slide-up-dock">
      <nav
        className="bottom-dock mx-auto flex max-w-sm items-center justify-around rounded-2xl px-2 py-2"
        aria-label={t('mobileNav')}
      >
        {/* Animated hamburger / X toggle */}
        <button
          type="button"
          onClick={onToggleMenu}
          className={cn(
            'flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-xl text-secondary/70 transition-colors hover:bg-secondary/5 hover:text-secondary active:scale-[0.95]',
            isMenuOpen && 'hamburger-open'
          )}
          aria-label={isMenuOpen ? t('closeNavigation') : t('openNavigation')}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-overlay"
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>

        {/* Search */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-secondary/70 transition-colors hover:bg-secondary/5 hover:text-secondary active:scale-[0.95]"
          aria-label={t('search')}
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Quote list badge */}
        <QuoteListBadge />

        {/* CTA pill */}
        <button
          type="button"
          onClick={onRequestQuote}
          className="flex h-9 items-center gap-1.5 rounded-xl bg-accent px-4 text-sm font-semibold text-white shadow-[0_2px_12px_-3px_hsl(var(--accent)/0.4)] transition-all hover:brightness-110 active:scale-[0.97]"
        >
          <ClipboardList className="h-3.5 w-3.5" />
          {t('quote')}
        </button>
      </nav>
    </div>
  );
}
