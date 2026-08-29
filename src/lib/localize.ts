// Per-neighborhood content variation for the programmatic
// /services/[slug]/[area] pages.
//
// Each page selects copy from these pools using a deterministic seed derived
// from (service, area), so a given page always renders identically but
// different combinations diverge sharply. This is wording variance built on
// real local detail (streets, housing character, drive time) — every FACT
// (hours, phone, licensing, coverage) stays identical and true.

import type { Service } from '@/data/services';
import type { ServiceArea } from '@/data/locations';
import { business } from '@/data/business';

/** FNV-1a — stable unsigned 32-bit hash from a seed string. */
export function seededHash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Capitalize the first letter — pools that open a sentence with an
 *  interpolated landmark or character string need it. */
const cap = (t: string) => (t ? t.charAt(0).toUpperCase() + t.slice(1) : t);

const pick = <T>(arr: T[], seed: number, salt: number): T =>
  arr[(seed + salt * 7919) % arr.length];

/** Pick n distinct items, deterministically. */
const pickMany = <T>(arr: T[], seed: number, salt: number, n: number): T[] => {
  const out: T[] = [];
  const used = new Set<number>();
  for (let i = 0; out.length < Math.min(n, arr.length); i++) {
    const idx = (seed + (salt + i) * 104729) % arr.length;
    if (!used.has(idx)) {
      used.add(idx);
      out.push(arr[idx]);
    }
  }
  return out;
};

export interface LocalCopy {
  lead: string;
  localAngle: string;
  process: string;
  close: string;
  whyHeading: string;
  scenarioHeading: string;
  coverage: string | null;
  landmarkLine: string;
  faqs: { q: string; a: string }[];
  metaDescription: string;
}

