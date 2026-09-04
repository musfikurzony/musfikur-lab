import type { Project } from './types';

/**
 * ============================================================================
 * PROJECTS — the tools and applications in the AI Lab
 * ============================================================================
 *
 * This is the file you edit most often. One record per tool.
 *
 * Adding a record automatically produces: an AI Lab card, a Latest Builds
 * entry, a full page at /lab/<slug>/, a sitemap entry, category filtering,
 * search inclusion and the homepage tool count. No component is touched.
 *
 * ---------------------------------------------------------------------------
 * WHAT IS STILL MISSING
 * ---------------------------------------------------------------------------
 *
 * Every record below contains ONLY information stated in your brief. Nothing
 * has been inferred, embellished or filled in with a plausible guess.
 *
 * Four fields are deliberately left empty across all seven projects, because
 * you have not supplied them yet:
 *
 *   launch.url        → null. The card shows "View Project →" instead of a
 *                       launch button. It will never invent a URL.
 *   versionHistory    → []. No version chip and no updated date are shown.
 *   createdDate       → null. No NEW badge is shown.
 *   technologies      → []. The detail page says the stack is not yet listed.
 *
 * These are not gaps in the build — they are the site correctly declining to
 * state things it does not know. Fill any of them in and the interface starts
 * showing that information immediately.
 *
 * `features` are drawn word-for-word from your own descriptions in the brief.
 * If a tool does more than its list says, add to it — but only what it does.
 *
 * ---------------------------------------------------------------------------
 * A NOTE ON "LATEST BUILDS"
 * ---------------------------------------------------------------------------
 *
 * That section orders projects by their newest version date. With no dates
 * recorded anywhere yet, it falls back to the order in this file. Once you add
 * real dates the ordering becomes automatic and correct, and you can stop
 * thinking about it.
 *
 * A copy-paste template sits at the bottom of this file.
 */

