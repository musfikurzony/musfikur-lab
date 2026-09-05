import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { LogoMark } from '@/components/brand/LogoMark';

/**
 * The 404 page.
 *
 * Cloudflare serves this via `not_found_handling = "404-page"` in
 * wrangler.toml, so a mistyped address gets this rather than a bare edge
 * error.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center pt-[var(--nav-h)]">
      <Container size="narrow">
        <div className="text-center">
          <LogoMark size={40} gradient gradientId="notfound-mark" className="mx-auto" />

          <p className="eyebrow mt-8">404</p>
          <h1 className="grad-heading mt-4 text-display font-semibold">
            This page could not be found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-body text-ink-2">
            The link may be out of date, or the page may have moved. Everything
            in the lab is reachable from the pages below.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/lab" variant="primary" arrow="right">
              Open the AI Lab
            </Button>
            <Button href="/" variant="secondary">
              Back to home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
