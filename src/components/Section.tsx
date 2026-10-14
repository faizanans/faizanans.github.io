import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface Props {
  id: string;
  index: string;
  label: string;
  title: string;
  lead?: string;
  /** Tinted band, used to alternate rhythm down the page. */
  tinted?: boolean;
  children: ReactNode;
}

/**
 * Every section is introduced the same way, so the page reads as one document.
 * `data-reveal-group` scopes the stagger so each section animates on its own.
 */
export function Section({ id, index, label, title, lead, tinted, children }: Props) {
  return (
    <section
      className={`${styles.section} ${tinted ? styles.tinted : ''}`}
      id={id}
      aria-labelledby={`${id}-title`}
      data-reveal-group
    >
      <div className="container">
        <header className={styles.head}>
          <span className={`reveal ${styles.label}`}>
            <span className={styles.index}>{index}</span>
            {label}
          </span>
          <h2 className={`reveal ${styles.title}`} id={`${id}-title`}>
            {title}
          </h2>
          {lead && <p className={`reveal ${styles.lead}`}>{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
