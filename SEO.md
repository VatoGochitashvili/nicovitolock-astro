# SEO — Nico & Vito Locksmith

Everything below marked ✅ is **measured against the built `dist/`**, not assumed.
Re-run the checks after any content change.

---

## 1. Technical foundation — done

| Check | Result |
|---|---|
| Pages built | 786 |
| Duplicate `<title>` | **0** |
| Duplicate meta description | **0** |
| Duplicate canonical | **0** |
| Titles over ~60 chars (SERP truncation) | **0** |
| Descriptions outside 70–165 chars | **0** |
| Pages with ≠ 1 `<h1>` | **0** |
| Images missing `alt` | **0** |
| Invalid JSON-LD | **0** |
| Duplicate element `id`s | **0** |
| Orphan pages | **0** |
| Broken internal links | **0** |
| canonical == `og:url` == sitemap URL | all 785 indexable |
| Median words / page | ~877 |

**Structured data**: `Locksmith` (the anchor node), `WebSite`, `Organization`,
`BreadcrumbList` on every deep page, `Service` per service and per
service × neighborhood, `FAQPage` wherever FAQs render. `AggregateRating` is
deliberately **absent** until real reviews exist — see §5.

---

## 2. Site architecture

```
/                          homepage
/services                  hub  → 12 service pages
/services/[slug]           12 services
/services/[slug]/[area]    660 service × neighborhood pages (55 tier-1 areas)
/service-areas             hub  → 105 neighborhoods
/service-areas/[slug]      105 neighborhood pages
/pricing /about /faq /reviews /contact
```

**Neighborhoods are tiered on purpose.** 55 tier-1 areas get the full 12-service
matrix; the other 50 get a neighborhood page only. A full 105 × 12 would be 1,260
pages of near-identical text, which is what Google filters as doorway content.
Depth where it converts, coverage everywhere else.

---

## 3. Internal linking — measured ✅

| Metric | Value |
|---|---|
| Max click depth from homepage | **2** |
| Unreachable pages | **0** |
| Inbound internal links — median | **15** |
| Inbound internal links — minimum | **2** |

Every one of the 786 pages is reachable in two clicks. That matters more than
raw link count at this scale: crawl budget is spent on depth, and a page five
clicks deep on a small-authority domain often never gets fetched.

The link graph is built from:
- footer neighborhood index (all 105, on every page)
- homepage service index + coverage index
- service page → its 55 neighborhood variants
- neighborhood page → all 12 services in that neighborhood
- service × area page → 6 sibling services + adjacent neighborhoods
- breadcrumbs on every deep page

---

## 4. Content uniqueness — measured ✅

5-gram Jaccard similarity on the real built output:

| Comparison | Median |
|---|---|
| Same service across 55 neighborhoods | **~10%** |
| The 105 neighborhood pages vs each other | **~13%** |
| Same neighborhood, different services | **~14%** |

Driven by: 12 features / 10 scenarios per service rendered as a seeded subset of
6 / 5 per neighborhood; housing-trait paragraphs keyed to each area's `traits`;
10–13 variants in every sentence pool; real per-area ZIPs, streets, drive times.

**On "100% unique":** pages about the same service must share some facts — the
hours, the phone number, what rekeying *is*. That is correct and expected. What
gates indexation is distinct *primary* content and intent, which these have.
Driving similarity toward zero requires text-spinning, which is itself a spam
signal.

---

## 5. What only the owner can do

These move the needle more than anything left in the code.

### 5a. Google Business Profile — the single highest-impact item
For a locksmith, the Business Profile drives more calls than the website.

- Register as a **service-area business**. Hide the street address, set the
  service area to Brooklyn + Staten Island. This matches the site and the
  schema. **Do not publish a fake storefront address** — Google actively
  suspends locksmith listings for it; the category is heavily policed because
  of lead-gen fraud.
