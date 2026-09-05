# Deployment — Cloudflare

This site deploys as **plain static files**. No Worker script, no serverless function, no server-side rendering. `npm run build` produces a folder called `out`, and Cloudflare serves that folder from the edge.

---

## Which project type do you have?

Cloudflare's "Import a repository" flow now creates a **Workers** project rather than a Pages project. The two need different config, and mixing them is the single most common reason a deploy fails.

Check your dashboard URL:

| URL contains | Project type | Config file to use | Deploy command |
|---|---|---|---|
| `/workers/services/view/…` | **Workers** | `wrangler.toml` *(shipped)* | `npx wrangler deploy` |
| `/pages/view/…` | **Pages** | `wrangler.pages.toml.example` | *(none — Pages has no deploy command)* |

**The repo ships configured for Workers**, because that is what Cloudflare creates by default now.

### Settings for a Workers project

Settings → Build:

| Field | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

Nothing else needs changing. `wrangler.toml` is already correct.

### Settings for a Pages project

Settings → Builds & deployments:

| Field | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `out` |
| Framework preset | Next.js (Static HTML Export), or None |

Then delete `wrangler.toml`, rename `wrangler.pages.toml.example` to `wrangler.toml`, commit and push.

### Does the Workers path run server code?

No. `wrangler.toml` has **no `main` key**, so no Worker script exists and nothing executes on request — Cloudflare serves the files directly. Same edge network, same speed, same cost, same static site. `_headers` and `_redirects` are honoured on both paths, so the `/projects → /lab` redirect and the security headers keep working either way.

---

## Two errors you may have already hit

**`opennextjs-cloudflare build` fails with a missing `pages-manifest.json`**

Cloudflare detected "Next.js" and pre-filled the OpenNext adapter, which turns a Next.js app into a *server* on a Worker. This site has no server — it is already plain HTML when the build finishes — so the adapter looks for a server bundle that was never created and stops.

Fix: set the build command to `npm run build`.

**`Missing entry-point to Worker script or to assets directory`**, often preceded by *"It seems that you have run `wrangler deploy` on a Pages project"*

The build succeeded; only the deploy failed. `wrangler deploy` is the **Workers** command and needs an `[assets]` block, but the config file contained `pages_build_output_dir`, which is Pages-only. That misleading warning comes from the *config file*, not from your actual project type.

Fix: use the config that matches your project type, per the table above.

---

## Deploying from your own computer

Useful for checking a build without pushing. It uploads whatever is currently in `out`.

```bash
npx wrangler login     # once — opens your browser
npm run deploy
```

`npm run deploy` runs three steps in order: build, verify the export is genuinely static, then upload. If verification fails, nothing is uploaded.

To preview the built site exactly as Cloudflare serves it — including `_redirects` and `_headers`, which a plain local server ignores:

```bash
npm run preview
```

To check the config is valid without uploading anything:

```bash
npx wrangler deploy --dry-run
```

A healthy result reads the assets directory and exits cleanly. If you see `Missing entry-point to Worker script or to assets directory`, the config does not match your project type — see the table above.

---

## Setting the repository up on GitHub

If you have not already:

```bash
cd musfikur-lab
git init
git add .
git commit -m "Musfikur Rahman — AI Innovation Lab"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/musfikur-lab.git
git push -u origin main
```

`.gitignore` excludes `node_modules`, `.next`, `out` and `.env.local`, so none of those upload. That is correct — Cloudflare builds the site itself.

---

## Reference — connecting a fresh project

Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository** → pick the repository.

Cloudflare will pre-fill a build command for Next.js. **Replace it** — its guess assumes a server, and this site has none:

| Field | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

Click deploy. Your site is live at `https://musfikur-lab.<subdomain>.workers.dev`, and every push to `main` rebuilds it in about a minute.

For a custom domain: project → **Domains** → **Add**.

### Node version

Cloudflare's default Node has been fine for this project. If a build ever fails with an unsupported-syntax error that does not name one of your files, pin it: add an environment variable `NODE_VERSION` = `20` and redeploy.

---

## After the first deploy, check these five things

1. **Your site URL** loads and is styled. If the text appears unstyled, the assets directory is wrong.
2. **`/projects`** redirects to `/lab`. This proves `_redirects` was picked up.
3. **The mobile menu opens** on a phone-width window.
4. **`/library`** says the Library is not yet activated. That is correct — it stays dormant until you connect a dedicated Supabase project.
5. **View source** on the homepage. You should see real HTML with your headline in it, not an empty `<div>`. That is what makes the site work for search engines.

---

## If the build fails

**`opennextjs-cloudflare` / missing `pages-manifest.json`**
Cloudflare is running its own auto-detected build command instead of ours. See the section at the top of this file.

**"Unsupported Node.js version" or an unexpected syntax error**
Pin the Node version: add an environment variable `NODE_VERSION` = `20` and retry the deployment.

**"No output directory found"**
On Workers, `[assets] directory` in `wrangler.toml` must be `./out`. On Pages, the build output directory must be `out` — not `dist`, `build` or `.next`.

**A TypeScript or content error naming a file and line**
A content file has a mistake — usually a missing comma between records, a missing required field on a new project, or a date that is not in `YYYY-MM-DD` form. Run `npm run build` on your own machine to see the same message faster.

**The site deploys but a page 404s**
Check that `trailingSlash: true` is still set in `next.config.ts`. Cloudflare serves `/lab/` from `/lab/index.html`, and that setting is what produces those folders.

---

## Keeping it deployable

This model only works while the site stays static. These would each require a Worker and break it:

- Route Handlers (`app/**/route.ts`)
- Server Actions (`'use server'`)
- `middleware.ts`
- A dynamic route without `generateStaticParams()`
- `export const revalidate`
- `cookies()` or `headers()` at runtime
- Re-enabling `next/image` optimisation

`output: 'export'` in `next.config.ts` makes most of these fail the build rather than fail quietly in production, which is deliberate. `npm run check:static` catches the rest before an upload.

The private Library still works within these limits: Supabase Auth runs in the browser, not on a server.

---

## Environment variables

Only the private Library needs any, and it is dormant until you add them.

| Variable | Where | Notes |
|---|---|---|
| `NODE_VERSION` | Cloudflare → Variables | Optional. Pin to `20` only if a build fails on Node version. |
| `NEXT_PUBLIC_SUPABASE_URL` | Cloudflare → Variables | Only when activating the Library |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cloudflare → Variables | Only when activating the Library |

Never put these in `wrangler.toml` — that file is committed to Git.

The Supabase anon key is designed to be visible in the browser; that is not the leak it looks like. What protects your Library data is Row Level Security on the table, not the secrecy of that key. See README → *Activating the Library*.
