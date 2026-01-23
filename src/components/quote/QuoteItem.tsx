'use client';

import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useQuoteStore, type QuoteItem as QuoteItemType } from '@/lib/quote-store';

interface QuoteItemProps {
  item: QuoteItemType;
}

export function QuoteItem({ item }: QuoteItemProps): React.ReactElement {
  const { removeItem } = useQuoteStore();

  const handleRemove = (): void => {
    removeItem(item.productId);
    toast.success('Product removed from your list');
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background p-4">
      <div className="min-w-0 flex-1">
        <h4 className="truncate font-medium text-secondary">{item.productName}</h4>
        <p className="truncate text-sm text-muted-foreground">{item.categoryTitle}</p>
      </div>
      <button
        onClick={handleRemove}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-500"
        aria-label="Remove from list"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
