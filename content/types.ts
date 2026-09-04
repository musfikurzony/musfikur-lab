/**
 * ============================================================================
 * THE DATA CONTRACT
 * ============================================================================
 *
 * This file describes the *shape* of every piece of content on the site.
 * You will rarely need to change it.
 *
 * The files you actually edit day to day are:
 *   content/projects.ts   — your tools and applications
 *   content/journey.ts    — the timeline
 *   content/moments.ts    — the personal archive
 *   content/library.ts    — private library section shells
 *   content/site.ts       — global copy, links and SEO
 *
 * TypeScript uses this file to check your edits. If you mistype a field name
 * or forget a required one, the build fails with a clear message instead of
 * quietly shipping a broken card.
 */

/* ==========================================================================
   PROJECT ENUMERATIONS
   ========================================================================== */

/**
 * What state a tool is in. Drives the badge label and colour.
 * This is about the SOFTWARE, not about whether a visitor can log in —
 * that is `access`, below, and the two are deliberately separate.
 */
export type ProjectStatus =
  | 'live' // ● LIVE         usable right now
  | 'active' // ● ACTIVE       live and under active development
  | 'beta' // ● BETA         usable, still stabilising
  | 'development' // ● DEVELOPMENT  being built, not yet usable
  | 'experiment' // ● EXPERIMENT   a trial, may not continue
  | 'evolving' // ● EVOLVING     a growing collection rather than one app
  | 'archived'; // ● ARCHIVED     kept for reference

/** Top-level grouping. Drives the AI Lab category filters. */
export type ProjectCategory =
  | 'merchandising'
  | 'logistics'
  | 'business'
  | 'finance'
  | 'productivity';

/**
 * How a visitor gets in.
 *
 *   'public' — open, no login
 *   'auth'   — the APPLICATION has its own login. This website never asks
 *              for those credentials, never stores them and never proxies
 *              authentication. It links to the application and stops there.
 *   'none'   — no public URL yet, so no launch button is rendered.
 */
export type AccessModel = 'public' | 'auth' | 'none';

/** Which SVG diagram to draw on a card and detail page. */
export type IllustrationKey =
  | 'erp-flow'
  | 'ldp-flow'
  | 'container-flow'
  | 'ledger-flow'
  | 'building-flow'
  | 'audit-flow'
  | 'toolkit-flow'
  | 'generic';

/** Accent colour for a project's illustration and hover glow. */
export type AccentKey = 'blue' | 'indigo' | 'cyan' | 'green';

/* ==========================================================================
   PROJECT SUB-SHAPES
   ========================================================================== */

/**
 * One released version.
 *
 * IMPORTANT: `versionHistory` is the single source of truth for a project's
 * current version AND its last-updated date. There are no separate
 * `currentVersion` / `updatedDate` fields, precisely so they cannot drift
 * apart. Add a new entry at the TOP of the array and the card version, the
 * "Updated" date, the Latest Builds ordering, the UPDATED badge, the
 * What's New block and the sitemap date all move together.
 */
export interface VersionEntry {
  /** e.g. 'v2.4'. Free text — use whatever scheme you like, consistently. */
  version: string;
  /** ISO date, always: 'YYYY-MM-DD'. */
  date: string;
  /** One line, shown in "What's New" for the newest entry. */
  summary?: string;
  /** Bullet points, shown in the expanded version history. */
  changes?: string[];
}

/** Where and how a tool opens. */
export interface LaunchConfig {
  /**
   * The application's own URL.
   * `null` means there is no public URL yet — the site then shows
   * "View Project →" instead of a launch button. It never invents one.
   */
  url: string | null;
  access: AccessModel;
  /** External applications default to opening in a new tab. */
  openInNewTab?: boolean;
  /** Optional clarifier, e.g. 'Access provided to the PEI Bangladesh team'. */
  note?: string;
}

/**
 * A screenshot.
 * `width` and `height` are required: without them the page reflows as
 * images load, which is the single most common cause of a site feeling cheap.
 */
export interface Screenshot {
  src: string;
  /** Required. Describe what the screen shows, not "screenshot". */
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

/* ==========================================================================
   THE PROJECT RECORD
   ========================================================================== */

export interface Project {
  /* ---- Identity ------------------------------------------------------- */
  id: string;
  /** URL segment: /lab/<slug>. Lowercase, hyphenated, never changes. */
  slug: string;
  name: string;
  /** One line, ideally under 90 characters. Used under the name on cards. */
  tagline: string;

  /* ---- Classification -------------------------------------------------- */
  category: ProjectCategory;
  tags: string[];
  status: ProjectStatus;

  /* ---- Content --------------------------------------------------------- */
  /** 1–2 sentences. Used on cards and as the page meta description. */
  shortDescription: string;
  /** 2–4 paragraphs. Used in the Overview block on the detail page. */
  longDescription: string;
  /** Key Capabilities list. Describe only what the tool actually does. */
  features: string[];
  /** Optional ordered explanation for the "How It Works" block. */
  howItWorks?: string[];
  technologies: string[];

