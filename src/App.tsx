import { useReveal } from './lib/motion';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { Approach } from './components/Approach';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact, Footer } from './components/Contact';

export default function App() {
  const main = useReveal<HTMLElement>();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Nav />
      <Hero />

      <main id="main" ref={main}>
        <div className="container">
          <Capabilities />
          <Approach />
          <Projects />
          <Experience />
          <Skills />
        </div>
        <Contact />
      </main>

      <Footer />
    </>
  );
}
