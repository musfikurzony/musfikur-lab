import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site } from '@/content/site';
import {
  ACCESS_LABELS,
  CATEGORY_LABELS,
  getAllSlugs,
  getProjectBySlug,
} from '@/lib/projects';
import { formatMonthYear } from '@/lib/format';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { AccessBadge, Pill, StatusBadge } from '@/components/ui/Badge';
import { ProjectIllustration } from '@/components/illustrations/FlowIllustration';
import { LaunchButton } from '@/components/project/LaunchButton';
import { VersionHistory } from '@/components/project/VersionHistory';
import { ScreenshotGallery } from '@/components/project/ScreenshotGallery';

/**
 * ============================================================================
 * ONE TEMPLATE → EVERY PROJECT PAGE
 * ============================================================================
 *
 * generateStaticParams turns each project in projects.ts into a real HTML file
 * at build time: /lab/ai-merchandising-erp/index.html, and so on. Add a
 * project record and its page exists on the next deploy. Nothing here is
 * written per-project.
 */

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Not found' };

  return {
    title: project.name,
    description: project.shortDescription,
    alternates: { canonical: `/lab/${project.slug}` },
    openGraph: {
      title: `${project.name} | ${site.name}`,
      description: project.shortDescription,
      type: 'article',
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { derived } = project;
  const updated = formatMonthYear(derived.updatedDate);

  /**
   * Structured data so a search result for this tool shows as an application
   * rather than an untyped page. Only fields we genuinely have are emitted —
   * no invented ratings, prices or counts.
   */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.shortDescription,
    applicationCategory: CATEGORY_LABELS[project.category],
    author: { '@type': 'Person', name: site.name },
    ...(derived.currentVersion ? { softwareVersion: derived.currentVersion } : {}),
    ...(project.launch.url ? { url: project.launch.url } : {}),
  };

  return (
    <article className="pt-[calc(var(--nav-h)+3rem)] pb-24 sm:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container>
        {/* ---- Breadcrumb ---- */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 text-[0.8125rem] text-ink-muted transition-colors hover:text-ink-2"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to the Lab
          </Link>
        </nav>

        {/* ---- Header ---- */}
        <header className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2.5" data-reveal>
              <span className="eyebrow">{CATEGORY_LABELS[project.category]}</span>
            </div>

            <h1
              className="grad-heading mt-4 text-display font-semibold"
              data-reveal
              style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
            >
              {project.name}
            </h1>

            <p
              className="mt-4 max-w-xl text-body text-ink-2"
              data-reveal
              style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
            >
              {project.tagline}
            </p>

            <div
              className="mt-7 flex flex-wrap items-center gap-2.5"
              data-reveal
              style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
            >
              <StatusBadge status={project.status} />
              <AccessBadge access={project.launch.access} />
              {derived.currentVersion && (
                <span className="rounded-full border border-line bg-[rgb(255_255_255/0.03)] px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.09em] text-ink-2">
                  {derived.currentVersion}
                </span>
              )}
              {updated && (
                <span className="text-[0.75rem] text-ink-muted">Updated {updated}</span>
              )}
            </div>

            <div
              className="mt-8 flex flex-wrap gap-3"
              data-reveal
              style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
            >
              <LaunchButton
                launch={project.launch}
                slug={project.slug}
                variant="primary"
                size="lg"
              />
              {project.repositoryUrl && (
                <Button href={project.repositoryUrl} variant="secondary" size="lg" arrow="up-right">
                  Repository
                </Button>
              )}
            </div>

            {/*
              An honest note where a launch button cannot exist, so the page
              explains itself rather than looking like something is missing.
            */}
            {!derived.hasLaunchUrl && (
              <p
                className="mt-5 max-w-md text-[0.8125rem] text-ink-muted"
                data-reveal
                style={{ '--reveal-delay': '280ms' } as React.CSSProperties}
              >
                {ACCESS_LABELS[project.launch.access]}. This page describes the tool;
                there is no public link to open yet.
              </p>
            )}

            {project.launch.note && (
              <p className="mt-3 max-w-md text-[0.8125rem] text-ink-muted">
                {project.launch.note}
              </p>
            )}
          </div>

          <div
            className="h-[180px] sm:h-[220px]"
            data-reveal
            style={{ '--reveal-delay': '300ms' } as React.CSSProperties}
          >
            <ProjectIllustration
              illustration={project.illustration}
              accent={project.accent}
              uid={`detail-${project.id}`}
              animated
            />
          </div>
        </header>

        <hr className="rule my-14 sm:my-16" />

        {/* ---- Body ---- */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <div className="min-w-0">
            <Block title="Overview">
              {project.longDescription.split('\n\n').map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-4 text-body text-ink-2 first:mt-0">
                  {paragraph.trim()}
                </p>
              ))}
            </Block>

            {project.features.length > 0 && (
              <Block title="Key Capabilities">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 rounded-xl border border-line bg-[rgb(18_26_41/0.4)] px-4 py-3 text-[0.875rem] text-ink-2"
                    >
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {project.howItWorks && project.howItWorks.length > 0 && (
              <Block title="How It Works">
                <ol className="space-y-3">
                  {project.howItWorks.map((step, i) => (
                    <li key={step} className="flex gap-3.5 text-[0.9375rem] text-ink-2">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-[0.6875rem] text-blue">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </Block>
            )}

            <Block title="Screenshots">
              <ScreenshotGallery
                screenshots={project.screenshots}
                projectName={project.name}
              />
            </Block>

            <Block title="Version History">
              <VersionHistory history={project.versionHistory} />
            </Block>
          </div>

          {/* ---- Sidebar ---- */}
          <aside className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
            <div className="rounded-[var(--radius-lg)] border border-line bg-[rgb(18_26_41/0.5)] p-6">
              <h2 className="eyebrow">Details</h2>

              <dl className="mt-5 space-y-4 text-[0.875rem]">
                <Row label="Category" value={CATEGORY_LABELS[project.category]} />
                <Row label="Status" value={<StatusBadge status={project.status} />} />
                {derived.currentVersion && (
                  <Row label="Version" value={derived.currentVersion} />
                )}
                {updated && <Row label="Updated" value={updated} />}
                <Row label="Access" value={ACCESS_LABELS[project.launch.access]} />
              </dl>

              {project.technologies.length > 0 ? (
                <>
                  <h3 className="eyebrow mt-8">Technology</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li key={tech}>
                        <Pill>{tech}</Pill>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h3 className="eyebrow mt-8">Technology</h3>
                  <p className="mt-3 text-[0.8125rem] text-ink-muted">Not listed yet.</p>
                </>
              )}

              {project.tags.length > 0 && (
                <>
                  <h3 className="eyebrow mt-8">Tags</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Pill tone="quiet">{tag}</Pill>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-8">
                <LaunchButton
                  launch={project.launch}
                  slug={project.slug}
                  size="md"
                  className="w-full"
                />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12 last:mb-0" data-reveal>
      <h2 className="mb-5 text-title font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="text-right text-ink-2">{value}</dd>
    </div>
  );
}
