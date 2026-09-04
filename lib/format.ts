import type {
  FreshnessBadge,
  Project,
  ProjectDerived,
} from '@/content/types';

/**
 * ============================================================================
 * DERIVATION AND FORMATTING
 * ============================================================================
 *
 * Everything here is computed from the content files. Nothing is stored, so
 * nothing can go stale — and nothing is guessed, so nothing can be wrong.
 *
 * The consistent rule: when a fact is absent, return null and let the
 * interface omit it. Never substitute a placeholder that reads as real.
 */

/** How recent something must be to earn a NEW or UPDATED badge. */
const FRESH_WINDOW_DAYS = 60;

/** Parses an ISO date. Returns null for missing or malformed values. */
export function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * 'Sep 2026'. Month and year only — a day number implies a precision that
 * release dates rarely have, and it dates the page faster.
 */
export function formatMonthYear(value: string | null | undefined): string | null {
  const date = parseDate(value);
  if (!date) return null;
  return date.toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** '4 September 2026'. Used on version history entries. */
export function formatFullDate(value: string | null | undefined): string | null {
  const date = parseDate(value);
  if (!date) return null;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function daysSince(value: string | null | undefined, now: Date): number | null {
  const date = parseDate(value);
  if (!date) return null;
  return Math.floor((now.getTime() - date.getTime()) / 86_400_000);
}

/**
 * Works out everything the interface needs that is not stored directly.
 *
 * `now` is injectable so this stays a pure function and can be tested. At
 * build time it is simply the build date, which is correct for a static site.
 */
export function derive(project: Project, now: Date = new Date()): ProjectDerived {
  const latest = project.versionHistory[0] ?? null;

  const currentVersion = latest?.version ?? null;
  const updatedDate = latest?.date ?? null;

  const ageOfProject = daysSince(project.createdDate, now);
  const ageOfUpdate = daysSince(updatedDate, now);

  let freshness: FreshnessBadge = null;
  if (ageOfProject !== null && ageOfProject <= FRESH_WINDOW_DAYS) {
    freshness = 'new';
  } else if (ageOfUpdate !== null && ageOfUpdate <= FRESH_WINDOW_DAYS) {
    freshness = 'updated';
  }

  return {
    currentVersion,
    updatedDate,
    freshness,
    hasLaunchUrl: Boolean(project.launch.url),
  };
}

/**
 * The sort key for "newest first".
 *
 * A project with no dates sorts last rather than sorting as if it were from
 * 1970 — which would push undated work to the top of a section called
 * "Latest Builds" and say something untrue about it.
 */
export function recencyScore(project: Project): number {
  const latest = project.versionHistory[0]?.date ?? project.createdDate;
  const date = parseDate(latest);
  return date ? date.getTime() : Number.NEGATIVE_INFINITY;
}
