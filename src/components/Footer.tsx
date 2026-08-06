import { profile } from '../data/profile';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.fine}>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>

        <nav className={styles.links} aria-label="Elsewhere">
          <a href={profile.github} target="_blank" rel="noopener">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a href={profile.resume} target="_blank" rel="noopener">
            Résumé
          </a>
        </nav>

        <a className={styles.top} href="#top">
          <span aria-hidden="true">↑</span> Back to top
        </a>
      </div>
    </footer>
  );
}
