'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Container, Button } from '@/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function LocaleError({
  error,
  reset,
}: ErrorProps): React.ReactElement {
  const t = useTranslations('errors');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <h2 className="mb-2 text-2xl font-bold text-secondary">
            {t('genericTitle')}
          </h2>
          <p className="mb-8 text-muted-foreground">
            {t('genericDesc')}
          </p>
          <Button onClick={reset}>{t('tryAgain')}</Button>
        </div>
      </Container>
    </section>
  );
}
