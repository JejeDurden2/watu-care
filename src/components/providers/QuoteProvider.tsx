'use client';

import { useEffect, type ReactNode } from 'react';
import { Toaster } from 'sonner';
import { useQuoteStore } from '@/lib/quote-store';

interface QuoteProviderProps {
  children: ReactNode;
}

export function QuoteProvider({ children }: QuoteProviderProps): React.ReactElement {
  useEffect(() => {
    useQuoteStore.persist.rehydrate();
  }, []);

  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'hsl(206 50% 13%)',
            color: 'white',
            border: 'none',
          },
        }}
      />
    </>
  );
}
