import type { VersionEntry } from '@/content/types';
import { formatFullDate } from '@/lib/format';

/**
 * Version history (brief §6).
 *
 * The newest version is shown expanded as "What's New". Everything older
 * collapses into a native <details> element — no JavaScript, works before
 * hydration, keyboard-accessible for free, and searchable by the browser's
 * find-in-page.
 *
 * Historical versions never get their own card anywhere on the site. They
 * live here and nowhere else, which is what your brief asked for.
 */
export function VersionHistory({ history }: { history: VersionEntry[] }) {
  if (history.length === 0) {
    return (
      <p className="text-[0.875rem] text-ink-muted">
        No version history recorded yet.
      </p>
    );
  }

  const [latest, ...older] = history;

  return (
    <div>
      {/* Latest */}
      <div className="rounded-[var(--radius-card)] border border-line bg-[rgb(18_26_41/0.5)] p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[image:var(--grad-brand)] px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white">
            Latest
          </span>
          <span className="text-card font-semibold text-ink">{latest.version}</span>
          <span className="text-[0.8125rem] text-ink-muted">
            {formatFullDate(latest.date)}
          </span>
        </div>

        {latest.summary && (
          <p className="mt-3 text-[0.9375rem] text-ink-2">{latest.summary}</p>
        )}

        {latest.changes && latest.changes.length > 0 && (
          <ul className="mt-4 space-y-2">
            {latest.changes.map((change) => (
              <li key={change} className="flex gap-2.5 text-[0.875rem] text-ink-2">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue" />
                {change}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Older */}
      {older.length > 0 && (
        <details className="group/history mt-4">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full px-1 py-2 text-[0.875rem] text-ink-2 transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-[var(--dur-fast)] group-open/history:rotate-90"
            >
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Version history ({older.length} earlier{' '}
            {older.length === 1 ? 'release' : 'releases'})
          </summary>

          <ol className="mt-3 space-y-3 border-l border-line pl-5">
            {older.map((entry) => (
              <li key={`${entry.version}-${entry.date}`}>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-[0.9375rem] font-medium text-ink-2">
                    {entry.version}
                  </span>
                  <span className="text-[0.75rem] text-ink-muted">
                    {formatFullDate(entry.date)}
                  </span>
                </div>
                {entry.summary && (
                  <p className="mt-1 text-[0.875rem] text-ink-muted">{entry.summary}</p>
                )}
                {entry.changes && entry.changes.length > 0 && (
                  <ul className="mt-2 space-y-1.5">
                    {entry.changes.map((change) => (
                      <li key={change} className="text-[0.8125rem] text-ink-muted">
                        · {change}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </details>
      )}
    </div>
  );
}
