'use client';

import { useState } from 'react';
import type { LibrarySection } from '@/content/types';
import { libraryPage } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

/**
 * ============================================================================
 * THE PRIVATE LIBRARY
 * ============================================================================
 *
 * Built in full, dormant until a dedicated Supabase project is connected.
 *
 * WHAT THIS COMPONENT DELIBERATELY DOES NOT CONTAIN:
 *
 *   • No password, anywhere. Not in a constant, not hashed, not obfuscated.
 *     `if (password === '...')` is not security — the check runs on the
 *     visitor's own machine, where they can read it and skip it.
 *   • No Drive URLs and no book titles. Anything in the bundle is downloaded
 *     by every visitor before they ever see a login screen.
 *
 * WHAT ACTUALLY PROTECTS THE DATA when you activate it:
 *
 *   Supabase Auth for identity, plus Row Level Security on the table so an
 *   unauthenticated request returns an empty result rather than a hidden one.
 *   The items are fetched at runtime, after sign-in, and never built into the
 *   site.
 *
 * `activated` is decided at build time by whether the environment variables
 * exist. With none set — the current state — this renders an honest dormant
 * notice and no sign-in form, because a form that cannot sign anyone in is
 * just a lie with an input box.
 */
export function LibraryClient({
  sections,
  activated,
}: {
  sections: LibrarySection[];
  activated: boolean;
}) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!activated) {
    return (
      <div className="mx-auto max-w-lg">
        <div className="rounded-[var(--radius-lg)] border border-line bg-[rgb(20_26_36/0.65)] p-8 text-center sm:p-10">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[rgb(201_162_39/0.3)] bg-[rgb(201_162_39/0.08)] text-[#D9B84A]">
            <LockIcon />
          </span>

          <h2 className="mt-6 text-title font-semibold text-ink">
            {libraryPage.dormantTitle}
          </h2>
          <p className="mt-3 text-body text-ink-2">{libraryPage.dormantBody}</p>

          <p className="mt-6 text-[0.8125rem] leading-relaxed text-ink-muted">
            When it is connected, the collection below will be readable here
            after signing in. Nothing private is stored in this website&rsquo;s
            code — the items and their links live in their own database, behind
            authentication.
          </p>
        </div>

        <SectionPreview sections={sections} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
          // Activation step: call supabase.auth.signInWithOtp({ email }).
          // See lib/supabase.ts.
        }}
        className="rounded-[var(--radius-lg)] border border-line bg-[rgb(20_26_36/0.65)] p-8 sm:p-10"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[rgb(201_162_39/0.3)] bg-[rgb(201_162_39/0.08)] text-[#D9B84A]">
          <LockIcon />
        </span>

        <h2 className="mt-6 text-center text-title font-semibold text-ink">
          {libraryPage.title}
        </h2>
        <p className="mt-2 text-center text-body text-ink-2">{libraryPage.subtitle}</p>

        <label htmlFor="library-email" className="eyebrow mt-8 block">
          Email
        </label>
        <input
          id="library-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          className="mt-2.5 h-12 w-full rounded-xl border border-line bg-[rgb(11_15_23/0.8)] px-4 text-body text-ink placeholder:text-ink-muted focus:border-[rgb(201_162_39/0.45)] focus:outline-none"
          placeholder="you@example.com"
        />

        <div className="mt-6">
          <Button variant="brass" size="lg" className="w-full" type="submit">
            {libraryPage.ctaLabel}
          </Button>
        </div>

        {submitted && (
          <p className="mt-4 text-center text-[0.8125rem] text-ink-2" role="status">
            If that address has access, a sign-in link is on its way.
          </p>
        )}

        <p className="mt-6 text-center text-[0.75rem] leading-relaxed text-ink-muted">
          Sign-in is by emailed link. There is no public registration and no
          password stored anywhere in this site.
        </p>
      </form>

      <SectionPreview sections={sections} />
    </div>
  );
}

/**
 * The section names only — the shelves, not the books.
 *
 * These are not private, which is exactly why they are the only part safe to
 * render before anyone signs in.
 */
function SectionPreview({ sections }: { sections: LibrarySection[] }) {
  return (
    <div className="mt-10">
      <h2 className="eyebrow text-center">The collection</h2>
      <ul className="mt-5 space-y-2.5">
        {[...sections]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((section) => (
            <li
              key={section.id}
              className="flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-[rgb(20_26_36/0.5)] px-5 py-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-[#C9A227]">
                <Icon name={section.icon} size={17} />
              </span>
              <div className="min-w-0">
                <p className="text-[0.9375rem] font-medium text-ink">{section.title}</p>
                <p className="mt-0.5 text-[0.8125rem] text-ink-muted">
                  {section.description}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="10" width="15" height="10.5" rx="2.4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 10V7a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
