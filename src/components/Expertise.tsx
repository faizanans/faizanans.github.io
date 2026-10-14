import { approach, capabilities } from '../data/profile';
import { Section } from './Section';
import { Icon } from './Icon';
import styles from './Expertise.module.css';

export function Expertise() {
  return (
    <Section
      id="expertise"
      index="01"
      label="Expertise"
      title="Systems built to run in production"
      lead="I work from the data model to the deployment. I have shipped and operated every one of these in production."
    >
      <div className={styles.grid}>
        {capabilities.map((item) => (
          <article className={`reveal card ${styles.card}`} key={item.title}>
            <span className={styles.icon}>
              <Icon name={item.icon} size={20} />
            </span>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.body}>{item.body}</p>
            <ul className={`chips ${styles.deliverables}`}>
              {item.deliverables.map((d) => (
                <li className="chip" key={d}>
                  {d}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className={styles.approach}>
        <h3 className={`reveal ${styles.subhead}`}>How I work</h3>
        <ol className={styles.principles}>
          {approach.map((item, i) => (
            <li className={`reveal ${styles.principle}`} key={item.title}>
              <span className={styles.no}>{String(i + 1).padStart(2, '0')}</span>
              <h4 className={styles.pTitle}>{item.title}</h4>
              <p className={styles.pBody}>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
