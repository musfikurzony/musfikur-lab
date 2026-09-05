import type { Moment } from './types';

/**
 * ============================================================================
 * MOMENTS — the personal archive
 * ============================================================================
 *
 * Empty on purpose. No photographs have been added, and the site will not
 * invent memories or show stock images pretending to be yours. Until you add
 * something here, /moments shows a calm empty state and the homepage preview
 * section does not appear at all.
 *
 * ---------------------------------------------------------------------------
 * TO ADD A MEMORY
 * ---------------------------------------------------------------------------
 *
 * 1. Put the photo in  public/moments/<year>/  — for example
 *    public/moments/2026/eid-morning.webp
 *
 * 2. Copy the template below, paste it into the array, fill it in.
 *
 * 3. `width` and `height` must be the real pixel size of the image. Without
 *    them the gallery jumps around as photos load. Right-click the file →
 *    Properties → Details on Windows to read them.
 *
 * 4. Set `isFeatured: true` on four to six of your favourites — those are the
 *    ones that appear in the small "A Few Moments" section on the homepage.
 *
 * ---------------------------------------------------------------------------
 * A NOTE ON PRIVACY
 * ---------------------------------------------------------------------------
 *
 * /moments is set to `noindex`, which asks search engines not to list it.
 * That is a courtesy, not a lock. Anyone with the link can open the page, and
 * the image files themselves are public. Do not put anything here that you
 * would mind a stranger seeing.
 */

export const moments: Moment[] = [
  /* ------------------------------------------------------------------------
     TEMPLATE — copy this block, remove the comment markers, fill it in

  {
    id: 'eid-2026',
    title: 'Eid morning',
    date: '2026-03-20',
    category: 'family',        // family | travel | work | nature | special | other
    caption: 'Optional one line.',
    location: 'Uttara, Dhaka', // optional
    media: {
      type: 'image',           // 'image' or 'video'
      src: '/moments/2026/eid-morning.webp',
      alt: 'Describe what the photo shows.',
      width: 1600,
      height: 1200,
    },
    isFeatured: true,
    tags: ['Eid'],
  },

     For a short video, add a poster frame:

  {
    id: 'example-video',
    title: 'Example',
    date: '2026-01-01',
    category: 'other',
    media: {
      type: 'video',
      src: '/moments/2026/clip.mp4',
      poster: '/moments/2026/clip-poster.webp',
      alt: 'Describe what the clip shows.',
      width: 1920,
      height: 1080,
    },
    isFeatured: false,
  },

  ------------------------------------------------------------------------ */
];
