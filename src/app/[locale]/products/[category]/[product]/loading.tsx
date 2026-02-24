import { Container } from '@/components/ui';

export default function ProductLoading(): React.ReactElement {
  return (
    <main className="animate-pulse py-16">
      <Container>
        {/* Breadcrumb skeleton */}
        <div className="mb-8 flex items-center gap-2">
          <div className="h-4 w-14 rounded bg-muted" />
          <div className="h-4 w-3 rounded bg-muted" />
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-4 w-3 rounded bg-muted" />
          <div className="h-4 w-28 rounded bg-muted" />
          <div className="h-4 w-3 rounded bg-muted" />
          <div className="h-4 w-40 rounded bg-muted" />
        </div>

        {/* Product detail skeleton */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted" />

          {/* Info */}
          <div className="flex flex-col gap-4">
            <div className="h-7 w-32 rounded bg-muted" />
            <div className="h-10 w-4/5 rounded bg-muted" />
            <div className="h-6 w-full rounded bg-muted" />
            <div className="h-6 w-3/4 rounded bg-muted" />
            <div className="mt-4 flex gap-3">
              <div className="h-12 w-40 rounded-lg bg-muted" />
              <div className="h-12 w-40 rounded-lg bg-muted" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-border" />

        {/* Specs skeleton */}
        <div className="space-y-4">
          <div className="h-7 w-48 rounded bg-muted" />
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 rounded bg-muted" />
            ))}
          </div>
        </div>

        {/* Related products skeleton */}
        <div className="mt-16">
          <div className="mb-8 h-8 w-56 rounded bg-muted" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                <div className="h-36 bg-muted" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 rounded bg-muted" />
                  <div className="h-4 w-full rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
