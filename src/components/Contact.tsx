import { profile } from '../data/profile';
import { Illustration } from './Illustration';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <section className={styles.contact} id="contact" data-reveal-group>
      <div className={`container ${styles.inner}`}>
        <div className="reveal">
          <h2 className={styles.title}>Let's Connect</h2>

          <div className={styles.actions}>
            <a className={styles.primary} href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className={styles.link} href={profile.resume}>
              Résumé
            </a>
            <a className={styles.link} href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className={styles.link} href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>

        <Illustration src="/illustrations/letter_ombg.svg" className={`reveal ${styles.art}`} />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <span>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </span>
        <span>
          Illustrations by{' '}
          <a href="https://undraw.co" target="_blank" rel="noreferrer">
            unDraw
          </a>{' '}
          · Motion by{' '}
          <a href="https://animejs.com" target="_blank" rel="noreferrer">
            anime.js
          </a>
        </span>
      </div>
    </footer>
  );
}
