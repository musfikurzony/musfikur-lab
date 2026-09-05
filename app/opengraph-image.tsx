import { ImageResponse } from 'next/og';
import { seo, site } from '@/content/site';

/**
 * The social sharing card (brief §43).
 *
 * Generated once at build time into a real PNG, so it costs nothing at
 * runtime and works with the static export. This is what appears when the
 * site is shared on LinkedIn, WhatsApp or anywhere else that reads Open Graph
 * tags.
 *
 * Built with the same brand mark and palette as the site rather than a
 * screenshot — a screenshot of a dark page reads as a black rectangle at
 * thumbnail size.
 */
/** Required by `output: 'export'` — render this once at build time, not per request. */
export const dynamic = 'force-static';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${site.name} — ${site.descriptor}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          backgroundColor: '#070B14',
          backgroundImage:
            'radial-gradient(circle at 18% 12%, rgba(79,140,255,0.28) 0%, transparent 52%), radial-gradient(circle at 88% 8%, rgba(124,92,255,0.22) 0%, transparent 48%)',
        }}
      >
        {/* Mark + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="46" height="46" viewBox="0 0 32 32" fill="none">
            <path
              d="M6.5 25.5V9L16 18.5L25.5 9V25.5"
              stroke="#4F8CFF"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="6.5" cy="9" r="2.6" fill="#070B14" stroke="#4F8CFF" strokeWidth="2.1" />
            <circle cx="25.5" cy="9" r="2.6" fill="#070B14" stroke="#7C5CFF" strokeWidth="2.1" />
            <circle cx="16" cy="18.5" r="2.1" fill="#4F8CFF" />
          </svg>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              color: '#9CA8BA',
              fontWeight: 600,
            }}
          >
            {site.name.toUpperCase()}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: '#F5F7FA',
              letterSpacing: -2,
              lineHeight: 1.08,
            }}
          >
            Ideas → AI →
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: '#F5F7FA',
              letterSpacing: -2,
              lineHeight: 1.08,
            }}
          >
            Real-World Solutions
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 27,
              color: '#9CA8BA',
              maxWidth: 880,
              lineHeight: 1.45,
            }}
          >
            {seo.description}
          </div>
        </div>

        {/* Footer strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 88,
              height: 3,
              background: 'linear-gradient(90deg, #4F8CFF, #7C5CFF)',
            }}
          />
          <div style={{ fontSize: 21, color: '#7B8798', letterSpacing: 1 }}>
            {site.descriptor}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
