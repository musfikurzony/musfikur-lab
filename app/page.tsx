import type { ProjectStatus } from '@/content/types';
import { hero } from '@/content/site';
import {
  getAllProjects,
  getFeaturedProjects,
  getToolCount,
  STATUS_LABELS,
} from '@/lib/projects';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Pill, StatusBadge } from '@/components/ui/Badge';
import { ProjectCard } from '@/components/project/ProjectCard';
import { FeaturedCard } from '@/components/project/FeaturedCard';

/**
 * PHASE 2 REVIEW PAGE.
 *
 * Not the real homepage — this exists so the card system can be looked at and
 * adjusted before it gets used in six places. Phase 3 replaces it with the
 * hero ecosystem, stats, Latest Builds, Featured bento, From Problem to
 * Product, Currently Building, previews and philosophy.
 *
 * Everything below renders from content/projects.ts. No project name, URL,
 * version or date appears anywhere in this file.
 */

const ALL_STATUSES: ProjectStatus[] = [
  'live',
  'active',
  'beta',
  'development',
  'evolving',
  'experiment',
  'archived',
];

export default function HomePage() {
  const projects = getAllProjects();
  const featured = getFeaturedProjects();
  const lead = featured[0];
  const rest = projects.filter((project) => project.id !== lead?.id);

  return (
    <>
      {/* ---- Compact hero, kept from Phase 1 ------------------------------ */}
      <section className="relative flex min-h-[62vh] items-center pt-[var(--nav-h)]">
        <Container>
          <div className="max-w-3xl py-16">
            <p className="eyebrow inline-flex items-center gap-2.5" data-reveal>
              <span className="relative flex h-1.5 w-1.5">
                <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-green" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
              </span>
              {hero.eyebrow}
            </p>

            <h1
              className="grad-heading mt-6 text-hero font-bold"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
            >
              {hero.headline}
            </h1>

            <p
              className="mt-6 max-w-xl text-body text-ink-2"
              data-reveal
              style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
            >
              {hero.supporting}
            </p>

            <div
              className="mt-9 flex flex-wrap items-center gap-3"
              data-reveal
              style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
            >
              <Button href="#cards" variant="primary" size="lg" arrow="right">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- The large bento card ---------------------------------------- */}
      <Section
        id="cards"
        eyebrow="PHASE 2 — REVIEW"
        title="The card system"
        subtitle={`All ${getToolCount()} tools, rendered from content/projects.ts. Launch URLs, versions, dates and technologies are empty because you have not supplied them — the cards show what is true and omit the rest.`}
      >
        <div data-reveal>{lead && <FeaturedCard project={lead} />}</div>
      </Section>

      {/* ---- The standard grid ------------------------------------------- */}
      <Section
        spacing="tight"
        eyebrow="STANDARD CARD"
        title="The grid"
        subtitle="Used in the AI Lab and Latest Builds. Three columns on desktop, one on mobile."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, i) => (
            <div
              key={project.id}
              data-reveal
              style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </Section>

      {/* ---- Reference: every badge state --------------------------------- */}
      <Section
        spacing="tight"
        eyebrow="REFERENCE"
        title="Status badges"
        subtitle="Every state a tool can be in. Live and Active pulse gently; nothing else moves."
      >
        <div
          className="flex flex-wrap items-center gap-3 rounded-[var(--radius-card)] border border-line bg-[rgb(18_26_41/0.4)] p-6"
          data-reveal
        >
          {ALL_STATUSES.map((status) => (
            <StatusBadge key={status} status={status} />
          ))}
        </div>

        <div
          className="mt-5 grid gap-4 sm:grid-cols-3"
          data-reveal
          style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
        >
          {[
            {
              title: 'Open Tool →',
              body: 'Shown when a tool has a public URL. Opens the application in a new tab.',
            },
            {
              title: 'Open Tool → with 🔒',
              body: 'The application has its own login. This site never asks for those credentials.',
            },
            {
              title: 'View Project →',
              body: 'No public URL yet. The site will not invent a launch button it cannot honour.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[var(--radius-card)] border border-line bg-[rgb(18_26_41/0.4)] p-5"
            >
              <p className="text-[0.875rem] font-semibold text-ink">{item.title}</p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-2">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2" data-reveal>
          <Pill tone="quiet">Version chip appears once you add version history</Pill>
          <Pill tone="quiet">NEW and UPDATED appear once dates exist</Pill>
          <Pill tone="quiet">Every card above is one record in one file</Pill>
        </div>
      </Section>
    </>
  );
}
