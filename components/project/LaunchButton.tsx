import type { LaunchConfig } from '@/content/types';
import { Button } from '@/components/ui/Button';

/**
 * ============================================================================
 * LAUNCH BUTTON
 * ============================================================================
 *
 * The three card types from your launch brief, decided entirely by data:
 *
 *   access 'public' → "Open Tool →"    opens the application
 *   access 'auth'   → "Open Tool →"    opens the application, which then
 *                                      shows its OWN login
 *   access 'none'   → "View Project →" goes to the project page here
 *   url is null     → "View Project →" regardless of access
 *
 * This site never renders a login form for your applications, never asks for
 * their credentials, never stores them and never proxies authentication. It
 * links to the application and stops there. Each application remains
 * responsible for its own auth, roles, sessions and data.
 *
 * When there is no public URL, no launch button is drawn. A button that
 * cannot launch anything is worse than no button.
 */
export function LaunchButton({
  launch,
  slug,
  variant = 'secondary',
  size = 'md',
  className,
}: {
  launch: LaunchConfig;
  slug: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const canLaunch = Boolean(launch.url) && launch.access !== 'none';

  if (!canLaunch) {
    return (
      <Button
        href={`/lab/${slug}`}
        variant={variant}
        size={size}
        arrow="right"
        className={className}
      >
        View Project
      </Button>
    );
  }

  return (
    <Button
      href={launch.url as string}
      external
      newTab={launch.openInNewTab ?? true}
      variant={variant}
      size={size}
      arrow="up-right"
      className={className}
    >
      Open Tool
    </Button>
  );
}
