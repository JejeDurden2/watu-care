import { useTranslations } from 'next-intl';
import { Container, Button } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { Home, Package, Mail } from 'lucide-react';

export default function NotFound(): React.ReactElement {
  const t = useTranslations('notFound');

  return (
    <main className="flex min-h-[60vh] items-center py-20">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="mb-4 text-7xl font-bold text-primary/20">404</p>
          <h1 className="mb-4 text-3xl font-bold text-secondary">
            {t('title')}
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            {t('description')}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild>
              <Link href="/">
                <Home className="h-4 w-4" />
                {t('backHome')}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products">
                <Package className="h-4 w-4" />
                {t('viewProducts')}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">
                <Mail className="h-4 w-4" />
                {t('contactUs')}
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
