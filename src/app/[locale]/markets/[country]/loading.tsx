import { Container } from '@/components/ui';

export default function CountryMarketLoading(): React.ReactElement {
  return (
    <main>
      {/* Hero skeleton */}
      <section className="bg-secondary py-16 lg:py-24">
        <Container>
          <div className="animate-pulse">
            <div className="mb-8 flex items-center gap-2">
              <div className="h-4 w-14 rounded bg-white/20" />
              <div className="h-4 w-3 rounded bg-white/20" />
              <div className="h-4 w-20 rounded bg-white/20" />
            </div>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="max-w-xl space-y-4">
                <div className="h-8 w-40 rounded-full bg-white/10" />
                <div className="h-14 w-full rounded bg-white/20" />
                <div className="h-14 w-4/5 rounded bg-white/20" />
                <div className="h-6 w-full max-w-md rounded bg-white/10" />
                <div className="flex gap-4 pt-2">
                  <div className="h-12 w-40 rounded-lg bg-white/20" />
                  <div className="h-12 w-36 rounded-lg bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features skeleton */}
      <section className="animate-pulse border-b border-border py-12">
        <Container>
          <dl className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-4 bg-background px-6 py-8">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-3/4 rounded bg-muted" />
                  <div className="h-4 w-full rounded bg-muted" />
                  <div className="h-4 w-5/6 rounded bg-muted" />
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Categories grid skeleton */}
      <section className="animate-pulse bg-muted/30 py-16">
        <Container>
          <div className="mb-12">
            <div className="mb-4 h-9 w-80 rounded bg-muted" />
            <div className="h-6 w-full max-w-lg rounded bg-muted" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-white p-6">
                <div className="mb-5 h-16 w-16 rounded-2xl bg-muted" />
                <div className="mb-2 h-5 w-3/4 rounded bg-muted" />
                <div className="mb-4 h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
