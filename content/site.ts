import type {
  AboutPillar,
  NavLink,
  ProcessStage,
  TechItem,
} from './types';

/**
 * ============================================================================
 * GLOBAL SITE CONTENT
 * ============================================================================
 *
 * Every string on the site that is not part of a project, moment or milestone
 * lives here. Changing your headline, your role, your meta description or a
 * footer line is a one-line edit in this file — never a hunt through
 * component code.
 *
 * Items marked TODO are placeholders waiting on information from you.
 * Nothing here is invented: the copy is taken from your brief.
 */

/* ==========================================================================
   IDENTITY
   ========================================================================== */

export const site = {
  name: 'Musfikur Rahman',
  /** Used in the nav wordmark. */
  shortName: 'MUSFIKUR',
  descriptor: 'AI Innovation Lab',

  /**
   * The live address of this site.
   *
   * Used for canonical URLs, the sitemap and the social preview card — all of
   * which must be absolute URLs, so this has to be correct or a shared link
   * previews with a broken image and search engines see the wrong addresses.
   *
   * CHANGE THIS the day you connect a custom domain, e.g.
   * 'https://musfikurrahman.com'. No trailing slash.
   */
  url: 'https://musfikur-lab.musfikurzony.workers.dev',

  /** Your positioning line. Changing this one string changes it everywhere. */
  role: 'Manager, Merchandising · AI Builder · Problem Solver',

  philosophy: 'Ideas → AI → Real-World Solutions',

  /** TODO — add links you want public. Empty entries are simply not rendered. */
  social: {
    linkedin: '',
    github: '',
    email: '',
  },

  /** TODO — optional. Set this to show a "previously at" link during the move. */
  legacySiteUrl: '',
} as const;

/* ==========================================================================
   SEO DEFAULTS
   ========================================================================== */

export const seo = {
  title: 'Musfikur Rahman | AI Innovation Lab',
  titleTemplate: '%s | Musfikur Rahman',
  description:
    'Practical AI-powered tools and digital solutions for merchandising, apparel, business operations and everyday problems.',
  keywords: [
    'AI tools',
    'apparel merchandising',
    'merchandising software',
    'landed cost calculator',
    'container load optimisation',
    'AI-assisted development',
    'Musfikur Rahman',
  ],
} as const;

/* ==========================================================================
   NAVIGATION
   ========================================================================== */

/**
 * "Projects" and "AI Lab" were the same destination, so they are one item.
 * /projects/ still resolves — public/_redirects sends it to /lab/ — so any
 * link already shared keeps working.
 *
 * The Library is deliberately NOT here. It is a discreet footer link.
 * Private things should not advertise themselves in the header.
 */
export const navLinks: NavLink[] = [
  { label: 'Lab', href: '/lab' },
  { label: 'Journey', href: '/journey' },
  { label: 'Moments', href: '/moments' },
  { label: 'About', href: '/about' },
];

export const navCta = {
  label: 'Launch Tools',
  href: '/lab',
} as const;

export const libraryLink: NavLink = {
  label: 'Personal Library',
  href: '/library',
  isPrivate: true,
};

/* ==========================================================================
   HERO
   ========================================================================== */

export const hero = {
  eyebrow: 'DIGITAL LAB — ACTIVE',
  // Non-breaking hyphen (U+2011) in "Real‑World" so the headline never
  // splits across lines mid-word. It behaves as a normal hyphen everywhere.
  headline: 'Ideas → AI → Real‑World Solutions',
  supporting:
    'Building practical AI-powered tools for merchandising, apparel, business operations and everyday problems.',
  primaryCta: { label: 'Explore My AI Lab', href: '/lab' },
  secondaryCta: { label: 'View My Journey', href: '/journey' },
  trustLine:
    'A growing collection of practical digital tools, experiments and business solutions.',
} as const;

/* ==========================================================================
   STATS STRIP
   ========================================================================== */

/**
 * The tool count is calculated from content/projects.ts at build time, so it
 * is always correct and never has to be remembered. The other three are
 * qualitative on purpose — no invented numbers.
 */
export const stats = {
  toolsLabel: 'AI Tools',
  buildsLabel: 'Latest Builds',
  buildsValue: 'Active',
  focusLabel: 'Focus',
  focusValue: 'Real-World Problems',
  domainLabel: 'Domain',
  domainValue: 'Apparel · Business · AI',
} as const;

/* ==========================================================================
   FROM PROBLEM TO PRODUCT  (brief §26)
   ========================================================================== */