export function localCopy(service: Service, area: ServiceArea): LocalCopy {
  const seed = seededHash(`${service.slug}::${area.slug}`);

  const s = service.name;
  const sLower = service.name.toLowerCase();
  const sShort = service.short.toLowerCase();
  const sWork = service.workTerm;
  const city = area.name;
  const region = area.region;
  const zip = area.zip;
  const phone = business.phone;
  const hours = business.hours.short;
  const eta = area.eta;
  const character = area.character;
  const marks = pickMany(area.landmarks, seed, 3, 2);
  const markLine = marks.length === 2 ? `${marks[0]} and ${marks[1]}` : marks[0] ?? city;
  const nearby = area.nearby.length ? area.nearby.join(', ') : '';
  const isHome = area.slug === 'bay-ridge';

  // ------------------------------- leads -------------------------------
  const leads = [
    `Need ${sLower} in ${city}? Nico & Vito Locksmith works out of Bay Ridge, ${eta} from here, and we cover ${city} (${zip}) every day from 7 AM to 11 PM.`,
    `Nico & Vito Locksmith handles ${sLower} across ${city}, ${region}. We're a Bay Ridge shop — ${eta} away — not a call center that farms your job out to whoever answers.`,
    `Looking for ${sLower} in ${city}? We're licensed, insured, and based in Bay Ridge, which puts ${city} ${eta} from our door seven days a week.`,
    `For ${sLower} anywhere in ${city} (${zip}), Nico & Vito Locksmith is the local call. Bay Ridge based, ${eta} out, open 7 AM to 11 PM every single day.`,
    `${city} residents and business owners call us for ${sLower} because we're actually nearby — Bay Ridge, ${eta} from ${city}, with the parts already on the van.`,
    `When ${city} needs ${sLower}, we're ${eta} away. Nico & Vito Locksmith runs out of Bay Ridge and covers all of ${region} daily, 7 AM to 11 PM.`,
    `${cap(sShort)} in ${city}, handled by a Bay Ridge shop that is ${eta} out and open seven days a week, 7 AM to 11 PM.`,
    `We do ${sLower} throughout ${city} and the rest of ${region}. Local, licensed, insured, and reachable on ${phone} any day between 7 AM and 11 PM.`,
    `${city} (${zip}) is inside our everyday coverage. Call ${phone} for ${sLower} and you get a Bay Ridge technician, not a subcontractor bidding on your job.`,
    `If you need ${sLower} in ${city}, you are ${eta} from a licensed local locksmith rather than a national dispatch number pretending to be one.`,
    `Nico & Vito Locksmith covers ${city} for ${sLower} every day of the week. Bay Ridge based, ${eta} out, price agreed before we leave.`,
    `${cap(sLower)} for ${city} homes and businesses — from a family-run Bay Ridge shop ${eta} down the road, open 7 AM to 11 PM daily.`,
    `Need ${sLower} around ${city}? We are the local option: Bay Ridge based, ${eta} away, licensed and insured, and open every single day.`,
  ];

  // ------------------------------ angles -------------------------------
  const angles = [
    `${city} is ${character}, and that shapes the job. We size up the door and the existing hardware before quoting, so the ${sWork} work fits the building instead of whatever was easiest to carry.`,
    `Around ${markLine}, most ${sWork} calls come from ${character}. We stock what those buildings take, which is why the majority of ${city} jobs finish on the first visit.`,
    `Because ${city} is ${character}, no two ${sWork} jobs here look the same. We check the door, the frame, and the hardware first — then give you a price that reflects the real work.`,
    `We know ${city} — ${markLine}, and the ${character} that fill the blocks between them. That familiarity is the difference between one trip and three.`,
    `Most ${sWork} calls in ${city} involve ${character}, so we come loaded for them. The van carries the parts these buildings actually take rather than a generic kit.`,
    `From ${markLine} out to the ${zip} edges, ${city} gets the same approach: look at the door properly, quote it honestly, and do the ${sWork} work with the right parts on hand.`,
    `The ${sWork} work ${city} needs is dictated by what it is built from — ${character} — so we look before we quote and bring parts that suit the building rather than the invoice.`,
    `Between ${markLine}, ${city} packs in ${character}. Each one wants a slightly different answer on ${sWork}, and knowing which is the difference between one visit and three.`,
    `${city} is not interchangeable with the next neighborhood over. The housing here — ${character} — sets the terms, and our ${sWork} work follows them.`,
    `Having worked ${markLine} for years, we know what ${city} doors take. That is why the van leaves Bay Ridge already loaded for the ${sWork} job rather than guessing on arrival.`,
    `${city} runs on ${character}, which is a specific kind of ${sWork} problem — and a specific kind of solution. We quote for the building in front of us.`,
    `Around ${markLine}, ${city} property owners get an honest read on the ${sWork} job first: what actually needs doing, what does not, and what it costs.`,
  ];

  // ----------------------------- headings ------------------------------
  const whyHeadings = [
    `Why ${city} calls us for ${sShort}`,
    `${s} in ${city}, done properly`,
    `What ${city} gets from a local locksmith`,
    `${cap(sShort)} in ${city}: how we work`,
    `The ${city} approach to ${sShort}`,
    `${cap(sShort)}, the ${city} way`,
    `Why ${city} property owners call a local shop`,
    `What sets our ${city} work apart`,
  ];

  const scenarioHeadings = [
    `Common ${sWork} calls we get in ${city}`,
    `What ${city} calls us about`,
    `Typical ${sWork} situations in ${city}`,
    `When ${city} customers reach out`,
    `${city} jobs that come up again and again`,
    `The ${sWork} problems we see in ${city}`,
    `Reasons ${city} picks up the phone`,
  ];

  // ----------------------------- coverage ------------------------------
  const coverages = nearby
    ? [
        `We also cover ${nearby}, so if you're near the ${city} line we can still help.`,
        `Just outside ${city}? ${nearby} are on the same daily route.`,
        `Our ${city} coverage runs into ${nearby} and the surrounding ${region} blocks.`,
        `Bordering ${city} we also serve ${nearby} — same hours, same pricing.`,
        `${nearby} sit on the same run, so a job near the ${city} border is no further for us.`,
        `We work ${nearby} alongside ${city} — one route, one price list.`,
      ]
    : null;

  // ----------------------------- process -------------------------------
  const processes = [
    `Booking is one call. Ring ${phone}, describe the situation, and we give you a price for the ${sWork} work before we leave Bay Ridge. No trip surcharge for ${city}, and no number that changes once we're standing at your door.`,
    `Here's how a ${city} job runs: you call ${phone}, we ask enough questions to quote it accurately, and a licensed tech is at your door in ${eta} with the right gear. You approve the price before any work starts.`,
    `Call ${phone} and tell us what's going on. We quote the ${sWork} work up front, arrive in about the time we said, finish the job, and clean up. That's the whole process.`,
    `We keep it simple for ${city}: one call to ${phone}, a straight price, a licensed technician ${eta} out, and the ${sWork} work done the same visit whenever it can be.`,
    `Reach us at ${phone} any day between 7 AM and 11 PM. We confirm the price for the ${sWork} job first, then a tech heads to ${city} — usually ${eta} — with everything needed to finish.`,
    `One call to ${phone} starts it. We ask what the door or vehicle is doing, quote the ${sWork} job on the spot, and send a licensed tech to ${city} with the parts already aboard.`,
    `No forms, no waiting on a callback: ring ${phone}, get a real number for the ${sWork} work, and we head to ${city}. If the job turns out different on arrival, you hear about it before we touch anything.`,
    `The ${city} routine is short. Call, describe it, agree the price, and a licensed technician handles the ${sWork} work ${eta} later — usually the same day you called.`,
    `We answer the phone ourselves between 7 AM and 11 PM. Tell us about the ${sWork} job in ${city}, take the quote, and we schedule it around when actually suits you.`,
    `Book by calling ${phone}. You get a price for the ${sWork} work before we leave Bay Ridge, an arrival window we hold to, and a ${city} job finished the same visit where it can be.`,
    `Straight process for ${city}: a phone call, an honest quote, a licensed tech ${eta} out, the ${sWork} work done, and the door tested before we go.`,
  ];

  // ------------------------------ closes -------------------------------
  const closes = [
    `Whether you own a house in ${city}, rent an apartment, or run a business here, we handle the ${sShort} and stand behind the work.`,
    `${city} is ${eta} from our door. That's why we can quote fairly, show up when we say, and still be the ones you call next time.`,
    `From a single cylinder to a whole building, ${city} property owners get licensed, insured ${sWork} work at a price agreed before we start.`,
    `If you need ${sShort} in ${city} or anywhere else in ${region}, call ${phone}. We're open ${hours.toLowerCase()} — including weekends and holidays.`,
    `We treat ${city} jobs like neighbors' jobs, because ${eta} away is what neighbors means in this borough.`,
    `Good ${sWork} work in ${city} isn't complicated: the right parts, a licensed hand, an honest price. That's what you get when you call ${phone}.`,
    `${city} does not need another national dispatch number. It needs a locksmith ${eta} away who answers the phone and quotes straight — call ${phone}.`,
    `Whatever the ${sWork} job turns out to be, ${city} gets it done by a licensed technician at the price we agreed on the phone.`,
    `We would rather do one ${city} job properly than three of them twice. That is the whole reason people here call us back.`,
    `For ${sWork} anywhere in ${city} — house, apartment, storefront, or vehicle — you have a local, licensed option ${eta} down the road.`,
    `${city} is close enough that we treat it like our own block, because it more or less is. Call ${phone} and we will tell you honestly what the ${sWork} job needs.`,
    `Book the ${sWork} work in ${city} with a shop that is licensed, insured, local, and open every day from 7 AM to 11 PM.`,
  ];

  // ------------------------------- FAQs --------------------------------
  const faqPool = [
    {
      q: `Do you charge extra to come out to ${city}?`,
      a: `No. ${city} is inside our regular ${region} service area — about ${eta} from our Bay Ridge base — so there's no premium for the location. You pay for the ${sWork} work itself, quoted before we start.`,
    },
    {
      q: `How fast can you get to ${city}?`,
      a: `${city} is typically ${eta} from us. We're open every day from 7 AM to 11 PM, so call ${phone} and we'll give you a real arrival window rather than a vague "on our way."`,
    },
    {
      q: `Are you licensed to do ${sWork} work in ${city}?`,
      a: `Yes — Nico & Vito Locksmith is a licensed and insured New York locksmith, and we work throughout ${region} including ${city} (${zip}). Ask to see credentials when we arrive; a real locksmith will have them.`,
    },
    {
      q: `Do you handle both homes and businesses in ${city}?`,
      a: `We do. ${city} is ${character}, and we cover all of it — residential and commercial ${sWork} work alike.`,
    },
    {
      q: `Are you open on weekends in ${city}?`,
      a: `Every day, 7 AM to 11 PM, weekends and holidays included. We're not a 24-hour operation, so if it's the middle of the night we'd rather tell you that honestly than promise a truck that isn't coming.`,
    },
    {
      q: `Can you give me a price over the phone for ${sLower} in ${city}?`,
      a: `In most cases yes. Call ${phone}, describe the door and the situation, and we'll quote it. If something on site turns out different, we tell you before doing the work — never after.`,
    },
    {
      q: `Are you a local ${city} locksmith or a national dispatch service?`,
      a: `Local. Nico & Vito is based in Bay Ridge, ${eta} from ${city}, and the number you call reaches the people who show up. Nobody bids on your job and nobody subcontracts it.`,
    },
    {
      q: `What payment do you take in ${city}?`,
      a: `${business.paymentAccepted}. You get a receipt either way, and the amount matches the quote you agreed before we started the ${sWork} work.`,
    },
    {
      q: `Do I need to be there for the ${sWork} work in ${city}?`,
      a: `For anything involving access — lockouts especially — yes, and we will ask for ID plus proof of the address. For scheduled work we can arrange it with whoever holds the property, as long as authorization is clear.`,
    },
    {
      q: `How far into ${city} do you cover?`,
      a: `All of it, plus the blocks either side. ${city} sits in ${zip}, and we run the whole ${region} side of our route daily — there is no part of it we treat as too far.`,
    },
    {
      q: `Can you come the same day in ${city}?`,
      a: `Usually. ${city} is ${eta} from Bay Ridge and we carry common parts on the van, so most ${sWork} jobs here are done on the first visit the same day you call.`,
    },
  ];

  const homeFaq = {
    q: `Are you actually based in ${city}?`,
    a: `Yes. Bay Ridge is where we're based and where we live, so ${sWork} calls here are usually minutes away rather than a cross-borough dispatch.`,
  };

  const chosenFaqs = pickMany(faqPool, seed, 11, 3);
  if (isHome) chosenFaqs.unshift(homeFaq);

  const landmarkLines = [
    `We cover all of ${city}, from ${markLine} to the residential blocks in between.`,
    `Our ${city} route takes in ${markLine} and everything around them.`,
    `${cap(markLine)} — we work the whole of ${city}, ${zip}.`,
    `From ${markLine} outward, ${city} is fully covered.`,
    `Every block of ${city} is on our route, ${markLine} included.`,
    `${city} in full — ${markLine} and the streets running off them.`,
    `We cover ${city} end to end, from ${markLine} outward.`,
  ];

  const metaVariants = [
    `${s} in ${city}, ${region}. Licensed Bay Ridge locksmith, ${eta} away, open every day 7AM–11PM. Call ${phone}.`,
    `Need ${sLower} in ${city}? Local Bay Ridge locksmith covering ${city} ${zip} daily 7AM–11PM. Upfront pricing. ${phone}.`,
    `${city} ${sShort}: licensed, insured, and ${eta} from Bay Ridge. Open 7 days, 7AM–11PM. Call Nico & Vito at ${phone}.`,
    `${s} for ${city} homes and businesses. Bay Ridge based, no trip surcharge, open daily 7AM–11PM. ${phone}.`,
    `Local ${sShort} in ${city} ${zip}. Licensed, insured, ${eta} from Bay Ridge. Open every day 7AM–11PM. Call ${phone}.`,
    `${s} in ${city}? Bay Ridge locksmith, upfront pricing, no trip fee, open 7 days 7AM–11PM. ${phone}.`,
    `Need ${sLower} in ${city}, ${region}? Licensed local locksmith ${eta} away. Daily 7AM–11PM. ${phone}.`,
  ];

  return {
    lead: pick(leads, seed, 1),
    localAngle: pick(angles, seed, 2),
    process: pick(processes, seed, 4),
    close: pick(closes, seed, 5),
    whyHeading: pick(whyHeadings, seed, 6),
    scenarioHeading: pick(scenarioHeadings, seed, 8),
    coverage: coverages ? pick(coverages, seed, 9) : null,
    landmarkLine: pick(landmarkLines, seed, 10),
    faqs: chosenFaqs,
    metaDescription: pick(metaVariants, seed, 12).slice(0, 158),
  };
}

