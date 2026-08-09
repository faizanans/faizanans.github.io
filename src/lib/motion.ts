/**
 * Motion primitives, all driven by anime.js.
 *
 * The sheet is paper: it settles into place rather than springing. Everything
 * here shares one easing curve and one distance so the page reads as a single
 * physical object, not a set of independently animated widgets.
 */

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { animate, utils } from 'animejs';

export const EASE = 'cubicBezier(0.2, 0.8, 0.2, 1)';

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Reveals every `.reveal` descendant of the returned ref as it scrolls into
 * view, staggered in document order — the way ink would land line by line.
 *
 * Pass `key` to re-run when the container's contents are swapped out (the
 * audience toggle replaces whole sections).
 */
export function useReveal<T extends HTMLElement>(key?: unknown): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>('.reveal'));
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      utils.set(targets, { opacity: 1, translateY: 0 });
      return;
    }

    // Stagger restarts per block, so a tall section doesn't accumulate an
    // ever-lengthening delay down the page.
    const offsets = new Map<HTMLElement, number>();
    const seen = new Map<Element, number>();
    for (const el of targets) {
      const owner = el.closest('[data-reveal-group]') ?? root;
      const n = seen.get(owner) ?? 0;
      offsets.set(el, n);
      seen.set(owner, n + 1);
    }

    utils.set(targets, { opacity: 0, translateY: 16 });

    // Each element is observed on its own: one element that scrolls past
    // while off-screen can never leave the rest of its group unrevealed.
    const animations: ReturnType<typeof animate>[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          animations.push(
            animate(el, {
              opacity: 1,
              translateY: 0,
              duration: 720,
              delay: (offsets.get(el) ?? 0) * 70,
              ease: EASE,
            }),
          );
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      animations.forEach((a) => a.revert());
      utils.set(targets, { opacity: 1, translateY: 0 });
    };
  }, [key]);

  return ref;
}