export const processStages: ProcessStage[] = [
  {
    step: '01',
    title: 'Problem',
    description: 'A repetitive real-world problem appears in daily work.',
  },
  {
    step: '02',
    title: 'Idea',
    description: 'Look for a better workflow rather than a faster workaround.',
  },
  {
    step: '03',
    title: 'AI',
    description: 'Use AI-assisted thinking and development to shape the solution.',
  },
  {
    step: '04',
    title: 'Build',
    description: 'Turn the idea into a working application.',
  },
  {
    step: '05',
    title: 'Test',
    description: 'Use it against real requirements, not imagined ones.',
  },
  {
    step: '06',
    title: 'Improve',
    description: 'Release better versions as the work teaches you more.',
  },
];

/* ==========================================================================
   ABOUT  (brief §9, §29)
   ========================================================================== */

export const about = {
  heading: 'About Musfikur',
  title: 'Manager, Merchandising. AI Builder. Problem Solver.',
  intro:
    'I work in apparel merchandising and use AI, technology and product thinking to transform practical business problems into usable digital solutions.',
  /** TODO — optional. Drop a file in /public and set the path to show a photo. */
  photo: {
    src: '',
    alt: 'Musfikur Rahman',
    width: 0,
    height: 0,
  },
} as const;

export const aboutPillars: AboutPillar[] = [
  {
    title: 'Merchandising',
    description:
      'Experience across merchandising, costing, production, shipment and factory coordination — understanding real apparel business workflows from the inside.',
    icon: 'workflow',
  },
  {
    title: 'AI & Automation',
    description:
      'Using AI-assisted development to move an idea to a working tool quickly, without waiting for a development team.',
    icon: 'spark',
  },
  {
    title: 'Product Thinking',
    description:
      'Starting with a problem, not a technology. Identifying friction in daily work and turning it into something usable.',
    icon: 'compass',
  },
];

/* ==========================================================================
   PHILOSOPHY  (brief §30)
   ========================================================================== */

export const philosophy = {
  quote: 'Build something useful.',
  supporting:
    'The best technology is not the most complicated technology. It is the technology that solves a real problem.',
} as const;

/* ==========================================================================
   TECHNOLOGY ECOSYSTEM  (brief §31)
   No skill levels. No percentages. These are tools, not credentials.
   ========================================================================== */

export const technologies: TechItem[] = [
  { name: 'AI-assisted Development', note: 'How most of these tools get built' },
  { name: 'Claude', note: 'Design, architecture and implementation' },
  { name: 'ChatGPT', note: 'Exploration and problem framing' },
  { name: 'JavaScript', note: 'The common language across every tool' },
  { name: 'React', note: 'Interface layer for the larger applications' },
  { name: 'Next.js', note: 'Structure and routing' },
  { name: 'Supabase', note: 'Database and authentication' },
  { name: 'GitHub', note: 'Version control and deployment source' },
  { name: 'Netlify', note: 'Hosting for several tools' },
  { name: 'Cloudflare', note: 'Hosting and delivery' },
];

/* ==========================================================================
   PAGE COPY
   ========================================================================== */

export const labPage = {
  eyebrow: 'THE LAUNCHPAD',
  title: 'My AI Lab',
  subtitle:
    'A growing collection of tools, experiments and practical digital solutions.',
  searchPlaceholder: 'Search tools…',
  emptyTitle: 'No tools found',
  emptyBody: 'Try another search term or a different category.',
} as const;

export const journeyPage = {
  eyebrow: 'HOW IT DEVELOPED',
  title: 'The Journey',
  subtitle:
    'How the work moved from small experiments to working systems.',
} as const;

export const momentsPage = {
  eyebrow: 'PERSONAL ARCHIVE',
  title: 'Moments',
  subtitle:
    'A collection of memories, people, places and little moments worth remembering.',
  previewHeading: 'A Few Moments',
  previewCta: 'View All Moments',
} as const;

export const libraryPage = {
  title: 'My Private Library',
  subtitle: 'A personal collection for reading and study.',
  ctaLabel: 'Enter Library',
  dormantTitle: 'Library not yet activated',
  dormantBody:
    'This area is built and waiting for its own dedicated Supabase project. Until that is connected, there is nothing to sign in to.',
} as const;

/* ==========================================================================
   FOOTER  (brief §32)
   ========================================================================== */

export const footer = {
  cta: { label: 'Explore the Lab', href: '/lab' },
  copyright: `© ${new Date().getFullYear()} Musfikur Rahman`,
  tagline: 'Built with curiosity, AI and a lot of iteration.',
} as const;