// ---------------------------------------------------------------------
// Area-page copy (the /service-areas/[slug] pages) — separate pools so an
// area page never reads like the service x area pages that link to it.
// ---------------------------------------------------------------------

export interface AreaCopy {
  lead: string;
  detail: string;
  trust: string;
  heading: string;
  coverage: string | null;
}

export function areaCopy(area: ServiceArea): AreaCopy {
  const seed = seededHash(`area::${area.slug}`);
  const city = area.name;
  const region = area.region;
  const zip = area.zip;
  const eta = area.eta;
  const character = area.character;
  const marks = pickMany(area.landmarks, seed, 2, 3);
  const markList = marks.length > 1
    ? `${marks.slice(0, -1).join(', ')} and ${marks[marks.length - 1]}`
    : marks[0] ?? city;
  const nearby = area.nearby.length ? area.nearby.join(', ') : '';

  const leads = [
    `Nico & Vito Locksmith covers every block of ${city}, ${region} — ${eta} from our Bay Ridge base, every day between 7 AM and 11 PM.`,
    `We're a Bay Ridge locksmith serving ${city} daily. Lockouts, lock changes, car keys, intercoms, and cameras, ${eta} from our door.`,
    `${city} is part of our regular ${region} coverage. One licensed local shop, open seven days a week, ${eta} away.`,
    `Locksmith service throughout ${city} (${zip}) — residential, automotive, and commercial — from a Bay Ridge shop that's ${eta} out.`,
    `Need a locksmith in ${city}? We're ${eta} down the road in Bay Ridge, licensed and insured, and open 7 AM to 11 PM every day of the week.`,
    `${city} sits well inside our daily route. Call ${business.phone} and you get a Bay Ridge technician rather than a national dispatch number.`,
    `From lockouts to camera systems, ${city} gets the full range from one local shop — ${eta} away, open every day including weekends.`,
    `Our ${city} coverage is not an afterthought: ${zip} is on the route every day, 7 AM to 11 PM, at the same prices we charge at home in Bay Ridge.`,
    `A licensed locksmith for ${city}, ${region}. Bay Ridge based, ${eta} out, and genuinely local rather than a call centre with a borough page.`,
    `${city} homes, apartments, storefronts, and vehicles — all covered, every day, by a family-run Bay Ridge shop ${eta} away.`,
    `We work ${city} the same way we work our own block: quote first, arrive when we said, and charge what we quoted.`,
    `Locksmith in ${city} (${zip}) — ${eta} from Bay Ridge, open 7 days a week, licensed, insured, and answering the phone ourselves.`,
  ];

  const details = [
    `${city} is ${character}. We work ${markList}, and we bring hardware suited to what these buildings actually use rather than a one-size kit.`,
    `Working around ${markList}, we've learned what ${city} doors need. The neighborhood is ${character}, and the right hardware differs accordingly.`,
    `Our ${city} work spans ${markList}. With ${character}, the jobs range from a single rekey to a full building's worth of hardware.`,
    `${cap(markList)} — that's the ${city} we cover. With ${character}, the hardware that belongs on these doors is not what a big-box shelf would sell you.`,
    `Because ${city} is ${character}, no two jobs here look identical. We survey the door before quoting, which is why most visits finish first time.`,
    `Around ${markList}, we handle everything ${city} throws at us. The neighborhood being ${character} shapes which parts ride on the van.`,
    `${city} covers ${character}, and that variety is exactly why local knowledge matters. We know which doors around ${markList} take what.`,
    `We've worked ${markList} long enough to know ${city}'s quirks. With ${character}, the difference between a good job and a callback is picking the right hardware first.`,
    `${city} means ${character} — and a different set of problems from the neighborhood next door. Our route through ${markList} covers all of it.`,
    `From ${markList} outward, ${city} is ${character}. We quote for what is actually on the door rather than a standard price list.`,
  ];

  const trusts = [
    `Every job is quoted before we start, handled by a licensed and insured technician, and finished with the door working the way it should.`,
    `You get a price up front, a licensed tech, and no invented charges once the work is done. That's the whole arrangement.`,
    `Licensed, insured, and local. We quote first, work second, and leave the door better than we found it.`,
    `No bait pricing and no surprise line items. The number you hear on the phone is the number on the invoice.`,
    `We ask for ID on lockouts, show credentials on request, and stand behind the work. That is what separates a locksmith from a dispatch service.`,
    `One price, agreed in advance, from a licensed and insured shop that will still be here next year when you need us again.`,
    `We would rather talk you out of work you don't need than sell it to you. It is why ${city} customers call back.`,
    `Upfront pricing, licensed hands, and a door that closes properly when we leave — nothing more complicated than that.`,
    `If the honest answer is a cheaper fix than you expected, that's the answer you get. Same for the reverse.`,
    `Insured work, real credentials, and a quote that holds. Ask any of the three when we arrive.`,
  ];

  const headings = [
    `Locksmith services in ${city}`,
    `What we do in ${city}`,
    `Full service coverage across ${city}`,
    `Every service, available in ${city}`,
    `How we work in ${city}`,
    `${city} locksmith services`,
    `What ${city} calls us for`,
  ];

  const coverage = nearby
    ? [
        `We also cover ${nearby}, so a job near the ${city} line is no further for us.`,
        `${nearby} are on the same daily route as ${city}.`,
        `Bordering ${city}, we serve ${nearby} at the same rates and the same hours.`,
        `Our ${city} run takes in ${nearby} as well.`,
      ]
    : null;

  return {
    lead: pick(leads, seed, 1),
    detail: pick(details, seed, 2),
    trust: pick(trusts, seed, 3),
    heading: pick(headings, seed, 4),
    coverage: coverage ? pick(coverage, seed, 5) : null,
  };
}

