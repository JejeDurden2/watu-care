import { Quote } from 'lucide-react';
import { Container } from '@/components/ui';

const testimonials = [
  {
    quote:
      'Watu Care has been instrumental in helping us maintain a steady supply of quality medical equipment. Their understanding of our challenges as a growing hospital in East Africa sets them apart.',
    author: 'Dr. Amina Hassan',
    role: 'Medical Director',
    organization: 'Regional Medical Center, Kenya',
  },
  {
    quote:
      'The team at Watu Care delivers on their promises. Competitive pricing, reliable shipping, and genuine care for healthcare outcomes. They\'re more than a supplier—they\'re a partner.',
    author: 'Mohammed Al-Rashid',
    role: 'Procurement Manager',
    organization: 'Private Hospital Group, UAE',
  },
  {
    quote:
      'Finding a reliable supplier for veterinary medical supplies was challenging until we connected with Watu Care. Their range of products and responsive service have made a real difference.',
    author: 'Dr. Fatou Diallo',
    role: 'Chief Veterinary Officer',
    organization: 'Agricultural Development Agency, Senegal',
  },
];

export function Testimonials(): React.ReactElement {
  return (
    <section className="bg-muted py-20 lg:py-28">
      <Container>
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by Healthcare Providers
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from hospitals and clinics who rely on Watu Care for their medical
            supply needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="relative rounded-2xl border border-border bg-white p-6 shadow-soft lg:p-8"
            >
              {/* Quote Icon */}
              <Quote className="mb-4 h-8 w-8 text-accent/30" />

              {/* Quote Text */}
              <blockquote className="mb-6 leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-secondary">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                <p className="text-sm text-accent">{testimonial.organization}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
