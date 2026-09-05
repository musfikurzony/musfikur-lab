# Adding a tool, or a link to one

**Short answer: you do this yourself, in your browser, in about two minutes. You never need to ask for code.**

Everything on the site comes from one file: `content/projects.ts`. The cards, the AI Lab grid, the Latest Builds section, each tool's own page, the search, the filters and the tool count on the homepage are all built from it. Nothing is written into the design.

You edit that file on GitHub. Cloudflare notices the change and rebuilds the site by itself, usually in under a minute.

---

## Task 1 — Add a link to a tool you already have

Right now every tool shows **"View Project →"** because none of them has a URL yet. Once you add one, that button becomes **"Open Tool →"** and opens your application.

1. Go to **github.com/musfikurzony/musfikur-lab**
2. Click the **`content`** folder, then **`projects.ts`**
3. Click the **pencil icon** (top right of the file) to edit
4. Find the tool you want. Look for its `launch` block:

```ts
    launch: {
      url: null,
      access: 'auth',
      openInNewTab: true,
    },
```

5. Put your real URL where `null` is, **in quotes**:

```ts
    launch: {
      url: 'https://ai-merchandising-erp.pages.dev',
      access: 'auth',
      openInNewTab: true,
    },
```

6. Scroll down, click **Commit changes**

Done. Wait a minute, refresh your site, and the button opens your app.

### What `access` means

| Value | Card shows | Use it when |
|---|---|---|
| `'public'` | ● LIVE, **Open Tool →** | Anyone can use the tool without logging in |
| `'auth'` | ● LIVE + 🔒, **Open Tool →** | The tool has its own login screen |
| `'none'` | **View Project →** | No public URL yet |

With `'auth'`, the visitor clicks through to **your application's own login**. This website never asks for those passwords, never stores them and never has a login form of its own. Your apps stay completely separate, exactly as you asked.

---

## Task 2 — Add a brand-new tool

Same file, same pencil icon.

At the very bottom of `content/projects.ts` there is a commented-out **TEMPLATE** block. Copy it, paste it above the final `];`, remove the `/*` and `*/` around it, and fill it in.

Here is a filled-in example:

```ts
  {
    id: 'fabric-consumption-calculator',
    slug: 'fabric-consumption-calculator',
    name: 'Fabric Consumption Calculator',
    tagline: 'Estimate fabric consumption per style before costing.',

    category: 'merchandising',
    tags: ['Costing', 'Consumption', 'Calculator'],
    status: 'live',

    shortDescription: 'A quick calculator for estimating fabric consumption across styles and size ratios.',
    longDescription: `Longer explanation for the tool's own page.

    Leave a blank line to start a new paragraph.`,
    features: ['Per-style consumption', 'Size ratio breakdown', 'Wastage allowance'],

    technologies: ['JavaScript'],

    createdDate: '2026-09-05',
    versionHistory: [
      { version: 'v1.0', date: '2026-09-05', summary: 'First release.' },
    ],

    launch: {
      url: 'https://your-tool.pages.dev',
      access: 'public',
      openInNewTab: true,
    },

    illustration: 'generic',
    accent: 'blue',
    screenshots: [],

    isFeatured: false,
  },
```

Commit. That one block automatically creates:

- a card in the AI Lab
- an entry in Latest Builds, with a **NEW** badge
- its own page at `/lab/fabric-consumption-calculator/`
- an entry in the sitemap for Google
- inclusion in search and in the category filters
- +1 on the homepage tool count

**No design work. No code from me. One record.**

---

## The fields, in plain terms

| Field | What to put |
|---|---|
| `id` and `slug` | lowercase-with-hyphens, no spaces. `slug` becomes the web address, so don't change it later. |
| `name` | What people see |
| `tagline` | One short line for the card |
| `category` | `merchandising`, `logistics`, `business`, `finance` or `productivity` |
| `tags` | A few keywords |
| `status` | `live`, `active`, `beta`, `development`, `experiment`, `evolving` or `archived` |
| `shortDescription` | One or two sentences |
| `longDescription` | A few paragraphs, inside backticks |
| `features` | What it actually does |
| `technologies` | What it's built with. `[]` is fine. |
| `createdDate` | `'2026-09-05'` format, or `null` |
| `versionHistory` | Newest first, or `[]` |
| `launch` | See Task 1 |
| `illustration` | `erp-flow`, `ldp-flow`, `container-flow`, `ledger-flow`, `building-flow`, `audit-flow`, `toolkit-flow` or `generic` |
| `accent` | `blue`, `indigo`, `cyan` or `green` |
| `screenshots` | `[]` until you have some |
| `isFeatured` | `true` puts it on the homepage. Keep this to about five tools. |

---

## Task 3 — Release a new version

Add one line at the **top** of that tool's `versionHistory`:

```ts
    versionHistory: [
      { version: 'v2.5', date: '2026-10-12', summary: 'Factory collaboration module.' },
      { version: 'v2.4', date: '2026-08-21', summary: 'CRD monitoring dashboard.' },
    ],
```

The version shown on the card, the "Updated" date, the position in Latest Builds and the **UPDATED** badge all read from the newest line. There is nothing else to remember to change.

---

## If something goes wrong

You cannot break the live site by making a mistake in this file. If the file has an error, the build stops and **the old version of your site stays up**. Cloudflare shows a red "Build failed" with a message naming the file and line.

The three usual causes:

1. **A missing comma** between two `}` and `{` blocks
2. **A missing quote** around a piece of text
3. **A date in the wrong format** — it must be `'2026-09-05'`, not `'05/09/2026'`

Fix it, commit again, and the site rebuilds.

---

## When you *would* need me

Only for things that change the *design or structure*, not the content:

- A new category beyond the five that exist
- A new status badge
- A new kind of illustration
- Changing how a page is laid out
- New sections or new pages

Adding tools, links, versions, descriptions, screenshots and tags is all yours.
