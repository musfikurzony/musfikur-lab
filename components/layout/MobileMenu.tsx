'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { libraryLink, navCta, navLinks, site } from '@/content/site';
import { cx } from '@/lib/cx';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { Button } from '@/components/ui/Button';
import { LogoMark } from '@/components/brand/LogoMark';

/**
 * Full-screen mobile navigation.
 *
 * A proper mobile layout rather than a shrunken desktop bar (brief §36):
 * large touch targets, generous spacing, and the CTA given real weight at
 * the bottom where a thumb can reach it.
 *
 * Accessibility: Escape closes it, focus moves to the panel on open and back
 * to the trigger on close, focus is trapped while open, and the page behind
 * is inert to screen readers via aria-hidden on the rest of the tree.
 */
export function MobileMenu({
  open,
  onClose,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      returnFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open ? true : undefined}
      className={cx(
        'fixed inset-0 z-[55] md:hidden',
        'transition-opacity duration-[var(--dur-base)] ease-[var(--ease-soft)]',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-[rgb(4_7_13/0.82)] backdrop-blur-md"
      />

      <div
        ref={panelRef}
        className={cx(
          'absolute inset-x-3 top-3 rounded-3xl border border-line-strong',
          'bg-[rgb(13_19_32/0.97)] p-5 shadow-[var(--shadow-lift)]',
          'transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-expo)]',
          open ? 'translate-y-0' : '-translate-y-3',
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <LogoMark size={24} className="text-blue" />
            <div className="flex flex-col leading-none">
              <span className="text-[0.875rem] font-semibold tracking-[0.06em]">
                {site.shortName}
              </span>
              <span className="mt-1 text-[0.625rem] font-medium tracking-[0.18em] text-ink-muted">
                AI LAB
              </span>
            </div>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-[rgb(255_255_255/0.06)] hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <hr className="rule my-5" />

        <ul className="flex flex-col">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={cx(
                  'flex min-h-[52px] items-center justify-between rounded-xl px-3 text-[1.0625rem]',
                  'transition-colors duration-[var(--dur-fast)]',
                  isActive(link.href)
                    ? 'text-ink'
                    : 'text-ink-2 active:bg-[rgb(255_255_255/0.05)]',
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-blue"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col gap-3">
          <Button href={navCta.href} variant="primary" size="lg" arrow="up-right">
            {navCta.label}
          </Button>

          <Link
            href={libraryLink.href}
            onClick={onClose}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-full text-[0.8125rem] text-ink-muted transition-colors hover:text-ink-2"
          >
            <LockIcon />
            {libraryLink.label}
          </Link>
        </div>
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect
        x="2.5"
        y="6"
        width="9"
        height="6.5"
        rx="1.6"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M4.75 6V4.25a2.25 2.25 0 0 1 4.5 0V6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
