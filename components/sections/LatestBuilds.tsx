import { getLatestProjects } from '@/lib/projects';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/project/ProjectCard';

/**
 * Latest Builds (brief §21).
 *
 * Ordered automatically by each project's newest version date. You never
 * maintain this list — it reorders itself as you release.
 *
 * While no dates are recorded anywhere, it falls back to the order of
 * projects.ts, and projects without dates sort last rather than sorting as
 * though they were from 1970.
 */
export function LatestBuilds() {
  const latest = getLatestProjects(3);
  if (latest.length === 0) return null;

  return (
    <Section
      eyebrow="RECENTLY UPDATED"
      title="Latest Builds"
      subtitle="The newest versions and experiments from the lab."
      headerAction={
        <Button href="/lab" variant="ghost" arrow="right">
          Open the Lab
        </Button>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((project, i) => (
          <div
            key={project.id}
            data-reveal
            style={{ '--reveal-delay': `${i * 70}ms` } as React.CSSProperties}
          >
            <ProjectCard project={project} className="h-full" />
          </div>
        ))}
      </div>
    </Section>
  );
}
