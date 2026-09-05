import type { Milestone } from './types';

/**
 * ============================================================================
 * THE JOURNEY
 * ============================================================================
 *
 * The milestones from your brief (§27), in order.
 *
 * `period` is free text. It currently holds phase names rather than years,
 * because you have not given dates and inventing them would put false claims
 * on your own timeline. When you know roughly when a phase happened, replace
 * the phase name with a year or a range — '2023', '2023–2024', 'Early 2024'.
 * Nothing else needs changing.
 *
 * `relatedProjectIds` links a milestone to real tools, so the timeline is
 * evidence rather than assertion. Those ids must match ids in projects.ts.
 */

export const milestones: Milestone[] = [
  {
    id: 'ideas',
    period: 'Where it started',
    title: 'Ideas & Experiments',
    description:
      'Noticing the same problems coming back week after week, and starting to ask whether they had to.',
    icon: 'spark',
  },
  {
    id: 'calculators',
    period: 'First useful things',
    title: 'Business Calculators',
    description:
      'Small tools that answered one costing or planning question properly, instead of being re-derived by hand each time.',
    icon: 'calculator',
    relatedProjectIds: ['ldp-calculator'],
  },
  {
    id: 'operational',
    period: 'Beyond the calculator',
    title: 'Operational Tools',
    description:
      'Tools that hold records rather than just compute an answer — consumption, billing, loading plans, field reports.',
    icon: 'workflow',
    relatedProjectIds: ['container-optimizer', 'lpg-ledger', 'field-audit'],
  },
  {
    id: 'ai-assisted',
    period: 'A change in method',
    title: 'AI-Assisted Applications',
    description:
      'Using AI-assisted development to go from an idea to a working application without waiting for a development team.',
    icon: 'layers',
  },
  {
    id: 'systems',
    period: 'Bigger scope',
    title: 'ERP & Workflow Systems',
    description:
      'Full workflow systems rather than single-purpose tools — order management, critical path, factory collaboration, KPI visibility.',
    icon: 'network',
    relatedProjectIds: ['ai-merchandising-erp'],
  },
  {
    id: 'platforms',
    period: 'Now',
    title: 'Integrated Digital Platforms',
    description:
      'Separate tools starting to share ideas, structure and design, rather than each being built from scratch.',
    icon: 'compass',
    relatedProjectIds: ['building-management', 'plm-tools'],
  },
  {
    id: 'next',
    period: 'Next',
    title: "What's Next",
    description:
      'More tools, built the same way: start from a real problem, keep it usable, improve it in versions.',
    icon: 'spark',
    isFuture: true,
  },
];
