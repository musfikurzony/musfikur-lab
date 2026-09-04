import { cx } from '@/lib/cx';

/**
 * A very faint technical grid, masked so it fades out towards the edges.
 *
 * Pure SVG — a few hundred bytes, no image request. It should be almost
 * invisible: you notice the texture, not the lines. If you can read the grid
 * while reading the text, it is too strong.
 */
export function AmbientGrid({
  cell = 56,
  opacity = 0.55,
  fade = 'radial',
  className,
}: {
  cell?: number;
  opacity?: number;
  fade?: 'radial' | 'top' | 'none';
  className?: string;
}) {
  const mask =
    fade === 'radial'
      ? 'radial-gradient(ellipse 78% 62% at 50% 32%, #000 30%, transparent 78%)'
      : fade === 'top'
        ? 'linear-gradient(to bottom, #000 0%, transparent 82%)'
        : undefined;

  return (
    <div
      aria-hidden="true"
      className={cx('pointer-events-none absolute inset-0', className)}
      style={{
        opacity,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern
            id={`grid-${cell}`}
            width={cell}
            height={cell}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${cell} 0 L 0 0 0 ${cell}`}
              fill="none"
              stroke="rgb(255 255 255 / 0.045)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${cell})`} />
      </svg>
    </div>
  );
}
