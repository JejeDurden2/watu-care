'use client';

import { useQuoteStore } from '@/lib/quote-store';
import { trackCtaClick } from '@/lib/analytics';
import { Button, type ButtonProps } from './Button';

interface QuoteModalButtonProps extends Omit<ButtonProps, 'onClick'> {
  children: React.ReactNode;
  analyticsLocation?: string;
}

export function QuoteModalButton({ children, analyticsLocation, ...props }: QuoteModalButtonProps): React.ReactElement {
  const openModal = useQuoteStore((state) => state.openModal);

  const handleClick = (): void => {
    if (analyticsLocation) {
      trackCtaClick(analyticsLocation, 'request_quote');
    }
    openModal();
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}
