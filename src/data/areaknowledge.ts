// Neighborhood-page content, keyed on housing traits.
//
// The 105 /service-areas pages were the thinnest and most repetitive template
// on the site: roughly 230 words of prose, most of it drawn from the same
// pools. This file gives each one substance that follows from what the
// neighborhood is actually built from, and it is deliberately written from a
// different angle than the service x trait matrix in localknowledge.ts so the
// two never restate each other.
//
// %CITY% is substituted at render time.

import type { AreaTrait } from './locations';

/** Three area-level paragraphs per trait. Written about the buildings and how
 *  people live in them, not about a specific service. */
export const AREA_TRAIT_NOTES: Record<AreaTrait, string[]> = {
  rowhouse: [
    'Attached houses set the pattern for locksmith work in %CITY%. Sharing walls means the only ways in are the front and the back, which concentrates everything on two or three doors — and those doors are usually original, often heavy, and rarely the standard dimensions modern hardware assumes.',
    'The stoop-and-parlour arrangement common in %CITY% puts two locked doors between the street and the living space. It is good security by accident, and it is also why lock work here tends to come as a set rather than a single door.',
    'Row house frames in %CITY% move as the whole terrace settles. A door that has worked for forty years starts catching, then needs a shove, then stops locking — and the cause is the building, not the lock. Recognising that is most of the diagnosis on these streets.',
    'Because %CITY% houses are attached, everything comes off the street frontage — mail, deliveries, meters and the only door most visitors ever see. That concentration is why the front entrance here carries more hardware, and more wear, than a detached house of the same age.',
    'Cellar and garden doors on %CITY% row houses are the ones nobody looks at. They are usually the oldest hardware on the property and the least visible from the street, which is a poor combination and an easy one to correct.',
    'Vestibules are common through %CITY%, and they change how a lockout goes. Two doors in series means the outer one is often on a spring latch and opens quickly, while the real work is the inner door — worth mentioning when you call.',
  ],
  multifamily: [
    'Two-family and small apartment buildings dominate %CITY%, and they bring a problem keys were never designed for: people move. Every turnover puts another key into circulation that nobody can account for, which is why rekeying is the most-requested job we do here.',
    'In %CITY% the vestibule door works harder than any other door on the property. Every resident, delivery and visitor uses it, dozens of times a day, and residential-grade hardware fitted there fails within a year or two of being installed.',
    'Buildings in %CITY% usually run some form of master key arrangement, formal or otherwise, so the super can reach a unit in an emergency. Work on any one door has to keep that arrangement intact, and that is exactly what gets broken when a handyman changes a lock.',
    'Package theft drives a lot of the security work in %CITY%. Once deliveries pile up inside a vestibule, the conversation moves from locks to who can get through the street door at all, and that is an access-control question rather than a lock one.',
    'Buildings in %CITY% accumulate hardware from every previous owner and contractor, so it is common to find four brands of cylinder across six doors. Bringing a building onto one standard is slower than it sounds and worth doing once properly.',
    'Roof and basement doors in %CITY% buildings are required to work in a specific way — secure from outside, always openable from within. They are also the doors most often found propped, chained or fitted with something that should not be there.',
  ],
  singlefamily: [
    'Detached and semi-detached houses in %CITY% have more entrances than their owners tend to count: front, side, rear, garage, sometimes a basement hatch. Security here is decided by the weakest of them, and it is almost never the front.',
    'A %CITY% house that has been lived in for twenty years usually carries four or five different keys collected one repair at a time. Consolidating those onto a single key is the most common thing we are asked to do here, and the one people are happiest about afterwards.',
    'Because %CITY% houses sit on their own lots, the side and rear approaches are out of sight from the street. That privacy is why people move here, and it is also the reason the back door deserves better hardware than the front.',
    'Garages attached to %CITY% houses are frequently the softest entry on the property: an old passage door, a lock nobody has touched in twenty years, and a direct route into the house. It is the door we most often recommend upgrading first.',
    'Households in %CITY% tend to have more people needing access than an apartment does — family, a cleaner, someone feeding a pet. That is what makes keypad entry more useful here than anywhere else, because codes can be given and taken back.',
    'A hidden spare key is still the standard arrangement at a lot of %CITY% houses, and every burglar knows the three places it will be. Replacing it with a code or a lockbox is a small change that removes a real weakness.',
  ],
  waterfront: [
    'Being close to the water sets the maintenance clock in %CITY%. Salt in the air pits plated finishes, corrodes springs and seizes cylinders, so hardware that would last fifteen years inland gives up in three or four here.',
    'The failure pattern near the water in %CITY% is predictable: the key gets stiff over a season, then very stiff, then it snaps. Almost every broken-key call we take on these blocks was preceded by months of warning that went unheeded.',
    'Exterior hardware in %CITY% has to be specified for exposure rather than picked from a shelf. Solid brass, marine-grade stainless or a properly coated finish costs a little more once and saves replacing the same lock every few winters.',
    'Wind-driven rain in %CITY% gets into places sheltered doors never see. Water tracking down a keyway freezes overnight and lifts the pins out of alignment, which is why exterior locks near the water fail in the cold rather than in the storm.',
    'Storm and screen doors are common on the exposed blocks of %CITY%, and they add a second lock and a second failure point to every entrance. They also protect the main door, which is why the hardware behind them usually lasts noticeably longer.',
    'Anything mounted outside in %CITY% — a keypad, a camera, an intercom station — needs a genuinely weather-rated housing and a sealed cable entry. Water in a back-box is the single most common cause of failure on these streets.',
  ],
  commercial: [
    'The retail strips through %CITY% run a completely different class of hardware from the houses behind them. A shop door opens and closes hundreds of times a day, which is a decade of domestic wear compressed into a year, and commercial-grade locks and closers exist for exactly that reason.',
    'A %CITY% storefront is usually two locks on one entrance: a cylinder on the glass door and a padlock or gate cylinder on the roll-down. They fail independently and they need different parts, which is why a locksmith arriving with only one of them has not finished the job.',
    'Businesses along %CITY% cannot lose a morning to a door, so the work has to fit around trading. Most of what we do on these blocks happens before opening or after closing, and that scheduling is a bigger part of the service than the hardware itself.',
    'Signage, awnings and roll-down gates in %CITY% mean the door itself is often the last thing anyone looks at until it fails. A closer out of adjustment or a strike that no longer lines up will stop a shop locking properly long before the lock breaks.',
    'Turnover of staff is the security problem most %CITY% businesses actually have. Keys copied at a hardware counter cannot be recalled, which is why restricted keys or credentials tend to pay for themselves within a couple of departures.',
    'Rear and service doors on %CITY% commercial premises face alleys and yards with no passing traffic. They are the least visible part of the building and the most worth hardening, and they are usually the last thing on anyone’s list.',
  ],
  prewar: [
    'A lot of the hardware still in daily use in %CITY% was made before the war, and much of it is better built than what would replace it. Mortise cases from that era can be serviced, and the sensible default is to repair rather than to rip out.',
    'Prewar doors in %CITY% were made to dimensions nobody uses now. Modern locks frequently will not drop into the existing preparation, so the choice is a retrofit cylinder into the original case or cutting up a century-old door — and the first is nearly always the right call.',
    'Where %CITY% buildings are landmarked or simply old enough to deserve the care, the finish matters as much as the function. Matching plates and keeping original escutcheons means the security gets upgraded without the door announcing that anything changed.',
    'Original hardware in %CITY% is often worth more than the replacement being proposed for it. Solid brass mortise sets, heavy escutcheons and cast knobs from that era are frequently repairable and would cost a great deal to buy new.',
    'Doors in %CITY% from that period are usually solid timber, which is genuinely good news: they hold hardware properly and they resist force in a way a modern hollow door does not. The weak point is nearly always the frame or the strike instead.',
    'Retrofitting anything modern into a %CITY% prewar building means working around plaster, no wall cavities and finishes worth protecting. Cable routes and fixings have to be planned rather than improvised, and that planning is most of the job.',
  ],
  industrial: [
    'Converted industrial buildings around %CITY% run doors at a scale residential hardware cannot cope with — oversized steel leaves, freight entrances and roll-downs that weigh more than a car. Commercial-grade parts are the baseline here, not an upgrade.',
    'Heavy doors in %CITY% fail at the hinges and the frame before they fail at the lock. A steel door that has dropped even slightly will destroy whatever is fitted to it, so the geometry gets fixed before any hardware is discussed.',
    'Workspaces in %CITY% usually have several people needing access at different hours, which turns a lock conversation into an access conversation fairly quickly. Who should be able to open what, and when, is the actual question.',
    'Doors in converted %CITY% buildings are often original to the industrial use and enormous by domestic standards. Standard hardware fitted to them looks fine and then tears out, because the leaf weighs several times what the lock was designed for.',
    'Shared and sublet spaces around %CITY% mean several tenants behind one entrance, each needing access to their own area and not to anybody else’s. That is a keying hierarchy question and it is worth designing before the first lock goes on.',
    'Yards and loading areas in %CITY% are dark and unobserved outside working hours, so lighting and camera placement matter as much as the locks. A camera covering an unlit dock at distance records very little.',
  ],
  highrise: [
    'Larger buildings in %CITY% come with obligations that houses do not. Every door on an egress path has to release in one motion, fire-rated assemblies cannot be modified freely, and hardware has to carry the right listing — constraints that a general handyman will get wrong.',
    'Towers in %CITY% almost always run an established master key hierarchy. Work on a single suite has to fit inside that system rather than around it, or the building loses the access it is required to have.',
    'Turnover suite by suite makes lock work a recurring need in %CITY% buildings rather than an occasional one. Keeping records per floor and per tenant is what stops the system degrading into a drawer of unlabelled keys over a few years.',
    'Work in %CITY% buildings usually needs to be coordinated with a managing agent, a super and sometimes a board. Getting authorization in place before the visit is the difference between a job done and a technician turned away in a lobby.',
    'Stair and corridor doors in %CITY% buildings are fire assemblies first and security hardware second. Anything fitted to them has to keep the listing intact, which rules out a lot of what is sold for residential doors.',
    'Parking, storage and service areas in %CITY% towers each need their own access rules, and they are the ones most often left running on a key that half the building has a copy of.',
  ],
  gated: [
    'On gated properties in %CITY% the perimeter is the first door of the job. Gate cylinders and padlocks live outdoors with no shelter at all, take more weather than anything on the house, and get maintained least.',
    'The common mistake on %CITY% gated properties is a hardened gate and a soft back door, or the reverse. Security follows the weakest point, and deciding deliberately where that should be is worth more than any single piece of hardware.',
    'Gate access in %CITY% has to work for the people who arrive when nobody is home — deliveries, contractors, family. That is usually an intercom or a keypad at the gate rather than another key, and it is worth planning before hardware gets bought.',
    'A gate in %CITY% takes weather from every direction and gets used by people in a hurry, often in the dark. Hardware there wears far faster than anything on the house, and it is the part most likely to fail at the least convenient moment.',
    'Electric gate operators around %CITY% are frequently fitted separately from the locks, by a different contractor, and the two never quite agree. Making the intercom, the release and the operator work as one system is the usual fix.',
    'Deliveries are the recurring problem on gated %CITY% properties. Without an intercom or a keypad at the gate, the outcome is either a missed delivery or a gate propped open all afternoon, and the second is worse than no gate at all.',
  ],
};

