import Link from 'next/link';
import type { ProjectWithDerived } from '@/content/types';
import { CATEGORY_LABELS } from '@/lib/projects';
import { formatMonthYear } from '@/lib/format';
import { cx } from '@/lib/cx';
import { AccessBadge, FreshnessTag, Pill, StatusBadge } from '@/components/ui/Badge';
import { ProjectIllustration } from '@/components/illustrations/FlowIllustration';
import { LaunchButton } from './LaunchButton';

/**
 * The large card in the homepage bento grid (brief §12).
 *
 * Same data as ProjectCard, given more room: full category label, a larger
 * animated illustration, the short description rather than the tagline, and
 * a few tags. One of these per view — its weight is what makes the grid read
 * as a hierarchy rather than a wall of equal boxes.
 */
export function FeaturedCard({
  project,
  className,
}: {
  project: ProjectWithDerived;
  className?: string;
}) {
  const { derived } = project;
  const updated = formatMonthYear(derived.updatedDate);

  return (
    <article
      className={cx(
        'group/card relative isolate flex flex-col overflow-hidden rounded-[var(--radius-lg)]',
        'border border-line bg-[rgb(18_26_41/0.6)] backdrop-blur-sm',
        'shadow-[var(--shadow-card)] transition-all duration-[var(--dur-base)] ease-[var(--ease-soft)]',
        'hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-lift)]',
        'focus-within:-translate-y-1 focus-within:border-line-strong',
        className,
      )}
    >
      {/* Accent hairline along the top edge */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[image:var(--grad-brand)] opacity-60"
      />

      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2 px-6 pt-6 sm:px-7 sm:pt-7">
        <span className="eyebrow">{CATEGORY_LABELS[project.category]}</span>
        <div className="flex shrink-0 items-center gap-1.5">
          <FreshnessTag freshness={derived.freshness} />
          <AccessBadge access={project.launch.access} />
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/*
        Capped rather than stretched. The diagram has a fixed aspect ratio, so
        in a very wide card it would scale to the height and float in the
        middle of a lot of empty space. Capping the width and centring keeps
        it deliberate at any card size.
      */}
      <div className="mx-auto mt-5 h-[150px] w-full max-w-[560px] px-4 sm:h-[178px]">
        <ProjectIllustration
          illustration={project.illustration}
          accent={project.accent}
          uid={`featured-${project.id}`}
          animated
        />
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-2 sm:px-7 sm:pb-7">
        <h3 className="text-title font-semibold text-ink">
          <Link
            href={`/lab/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.name}
          </Link>
        </h3>

        <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-2">
          {project.shortDescription}
        </p>

        {project.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <li key={tag}>
                <Pill>{tag}</Pill>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6">
          {(derived.currentVersion || updated) && (
            <div className="mb-5 flex flex-wrap items-center gap-2 text-[0.75rem] text-ink-muted">
              {derived.currentVersion && <span>{derived.currentVersion}</span>}
              {derived.currentVersion && updated && <span aria-hidden="true">·</span>}
              {updated && <span>Updated {updated}</span>}
            </div>
          )}

          <div className="relative z-10 flex flex-wrap gap-3">
            <LaunchButton
              launch={project.launch}
              slug={project.slug}
              variant="primary"
              size="md"
            />
            {derived.hasLaunchUrl && (
              <Link
                href={`/lab/${project.slug}`}
                className="inline-flex h-11 items-center rounded-full px-4 text-[0.875rem] text-ink-2 transition-colors hover:text-ink"
              >
                Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
