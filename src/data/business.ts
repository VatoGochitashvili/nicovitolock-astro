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

  // PRIMARY line — confirmed by the owner 2026-08-29. This is the number that
  // must appear in Google Business Profile and every citation.
  // NOTE: the van and the printed business cards still show 347-613-0218.
  // Both numbers reach the shop, but NAP consistency wants ONE primary
  // everywhere — see DEPLOY.md before updating listings.
  phone: '718-618-6002',
  phoneHref: '+17186186002',
  phoneDisplay: '(718) 618-6002',
  // Secondary line (the number currently on the van and the cards).
  phoneAlt: '347-613-0218',
  phoneAltHref: '+13476130218',
  phoneAltDisplay: '(347) 613-0218',
  email: 'nicoandvitolock@gmail.com',

  // Service-area business: van-based, no walk-in storefront. We publish the
  // base neighborhood (correct + honest) but no street address, which is what
  // Google expects for an SAB and avoids a false-address listing problem.
  isServiceAreaBusiness: true,
  base: {
    neighborhood: 'Bay Ridge',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11209',
    country: 'US',
  },
  // Bay Ridge, Brooklyn (approx. 3rd Ave & 86th St)
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

  social: {
    google: '',
    facebook: '',
    instagram: '',
    yelp: '',
  },

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
  priceRange: '$$',
} as const;

export type Business = typeof business;

/** Boroughs served, in priority order. */
export const boroughsServed = ['Brooklyn', 'Staten Island'] as const;
