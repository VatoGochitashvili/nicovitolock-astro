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

## 3. Wire up the contact form — DO THIS, it is where the leads go

The form posts to `/api/contact`. Until a provider is configured it returns 503
and falls back to showing the phone number plus a prefilled `mailto:`, so no
lead is silently lost — but you want it landing in your inbox automatically.

Pick **ONE**. Resend takes about two minutes.

### Option A — Resend (recommended)
1. Sign up at **resend.com** (free tier is far more than enough)
2. Copy the API key (`re_...`)
3. Cloudflare → your Pages project → **Settings → Environment variables →
   Production**, add:

   | Variable | Value |
   |---|---|
   | `RESEND_API_KEY` | `re_...` |
   | `CONTACT_TO` | `nicoandvitolock@gmail.com` *(optional — this is the default)* |

4. **Redeploy** — environment variables only apply to new builds

### Option B — Web3Forms (no account at all)
1. Go to **web3forms.com**, enter `nicoandvitolock@gmail.com`, and they email
   you an access key
2. Add `WEB3FORMS_KEY` as an environment variable, redeploy

### Option C — your own webhook
Set `FORM_WEBHOOK_URL` to a Zapier / Make / n8n endpoint and the raw submission
is POSTed there as JSON.

The function tries whichever of these are set, in that order, and stops at the
first success. Test by submitting the live form and confirming the email lands.

### Getting requests on your phone

**Email push is the practical answer.** Install Gmail on the phone, sign in as
`nicoandvitolock@gmail.com`, and turn notifications on for that account — a
submission then buzzes the phone within seconds. That is what most trades use.

**Real SMS is not free.** Sending a text programmatically needs a paid gateway
(Twilio, roughly a cent a message) plus a verified sender. If you want it, say
so and it is a small addition to the same function.

Meanwhile the site already routes people to your phone directly:
- a **Call** button and a **Text us** button on every quote form
- **Call / Text / Quote** in the sticky bar on mobile
- `sms:` links open the customer's own messaging app addressed to
  718-618-6002, which costs nothing and works today

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
- Primary phone: **(718) 618-6002** (confirmed by the owner).
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
(718) 618-6002
```

⚠️ The van and the printed business cards still show **347-613-0218**. Both
numbers reach the shop, but every citation must carry the same primary or the
listings fight each other. Either re-letter the van, or switch the site's
primary back — it is one line in `src/data/business.ts`.

Inconsistency here is the most common reason a local business under-ranks.

## 7. After launch

- Add the Google Business Profile / Yelp / Facebook URLs to
  `business.social` in `src/data/business.ts`. They emit as `sameAs` in schema,
  which helps Google connect the site to the listing.
- Start collecting real reviews and add them to `src/data/reviews.ts`.
  The `AggregateRating` schema turns itself on once there are real ones —
  and stays off until then, which is deliberate.
