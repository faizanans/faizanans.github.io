import { skills } from '../data/profile';
import { Section } from './Section';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      label="Toolkit"
      title="What I reach for"
      lead="The stack behind the work above, and what I use in production. It is not a list of everything I have opened once."
      tinted
    >
      <div className={styles.groups}>
        {skills.map((group) => (
          <div className={`reveal card ${styles.group}`} key={group.label}>
            <h3 className={styles.label}>{group.label}</h3>
            <ul className="chips">
              {group.items.map((item) => (
                <li className="chip" key={item}>
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
