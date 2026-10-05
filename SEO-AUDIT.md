# Indexation audit — nicovitolocksmith.com

**2026-10-04.** Measured against the built `dist/` (814 HTML files: 813 indexable
pages + the noindexed 404), using `audit_scan.py` and `similarity.py` (5-gram
Jaccard on `<main>` text). Starting point: `main` at `d37452f`, which already
carried the earlier audit's fixes (copy, meta descriptions, schema, share cards,
404 handling).

The short version: the site was already in good shape for indexing. The template
copy is distinct, every page is two clicks from the homepage, and the metadata is
clean. This pass closed the remaining gaps: near-orphan pages, a head-term overlap,
two-hop redirects, image dimensions and sitemap priorities. What decides indexing
from here is Google's view of a young, low-authority domain, and code can't change
that.

---

## Already compliant (measured, not changed)

| Check | Result |
|---|---|
| Duplicate / missing titles | 0 / 0 |
| Duplicate / missing meta descriptions | 0 / 0 |
| Pages with ≠ 1 `<h1>` | 0 |
| Canonicals | all self-referencing (the noindexed 404 is the only mismatch, as expected) |
| Robots meta | 813 × `index, follow`, 1 × `noindex` (404) |
| `robots.txt` | allows all, no CSS/JS blocked, lists the index and 6 segment sitemaps |
| Sitemap | 813 canonical, indexable URLs only (404 excluded), segmented by page type, `lastmod` from a content hash |
| Click depth from `/` | max **2**. 0 unreachable pages |
| Static legacy redirects | 48/48 single hop to a 200 |

### Duplicate content: the make-or-break check

Two numbers per cluster. The skill's raw `<main>` measure counts the contact form,
whose 105-neighborhood select (~300 words) is identical on every page. Google
treats a form that repeats sitewide as boilerplate, so the second column (form
excluded) is the fairer read of the actual page content.

| Cluster | Pages | Median (raw) | Median (form excluded) | Worst pair (form excluded) |
|---|---|---|---|---|
| 12 services in one neighborhood (Bath Beach) | 12 | 18.7% | **6.0%** | 13.6% |
| One service across 55 neighborhoods (rekeying) | 55 | 23.2% | **10.9%** | 29.8% |
| Neighborhood pages | 107 | 25.1% | **12.0%** | 29.9% |
| Car-make pages | 22 | 26.8% | **13.2%** | 42.7% |
| Service pages | 12 | 19.1% | — | 21.0% |

Every cluster is below the ~25–40% band that is normal for related local pages,
and nowhere near the ~70%+ that signals real template duplication. **Uniqueness is
not what holds these pages back.** The highest car-make pairs share FAQ answers
drawn from small pools. Rewording those to push a number down would read worse and
help nothing, so they are left alone.

### Cannibalization (content overlap, form excluded)

| Pair | Overlap | Links both ways |
|---|---|---|
| `/` ↔ `/service-areas/brooklyn/` | 5.5% | yes |
| `/` ↔ `/service-areas/bay-ridge/` | 1.2% | yes |
| `/services/car-key-replacement/` ↔ `/car-keys/` | 3.4% | yes |
| `/service-areas/bay-ridge/` ↔ `/services/emergency-lockout-service/bay-ridge/` | 1.9% | yes |
| `/services/emergency-lockout-service/` ↔ its Bay Ridge page | 10.6% | yes |

No content duplication anywhere. One overlap in intent: the homepage and the
borough hubs both titled themselves "Brooklyn/Staten Island Locksmith". This is
fixed below by changing the titles, not by consolidating.

---

## Fixes shipped in this pass

