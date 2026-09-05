import type { ProjectWithDerived } from '@/content/types';
import { LogoMark } from '@/components/brand/LogoMark';
import { StatusDot } from '@/components/ui/Badge';

/**
 * ============================================================================
 * THE HERO ECOSYSTEM
 * ============================================================================
 *
 * The abstract digital workspace from your brief (§8): a glowing centre
 * marked AI LAB, with your applications floating around it on faint
 * connectors.
 *
 * Built entirely in HTML, CSS and SVG — no image file, no library, and it
 * costs roughly 6KB. No robot, no stock illustration.
 *
 * The cards are NOT hard-coded. They read from projects.ts, so when you add a
 * flagship tool it appears here on its own.
 *
 * Mobile gets a simplified three-card strip rather than a shrunken version of
 * the cluster (brief §36) — that is handled by CSS below, so there is no
 * layout flash while JavaScript decides.
 */

/**
 * Where each card sits, as a percentage of the stage. Composed, not random.
 *
 * Cards are 38% wide, so `left` must never exceed 62% or the card hangs past
 * the right edge of the stage and pushes the page into horizontal scroll.
 * Keep left + 38 ≤ 100 when moving these.
 */
const CARD_WIDTH = 38;
const SLOTS = [
  { left: '1%', top: '10%', float: 11, delay: 0 },
  { left: '56%', top: '2%', float: 13, delay: 1.4 },
  { left: '61%', top: '38%', float: 10, delay: 2.6 },
  { left: '0%', top: '52%', float: 12, delay: 0.8 },
  { left: '50%', top: '72%', float: 14, delay: 2 },
  { left: '11%', top: '82%', float: 12, delay: 3.2 },
];

/** Connector paths from the centre outward, in the stage's 100×100 space. */
const LINKS = [
  'M50 50 L18 20',
  'M50 50 L70 14',
  'M50 50 L78 46',
  'M50 50 L14 60',
  'M50 50 L64 78',
  'M50 50 L26 88',
];

export function HeroEcosystem({
  projects,
}: {
  projects: ProjectWithDerived[];
}) {
  const cards = projects.slice(0, SLOTS.length);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[520px] lg:max-w-none"
      aria-hidden="true"
    >
      {/*
        Ambient glow behind the cluster.

        Sized to the stage exactly (inset-0), not 120% of it. An oversized
        element here has nothing clipping it, so it widened the document by
        20px and gave the whole homepage a horizontal scrollbar on a phone.
        The gradient already fades to transparent well before its edge, so
        constraining it costs nothing visually.
      */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgb(79 140 255 / 0.18) 0%, rgb(124 92 255 / 0.09) 40%, transparent 70%)',
        }}
      />

      {/* Connectors — hidden on mobile where the strip layout takes over */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 hidden h-full w-full sm:block"
      >
        {LINKS.slice(0, cards.length).map((d, i) => (
          <g key={i}>
            <path d={d} stroke="rgb(255 255 255 / 0.07)" strokeWidth="0.3" fill="none" />
            <path
              d={d}
              stroke="rgb(79 140 255 / 0.5)"
              strokeWidth="0.45"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="4 56"
              style={{ animation: `path-travel ${7 + i}s linear ${i * 0.7}s infinite` }}
            />
          </g>
        ))}
      </svg>

      {/* Centre */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-line-strong bg-[rgb(10_15_26/0.85)] backdrop-blur-xl sm:h-28 sm:w-28">
          <span
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: '0 0 44px -6px rgb(79 140 255 / 0.55)' }}
          />
          <div className="relative flex flex-col items-center gap-1.5">
            <LogoMark size={26} gradient gradientId="hero-mark" />
            <span className="text-[0.5625rem] font-semibold tracking-[0.2em] text-ink-2">
              AI LAB
            </span>
          </div>
        </div>
      </div>

      {/*
        Desktop: absolutely positioned cluster.
        Mobile: the same cards reflow into a simple wrapped strip, because
        six absolutely positioned cards in a 320px square is unreadable.
      */}
      <div className="absolute inset-0 hidden sm:block">
        {cards.map((project, i) => (
          <div
            key={project.id}
            className="absolute max-w-[190px]"
            style={{
              width: `${CARD_WIDTH}%`,
              left: SLOTS[i].left,
              top: SLOTS[i].top,
              animation: `card-float ${SLOTS[i].float}s var(--ease-soft) ${SLOTS[i].delay}s infinite`,
            }}
          >
            <EcosystemCard project={project} />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 top-1/2 flex translate-y-[calc(-50%+4.5rem)] flex-wrap justify-center gap-2 sm:hidden">
        {cards.slice(0, 3).map((project) => (
          <div key={project.id} className="w-[46%] max-w-[170px]">
            <EcosystemCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}

function EcosystemCard({ project }: { project: ProjectWithDerived }) {
  return (
    <div className="glass rounded-xl px-3 py-2.5 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line bg-[rgb(255_255_255/0.04)]">
          <LogoMark size={12} className="text-blue/80" />
        </span>
        {/*
          Two lines rather than truncation. Half these names are long enough
          that a single line clipped most of them to "Smart Container Loa…",
          which tells a visitor nothing.
        */}
        <span className="line-clamp-2 min-w-0 flex-1 text-[0.6875rem] font-medium leading-[1.3] text-ink">
          {project.name}
        </span>
        <StatusDot status={project.status} />
      </div>
    </div>
  );
}
