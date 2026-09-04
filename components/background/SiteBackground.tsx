import { AmbientGrid } from './AmbientGrid';
import { GlowOrb } from './GlowOrb';

/**
 * The site's ambient ground, fixed behind all content.
 *
 * Three layers: a faint grid, two slowly drifting glows, and a vignette that
 * darkens the lower half so text always sits on a calm field.
 *
 * `mood` switches the palette. The Library uses 'calm' — warmer, quieter,
 * no drift — because a reading room should not feel like a dashboard.
 */
export function SiteBackground({ mood = 'lab' }: { mood?: 'lab' | 'calm' }) {
  const calm = mood === 'calm';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: calm ? 'var(--color-library-bg)' : 'var(--color-bg)' }}
    >
      <AmbientGrid cell={56} opacity={calm ? 0.3 : 0.6} fade="radial" />

      {calm ? (
        <GlowOrb
          tint="brass"
          size={760}
          opacity={0.4}
          className="-top-56 left-1/2 -translate-x-1/2"
        />
      ) : (
        <>
          <GlowOrb
            tint="blue"
            size={880}
            opacity={0.55}
            drift
            className="-top-72 -left-40"
          />
          <GlowOrb
            tint="indigo"
            size={760}
            opacity={0.45}
            drift
            delay={6}
            className="-top-40 right-[-12rem]"
          />
          <GlowOrb
            tint="cyan"
            size={620}
            opacity={0.25}
            drift
            delay={12}
            className="top-[120vh] left-[55%]"
          />
        </>
      )}

      {/* Vignette: keeps long-form text off the brightest part of the field. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, var(--color-bg) 92%)',
          opacity: calm ? 0.5 : 0.75,
        }}
      />
    </div>
  );
}