/** Housing-stock paragraph for a neighborhood page (service-agnostic). */
export function areaTraitNote(area: ServiceArea): string {
  const seed = seededHash(`areatrait::${area.slug}`);
  const trait = area.traits[seed % area.traits.length];
  const pool = TRAIT_NOTES[trait](area.name, 'locksmith', 'locksmith');
  return pick(pool, seed, 17);
}

/** Seeded FAQ set for a neighborhood page. */
export function areaFaqs(area: ServiceArea): { q: string; a: string }[] {
  const seed = seededHash(`areafaq::${area.slug}`);
  const city = area.name;
  const region = area.region;
  const zip = area.zip;
  const eta = area.eta;
  const phone = business.phone;

  const pool = [
    { q: `Do you cover all of ${city}?`,
      a: `Yes — every block. ${area.blurb}` },
    { q: `How long does it take you to reach ${city}?`,
      a: `${eta} from our Bay Ridge base under normal conditions. We're open every day 7 AM to 11 PM, so call ${phone} and we'll give you a real arrival window rather than a vague "on our way."` },
    { q: `Are you open on weekends in ${city}?`,
      a: `Every day of the week, 7 AM to 11 PM, holidays included. We're not a 24-hour operation — outside those hours nobody is coming, and we'd rather say so than take your call and leave you waiting.` },
    { q: `What does a locksmith cost in ${city}?`,
      a: `The same as anywhere else we work — there's no ${city} surcharge. Lockouts start around $49, rekeys around $25 per cylinder, car keys around $120. You get an exact quote on the phone before we come out.` },
    { q: `Do you handle both homes and businesses in ${city}?`,
      a: `Both. ${city} is ${area.character}, and we cover residential, automotive, and commercial work across all of it.` },
    { q: `Are you licensed to work in ${city}?`,
      a: `Yes. We're a licensed and insured New York locksmith working throughout ${region}, ${city} (${zip}) included. Ask to see credentials at the door — any real locksmith carries them.` },
    { q: `Can you replace a car key in ${city}?`,
      a: `Yes, at your vehicle. We cut and program transponder keys, remotes, and push-to-start fobs on site in ${city}, including all-keys-lost jobs, for well under dealership pricing and with no tow.` },
    { q: `Will you damage my lock getting me into a ${city} property?`,
      a: `Almost never. We pick or bypass in the large majority of lockouts, which leaves your existing lock usable. Drilling is a last resort, and you'd hear about it and approve the replacement cost first.` },
    { q: `Do you work with landlords and property managers in ${city}?`,
      a: `Regularly. ${city} has plenty of multi-unit property, and we handle building-wide rekeys, master key systems, intercoms, and recurring work — billed per property so the accounting stays clean.` },
    { q: `Is there a call-out fee for ${city}?`,
      a: `No neighborhood surcharge. ${city} is inside our everyday service area at ${eta} out, and anything that would add to the price is stated on the phone before you agree to it.` },
    { q: `Can you get to ${city} the same day?`,
      a: `Usually, yes. ${city} is ${eta} from Bay Ridge and the vans carry common parts, so most jobs here are finished on the first visit the day you call.` },
    { q: `What if I'm just outside ${city}?`,
      a: `Still covered. We work all of ${region} — ${area.nearby.length ? `${area.nearby.join(', ')} included` : 'the surrounding blocks included'} — on the same daily route and the same price list.` },
    { q: `Do you install security cameras and intercoms in ${city}?`,
      a: `Yes. Alongside the lock work we install and repair CCTV, video intercoms, and access control across ${city} — for private homes, multi-family buildings, and businesses alike.` },
  ];

  return pickMany(pool, seed, 23, 6);
}


