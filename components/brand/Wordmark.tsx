import Link from 'next/link';
import { site } from '@/content/site';
import { LogoMark } from './LogoMark';

/**
 * Mark + name, used in the nav and footer.
 * `stacked` adds the small descriptor line beneath the name.
 */
export function Wordmark({
  stacked = false,
  size = 26,
}: {
  stacked?: boolean;
  size?: number;
}) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-85"
      aria-label={`${site.name} — home`}
    >
      <LogoMark
        size={size}
        className="text-blue transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span className="text-[0.9375rem] font-semibold tracking-[0.06em] text-ink">
          {site.shortName}
        </span>
        {stacked && (
          <span className="mt-1 text-[0.6875rem] font-medium tracking-[0.18em] text-ink-muted">
            AI LAB
          </span>
        )}
      </span>
    </Link>
  );
}
