import { useEffect, useState } from 'react';
import { navSections, profile } from '../data/profile';
import { useScrollSpy } from '../hooks/useScrollSpy';
import styles from './Nav.module.css';

const sectionIds = navSections.map((s) => s.id);

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The mobile menu overlays the page; Escape is the expected way out.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const className = [
    styles.nav,
    scrolled ? styles.scrolled : '',
    open ? styles.open : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={className}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.brand} href="#top" onClick={() => setOpen(false)}>
          <span className={styles.dot} />
          {profile.name}
          <span className={styles.brandRole}>/ {profile.role}</span>
        </a>

        <nav className={styles.links} aria-label="Sections">
          {navSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`${styles.link} ${active === section.id ? styles.active : ''}`}
              aria-current={active === section.id ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {section.label}
            </a>
          ))}
          <a
            className={styles.cta}
            href={profile.resume}
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
          >
            Résumé
          </a>
        </nav>

        <button
          type="button"
          className={styles.toggle}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
