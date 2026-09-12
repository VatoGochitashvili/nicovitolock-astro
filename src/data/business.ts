// Central business facts — the single source of truth for NAP (Name, Address,
// Phone), schema.org output, and every piece of contact UI on the site.
// NAP consistency is the strongest local-SEO signal there is: change a fact
// here and it changes everywhere, so the site never contradicts itself.

export const business = {
  name: 'Nico & Vito Locksmith',
  legalName: 'Nico and Vito Locksmith Inc',
  shortName: 'Nico & Vito',
  tagline: 'Bay Ridge Locksmith Serving Brooklyn & Staten Island',
  shortPitch:
    'A neighborhood locksmith run out of Bay Ridge, Brooklyn. Lockouts, lock changes, car keys, intercoms, and cameras — done by licensed techs who actually live around here.',

  // The ONE number. Single primary everywhere — site, Google Business Profile,
  // every citation. NAP consistency depends on it never varying.
  phone: '718-618-6002',
  phoneHref: '+17186186002',
  phoneDisplay: '(718) 618-6002',
  /** Same number, formatted for an SMS link — locksmith customers text. */
  smsHref: 'sms:+17186186002',
  // Published everywhere on the site: footer, contact page, about page, the
  // LocalBusiness schema, and the form's mailto fallback. Cloudflare Email
  // Routing forwards it to nicoandvitolock@gmail.com, so it reaches the same
  // inbox while presenting the domain rather than a Gmail address — which is
  // what the Business Profile and any citation should match.
  email: 'info@nicovitolocksmith.com',

  // FULLY MOBILE — no walk-in shop. Do not publish a street address.
  //
  // The storefront image in /public/work is AI-GENERATED, not a photograph of
  // a real premises. An earlier commit mistook it for proof of a shop and
  // published 8516 5th Avenue; that was wrong and is reverted here. Publishing
  // an address a customer cannot visit is exactly what gets locksmith listings
  // suspended, and Google polices this category hard.
  isServiceAreaBusiness: true,
  base: {
    neighborhood: 'Bay Ridge',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11209',
    country: 'US',
  },
  // Bay Ridge, Brooklyn — the service-area centre, not a premises.
  geo: { lat: 40.6255, lng: -74.0298 },

  hours: {
    // NOT 24/7 — real hours, every day.
    label: 'Open every day, 7:00 AM – 11:00 PM',
    short: 'Every day 7 AM – 11 PM',
    opens: '07:00',
    closes: '23:00',
    display: [{ days: 'Monday – Sunday', time: '7:00 AM – 11:00 PM' }],
    schema: ['Mo-Su 07:00-23:00'],
  },

  responseTimePromise: 'Most Brooklyn calls reached in 20–30 minutes',
  yearsInBusiness: 15,
  licenseNote: 'Licensed & insured New York locksmith',

  /**
   * NYC DCWP locksmith licence number, e.g. '2096389-DCA'.
   *
   * LEAVE EMPTY UNTIL THE REAL NUMBER IS KNOWN. Never guess one — a fabricated
   * licence number is a false credential, and in a category Google polices
   * specifically for lead-generation fraud it is the fastest way to lose the
   * Business Profile.
   *
   * Worth filling in. Every competitor ranking for "locksmith Bay Ridge"
   * displays theirs in the header and footer, and "licensed & insured" without
   * a number is a claim a customer cannot check. Every component that shows it
   * renders nothing while this is empty, so the site stays honest either way.
   */
  licenseNumber: '',

  // Profile URLs. These emit as schema.org `sameAs`, which is how Google ties
  // this website and the Business Profile together as one entity.
  //
  // The Google URL is the canonical CID form, resolved from the owner's
  // g.page short link: /r/CWk8jH1ykbTcEBM -> place data 1s0x…:0xdcb491727d8c3c69
  // -> CID 15903496105070705769. The CID form is stable and does not depend on
  // a redirect service staying up.
  social: {
    google: 'https://maps.google.com/?cid=15903496105070705769',
    facebook: '',
    instagram: '',
    yelp: '',
  },

  /** Deep link that opens the "write a review" dialog directly. */
  reviewUrl: 'https://g.page/r/CWk8jH1ykbTcEBM/review',
  /** The profile itself, for "read our reviews" links. */
  profileUrl: 'https://maps.google.com/?cid=15903496105070705769',

  /**
   * Rating shown on the Google Business Profile, verified 2026-09-05.
   * DISPLAY ONLY — this is deliberately NOT emitted as AggregateRating schema.
   * Google discounts (and can penalise) self-serving review markup where a
   * business marks up its own rating, and it requires a review COUNT that the
   * public profile does not expose. Linking to the profile is the correct and
   * safe way to surface it. Re-check the value before changing it.
   */
  googleRating: '5.0',
  /**
   * NOT DISPLAYED. The owner asked for the count off the site — with a small
   * number, showing it undercuts the rating rather than supporting it. Kept
   * only as a record of what the profile said on 2026-09-11. Do not put it
   * back in the UI without asking.
   */
  googleReviewCount: 11,

  brands: [
    'Mul-T-Lock', 'Medeco', 'Schlage', 'Kwikset', 'Yale', 'ASSA ABLOY',
    'Arrow', 'Marks USA', 'Adams Rite', 'Von Duprin', 'LCN', 'Detex',
    'Aiphone', 'Akuvox', 'Doorking', 'Hikvision', 'Lockly', 'August',
  ],

  highlights: [
    { label: 'Based in', value: 'Bay Ridge' },
    { label: 'Open daily', value: '7am – 11pm' },
    { label: 'Typical arrival', value: '20–30 min' },
    { label: 'Licensed & insured', value: 'Yes' },
  ],

  // Payment / practical facts reused in schema + FAQ
  paymentAccepted: 'Cash, Credit Card, Debit Card, Zelle',
} as const;

export type Business = typeof business;

/** Boroughs served, in priority order. */
export const boroughsServed = ['Brooklyn', 'Staten Island'] as const;
