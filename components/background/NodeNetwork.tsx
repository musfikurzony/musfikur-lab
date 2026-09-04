import { cx } from '@/lib/cx';

/**
 * A small constellation of connected nodes.
 *
 * Fixed coordinates rather than random ones: a generated scatter looks
 * accidental, and this needs to look composed. Used behind the hero and as a
 * quiet texture on interior pages.
 */

type Point = { x: number; y: number; r?: number };

const NODES: Point[] = [
  { x: 60, y: 150, r: 2.5 },
  { x: 148, y: 70 },
  { x: 232, y: 176, r: 3 },
  { x: 318, y: 96 },
  { x: 392, y: 202, r: 2.5 },
  { x: 470, y: 116 },
  { x: 118, y: 246 },
  { x: 300, y: 268, r: 2.5 },
  { x: 448, y: 258 },
];

const EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [0, 6],
  [6, 7],
  [7, 2],
  [7, 8],
  [8, 4],
];

export function NodeNetwork({
  opacity = 0.5,
  className,
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 540 320"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className={cx('pointer-events-none absolute inset-0 h-full w-full', className)}
      style={{ opacity }}
    >
      <g stroke="rgb(255 255 255 / 0.09)" strokeWidth="1">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
          />
        ))}
      </g>
      <g>
        {NODES.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.r ?? 2}
            fill={i % 3 === 0 ? 'rgb(79 140 255 / 0.55)' : 'rgb(255 255 255 / 0.22)'}
          />
        ))}
      </g>
    </svg>
  );
}
