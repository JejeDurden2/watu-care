import { FileText, Calculator, Truck } from 'lucide-react';
import { Container } from '@/components/ui';

const steps = [
  {
    icon: FileText,
    step: '01',
    title: 'Submit Your Request',
    description:
      'Tell us what you need. Share your product requirements, quantities, and delivery location through our simple quote form.',
  },
  {
    icon: Calculator,
    step: '02',
    title: 'Receive Your Quote',
    description:
      'Our team reviews your request and provides a competitive quote within 24-48 hours, including shipping and logistics details.',
  },
  {
    icon: Truck,
    step: '03',
    title: 'Get Your Products',
    description:
      'Once approved, we handle procurement, quality checks, and shipping. Track your order until it arrives at your facility.',
  },
];

export function HowItWorks(): React.ReactElement {
  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <Container>
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting premium medical supplies has never been easier. Three simple
            steps to quality healthcare equipment.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="absolute left-0 right-0 top-20 hidden h-0.5 bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            {steps.map((step, index) => (
              <div key={step.step} className="relative text-center">
                {/* Step Number Badge */}
                <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-xl font-bold text-white shadow-soft-md">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-semibold text-secondary">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {step.description}
                </p>

                {/* Arrow (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="my-6 flex justify-center lg:hidden">
                    <div className="h-8 w-0.5 bg-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
