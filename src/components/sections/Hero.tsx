import Image from 'next/image';
import Link from 'next/link';
import { Button, Container } from '@/components/ui';

export function Hero(): React.ReactElement {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-medical.jpg"
          alt="Healthcare professionals"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
      </div>

      {/* Content */}
      <Container className="relative z-10 flex min-h-[90vh] flex-col justify-center py-20">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Premium Medical Devices & PPE,{' '}
            <span className="text-accent">Where It Matters Most</span>
          </h1>

          <p className="text-lg leading-relaxed text-white/80 sm:text-xl">
            Connecting Asia&apos;s leading manufacturers with healthcare providers
            across Africa and the Middle East. Quality and accessibility for those
            who need it most.
          </p>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="#quote">Request a Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary" asChild>
              <Link href="#products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
