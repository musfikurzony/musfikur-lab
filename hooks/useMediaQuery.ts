'use client';

import { useEffect, useState } from 'react';

/**
 * Reads a media query reactively.
 *
 * Starts `false` on the server and on first paint, then corrects after mount.
 * Use it for behaviour (should the hero ecosystem simplify?), never for
 * layout that could flash — CSS handles layout.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Convenience wrapper used by the ecosystem visual and the lightbox. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
