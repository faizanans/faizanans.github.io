import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { EASE, prefersReducedMotion } from '../lib/motion';

interface Props {
  src: string;
  alt?: string;
  className?: string;
}

/**
 * An unDraw illustration, recoloured at build time into the paper palette and
 * revealed as though a press were rolling ink across it — a clip-path wipe
 * upward, so it prints rather than fades.
 */
export function Illustration({ src, alt = '', className }: Props) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let animation: ReturnType<typeof animate> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        animation = animate(el, {
          clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
          opacity: [0, 1],
          duration: 900,
          ease: EASE,
        });
      },
      { threshold: 0.01 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      animation?.revert();
    };
  }, [src]);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      aria-hidden={alt === '' ? true : undefined}
    />
  );
}
