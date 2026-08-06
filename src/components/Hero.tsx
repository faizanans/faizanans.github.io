import { headlines, profile, stats } from '../data/profile';
import { useTypewriter } from '../hooks/useTypewriter';
import { Pipeline } from './Pipeline';
import styles from './Hero.module.css';

export function Hero() {
  const { text, done } = useTypewriter(headlines);

  return (
    <section className={styles.hero} id="top">
      <div className="container">
        <div className={styles.grid}>
          <div>
            <p className={styles.status}>
              <span className={styles.statusDot} />
              {profile.role} · {profile.company} · {profile.location}
            </p>

            <h1 className={styles.name}>{profile.name}</h1>

            <p className={styles.typedLine}>
              <span className={styles.prompt}>~/build $</span>
              <span className={styles.typed}>
                {text}
                {!done && <i className={styles.caret} aria-hidden="true" />}
              </span>
            </p>

            <p className={styles.summary}>{profile.summary}</p>

            <div className={styles.actions}>
              <a className={styles.primary} href="#projects">
                View work
                <Arrow />
              </a>
              <a
                className={styles.secondary}
                href={profile.resume}
                target="_blank"
                rel="noopener"
              >
                Download résumé
              </a>
            </div>

            <div className={styles.socials}>
              <a href={profile.github} target="_blank" rel="noopener">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener">
                LinkedIn
              </a>
              <a href={`mailto:${profile.email}`}>Email</a>
            </div>
          </div>

          <figure className={styles.card}>
            <div className={styles.cardBar}>
              <span className={styles.cardDots}>
                <span />
                <span />
                <span />
              </span>
              <span className={styles.cardTitle}>systems/event-pipeline.arch</span>
            </div>
            <div className={styles.cardBody}>
              <Pipeline />
            </div>
            <figcaption className={styles.cardFoot}>
              <span>
                throughput <b>high</b>
              </span>
              <span>
                delivery <b>at-least-once</b>
              </span>
              <span>
                failure <b>handled</b>
              </span>
            </figcaption>
          </figure>
        </div>

        <dl className={styles.stats}>
          {stats.map((stat) => (
            <div className={styles.stat} key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className={styles.statValue} style={{ margin: 0 }}>
                {stat.value}
              </dd>
              <p className={styles.statLabel} aria-hidden="true">
                {stat.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
