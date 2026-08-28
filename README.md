# Nico & Vito Locksmith — nicovitolocksmith.com

Static Astro site for **Nico & Vito Locksmith**, a Bay Ridge, Brooklyn locksmith
serving all of Brooklyn and Staten Island.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/  (786 pages)
npm run preview
```

Node 22.12+ (see `.nvmrc`).

## Where things live

| Path | What it is |
|---|---|
| `src/data/business.ts` | **NAP single source of truth** — name, phones, email, hours, geo. Change a fact here and it changes everywhere: UI, schema, meta tags. |
| `src/data/services.ts` | The 12 services. Each generates `/services/[slug]` and, combined with tier-1 areas, `/services/[slug]/[area]`. |
| `src/data/locations.ts` | 105 neighborhoods. `tier: 1` gets the full service matrix; `tier: 2` gets an area page only. |
| `src/data/reviews.ts` | Empty on purpose. **Only paste in real reviews** — see the warning at the top of the file. |
| `src/lib/localize.ts` | Per-neighborhood copy variation — sentence pools, housing-trait paragraphs, and seeded subsets of each service's feature/scenario lists. Deterministic, so pages are stable across builds but differ sharply from each other. |
| `src/components/HeroBg.astro` | Dimmed photo hero backgrounds. `neighborhood` = Brooklyn row houses (home, area pages), `truck` = the van (service pages). Scrim floors are set from measured contrast — see the comment before changing them. |
| `src/lib/seo.ts` | JSON-LD builders, canonical/trailing-slash normalization, title-length clamping. |
| `src/styles/global.css` | The design system — white chrome, navy ink, one brass accent, dimmed photography. Palette pulled from the logo. |
| `functions/api/contact.js` | Cloudflare Pages Function that emails the quote form. See `DEPLOY.md`. |

## Page inventory

```
1    homepage
12   /services/[slug]
660  /services/[slug]/[area]      12 services × 55 tier-1 neighborhoods
105  /service-areas/[slug]
8    /services, /service-areas, /about, /contact, /pricing, /faq, /reviews, /404
---
786  total
```

## Common edits

**Change the phone number** → `src/data/business.ts`. It updates the header,
footer, sticky mobile bar, every CTA, every schema block, and ~700 pages of copy.

**Add a neighborhood** → append to `src/data/locations.ts`. Set `tier: 1` to
generate all 12 service pages for it, or `tier: 2` for an area page only.
It appears in the footer index, the areas page, and the contact form automatically.

**Add a service** → append to `src/data/services.ts`. Include `workTerm`
(a lowercase noun that reads naturally before "work"/"jobs"/"calls" — the full
service name usually doesn't).

**Add reviews** → `src/data/reviews.ts`. Rating schema switches itself on only
when real reviews exist. Do not invent any; see the file header.

## Quality gates

The build was verified against `dist/` (not assumed):

- 0 duplicate titles, descriptions, or canonicals across 786 pages
- 0 titles over 60 chars, 0 descriptions outside 70–165 chars
- exactly one `<h1>` per page, every `<img>` has `alt`
- 0 orphan pages, 0 broken internal links, every page ≥2 inbound links
- canonical === `og:url` === sitemap URL on every page (trailing-slash consistent)
- all JSON-LD parses
- 0 sentences starting mid-interpolation (lowercase-start scan across all 786)
- median 861 words/page
- `astro check`: 0 errors, 0 warnings, 0 hints

### Content uniqueness (5-gram Jaccard, measured on `dist/`)

| Page set | Median | p90 | Max |
|---|---|---|---|
| Same service across 55 neighborhoods | **9.5%** | 20% | 35% |
| The 105 neighborhood pages vs each other | **12.6%** | 24% | 37% |
| Guard: same neighborhood, different services | **9.7%** | — | 44% |

Zero list items or paragraphs now repeat across every page of a service cluster.
The levers: 12 features / 10 scenarios per service rendered as a seeded subset of
6 / 5 per neighborhood, housing-trait paragraphs keyed to each area's `traits`,
and 10–13 variants in every sentence pool.

Note on "100% unique": pages about the same service necessarily share some facts
(hours, phone, licensing, what the service *is*) — that is correct and Google
expects it. What matters for indexation is distinct *primary* content and intent,
which these have. Pushing similarity toward zero would require text-spinning,
which is itself a spam signal.
