import { Backdrop } from './components/Backdrop';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Focus } from './components/Focus';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Backdrop />
      {/* Sits above the fixed backdrop layer. */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <main id="main">
          <Hero />
          <Focus />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
