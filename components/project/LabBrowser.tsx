'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ProjectCategory, ProjectWithDerived } from '@/content/types';
import {
  CATEGORY_LABELS,
  searchProjects,
  sortProjects,
  type SortKey,
} from '@/lib/projects';
import { cx } from '@/lib/cx';
import { labPage } from '@/content/site';
import { ProjectCard } from './ProjectCard';
import { EmptyState } from '@/components/ui/EmptyState';

/**
 * ============================================================================
 * THE LAB BROWSER
 * ============================================================================
 *
 * Search, category filter, access filter and sort (brief §22, §23).
 *
 * All filtering happens in the browser over data already on the page. With a
 * few dozen projects that is instant, needs no server and no search index,
 * and keeps the whole site static.
 *
 * Filter state is mirrored into the URL with history.replaceState so a
 * filtered view can be shared or bookmarked. Deliberately not useSearchParams:
 * on a static export that forces the page into client-side rendering behind a
 * Suspense boundary, which costs real page-load quality for no benefit here.
 */

type AccessFilter = 'all' | 'open' | 'login' | 'building';

const ACCESS_FILTERS: Array<{ key: AccessFilter; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'open', label: 'Open' },
  { key: 'login', label: 'Login required' },
  { key: 'building', label: 'In development' },
];

const SORTS: Array<{ key: SortKey; label: string }> = [
  { key: 'latest', label: 'Latest' },
  { key: 'az', label: 'A–Z' },
  { key: 'status', label: 'Status' },
];

export function LabBrowser({
  projects,
  categories,
}: {
  projects: ProjectWithDerived[];
  categories: ProjectCategory[];
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ProjectCategory | 'all'>('all');
  const [access, setAccess] = useState<AccessFilter>('all');
  const [sort, setSort] = useState<SortKey>('latest');

  // Restore a shared/bookmarked view once, after mount.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get('category');
    const a = params.get('access');
    const s = params.get('sort');
    const q = params.get('q');

    if (c && categories.includes(c as ProjectCategory)) {
      setCategory(c as ProjectCategory);
    }
    if (a && ACCESS_FILTERS.some((f) => f.key === a)) setAccess(a as AccessFilter);
    if (s && SORTS.some((f) => f.key === s)) setSort(s as SortKey);
    if (q) setQuery(q);
  }, [categories]);

  const syncUrl = useCallback(
    (next: Partial<{ category: string; access: string; sort: string; q: string }>) => {
      const url = new URL(window.location.href);
      const current = {
        category: category === 'all' ? '' : category,
        access: access === 'all' ? '' : access,
        sort: sort === 'latest' ? '' : sort,
        q: query,
        ...next,
      };
      for (const [key, value] of Object.entries(current)) {
        if (value) url.searchParams.set(key, value);
        else url.searchParams.delete(key);
      }
      window.history.replaceState(null, '', url);
    },
    [category, access, sort, query],
  );

  const visible = useMemo(() => {
    let list = projects;

    if (category !== 'all') {
      list = list.filter((project) => project.category === category);
    }

    if (access !== 'all') {
      list = list.filter((project) => {
        const model = project.launch.access;
        if (access === 'open') return model === 'public' && project.derived.hasLaunchUrl;
        if (access === 'login') return model === 'auth';
        return model === 'none' || !project.derived.hasLaunchUrl;
      });
    }

    return sortProjects(searchProjects(list, query), sort);
  }, [projects, category, access, query, sort]);

  const resetAll = () => {
    setQuery('');
    setCategory('all');
    setAccess('all');
    setSort('latest');
    window.history.replaceState(null, '', window.location.pathname);
  };

  const isFiltered = query !== '' || category !== 'all' || access !== 'all';

  return (
    <>
      {/* ---- Search ---- */}
      <div className="relative mb-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
        >
          <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="5.4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12.2 12.2 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            syncUrl({ q: event.target.value });
          }}
          placeholder={labPage.searchPlaceholder}
          aria-label="Search tools"
          className="h-13 w-full rounded-full border border-line bg-[rgb(18_26_41/0.55)] py-3.5 pl-12 pr-4 text-body text-ink placeholder:text-ink-muted transition-colors duration-[var(--dur-fast)] focus:border-line-accent focus:outline-none focus-visible:outline-none"
        />
      </div>

      {/* ---- Filters ---- */}
      <div className="mb-4 -mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <div className="flex gap-2" role="group" aria-label="Filter by category">
          <FilterChip
            active={category === 'all'}
            onClick={() => {
              setCategory('all');
              syncUrl({ category: '' });
            }}
          >
            All categories
          </FilterChip>
          {categories.map((key) => (
            <FilterChip
              key={key}
              active={category === key}
              onClick={() => {
                setCategory(key);
                syncUrl({ category: key });
              }}
            >
              {CATEGORY_LABELS[key]}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <div className="flex gap-2" role="group" aria-label="Filter by availability">
            {ACCESS_FILTERS.map((filter) => (
              <FilterChip
                key={filter.key}
                active={access === filter.key}
                onClick={() => {
                  setAccess(filter.key);
                  syncUrl({ access: filter.key === 'all' ? '' : filter.key });
                }}
              >
                {filter.label}
              </FilterChip>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <label htmlFor="lab-sort" className="eyebrow">
            Sort
          </label>
          <select
            id="lab-sort"
            value={sort}
            onChange={(event) => {
              const next = event.target.value as SortKey;
              setSort(next);
              syncUrl({ sort: next === 'latest' ? '' : next });
            }}
            className="h-10 rounded-full border border-line bg-[rgb(18_26_41/0.55)] px-4 text-[0.8125rem] text-ink focus:border-line-accent focus:outline-none"
          >
            {SORTS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ---- Count ---- */}
      <p className="mb-6 text-[0.8125rem] text-ink-muted" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'tool' : 'tools'}
        {isFiltered && ` of ${projects.length}`}
      </p>

      {/* ---- Results ---- */}
      {visible.length === 0 ? (
        <EmptyState
          title={labPage.emptyTitle}
          body={labPage.emptyBody}
          action={
            <button
              type="button"
              onClick={resetAll}
              className="text-[0.875rem] text-blue hover:underline"
            >
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <div key={project.id} data-reveal>
              <ProjectCard project={project} className="h-full" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        'shrink-0 rounded-full border px-4 py-2 text-[0.8125rem] transition-colors duration-[var(--dur-fast)]',
        active
          ? 'border-line-strong bg-[rgb(255_255_255/0.08)] text-ink'
          : 'border-line text-ink-2 hover:border-line-strong hover:text-ink',
      )}
    >
      {children}
    </button>
  );
}
