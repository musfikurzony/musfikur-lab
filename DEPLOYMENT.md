# Deployment — Cloudflare Pages

This site deploys as **plain static files**. No Worker, no serverless function, no server-side rendering. `npm run build` produces a folder called `out`, and Cloudflare serves that folder from the edge.

---

## ⚠️ Read this first if your build failed with `opennextjs-cloudflare`

If the build log shows:

```
Running custom build `npx opennextjs-cloudflare build` failed
Error: ENOENT: no such file or directory, open '.next/standalone/.next/server/pages-manifest.json'
```

**Nothing is wrong with the code.** Cloudflare detected "Next.js" and pre-filled a build command for the OpenNext adapter, which converts a Next.js app into a *server* running on a Worker. This site has no server — it is already plain HTML by the time the build finishes — so the adapter goes looking for a server bundle that was never created and stops.

The fix is to tell Cloudflare to run our build instead of its guess.

### Which kind of project did you create?

Cloudflare now has two flows, and they need different settings. Look at your project's **Settings → Build** page:

- **You see a "Deploy command" field** → it is a **Workers** project. Use Fix B.
- **You see "Build output directory" and no deploy command** → it is a **Pages** project. Use Fix A.

### Fix A — Pages project

Settings → Builds & deployments → edit:

| Field | Set it to |
|---|---|
| Build command | `npm run build` |
| Build output directory | `out` |
| Framework preset | Next.js (Static HTML Export), or None |

Then Deployments → **Retry deployment**. `wrangler.toml` as shipped is already correct for this.

### Fix B — Workers project

Two changes, both required.

**1. Settings → Build:**

| Field | Set it to |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

**2. Replace the contents of `wrangler.toml`** with the block below, commit and push. A Workers project cannot use `pages_build_output_dir`; it needs an `[assets]` block instead.

```toml
name = "musfikur-lab"
compatibility_date = "2026-09-04"

# Static assets only. No `main` key, so no Worker script runs at all —
# Cloudflare serves the files straight from the edge.
[assets]
directory = "./out"
not_found_handling = "404-page"
```

`_headers` and `_redirects` are honoured on this path too, so the `/projects → /lab` redirect and the security headers keep working.

### Which should you use?

Either serves this site identically — same edge network, same speed, same cost. **Fix A (Pages)** is the one to prefer: it is what the rest of this document assumes, and it needs no change to any file in the repo. Use Fix B only if you would rather not recreate the project you already made.

---

There are two ways to deploy. **Use Method A.** Method B is for testing a build without touching your live site.

---

## Method A — GitHub → Cloudflare Pages (recommended)

Set this up once. After that, every `git push` deploys automatically in under a minute.

### 1. Put the project on GitHub

```bash
cd musfikur-lab
git init
git add .
git commit -m "Musfikur Rahman — AI Innovation Lab"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/musfikur-lab.git
git push -u origin main
```

`.gitignore` already excludes `node_modules`, `.next`, `out` and `.env.local`, so none of those get uploaded. That is correct — Cloudflare builds the site itself.

### 2. Connect it in Cloudflare

Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick the repository.

Then enter these build settings **exactly**:

| Setting | Value |
|---|---|
| Framework preset | **Next.js (Static HTML Export)** |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | *(leave empty)* |

Under **Environment variables**, add:

| Variable | Value |
|---|---|
| `NODE_VERSION` | `20` |

That one variable matters. Cloudflare's default Node version is older than this project needs, and without it the build fails with a confusing error about an unsupported syntax rather than saying "wrong Node version".

Click **Save and Deploy**.

### 3. Done

Your site is live at `https://musfikur-lab.pages.dev`. Every push to `main` rebuilds it.

To use your own domain: project → **Custom domains** → **Set up a domain**.

---

## Method B — Deploy straight from your computer with Wrangler

Useful for checking a build before you commit it. It uploads whatever is currently in `out`.

```bash
npx wrangler login     # once — opens your browser
npm run deploy
```

`npm run deploy` runs three steps in order: build the site, verify the export is genuinely static, then upload. If the verification fails, nothing is uploaded.

To preview the built site locally exactly as Cloudflare will serve it — including the `_redirects` and `_headers` files, which a plain local server ignores:

```bash
npm run preview
```

---

## After the first deploy, check these five things

1. **`https://your-site.pages.dev/`** loads and is styled. If the text appears unstyled, the build output directory is wrong.
2. **`/projects`** redirects to `/lab`. This proves `_redirects` was picked up.
3. **The mobile menu opens** on a phone-width window.
4. **`/library`** says the Library is not yet activated. That is correct — it stays dormant until you connect a dedicated Supabase project.
5. **View source** on the homepage. You should see real HTML with your headline in it, not an empty `<div>`. That is what makes the site work for search engines.

---

## If the build fails

**`opennextjs-cloudflare` / missing `pages-manifest.json`**
Cloudflare is running its own auto-detected build command instead of ours. See the section at the top of this file.

**"Unsupported Node.js version" or an unexpected syntax error**
`NODE_VERSION` is not set to `20`. Add it under Environment variables and retry the deployment.

**"No output directory found"**
Build output directory must be `out`, not `dist`, `build` or `.next`.

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
| `NODE_VERSION` | Cloudflare → Variables | Set to `20`. Required. |
| `NEXT_PUBLIC_SUPABASE_URL` | Cloudflare → Variables | Only when activating the Library |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cloudflare → Variables | Only when activating the Library |

Never put these in `wrangler.toml` — that file is committed to Git.

The Supabase anon key is designed to be visible in the browser; that is not the leak it looks like. What protects your Library data is Row Level Security on the table, not the secrecy of that key. See README → *Activating the Library*.
