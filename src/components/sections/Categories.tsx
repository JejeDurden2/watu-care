import { getTranslations } from 'next-intl/server';
import { Container, QuoteModalButton } from '@/components/ui';
import { getAllCategories } from '@/lib/products';
import { CategoryCard } from './CategoryCard';

export async function Categories(): Promise<React.ReactElement> {
  const t = await getTranslations('categories');
  const tProducts = await getTranslations('products');
  const categories = getAllCategories();

  return (
    <section id="products" className="bg-muted py-20 lg:py-28" data-animate>
      <Container>
        {/* Left-aligned header with accent bar */}
        <div className="mb-14 border-l-4 border-accent pl-6 lg:mb-16">
          <h2 className="font-display text-4xl font-bold tracking-tighter text-secondary lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-3 max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              slug={category.slug}
              title={tProducts(`categories.${category.slug}.title`)}
              description={tProducts(`categories.${category.slug}.description`)}
            />
          ))}
        </div>

        {/* CTA */}
        <p className="mt-10 text-center text-muted-foreground">
          {t('customRequest')}{' '}
          <QuoteModalButton
            variant="ghost"
            size="sm"
            className="inline h-auto p-0 font-medium text-accent underline-offset-4 hover:bg-transparent hover:underline"
            analyticsLocation="categories_custom_request"
          >
            {t('customRequestLink')}
          </QuoteModalButton>
        </p>
      </Container>
    </section>
  );
}
