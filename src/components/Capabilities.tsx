import { capabilities } from '../data/profile';
import { Section } from './Section';
import { Illustration } from './Illustration';
import styles from './Capabilities.module.css';

const Tick = () => (
  <svg className={styles.tick} width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M2.5 6.9 5 9.4l5.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Capabilities() {
  return (
    <Section
      id="build"
      label="What I build"
      title="Four kinds of work, end to end"
      lead="From the data model to the deployment. Each of these is something I have shipped and then run in production."
    >
      <div className={styles.grid}>
        {capabilities.map((item) => (
          <article className={`reveal ${styles.card}`} key={item.title}>
            <Illustration src={item.art} className={styles.art} />
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.body}>{item.body}</p>

            <ul className={styles.deliverables}>
              {item.deliverables.map((deliverable) => (
                <li className={styles.item} key={deliverable}>
                  <Tick />
                  {deliverable}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
