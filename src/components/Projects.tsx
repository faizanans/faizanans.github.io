import { profile, projects, type Project } from '../data/profile';
import { useReveal } from '../hooks/useReveal';
import { SectionHeading } from './SectionHeading';
import styles from './Projects.module.css';

export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading
          index="03"
          label="Projects"
          title="Selected work outside the day job."
          lede="Smaller builds where I get to take an idea all the way from protocol choice to running interface."
        />

        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}

        <a
          className={styles.more}
          href={profile.github}
          target="_blank"
          rel="noopener"
        >
          More on GitHub <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useReveal<HTMLElement>();

  return (
    <article className={styles.card} ref={ref}>
      <div className={styles.top}>
        <div>
          <p className={styles.kicker}>Featured</p>
          <h3 className={styles.name}>{project.name}</h3>
          <p className={styles.tagline}>{project.tagline}</p>
          <ul className={styles.stack}>
            {project.stack.map((tech) => (
              <li className={styles.chip} key={tech}>
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={styles.body}>{project.body}</p>
          <ul className={styles.highlights}>
            {project.highlights.map((line) => (
              <li key={line}>
                <span className={styles.check} aria-hidden="true">
                  <Check />
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {project.video && (
        <div className={styles.media}>
          <div className={styles.mediaBar}>
            <span className={styles.mediaDots}>
              <span />
              <span />
              <span />
            </span>
            <span className={styles.mediaTitle}>
              {project.name.toLowerCase()} — demo
            </span>
          </div>
          {/* Large file: the poster stands in until the visitor presses play,
              so nothing but headers is fetched on load. */}
          <video
            controls
            muted
            playsInline
            preload="none"
            poster={project.poster}
            width={1280}
            height={644}
          >
            <source src={project.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </article>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8.5l3.2 3.2L13 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
