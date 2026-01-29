import {
  Hero,
  WhyUs,
  Categories,
  HowItWorks,
  CTA,
} from '@/components/sections';

export default function Home(): React.ReactElement {
  return (
    <main>
      <Hero />
      <Categories />
      <WhyUs />
      <HowItWorks />
      <CTA />
    </main>
  );
}
