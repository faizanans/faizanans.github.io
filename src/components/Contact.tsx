import { profile } from '../data/profile';
import { useReveal } from '../hooks/useReveal';
import styles from './Contact.module.css';

export function Contact() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className={styles.panel} ref={ref}>
          <p className={styles.eyebrow}>Get in touch</p>
          <h2 className={styles.title}>
            Let&rsquo;s talk about
            <br />
            what you&rsquo;re building.
          </h2>
          <p className={styles.body}>
            Open to conversations about backend systems, event-driven
            architecture, and leading engineering teams.
          </p>

          <div className={styles.actions}>
            <a className={styles.primary} href={`mailto:${profile.email}`}>
              Email me
            </a>
            <a
              className={styles.secondary}
              href={profile.linkedin}
              target="_blank"
              rel="noopener"
            >
              Connect on LinkedIn
            </a>
          </div>

          <p className={styles.address}>{profile.email}</p>
        </div>
      </div>
    </section>
  );
}
