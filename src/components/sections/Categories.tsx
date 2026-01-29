import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/ui';
import { getAllCategories } from '@/lib/products';
import { CategoryCard } from './CategoryCard';

export async function Categories(): Promise<React.ReactElement> {
  const t = await getTranslations('categories');
  const categories = getAllCategories();

  return (
    <section id="products" className="bg-muted py-20 lg:py-28">
      <Container>
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="mb-4 text-heading-lg lg:text-display-sm">
            {t('title')}
          </h2>
          <p className="text-body-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              slug={category.slug}
              title={category.title}
              description={category.description}
            />
          ))}
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
