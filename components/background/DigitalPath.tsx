import { cx } from '@/lib/cx';

/**
 * A curved connector with a slow pulse of light travelling along it.
 *
 * Used between the hero ecosystem cards and in the "From Problem to Product"
 * flow. Two strokes are layered: a static hairline, and a short dashed
 * segment that travels the path via stroke-dashoffset.
 */
export function DigitalPath({
  d,
  travel = true,
  duration = 6,
  delay = 0,
  className,
}: {
  /** SVG path data. */
  d: string;
  travel?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <g className={cx(className)} aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke="rgb(255 255 255 / 0.08)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {travel && (
        <path
          d={d}
          fill="none"
          stroke="rgb(79 140 255 / 0.65)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="18 222"
          style={{
            animation: `path-travel ${duration}s linear ${delay}s infinite`,
          }}
        />
      )}
    </g>
  );
}
