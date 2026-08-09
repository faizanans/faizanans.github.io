import { approach } from '../data/profile';
import { Section } from './Section';
import styles from './Approach.module.css';

export function Approach() {
  return (
    <Section
      id="approach"
      label="Approach"
      title="How the work actually gets done"
      lead="The habits that survive contact with production, and the reason systems I have built are still running without me in the room."
    >
      <div className={styles.grid}>
        {approach.map((item, i) => (
          <article className={`reveal ${styles.item}`} key={item.title}>
            <span className={styles.no}>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