// ---------------------------------------------------------------------
// Housing-trait copy. Each neighborhood carries 1–3 traits derived from its
// housing stock; this turns those into a paragraph that is genuinely about
// THAT kind of building and THAT service — the main lever that stops the
// service x neighborhood pages reading as one template.
// ---------------------------------------------------------------------

import type { AreaTrait } from '@/data/locations';

type TraitCopy = (city: string, sWork: string, sShort: string) => string[];

const TRAIT_NOTES: Record<AreaTrait, TraitCopy> = {
  rowhouse: (city, sWork) => [
    `Attached houses in ${city} share walls, which means a front door, a vestibule door, and usually a back or garden door on the same property. Most ${sWork} jobs here end up covering more than one opening, so we quote the set rather than pretending it is a single door.`,
    `${city}'s row houses tend to keep original door frames long after the locks have been swapped two or three times. That mismatch is where a lot of ${sWork} trouble starts, and it is the first thing we check.`,
    `A lot of ${city} row houses run a stoop door plus a parlor-floor door. Keying those alike is the cheapest quality-of-life upgrade we sell, and it comes up on nearly every ${sWork} visit here.`,
  ],
  multifamily: (city, sWork) => [
    `Multi-family buildings in ${city} bring the complication keys were never designed for: tenants change, contractors come and go, and nobody can say how many copies exist. That shapes how we approach ${sWork} here.`,
    `With apartment buildings across ${city}, ${sWork} work usually touches a vestibule door, a unit door, and sometimes a roof or basement door. We keep a record of what got keyed to what so the next visit is not guesswork.`,
    `Landlords and co-op boards in ${city} call us for ${sWork} because we work building-wide rather than door-by-door, and we quote the whole job in writing before starting it.`,
  ],
  singlefamily: (city, sWork) => [
    `Detached houses in ${city} have more ways in than people count — front, side, back, garage, and often a basement hatch. Our ${sWork} quotes cover every one of them, not just the door you called about.`,
    `A ${city} single-family home usually ends up with three or four different keys collected over the years. Consolidating those is the request we hear most alongside ${sWork} work.`,
    `Because ${city} houses sit on their own lots, side and rear doors are out of sight from the street — which is exactly where we focus the ${sWork} work and the hardware upgrades.`,
  ],
  waterfront: (city, sWork) => [
    `Salt air off the water gets into everything in ${city}. Exterior cylinders seize, springs corrode, and a lock that was fine in June stops turning by February. We fit hardware for ${sWork} here that is rated for the exposure rather than the cheapest thing on the shelf.`,
    `${city}'s proximity to the water is the single biggest factor in how long hardware lasts. Half our ${sWork} calls here are corrosion, not failure — and the fix is choosing the right finish the first time.`,
    `Waterfront blocks in ${city} chew through standard locks. When we do ${sWork} work here we tell you plainly which hardware survives the winter and which will be back on our list next year.`,
  ],
  commercial: (city, sWork) => [
    `The retail strips in ${city} run their doors hundreds of times a day, which is a decade of household wear in a single year. Commercial-rated hardware is not an upsell here, and our ${sWork} recommendations reflect that.`,
    `Storefronts in ${city} usually pair a roll-down gate with a narrow-stile glass door — two completely different lock problems on one entrance. We handle both on the same ${sWork} visit.`,
    `Business owners along ${city}'s commercial blocks cannot afford a closed morning, so we schedule ${sWork} work around opening hours and carry the common storefront parts on the van.`,
  ],
  prewar: (city, sWork) => [
    `${city} still has a lot of original prewar hardware in daily service, and much of it is better made than what would replace it. Our default on ${sWork} here is to repair and retrofit rather than rip out.`,
    `Period doors in ${city} were built to dimensions nobody uses any more. Modern locks often do not drop straight in, so ${sWork} work here means retrofitting a cylinder into the existing case instead of cutting up a hundred-year-old door.`,
    `Where ${city} buildings are landmarked or simply old enough to deserve the care, we match finishes and keep the original face plates — the ${sWork} gets done without the door announcing it.`,
  ],
  industrial: (city, sWork) => [
    `Converted industrial buildings in ${city} run oversized doors, roll-downs, and freight entrances that standard residential hardware cannot handle. Our ${sWork} work here uses commercial-grade parts as a baseline.`,
    `Warehouses and workshops around ${city} tend to have multiple people needing access at odd hours. That changes the ${sWork} conversation from keys to credentials fairly quickly.`,
    `The loading and freight doors common in ${city} take abuse no house door ever sees, so ${sWork} here is as much about the frame and the alignment as the lock itself.`,
  ],
  highrise: (city, sWork) => [
    `Office and tower buildings in ${city} come with fire-code obligations on every exit door. We handle ${sWork} in a way that keeps egress legal — the part that a general handyman will get wrong.`,
    `${city}'s larger buildings usually already run a master key hierarchy. When we do ${sWork} here we work inside that system rather than breaking it.`,
    `Suite-by-suite turnover in ${city} office buildings makes ${sWork} a recurring need, so we keep records per floor and per tenant.`,
  ],
  gated: (city, sWork) => [
    `Properties in ${city} with driveways and gates have a perimeter as well as a front door. We cover both on ${sWork} visits — gate hardware fails far more often than the house lock does.`,
    `Larger ${city} homes usually mean a garage door, a side gate, and a main entrance that all need to work together. Keying them into one system is normally part of the ${sWork} conversation.`,
    `Gated ${city} properties give us more ground to secure and more places for hardware to seize. We check the whole perimeter as part of any ${sWork} job here.`,
  ],
};

