import type { Metadata } from 'next';
import { about, philosophy, site } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { AboutPillars } from '@/components/sections/AboutPillars';
import { TechEcosystem } from '@/components/sections/TechEcosystem';

export const metadata: Metadata = {
  title: 'About',
  description: about.intro,
  alternates: { canonical: '/about' },
};

/**
 * /about (brief §29–§31).
 *
 * The photo is optional and stays optional: `about.photo.src` is empty in
 * content/site.ts, so the layout runs as a single column. Add a path and the
 * page becomes two columns. No structural change, no code from anyone —
 * which is what you asked for.
 */
export default function AboutPage() {
  const hasPhoto = Boolean(about.photo.src);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.role,
    description: about.intro,
    url: site.url,
  };

  return (
    <div className="pt-[calc(var(--nav-h)+3.5rem)] pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container>
        <header
          className={
            hasPhoto
              ? 'grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start'
              : 'max-w-2xl'
          }
        >
          <div>
            <p className="eyebrow" data-reveal>
              About
            </p>
            <h1
              className="grad-heading mt-4 text-display font-semibold"
              data-reveal
              style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
            >
              {about.title}
            </h1>
            <p
              className="mt-5 text-body text-ink-2"
              data-reveal
              style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
            >
              {about.intro}
            </p>
            <p
              className="mt-6 text-[0.875rem] text-ink-muted"
              data-reveal
              style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
            >
              {site.role}
            </p>
          </div>

          {hasPhoto && (
            <div
              className="overflow-hidden rounded-[var(--radius-lg)] border border-line"
              data-reveal
              style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={about.photo.src}
                alt={about.photo.alt}
                width={about.photo.width}
                height={about.photo.height}
                className="w-full"
              />
            </div>
          )}
        </header>
      </Container>

      <Section spacing="tight">
        <AboutPillars />
      </Section>

      <Section
        spacing="tight"
        eyebrow="THE TOOLKIT"
        title="Tools Behind the Lab"
        subtitle="What these applications are actually built with. No skill ratings — the tools are evidence enough."
      >
        <TechEcosystem />
      </Section>

      <Section spacing="tight">
        <figure
          className="rounded-[var(--radius-lg)] border border-line bg-[rgb(18_26_41/0.5)] px-7 py-12 text-center sm:px-12"
          data-reveal
        >
          <blockquote className="grad-heading text-title font-semibold sm:text-display">
            &ldquo;{philosophy.quote}&rdquo;
          </blockquote>
          <figcaption className="mx-auto mt-5 max-w-lg text-body text-ink-2">
            {philosophy.supporting}
          </figcaption>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/lab" variant="primary" arrow="right">
              See what that produced
            </Button>
            <Button href="/journey" variant="secondary">
              Read the journey
            </Button>
          </div>
        </figure>
      </Section>
    </div>
  );
}
