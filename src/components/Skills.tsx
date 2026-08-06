import { skills } from '../data/profile';
import { useReveal } from '../hooks/useReveal';
import { SectionHeading } from './SectionHeading';
import styles from './Skills.module.css';

export function Skills() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          index="04"
          label="Toolkit"
          title="What I reach for."
          lede="The stack I've spent the most production hours with — chosen for what it does well, not for what's new."
        />

        <div className={styles.grid} ref={ref}>
          {skills.map((group) => (
            <div className={styles.group} key={group.label}>
              <h3 className={styles.label}>{group.label}</h3>
              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
