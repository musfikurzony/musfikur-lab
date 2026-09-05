import type { IconKey } from '@/content/types';

/**
 * The site's icon set — line drawings on a 24-unit grid, 1.5 stroke,
 * inheriting `currentColor`.
 *
 * Hand-drawn rather than an icon library: eleven icons at roughly 200 bytes
 * each is a fraction of the smallest tree-shaken package, and they stay
 * consistent with the brand mark because they share its geometry.
 */

const PATHS: Record<IconKey, React.ReactNode> = {
  // A four-pointed spark — ideas, new things.
  spark: (
    <path d="M12 3.5c.6 3.6 1.9 4.9 5.5 5.5-3.6.6-4.9 1.9-5.5 5.5-.6-3.6-1.9-4.9-5.5-5.5 3.6-.6 4.9-1.9 5.5-5.5ZM18.5 15c.3 1.7.9 2.3 2.5 2.5-1.6.3-2.2.8-2.5 2.5-.3-1.7-.9-2.2-2.5-2.5 1.6-.2 2.2-.8 2.5-2.5Z" />
  ),
  // Calculator — costing tools.
  calculator: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="2.5" />
      <path d="M8 7.5h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </>
  ),
  // Boxes joined by an arrow — a workflow.
  workflow: (
    <>
      <rect x="3" y="4" width="7" height="6" rx="1.6" />
      <rect x="14" y="14" width="7" height="6" rx="1.6" />
      <path d="M10 7h3.5a2 2 0 0 1 2 2v5" />
    </>
  ),
  // Stacked planes — layers of a system.
  layers: (
    <>
      <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
      <path d="m3 12.5 9 4.5 9-4.5M3 17l9 4.5 9-4.5" />
    </>
  ),
  // Connected nodes — integrated systems.
  network: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M12 7.2 6.4 16M12 7.2 17.6 16M7.2 18h9.6" />
    </>
  ),
  // Compass — direction, product thinking.
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H18a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 0 18 18H5.5A1.5 1.5 0 0 0 4 19.5v-15Z" />
      <path d="M4 19.5A1.5 1.5 0 0 1 5.5 21H19" />
    </>
  ),
  scroll: (
    <>
      <path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M9 8.5h6M9 12h6M9 15.5h3.5" />
    </>
  ),
  library: (
    <>
      <path d="M4.5 5.5h3v13h-3zM10 5.5h3v13h-3z" />
      <path d="m15.8 6.3 2.8.8-3.4 12.5-2.8-.8" />
    </>
  ),
  notebook: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3v18M12.5 8h3.5M12.5 12h3.5" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconKey;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name] ?? PATHS.spark}
    </svg>
  );
}
