'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n/config';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
};

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps): React.ReactElement {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(newLocale: Locale): void {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Globe className="h-4 w-4 text-muted-foreground" />
      <div className="flex rounded-lg border border-border bg-muted/50 p-0.5">
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => handleChange(l)}
            className={cn(
              'rounded-md px-2.5 py-1 text-sm font-medium transition-all',
              locale === l
                ? 'bg-white text-secondary shadow-sm'
                : 'text-muted-foreground hover:text-secondary'
            )}
          >
            {localeLabels[l]}
          </button>
        ))}
      </div>
    </div>
  );
}
