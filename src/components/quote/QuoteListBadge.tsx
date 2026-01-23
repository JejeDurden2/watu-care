'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';
import { useQuoteStore } from '@/lib/quote-store';

export function QuoteListBadge(): React.ReactElement {
  const { items, openModal } = useQuoteStore();
  const [hydrated, setHydrated] = useState(false);
  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setCount(items.length);
  }, [items.length]);

  // Subscribe to store changes and trigger animation
  useEffect(() => {
    if (hydrated) {
      const unsubscribe = useQuoteStore.subscribe((state, prevState) => {
        setCount(state.items.length);
        if (state.items.length > prevState.items.length) {
          setAnimate(true);
          setTimeout(() => setAnimate(false), 300);
        }
      });
      return unsubscribe;
    }
  }, [hydrated]);

  return (
    <button
      onClick={openModal}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
      aria-label={`Product list (${count} items)`}
    >
      <List className="h-5 w-5" />
      {hydrated && count > 0 && (
        <span
          className={`absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-white ${
            animate ? 'animate-bounce' : ''
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
