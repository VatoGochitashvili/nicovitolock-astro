// Service x housing-trait knowledge base.
//
// WHY THIS FILE EXISTS
// --------------------
// 660 /services/[service]/[area] pages built from shared prose pools read as
// paraphrases of each other, however large the pools get, because every page
// is still saying the same thing in different words. Google's answer to that
// is to crawl a handful and stop.
//
// This file says genuinely different things instead. Every neighborhood in
// locations.ts carries 2-3 real housing traits, and each (trait, service)
// pair here gets its own paragraph about how that service actually plays out
// in that kind of building. A lockout in a prewar walk-up and a lockout in a
// waterfront single-family are different jobs, so the pages describing them
// are different pages.
//
// %CITY% is substituted with the neighborhood name at render time.
//
// Rules for anything added here:
//  - It must be true of the trait, and specific enough that it would be wrong
//    if applied to a different trait. "We do good work" belongs nowhere.
//  - No prices. No invented facts about a named place.
//  - Technical detail is the point. Name the hardware.

import type { AreaTrait } from './locations';

type TraitMap = Partial<Record<AreaTrait, string>>;

export const TRAIT_SERVICE: Record<string, TraitMap> = {
  // ------------------------------------------------------------------
  'emergency-lockout-service': {
    rowhouse:
      'A %CITY% row house lockout is usually two locks, not one. The stoop door tends to carry a spring latch that a shim or a bypass will handle in seconds, while the interior parlor door is where the real deadbolt lives. We open the outer one first, then work the second from a comfortable position instead of fighting both from the sidewalk.',
    multifamily:
      'Apartment lockouts in %CITY% start at the vestibule. If the buzzer is dead or the intercom line is out we still need a legitimate way past the common door, so we ask you to meet us there or arrange it with the super — we do not pick a building entrance for someone we cannot place at the address.',
    singlefamily:
      'Detached houses in %CITY% almost always give us a better option than the front door. A side entry, a garage passage door, or a kitchen door with an older latch is frequently the fastest non-destructive way in, and it saves the lock you actually care about from any tool marks at all.',
    waterfront:
      'Lockouts near the water in %CITY% have a specific cause: the cylinder has corroded and the key no longer turns it, so people force it and snap the blade. Extraction plus a rebuilt cylinder is the real job, and we bring both the spiral extractor and replacement plugs rather than opening the door and leaving you with the same lock.',
    commercial:
      'A storefront lockout on a %CITY% retail block is a clock problem. Narrow-stile aluminium doors take a mortise cylinder driving a hookbolt, and roll-down gates add a padlock or a cylinder of their own. We carry both, because getting the gate up and then finding the glass door still locked is not an opening.',
    prewar:
      'Prewar doors in %CITY% run mortise cases that are eighty or ninety years old, and the pin stacks inside are worn enough that a drill is often the fastest route — which is exactly why we do not use one. These cases are hard to replace and expensive to match, so picking or a proper bypass keeps a door that still works in service.',
    industrial:
      'Getting back into a converted building in %CITY% usually means an oversized steel door in a steel frame with no gap to work with. Bypass tools do not help there; the answer is a decoded cylinder or an under-door tool on the interior lever, and knowing which before we arrive is the difference between minutes and an hour.',
    highrise:
      'Lockouts in %CITY% towers involve building staff whether anyone likes it or not. Fire-rated suite doors cannot simply be forced without creating a code problem, so we work with the managing agent, prove authorization, and open the door in a way that leaves the door assembly certified.',
    gated:
      'On gated %CITY% properties the lockout is often the gate, not the house. Padlocks seize, gate cylinders fill with grit, and electric strikes fail closed. We treat the perimeter as the first door of the job and carry the parts to leave it working rather than propped open.',
  },

  'lock-rekeying': {
    rowhouse:
      'Rekeying a %CITY% row house is a set job. Stoop, parlor, garden, and often a cellar hatch all get pinned to one key, which is the single change that makes an attached house pleasant to live in. Doing them individually costs more and leaves you back where you started, carrying four keys.',
    multifamily:
      'Tenant turnover in %CITY% is what rekeying is for. We pin the unit cylinder to a new key while leaving the building master intact, so the super keeps access and the previous tenant loses it. Cutting a fresh cylinder into a master system incorrectly is the common failure here and it is avoidable.',
    singlefamily:
      'A %CITY% single-family typically ends up with a different key for the front, the side, the garage and the shed, collected over twenty years. Rekeying pins them all to one bitting, and if the brands differ we swap in matched cylinders rather than telling you it cannot be done.',
    waterfront:
      'Rekeying only holds in %CITY% if the cylinder is sound to begin with. Salt exposure pits the plug and the springs lose tension, so we test each one before repinning — putting new pins into a corroded cylinder buys a few months and then you are calling again.',
    commercial:
      'A %CITY% storefront rekey usually means an Adams Rite style mortise cylinder on the glass door plus whatever is on the gate and the back exit. We pin the set alike and issue a written record of how many keys were cut, which is the part employees leaving tends to expose.',
    prewar:
      'Prewar mortise cases in %CITY% take a threaded cylinder that unscrews from the case, so rekeying rarely means replacing anything visible. The original escutcheon and knob stay exactly as they are and only the pinning changes, which matters when the hardware is nicer than anything sold today.',
    industrial:
      'Rekeying a workspace in %CITY% is really a question of how many people should hold which key. We usually end up building a small master hierarchy rather than one key for everything, so the freight door, the office and the storage are separable when someone leaves.',
    highrise:
      'Rekeying in a %CITY% building with an existing master system means working inside that system, not around it. We read the existing bitting, pin the new cylinder to accept both the new change key and the building master, and hand the managing agent a record of what changed.',
    gated:
      'Gated properties in %CITY% run an outer gate cylinder or padlock that everyone touches and interior doors that only a few should. Keying the gate alike while keeping the house separate is usually the right split, and it is worth deciding deliberately rather than by accident.',
  },

  'lock-replacement-and-repair': {
    rowhouse:
      'Most lock failures in %CITY% row houses are alignment, not the lock. Attached buildings settle, the frame moves a few millimetres, and the bolt starts dragging on the strike until something gives. We check the throw and the strike position first — a lock that gets replaced without fixing that will fail again the same way.',
    multifamily:
      'In %CITY% apartment buildings the door that fails is the vestibule door, because it is the one that takes every delivery, every visitor and every kick. Residential-grade hardware does not survive there; the repair that lasts is a commercial-grade latch and a closer adjusted so the door stops slamming into the frame.',
    singlefamily:
      'Side and rear doors on %CITY% houses are where we do most replacement work, and they are usually the oldest hardware on the property. They also open onto the least visible part of the lot, which is a good argument for bringing them up to the standard of the front door rather than matching them to their own past.',
    waterfront:
      'Near the water in %CITY% the failure is corrosion, and it is predictable. Interior components seize first, the key gets stiff, then it stops. Replacing like for like restarts the same clock, so we fit hardware with a finish rated for coastal exposure and stainless internals where the budget allows.',
    commercial:
      'A %CITY% storefront door cycles more in a month than a house door does in a decade. When we replace hardware there we go to commercial grade as a baseline — a proper mortise or hookbolt lock, a real closer, and a strike that is anchored into the frame rather than into the trim.',
    prewar:
      'Our default on %CITY% prewar hardware is repair. A mortise case that binds usually needs cleaning, the springs replacing, and the hub re-seated — parts that still exist. Ripping out an original case to fit a modern bore means cutting the door, and that is a decision worth making deliberately rather than by default.',
    industrial:
      'On the oversized doors common in %CITY% the frame does the failing. Heavy steel doors sag on their hinges until the bolt no longer meets the strike, and no lock survives being forced against a misalignment. We shim, re-hang or re-strike first, and replace hardware after the geometry is right.',
    highrise:
      'Suite and stair doors in %CITY% buildings are fire-rated assemblies, which restricts what can legally be fitted to them. Replacement hardware has to carry the right listing and the door cannot be modified freely. We work to that constraint, because the alternative is a violation at the next inspection.',
    gated:
      'Gate hardware on %CITY% properties lives outdoors with no shelter at all. Latches rust, self-closing hinges tension out, and cylinders fill with dirt. Replacement here means choosing hardware built for an exterior gate rather than an interior door pressed into service.',
  },

  'deadbolt-installation': {
    rowhouse:
      'Adding a deadbolt to a %CITY% row house door is mostly a question of backset and stile width. Older attached houses have narrow stiles where a standard 2⅜ inch bore leaves too little timber, so we measure before drilling and use a narrower case where the door demands it.',
    multifamily:
      'Deadbolts on %CITY% apartment doors have to respect egress. A double-cylinder bolt that needs a key from inside is a genuine hazard on a unit door and in many buildings it is not permitted at all. We fit single-cylinder with a thumbturn and, where security is the concern, solve it at the strike and the frame instead.',
    singlefamily:
      'A deadbolt is only as good as what it lands in, and %CITY% houses commonly have a strike screwed into thin door trim. We fit a reinforced strike with three-inch screws driven into the stud behind it — that single detail is the difference between a bolt that resists a kick and one that removes a chunk of frame.',
    waterfront:
      'Exterior deadbolts in %CITY% need to survive salt air. We fit solid brass or a properly coated finish rather than plated steel, because a plated bolt near the water blisters within a season and then binds in the strike.',
    commercial:
      'Deadbolts on %CITY% storefronts are usually the wrong tool. A narrow-stile glass door takes a hookbolt or a deadlatch in a mortise case, not a bored deadbolt, and a rear service door needs to stay legal for egress. We fit what the door type actually accepts.',
    prewar:
      'Prewar %CITY% doors often already carry a mortise lock, so an added deadbolt goes above it and has to clear the existing case, the escutcheon and any rail. Getting that spacing right on a hundred-year-old door is careful work, and drilling it wrong is not reversible.',
    industrial:
      'Steel doors in %CITY% workspaces cannot be bored with a wood hole saw and a hope. They need proper metal cutting, and on a hollow-metal door the bolt has to land in a reinforced strike welded or through-bolted to the frame, otherwise the frame yields first.',
    highrise:
      'Extra deadbolts on %CITY% suite and stair doors run straight into fire code. Anything on an egress path has to release with a single motion and cannot need a key from the secure side, so on those doors we increase security through the strike, the frame and the cylinder rather than by adding bolts.',
    gated:
      'On gated %CITY% properties the deadbolt on the house is the second line. The gate is the first, and it usually deserves the harder hardware — a shrouded padlock or a proper gate lock — while the house door gets a standard bolt fitted into a reinforced strike.',
  },

  'high-security-locks': {
    rowhouse:
      'High-security cylinders make most sense on a %CITY% row house when the whole set moves together. Putting a restricted-key cylinder on the stoop door while the garden door keeps a hardware-store lock protects nothing, so we scope these jobs across every exterior opening or we say so plainly.',
    multifamily:
      'Restricted keyways are what stop %CITY% building keys multiplying. An ordinary key gets copied at any hardware counter; a restricted blank can only be cut by an authorized locksmith against a signed card, which turns "who has a key" from a guess into a list.',
    singlefamily:
      'A %CITY% house with several exterior doors is the ideal case for a high-security system: one restricted key, drill-resistant and pick-resistant cylinders on every opening, and a documented record of every copy that has ever been cut.',
    waterfront:
      'High-security cylinders in %CITY% are precision assemblies, and precision and salt air are a poor match. Where we fit them near the water we specify the corrosion-resistant variants and keep the exterior cylinders serviced, because a seized high-security lock is a very expensive problem.',
    commercial:
      'Restricted keys pay for themselves fastest on a %CITY% storefront, because staff turnover is the actual threat model. When someone leaves, an uncopyable key means you know it has come back, rather than rekeying the shop every time an employee moves on.',
    prewar:
      'You can put a genuinely high-security cylinder into a %CITY% prewar mortise case without touching the door. The case stays, the escutcheon stays, and the modern cylinder threads in behind them — the door looks a hundred years old and picks like a modern lock.',
    industrial:
      'Workspaces in %CITY% usually need graded hardware rather than just a better cylinder. ANSI Grade 1 locks, reinforced strikes and door hardware that resists prying are the parts that matter when the door faces a yard or a loading area with no passing foot traffic.',
    highrise:
      'High-security in a %CITY% building is a system, not a lock. It means a restricted master hierarchy, controlled key issue, and a record per suite and per floor — which is the part that survives a change of managing agent.',
    gated:
      'On gated %CITY% properties the weak point is nearly always the padlock. A shrouded, boron-shackle lock on the gate with a restricted cylinder is worth more than upgrading the house door, because the gate is what an opportunist meets first.',
  },

  'car-key-replacement': {
    rowhouse:
      'Row house blocks in %CITY% mean street parking, so we work at the kerb. Everything needed to originate a key — the cutting machine, the programmer and the blanks — is in the van, so you are not pushing a car anywhere and there is no tow to a dealer.',
    multifamily:
      'Lost car keys in %CITY% apartment blocks usually mean the car is parked wherever there was space, sometimes streets away. That is fine — we come to the vehicle, cut and program at the car, and you never need to move it without a key.',
    singlefamily:
      'Driveways and garages in %CITY% are the easiest car key jobs we do. Off-street parking means we can work from the vehicle without traffic, which speeds up all-keys-lost programming where the module needs a stable connection for a long security cycle.',
    waterfront:
      'Cars parked near the water in %CITY% corrode at the lock cylinder long before anywhere else, and a worn door cylinder is why a freshly cut key sometimes still will not turn. We check the cylinder and decode from it rather than assuming the key is at fault.',
    commercial:
      'Commercial blocks in %CITY% are where fleet and delivery vehicles lose keys, and losing one usually stops the day. We originate keys on site for vans and box trucks as well as cars, so the vehicle is back in service without a flatbed.',
    prewar:
      'The older blocks in %CITY% have alternate-side rules and tight parking, so a car sitting keyless is a ticket waiting to happen. We come to it and cut on site, which is faster than any tow and cheaper than the alternative.',
    industrial:
      'Yards and lots around %CITY% keep work vehicles that rarely see a dealer. We originate keys for those on site — including the older transponder systems that dealers increasingly will not touch — with the programmer connected at the vehicle.',
    highrise:
      'Underground and structured parking in %CITY% often has poor signal and low clearance. We plan for that: the programming runs off the vehicle port rather than any network, so a garage two levels down is no obstacle.',
    gated:
      'Getting to a car behind a %CITY% gate means arranging access first. Tell us when you call and we will sort the entry with you or the property manager, so the technician is not sitting outside a gate with the tools and no way in.',
  },

  'key-fob-and-remote-programming': {
    rowhouse:
      'Fob programming at the kerb in %CITY% takes minutes once we are connected. Most jobs are an additional key for a second driver in the household, which is exactly the situation attached-house families in this neighborhood tend to be in.',
    multifamily:
      'In %CITY% apartment buildings we frequently do the car fob and the building fob on the same visit, since both are the same complaint: something stopped opening. They are different systems, but one trip covers both.',
    singlefamily:
      'Households in %CITY% with several drivers usually want two or three working fobs, not one. Programming additional remotes in the same session is far cheaper than adding them one at a time on separate visits.',
    waterfront:
      'Fobs near the water in %CITY% fail from moisture as often as from battery. A case that has taken spray corrodes the board contacts, and no amount of reprogramming fixes that — we test the fob before we program it so you are not paying for a dead remote.',
    commercial:
      'Businesses on the %CITY% retail strips run shared vehicles, which means several people need working remotes. We program the set and note which fobs are paired, so a missing one can be deleted from the system rather than just replaced.',
    prewar:
      'Older %CITY% blocks park a lot of older cars, and pre-2000 remotes often pair through an onboard sequence rather than a diagnostic tool. Knowing which vehicles do that is why some jobs here take ten minutes rather than an hour.',
    industrial:
      'Fleet remotes around %CITY% work sites take a beating. Where a fob housing has cracked we transfer the electronics into a new shell and re-pair it, which is normally cheaper than sourcing a complete OEM remote.',
    highrise:
      'Residents in %CITY% buildings frequently need a car remote and a garage transmitter programmed together. They are separate systems on separate frequencies and we handle both, but they are quoted separately because they are genuinely different jobs.',
    gated:
      'On gated %CITY% properties the gate remote and the car remote get confused constantly. We program vehicle fobs and, where the gate operator allows it, additional gate transmitters — but we will tell you honestly when the gate system is the property manager’s to change.',
  },

  'smart-lock-installation': {
    rowhouse:
      'Smart locks go onto %CITY% row house doors more easily than people expect, provided the door is timber and takes a standard bore. Where the stoop door is metal and narrow-stile, it usually will not fit, and we say so before you have bought the lock.',
    multifamily:
      'Most %CITY% apartment doors are steel with a mortise or a jimmy-proof rim lock, and the majority of consumer smart locks fit neither. There are retrofit options that drive the existing thumbturn, and those are usually the honest answer here rather than a full replacement.',
    singlefamily:
      'A %CITY% single-family is the best case for a smart lock, because a keypad on the side or back door removes the hidden spare key that most households still keep. We fit the lock and set the codes with you rather than leaving you a manual.',
    waterfront:
      'Smart locks near the water in %CITY% need a weather-rated exterior escutcheon, and battery life drops noticeably in cold, damp exposure. We fit the outdoor-rated variants and set the low-battery alerts, because a flat smart lock is a lockout waiting to happen.',
    commercial:
      'For %CITY% storefronts, a consumer smart lock is the wrong product. What businesses actually want is a commercial keypad or a credential reader with an audit trail and staff codes that can be revoked individually, which is access control rather than a smart lock.',
    prewar:
      'A prewar %CITY% door with a mortise case can often keep its original hardware and gain a smart deadbolt above it, or take a retrofit that turns the existing thumbturn. Boring a period door for a modern smart lock is usually the worst of the available options.',
    industrial:
      'Smart locks are not built for the door cycles a %CITY% workspace puts through them. Where the requirement is coded entry on a working door, a commercial-grade keypad lock is the product that survives the year.',
    highrise:
      'Fitting a smart lock to a %CITY% suite door usually needs building approval, and on a fire-rated door the hardware has to keep its listing. We check what the building permits before drilling anything, because reversing it is on you.',
    gated:
      'On a gated %CITY% property the smart lock is often better placed at the gate than the front door, since that is the one people need to open for guests and deliveries. Powering and weatherproofing it out there is the real work.',
  },

  'intercom-systems': {
    rowhouse:
      'Two- and three-family row houses in %CITY% run small intercom panels that are decades old and increasingly unsupported. Where the wiring between the panel and the units is sound, a modern panel drops onto it — and that wiring is usually the part worth testing before anyone quotes a full replacement.',
    multifamily:
      'Intercom faults in %CITY% buildings are usually the door station or the strike, not the handsets. When only one apartment cannot buzz someone in the problem is that unit; when nobody can, it is the power supply or the strike. Diagnosing that correctly is most of the job.',
    singlefamily:
      'Single-family intercom work in %CITY% is normally a gate or front-door station with an interior handset, and increasingly a video panel so you can see the step. Running the cable cleanly is the difference between an installation and a mess.',
    waterfront:
      'Exterior intercom stations in %CITY% take weather directly. Water tracking into the door station is the single most common failure near the water, so we specify weather-rated panels and seal the entry point properly rather than relying on the gasket.',
    commercial:
      'Businesses in %CITY% use intercoms to control a back or side entrance without staffing it. Pairing the station with an electric strike and a release button at the counter is the setup that actually works day to day.',
    prewar:
      'Prewar %CITY% buildings often still carry their original wiring, and it is frequently better than expected. We test continuity before quoting, because reusing sound cable turns a rewire into a panel swap and changes the job entirely.',
    industrial:
      'Entrances at %CITY% work sites are often far from anyone who can answer them. Intercoms there need to reach an office or a mobile handset, and the release has to be reliable enough that nobody starts propping the door.',
    highrise:
      'Large %CITY% buildings run directory panels serving dozens of units, and a single fault can take out a whole riser. We work by riser rather than by apartment, which is faster and finds the actual cause rather than chasing complaints.',
    gated:
      'A gated %CITY% property needs the intercom at the gate, which means a long cable run, weather exposure and a release wired to the gate operator. Getting the operator and the intercom to agree is the part that goes wrong when it is done piecemeal.',
  },

  'access-control-systems': {
    rowhouse:
      'Access control on a %CITY% multi-door row house usually means keypads or fobs on the stoop and the interior door, so tenants and family stop carrying keys and a departing occupant is removed from a list rather than triggering a rekey.',
    multifamily:
      'Fob systems solve the %CITY% building-key problem properly: a lost credential is deleted rather than requiring the whole building rekeyed. Sizing the controller for the actual door and user count is what stops the system being outgrown in two years.',
    singlefamily:
      'Access control at a %CITY% house is normally a keypad on the side or back door plus a code for anyone who needs occasional entry — a cleaner, a dog walker, family. Codes can be time-limited, which a key never can be.',
    waterfront:
      'Readers mounted outdoors in %CITY% need a weather-rated housing and a properly sealed cable entry. Water in the reader back-box is the failure we see most near the water, and it is entirely preventable at installation.',
    commercial:
      'For %CITY% businesses the value is the audit trail: who opened the back door, and when. Add staff credentials that can be revoked the day someone leaves and it replaces the rekey that used to follow every departure.',
    prewar:
      'Retrofitting access control into a %CITY% prewar building means finding a cable route that does not destroy the finishes, and fitting an electric strike into a frame that was never designed for one. It is doable, but it is joinery as much as electronics.',
    industrial:
      'Work sites around %CITY% need access control that copes with several entrances and shift patterns. Grouping doors and schedules properly at setup is what stops the system becoming a list of exceptions nobody maintains.',
    highrise:
      'Access control in %CITY% buildings has to integrate with fire alarm release on every egress door — locks that fail secure on an exit path are a code violation. We wire the release and the fail-safe behaviour correctly and document it.',
    gated:
      'On gated %CITY% properties the reader belongs at the gate and needs to drive the operator, not just a strike. Vehicle entry, pedestrian entry and a delivery route are three different problems and worth deciding on before hardware is bought.',
  },

  'security-camera-installation': {
    rowhouse:
      'On attached %CITY% houses the useful camera views are the stoop and the rear yard, because those are the two ways in. Shared party walls limit where cable can run, so we plan the route before mounting anything.',
    multifamily:
      'Cameras in %CITY% buildings sit at the vestibule, the mail area and the rear or basement door, which is where package theft and unauthorized entry actually happen. Coverage of common areas needs to be agreed with the board or owner first.',
    singlefamily:
      'A %CITY% house normally needs four views: front door, driveway, rear door and the side path. The side is the one people skip and the one that matters, because it is the approach nobody on the street can see.',
    waterfront:
      'Exposed positions in %CITY% take wind, salt and driving rain. Cameras there need a proper outdoor rating and sealed connections at the housing, or the image fogs and the connector corrodes within a season.',
    commercial:
      'For %CITY% storefronts the shots that matter are the register, the entrance at head height, and the rear door. A camera high in a corner producing a view of the tops of heads is a camera that will never identify anybody.',
    prewar:
      'Cabling a %CITY% prewar building is the whole job. Plaster walls, no cavity, and finishes worth protecting mean routes have to be planned rather than improvised, and that is where most of the installation time goes.',
    industrial:
      'Yards and loading areas around %CITY% need cameras that work at night at distance, which means infrared or low-light capability and adequate lighting. A daytime-only view of a loading dock is worth very little.',
    highrise:
      'Camera work in %CITY% buildings covers lobbies, service entrances and parking, and it usually needs building approval and coordination with existing systems before any installation starts.',
    gated:
      'On a gated %CITY% property the camera belongs at the gate, covering the approach and the plate of anything that pulls up. Cable and power out to the perimeter is the part that determines whether the job is straightforward or not.',
  },

  'commercial-locksmith': {
    rowhouse:
      'Ground-floor businesses in converted %CITY% row houses sit under people’s homes, which changes the job: the commercial entrance and the residential entrance often share a vestibule, and access has to be separated cleanly between them.',
    multifamily:
      'Mixed-use buildings in %CITY% put a shop below and apartments above, and the failure mode is always the same — one door everybody uses and no clear rule about who holds keys. Separating commercial from residential access is the fix worth paying for.',
    singlefamily:
      'Businesses running out of %CITY% houses still need commercial-grade hardware on the working entrance. Residential locks on a door that opens forty times a day fail within the year, whatever the building is zoned as.',
    waterfront:
      'Commercial doors near the water in %CITY% corrode fast, particularly panic hardware and closers where the internals are steel. Specifying for the exposure at installation is far cheaper than replacing exit devices every couple of years.',
    commercial:
      'The %CITY% retail strips are our core commercial work: storefront cylinders, roll-down gate locks, closers, panic hardware and rear exits. We schedule around opening hours because a closed morning costs more than the job does.',
    prewar:
      'Commercial tenancies in prewar %CITY% buildings inherit whatever the last twenty tenants left behind. A survey of what is actually fitted, followed by a plan to bring the doors to one standard, beats replacing hardware one emergency at a time.',
    industrial:
      'Workspaces around %CITY% need Grade 1 hardware, working closers and exit devices that pass inspection. Freight and loading doors take abuse that residential hardware simply is not built to absorb.',
    highrise:
      'Commercial work in %CITY% towers means fire-rated doors, egress compliance and coordination with building management. Panic hardware and closers have to meet code on every exit, and getting that wrong shows up at the next inspection.',
    gated:
      'Businesses on gated %CITY% sites need the perimeter and the building treated as one system. A hardened gate with a soft back door, or the reverse, is a common and expensive mistake.',
  },
};

/** The service x trait paragraph for a page, or null if none is written. */
export function traitServiceNote(
  serviceSlug: string,
  trait: AreaTrait,
  city: string,
): string | null {
  const t = TRAIT_SERVICE[serviceSlug]?.[trait];
  return t ? t.split('%CITY%').join(city) : null;
}
