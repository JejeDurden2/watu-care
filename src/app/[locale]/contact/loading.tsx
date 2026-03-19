import { Container } from '@/components/ui';

export default function ContactLoading(): React.ReactElement {
  return (
    <main>
      {/* Hero skeleton */}
      <section className="gradient-hero">
        <Container>
          <div className="animate-pulse grid min-h-[90dvh] items-center lg:grid-cols-2">
            {/* Left — text */}
            <div className="space-y-4 py-24 lg:py-32 lg:pr-16">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-white/20" />
                <div className="h-3 w-20 rounded bg-white/20" />
              </div>
              <div className="h-14 w-full max-w-sm rounded bg-white/20" />
              <div className="h-5 w-full max-w-md rounded bg-white/10" />
            </div>

            {/* Right — contact rows */}
            <div className="border-t border-white/10 pb-16 pt-8 lg:border-l lg:border-t-0 lg:py-32 lg:pl-16">
              <div className="divide-y divide-white/10">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-5 py-6">
                    <div className="h-11 w-11 shrink-0 rounded-xl bg-white/8" />
                    <div className="flex-1 space-y-1">
                      <div className="h-3 w-16 rounded bg-white/20" />
                      <div className="h-5 w-40 rounded bg-white/15" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
