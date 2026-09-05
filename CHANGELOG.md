# Changelog

Every round of work, with the exact files that changed — so you can upload
only what is new rather than the whole project each time.

Newest round first.

---

## Round 3 — All pages built (5 September 2026)

Every navigation link now resolves. 20 pages, all static HTML.

**New files — 34**

```
ADDING-A-TOOL.md

app/about/page.tsx
app/journey/page.tsx
app/lab/page.tsx
app/lab/[slug]/page.tsx
app/library/page.tsx
app/library/LibraryClient.tsx
app/moments/page.tsx
app/not-found.tsx
app/opengraph-image.tsx
app/robots.ts
app/sitemap.ts

components/moments/MomentsGallery.tsx
components/project/LabBrowser.tsx
components/project/ScreenshotGallery.tsx
components/project/VersionHistory.tsx
components/sections/AboutPillars.tsx
components/sections/CurrentlyBuilding.tsx
components/sections/FeaturedBento.tsx
components/sections/Hero.tsx
components/sections/HeroEcosystem.tsx
components/sections/JourneyTimeline.tsx
components/sections/LatestBuilds.tsx
components/sections/MomentsPreview.tsx
components/sections/PhilosophyQuote.tsx
components/sections/ProblemToProduct.tsx
components/sections/StatsStrip.tsx
components/sections/TechEcosystem.tsx
components/ui/EmptyState.tsx
components/ui/Icon.tsx

content/journey.ts
content/library.ts
content/moments.ts

lib/supabase.ts
```

**Changed files — 4**

```
.gitignore        added .wrangler/ — local cache that must never be committed
app/page.tsx      the real homepage replaces the Phase 2 review page
content/site.ts   site.url set to the live workers.dev address
public/_headers   Content-Type for the social card
```

**Deleted — none**

**Fixed this round**

- 20px horizontal scroll on the homepage at phone width — an ambient glow
  sized at 120% of its container with nothing clipping it.
- The social sharing card served as `application/octet-stream`, so LinkedIn
  and WhatsApp would have refused to show a preview.
- Hero ecosystem card names were truncating to "Smart Container Loa…".
- `.wrangler/` local cache was not git-ignored.

---

## Round 2 — The card system (4 September 2026)

**New**

```
content/projects.ts
lib/projects.ts
lib/format.ts
components/ui/Badge.tsx
components/illustrations/FlowIllustration.tsx
components/project/ProjectCard.tsx
components/project/FeaturedCard.tsx
components/project/LaunchButton.tsx
```

**Changed**

```
app/page.tsx
app/globals.css
content/types.ts    createdDate nullable, versionHistory may be empty
content/site.ts
```

**Fixed**

- Illustration nodes extended outside the SVG viewBox and were being clipped.
- The lock badge sat orphaned on an otherwise empty metadata row.
- The featured card's diagram floated in dead space at full width.

---

## Round 1 — Foundation (4 September 2026)

Project scaffold, design tokens, self-hosted Inter, navigation, footer,
background system, brand mark, data contract, Cloudflare deployment config.

**Fixed**

- `--color-card` collided with the `--text-card` font-size token, so card
  headings rendered dark navy on dark navy. Renamed to `--color-panel`.
- The nav CTA did not hide on mobile — `hidden` lost to `inline-flex` because
  equal-specificity utilities resolve by stylesheet order, not class order.
- Muted text at `#687386` measured 4.12:1 against the background, below the
  4.5:1 accessibility minimum. Lightened to `#7B8798` (5.4:1).
- Cloudflare ran the wrong build adapter, then the wrong deploy config.
  See DEPLOYMENT.md.
