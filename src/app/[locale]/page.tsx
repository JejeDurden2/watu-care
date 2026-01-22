import { Header, Footer } from '@/components/layout';
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
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Mission />
        <Categories />
        <Featured />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
