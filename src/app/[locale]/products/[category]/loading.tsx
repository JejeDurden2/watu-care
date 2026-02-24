import { Container } from '@/components/ui';

export default function CategoryLoading(): React.ReactElement {
  return (
    <main className="animate-pulse py-16">
      <Container>
        {/* Breadcrumb skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-4 w-14 rounded bg-muted" />
          <div className="h-4 w-3 rounded bg-muted" />
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-4 w-3 rounded bg-muted" />
          <div className="h-4 w-28 rounded bg-muted" />
        </div>

        {/* Category header skeleton */}
        <div className="mb-12">
          <div className="mb-4 h-16 w-16 rounded-lg bg-muted" />
          <div className="mb-4 h-10 w-72 rounded bg-muted" />
          <div className="h-5 w-full max-w-xl rounded bg-muted" />
          <div className="mt-2 h-5 w-2/3 max-w-lg rounded bg-muted" />
          <div className="mt-4 h-4 w-36 rounded bg-muted" />
        </div>

        {/* Product grid skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-white"
            >
              <div className="h-36 bg-muted" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
