import { hero } from '@/content/site';
import { getEcosystemProjects } from '@/lib/projects';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { HeroEcosystem } from './HeroEcosystem';

/**
 * The hero (brief §7).
 *
 * Text left, ecosystem right on desktop. On mobile the order is text → CTAs →
 * visual, which is what §36 asks for and also what a phone reader wants: the
 * claim before the decoration.
 */
export function Hero() {
  const ecosystem = getEcosystemProjects(6);

  return (
    <section className="relative flex min-h-[92vh] items-center pt-[calc(var(--nav-h)+2rem)] pb-16 lg:min-h-screen lg:pt-[var(--nav-h)]">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* ---- Text ---- */}
          <div className="max-w-xl">
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
              className="mt-6 text-body text-ink-2"
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
              <Button href={hero.primaryCta.href} variant="primary" size="lg" arrow="right">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
                {hero.secondaryCta.label}
              </Button>
            </div>

            <p
              className="mt-8 max-w-md text-[0.8125rem] text-ink-muted"
              data-reveal
              style={{ '--reveal-delay': '320ms' } as React.CSSProperties}
            >
              {hero.trustLine}
            </p>
          </div>

          {/* ---- Ecosystem ---- */}
          <div
            className="order-last w-full"
            data-reveal
            style={{ '--reveal-delay': '400ms' } as React.CSSProperties}
          >
            <HeroEcosystem projects={ecosystem} />
          </div>
        </div>
      </Container>
    </section>
  );
}
