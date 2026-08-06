import { useEffect, useState } from 'react';

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 1900;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Types each phrase out, holds it, deletes it, moves to the next — forever.
 * With reduced motion requested, it settles on the first phrase and stops.
 */
export function useTypewriter(phrases: readonly string[]) {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;

    if (prefersReducedMotion()) {
      setText(phrases[0]);
      setDone(true);
      return;
    }

    let phrase = 0;
    let chars = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = phrases[phrase];
      chars += deleting ? -1 : 1;
      setText(current.slice(0, chars));

      let next: number = deleting ? DELETE_MS : TYPE_MS;
      if (!deleting && chars === current.length) {
        deleting = true;
        next = HOLD_MS;
      } else if (deleting && chars === 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        next = TYPE_MS * 4;
      }

      timer = setTimeout(tick, next);
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [phrases]);

  return { text, done };
}
