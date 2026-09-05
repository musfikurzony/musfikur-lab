import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { getAllProjects } from '@/lib/projects';

/**
 * Static export requires this: without it Next treats robots.txt and
 * sitemap.xml as dynamic routes needing a server, and the build stops.
 * Both are generated once at build time, which is exactly what we want.
 */
export const dynamic = 'force-static';

/**
 * sitemap.xml, generated from the project data at build time.
 *
 * Add a project and it appears here automatically — there is no list to
 * maintain.
 *
 * `lastModified` uses each project's newest version date where one exists. A
 * project with no dates falls back to the build date rather than being given
 * an invented one; a fabricated date in a sitemap is a small lie told directly
 * to a search engine, which is both wrong and counterproductive.
 *
 * /moments and /library are excluded: both are noindex, and listing a page in
 * a sitemap while asking robots not to index it is a contradictory signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url.replace(/\/$/, '');

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/lab/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/journey/`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const projectPages: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${base}/lab/${project.slug}/`,
    lastModified: project.derived.updatedDate
      ? new Date(project.derived.updatedDate)
      : now,
    changeFrequency: 'monthly',
    priority: project.isFeatured ? 0.8 : 0.7,
  }));

  return [...staticPages, ...projectPages];
}
