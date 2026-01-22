import { Heart, Globe, Users } from 'lucide-react';
import { Container } from '@/components/ui';

export function Mission(): React.ReactElement {
  return (
    <section id="about" className="bg-muted py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {/* Icon */}
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <Heart className="h-8 w-8 text-accent" />
          </div>

          {/* Title */}
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-accent">&ldquo;Watu&rdquo;</span> means{' '}
            <span className="text-secondary">People</span> in Swahili
          </h2>

          {/* Story */}
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            And that is exactly what drives us. At Watu Care, we understand that
            behind every medical supply order is a{' '}
            <strong className="text-secondary">healthcare worker striving to save lives</strong> and a{' '}
            <strong className="text-secondary">patient hoping for recovery</strong>.
          </p>

          <p className="text-lg leading-relaxed text-muted-foreground">
            Based in Hong Kong, we strategically connect Asia&apos;s leading medical
            manufacturers with healthcare providers across Africa and the Middle East,
            growing into a trusted partner for hospitals and clinics in developing economies.
          </p>

          {/* Visual Elements */}
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium text-secondary">Asia Hub</p>
              <p className="text-sm text-muted-foreground">Hong Kong headquarters</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <p className="font-medium text-secondary">Healthcare Focus</p>
              <p className="text-sm text-muted-foreground">People-first approach</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium text-secondary">Developing Economies</p>
              <p className="text-sm text-muted-foreground">Africa & Middle East</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