  /* ---- Lifecycle ------------------------------------------------------- */
  /**
   * ISO date of first release, or `null` if you have not recorded it.
   *
   * Nullable on purpose. A guessed date is worse than no date: it would drive
   * the NEW badge and the sitemap, quietly making the site state something
   * untrue. With `null`, the badge simply does not appear.
   */
  createdDate: string | null;

  /**
   * NEWEST FIRST. Entry [0] defines the current version and updated date.
   *
   * An empty array is valid and means "no version history recorded yet".
   * The card then omits the version chip and the updated date rather than
   * displaying an invented v1.0.
   */
  versionHistory: VersionEntry[];

  /* ---- Launch ---------------------------------------------------------- */
  launch: LaunchConfig;
  repositoryUrl?: string;

  /* ---- Visuals --------------------------------------------------------- */
  illustration: IllustrationKey;
  accent?: AccentKey;
  /** An empty array is fine — the page shows a clean placeholder. */
  screenshots: Screenshot[];

  /* ---- Curation -------------------------------------------------------- */
  /** Appears in the homepage Featured bento grid. */
  isFeatured: boolean;
  /** 1 = the large hero card in the bento. Lower numbers come first. */
  featuredOrder?: number;
  /** Appears in the homepage "Currently Building" section. */
  isCurrentlyBuilding?: boolean;
  /** Shown as the current focus list in "Currently Building". */
  currentFocus?: string[];
}

/* ==========================================================================
   DERIVED PROJECT DATA
   Computed by lib/projects.ts — never stored, so it can never go stale.
   ========================================================================== */

export type FreshnessBadge = 'new' | 'updated' | null;

export interface ProjectDerived {
  currentVersion: string | null;
  updatedDate: string | null;
  freshness: FreshnessBadge;
  hasLaunchUrl: boolean;
}

export type ProjectWithDerived = Project & { derived: ProjectDerived };

/* ==========================================================================
   JOURNEY
   ========================================================================== */

export type IconKey =
  | 'spark'
  | 'calculator'
  | 'workflow'
  | 'layers'
  | 'network'
  | 'compass'
  | 'book'
  | 'scroll'
  | 'library'
  | 'notebook';

export interface Milestone {
  id: string;
  /** Free text: a year, a range, or a phase name like 'First prototypes'. */
  period: string;
  title: string;
  description: string;
  icon: IconKey;
  /** Links a milestone to real tools, so the timeline stays evidence-based. */
  relatedProjectIds?: string[];
  /** The final "What's Next" entry renders in a lighter, forward-looking style. */
  isFuture?: boolean;
}

/* ==========================================================================
   MOMENTS
   ========================================================================== */

export type MomentCategory =
  | 'family'
  | 'travel'
  | 'work'
  | 'nature'
  | 'special'
  | 'other';

export interface MomentMedia {
  type: 'image' | 'video';
  src: string;
  /** Poster frame for videos. Ignored for images. */
  poster?: string;
  alt: string;
  width: number;
  height: number;
}

export interface Moment {
  id: string;
  title: string;
  /** ISO date. Drives the year grouping and the newest-first ordering. */
  date: string;
  category: MomentCategory;
  caption?: string;
  location?: string;
  media: MomentMedia;
  /** Appears in the small "A Few Moments" section on the homepage. */
  isFeatured: boolean;
  tags?: string[];
}

/* ==========================================================================
   LIBRARY
   ========================================================================== */

/**
 * SECTION SHELLS ONLY.
 *
 * This describes the *categories* in the private library — their titles,
 * descriptions and icons. It contains no private URLs and no item titles,
 * and it is safe to ship publicly.
 *
 * The actual items, including every Google Drive URL, live in a dedicated
 * Supabase database behind Row Level Security and are fetched at runtime
 * only after authentication. They are never written into a content file,
 * because anything in a content file is compiled into the public JavaScript
 * bundle and downloadable by any visitor, logged in or not.
 *
 * See LibraryItem below for the shape returned by that database.
 */
export interface LibrarySection {
  /** Must match `section_id` in the Supabase `library_items` table. */
  id: string;
  title: string;
  description: string;
  icon: IconKey;
  sortOrder: number;
}

/** Row shape of the Supabase `library_items` table. Never stored locally. */
export interface LibraryItem {
  id: string;
  section_id: string;
  title: string;
  description: string | null;
  drive_url: string;
  icon: string | null;
  sort_order: number;
}

/* ==========================================================================
   SITE CONFIGURATION
   ========================================================================== */

export interface NavLink {
  label: string;
  href: string;
  /** Kept out of the header; rendered only where explicitly placed. */
  isPrivate?: boolean;
}

export interface TechItem {
  name: string;
  /** Short note on how it is used. No skill levels, no percentages. */
  note: string;
}

export interface AboutPillar {
  title: string;
  description: string;
  icon: IconKey;
}

export interface ProcessStage {
  /** '01', '02', … */
  step: string;
  title: string;
  description: string;
}