/** A paragraph about this neighborhood's housing stock and this service. */
export function traitNote(service: Service, area: ServiceArea): string {
  const seed = seededHash(`trait::${service.slug}::${area.slug}`);
  const trait = area.traits[seed % area.traits.length];
  const pool = TRAIT_NOTES[trait](area.name, service.workTerm, service.short.toLowerCase());
  return pick(pool, seed, 13);
}

/**
 * Seeded subsets of the feature and scenario pools. Each service carries 12
 * features and 10 scenarios; every neighborhood renders a different 6 and 5,
 * in a different order. That alone removes the largest block of byte-identical
 * text that used to repeat across all 55 neighborhood pages.
 */
export function localLists(service: Service, area: ServiceArea) {
  const seed = seededHash(`lists::${service.slug}::${area.slug}`);
  return {
    features: pickMany(service.features, seed, 21, 6),
    scenarios: pickMany(service.scenarios, seed, 37, 5),
  };
}

// ---------------------------------------------------------------------
// Car-make page copy. Same problem as the neighborhood pages: 22 pages about
// "car keys" will collapse into near-duplicates unless the shared framing
// varies. Seeded from the make slug, so each page is stable but distinct.
// ---------------------------------------------------------------------

import type { Vehicle } from '@/data/vehicles';

