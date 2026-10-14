import { education, roles } from '../data/profile';
import { Section } from './Section';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      label="Experience"
      title="From the server room to leading the team"
      lead="A path through infrastructure and support into backend engineering, and from there to leading the engineering team."
      tinted
    >
      <ol className={styles.timeline}>
        {roles.map((role) => (
          <li className={`reveal ${styles.role}`} key={`${role.org}-${role.title}`}>
            <div className={styles.when}>
              <span className={`${styles.node} ${role.current ? styles.live : ''}`} aria-hidden="true" />
              <span className={styles.dates}>
                {role.start} – {role.end}
              </span>
              <span className={styles.place}>{role.location}</span>
            </div>

            <div className={`card ${styles.body}`}>
              <div className={styles.head}>
                <h3 className={styles.title}>{role.title}</h3>
                {role.current && <span className={styles.badge}>Current</span>}
              </div>
              <p className={styles.org}>{role.org}</p>

              <ul className={styles.bullets}>
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              <ul className="chips">
                {role.stack.map((tech) => (
                  <li className="chip" key={tech}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}

        <li className={`reveal ${styles.role}`}>
          <div className={styles.when}>
            <span className={styles.node} aria-hidden="true" />
            <span className={styles.dates}>
              {education.start} – {education.end}
            </span>
            <span className={styles.place}>{education.location}</span>
          </div>
          <div className={`card ${styles.body}`}>
            <div className={styles.head}>
              <h3 className={styles.title}>{education.degree}</h3>
              <span className={styles.badgeMuted}>Education</span>
            </div>
            <p className={styles.org}>{education.school}</p>
          </div>
        </li>
      </ol>
    </Section>
  );
}
