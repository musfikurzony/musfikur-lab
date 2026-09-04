import type { ReactNode } from 'react';
import type { AccessModel, FreshnessBadge, ProjectStatus } from '@/content/types';
import { STATUS_LABELS } from '@/lib/projects';
import { cx } from '@/lib/cx';

/**
 * ============================================================================
 * BADGES
 * ============================================================================
 *
 * Status and access are two separate badges on purpose.
 *
 * A tool can be LIVE and also require a login — both facts matter to someone
 * deciding whether to click, and folding them into one badge would force a
 * choice between telling them the tool works and telling them they need an
 * account.
 */

/* ==========================================================================
   STATUS
   ========================================================================== */

const STATUS_STYLES: Record<
  ProjectStatus,
  { dot: string; text: string; ring: string; pulse: boolean }
> = {
  live: {
    dot: 'bg-green',
    text: 'text-[#6FE0B6]',
    ring: 'border-[rgb(53_211_154/0.28)] bg-[rgb(53_211_154/0.1)]',
    pulse: true,
  },
  active: {
    dot: 'bg-cyan',
    text: 'text-[#7FD9FF]',
    ring: 'border-[rgb(56_199_255/0.28)] bg-[rgb(56_199_255/0.1)]',
    pulse: true,
  },
  beta: {
    dot: 'bg-amber',
    text: 'text-[#F7CC7A]',
    ring: 'border-[rgb(245_184_75/0.28)] bg-[rgb(245_184_75/0.1)]',
    pulse: false,
  },
  development: {
    dot: 'bg-blue',
    text: 'text-[#8FB4FF]',
    ring: 'border-[rgb(79_140_255/0.28)] bg-[rgb(79_140_255/0.1)]',
    pulse: false,
  },
  experiment: {
    dot: 'bg-indigo',
    text: 'text-[#AC96FF]',
    ring: 'border-[rgb(124_92_255/0.28)] bg-[rgb(124_92_255/0.1)]',
    pulse: false,
  },
  evolving: {
    dot: 'bg-indigo',
    text: 'text-[#AC96FF]',
    ring: 'border-[rgb(124_92_255/0.28)] bg-[rgb(124_92_255/0.1)]',
    pulse: false,
  },
  archived: {
    dot: 'bg-ink-muted',
    text: 'text-ink-muted',
    ring: 'border-line bg-[rgb(255_255_255/0.03)]',
    pulse: false,
  },
};

export function StatusDot({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const style = STATUS_STYLES[status];
  return (
    <span
      aria-hidden="true"
      className={cx(
        'inline-block h-1.5 w-1.5 shrink-0 rounded-full',
        style.dot,
        style.pulse && 'dot-pulse',
        className,
      )}
    />
  );
}

export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const style = STATUS_STYLES[status];

  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1',
        'text-[0.6875rem] font-medium uppercase tracking-[0.09em]',
        style.ring,
        style.text,
        className,
      )}
    >
      <StatusDot status={status} />
      {STATUS_LABELS[status]}
    </span>
  );
}

/* ==========================================================================
   ACCESS
   ========================================================================== */

function LockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="2.5" y="6" width="9" height="6.5" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4.75 6V4.25a2.25 2.25 0 0 1 4.5 0V6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Only rendered for `auth`. An open tool needs no badge saying it is open,
 * and a tool with no URL is already explained by its status and its button.
 *
 * `compact` drops the word and keeps the lock, for the narrow grid card where
 * a third full badge would crowd the header. The label survives for screen
 * readers either way.
 */
export function AccessBadge({
  access,
  compact = false,
  className,
}: {
  access: AccessModel;
  compact?: boolean;
  className?: string;
}) {
  if (access !== 'auth') return null;

  const label = 'Login required';

  if (compact) {
    return (
      <span
        className={cx(
          'inline-flex h-6 w-6 items-center justify-center rounded-full border border-line',
          'bg-[rgb(255_255_255/0.03)] text-ink-2',
          className,
        )}
        title={label}
      >
        <LockIcon />
        <span className="sr-only">{label}</span>
      </span>
    );
  }

  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1',
        'bg-[rgb(255_255_255/0.03)] text-[0.6875rem] font-medium uppercase tracking-[0.09em] text-ink-2',
        className,
      )}
      title={label}
    >
      <LockIcon />
      Login
    </span>
  );
}

/* ==========================================================================
   FRESHNESS
   ========================================================================== */

/** NEW and UPDATED are computed from dates, never set by hand. */
export function FreshnessTag({
  freshness,
  className,
}: {
  freshness: FreshnessBadge;
  className?: string;
}) {
  if (!freshness) return null;

  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-2 py-0.5',
        'text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white',
        'bg-[image:var(--grad-brand)]',
        className,
      )}
    >
      {freshness === 'new' ? 'New' : 'Updated'}
    </span>
  );
}

/* ==========================================================================
   GENERIC PILL
   Tags, technologies, category labels.
   ========================================================================== */

export function Pill({
  children,
  tone = 'default',
  className,
}: {
  children: ReactNode;
  tone?: 'default' | 'quiet';
  className?: string;
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[0.75rem]',
        tone === 'default'
          ? 'border-line bg-[rgb(255_255_255/0.03)] text-ink-2'
          : 'border-transparent text-ink-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
