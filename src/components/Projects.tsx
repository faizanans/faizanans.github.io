import { projects } from '../data/profile';
import { Section } from './Section';
import { Icon } from './Icon';
import styles from './Projects.module.css';

export function Projects() {
  return (
    <Section
      id="work"
      index="03"
      label="Selected work"
      title="Something you can watch run"
      lead="Most of what I build sits behind a company login. This one does not."
    >
      {projects.map((project) => (
        <article className={`reveal card ${styles.project}`} key={project.name}>
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
            </figure>
          )}

          <div className={styles.content}>
            <span className={styles.kicker}>{project.tagline}</span>
            <h3 className={styles.name}>{project.name}</h3>
            <p className={styles.body}>{project.body}</p>

            <ul className={styles.highlights}>
              {project.highlights.map((item) => (
                <li key={item}>
                  <Icon name="check" size={16} className={styles.tick} />
                  {item}
                </li>
              ))}
            </ul>

            <ul className="chips">
              {project.stack.map((tech) => (
                <li className="chip" key={tech}>
                  {tech}
                </li>
              ))}
            </ul>

            {project.repo && (
              <a className={`btn btn-ghost ${styles.repo}`} href={project.repo} target="_blank" rel="noreferrer">
                <Icon name="github" size={15} />
                View source
                <Icon name="arrowUpRight" size={15} />
              </a>
            )}
          </div>
        </article>
      ))}
    </Section>
  );
}
