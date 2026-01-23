import { ShieldCheck, Globe2, Clock, Award } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui';

export async function TrustBar(): Promise<React.ReactElement> {
  const t = await getTranslations('trustBar');

  const trustItems = [
    { icon: ShieldCheck, label: t('isoCertified'), color: 'text-accent' },
    { icon: Globe2, label: t('countries'), color: 'text-primary' },
    { icon: Clock, label: t('responseTime'), color: 'text-accent' },
    { icon: Award, label: t('qualityGuaranteed'), color: 'text-primary' },
  ];

  return (
    <section className="border-b border-border/50 bg-white py-4">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm text-muted-foreground">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <item.icon className={`h-5 w-5 ${item.color}`} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
