import type { AccentKey, IllustrationKey } from '@/content/types';
import { cx } from '@/lib/cx';

/**
 * ============================================================================
 * PROJECT ILLUSTRATIONS
 * ============================================================================
 *
 * Every project's visual is the same component driven by different data: a
 * short sequence of stages, drawn as connected nodes.
 *
 * Why one component rather than seven hand-drawn SVGs: your brief describes
 * each project's visual as a flow — PO → T&A → CRD → Shipment, FOB → Duty →
 * Logistics → LDP, Checklist → Photos → Findings → Report. They are the same
 * shape with different words. Building them as one system means they stay
 * consistent by construction, and adding an eighth project needs a line of
 * data rather than an afternoon in a drawing tool.
 *
 * If a project later deserves something bespoke — a container with boxes in
 * it, say — add a component and map its key here. Nothing else changes,
 * because cards only ever ask for `<ProjectIllustration illustration={…} />`.
 *
 * No stock photography anywhere (brief §35).
 */

/* ==========================================================================
   THE REGISTRY — the only place project visuals are defined
   ========================================================================== */

const FLOWS: Record<IllustrationKey, string[]> = {
  'erp-flow': ['PO', 'T&A', 'CRD', 'Production', 'Shipment'],
  'ldp-flow': ['FOB', 'Duty', 'Logistics', 'LDP'],
  'container-flow': ['Cartons', 'CBM', 'Container', 'Utilisation'],
  'ledger-flow': ['Customer', 'Usage', 'Billing', 'History'],
  'building-flow': ['Building', 'Flats', 'Services', 'Expenses'],
  'audit-flow': ['Checklist', 'Photos', 'Findings', 'Report'],
  'toolkit-flow': ['Product', 'PLM', 'Merch', 'Ops'],
  generic: ['Input', 'Process', 'Output'],
};

const ACCENTS: Record<AccentKey, { from: string; to: string; solid: string }> = {
  blue: { from: '#4F8CFF', to: '#7C5CFF', solid: '#4F8CFF' },
  indigo: { from: '#7C5CFF', to: '#4F8CFF', solid: '#7C5CFF' },
  cyan: { from: '#38C7FF', to: '#4F8CFF', solid: '#38C7FF' },
  green: { from: '#35D39A', to: '#38C7FF', solid: '#35D39A' },
};

/* ==========================================================================
   THE COMPONENT
   ========================================================================== */

const VIEW_W = 340;
const VIEW_H = 120;
const NODE_W = 54;
const NODE_H = 28;
const NODE_Y = 40;

/**
 * Margin is measured to the node's CENTRE, so it must clear half the node's
 * width or the first and last nodes hang outside the viewBox and get clipped
 * by the card. Half of 54 is 27, plus 7 of breathing room.
 */
const MARGIN = NODE_W / 2 + 7;

export function ProjectIllustration({
  illustration,
  accent = 'blue',
  animated = false,
  /** Unique per instance — SVG ids must not collide on a page. */
  uid,
  className,
}: {
  illustration: IllustrationKey;
  accent?: AccentKey;
  animated?: boolean;
  uid: string;
  className?: string;
}) {
  const steps = FLOWS[illustration] ?? FLOWS.generic;
  const colors = ACCENTS[accent];

  const gradId = `flow-grad-${uid}`;
  const glowId = `flow-glow-${uid}`;

  const usable = VIEW_W - MARGIN * 2;
  const gap = steps.length > 1 ? usable / (steps.length - 1) : 0;
  const centers = steps.map((_, i) =>
    steps.length === 1 ? VIEW_W / 2 : MARGIN + i * gap,
  );

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      fill="none"
      role="img"
      aria-label={`Process diagram: ${steps.join(' to ')}`}
      className={cx('h-full w-full', className)}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2={VIEW_W} y2="0">
          <stop stopColor={colors.from} />
          <stop offset="1" stopColor={colors.to} />
        </linearGradient>
        <radialGradient id={glowId} cx="0.5" cy="0.45" r="0.6">
          <stop stopColor={colors.solid} stopOpacity="0.16" />
          <stop offset="1" stopColor={colors.solid} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient wash so the diagram sits in light rather than on a flat field */}
      <rect width={VIEW_W} height={VIEW_H} fill={`url(#${glowId})`} />

      {/* Connectors, drawn first so nodes sit on top of them */}
      {centers.slice(0, -1).map((x, i) => {
        const startX = x + NODE_W / 2;
        const endX = centers[i + 1] - NODE_W / 2;
        const midY = NODE_Y + NODE_H / 2;

        return (
          <g key={`link-${i}`}>
            <line
              x1={startX}
              y1={midY}
              x2={endX - 5}
              y2={midY}
              stroke="rgb(255 255 255 / 0.14)"
              strokeWidth="1"
            />
            {/* Arrowhead */}
            <path
              d={`M${endX - 5} ${midY - 2.6} L${endX} ${midY} L${endX - 5} ${midY + 2.6}`}
              stroke="rgb(255 255 255 / 0.24)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {animated && (
              <line
                x1={startX}
                y1={midY}
                x2={endX - 5}
                y2={midY}
                stroke={colors.solid}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="10 60"
                opacity="0.75"
                style={{
                  animation: `path-travel ${3.2 + i * 0.4}s linear ${i * 0.45}s infinite`,
                }}
              />
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {centers.map((x, i) => {
        const isFirst = i === 0;
        const isLast = i === steps.length - 1;
        const emphasised = isFirst || isLast;

        return (
          <g key={`node-${i}`}>
            <rect
              x={x - NODE_W / 2}
              y={NODE_Y}
              width={NODE_W}
              height={NODE_H}
              rx="8"
              fill={emphasised ? 'rgb(255 255 255 / 0.055)' : 'rgb(255 255 255 / 0.028)'}
              stroke={emphasised ? `url(#${gradId})` : 'rgb(255 255 255 / 0.12)'}
              strokeWidth={emphasised ? '1.2' : '1'}
            />
            {/* A small mark inside each node keeps them from reading as empty boxes */}
            <circle
              cx={x}
              cy={NODE_Y + NODE_H / 2}
              r="2.6"
              fill={emphasised ? colors.solid : 'rgb(255 255 255 / 0.28)'}
            />
            <text
              x={x}
              y={NODE_Y + NODE_H + 17}
              textAnchor="middle"
              fontSize="9"
              fontWeight="500"
              letterSpacing="0.02em"
              fill={emphasised ? 'rgb(245 247 250 / 0.82)' : 'rgb(156 168 186 / 0.72)'}
            >
              {steps[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
