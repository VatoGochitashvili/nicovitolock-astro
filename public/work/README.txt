Nico & Vito Locksmith — real work photographs
============================================

Every image here is the business's own, shot on the job — with ONE exception
noted below. None of it is stock.

⚠️  storefront-5th-avenue.* is AI-GENERATED, not a photograph of a real place.
    Nico & Vito is FULLY MOBILE — there is no walk-in shop and no published
    street address. That image must never be captioned as "our shop", never
    appear on the contact page, and never imply a visitable address. It is used
    only as heavily dimmed background texture on /about, via
    /brand/bg-shopfront.webp. An earlier commit mistook it for a real photo and
    published a street address; that was wrong and has been reverted. That is the point — these are the most
valuable images on the site because nobody else has them, they prove the
business is real, and they give every service page unique visual content.

Shown in NATURAL COLOUR, deliberately. The brand duotone in /brand/ is for
backgrounds, where an image is atmosphere. Here the photo IS the evidence, and
duotoning genuine proof would make it look like stock.

Each file has two variants:
  <slug>.webp       ~1200px  — retina / large displays
  <slug>-800.webp    800px   — what almost every visitor actually loads

Which photo appears on which page is decided in src/data/work.ts, by the
`services` and `makes` arrays. A photo only shows where it genuinely
illustrates that work: the BMW key shots appear on /car-keys/bmw, the keypad
appears on access control and commercial, and so on.

LICENSED STOCK — four files, clearly marked
  stock-security-cameras.*  stock-smart-lock.*
  stock-access-control.*    stock-intercom-panel.*

  These four services had no first-party photo, and the cards were previously
  showing the WRONG job (intercom illustrated by a door closer, CCTV by a
  window). Unsplash License, commercial use permitted.

  They are flagged `stock: true` in src/data/work.ts and are EXCLUDED from the
  "Recent work" galleries by ownPhotosForService() — those galleries claim the
  work is ours, so only our own photographs belong there. Stock appears solely
  on the homepage service cards, which illustrate a service rather than claim a
  job.

  Replace each one the moment a real photo exists. A genuine install beats
  stock for trust and for image search every time. Worth shooting: a camera you
  mounted, an intercom panel you replaced, a keypad you fitted, a smart lock on
  a customer's door.

TO ADD MORE
  1. Drop the originals anywhere and process them to the same spec:
       ~1200px and 800px wide, WebP, quality 68 / 74
  2. Add an entry to src/data/work.ts with honest alt text — describe what is
     actually visible, not keywords. Two of the first batch had to be corrected
     because the alt text described the van when the photo showed a customer's
     car interior.
  3. Tag it with the service slugs (and make slugs) it genuinely shows.

WORTH SHOOTING NEXT
  the shop interior and the key wall · a tech at a Brooklyn apartment door ·
  key cutting in progress · a finished intercom panel · a camera install ·
  the van parked on 5th Avenue
