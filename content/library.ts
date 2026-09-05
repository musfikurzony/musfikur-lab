import type { LibrarySection } from './types';

/**
 * ============================================================================
 * PRIVATE LIBRARY — SECTION SHELLS ONLY
 * ============================================================================
 *
 * ⚠️  DO NOT PUT GOOGLE DRIVE URLS OR BOOK TITLES IN THIS FILE.
 *
 * Everything in content/ is compiled into the JavaScript bundle and
 * downloaded by every visitor — before they ever reach a login screen. A
 * password in front of it would change nothing, because the data would
 * already be sitting in their browser. That is exactly the "password inside
 * JavaScript" pattern your brief said not to build.
 *
 * So this file holds only the section names, which are not private and are
 * safe to ship publicly.
 *
 * The actual items — every title, description and Drive URL — live in a
 * dedicated Supabase table behind Row Level Security and are fetched at
 * runtime only after you sign in. An unauthenticated request gets an empty
 * result, not a hidden one.
 *
 * See README → "Activating the private Library" for the table and policy.
 *
 * ---------------------------------------------------------------------------
 * The `id` below must match `section_id` in the Supabase `library_items`
 * table. That is the only link between this file and your data.
 * ---------------------------------------------------------------------------
 */

export const librarySections: LibrarySection[] = [
  {
    id: 'quran',
    title: "Qur'an",
    description: 'Translations, recitation and study resources.',
    icon: 'book',
    sortOrder: 1,
  },
  {
    id: 'tafsir',
    title: 'Tafsir',
    description: 'Commentary and exegesis.',
    icon: 'scroll',
    sortOrder: 2,
  },
  {
    id: 'hadith',
    title: 'Hadith',
    description: 'Collections and reference material.',
    icon: 'library',
    sortOrder: 3,
  },
  {
    id: 'books',
    title: 'Islamic Books',
    description: 'Books and PDFs.',
    icon: 'book',
    sortOrder: 4,
  },
  {
    id: 'personal-study',
    title: 'Personal Study',
    description: 'Notes and other study material.',
    icon: 'notebook',
    sortOrder: 5,
  },
];
