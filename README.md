# Musfikur Rahman — AI Innovation Lab

The personal website: portfolio, AI Lab launchpad, Moments archive and private Library.

Built with Next.js 15 and exported as static HTML. Hosted on Cloudflare Pages.

---

## Running it on your computer

You need Node.js 20 or newer ([nodejs.org](https://nodejs.org)).

```bash
npm install     # once, the first time
npm run dev     # then open http://localhost:3000
```

Save any file and the browser updates by itself.

```bash
npm run build   # produces the /out folder that gets deployed
npm run start   # preview that built folder locally
```

---

## The one folder you edit

Everything you will ever change day to day lives in **`content/`**:

| File | What it holds |
|---|---|
| `content/projects.ts` | Your tools and applications |
| `content/journey.ts` | The timeline milestones |
| `content/moments.ts` | The personal photo archive |
| `content/library.ts` | Private library section names (no private URLs — see below) |
| `content/site.ts` | Your name, headline, role, meta description, footer, nav |
| `content/types.ts` | The shape of all the above. You rarely touch this. |

Nothing in `components/` knows the name of a single project. That is deliberate: it is what makes adding a new tool a one-file edit instead of a redesign.

---

## Adding a new tool

1. Open `content/projects.ts`
2. Copy the template block at the bottom of the file
3. Fill in the fields
4. Save, commit, push

That one record automatically produces the AI Lab card, the Latest Builds entry with a **NEW** badge, a full page at `/lab/your-slug/`, a sitemap entry, category filtering, search inclusion and the homepage tool count.

**Required fields:** `id`, `slug`, `name`, `tagline`, `category`, `tags`, `status`, `shortDescription`, `longDescription`, `features`, `technologies`, `createdDate`, `versionHistory`, `launch`, `illustration`, `screenshots`, `isFeatured`.

If you mistype a field name or leave a required one out, `npm run build` stops with a message telling you exactly which file and line. It will not quietly ship a broken card.

---

## Releasing a new version of a tool

Add one entry at the **top** of that project's `versionHistory`:

```ts
versionHistory: [
  { version: 'v2.5', date: '2026-10-12',
    summary: 'Factory collaboration module.',
    changes: ['Shared milestone view', 'Comment threads on POs'] },
  { version: 'v2.4', date: '2026-08-21', summary: 'CRD monitoring dashboard.' },
]
```

There is no separate "current version" or "last updated" field to remember, on purpose. The card version, the Updated date, the Latest Builds ordering, the **UPDATED** badge, the What's New block and the sitemap date are all read from the newest entry, so they cannot fall out of step with each other.

---

## Adding screenshots

1. Put the files in `public/screenshots/<project-slug>/`, named `01-dashboard.webp`, `02-orders.webp`, and so on
2. Add matching entries to that project's `screenshots` array

`width` and `height` are required. Without them the page jumps around as images load.

Until you add any, the project page shows a clean placeholder. It never shows a fake screenshot.

---

## Adding a moment

Put the photo in `public/moments/<year>/` and add a record to `content/moments.ts`. Set `isFeatured: true` on four to six of them to choose which appear on the homepage.

`/moments` is set to `noindex`, so search engines are asked not to list it. **This is a courtesy, not a lock** — anyone with the link can open the page, and the images themselves are public files. Do not put anything there you would mind a stranger seeing.

---

## Activating the private Library

The Library is fully built but dormant. Until you complete these steps, `/library` says it is not yet activated, and the site builds and deploys normally.

**1. Create a Supabase project used by nothing else.**

Not the one behind the AI Merchandising ERP, the LPG Ledger, the Building Management System or any other application. This website and those applications stay completely independent — separate projects, separate databases, separate user accounts. That isolation is the point.

**2. Create the table and lock it down.** In the Supabase SQL editor:

```sql
create table library_items (
  id          uuid primary key default gen_random_uuid(),
  section_id  text not null,
  title       text not null,
  description text,
  drive_url   text not null,
  icon        text,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

alter table library_items enable row level security;

create policy "authenticated read"
  on library_items for select
  to authenticated
  using (true);
```

**3. Add your account** under Authentication → Users. There is no public sign-up.

**4. Set the environment variables** in Cloudflare Pages → Settings → Environment variables (and in a local `.env.local` for development). See `.env.example`.

**5. Add your books and folders** as rows in `library_items`.

### Why the Drive URLs are not in a content file

Anything written into `content/` is compiled into the JavaScript bundle and downloaded by every visitor before they ever reach a login screen. A password in front of it would change nothing — the data would already be in their browser.

So the content file holds only the section names, which are not private. The items and their Drive URLs live in the Supabase table above, behind Row Level Security, and are fetched only after you sign in. An unauthenticated request gets an empty result — not a hidden one.

### Two separate locks

Website authentication and Google Drive permissions are **independent systems**.

If a Drive file is shared as "Anyone with the link", then anyone with the link can open it, no matter what this website does. The login here controls **who can discover the links**. Drive's own sharing settings control **who can open the files**. Set both.

`robots.txt` and `noindex` are not security either. They ask search engines not to list a page; they do not stop anyone from opening it. The only real boundary for Library data is Supabase Auth plus Row Level Security.

---

## Deploying to Cloudflare Pages

Connect the GitHub repository, then:

- **Framework preset:** Next.js (Static HTML Export)
- **Build command:** `npm run build`
- **Output directory:** `out`
- **Node version:** 20 or newer

Every push to the main branch rebuilds and deploys, usually in under a minute.

`public/_redirects` keeps old `/projects` and `/tool/...` links working. `public/_headers` sets security headers and long cache lifetimes for hashed assets.

---

## If a build fails

The error message names the file and line. The three common causes:

1. **A missing comma** between records in a content file
2. **A missing required field** on a new project — the message says which one
3. **A date that is not `YYYY-MM-DD`** — dates must be in that exact format

Run `npm run build` locally before pushing and you will catch all three before Cloudflare does.

---

## What is where

```
app/           One folder per page. layout.tsx wraps every page.
content/       Your data. The only folder you normally edit.
components/    Reusable interface pieces. No project names inside.
lib/           Small helpers: selectors, formatting, Supabase client.
hooks/         Shared browser behaviour.
public/        Images, screenshots, favicon, redirects, headers.
```
