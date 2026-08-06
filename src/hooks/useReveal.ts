import { useEffect, useRef } from 'react';

/**
 * Fades an element in the first time it enters the viewport.
 *
 * All callers share one IntersectionObserver, and each element is unobserved
 * once it has been revealed — reveals never replay on scroll-up.
 */

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  );
  return observer;
}

export function useReveal<T extends HTMLElement>(delayMs = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add('reveal');
    if (delayMs) el.style.transitionDelay = `${delayMs}ms`;

    // Without observer support, show the content rather than hiding it forever.
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    const obs = getObserver();
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [delayMs]);

  return ref;
}
