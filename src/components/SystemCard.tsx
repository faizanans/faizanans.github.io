import { Icon } from './Icon';
import styles from './SystemCard.module.css';

/**
 * A stylised view of the kind of system the hero headline describes:
 * producers → Kafka → Spring Boot consumers → Redis / Druid / MySQL.
 * Decorative, so it is hidden from assistive tech; the headline says it in words.
 */
export function SystemCard() {
  return (
    <div className={`card ${styles.card}`} aria-hidden="true">
      <div className={styles.bar}>
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.file}>event-pipeline.yml</span>
        <span className={styles.badge}>
          <span className={styles.badgeDot} />
          healthy
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.node}>
          <span className={styles.icon}>
            <Icon name="layers" size={16} />
          </span>
          <span className={styles.text}>
            <strong>Producers</strong>
            <small>services · devices · APIs</small>
          </span>
          <span className={styles.tag}>emit</span>
        </div>

        <div className={styles.link} />

        <div className={`${styles.node} ${styles.core}`}>
          <span className={styles.icon}>
            <Icon name="stream" size={16} />
          </span>
          <span className={styles.text}>
            <strong>Apache Kafka</strong>
            <small>event backbone</small>
          </span>
          <span className={styles.tag}>topics</span>
        </div>

        <div className={styles.link} style={{ animationDelay: '0.6s' }} />

        <div className={styles.node}>
          <span className={styles.icon}>
            <Icon name="server" size={16} />
          </span>
          <span className={styles.text}>
            <strong>Spring Boot services</strong>
            <small>validate · enrich · route</small>
          </span>
          <span className={styles.tag}>java</span>
        </div>

        <div className={styles.fan}>
          <i />
          <i />
          <i />
        </div>

        <div className={styles.sinks}>
          <div className={styles.sink}>
            <strong>Redis</strong>
            <small>hot state</small>
          </div>
          <div className={styles.sink}>
            <strong>Druid</strong>
            <small>analytics</small>
          </div>
          <div className={styles.sink}>
            <strong>MySQL</strong>
            <small>records</small>
          </div>
        </div>
      </div>
    </div>
  );
}
