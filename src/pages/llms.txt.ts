// /llms.txt — the business in plain text for AI assistants and answer engines.
//
// Google Search ignores it; ChatGPT, Perplexity and similar tools are the
// audience. Built from the same data files as every page, so a fact changed
// in business.ts changes here too and the two never disagree.
import type { APIRoute } from 'astro';
import { business } from '@/data/business';
import { services } from '@/data/services';
import { vehicles } from '@/data/vehicles';
import { boroughs } from '@/data/boroughs';
import { serviceAreas } from '@/data/locations';
import { SITE } from '@/lib/seo';

export const GET: APIRoute = () => {
  const lines = [
    `# ${business.name}`,
    '',
    `> ${business.shortPitch}`,
    '',
    `A mobile locksmith based in ${business.base.neighborhood}, ${business.base.city}, NY ${business.base.zip}, covering all of Brooklyn and Staten Island. There is no walk-in shop: every job is done at the customer's door or vehicle.`,
    '',
    `- Phone: ${business.phoneDisplay} (call or text)`,
    `- Email: ${business.email}`,
    `- Hours: ${business.hours.label}. Not a 24/7 service.`,
    `- Pricing: quoted on the phone before anyone comes out, with no trip charge.`,
    `- Payment: ${business.paymentAccepted}`,
    `- Google Business Profile: ${business.profileUrl}`,
    '',
    '## Services',
    '',
    ...services.map((s) => `- [${s.name}](${SITE}/services/${s.slug}/): ${s.summary}`),
    '',
    '## Car keys by make',
    '',
    ...vehicles.map((v) => `- [${v.make} car keys](${SITE}/car-keys/${v.slug}/)`),
    '',
    '## Areas served',
    '',
    ...boroughs.map((b) => `- [${b.name}](${SITE}/service-areas/${b.slug}/)`),
    `- [All ${serviceAreas.length} neighborhoods](${SITE}/service-areas/)`,
    '',
    '## More',
    '',
    `- [About us](${SITE}/about/)`,
    `- [Our work: job photos](${SITE}/our-work/)`,
    `- [Reviews](${SITE}/reviews/)`,
    `- [FAQ](${SITE}/faq/)`,
    `- [How to hire a locksmith without getting scammed](${SITE}/how-to-hire-a-locksmith/)`,
    `- [Contact](${SITE}/contact/)`,
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
