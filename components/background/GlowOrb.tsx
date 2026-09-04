import { cx } from '@/lib/cx';

const TINTS = {
  blue: 'rgb(79 140 255 / 0.5)',
  indigo: 'rgb(124 92 255 / 0.45)',
  cyan: 'rgb(56 199 255 / 0.34)',
  brass: 'rgb(201 162 39 / 0.28)',
} as const;

/**
 * A soft radial glow — the site's ambient light.
 *
 * Blur is done with a CSS gradient rather than `filter: blur()`, which is
 * expensive to composite on mobile. `drift` adds a 40-second breathing motion;
 * it is switched off entirely under prefers-reduced-motion.
 */
export function GlowOrb({
  tint = 'blue',
  size = 620,
  opacity = 1,
  drift = false,
  delay = 0,
  className,
  style,
}: {
  tint?: keyof typeof TINTS;
  size?: number;
  opacity?: number;
  drift?: boolean;
  /** Seconds of animation offset, so multiple orbs don't move in lockstep. */
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={cx('pointer-events-none absolute rounded-full', className)}
      style={{
        width: size,
        height: size,
        opacity,
        background: `radial-gradient(circle at center, ${TINTS[tint]} 0%, transparent 68%)`,
        animation: drift
          ? `orb-drift ${38 + delay * 4}s var(--ease-soft) ${delay}s infinite`
          : undefined,
        ...style,
      }}
    />
  );
}
