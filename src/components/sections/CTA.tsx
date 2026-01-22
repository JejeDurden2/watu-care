import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { Button, Container } from '@/components/ui';

export function CTA(): React.ReactElement {
  return (
    <section
      id="quote"
      className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-primary/80 py-20 lg:py-28"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Icon */}
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <Mail className="h-8 w-8 text-white" />
          </div>

          {/* Heading */}
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Improve Healthcare Access?
          </h2>

          {/* Subheading */}
          <p className="mb-8 text-lg text-white/80 lg:text-xl">
            Partner with Watu Care and get competitive quotes for premium medical
            supplies. Our team is ready to help you serve your patients better.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-white text-secondary hover:bg-white/90 sm:w-auto"
              asChild
            >
              <Link href="mailto:contact@watu-care.com">
                Request a Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/10 sm:w-auto"
              asChild
            >
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>

          {/* Trust Line */}
          <p className="mt-8 text-sm text-white/60">
            Response within 24-48 hours. No commitment required.
          </p>
        </div>
      </Container>
    </section>
  );
}
