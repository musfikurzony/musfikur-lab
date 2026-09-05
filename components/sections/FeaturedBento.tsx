import { getFeaturedProjects } from '@/lib/projects';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { FeaturedCard } from '@/components/project/FeaturedCard';
import { ProjectCard } from '@/components/project/ProjectCard';

/**
 * Featured Builds — the bento grid (brief §12).
 *
 * The project with featuredOrder 1 takes the large cell; the rest fill the
 * smaller ones. Which projects appear, and in what order, is decided entirely
 * by `isFeatured` and `featuredOrder` in projects.ts.
 */
export function FeaturedBento() {
  const featured = getFeaturedProjects(5);
  if (featured.length === 0) return null;

  const [lead, ...rest] = featured;

  return (
    <Section
      eyebrow="FEATURED"
      title="Featured Builds"
      subtitle="A selection of the tools currently shaping my digital workspace."
      headerAction={
        <Button href="/lab" variant="secondary" arrow="right">
          See all tools
        </Button>
      }
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Large card spans two columns and both rows on desktop */}
        <div className="lg:col-span-2 lg:row-span-2" data-reveal>
          <FeaturedCard project={lead} className="h-full" />
        </div>

        {rest.slice(0, 4).map((project, i) => (
          <div
            key={project.id}
            data-reveal
            style={{ '--reveal-delay': `${(i + 1) * 70}ms` } as React.CSSProperties}
          >
            <ProjectCard project={project} className="h-full" />
          </div>
        ))}
      </div>
    </Section>
  );
}
