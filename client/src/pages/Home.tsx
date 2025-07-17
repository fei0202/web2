import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Robots } from '../components/Robots';
import { Awards } from '../components/Awards';
import { Sponsors } from '../components/Sponsors';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Robots />
      <Awards />
      <Sponsors />
      <Contact />
      <Footer />
    </div>
  );
}