- Hours: **7:00 AM – 11:00 PM, every day.** Match the site exactly.
- Primary phone: **(718) 618-6002.**
- Website: `https://nicovitolocksmith.com`
- Add real photos: the van, the key board, completed work.
- Expect extra verification (often video call). Have the van, tools, and
  licensing ready.

### 5b. NAP consistency
Name / Address / Phone must be **byte-identical** everywhere:

```
Nico & Vito Locksmith
Bay Ridge, Brooklyn, NY 11209
(718) 618-6002
```

⚠️ **The van and the printed business cards currently show 347-613-0218.**
Both numbers reach the shop, but citations must all carry the same primary.
Either re-letter the van to 718-618-6002, or tell me and I'll flip the site's
primary back to the 347 number. Mixed primaries across listings is a real
ranking drag.

### 5c. Reviews
`src/data/reviews.ts` ships empty on purpose, and no `AggregateRating` schema is
emitted until it isn't. **Never paste in invented reviews** — fake review markup
is a common cause of a manual penalty that pulls rich results for the whole
domain. Ask every real customer; add them as they arrive and the rating schema
turns itself on.

---

## 6. Backlinks — read this honestly

**I cannot build backlinks.** They come from other people's websites, so they
require outreach, submissions, and relationships. Anyone who offers to "add
backlinks" to your site programmatically is selling either link-farm placements
or nothing — and bought links are a documented cause of manual penalties.

What actually works for a local locksmith, in priority order:

**Tier 1 — citations (do these first, free, ~2 hours total)**
Apple Maps · Bing Places · Yelp · Facebook · Nextdoor · Yellow Pages · BBB ·
Angi · Thumbtack · Porch · Foursquare · Manta · Chamber of Commerce
→ Same NAP every time. These are the baseline every ranking local business has.

**Tier 2 — local and trade**
- Bay Ridge / Brooklyn neighborhood associations and BIDs
- Local news and community sites (Bay Ridge Journal, Brooklyn Paper)
- ALOA (Associated Locksmiths of America) member directory
- Supplier/brand dealer pages — Mul-T-Lock, Medeco, Aiphone often list
  authorized installers
- Insurance and real-estate agent referral pages

**Tier 3 — earned**
- Sponsor a local team, event, or school fundraiser (usually gets a linked
  listing, and it's real community presence)
- Offer the Bay Ridge community groups a genuinely useful piece — the
  fake-locksmith warning on `/pricing` is exactly the kind of thing that gets
  shared and linked

**When you have profile URLs**, paste them into `business.social` in
`src/data/business.ts`. They emit as schema `sameAs`, which is how Google
connects this site to those listings. That field is currently empty and is the
one backlink-adjacent thing I *can* wire up for you.

---

## 7. Launch checklist

1. Delete the leftover GoDaddy apex `A`/`AAAA` + `www` records in Cloudflare DNS
2. Pages → Custom domains → add **both** `nicovitolocksmith.com` and `www.…`
3. SSL/TLS → **Full (strict)** + **Always Use HTTPS**
4. Set `RESEND_API_KEY` so the quote form emails you
5. Search Console: add the domain property, submit
   `https://nicovitolocksmith.com/sitemap-index.xml`
6. Request indexing for `/`, `/services/`, `/service-areas/`, `/pricing/`, and
   3–4 top service pages. Don't request all 786 — internal links carry the rest.
7. Set up Google Business Profile (§5a)
8. Work the Tier 1 citation list (§6)

Then watch **Indexing → Pages** in Search Console over 2–4 weeks.

---

## 8. Re-running the checks

The audit scripts live outside the repo, but the checks are simple enough to
rebuild: parse `dist/**/*.html` and assert on duplicate titles/descriptions/
canonicals, `<h1>` count, `alt` presence, JSON-LD validity, internal link
targets, and sitemap agreement. Always **html-unescape before measuring title
length** — `&amp;` inflates a raw character count by 4 and produced a false
"711 titles too long" reading on the first pass.
