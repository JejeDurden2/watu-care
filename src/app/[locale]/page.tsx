import {
  Hero,
  Mission,
  Stats,
  Categories,
  Featured,
  HowItWorks,
  CTA,
} from '@/components/sections';

export default function Home(): React.ReactElement {
  return (
    <main>
      <Hero />
      <Stats />
      <Mission />
      <Categories />
      <Featured />
      <HowItWorks />
      <CTA />
    </main>
  );
}
