import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { animate, utils } from 'animejs';
import { navSections, profile } from '../data/profile';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { prefersReducedMotion } from '../lib/motion';
import styles from './Nav.module.css';

export function Nav() {
  const ids = useMemo(() => navSections.map((s) => s.id), []);
  const active = useScrollSpy(ids);
  const [scrolled, setScrolled] = useState(false);

  const links = useRef(new Map<string, HTMLAnchorElement>());
  const marker = useRef<HTMLSpanElement>(null);
  const settled = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /** Slide the underline to whichever section is in view. */
  useLayoutEffect(() => {
    const el = marker.current;
    if (!el) return;

    const target = active ? links.current.get(active) : undefined;
    if (!target) {
      utils.set(el, { opacity: 0 });
      return;
    }

    const to = {
      left: target.offsetLeft + 12,
      width: target.offsetWidth - 24,
      opacity: 1,
    };

    // Don't animate the marker into existence on first paint.
    if (!settled.current || prefersReducedMotion()) {
      settled.current = true;
      utils.set(el, to);
      return;
    }

    const animation = animate(el, { ...to, duration: 420, ease: 'out(3)' });
    return () => {
      animation.revert();
    };
  }, [active]);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.brand} href="#top">
          {profile.name}
        </a>

        <div className={styles.links}>
          <span className={styles.marker} ref={marker} aria-hidden="true" />
          {navSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`${styles.link} ${active === section.id ? styles.active : ''}`}
              aria-current={active === section.id ? 'true' : undefined}
              ref={(node) => {
                if (node) links.current.set(section.id, node);
                else links.current.delete(section.id);
              }}
            >
              {section.label}
            </a>
          ))}
        </div>

        <a className={styles.cta} href="#contact">
          Get in touch
        </a>
      </div>
    </nav>
  );
}
