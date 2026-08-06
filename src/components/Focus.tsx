import { focus } from '../data/profile';
import { useReveal } from '../hooks/useReveal';
import { SectionHeading } from './SectionHeading';
import styles from './Focus.module.css';

export function Focus() {
  return (
    <section className="section" id="work">
      <div className="container">
        <SectionHeading
          index="01"
          label="What I do"
          title="Systems that hold up in production."
          lede="Backend work, end to end — designing the data flow, writing the service, and staying responsible for how it behaves once real traffic hits it."
        />

        <div className={styles.grid}>
          {focus.map((item, i) => (
            <FocusCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FocusCard({
  item,
  index,
}: {
  item: (typeof focus)[number];
  index: number;
}) {
  const ref = useReveal<HTMLElement>(index * 90);

  return (
    <article className={styles.card} ref={ref}>
      <span className={styles.num}>{String(index + 1).padStart(2, '0')}</span>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.body}>{item.body}</p>
      <ul className={styles.tags}>
        {item.tags.map((tag) => (
          <li className={styles.tag} key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
