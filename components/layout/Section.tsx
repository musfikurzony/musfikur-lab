import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Container } from './Container';

/**
 * A page section with consistent vertical rhythm and an optional header.
 *
 * Every major block on the site uses this, which is what keeps the spacing
 * even. Change the padding values here and the whole site re-spaces together.
 */
export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'left',
  spacing = 'default',
  containerSize = 'default',
  headerAction,
  className,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  spacing?: 'default' | 'tight' | 'loose';
  containerSize?: 'default' | 'narrow' | 'wide';
  /** Optional control shown opposite the heading, e.g. a "View all →" link. */
  headerAction?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const hasHeader = Boolean(eyebrow || title || subtitle);
  const hasAction = Boolean(headerAction);

  return (
    <section
      id={id}
      className={cx(
        'relative',
        spacing === 'default' && 'py-20 sm:py-24 lg:py-32',
        spacing === 'tight' && 'py-14 sm:py-16 lg:py-20',
        spacing === 'loose' && 'py-24 sm:py-32 lg:py-40',
        className,
      )}
    >
      <Container size={containerSize}>
        {hasHeader && (
          <div
            className={cx(
              'mb-12 flex flex-col gap-6 sm:mb-14 lg:mb-16',
              hasAction && 'sm:flex-row sm:items-end sm:justify-between',
            )}
          >
            <div
              className={cx(
                'max-w-2xl',
                align === 'center' && 'mx-auto text-center',
              )}
            >
              {eyebrow && (
                <p className="eyebrow mb-4" data-reveal>
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2
                  className="grad-heading text-display font-semibold"
                  data-reveal
                  style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p
                  className="mt-4 text-body text-ink-2"
                  data-reveal
                  style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
                >
                  {subtitle}
                </p>
              )}
            </div>

            {hasAction && (
              <div
                className="shrink-0"
                data-reveal
                style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
              >
                {headerAction}
              </div>
            )}
          </div>
        )}

        {children}
      </Container>
    </section>
  );
}
