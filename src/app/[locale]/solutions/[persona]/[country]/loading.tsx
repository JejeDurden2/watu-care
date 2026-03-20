import { Container } from '@/components/ui';

export default function PersonaCountryLoading(): React.ReactElement {
  return (
    <main>
      {/* Hero skeleton */}
      <section className="bg-secondary py-16 lg:py-20">
        <Container>
          <div className="animate-pulse">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-4 w-14 rounded bg-white/20" />
              <div className="h-4 w-3 rounded bg-white/20" />
              <div className="h-4 w-20 rounded bg-white/20" />
              <div className="h-4 w-3 rounded bg-white/20" />
              <div className="h-4 w-28 rounded bg-white/20" />
            </div>
            <div className="max-w-3xl space-y-3">
              <div className="h-7 w-32 rounded-full bg-white/10" />
              <div className="h-12 w-full max-w-lg rounded bg-white/20" />
              <div className="h-6 w-full max-w-md rounded bg-white/10" />
              <div className="h-6 w-3/4 rounded bg-white/10" />
            </div>
          </div>
        </Container>
      </section>

      {/* Content skeleton */}
      <section className="animate-pulse py-16">
        <Container>
          <div className="mb-10">
            <div className="mb-2 h-8 w-64 rounded bg-muted" />
            <div className="h-5 w-96 rounded bg-muted" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-white p-8"
              >
                <div className="mb-4 h-10 w-10 rounded-xl bg-muted" />
                <div className="mb-2 h-5 w-3/4 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Categories skeleton */}
      <section className="animate-pulse border-t border-border bg-muted/30 py-16">
        <Container>
          <div className="mb-8 h-8 w-64 rounded bg-muted" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border bg-white p-6">
                <div className="mb-2 h-5 w-3/4 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
