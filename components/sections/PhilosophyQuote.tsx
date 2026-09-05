import { philosophy } from '@/content/site';
import { Container } from '@/components/layout/Container';

/**
 * The philosophy section (brief §30).
 *
 * Deliberately the quietest block on the site: one line, one supporting
 * sentence, a great deal of space. It earns its weight by having nothing
 * around it.
 */
export function PhilosophyQuote() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40">
      <Container size="narrow">
        <figure className="text-center">
          <blockquote
            className="grad-heading text-display font-semibold"
            data-reveal
          >
            &ldquo;{philosophy.quote}&rdquo;
          </blockquote>
          <figcaption
            className="mx-auto mt-7 max-w-lg text-body text-ink-2"
            data-reveal
            style={{ '--reveal-delay': '100ms' } as React.CSSProperties}
          >
            {philosophy.supporting}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
