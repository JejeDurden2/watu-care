import { Quote } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';

const testimonialKeys = [
  { quoteKey: 'quote1', authorKey: 'author1', roleKey: 'role1', orgKey: 'org1' },
  { quoteKey: 'quote2', authorKey: 'author2', roleKey: 'role2', orgKey: 'org2' },
  { quoteKey: 'quote3', authorKey: 'author3', roleKey: 'role3', orgKey: 'org3' },
];

export async function Testimonials(): Promise<React.ReactElement> {
  const t = await getTranslations('testimonials');

  return (
    <section className="bg-muted py-20 lg:py-28">
      <Container>
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonialKeys.map((testimonial) => (
            <div
              key={testimonial.authorKey}
              className="relative rounded-2xl border border-border bg-white p-6 shadow-soft lg:p-8"
            >
              {/* Quote Icon */}
              <Quote className="mb-4 h-8 w-8 text-accent/30" />

              {/* Quote Text */}
              <blockquote className="mb-6 leading-relaxed text-muted-foreground">
                &ldquo;{t(testimonial.quoteKey)}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-secondary">
                  {t(testimonial.authorKey)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t(testimonial.roleKey)}
                </p>
                <p className="text-sm text-accent">{t(testimonial.orgKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
