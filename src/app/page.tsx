import { Header, Footer } from '@/components/layout';
import {
  Hero,
  Mission,
  Stats,
  ValueProps,
  Categories,
  Featured,
  HowItWorks,
  Testimonials,
  CTA,
} from '@/components/sections';

export default function Home(): React.ReactElement {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Mission />
        <ValueProps />
        <Categories />
        <Featured />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
