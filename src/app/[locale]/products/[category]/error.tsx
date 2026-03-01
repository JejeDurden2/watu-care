'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Container, Button } from '@/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CategoryError({
  error,
  reset,
}: ErrorProps): React.ReactElement {
  const t = useTranslations('errors');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="py-24">
      <Container>
        <div className="mx-auto max-w-md">
          <h2 className="mb-2 text-2xl font-bold text-secondary">
            {t('categoryLoad')}
          </h2>
          <p className="mb-8 text-muted-foreground">
            {t('categoryLoadDesc')}
          </p>
          <Button onClick={reset}>{t('tryAgain')}</Button>
        </div>
      </Container>
    </main>
  );
}
