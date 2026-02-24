'use client';

import { useEffect } from 'react';
import { Container, Button } from '@/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CategoryError({
  error,
  reset,
}: ErrorProps): React.ReactElement {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="py-24">
      <Container>
        <div className="mx-auto max-w-md">
          <h2 className="mb-2 text-2xl font-bold text-secondary">
            Could not load this category
          </h2>
          <p className="mb-8 text-muted-foreground">
            Something went wrong while loading the product list. Please try
            again.
          </p>
          <Button onClick={reset}>Try again</Button>
        </div>
      </Container>
    </main>
  );
}
