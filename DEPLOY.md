# Deploying to Cloudflare Pages

## 1. Push to GitHub, then connect the repo

Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
**Connect to Git**.

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `22.12.0` (env var `NODE_VERSION`) |

`functions/api/contact.js` is picked up automatically — Pages Functions live in
`functions/` at the repo root, no config needed.

## 2. Custom domain — do BOTH

Pages project → **Custom domains** → Add:

1. `nicovitolocksmith.com`
2. `www.nicovitolocksmith.com`

Adding `www` as a custom domain makes Cloudflare redirect it to the apex
automatically. **Skipping this is the single most common launch mistake** — it
leaves Google with two homepage variants it can't resolve, which is exactly what
sat in the last project's Search Console for weeks.

## 3. Wire up the contact form

The form posts to `/api/contact`. Until an API key is set it returns 503 and the
form falls back to showing the phone number plus a prefilled `mailto:` link, so
no lead is ever silently lost — but you want real email.

Pages project → **Settings** → **Environment variables** (Production):

| Variable | Required | Value |
|---|---|---|
| `RESEND_API_KEY` | yes | API key from [resend.com](https://resend.com) — free tier is plenty |
| `CONTACT_TO` | no | defaults to `nicoandvitolock@gmail.com` |
| `CONTACT_FROM` | no | defaults to Resend's sandbox sender. Replace with an address on your verified domain, e.g. `website@nicovitolocksmith.com` |

To use your own domain as the sender, verify `nicovitolocksmith.com` in Resend
(it gives you DNS records to add in Cloudflare), then set `CONTACT_FROM`.

Redeploy after adding variables — they only apply to new builds.

Test it by submitting the form on the live site and confirming the email arrives.

## 4. Google Search Console — launch day

1. Add the property (Domain property is best: `nicovitolocksmith.com`).
2. Submit the sitemap: `https://nicovitolocksmith.com/sitemap-index.xml`
3. **URL Inspection → Request indexing** for the homepage, `/services/`,
   `/service-areas/`, `/contact/`, and 3–4 top service pages. Don't bother
   requesting all 786 — Google will find the rest through internal links.
4. Watch **Indexing → Pages** over 2–4 weeks.

## 5. Google Business Profile — this matters more than the site

For a local locksmith, the Business Profile drives more calls than the website.

- Set it up as a **service-area business**: hide the street address, set the
  service area to Brooklyn and Staten Island. This matches what the site says
  and what schema.org markup declares. Do not publish a fake storefront address —
  Google suspends locksmith listings for this specifically, and the category is
  already heavily policed because of lead-gen fraud.
- Hours: **7:00 AM – 11:00 PM, every day**. Match the site exactly.
- Primary phone: **(347) 613-0218** — the number on the van and the cards.
- Website: `https://nicovitolocksmith.com`
- Add real photos of the van, the key board, and completed work.
- Locksmiths often face extra verification (video call). Have the van, tools,
  and licensing ready.

## 6. NAP consistency

Name, Address (base city), Phone must be **byte-identical** everywhere: the site,
Google Business Profile, Yelp, Facebook, Apple Maps, Bing Places. Use:

```
Nico & Vito Locksmith
Bay Ridge, Brooklyn, NY 11209
(347) 613-0218
```

Inconsistency here is the most common reason a local business under-ranks.

## 7. After launch

- Add the Google Business Profile / Yelp / Facebook URLs to
  `business.social` in `src/data/business.ts`. They emit as `sameAs` in schema,
  which helps Google connect the site to the listing.
- Start collecting real reviews and add them to `src/data/reviews.ts`.
  The `AggregateRating` schema turns itself on once there are real ones —
  and stays off until then, which is deliberate.