export const projects: Project[] = [
  /* ======================================================================
     01 — AI MERCHANDISING ERP
     ====================================================================== */
  {
    id: 'ai-merchandising-erp',
    slug: 'ai-merchandising-erp',
    name: 'AI Merchandising ERP',
    tagline: 'Merchandising workflow, critical path and factory collaboration in one workspace.',

    category: 'merchandising',
    tags: ['ERP', 'Merchandising', 'Workflow', 'Factory Collaboration', 'KPI'],
    status: 'active',

    shortDescription:
      'A digital merchandising workflow platform bringing order management, critical-path tracking, CRD monitoring, factory collaboration, shipping and KPI visibility into one workspace.',
    longDescription: `A digital merchandising workflow platform designed to bring order management, critical-path tracking, CRD monitoring, factory collaboration, shipping and KPI visibility into one workspace.

The work follows the shape of a real order: purchase order, time and action plan, customer request date, production, shipment. Each stage is something a merchandiser already tracks — usually across several spreadsheets and a lot of email.`,
    features: [
      'Order management',
      'Critical-path tracking',
      'CRD monitoring',
      'Factory collaboration',
      'Shipping',
      'KPI visibility',
    ],

    // TODO — add the stack when you want it shown. Empty means "not listed".
    technologies: [],

    // TODO — add the first release date to enable the NEW badge.
    createdDate: null,
    // TODO — add version entries, newest first, to enable the version chip,
    // the updated date, the UPDATED badge and automatic Latest Builds order.
    versionHistory: [],

    launch: {
      // TODO — the application's own URL. Until then: "View Project →".
      url: null,
      access: 'auth',
      openInNewTab: true,
    },

    illustration: 'erp-flow',
    accent: 'blue',
    screenshots: [],

    isFeatured: true,
    featuredOrder: 1,
    isCurrentlyBuilding: true,
    currentFocus: [
      'CRD monitoring',
      'Factory collaboration',
      'Merchandising workflow',
      'KPI visibility',
    ],
  },

  /* ======================================================================
     02 — LDP / TARIFF CALCULATOR
     ====================================================================== */
  {
    id: 'ldp-calculator',
    slug: 'ldp-calculator',
    name: 'LDP / Tariff Calculator',
    tagline: 'Work out landed cost from FOB, duty, commission and logistics.',

    category: 'merchandising',
    tags: ['LDP', 'FOB', 'Tariff', 'Costing', 'Scenario Analysis'],
    status: 'live',

    shortDescription:
      'A practical landed-price calculator for evaluating FOB, tariffs, commissions, logistics and landed cost scenarios.',
    longDescription: `A practical landed-price calculator for evaluating FOB, tariffs, commissions, logistics and landed cost scenarios.

Costing questions of this kind are asked constantly and answered slowly. The calculator turns the same arithmetic into something you can run in a moment and compare across scenarios.`,
    features: [
      'FOB price input',
      'Tariff and duty calculation',
      'Commission handling',
      'Logistics cost',
      'Landed cost scenarios',
    ],

    technologies: [],
    createdDate: null,
    versionHistory: [],

    launch: {
      url: null,
      access: 'public',
      openInNewTab: true,
    },

    illustration: 'ldp-flow',
    accent: 'cyan',
    screenshots: [],

    isFeatured: true,
    featuredOrder: 2,
  },

  /* ======================================================================
     03 — SMART CONTAINER LOAD OPTIMIZER
     ====================================================================== */
  {
    id: 'container-optimizer',
    slug: 'container-optimizer',
    name: 'Smart Container Load Optimizer',
    tagline: 'Plan container utilisation and compare loading scenarios.',

    category: 'logistics',
    tags: ['Container', 'CBM', 'Logistics', 'Shipment', 'Optimization'],
    status: 'live',

    shortDescription:
      'A tool for planning and analysing container utilisation and shipment loading scenarios.',
    longDescription: `A tool for planning and analysing container utilisation and shipment loading scenarios.

Space left empty in a container is money already spent. Being able to test a loading plan before booking it is the difference between a good guess and a decision.`,
    features: [
      'Container utilisation planning',
      'Shipment loading scenarios',
      'Utilisation analysis',
    ],

    technologies: [],
    createdDate: null,
    versionHistory: [],

    launch: {
      url: null,
      access: 'public',
      openInNewTab: true,
    },

    illustration: 'container-flow',
    accent: 'indigo',
    screenshots: [],

    isFeatured: true,
    featuredOrder: 3,
  },

  /* ======================================================================
     04 — LPG LEDGER
     ====================================================================== */
  {
    id: 'lpg-ledger',
    slug: 'lpg-ledger',
    name: 'LPG Ledger',
    tagline: 'Consumption and billing records, organised.',

    category: 'finance',
    tags: ['Ledger', 'Billing', 'Consumption', 'Finance'],
    status: 'active',

    shortDescription:
      'A digital LPG consumption and billing ledger for organising customer usage, billing history and operational records.',
    longDescription: `A digital LPG consumption and billing ledger designed to organise customer usage, billing history and operational records.

The kind of record-keeping that works fine on paper right up until someone asks a question about last year.`,
    features: [
      'Customer usage records',
      'Billing history',
      'Operational records',
    ],

    technologies: [],
    createdDate: null,
    versionHistory: [],

    launch: {
      url: null,
      access: 'auth',
      openInNewTab: true,
      note: 'Contains private records. Access is not public.',
    },

    illustration: 'ledger-flow',
    accent: 'green',
    screenshots: [],

    isFeatured: true,
    featuredOrder: 4,
  },

  /* ======================================================================
     05 — BUILDING MANAGEMENT SYSTEM
     ====================================================================== */
  {
    id: 'building-management',
    slug: 'building-management',
    name: 'Building Management System',
    tagline: 'Service charges, income, expenses and assets in one place.',

    category: 'business',
    tags: ['Building', 'Finance', 'Service Charge', 'Operations'],
    status: 'development',

    shortDescription:
      'A management platform for monitoring building service charges, income, expenses, services, assets and operational records.',
    longDescription: `A digital management platform concept for monitoring building service charges, income, expenses, services, assets and operational records.

Shared-building finances involve a lot of small numbers and a lot of people who are entitled to see them.`,
    features: [
      'Service charge monitoring',
      'Income and expense records',
      'Service records',
      'Asset records',
      'Operational records',
    ],

    technologies: [],
    createdDate: null,
    versionHistory: [],

    launch: {
      url: null,
      access: 'none',
    },

    illustration: 'building-flow',
    accent: 'blue',
    screenshots: [],

    isFeatured: true,
    featuredOrder: 5,
  },

  /* ======================================================================
     06 — DIGITAL FARM / FIELD AUDIT
     ====================================================================== */
  {
    id: 'field-audit',
    slug: 'field-audit',
    name: 'Digital Farm / Field Audit',
    tagline: 'Checklists, photos and findings that become a report.',

    category: 'business',
    tags: ['Audit', 'Field Visit', 'Checklist', 'Reports'],
    status: 'active',

    shortDescription:
      'A digital audit and reporting workflow for field inspections, checklists, observations, photos and report generation.',
    longDescription: `A digital audit and reporting workflow for field inspections, checklists, observations, photos and report generation.

Field notes and photographs tend to arrive as a pile of messages. This turns the visit itself into the structure, so the report is most of the way written by the time you leave.`,
    features: [
      'Field inspections',
      'Checklists',
      'Observations',
      'Photo capture',
      'Report generation',
    ],

    technologies: [],
    createdDate: null,
    versionHistory: [],

    launch: {
      url: null,
      access: 'none',
    },

    illustration: 'audit-flow',
    accent: 'cyan',
    screenshots: [],

    isFeatured: false,
  },

  /* ======================================================================
     07 — PLM & MERCHANDISING TOOLS
     ====================================================================== */
  {
    id: 'plm-tools',
    slug: 'plm-tools',
    name: 'PLM & Merchandising Tools',
    tagline: 'A growing set of smaller tools around product and merchandising work.',

    category: 'merchandising',
    tags: ['PLM', 'Product', 'Merchandising', 'Operations'],
    status: 'evolving',

    shortDescription:
      'A collection of practical tools supporting product, PLM, merchandising and operational workflows.',
    longDescription: `A collection of practical tools supporting product, PLM, merchandising and operational workflows.

This is a group rather than a single application — smaller utilities that solve one problem each. As individual tools here become substantial enough to stand alone, they can be split out into their own records.`,
    features: [
      'Product workflows',
      'PLM workflows',
      'Merchandising workflows',
      'Operational workflows',
    ],

    technologies: [],
    createdDate: null,
    versionHistory: [],

    launch: {
      url: null,
      access: 'none',
    },

    illustration: 'toolkit-flow',
    accent: 'indigo',
    screenshots: [],

    isFeatured: false,
  },
];

/* ==========================================================================
   TEMPLATE — copy this block, paste it above, fill it in
   ==========================================================================

  {
    id: 'my-new-tool',
    slug: 'my-new-tool',
    name: 'My New Tool',
    tagline: 'One line, under about 90 characters.',

    category: 'merchandising',   // merchandising | logistics | business | finance | productivity
    tags: ['Tag One', 'Tag Two'],
    status: 'live',              // live | active | beta | development | experiment | evolving | archived

    shortDescription: 'One or two sentences. Shown on cards and in search results.',
    longDescription: `Two to four paragraphs for the Overview block on the tool's own page.

    Blank lines separate paragraphs.`,
    features: ['What it does', 'What else it does'],

    technologies: ['JavaScript'],   // [] is fine

    createdDate: '2026-09-04',      // or null
    versionHistory: [               // or []
      { version: 'v1.0', date: '2026-09-04', summary: 'First release.' },
    ],

    launch: {
      url: 'https://example.com',   // or null for no launch button
      access: 'public',             // public | auth | none
      openInNewTab: true,
    },

    illustration: 'generic',        // see IllustrationKey in types.ts
    accent: 'blue',                 // blue | indigo | cyan | green
    screenshots: [],

    isFeatured: false,
  },

  ========================================================================== */
