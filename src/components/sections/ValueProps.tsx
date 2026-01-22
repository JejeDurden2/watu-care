import { MapPin, ShieldCheck, HeartHandshake, Headphones } from 'lucide-react';
import { Container } from '@/components/ui';

const valueProps = [
  {
    icon: MapPin,
    title: 'Strategic Location',
    description:
      'Hong Kong hub connecting Asia\'s top manufacturers directly to your facility, ensuring competitive pricing and reliable supply chains.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description:
      'Premium medical devices and PPE that meet international standards. We partner only with certified manufacturers.',
  },
  {
    icon: HeartHandshake,
    title: 'Accessibility Focus',
    description:
      'Dedicated to serving developing economies with fair pricing and flexible ordering to meet the unique needs of growing healthcare systems.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description:
      'Personal account managers who understand healthcare procurement. We\'re here to support you from quote to delivery.',
  },
];

export function ValueProps(): React.ReactElement {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Why Partner with Watu Care?
          </h2>
          <p className="text-lg text-muted-foreground">
            We bridge the gap between world-class medical manufacturers and
            healthcare providers who need reliable, quality supplies.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {valueProps.map((prop) => (
            <div
              key={prop.title}
              className="group rounded-2xl border border-border bg-white p-6 shadow-soft transition-all duration-200 hover:shadow-soft-md lg:p-8"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                <prop.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-secondary">
                {prop.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