export interface VehicleCopy {
  sub: string;
  coverage: string;
  quote: string;
  process: string;
  closing: string;
  modelsNote: string;
  ctaBody: string;
  costAnswer: string;
  onSiteAnswer: string;
  aftermarketAnswer: string;
}

export function vehicleCopy(v: Vehicle): VehicleCopy {
  const seed = seededHash(`vehicle::${v.slug}`);
  const make = v.make;
  const m0 = v.models[0];
  const m1 = v.models[1] ?? v.models[0];

  const subs = [
    `Cut and programmed at your ${make}, wherever it is parked in Brooklyn or Staten Island — for a lot less than the dealer, and with no tow.`,
    `We come to the ${make}. Keys and fobs cut and programmed at the kerb across Brooklyn and Staten Island, at a fraction of dealer pricing.`,
    `A ${make} key made at your car, not at a dealership — no tow truck, no waiting list, and a price agreed before we set off.`,
    `${make} keys and fobs originated on site anywhere in Brooklyn or Staten Island. Dealer-level equipment, without the dealer bill.`,
    `Lost the key to your ${m0}? We cut and program a replacement at the vehicle, usually the same day you call.`,
  ];

  const coverages = [
    `We reach the car wherever it sits. These neighborhoods are the quickest from Bay Ridge, though every one of them is covered.`,
    `Your ${make} does not have to move — we do. Fastest neighborhoods from our Bay Ridge base are listed below.`,
    `Because the car cannot be driven without a key, we bring the equipment to it. A sample of the areas we reach quickest:`,
    `Every neighborhood in both boroughs is on our route. These are simply the closest to Bay Ridge:`,
  ];

  const quotes = [
    `Tell us the year and model and we will quote the key before leaving Bay Ridge. Bring your licence and registration — we check that the ${make} is yours.`,
    `Give us the year, model and what happened, and you get a real price on the phone. We will ask for ID and proof of ownership at the car, as any legitimate locksmith should.`,
    `A ${make} quote takes one phone call. We confirm the key type from your year and model, price it, and come out. Photo ID and registration needed on arrival.`,
    `Call with the VIN year and model of your ${make} and we will tell you the exact key it takes and what it costs — before anybody drives anywhere.`,
  ];

  const processes = [
    `We identify the correct key from your VIN, cut the blade to the vehicle, and pair the chip to the immobiliser at the roadside. Old lost keys can be erased from the car's memory at the same time — worth doing if the key was lost rather than broken.`,
    `The job is two halves: cutting a blade that fits the ${make}'s lock, and marrying the transponder to the immobiliser so the engine will actually start. We carry the equipment for both on the van.`,
    `Cutting alone gets you into the ${m1}; it will not start it. We do the electronic half as well, programming the chip to the car and, where you want it, deleting the missing key so it can never start the vehicle again.`,
    `We decode the key from the vehicle, cut it, and program it on the spot. If the old key is genuinely lost rather than damaged, we will also erase it from the immobiliser so nobody else can use it.`,
  ];

  const closings = [
    `${make} owners across both boroughs call us because the price we quote on the phone is the price on the invoice.`,
    `Whether it is a spare for the ${m0} or an all-keys-lost on a car sitting on the street, you get a licensed tech and an honest quote.`,
    `We would rather tell you on the phone that a job needs a dealer than take your money and fail at the kerb. That applies to every ${make} we quote.`,
    `From a second key to a full origination, ${make} work is priced up front and done at your vehicle.`,
  ];

  const modelsNotes = [
    `Not listed? We cover the rest of the ${make} range too — call with the year and model.`,
    `The list is not exhaustive; if your ${make} is not on it, ring us with the year and model.`,
    `Other ${make} models are covered as well — the ones above are simply what we see most.`,
    `Anything else in the ${make} lineup, just ask. These are the common ones, not the limit.`,
  ];

  const ctaBodies = [
    `We come to the ${make} anywhere in Brooklyn or Staten Island. Open every day, 7 AM to 11 PM.`,
    `The car stays where it is and we drive to it — every neighborhood in both boroughs, 7 AM to 11 PM daily.`,
    `No tow and no dealership queue. We reach your ${make} across Brooklyn and Staten Island, seven days a week.`,
    `A licensed tech to your ${m0}, anywhere in the two boroughs, any day between 7 AM and 11 PM.`,
  ];

  const costAnswers = [
    `It depends on the key type — a plain transponder blade costs far less than a proximity fob. ${make} keys typically start around $120 and we quote your exact vehicle on the phone. Still well below dealer pricing, and it saves the tow.`,
    `Key type decides it. A basic ${make} chip key is the cheap end; a smart proximity fob is the expensive end. We start around $120 and give you the real number once you tell us the year and model — no dealer markup, no tow bill.`,
    `Somewhere from about $120, depending on whether your ${make} takes a cut blade or a proximity fob. You get the exact figure before we set off, and it will be a good deal less than the dealership quoted.`,
    `A ${make} key starts around $120 and rises with the complexity of the fob. We price it on the phone from your year and model, so nothing changes when we arrive.`,
  ];

  const onSiteAnswers = [
    `We come to you, anywhere in Brooklyn or Staten Island. That is rather the point — with the key lost, the ${make} cannot be driven to a dealership without a tow truck.`,
    `To you. A car with no key is not going anywhere on its own, so we bring the cutting and programming equipment to wherever it is parked.`,
    `Always to the vehicle. Everything needed to originate a ${make} key rides on the van, which is what saves you the tow.`,
    `We travel to the car. Kerbside, driveway, garage, parking lot — if we can reach the ${make}, we can key it.`,
  ];

  const aftermarketAnswers = [
    `Often yes, if it is the correct part number and frequency for your ${make}. Aftermarket quality is a real gamble though — send us the part number before you buy and we will sanity-check it, which is cheaper than finding out it will not pair.`,
    `Usually, provided it matches your ${make}'s frequency and part number. Cheap listings do fail to program, and that is the fob rather than the car. Check the number with us first.`,
    `We can try, and it usually works when the part is right for the vehicle. If a bargain fob refuses to pair, the fob is the problem — so it is worth confirming the part number with us before ordering.`,
    `Yes in most cases. The failure mode is always the same: wrong frequency or a poor clone. Send the listing over and we will tell you if it will pair with your ${make}.`,
  ];

  return {
    sub: pick(subs, seed, 1),
    coverage: pick(coverages, seed, 2),
    quote: pick(quotes, seed, 3),
    process: pick(processes, seed, 4),
    closing: pick(closings, seed, 5),
    modelsNote: pick(modelsNotes, seed, 6),
    ctaBody: pick(ctaBodies, seed, 7),
    costAnswer: pick(costAnswers, seed, 8),
    onSiteAnswer: pick(onSiteAnswers, seed, 9),
    aftermarketAnswer: pick(aftermarketAnswers, seed, 10),
  };
}
