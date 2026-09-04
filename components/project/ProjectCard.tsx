import Link from 'next/link';
import type { ProjectWithDerived } from '@/content/types';
import { CATEGORY_SHORT } from '@/lib/projects';
import { formatMonthYear } from '@/lib/format';
import { cx } from '@/lib/cx';
import {
  AccessBadge,
  FreshnessTag,
  StatusBadge,
} from '@/components/ui/Badge';
import { ProjectIllustration } from '@/components/illustrations/FlowIllustration';
import { LaunchButton } from './LaunchButton';

/**
 * ============================================================================
 * PROJECT CARD
 * ============================================================================
 *
 * The standard card used in the AI Lab grid and Latest Builds.
 *
 * Note what is NOT in this file: no project names, no URLs, no version
 * numbers, no hard-coded copy. It renders whatever record it is handed. That
 * is the whole reason adding your twenty-first tool will be a data edit.
 *
 * Structure (brief §13, §23):
 *   top     category + status, with the access badge where relevant
 *   middle  illustration, name, one-line description
 *   bottom  version, updated date, launch button
 *
 * Interaction: the whole card is clickable via a stretched overlay link to
 * the project page, while the launch button sits above it and goes to the
 * application instead. Two destinations, one card, and still only one link
 * per target for a screen reader.
 */
export function ProjectCard({
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
        'group/card relative isolate flex flex-col overflow-hidden rounded-[var(--radius-card)]',
        'border border-line bg-[rgb(18_26_41/0.55)] backdrop-blur-sm',
        'shadow-[var(--shadow-card)] transition-all duration-[var(--dur-base)] ease-[var(--ease-soft)]',
        'hover:-translate-y-1 hover:border-line-strong hover:bg-[rgb(22_32_49/0.72)] hover:shadow-[var(--shadow-lift)]',
        'focus-within:-translate-y-1 focus-within:border-line-strong',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-5 pt-5">
        <span className="eyebrow truncate">{CATEGORY_SHORT[project.category]}</span>
        <div className="flex shrink-0 items-center gap-1.5">
          <FreshnessTag freshness={derived.freshness} />
          <AccessBadge access={project.launch.access} compact />
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Illustration */}
      <div className="mt-4 h-[112px] px-3">
        <ProjectIllustration
          illustration={project.illustration}
          accent={project.accent}
          uid={project.id}
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-1">
        <h3 className="text-card font-semibold text-ink">
          <Link
            href={`/lab/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.name}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 text-[0.875rem] leading-relaxed text-ink-2">
          {project.tagline}
        </p>

        {/* Footer pinned to the bottom so cards in a row align */}
        <div className="mt-auto pt-5">
          {/*
            Only rendered when there is something to say. An empty metadata
            row leaves a gap that reads as a missing element rather than as
            absent information.
          */}
          {(derived.currentVersion || updated) && (
            <div className="mb-4 flex items-center gap-2 text-[0.75rem] text-ink-muted">
              {derived.currentVersion && <span>{derived.currentVersion}</span>}
              {derived.currentVersion && updated && (
                <span aria-hidden="true">·</span>
              )}
              {updated && <span>Updated {updated}</span>}
            </div>
          )}

          {/* Sits above the stretched link so it wins the click. */}
          <div className="relative z-10">
            <LaunchButton
              launch={project.launch}
              slug={project.slug}
              size="sm"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
