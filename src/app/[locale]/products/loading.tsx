import { Container } from '@/components/ui';

export default function ProductsLoading(): React.ReactElement {
  return (
    <main className="animate-pulse py-16">
      <Container>
        {/* Header skeleton */}
        <div className="mb-16 grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-end">
          <div>
            <div className="mb-5 h-px w-12 bg-muted" />
            <div className="h-12 w-64 rounded bg-muted" />
            <div className="mt-4 h-5 w-full max-w-lg rounded bg-muted" />
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <div className="h-4 w-40 rounded bg-muted" />
            <div className="h-10 w-36 rounded-lg bg-muted" />
          </div>
        </div>

        {/* Categories grid skeleton */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-white"
            >
              <div className="h-48 bg-muted" />
              <div className="space-y-3 p-6">
                <div className="h-12 w-12 rounded-lg bg-muted" />
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
                <div className="h-4 w-24 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
