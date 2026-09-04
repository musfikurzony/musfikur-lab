import type { NextConfig } from 'next';

/**
 * Static export.
 *
 * `next build` writes a folder of plain HTML/CSS/JS to /out. Every page —
 * including each individual project page under /lab/[slug] — becomes a real
 * .html file at build time. Cloudflare Pages serves that folder directly:
 * no server, no serverless functions, no runtime cost.
 *
 * Two consequences worth remembering:
 *   1. next/image optimisation needs a server, so it is disabled. We ship
 *      pre-optimised WebP and always set explicit width/height instead.
 *   2. next.config redirects() needs a server too. The /projects -> /lab
 *      redirect lives in public/_redirects, which Cloudflare Pages reads.
 */
const nextConfig: NextConfig = {
  output: 'export',

  // Cloudflare Pages serves /lab/ -> /lab/index.html cleanly with this on.
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  // Fail the build on a type error rather than shipping a broken page.
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
