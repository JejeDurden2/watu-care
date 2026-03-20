'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { trackNavClick, trackCtaClick } from '@/lib/analytics';
import { Linkedin } from 'lucide-react';
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
      {/* Accent divider + nav links */}
      <div className="flex items-center border-l-[3px] border-accent/50 pl-4">
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => trackNavClick(link.href, 'desktop')}
              className="nav-link-underline rounded-lg px-3 py-2 text-sm font-medium text-secondary/70 transition-colors hover:text-secondary active:scale-[0.98]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-4 h-5 w-px bg-border/60" aria-hidden="true" />

      {/* Glass pill — grouped utility actions */}
      <div className="flex items-center gap-2 rounded-2xl border border-border/40 bg-white/50 px-3 py-1.5 backdrop-blur-sm">
        <SearchBar className="w-44 xl:w-52" />
        <div className="h-4 w-px bg-border/40" aria-hidden="true" />
        <a
          href="https://www.linkedin.com/company/watu-care"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-secondary/50 transition-colors hover:text-primary"
          aria-label="Watu Care on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <LanguageSwitcher />
        <QuoteListBadge />
      </div>

      <div className="ml-4">
        <Button
          size="sm"
          onClick={() => {
            trackCtaClick('desktop_nav', 'request_quote');
            onRequestQuote();
          }}
          className="shadow-[0_2px_12px_-3px_hsl(var(--accent)/0.4)]"
        >
          {t('requestQuote')}
        </Button>
      </div>
    </div>
  );
}
