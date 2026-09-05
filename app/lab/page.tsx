import type { Metadata } from 'next';
import { labPage, seo } from '@/content/site';
import { getAllProjects, getUsedCategories } from '@/lib/projects';
import { Container } from '@/components/layout/Container';
import { LabBrowser } from '@/components/project/LabBrowser';

export const metadata: Metadata = {
  title: 'AI Lab',
  description: seo.description,
  alternates: { canonical: '/lab' },
};

/**
 * /lab — the launchpad (brief §22).
 *
 * The page shell is rendered at build time as real HTML, so search engines
 * and a browser with JavaScript disabled still see every tool. Only the
 * filtering is interactive.
 */
export default function LabPage() {
  const projects = getAllProjects();
  const categories = getUsedCategories();

  return (
    <div className="pt-[calc(var(--nav-h)+3.5rem)] pb-24 sm:pb-32">
      <Container>
        <header className="mb-12 max-w-2xl sm:mb-14">
          <p className="eyebrow" data-reveal>
            {labPage.eyebrow}
          </p>
          <h1
            className="grad-heading mt-4 text-display font-semibold"
            data-reveal
            style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
          >
            {labPage.title}
          </h1>
          <p
            className="mt-4 text-body text-ink-2"
            data-reveal
            style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
          >
            {labPage.subtitle}
          </p>
        </header>

        <LabBrowser projects={projects} categories={categories} />
      </Container>
    </div>
  );
}
