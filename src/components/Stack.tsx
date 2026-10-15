import type { CSSProperties } from 'react';
import { practices, stack } from '../data/profile';
import { Section } from './Section';
import styles from './Stack.module.css';

/** WCAG relative luminance of a 6-digit hex colour. */
function luminance(hex: string): number {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

/**
 * Brand colours shown on hover, one per theme. A colour that would wash out
 * against that theme's background (near-black on dark, pale cyan on light)
 * falls back to the text colour instead.
 */
function brandVars(hex: string): CSSProperties {
  const l = luminance(hex);
  return {
    '--brand-light': l <= 0.45 ? `#${hex}` : 'var(--text)',
    '--brand-dark': l >= 0.11 ? `#${hex}` : 'var(--text)',
  } as CSSProperties;
}

export function Stack() {
  return (
    <Section
      id="stack"
      index="01"
      label="Tech stack"
      title="What I work with"
      lead="The technologies behind the systems I build and run in production."
    >
      <ul className={styles.grid}>
        {stack.map((tech) => (
          <li className={`reveal card ${styles.tile}`} key={tech.name} style={brandVars(tech.icon.hex)}>
            <svg className={styles.logo} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d={tech.icon.path} />
            </svg>
            <span className={styles.text}>
              <span className={styles.name}>{tech.name}</span>
              <span className={styles.category}>{tech.category}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className={`reveal ${styles.practices}`}>
        <span className={styles.practicesLabel}>Also</span>
        <ul className="chips">
          {practices.map((item) => (
            <li className="chip" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
