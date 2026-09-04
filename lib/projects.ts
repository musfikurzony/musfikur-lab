import { projects } from '@/content/projects';
import type {
  AccessModel,
  Project,
  ProjectCategory,
  ProjectStatus,
  ProjectWithDerived,
} from '@/content/types';
import { derive, recencyScore } from './format';

/**
 * ============================================================================
 * PROJECT SELECTORS
 * ============================================================================
 *
 * The single place any component asks a question about projects. Components
 * never filter or sort the raw array themselves — that is how two sections
 * end up disagreeing about which tool is newest.
 */

/* ==========================================================================
   LABELS
   Display names for the enums. Change a label here and it changes on the
   cards, the filters, the detail pages and the search index together.
   ========================================================================== */

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  merchandising: 'Apparel & Merchandising',
  logistics: 'Logistics',
  business: 'Business Operations',
  finance: 'Finance',
  productivity: 'Productivity & Experiments',
};

/** Compact form for the small badge on a card. */
export const CATEGORY_SHORT: Record<ProjectCategory, string> = {
  merchandising: 'Merchandising',
  logistics: 'Logistics',
  business: 'Business',
  finance: 'Finance',
  productivity: 'Productivity',
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  live: 'Live',
  active: 'Active',
  beta: 'Beta',
  development: 'Development',
  experiment: 'Experiment',
  evolving: 'Evolving',
  archived: 'Archived',
};

export const ACCESS_LABELS: Record<AccessModel, string> = {
  public: 'Open',
  auth: 'Login Required',
  none: 'No public URL yet',
};

/* ==========================================================================
   CORE ACCESS
   ========================================================================== */

/** Every project, each with its computed version, date and badge state. */
export function getAllProjects(): ProjectWithDerived[] {
  return projects.map((project) => ({ ...project, derived: derive(project) }));
}

export function getProjectBySlug(slug: string): ProjectWithDerived | null {
  const project = projects.find((candidate) => candidate.slug === slug);
  return project ? { ...project, derived: derive(project) } : null;
}

/** Feeds generateStaticParams, so every project gets a real HTML page. */
export function getAllSlugs(): string[] {
  return projects.map((project) => project.slug);
}

/* ==========================================================================
   CURATED VIEWS
   ========================================================================== */

/**
 * Newest first, undated projects last (see recencyScore).
 * Ties keep the order they appear in content/projects.ts, so the result is
 * stable and predictable while you have no dates recorded.
 */
export function getLatestProjects(limit?: number): ProjectWithDerived[] {
  const sorted = [...getAllProjects()].sort(
    (a, b) => recencyScore(b) - recencyScore(a),
  );
  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
}

/** The homepage bento grid. featuredOrder 1 is the large card. */
export function getFeaturedProjects(limit = 6): ProjectWithDerived[] {
  return getAllProjects()
    .filter((project) => project.isFeatured)
    .sort(
      (a, b) =>
        (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) -
        (b.featuredOrder ?? Number.MAX_SAFE_INTEGER),
    )
    .slice(0, limit);
}

/** Drives the "Currently Building" section. */
export function getCurrentlyBuilding(): ProjectWithDerived[] {
  return getAllProjects().filter((project) => project.isCurrentlyBuilding);
}

/** The six cards floating in the hero ecosystem visual. */
export function getEcosystemProjects(limit = 6): ProjectWithDerived[] {
  const featured = getFeaturedProjects(limit);
  if (featured.length >= limit) return featured;

  const seen = new Set(featured.map((project) => project.id));
  const filler = getLatestProjects().filter((project) => !seen.has(project.id));
  return [...featured, ...filler].slice(0, limit);
}

export function getProjectsByCategory(
  category: ProjectCategory,
): ProjectWithDerived[] {
  return getAllProjects().filter((project) => project.category === category);
}

