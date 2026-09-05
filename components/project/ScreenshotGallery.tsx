import type { Screenshot } from '@/content/types';

/**
 * Screenshots (brief §25).
 *
 * When a project has none, this shows a clean placeholder that says so — it
 * never shows a fake screenshot or a stock dashboard image.
 *
 * Every image carries explicit width and height so the page does not jump as
 * they load, and lazy loading keeps them off the critical path.
 */
export function ScreenshotGallery({
  screenshots,
  projectName,
}: {
  screenshots: Screenshot[];
  projectName: string;
}) {
  if (screenshots.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-[var(--radius-lg)] border border-dashed border-line px-6 py-14 text-center">
        <svg width="64" height="46" viewBox="0 0 64 46" fill="none" aria-hidden="true" className="opacity-50">
          <rect x="1" y="1" width="62" height="44" rx="5" stroke="rgb(255 255 255 / 0.16)" strokeDasharray="4 4" />
          <rect x="9" y="9" width="20" height="4" rx="2" fill="rgb(255 255 255 / 0.14)" />
          <rect x="9" y="18" width="46" height="3" rx="1.5" fill="rgb(255 255 255 / 0.08)" />
          <rect x="9" y="25" width="38" height="3" rx="1.5" fill="rgb(255 255 255 / 0.06)" />
          <rect x="9" y="32" width="28" height="3" rx="1.5" fill="rgb(255 255 255 / 0.05)" />
        </svg>
        <p className="mt-5 text-[0.875rem] text-ink-2">No screenshots yet</p>
        <p className="mt-1.5 max-w-sm text-[0.8125rem] text-ink-muted">
          Add images to <code className="text-ink-2">public/screenshots/</code> and list
          them in the project record to show them here.
        </p>
      </div>
    );
  }

  const [main, ...supporting] = screenshots;

  return (
    <div>
      <figure className="overflow-hidden rounded-[var(--radius-lg)] border border-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={main.src}
          alt={main.alt}
          width={main.width}
          height={main.height}
          className="w-full"
        />
        {main.caption && (
          <figcaption className="border-t border-line px-5 py-3 text-[0.8125rem] text-ink-muted">
            {main.caption}
          </figcaption>
        )}
      </figure>

      {supporting.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {supporting.map((shot) => (
            <figure
              key={shot.src}
              className="overflow-hidden rounded-[var(--radius-card)] border border-line"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                loading="lazy"
                decoding="async"
                className="w-full"
              />
              {shot.caption && (
                <figcaption className="border-t border-line px-4 py-2.5 text-[0.75rem] text-ink-muted">
                  {shot.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      <p className="sr-only">Screenshots of {projectName}.</p>
    </div>
  );
}
