import type { Metadata } from 'next';
import { journeyPage } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { JourneyTimeline } from '@/components/sections/JourneyTimeline';
import { ProblemToProduct } from '@/components/sections/ProblemToProduct';

export const metadata: Metadata = {
  title: 'The Journey',
  description:
    'How the work moved from small experiments to working systems — the milestones behind the tools.',
  alternates: { canonical: '/journey' },
};

export default function JourneyPage() {
  return (
    <div className="pt-[calc(var(--nav-h)+3.5rem)] pb-8">
      <Container>
        <header className="mb-14 max-w-2xl">
          <p className="eyebrow" data-reveal>
            {journeyPage.eyebrow}
          </p>
          <h1
            className="grad-heading mt-4 text-display font-semibold"
            data-reveal
            style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
          >
            {journeyPage.title}
          </h1>
          <p
            className="mt-4 text-body text-ink-2"
            data-reveal
            style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
          >
            {journeyPage.subtitle}
          </p>
        </header>

        <JourneyTimeline />
      </Container>

      <ProblemToProduct />

      <Section spacing="tight">
        <div
          className="rounded-[var(--radius-lg)] border border-line bg-[rgb(18_26_41/0.5)] px-7 py-10 text-center sm:px-10"
          data-reveal
        >
          <h2 className="text-title font-semibold text-ink">
            The tools this produced
          </h2>
          <p className="mx-auto mt-3 max-w-md text-body text-ink-2">
            Each milestone above left something working behind it.
          </p>
          <div className="mt-7">
            <Button href="/lab" variant="primary" arrow="right">
              Open the AI Lab
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
