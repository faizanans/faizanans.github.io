import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { profile, stats } from '../data/profile';
import { EASE, prefersReducedMotion } from '../lib/motion';
import { Icon } from './Icon';
import { SystemCard } from './SystemCard';
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
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
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
            <a className="btn btn-primary" href="#experience">
              View experience
              <Icon name="arrowRight" size={16} nudge />
            </a>
            <a className="btn btn-ghost" href="#contact">
              Get in touch
            </a>
          </div>

          <ul className={styles.meta} data-intro>
            <li>
              <Icon name="mapPin" size={16} />
              {profile.location}
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Icon name="github" size={15} />
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" size={15} />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.visual} data-intro>
          <SystemCard />
        </div>
      </div>

      <div className="container">
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
