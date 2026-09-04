/**
 * The brand mark.
 *
 * A geometric M drawn as a small network: nodes joined by two rising paths.
 * The letterform and the graph are the same shape, which is the whole idea —
 * merchandising work and connected systems, one mark.
 *
 * Deliberately not a robot, a brain or a sparkle.
 *
 * Pure SVG with no hooks, so it stays a Server Component and ships zero
 * JavaScript. `gradient` is for large sizes (hero, social card); the flat
 * version inherits `currentColor` and stays legible at 16px in a browser tab.
 *
 * If you place two gradient marks on the same page, give the second one a
 * different `gradientId` so the SVG ids stay unique.
 */
export function LogoMark({
  size = 28,
  gradient = false,
  gradientId = 'brand-mark-gradient',
  className,
}: {
  size?: number;
  gradient?: boolean;
  gradientId?: string;
  className?: string;
}) {
  const stroke = gradient ? `url(#${gradientId})` : 'currentColor';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {gradient && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="4"
            y1="26"
            x2="28"
            y2="6"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4F8CFF" />
            <stop offset="1" stopColor="#7C5CFF" />
          </linearGradient>
        </defs>
      )}

      {/* The M, drawn as one continuous path so it reads as a single gesture. */}
      <path
        d="M6.5 25.5V9L16 18.5L25.5 9V25.5"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Nodes at the turning points — the letterform becomes a graph. */}
      <circle
        cx="6.5"
        cy="9"
        r="2.6"
        fill="var(--color-bg)"
        stroke={stroke}
        strokeWidth="2.1"
      />
      <circle
        cx="25.5"
        cy="9"
        r="2.6"
        fill="var(--color-bg)"
        stroke={stroke}
        strokeWidth="2.1"
      />
      <circle cx="16" cy="18.5" r="2.1" fill={stroke} />
    </svg>
  );
}