| # | Fix | Was → now | Files |
|---|---|---|---|
| 1 | **Contextual links to near-orphans.** Every work gallery links to the full gallery. Every neighborhood page links to its borough hub. Reviews, Contact, About and the hiring guide link to each other and to the FAQ | Links from page content: `/our-work/` **1 → 689** · `/service-areas/brooklyn/` **1 → 51** · `/service-areas/staten-island/` **1 → 56** · `/faq/` **0 → 3** · `/how-to-hire-a-locksmith/` **1 → 3** · `/about/` **1 → 3** | `src/components/WorkGallery.astro`, `src/pages/service-areas/[slug].astro`, `src/pages/{reviews,contact,about,how-to-hire-a-locksmith}.astro` |
| 2 | **Borough hubs lead with coverage**, leaving the bare head term to the homepage | "Brooklyn Locksmith \| Nico & Vito, Bay Ridge" → "Brooklyn Locksmith in All 50 Neighborhoods \| Nico & Vito" (and the Staten Island equivalent, 55). The H1 is now "… locksmith, neighborhood by neighborhood" | `src/data/boroughs.ts` |
| 3 | **Single-hop redirects** | `/locations/bay-ridge`, `/areas/…`, `/service-area/…`, `/neighborhoods/…`, `/service/…`: **2 hops → 1**. `www.…/about` (no slash): **2 hops → 1** | `public/_redirects`, `worker/index.js` |
| 4 | **Backdrop image dimensions** (decorative, `aria-hidden`, absolutely positioned, so there was no real CLS) | `<img>` missing width/height: **846 → 0** | `src/components/PhotoFrame.astro` |
| 5 | **Sitemap priority within core pages** | `/` 0.9 → **1.0**. `/privacy/`, `/terms/` 0.9 → **0.3** (Google largely ignores `priority`, so this is housekeeping) | `scripts/sitemaps.mjs` |

Re-measured after the fixes: 0 duplicate titles/descriptions, one H1 per page,
0 JSON-LD errors, `astro check` 0 errors, cluster medians unchanged (±0.3 points).

---

## Deliberately not changed

- **No copy rewriting for uniqueness.** It is already distinct (see the table above).
- **The contact form's 105-option neighborhood select** inflates every raw
  similarity number. It is boilerplate to Google, and `ContactForm.astro` is part
  of a homepage redesign still in progress. Revisit after that lands (option: show
  only the page's area and its neighbors, plus "elsewhere in Brooklyn/Staten Island").
- **No pruning of the 660 service × neighborhood pages yet.** That decision needs
  Search Console data (below), not a guess.
- **`http://www…` → apex is still 2 hops.** The `http → https` hop happens at
  Cloudflare's edge ("Always Use HTTPS") before the Worker runs. A single Cloudflare
  Redirect Rule (scheme `http` or host `www` → `https://nicovitolocksmith.com${path}`)
  would make it one hop. That's a dashboard change and low priority.

---

## Google Search Essentials: compliance

| Area | Status |
|---|---|
| Googlebot can crawl (robots, 200s, no blocked resources) | ✅ |
| Indexable content in server HTML (static, no JS needed) | ✅ |
| Canonicals / duplicate handling | ✅ self-referencing, one host, single-hop redirects |
| Spam: doorway pages | ⚠️ watch. 767 location pages on a young domain. Content is measurably distinct per page, and the pages carry real local detail, so the risk is low. Google's indexing decision is the real test |
| Spam: scaled content abuse | ✅ copy is built from per-area and per-service data the business owns, with no invented facts |
| Spam: fake reviews / self-serving rating markup | ✅ no reviews invented, no `AggregateRating` |
| Descriptive titles and descriptions, crawlable `<a href>` links, image alt text | ✅ |
| Structured data valid | ✅ 0 errors |

---

## Owner follow-ups (not code)

1. **Search Console → Sitemaps:** resubmit `sitemap-index.xml`.
2. **URL Inspection → Request indexing:** `/`, `/services/`, `/service-areas/brooklyn/`, `/service-areas/staten-island/`, `/our-work/`.
3. **Watch Indexing → Pages, filtered per sitemap**, weekly for 6–8 weeks.
   `sitemap-local.xml` (660) and `sitemap-areas.xml` (107) are the ones that matter.
   If more than ~50% of `sitemap-local` is still "Crawled / Discovered – currently not
   indexed" after that, noindex and drop the low-demand service × area combinations
   and keep the strongest services across the 55 core neighborhoods.
4. **Authority, the lever code can't pull:** Google Business Profile reviews, citations
   (Apple, Bing, Yelp, BBB, Nextdoor), and local links. On a domain registered in
   July 2025 this, more than anything on the site, sets how many of 813 pages Google
   keeps.
