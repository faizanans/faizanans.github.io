import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { profile, stats } from '../data/profile';
import { EASE, prefersReducedMotion } from '../lib/motion';
import { Icon } from './Icon';
import styles from './Hero.module.css';

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
      delay: stagger(80, { start: 80 }),
      ease: EASE,
    });

    return () => {
      animation.revert();
    };
  }, []);

  return (
    <header className={styles.hero} id="top" ref={root}>
      <div className="container">
        <p className={styles.eyebrow} data-intro>
          {profile.name} · {profile.role}
        </p>

        <h1 className={styles.headline} data-intro>
          I build backend systems that <span className={styles.accent}>move data in real time.</span>
        </h1>

        <p className={styles.summary} data-intro>
          {profile.summary}
        </p>

        <div className={styles.actions} data-intro>
          <a className="btn btn-primary" href="#contact">
            Get in touch
            <Icon name="arrowRight" size={16} nudge />
          </a>
          <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noreferrer">
            Résumé
            <Icon name="download" size={16} />
          </a>
          <span className={styles.social}>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Icon name="github" size={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" size={18} />
            </a>
          </span>
        </div>

        <dl className={styles.stats} data-intro>
          {stats.map((stat) => (
            <div className={styles.stat} key={stat.label}>
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={styles.statValue}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
