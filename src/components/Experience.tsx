import { education, roles } from '../data/profile';
import { Section } from './Section';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <Section id="experience" label="Experience" title="Where I have done it">
      <ol className={styles.list}>
        {roles.map((role) => (
          <li className={`reveal ${styles.role}`} key={`${role.org}-${role.title}`}>
            <span
              className={`${styles.node} ${role.current ? styles.currentNode : ''}`}
              aria-hidden="true"
            />

            <div className={styles.meta}>
              <span>
                {role.start} — {role.end}
              </span>
              <span>·</span>
              <span>{role.location}</span>
              {role.current && <span className={styles.badge}>Current</span>}
            </div>

            <h3 className={styles.title}>
              {role.title} <span className={styles.org}>· {role.org}</span>
            </h3>

            <ul className={styles.bullets}>
              {role.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <ul className={styles.stack}>
              {role.stack.map((tech) => (
                <li className={styles.chip} key={tech}>
                  {tech}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className={`reveal ${styles.education}`}>
        <p>
          <span className={styles.degree}>{education.degree}</span>{' '}
          <span className={styles.school}>· {education.school}</span>
        </p>
        <span className={styles.when}>
          {education.start} — {education.end} · {education.location}
        </span>
      </div>
    </Section>
  );
}
