'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { useQuoteStore } from '@/lib/quote-store';
import { cn } from '@/lib/utils';

interface MarketQuoteButtonProps {
  variant?: 'primary' | 'white';
  size?: 'md' | 'lg';
  className?: string;
}

export function MarketQuoteButton({
  variant = 'primary',
  size = 'lg',
  className,
}: MarketQuoteButtonProps): React.ReactElement {
  const t = useTranslations('nav');
  const { openModalWithForm } = useQuoteStore();

  return (
    <Button
      size={size}
      variant="primary"
      className={cn(
        variant === 'white' && 'bg-white text-secondary hover:bg-white/90',
        className
      )}
      onClick={openModalWithForm}
    >
      {t('requestQuote')}
      <ArrowRight className="h-5 w-5" />
    </Button>
  );
}
