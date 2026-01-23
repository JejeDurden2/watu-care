'use client';

import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ArrowLeft, ShoppingBag, CheckCircle2, ListX } from 'lucide-react';
import { useQuoteStore } from '@/lib/quote-store';
import { Button } from '@/components/ui';
import { QuoteItem } from './QuoteItem';
import { QuoteForm } from './QuoteForm';
import { Link } from '@/i18n/routing';

type ModalState = 'list' | 'form' | 'success';

export function QuoteModal(): React.ReactElement {
  const { items, isModalOpen, closeModal, showForm, setShowForm } = useQuoteStore();
  const [hydrated, setHydrated] = useState(false);
  const [modalState, setModalState] = useState<ModalState>('list');

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setModalState(showForm ? 'form' : 'list');
    }
  }, [isModalOpen, showForm]);

  const handleOpenChange = (open: boolean): void => {
    if (!open) {
      closeModal();
      // Reset state after close animation
      setTimeout(() => {
        setModalState('list');
        setShowForm(false);
      }, 200);
    }
  };

  const handleRequestQuote = (): void => {
    setModalState('form');
    setShowForm(true);
  };

  const handleBackToList = (): void => {
    setModalState('list');
    setShowForm(false);
  };

  const handleFormSuccess = (): void => {
    setModalState('success');
  };

  const handleCloseSuccess = (): void => {
    closeModal();
    setTimeout(() => {
      setModalState('list');
      setShowForm(false);
    }, 200);
  };

  if (!hydrated) {
    return <></>;
  }

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background p-6 shadow-xl data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
          {/* Close Button */}
          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </Dialog.Close>

          {/* List View */}
          {modalState === 'list' && (
            <>
              <Dialog.Title className="mb-6 pr-8 text-xl font-bold text-secondary">
                Your Product List
              </Dialog.Title>

              {items.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <ListX className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 font-medium text-secondary">
                    No products in your list
                  </h3>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Browse our catalog and add products you&apos;re interested in.
                  </p>
                  <Dialog.Close asChild>
                    <Button asChild>
                      <Link href="/products">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Browse Products
                      </Link>
                    </Button>
                  </Dialog.Close>
                </div>
              ) : (
                <>
                  <div className="mb-4 text-sm text-muted-foreground">
                    {items.length} product{items.length !== 1 ? 's' : ''} selected
                  </div>

                  <div className="mb-6 max-h-64 space-y-2 overflow-y-auto">
                    {items.map((item) => (
                      <QuoteItem key={item.productId} item={item} />
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Dialog.Close asChild>
                      <Button variant="outline" className="flex-1">
                        Continue Browsing
                      </Button>
                    </Dialog.Close>
                    <Button onClick={handleRequestQuote} className="flex-1">
                      Request a Quote
                    </Button>
                  </div>
                </>
              )}
            </>
          )}

          {/* Form View */}
          {modalState === 'form' && (
            <>
              <button
                onClick={handleBackToList}
                className="mb-4 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to list
              </button>

              <Dialog.Title className="mb-2 pr-8 text-xl font-bold text-secondary">
                Request a Quote
              </Dialog.Title>
              <p className="mb-6 text-sm text-muted-foreground">
                Fill in your details and we&apos;ll get back to you within 24-48 hours.
              </p>

              <QuoteForm onSuccess={handleFormSuccess} />
            </>
          )}

          {/* Success View */}
          {modalState === 'success' && (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <CheckCircle2 className="h-8 w-8 text-accent" />
              </div>
              <Dialog.Title className="mb-2 text-xl font-bold text-secondary">
                Request Sent!
              </Dialog.Title>
              <p className="mb-6 text-muted-foreground">
                We&apos;ll contact you within 24-48 hours.
              </p>
              <Button onClick={handleCloseSuccess}>Close</Button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
