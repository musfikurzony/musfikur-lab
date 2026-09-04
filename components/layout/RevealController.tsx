'use client';

import { useEffect } from 'react';

/**
 * Scroll reveal for the whole site, in one small client component.
 *
 * Anything with a `data-reveal` attribute starts at opacity 0 / +16px
 * (see globals.css) and settles into place the first time it enters the
 * viewport. One IntersectionObserver handles every element on the page.
 *
 * Why this instead of an animation library: Framer Motion is roughly 34KB
 * gzipped to do what this file and twelve lines of CSS already do. On a site
 * whose selling point is speed, that trade is not worth making.
 *
 * A MutationObserver picks up elements added after the first paint — the
 * filtered results on /lab, for instance — so they animate too.
 *
 * Reduced motion: the CSS media query pins everything to its final state, and
 * we also skip observing entirely so nothing is left hidden if JS is slow.
 */
export function RevealController() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const show = (el: Element) => el.setAttribute('data-reveal', 'shown');

    if (prefersReduced) {
      document.querySelectorAll('[data-reveal]').forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      {
        // Start the reveal slightly before the element reaches the fold, so
        // it has finished by the time the reader's eye arrives.
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.06,
      },
    );

    const observeAll = () => {
      document
        .querySelectorAll('[data-reveal]:not([data-reveal="shown"])')
        .forEach((el) => observer.observe(el));
    };

    observeAll();

    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
