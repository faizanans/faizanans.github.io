import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view.
 *
 * Uses scroll position rather than IntersectionObserver so the "active" answer
 * stays stable when several sections are on screen at once: the active section
 * is the last one whose top has passed the nav line.
 */
export function useScrollSpy(ids: readonly string[], offset = 96) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      // At the very bottom the last section may be too short to ever cross the
      // nav line — treat reaching the end of the page as reaching it.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(ids[ids.length - 1] ?? null);
        return;
      }

      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      frame ||= window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, offset]);

  return active;
}
