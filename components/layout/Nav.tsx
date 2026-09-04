'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navCta, navLinks } from '@/content/site';
import { cx } from '@/lib/cx';
import { Wordmark } from '@/components/brand/Wordmark';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';

/**
 * The floating navigation bar.
 *
 * Sits 12px clear of the top edge, glass over whatever is behind it, and
 * gains a stronger border and shadow once the page scrolls — so it reads as
 * transparent at the top of the hero and as a solid surface everywhere else.
 *
 * 64px tall (brief §6). The Library is intentionally absent; it lives in the
 * footer as a discreet link.
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever navigation happens.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Skip link — the first thing a keyboard user reaches. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-blue focus:px-4 focus:py-2 focus:text-[0.8125rem] focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
        <nav
          aria-label="Primary"
          className={cx(
            'mx-auto flex h-[var(--nav-h)] max-w-[var(--shell)] items-center justify-between',
            'rounded-full px-4 sm:px-5',
            'transition-[background-color,border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-soft)]',
            'border backdrop-blur-xl',
            scrolled
              ? 'border-line-strong bg-[rgb(10_15_26/0.78)] shadow-[var(--shadow-nav)]'
              : 'border-transparent bg-[rgb(10_15_26/0.32)]',
          )}
        >
          <Wordmark />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cx(
                    'relative rounded-full px-3.5 py-2 text-[0.875rem] transition-colors duration-[var(--dur-fast)]',
                    isActive(link.href)
                      ? 'text-ink'
                      : 'text-ink-2 hover:text-ink',
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3.5 -bottom-0.5 h-px bg-[image:var(--grad-brand)]"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/*
              Wrapped rather than given `hidden sm:inline-flex` directly.
              Button's base classes include `inline-flex`, and two utilities
              setting `display` at equal specificity are resolved by their
              order in the generated stylesheet, not by the order they appear
              in the class attribute — so `hidden` silently lost and the CTA
              stayed visible on mobile. Hiding a wrapper avoids the conflict.
            */}
            <div className="hidden sm:block">
              <Button
                href={navCta.href}
                variant="primary"
                size="sm"
                arrow="up-right"
              >
                {navCta.label}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-[rgb(255_255_255/0.06)] hover:text-ink md:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="M2 5h14M2 9h14M2 13h14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        isActive={isActive}
      />
    </>
  );
}
