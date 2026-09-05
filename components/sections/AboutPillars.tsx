import { aboutPillars } from '@/content/site';
import { Icon } from '@/components/ui/Icon';

/**
 * The three pillars (brief §29): Merchandising, AI, Product Thinking.
 * Used on the homepage preview and again on /about.
 */
export function AboutPillars() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {aboutPillars.map((pillar, i) => (
        <article
          key={pillar.title}
          className="rounded-[var(--radius-card)] border border-line bg-[rgb(18_26_41/0.45)] p-6 transition-colors duration-[var(--dur-fast)] hover:border-line-strong"
          data-reveal
          style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-[rgb(255_255_255/0.03)] text-blue">
            <Icon name={pillar.icon} size={19} />
          </span>
          <h3 className="mt-5 text-card font-semibold text-ink">{pillar.title}</h3>
          <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-2">
            {pillar.description}
          </p>
        </article>
      ))}
    </div>
  );
}
