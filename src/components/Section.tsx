import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface Props {
  id: string;
  label: string;
  title: string;
  lead?: string;
  children: ReactNode;
}

/**
 * Every section is introduced the same way, so the page reads as one document.
 * `data-reveal-group` scopes the stagger so each section animates on its own.
 */
export function Section({ id, label, title, lead, children }: Props) {
  return (
    <section className={styles.section} id={id} data-reveal-group>
      <header className={styles.head}>
        <span className={`reveal ${styles.label}`}>{label}</span>
        <h2 className={`reveal ${styles.title}`}>{title}</h2>
        {lead && <p className={`reveal ${styles.lead}`}>{lead}</p>}
      </header>
      {children}
    </section>
  );
}
