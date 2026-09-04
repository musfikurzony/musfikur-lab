import Link from 'next/link';
import { footer, libraryLink, navLinks, site } from '@/content/site';
import { Container } from './Container';
import { LogoMark } from '@/components/brand/LogoMark';
import { Button } from '@/components/ui/Button';

/**
 * Footer (brief §32).
 *
 * Three columns on desktop, stacked on mobile. The private Library sits here
 * as a discreet link rather than in the header — findable if you know to look
 * for it, not advertised to every visitor (brief §60).
 */
export function Footer() {
  const social = Object.entries(site.social).filter(([, value]) => value);

  return (
    <footer className="relative mt-8 border-t border-line">
      <Container>
        <div className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.2fr_1fr_auto] lg:gap-16">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark size={26} className="text-blue" />
              <span className="text-[0.9375rem] font-semibold tracking-[0.06em]">
                {site.name.toUpperCase()}
              </span>
            </div>
            <p className="mt-3 text-[0.875rem] text-ink-muted">
              {site.descriptor}
            </p>
            <p className="mt-5 max-w-xs text-[0.875rem] leading-relaxed text-ink-2">
              {site.philosophy}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="eyebrow mb-4">Explore</h2>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.875rem] text-ink-2 transition-colors duration-[var(--dur-fast)] hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Call to action */}
          <div className="flex flex-col items-start gap-5 lg:items-end">
            <Button href={footer.cta.href} variant="secondary" arrow="right">
              {footer.cta.label}
            </Button>

            {social.length > 0 && (
              <ul className="flex gap-4">
                {social.map(([key, value]) => (
                  <li key={key}>
                    <a
                      href={key === 'email' ? `mailto:${value}` : value}
                      className="text-[0.8125rem] capitalize text-ink-muted transition-colors hover:text-ink-2"
                      {...(key === 'email'
                        ? {}
                        : { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      {key}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <hr className="rule" />

        <div className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[0.8125rem] text-ink-muted">{footer.copyright}</p>
            <p className="text-[0.8125rem] text-ink-muted/80">{footer.tagline}</p>
          </div>

          <Link
            href={libraryLink.href}
            className="inline-flex items-center gap-2 self-start text-[0.8125rem] text-ink-muted transition-colors duration-[var(--dur-fast)] hover:text-ink-2 sm:self-auto"
          >
            <LockIcon />
            {libraryLink.label}
          </Link>
        </div>
      </Container>
    </footer>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect
        x="2.5"
        y="6"
        width="9"
        height="6.5"
        rx="1.6"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M4.75 6V4.25a2.25 2.25 0 0 1 4.5 0V6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
