import { useReveal } from '../hooks/useReveal';
import styles from './SectionHeading.module.css';

interface Props {
  /** Two-digit ordinal shown before the label, e.g. "01". */
  index: string;
  label: string;
  title: string;
  lede?: string;
}

export function SectionHeading({ index, label, title, lede }: Props) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div className={styles.head} ref={ref}>
      <p className={styles.eyebrow}>
        <span className={styles.index}>{index}</span>
        <span>{label}</span>
        <span className={styles.rule} />
      </p>
      <h2 className={styles.title}>{title}</h2>
      {lede && <p className={styles.lede}>{lede}</p>}
    </div>
  );
}
