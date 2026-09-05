// JSON-LD structured-data builders + SEO helpers.
import { business } from '@/data/business';
import { services } from '@/data/services';
import { serviceAreas } from '@/data/locations';

export const SITE = 'https://nicovitolocksmith.com';

export const abs = (path = '/') => new URL(path, SITE).toString();

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
    image: abs('/brand/van-2.jpg'),
    logo: abs('/brand/logo-512.png'),
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

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: business.name,
    url: SITE,
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
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  areaName?: string;
  areaRegion?: string;
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
    serviceType: opts.name,
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

/** Truncate a meta description to a safe SERP length on a word boundary. */
export function clampDescription(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:]$/, '') + '…';
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
