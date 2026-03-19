import { Container } from '@/components/ui';

export default function AboutLoading(): React.ReactElement {
  return (
    <main>
      {/* Hero skeleton */}
      <section className="gradient-hero py-24 lg:py-32">
        <Container>
          <div className="animate-pulse">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.65fr] lg:gap-20">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-white/20" />
                  <div className="h-3 w-20 rounded bg-white/20" />
                </div>
                <div className="h-14 w-full max-w-md rounded bg-white/20" />
                <div className="h-6 w-full max-w-lg rounded bg-white/10" />
                <div className="flex gap-4 pt-4">
                  <div className="h-12 w-36 rounded-lg bg-white/20" />
                  <div className="h-12 w-36 rounded-lg bg-white/10" />
                </div>
              </div>
              <div className="hidden space-y-0 divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 lg:block">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="px-8 py-8">
                    <div className="h-14 w-24 rounded bg-white/20" />
                    <div className="mt-2 h-3 w-32 rounded bg-white/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Story skeleton */}
      <section className="animate-pulse py-20 lg:py-32">
        <Container>
          <div className="mx-auto max-w-3xl space-y-5">
            <div className="h-5 w-full rounded bg-muted" />
            <div className="h-5 w-full rounded bg-muted" />
            <div className="h-5 w-4/5 rounded bg-muted" />
            <div className="h-5 w-full rounded bg-muted" />
            <div className="h-5 w-3/4 rounded bg-muted" />
          </div>
        </Container>
      </section>

      {/* Values skeleton */}
      <section className="animate-pulse py-20 lg:py-28">
        <Container>
          <div className="mb-14">
            <div className="mb-5 h-px w-16 bg-muted" />
            <div className="h-10 w-48 rounded bg-muted" />
            <div className="mt-4 h-5 w-full max-w-md rounded bg-muted" />
          </div>
          <div className="divide-y divide-border">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-10 py-12">
                <div className="h-12 w-16 rounded bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-6 w-48 rounded bg-muted" />
                  <div className="h-4 w-full max-w-lg rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
