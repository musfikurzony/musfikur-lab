import Link from 'next/link';
import { milestones } from '@/content/journey';
import { getProjectBySlug } from '@/lib/projects';
import { cx } from '@/lib/cx';
import { Icon } from '@/components/ui/Icon';

/**
 * The Journey timeline (brief §27).
 *
 * Data-driven from content/journey.ts — edit a milestone there and it changes
 * here. Milestones can name real tools, so the timeline is evidence rather
 * than a claim; those links resolve through the project data, and a milestone
 * naming a project that no longer exists simply drops the link instead of
 * rendering a dead one.
 *
 * `limit` lets the homepage show a preview of the first few.
 */
export function JourneyTimeline({ limit }: { limit?: number }) {
  const items = typeof limit === 'number' ? milestones.slice(0, limit) : milestones;

  return (
    <ol className="relative">
      {/* The spine */}
      <div
        aria-hidden="true"
        className="absolute bottom-2 left-[19px] top-2 w-px"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgb(255 255 255 / 0.14) 6%, rgb(255 255 255 / 0.14) 94%, transparent)',
        }}
      />

      {items.map((milestone, i) => {
        const related = (milestone.relatedProjectIds ?? [])
          .map((id) => getProjectBySlug(id))
          .filter((project) => project !== null);

        return (
          <li
            key={milestone.id}
            className="relative flex gap-5 pb-10 last:pb-0"
            data-reveal
            style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}
          >
            <span
              className={cx(
                'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border',
                milestone.isFuture
                  ? 'border-dashed border-line-strong bg-[rgb(13_19_32/0.95)] text-ink-muted'
                  : 'border-line-strong bg-[rgb(13_19_32/0.95)] text-blue',
              )}
            >
              <Icon name={milestone.icon} size={17} />
            </span>

            <div className="pt-1">
              <p className="eyebrow">{milestone.period}</p>
              <h3
                className={cx(
                  'mt-2 text-title font-semibold',
                  milestone.isFuture ? 'text-ink-2' : 'text-ink',
                )}
              >
                {milestone.title}
              </h3>
              <p className="mt-2 max-w-2xl text-body text-ink-2">
                {milestone.description}
              </p>

              {related.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {related.map((project) => (
                    <li key={project!.id}>
                      <Link
                        href={`/lab/${project!.slug}`}
                        className="inline-flex items-center rounded-full border border-line bg-[rgb(255_255_255/0.03)] px-3 py-1 text-[0.75rem] text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
                      >
                        {project!.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
