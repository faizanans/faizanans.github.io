import { projects } from '../data/profile';
import { Section } from './Section';
import styles from './Projects.module.css';

export function Projects() {
  return (
    <Section
      id="work"
      label="Selected work"
      title="Something you can watch run"
      lead="Most of what I build sits behind a company login. This one does not."
    >
      {projects.map((project) => (
        <article className={`reveal ${styles.project}`} key={project.name}>
          <div>
            <h3 className={styles.name}>{project.name}</h3>
            <p className={styles.tagline}>{project.tagline}</p>
            <p className={styles.body}>{project.body}</p>

            <ul className={styles.highlights}>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <ul className={styles.stack}>
              {project.stack.map((tech) => (
                <li className={styles.chip} key={tech}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {project.video && (
            <figure className={styles.figure}>
              <video
                className={styles.media}
                src={project.video}
                poster={project.poster}
                controls
                muted
                loop
                playsInline
                preload="none"
              />
              <figcaption className={styles.caption}>Live demo · {project.name}</figcaption>
            </figure>
          )}
        </article>
      ))}
    </Section>
  );
}
