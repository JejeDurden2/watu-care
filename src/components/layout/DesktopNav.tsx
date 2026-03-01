'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button, LanguageSwitcher } from '@/components/ui';
import { QuoteListBadge } from '@/components/quote';
import { SearchBar } from '@/components/layout/SearchBar';

interface NavLink {
  href: string;
  label: string;
}

interface DesktopNavProps {
  navLinks: NavLink[];
  onRequestQuote: () => void;
}

export function DesktopNav({ navLinks, onRequestQuote }: DesktopNavProps): React.ReactElement {
  const t = useTranslations('nav');

  return (
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
          onClick={onRequestQuote}
          className="shadow-[0_2px_12px_-3px_hsl(var(--accent)/0.4)]"
        >
          {t('requestQuote')}
        </Button>
      </div>
    </div>
  );
}
