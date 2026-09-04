import type { ElementType, ReactNode } from 'react';
import { cx } from '@/lib/cx';

/**
 * The horizontal shell. One max-width, one set of responsive gutters,
 * used by every section on the site so nothing drifts out of alignment.
 *
 * Gutters: 16px mobile → 24px tablet → 32px desktop (brief §5).
 */
export function Container({
  as: Tag = 'div',
  size = 'default',
  className,
  children,
}: {
  as?: ElementType;
  size?: 'default' | 'narrow' | 'wide';
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cx(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        size === 'default' && 'max-w-[var(--shell)]',
        size === 'narrow' && 'max-w-[820px]',
        size === 'wide' && 'max-w-[1440px]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
