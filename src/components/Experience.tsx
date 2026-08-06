import { education, roles, type Role } from '../data/profile';
import { useReveal } from '../hooks/useReveal';
import { SectionHeading } from './SectionHeading';
import styles from './Experience.module.css';

export function Experience() {
  const eduRef = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHeading
          index="02"
          label="Experience"
          title="Nine years in, six of them backend."
          lede="From the first service I wrote to leading the team that runs them."
        />

        <ol>
          {roles.map((role, i) => (
            <RoleItem key={`${role.org}-${role.title}`} role={role} index={i} />
          ))}
        </ol>

        <div className={styles.education} ref={eduRef}>
          <p className={styles.eduLabel}>Education</p>
          <div>
            <h3 className={styles.title}>{education.degree}</h3>
            <p className={styles.org}>{education.school}</p>
            <p className={styles.when} style={{ marginTop: 8 }}>
              {education.start} — {education.end} · {education.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleItem({ role, index }: { role: Role; index: number }) {
  const ref = useReveal<HTMLLIElement>(index * 70);

  return (
    <li className={styles.item} ref={ref}>
      <p className={`${styles.when} ${role.current ? styles.whenNow : ''}`}>
        {role.start} — {role.end}
        <span className={styles.where}>{role.location}</span>
      </p>

      <div className={styles.content}>
        <span
          className={`${styles.dot} ${role.current ? styles.dotNow : ''}`}
          aria-hidden="true"
        />
        <h3 className={styles.title}>{role.title}</h3>
        <p className={styles.org}>
          {role.org}
          {role.current && <span className={styles.badge}>Current</span>}
        </p>

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
      </div>
    </li>
  );
}
