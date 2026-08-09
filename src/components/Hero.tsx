import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { profile, stats } from '../data/profile';
import { EASE, prefersReducedMotion } from '../lib/motion';
import styles from './Hero.module.css';

const Arrow = () => (
  <svg className={styles.arrow} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  /** The opening lines rise into place on load, before any scrolling. */
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const animation = animate(el.querySelectorAll('[data-intro]'), {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 780,
      delay: stagger(85, { start: 90 }),
      ease: EASE,
    });

    return () => {
      animation.revert();
    };
  }, []);

  return (
    <header className={styles.hero} id="top" ref={root}>
      <div className="container">
        <span className={styles.eyebrow} data-intro>
          <span className={styles.pulse} aria-hidden="true" />
          {profile.role} · {profile.location}
        </span>

        <h1 className={styles.headline} data-intro>
          I build backend systems that <em>move data in real time</em>.
        </h1>

        <p className={styles.summary} data-intro>
          {profile.summary}
        </p>

        <div className={styles.actions} data-intro>
          <a className={styles.primary} href="#contact">
            Get in touch
            <Arrow />
          </a>
          <a className={styles.secondary} href="#build">
            See what I build
            <Arrow />
          </a>
        </div>

        <p className={styles.meta} data-intro>
          Currently {profile.role.toLowerCase()} at {profile.company}. Open to new work.
        </p>

        <dl className={styles.stats} data-intro>
          {stats.map((stat) => (
            <div className={styles.stat} key={stat.label}>
              <dd className={styles.statValue}>{stat.value}</dd>
              <dt className={styles.statLabel}>{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
