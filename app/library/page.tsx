import type { Metadata } from 'next';
import { librarySections } from '@/content/library';
import { isLibraryActivated } from '@/lib/supabase';
import { Container } from '@/components/layout/Container';
import { SiteBackground } from '@/components/background/SiteBackground';
import { LibraryClient } from './LibraryClient';

/**
 * /library — the private area (brief §52–§57).
 *
 * Visually separate from the Lab: warmer ground, brass accent, no drifting
 * orbs, no pulsing dots, no reveal animation. A reading room, not a dashboard.
 *
 * `noindex` keeps it out of search listings — but note clearly that this is
 * not what protects it. Robots directives are a request to well-behaved
 * crawlers, nothing more. The real boundary is Supabase Auth plus Row Level
 * Security on the data itself.
 */
export const metadata: Metadata = {
  title: 'Private Library',
  description: 'A personal collection for reading and study.',
  robots: { index: false, follow: false, nocache: true },
};

export default function LibraryPage() {
  return (
    <>
      {/* Overrides the site background for this route only. */}
      <SiteBackground mood="calm" />

      <div className="pt-[calc(var(--nav-h)+4rem)] pb-24 sm:pb-32">
        <Container size="narrow">
          <header className="mb-10 text-center">
            <p className="eyebrow">Personal</p>
            <h1 className="mt-4 text-display font-semibold text-ink">
              My Private Library
            </h1>
          </header>

          <LibraryClient
            sections={librarySections}
            activated={isLibraryActivated()}
          />
        </Container>
      </div>
    </>
  );
}
