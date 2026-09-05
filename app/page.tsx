import Link from 'next/link';
import { about, site } from '@/content/site';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Hero } from '@/components/sections/Hero';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { LatestBuilds } from '@/components/sections/LatestBuilds';
import { FeaturedBento } from '@/components/sections/FeaturedBento';
import { ProblemToProduct } from '@/components/sections/ProblemToProduct';
import { CurrentlyBuilding } from '@/components/sections/CurrentlyBuilding';
import { JourneyTimeline } from '@/components/sections/JourneyTimeline';
import { AboutPillars } from '@/components/sections/AboutPillars';
import { TechEcosystem } from '@/components/sections/TechEcosystem';
import { MomentsPreview } from '@/components/sections/MomentsPreview';
import { PhilosophyQuote } from '@/components/sections/PhilosophyQuote';

/**
 * The homepage.
 *
 * Section order follows the visual hierarchy from your brief (§25, §50):
 * who → what → the tools → how they get made → what's being built now →
 * the story → the person → the personal side → the belief.
 *
 * This file composes; it does not contain content. Every section reads from
 * content/. Sections whose data is empty remove themselves — the Moments
 * preview and Currently Building both disappear rather than render a hollow
 * frame.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <LatestBuilds />
      <FeaturedBento />
      <ProblemToProduct />
      <CurrentlyBuilding />

      {/* Journey preview — three milestones, then the full page */}
      <Section
        eyebrow="THE STORY"
        title="The Journey"
        subtitle="How the work moved from small experiments to working systems."
        headerAction={
          <Button href="/journey" variant="secondary" arrow="right">
            See the full journey
          </Button>
        }
      >
        <JourneyTimeline limit={3} />
      </Section>

      {/* About preview — the three pillars, then the full page */}
      <Section
        eyebrow="WHO IS BEHIND IT"
        title={about.title}
        subtitle={about.intro}
        headerAction={
          <Button href="/about" variant="secondary" arrow="right">
            More about me
          </Button>
        }
      >
        <AboutPillars />
      </Section>

      <Section
        spacing="tight"
        eyebrow="THE TOOLKIT"
        title="Tools Behind the Lab"
        subtitle="What these applications are actually built with."
      >
        <TechEcosystem />
      </Section>

      <MomentsPreview />
      <PhilosophyQuote />

      {/* Closing call to action */}
      <Section spacing="tight">
        <div
          className="relative overflow-hidden rounded-[var(--radius-lg)] border border-line bg-[rgb(18_26_41/0.55)] px-7 py-12 text-center sm:px-10 sm:py-16"
          data-reveal
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle at center, rgb(79 140 255 / 0.22) 0%, transparent 68%)',
            }}
          />
          <h2 className="grad-heading relative text-display font-semibold">
            Have a look around the lab
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-body text-ink-2">
            Every tool here started as something that was taking too long by hand.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/lab" variant="primary" size="lg" arrow="right">
              Explore My AI Lab
            </Button>
            <Button href="/about" variant="secondary" size="lg">
              About {site.name.split(' ')[0]}
            </Button>
          </div>
          <p className="relative mt-8 text-[0.8125rem] text-ink-muted">
            Or read{' '}
            <Link href="/journey" className="text-ink-2 underline underline-offset-4 hover:text-ink">
              how it developed
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
