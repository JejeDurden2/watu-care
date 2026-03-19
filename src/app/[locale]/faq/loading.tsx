import { Container } from '@/components/ui';

export default function FAQLoading(): React.ReactElement {
  return (
    <main>
      {/* Hero skeleton */}
      <section className="gradient-hero py-20 lg:py-28">
        <Container>
          <div className="animate-pulse">
            <div className="mb-5 h-px w-16 bg-white/20" />
            <div className="h-12 w-80 rounded bg-white/20" />
            <div className="mt-4 h-5 w-full max-w-2xl rounded bg-white/10" />
          </div>
        </Container>
      </section>

      {/* FAQ list skeleton */}
      <section className="animate-pulse py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl divide-y divide-border">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="py-6">
                <div className="h-6 w-full max-w-lg rounded bg-muted" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA skeleton */}
      <section className="animate-pulse border-t border-border bg-muted/40 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <div className="mx-auto h-8 w-64 rounded bg-muted" />
            <div className="mx-auto h-5 w-full max-w-md rounded bg-muted" />
            <div className="flex justify-center gap-4 pt-4">
              <div className="h-12 w-36 rounded-lg bg-muted" />
              <div className="h-12 w-36 rounded-lg bg-muted" />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
