import { stats } from '@/content/site';
import { getToolCountLabel } from '@/lib/projects';
import { Container } from '@/components/layout/Container';

/**
 * The metrics strip (brief §11).
 *
 * The tool count is CALCULATED from projects.ts, never typed by hand, so it
 * can never be wrong or go stale. The other three are qualitative on purpose:
 * your brief said not to invent numbers, and there are no real ones to show.
 */
export function StatsStrip() {
  const items = [
    { label: stats.toolsLabel, value: getToolCountLabel() },
    { label: stats.buildsLabel, value: stats.buildsValue },
    { label: stats.focusLabel, value: stats.focusValue },
    { label: stats.domainLabel, value: stats.domainValue },
  ];

  return (
    <section className="relative border-y border-line bg-[rgb(13_19_32/0.4)]">
      <Container>
        <dl className="grid grid-cols-2 gap-px lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              className="px-1 py-8 sm:py-10"
              data-reveal
              style={{ '--reveal-delay': `${i * 70}ms` } as React.CSSProperties}
            >
              <dt className="eyebrow">{item.label}</dt>
              <dd className="mt-2.5 text-[1.375rem] font-semibold text-ink sm:text-[1.5rem]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
