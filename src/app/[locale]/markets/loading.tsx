import { Container } from '@/components/ui';

export default function MarketsLoading(): React.ReactElement {
  return (
    <main className="animate-pulse py-16">
      <Container>
        {/* Breadcrumb skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-4 w-14 rounded bg-muted" />
          <div className="h-4 w-3 rounded bg-muted" />
          <div className="h-4 w-20 rounded bg-muted" />
        </div>

        {/* Header skeleton */}
        <div className="mb-14">
          <div className="mb-5 h-px w-12 bg-muted" />
          <div className="h-12 w-80 rounded bg-muted" />
          <div className="mt-4 h-5 w-full max-w-lg rounded bg-muted" />
        </div>

        {/* Region title skeleton */}
        <div className="mb-8 h-8 w-32 rounded bg-muted" />

        {/* Country cards grid skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-white p-6"
            >
              <div className="mb-4 h-8 w-8 rounded bg-muted" />
              <div className="mb-2 h-5 w-3/4 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
            </div>
          ))}
        </div>

        {/* Second region skeleton */}
        <div className="mb-8 mt-16 h-8 w-40 rounded bg-muted" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-white p-6"
            >
              <div className="mb-4 h-8 w-8 rounded bg-muted" />
              <div className="mb-2 h-5 w-3/4 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