/** Only categories that actually contain something — no empty filter chips. */
export function getUsedCategories(): ProjectCategory[] {
  const order: ProjectCategory[] = [
    'merchandising',
    'logistics',
    'business',
    'finance',
    'productivity',
  ];
  const present = new Set(projects.map((project) => project.category));
  return order.filter((category) => present.has(category));
}

/* ==========================================================================
   COUNTS
   ========================================================================== */

/**
 * The homepage stat. Calculated, never typed by hand, so it cannot drift.
 * Rounds down to the nearest 5 and adds a "+" once past 10 — "20+ tools"
 * reads better than "23 tools" and stays true as the number grows.
 */
export function getToolCountLabel(): string {
  const total = projects.length;
  if (total <= 10) return String(total);
  return `${Math.floor(total / 5) * 5}+`;
}

export function getToolCount(): number {
  return projects.length;
}

/* ==========================================================================
   SEARCH
   ========================================================================== */

/**
 * Substring match across the fields a person would actually type.
 *
 * No fuzzy-search library. With a few dozen projects this is instant, and a
 * dependency that adds 15KB to save eight lines is a bad trade on a site
 * whose main claim is that it loads fast.
 */
export function searchProjects(
  list: ProjectWithDerived[],
  query: string,
): ProjectWithDerived[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return list;

  return list.filter((project) => {
    const haystack = [
      project.name,
      project.tagline,
      project.shortDescription,
      CATEGORY_LABELS[project.category],
      STATUS_LABELS[project.status],
      ...project.tags,
      ...project.features,
      ...project.technologies,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(needle);
  });
}

/* ==========================================================================
   SORTING FOR THE LAB PAGE
   ========================================================================== */

export type SortKey = 'latest' | 'az' | 'status';

const STATUS_ORDER: ProjectStatus[] = [
  'live',
  'active',
  'beta',
  'development',
  'evolving',
  'experiment',
  'archived',
];

export function sortProjects(
  list: ProjectWithDerived[],
  key: SortKey,
): ProjectWithDerived[] {
  const copy = [...list];

  switch (key) {
    case 'az':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'status':
      return copy.sort(
        (a, b) =>
          STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status) ||
          a.name.localeCompare(b.name),
      );
    case 'latest':
    default:
      return copy.sort((a, b) => recencyScore(b) - recencyScore(a));
  }
}

/* ==========================================================================
   INTEGRITY CHECK
   ========================================================================== */

/**
 * Catches content mistakes at build time rather than in production.
 *
 * Runs once when this module is first imported during the build. A duplicate
 * slug would silently make one project's page unreachable; version history in
 * the wrong order would show the wrong "current" version everywhere. Both are
 * easy to introduce by hand and invisible until someone notices the site is
 * lying, so the build stops instead.
 */
function assertContentIsValid(): void {
  const seenSlugs = new Set<string>();
  const seenIds = new Set<string>();

  for (const project of projects) {
    if (seenSlugs.has(project.slug)) {
      throw new Error(
        `content/projects.ts: duplicate slug "${project.slug}". Slugs become URLs and must be unique.`,
      );
    }
    seenSlugs.add(project.slug);

    if (seenIds.has(project.id)) {
      throw new Error(
        `content/projects.ts: duplicate id "${project.id}".`,
      );
    }
    seenIds.add(project.id);

    const dates = project.versionHistory
      .map((entry) => entry.date)
      .filter(Boolean);

    for (let i = 1; i < dates.length; i += 1) {
      if (dates[i] > dates[i - 1]) {
        throw new Error(
          `content/projects.ts: "${project.name}" has versionHistory out of order — ` +
            `${dates[i]} appears after ${dates[i - 1]}. Newest entry must be first.`,
        );
      }
    }

    if (project.launch.access === 'none' && project.launch.url) {
      throw new Error(
        `content/projects.ts: "${project.name}" has access "none" but also a launch URL. ` +
          `Set access to "public" or "auth".`,
      );
    }
  }
}

assertContentIsValid();
