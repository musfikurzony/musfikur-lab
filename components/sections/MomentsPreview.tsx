import Link from 'next/link';
import { moments } from '@/content/moments';
import { momentsPage } from '@/content/site';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

/**
 * "A Few Moments" on the homepage (brief §59).
 *
 * Shows up to six featured memories. If none are marked `isFeatured` — or
 * there are no moments at all — the whole section is omitted rather than
 * rendering an empty shell on the professional homepage.
 */
export function MomentsPreview() {
  const featured = moments.filter((moment) => moment.isFeatured).slice(0, 6);
  if (featured.length === 0) return null;

  return (
    <Section
      eyebrow="PERSONAL"
      title={momentsPage.previewHeading}
      subtitle="A glimpse of the other side — people, places and small things worth keeping."
      headerAction={
        <Button href="/moments" variant="secondary" arrow="right">
          {momentsPage.previewCta}
        </Button>
      }
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {featured.map((moment, i) => (
          <Link
            key={moment.id}
            href="/moments"
            className="group/moment block overflow-hidden rounded-[var(--radius-card)] border border-line transition-all duration-[var(--dur-base)] hover:border-line-strong hover:shadow-[var(--shadow-lift)]"
            data-reveal
            style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={moment.media.poster ?? moment.media.src}
              alt={moment.media.alt}
              width={moment.media.width}
              height={moment.media.height}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/moment:scale-105"
            />
          </Link>
        ))}
      </div>
    </Section>
  );
}
