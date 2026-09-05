import { processStages } from '@/content/site';
import { Section } from '@/components/layout/Section';

/**
 * From Problem to Product (brief §26).
 *
 * Six stages on a connecting line. The line is a real gradient rule rather
 * than an image, and each stage reveals in sequence as you scroll — which is
 * the animation the brief asks for, done with the same IntersectionObserver
 * the rest of the site uses.
 *
 * Horizontal on desktop, vertical on mobile. A six-stage horizontal flow
 * squeezed into 390px is unreadable, so the layout changes rather than
 * shrinks.
 */
export function ProblemToProduct() {
  return (
    <Section
      eyebrow="THE METHOD"
      title="From Problem to Product"
      subtitle="Not AI demos. A repeatable way of turning something that wastes time into something that saves it."
    >
      <div className="relative">
        {/* Connecting line — horizontal on desktop, vertical on mobile */}
        <div
          aria-hidden="true"
          className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px lg:left-0 lg:top-[19px] lg:h-px lg:w-full"
          style={{
            background:
              'linear-gradient(var(--flow-dir, to bottom), transparent, rgb(255 255 255 / 0.14) 8%, rgb(255 255 255 / 0.14) 92%, transparent)',
          }}
        />

        <ol className="relative grid gap-8 lg:grid-cols-6 lg:gap-4">
          {processStages.map((stage, i) => (
            <li
              key={stage.step}
              className="relative flex gap-4 lg:flex-col lg:gap-0"
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
            >
              {/* Node */}
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-[rgb(13_19_32/0.95)] text-[0.6875rem] font-semibold tracking-[0.06em] text-blue">
                {stage.step}
              </span>

              <div className="lg:mt-5 lg:pr-4">
                <h3 className="text-[1rem] font-semibold text-ink">{stage.title}</h3>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-2">
                  {stage.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
