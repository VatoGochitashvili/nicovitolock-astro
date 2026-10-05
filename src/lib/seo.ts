// JSON-LD structured-data builders + SEO helpers.
import { business } from '@/data/business';
import { services } from '@/data/services';
import { serviceAreas } from '@/data/locations';

export const SITE = 'https://nicovitolocksmith.com';

export const abs = (path = '/') => new URL(path, SITE).toString();

/** The 1200x630 share card that scripts/og-images.mjs cuts from a /work photo. */
export const ogPhoto = (slug: string) => `/og/${slug}.jpg`;

/** Cloudflare Pages serves directory URLs with a trailing slash. Canonical,
 *  og:url and the sitemap must all agree on that form or Google sees
 *  canonical -> redirect -> different URL. */
export function withTrailingSlash(p: string): string {
  if (!p.startsWith('/')) return p;
  const [path, ...rest] = p.split(/([?#])/);
  if (path === '/' || /\.[a-z0-9]+$/i.test(path)) return p;
  return (path.endsWith('/') ? path : `${path}/`) + rest.join('');
}

const openingHoursSpecification = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: business.hours.opens,
    closes: business.hours.closes,
  },
];

/** Areas we serve, as schema City / neighborhood entries. */
const areaServed = [
  { '@type': 'City', name: 'Brooklyn', containedInPlace: { '@type': 'State', name: 'New York' } },
  { '@type': 'City', name: 'Staten Island', containedInPlace: { '@type': 'State', name: 'New York' } },
  ...serviceAreas.map((a) => ({
    '@type': 'Place',
    name: `${a.name}, ${a.region}, NY ${a.zip}`,
  })),
];

const sameAs = Object.values(business.social).filter(Boolean);

/** Locksmith (LocalBusiness) schema — the anchor node for the whole site. */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Locksmith',
    '@id': `${SITE}/#business`,
    name: business.name,
    legalName: business.legalName,
    description: business.shortPitch,
    slogan: business.tagline,
    url: SITE,
    telephone: business.phoneHref,
    email: business.email,
    // Not the van: it still carries the retired 347 number.
    image: [abs('/brand/og-card.jpg'), abs('/work/brass-deadbolt-and-knob.webp')],
    // One entity for the business. A separate Organization node with the
    // same name and logo read as a second company; Locksmith already is an
    // Organization, so its logo and contact point live here.
    logo: {
      '@type': 'ImageObject',
      url: abs('/brand/logo-512.png'),
      width: 512,
      height: 512,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: business.phoneHref,
      contactType: 'customer service',
      areaServed: ['US-NY'],
      availableLanguage: ['English'],
    },
    // Google surfaces priceRange on local results. It is a band, not a price:
    // the site quotes every job individually and publishes no price list.
    priceRange: '$$',
    hasMap: business.social.google,
    currenciesAccepted: 'USD',
    paymentAccepted: business.paymentAccepted,
    // Service-area business: NO streetAddress. Publishing one for a mobile
    // locksmith is a documented cause of Business Profile suspension.
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.base.city,
      addressRegion: business.base.state,
      postalCode: business.base.zip,
      addressCountry: business.base.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    openingHours: business.hours.schema,
    openingHoursSpecification,
    areaServed,
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: business.geo.lat,
        longitude: business.geo.lng,
      },
      geoRadius: '19000',
    },
    knowsAbout: [
      'Emergency lockout service', 'Lock rekeying', 'Lock replacement',
      'Deadbolt installation', 'High-security locks', 'Car key replacement',
      'Key fob programming', 'Smart lock installation', 'Intercom systems',
      'Access control', 'Security cameras', 'Commercial locksmith',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Locksmith Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.summary,
          url: abs(`/services/${s.slug}/`),
        },
      })),
    },
    // Omit `sameAs` entirely while there are no profile URLs yet — an empty
    // array is worse than no property. Fill in business.social after the
    // Google Business Profile / Yelp / Facebook pages exist.
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    name: business.name,
    url: SITE,
    publisher: { '@id': `${SITE}/#business` },
    inLanguage: 'en-US',
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  areaName?: string;
  areaRegion?: string;
  /** The service itself ("Lock Rekeying") when `name` carries a place or a
   *  make ("Lock Rekeying in Bath Beach"). */
  serviceType?: string;
  /** Work-photo slugs illustrating this service */
  images?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: abs(withTrailingSlash(opts.url)),
    ...(opts.images?.length
      ? { image: opts.images.map((slug) => abs(`/work/${slug}.webp`)) }
      : {}),
    serviceType: opts.serviceType ?? opts.name,
    areaServed: opts.areaName
      ? { '@type': 'Place', name: `${opts.areaName}, ${opts.areaRegion ?? 'Brooklyn'}, NY` }
      : [
          { '@type': 'City', name: 'Brooklyn' },
          { '@type': 'City', name: 'Staten Island' },
        ],
    provider: { '@id': `${SITE}/#business` },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: business.phoneHref,
      availableLanguage: ['English'],
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(withTrailingSlash(item.url)),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/**
 * Pick the first meta description candidate that fits Google's snippet width
 * (~158 characters). The description counterpart of pickTitle: candidates go
 * from fullest to shortest, so nothing is ever cut mid-sentence. Truncating
 * on a word boundary put "…Call…" on 137 pages, losing the phone number,
 * which is the one part of the snippet that gets a locksmith called.
 */
export function pickDescription(candidates: string[], max = 158): string {
  for (const c of candidates) {
    if (c.length <= max) return c;
  }
  return candidates.reduce((a, b) => (b.length < a.length ? b : a));
}

/**
 * A neighborhood's drive time, only when it is short enough to sell the call
 * (25 minutes or less). Takes the `eta` strings from locations.ts.
 */
export function quickEta(eta: string): string | null {
  const minutes = Number(eta.match(/\d+/)?.[0]);
  return minutes && minutes <= 25 ? eta : null;
}

/**
 * Pick the first title candidate that fits inside Google's SERP truncation
 * width (~60 characters). Candidates go from most keyword-rich to shortest;
 * if none fit, the last one wins. This keeps every title unique AND visible
 * rather than cut off mid-phrase with an ellipsis.
 */
export function pickTitle(candidates: string[], max = 60): string {
  for (const c of candidates) {
    if (c.length <= max) return c;
  }
  return candidates[candidates.length - 1];
}
