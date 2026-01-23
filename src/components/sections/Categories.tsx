import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/ui';
import { getAllCategories } from '@/lib/products';

export async function Categories(): Promise<React.ReactElement> {
  const t = await getTranslations('categories');
  const categories = getAllCategories();

  return (
    <section id="products" className="bg-muted py-20 lg:py-28">
      <Container>
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="group flex flex-col items-center rounded-xl border border-border bg-white p-6 text-center shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-md"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-7 w-7 text-primary group-hover:text-white" />
                </div>
                <h3 className="mb-1 font-semibold text-secondary">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <p className="mt-10 text-center text-muted-foreground">
          {t('customRequest')}{' '}
          <Link
            href="#quote"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            {t('customRequestLink')}
          </Link>
        </p>
      </Container>
    </section>
  );
}
