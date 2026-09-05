'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Moment, MomentCategory } from '@/content/types';
import { cx } from '@/lib/cx';
import { formatFullDate } from '@/lib/format';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { EmptyState } from '@/components/ui/EmptyState';

/**
 * ============================================================================
 * MOMENTS GALLERY
 * ============================================================================
 *
 * Masonry gallery with category filters, year grouping and a keyboard-
 * accessible lightbox (brief §51).
 *
 * Masonry is CSS columns rather than a JavaScript layout library: no
 * measuring, no reflow on resize, no dependency. The trade-off is that items
 * flow top-to-bottom within a column rather than left-to-right — acceptable
 * here, because within a year group the order is not meaningful to a reader.
 *
 * The category filter is kept in the URL (?c=family) so a filtered view can be
 * shared, using history.replaceState rather than useSearchParams. On a static
 * export useSearchParams forces the page into client-side rendering behind a
 * Suspense boundary; this achieves the same result with none of that.
 */

const CATEGORY_LABELS: Record<MomentCategory | 'all', string> = {
  all: 'All',
  family: 'Family',
  travel: 'Travel',
  work: 'Work',
  nature: 'Nature',
  special: 'Special',
  other: 'Other',
};

export function MomentsGallery({ moments }: { moments: Moment[] }) {
  const [category, setCategory] = useState<MomentCategory | 'all'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Read the shared filter out of the URL once, after mount.
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('c');
    if (value && value in CATEGORY_LABELS) {
      setCategory(value as MomentCategory | 'all');
    }
  }, []);

  const changeCategory = useCallback((next: MomentCategory | 'all') => {
    setCategory(next);
    const url = new URL(window.location.href);
    if (next === 'all') url.searchParams.delete('c');
    else url.searchParams.set('c', next);
    window.history.replaceState(null, '', url);
  }, []);

  /** Only show filters for categories that actually contain something. */
  const availableCategories = useMemo(() => {
    const present = new Set(moments.map((moment) => moment.category));
    return (['all', 'family', 'travel', 'work', 'nature', 'special', 'other'] as const).filter(
      (key) => key === 'all' || present.has(key),
    );
  }, [moments]);

  const filtered = useMemo(() => {
    const list =
      category === 'all'
        ? moments
        : moments.filter((moment) => moment.category === category);
    return [...list].sort((a, b) => b.date.localeCompare(a.date));
  }, [moments, category]);

  /** Newest year first. */
  const byYear = useMemo(() => {
    const groups = new Map<string, Moment[]>();
    for (const moment of filtered) {
      const year = moment.date.slice(0, 4);
      const existing = groups.get(year);
      if (existing) existing.push(moment);
      else groups.set(year, [moment]);
    }
    return [...groups.entries()];
  }, [filtered]);

  if (moments.length === 0) {
    return (
      <EmptyState
        title="No moments yet"
        body="This archive is empty. Photographs added to content/moments.ts will appear here, newest first."
      />
    );
  }

  return (
    <>
      {availableCategories.length > 2 && (
        <div className="-mx-4 mb-10 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <div className="flex gap-2" role="group" aria-label="Filter by category">
            {availableCategories.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => changeCategory(key)}
                aria-pressed={category === key}
                className={cx(
                  'shrink-0 rounded-full border px-4 py-2 text-[0.8125rem] transition-colors duration-[var(--dur-fast)]',
                  category === key
                    ? 'border-line-strong bg-[rgb(255_255_255/0.08)] text-ink'
                    : 'border-line text-ink-2 hover:border-line-strong hover:text-ink',
                )}
              >
                {CATEGORY_LABELS[key]}
              </button>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          title="Nothing in this category"
          body="Try another category."
          action={
            <button
              type="button"
              onClick={() => changeCategory('all')}
              className="text-[0.875rem] text-blue hover:underline"
            >
              Show all moments
            </button>
          }
        />
      ) : (
        byYear.map(([year, items]) => (
          <section key={year} className="mb-14 last:mb-0">
            <h2 className="eyebrow mb-6">{year}</h2>
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
              {items.map((moment) => (
                <MomentTile
                  key={moment.id}
                  moment={moment}
                  onOpen={() =>
                    setOpenIndex(filtered.findIndex((m) => m.id === moment.id))
                  }
                />
              ))}
            </div>
          </section>
        ))
      )}

      {openIndex !== null && (
        <Lightbox
          moments={filtered}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}

/* ==========================================================================
   TILE
   ========================================================================== */

function MomentTile({
  moment,
  onOpen,
}: {
  moment: Moment;
  onOpen: () => void;
}) {
  const { media } = moment;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group/tile block w-full overflow-hidden rounded-[var(--radius-card)] border border-line text-left transition-all duration-[var(--dur-base)] hover:border-line-strong hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative overflow-hidden bg-[rgb(255_255_255/0.03)]">
        {media.type === 'video' ? (
          <>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={media.src}
              poster={media.poster}
              width={media.width}
              height={media.height}
              muted
              playsInline
              preload="none"
              aria-label={media.alt}
              className="w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/tile:scale-[1.03]"
            />
            <span className="absolute bottom-3 right-3 rounded-full bg-[rgb(7_11_20/0.75)] px-2.5 py-1 text-[0.6875rem] text-ink backdrop-blur-sm">
              Video
            </span>
          </>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            loading="lazy"
            decoding="async"
            className="w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/tile:scale-[1.03]"
          />
        )}
      </div>

      <div className="px-4 py-3.5">
        <p className="text-[0.875rem] font-medium text-ink">{moment.title}</p>
        <p className="mt-1 text-[0.75rem] text-ink-muted">
          {formatFullDate(moment.date)}
          {moment.location && ` · ${moment.location}`}
        </p>
      </div>
    </button>
  );
}

/* ==========================================================================
   LIGHTBOX
   ========================================================================== */

function Lightbox({
  moments,
  index,
  onIndexChange,
  onClose,
}: {
  moments: Moment[];
  index: number;
  onIndexChange: (next: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const moment = moments[index];

  useLockBodyScroll(true);

  const go = useCallback(
    (delta: number) => {
      const next = (index + delta + moments.length) % moments.length;
      onIndexChange(next);
    },
    [index, moments.length, onIndexChange],
  );

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
      // Keep focus inside the dialog.
      if (event.key === 'Tab') {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [go, onClose]);

  if (!moment) return null;
  const { media } = moment;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={moment.title}
      className="fixed inset-0 z-[70] flex flex-col bg-[rgb(4_7_13/0.94)] backdrop-blur-lg"
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 60) go(delta < 0 ? 1 : -1);
        touchStartX.current = null;
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <p className="text-[0.8125rem] text-ink-muted">
          {index + 1} of {moments.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
        {moments.length > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-[rgb(13_19_32/0.8)] text-ink-2 transition-colors hover:text-ink sm:left-4"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {media.type === 'video' ? (
          /* eslint-disable-next-line jsx-a11y/media-has-caption */
          <video
            src={media.src}
            poster={media.poster}
            controls
            autoPlay
            playsInline
            aria-label={media.alt}
            className="max-h-full max-w-full rounded-xl"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            className="max-h-full w-auto max-w-full rounded-xl object-contain"
          />
        )}

        {moments.length > 1 && (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-[rgb(13_19_32/0.8)] text-ink-2 transition-colors hover:text-ink sm:right-4"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M7 3l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      <div className="px-4 py-6 text-center sm:px-6">
        <p className="text-card font-medium text-ink">{moment.title}</p>
        <p className="mt-1.5 text-[0.8125rem] text-ink-muted">
          {formatFullDate(moment.date)}
          {moment.location && ` · ${moment.location}`}
        </p>
        {moment.caption && (
          <p className="mx-auto mt-3 max-w-xl text-[0.875rem] text-ink-2">
            {moment.caption}
          </p>
        )}
      </div>
    </div>
  );
}
