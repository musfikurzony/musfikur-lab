import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

/**
 * Static export requires this: without it Next treats robots.txt and
 * sitemap.xml as dynamic routes needing a server, and the build stops.
 * Both are generated once at build time, which is exactly what we want.
 */
export const dynamic = 'force-static';

/**
 * robots.txt.
 *
 * IMPORTANT — this is not a security mechanism, and nothing here should ever
 * be treated as one.
 *
 * `Disallow` is a request to well-behaved crawlers. It does not prevent
 * anyone from opening a page, it does not require anyone to obey it, and
 * listing a path here arguably advertises that the path exists.
 *
 * The private Library is protected by Supabase Auth plus Row Level Security
 * on the data itself — an unauthenticated request returns nothing. That is
 * the actual boundary. This file only keeps the two personal areas out of
 * search results.
 */
export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/library/', '/moments/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
