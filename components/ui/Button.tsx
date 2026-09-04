import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/cx';

type Variant = 'primary' | 'secondary' | 'ghost' | 'brass';
type Size = 'sm' | 'md' | 'lg';

const BASE =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
  'whitespace-nowrap transition-all duration-[var(--dur-fast)] ease-[var(--ease-soft)] ' +
  'disabled:pointer-events-none disabled:opacity-45';

const VARIANTS: Record<Variant, string> = {
  // The one strong call to action. Used sparingly — at most one per view.
  primary:
    'text-white shadow-[0_1px_0_0_rgb(255_255_255/0.18)_inset,0_8px_24px_-10px_rgb(79_140_255/0.75)] ' +
    'bg-[image:var(--grad-brand)] hover:brightness-110 hover:shadow-[0_1px_0_0_rgb(255_255_255/0.22)_inset,0_12px_32px_-10px_rgb(79_140_255/0.9)]',
  // The default for everything else: glass, hairline border.
  secondary:
    'glass text-ink hover:border-line-strong hover:bg-[rgb(24_34_53/0.72)]',
  ghost:
    'text-ink-2 hover:text-ink hover:bg-[rgb(255_255_255/0.05)]',
  // Library only.
  brass:
    'border border-[rgb(201_162_39/0.35)] bg-[rgb(201_162_39/0.1)] text-[#E6C868] hover:bg-[rgb(201_162_39/0.16)]',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.8125rem]',
  md: 'h-11 px-5 text-[0.875rem]',
  lg: 'h-[3.25rem] px-7 text-[0.9375rem]',
};

/** The nudge-right arrow used across the site. */
export function Arrow({ direction = 'right' }: { direction?: 'right' | 'up-right' }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cx(
        'transition-transform duration-[var(--dur-fast)] ease-[var(--ease-soft)]',
        direction === 'right'
          ? 'group-hover/btn:translate-x-1'
          : 'group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5',
      )}
    >
      {direction === 'right' ? (
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M5 11L11 5M11 5H6M11 5v5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Adds the animated arrow after the label. */
  arrow?: false | 'right' | 'up-right';
}

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
  newTab?: boolean;
};

type NativeProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/**
 * One button for the whole site.
 *
 * Renders an <a> when given `href` and a <button> otherwise, so semantics
 * stay correct: things that navigate are links, things that act are buttons.
 * External links get rel="noopener noreferrer" automatically.
 */
export function Button(props: LinkProps | NativeProps) {
  const {
    variant = 'secondary',
    size = 'md',
    className,
    children,
    arrow = false,
  } = props;

  const classes = cx(BASE, VARIANTS[variant], SIZES[size], className);
  const content = (
    <>
      {children}
      {arrow && <Arrow direction={arrow === 'up-right' ? 'up-right' : 'right'} />}
    </>
  );

  if ('href' in props && props.href) {
    const { href, external, newTab } = props;
    const isExternal = external ?? /^https?:\/\//.test(href);
    const opensNewTab = newTab ?? isExternal;

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          {...(opensNewTab
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    arrow: _a,
    ...rest
  } = props as NativeProps;

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
