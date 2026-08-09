import { skills } from '../data/profile';
import { Section } from './Section';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <Section
      id="skills"
      label="Toolkit"
      title="What I reach for"
      lead="Used in production unless noted — this is the stack behind the work above, not a list of everything I have opened once."
    >
      <div className={styles.groups}>
        {skills.map((group) => (
          <div className={`reveal ${styles.group}`} key={group.label}>
            <span className={styles.label}>{group.label}</span>
            <ul className={styles.items}>
              {group.items.map((item) => (
                <li className={styles.chip} key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
