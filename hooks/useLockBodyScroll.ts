'use client';

import { useEffect } from 'react';

/**
 * Freezes background scrolling while a mobile menu or lightbox is open.
 *
 * Compensates for the scrollbar width so the page doesn't shift sideways
 * when the bar disappears — the small detail that separates a polished
 * overlay from a jumpy one.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}
