import { useEffect, useState } from 'react';
import { profile } from '../data/profile';
import { Icon } from './Icon';
import styles from './Contact.module.css';

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context or permissions): fall back to mail.
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className={styles.contact} id="contact" aria-labelledby="contact-title" data-reveal-group>
      <div className="container">
        <div className={`reveal card ${styles.panel}`}>
          <span className={styles.label}>
            <span className={styles.index}>04</span>
            Contact
          </span>
          <h2 className={styles.title} id="contact-title">
            Building something that has to stay up?
          </h2>
          <p className={styles.lead}>
            I’m open to senior and lead backend roles and to conversations about event-driven systems. The
            quickest way to reach me is email.
          </p>

          <div className={styles.email}>
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              <Icon name="mail" size={16} />
              <span className={styles.address}>{profile.email}</span>
            </a>
            <button type="button" className="btn btn-ghost" onClick={copy} aria-live="polite">
              <Icon name={copied ? 'check' : 'copy'} size={16} />
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <ul className={styles.links}>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" size={16} />
                LinkedIn
                <Icon name="arrowUpRight" size={14} className={styles.out} />
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Icon name="github" size={16} />
                GitHub
                <Icon name="arrowUpRight" size={14} className={styles.out} />
              </a>
            </li>
            <li>
              <a href={profile.resume} target="_blank" rel="noreferrer">
                <Icon name="download" size={16} />
                Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>
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
        <a href="#top" className={styles.top}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