/** Which services genuinely matter most for a given housing trait, with the
 *  reason. Drives a per-neighborhood "what comes up here" block instead of
 *  the identical twelve-service list every area page used to show. */
export const TRAIT_SERVICE_PRIORITY: Record<AreaTrait, { slug: string; why: string }[]> = {
  rowhouse: [
    { slug: 'lock-rekeying', why: 'Stoop, parlour and garden doors keyed alike — the change that makes an attached house liveable.' },
    { slug: 'lock-replacement-and-repair', why: 'Settlement pulls frames out of true, and that is what most sticking doors here actually are.' },
    { slug: 'deadbolt-installation', why: 'Narrow stiles on older doors need the bore measured before anything is drilled.' },
  ],
  multifamily: [
    { slug: 'lock-rekeying', why: 'Tenant turnover, with the building master left intact so the super keeps access.' },
    { slug: 'intercom-systems', why: 'Buzzer and entry-phone faults, diagnosed at the panel and the strike rather than unit by unit.' },
    { slug: 'access-control-systems', why: 'Fobs instead of keys, so a lost credential is deleted rather than triggering a building rekey.' },
  ],
  singlefamily: [
    { slug: 'lock-rekeying', why: 'One key for the front, side, garage and shed instead of the five collected over the years.' },
    { slug: 'deadbolt-installation', why: 'Reinforced strikes on the side and rear doors, which is where forced entries actually happen.' },
    { slug: 'smart-lock-installation', why: 'A keypad on the back door retires the spare key under the mat for good.' },
  ],
  waterfront: [
    { slug: 'lock-replacement-and-repair', why: 'Corroded cylinders and seized mechanisms, replaced with hardware rated for the exposure.' },
    { slug: 'emergency-lockout-service', why: 'Keys snapping in salt-worn cylinders is the most common lockout cause on these blocks.' },
    { slug: 'high-security-locks', why: 'Specified in corrosion-resistant variants, because precision hardware and salt air do not mix.' },
  ],
  commercial: [
    { slug: 'commercial-locksmith', why: 'Storefront cylinders, gate locks, closers and exit devices, scheduled around trading hours.' },
    { slug: 'access-control-systems', why: 'Staff credentials that can be revoked the day somebody leaves, with a log of who opened what.' },
    { slug: 'security-camera-installation', why: 'Coverage at the register, the entrance at head height, and the rear door.' },
  ],
  prewar: [
    { slug: 'lock-replacement-and-repair', why: 'Mortise cases serviced and rebuilt rather than replaced, because the originals are better made.' },
    { slug: 'high-security-locks', why: 'A modern cylinder threaded into the original case — current security, unchanged door.' },
    { slug: 'lock-rekeying', why: 'Cylinders unscrew out of the case, so rekeying touches nothing visible.' },
  ],
  industrial: [
    { slug: 'commercial-locksmith', why: 'Grade 1 hardware, working closers and exit devices that pass inspection.' },
    { slug: 'access-control-systems', why: 'Several entrances and shift patterns, grouped properly so the system stays maintainable.' },
    { slug: 'lock-replacement-and-repair', why: 'Frames and hinges corrected first, because a dropped steel door destroys any lock fitted to it.' },
  ],
  highrise: [
    { slug: 'commercial-locksmith', why: 'Fire-rated doors and egress compliance, coordinated with building management.' },
    { slug: 'access-control-systems', why: 'Credential systems wired to release on alarm, as code requires on every egress door.' },
    { slug: 'lock-rekeying', why: 'Suite changes pinned inside the existing master hierarchy rather than around it.' },
  ],
  gated: [
    { slug: 'lock-replacement-and-repair', why: 'Gate hardware, latches and cylinders that live outdoors and get maintained least.' },
    { slug: 'access-control-systems', why: 'A reader at the gate driving the operator, for vehicles and pedestrians both.' },
    { slug: 'intercom-systems', why: 'A station at the gate so deliveries and guests do not need a key or a phone call.' },
  ],
};

export function areaTraitParagraphs(traits: AreaTrait[], city: string, seed: number): string[] {
  // xorshift per trait rather than a modular step, so two neighborhoods with
  // the same trait set do not land on the same paragraph of each pool.
  return traits.map((t, i) => {
    const pool = AREA_TRAIT_NOTES[t];
    let h = (seed ^ Math.imul(i + 1, 2654435761)) >>> 0;
    h ^= h << 13; h >>>= 0;
    h ^= h >>> 17;
    h ^= h << 5; h >>>= 0;
    return pool[h % pool.length].split('%CITY%').join(city);
  });
}
