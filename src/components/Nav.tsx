import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { navSections, profile } from '../data/profile';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useTheme } from '../hooks/useTheme';
import { Icon } from './Icon';
import styles from './Nav.module.css';

export function Nav() {
  const ids = useMemo(() => navSections.map((s) => s.id), []);
  const spied = useScrollSpy(ids);
  // A clicked link wins until the smooth scroll it started has settled, so the
  // highlight goes straight there instead of visiting every section en route.
  const [clicked, setClicked] = useState<string | null>(null);
  const active = clicked ?? spied;
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Glass pill that slides behind whichever link matches the section in view.
  const links = useRef(new Map<string, HTMLAnchorElement>());
  const placed = useRef(false);
  const [pill, setPill] = useState({ x: 0, w: 0, visible: false, animate: false });

  useLayoutEffect(() => {
    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      const el = active ? links.current.get(active) : undefined;
      if (!el) {
        // Fade out in place rather than sliding back to the start.
        setPill((p) => ({ ...p, visible: false }));
        return;
      }
      // Snap into position the first time; slide on every change after.
      setPill({ x: el.offsetLeft, w: el.offsetWidth, visible: true, animate: placed.current });
      placed.current = true;
    };

    measure();
    // Link widths shift once the web font loads, and on resize.
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => {
      cancelled = true;
      window.removeEventListener('resize', measure);
    };
  }, [active]);

  useEffect(() => {
    if (!clicked) return;
    let idle = 0;
    // Release on scrollend where supported, or once scroll events go quiet in
    // older browsers. The fallback covers clicks that never scroll at all.
    const release = () => setClicked(null);
    const onScroll = () => {
      // Scrolling has started, so the no-scroll fallback is no longer needed.
      window.clearTimeout(fallback);
      window.clearTimeout(idle);
      idle = window.setTimeout(release, 150);
    };
    const fallback = window.setTimeout(release, 400);
    window.addEventListener('scrollend', release);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(idle);
      window.clearTimeout(fallback);
      window.removeEventListener('scrollend', release);
      window.removeEventListener('scroll', onScroll);
    };
  }, [clicked]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The mobile sheet owns the screen while open: lock scroll, close on Escape
  // or when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const wide = window.matchMedia('(min-width: 880px)');
    const onWide = () => wide.matches && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav
      className={`${styles.nav} ${scrolled || open ? styles.scrolled : ''}`}
      aria-label="Primary"
    >
      <div className={`container ${styles.inner}`}>
        <a className={styles.brand} href="#top" onClick={close}>
          {/* Same drawing as public/favicon.svg, so the tab and the page match. */}
          <svg className={styles.mark} viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="#0b0b0d" />
            <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="13.25" fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="1.5" />
            <g fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 44V20h13M15 32h10" stroke="#fff" />
              <path d="M33 44l8-24 8 24M35.6 36h10.8" stroke="#6d8ff5" />
            </g>
          </svg>
          <span>{profile.name}</span>
        </a>

        <div className={styles.links}>
          <span
            className={`${styles.pill} ${pill.animate ? styles.pillAnimate : ''}`}
            style={{
              width: pill.w,
              transform: `translateX(${pill.x}px)`,
              opacity: pill.visible ? 1 : 0,
            }}
            aria-hidden="true"
          />
          {navSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`${styles.link} ${active === section.id ? styles.active : ''}`}
              aria-current={active === section.id ? 'true' : undefined}
              onClick={() => setClicked(section.id)}
              ref={(node) => {
                if (node) links.current.set(section.id, node);
                else links.current.delete(section.id);
              }}
            >
              {section.label}
            </a>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
          </button>

          <a className={`btn btn-primary ${styles.resume}`} href={profile.resume} target="_blank" rel="noreferrer">
            Résumé
            <Icon name="download" size={15} />
          </a>

          <button
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <Icon name={open ? 'close' : 'menu'} size={19} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`}
        hidden={!open}
      >
        <div className="container">
          <ul className={styles.sheetLinks}>
            {navSections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={close}
                  className={active === section.id ? styles.active : undefined}
                >
                  <span className={styles.sheetIndex}>{String(i + 1).padStart(2, '0')}</span>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.sheetFoot}>
            <a className="btn btn-primary" href={profile.resume} target="_blank" rel="noreferrer">
              Download résumé
              <Icon name="download" size={16} />
            </a>
            <div className={styles.sheetSocial}>
              <a className={styles.iconBtn} href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Icon name="github" size={17} />
              </a>
              <a className={styles.iconBtn} href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Icon name="linkedin" size={17} />
              </a>
              <a className={styles.iconBtn} href={`mailto:${profile.email}`} aria-label="Email">
                <Icon name="mail" size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
