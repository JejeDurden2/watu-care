import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/212662258045"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'flex h-14 w-14 items-center justify-center',
        'rounded-2xl border border-white/20',
        'bg-[#25D366]/90 backdrop-blur-md',
        'shadow-soft-md hover:shadow-soft-lg',
        'transition-all duration-200 ease-out',
        'hover:scale-105 hover:bg-[#25D366]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'group'
      )}
    >
      <MessageCircle className="h-7 w-7 text-white drop-shadow-sm" />
      <span
        className={cn(
          'absolute right-full mr-3',
          'rounded-xl border border-border/50 px-3 py-1.5',
          'bg-background/95 backdrop-blur-md',
          'text-sm font-medium text-secondary',
          'opacity-0 shadow-soft transition-all duration-200 ease-out',
          'group-hover:opacity-100',
          'whitespace-nowrap'
        )}
      >
        Chat with us
      </span>
    </a>
  );
};
