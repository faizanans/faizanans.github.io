import { useReveal } from './lib/motion';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Expertise } from './components/Expertise';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
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
        <Expertise />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
