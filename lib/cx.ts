/**
 * Joins class names, dropping anything falsy.
 *
 * Deliberately eight lines rather than a dependency. `clsx` and
 * `tailwind-merge` are excellent, but neither earns its place on a site whose
 * whole premise is that it loads fast and stays simple to maintain.
 */
export function cx(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ');
}
