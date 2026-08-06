import styles from './Backdrop.module.css';

export function Backdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.bloom} />
      <div className={styles.vignette} />
      <div className={styles.grain} />
    </div>
  );
}
