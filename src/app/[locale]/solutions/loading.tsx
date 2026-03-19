import { Container } from '@/components/ui';

export default function SolutionsLoading(): React.ReactElement {
  return (
    <main>
      {/* Hero skeleton */}
      <section className="gradient-hero py-20 lg:py-28">
        <Container>
          <div className="animate-pulse">
            <div className="mb-5 h-px w-16 bg-white/20" />
            <div className="h-12 w-72 rounded bg-white/20" />
            <div className="mt-4 h-5 w-full max-w-xl rounded bg-white/10" />
            <div className="mt-2 h-5 w-3/4 max-w-lg rounded bg-white/10" />
          </div>
        </Container>
      </section>

      {/* Persona cards skeleton */}
      <section className="animate-pulse py-16 lg:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-white p-8"
              >
                <div className="mb-5 h-14 w-14 rounded-xl bg-muted" />
                <div className="mb-3 h-6 w-3/4 rounded bg-muted" />
                <div className="mb-2 h-4 w-full rounded bg-muted" />
                <div className="mb-6 h-4 w-5/6 rounded bg-muted" />
                <div className="h-4 w-28 rounded bg-muted" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
