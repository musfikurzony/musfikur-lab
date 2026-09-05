import Link from 'next/link';
import { getCurrentlyBuilding } from '@/lib/projects';
import { Section } from '@/components/layout/Section';
import { StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProjectIllustration } from '@/components/illustrations/FlowIllustration';

/**
 * Currently Building (brief §28).
 *
 * Driven by `isCurrentlyBuilding` and `currentFocus` in projects.ts. If no
 * project has the flag, the whole section disappears rather than showing an
 * empty shell — a site that says "currently building: nothing" is worse than
 * one that does not raise the subject.
 *
 * The animated progress line is deliberately not a percentage. A progress bar
 * showing "68% complete" would be a made-up number.
 */
export function CurrentlyBuilding() {
  const building = getCurrentlyBuilding();
  if (building.length === 0) return null;

  const project = building[0];

  return (
    <Section spacing="tight">
      <div
        className="relative overflow-hidden rounded-[var(--radius-lg)] border border-line bg-[rgb(18_26_41/0.6)] p-7 backdrop-blur-sm sm:p-10"
        data-reveal
      >
        {/* Sweeping light along the top edge — motion that means "in progress" */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px overflow-hidden">
          <div
            className="h-full w-1/3 bg-[image:var(--grad-brand)]"
            style={{ animation: 'line-sweep 4.5s var(--ease-soft) infinite' }}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">Currently Building</p>
              <StatusBadge status={project.status} />
            </div>

            <h2 className="mt-5 text-display font-semibold text-ink">
              <Link href={`/lab/${project.slug}`} className="hover:text-blue">
                {project.name}
              </Link>
            </h2>

            <p className="mt-4 max-w-xl text-body text-ink-2">
              {project.shortDescription}
            </p>

            {project.currentFocus && project.currentFocus.length > 0 && (
              <>
                <p className="eyebrow mt-8">Current focus</p>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {project.currentFocus.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-[0.875rem] text-ink-2"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 shrink-0 rounded-full bg-blue"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-9">
              <Button href={`/lab/${project.slug}`} variant="primary" arrow="right">
                Explore Project
              </Button>
            </div>
          </div>

          <div className="h-[170px] sm:h-[200px]">
            <ProjectIllustration
              illustration={project.illustration}
              accent={project.accent}
              uid={`building-${project.id}`}
              animated
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
