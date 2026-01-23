import {
  Hero,
  TrustBar,
  Stats,
  WhyUs,
  Categories,
  HowItWorks,
  CTA,
} from '@/components/sections';

export default function Home(): React.ReactElement {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Stats />
      <WhyUs />
      <Categories />
      <HowItWorks />
      <CTA />
    </main>
  );
}
