'use client';

import { useQuoteStore } from '@/lib/quote-store';
import { Button, type ButtonProps } from './Button';

interface QuoteModalButtonProps extends Omit<ButtonProps, 'onClick'> {
  children: React.ReactNode;
}

export function QuoteModalButton({ children, ...props }: QuoteModalButtonProps): React.ReactElement {
  const openModal = useQuoteStore((state) => state.openModal);

  return (
    <Button onClick={openModal} {...props}>
      {children}
    </Button>
  );
}
