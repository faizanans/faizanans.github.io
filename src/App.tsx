import { useReveal } from './lib/motion';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Stack } from './components/Stack';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
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
        <Stack />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
