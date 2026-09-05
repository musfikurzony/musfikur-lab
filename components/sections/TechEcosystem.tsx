import { technologies } from '@/content/site';

/**
 * Tools Behind the Lab (brief §31).
 *
 * Pills with a short note on how each is used. No percentages, no skill bars,
 * no "React 90%" — those numbers are invented by definition, and your brief
 * ruled them out.
 */
export function TechEcosystem() {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {technologies.map((tech, i) => (
        <li
          key={tech.name}
          data-reveal
          style={{ '--reveal-delay': `${i * 40}ms` } as React.CSSProperties}
        >
          <span
            className="group/pill inline-flex items-center gap-2.5 rounded-full border border-line bg-[rgb(255_255_255/0.03)] px-4 py-2.5 transition-colors duration-[var(--dur-fast)] hover:border-line-strong"
            title={tech.note}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-blue/60 transition-colors group-hover/pill:bg-blue"
            />
            <span className="text-[0.875rem] text-ink">{tech.name}</span>
            <span className="hidden text-[0.75rem] text-ink-muted sm:inline">
              {tech.note}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
