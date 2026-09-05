import type { ReactNode } from 'react';

/**
 * The empty state (brief §46).
 *
 * Used when a search finds nothing, a filter is empty, or a section has no
 * content yet. An abstract SVG rather than a shrug emoji — it should look
 * like part of the same system as everything else.
 */
export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-[var(--radius-lg)] border border-dashed border-line px-6 py-16 text-center">
      <svg
        width="72"
        height="52"
        viewBox="0 0 72 52"
        fill="none"
        aria-hidden="true"
        className="opacity-60"
      >
        <defs>
          <linearGradient id="empty-grad" x1="8" y1="44" x2="64" y2="8">
            <stop stopColor="#4F8CFF" stopOpacity="0.5" />
            <stop offset="1" stopColor="#7C5CFF" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect
          x="8.5"
          y="8.5"
          width="55"
          height="35"
          rx="6"
          stroke="url(#empty-grad)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <circle cx="26" cy="26" r="3" fill="rgb(255 255 255 / 0.22)" />
        <circle cx="36" cy="26" r="3" fill="rgb(255 255 255 / 0.14)" />
        <circle cx="46" cy="26" r="3" fill="rgb(255 255 255 / 0.08)" />
      </svg>

      <h3 className="mt-6 text-card font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-[0.875rem] leading-relaxed text-ink-2">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
