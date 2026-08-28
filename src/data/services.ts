// Service catalog. Each entry generates /services/[slug], and combines with
// every Tier-1 neighborhood to generate /services/[slug]/[city] local pages.

export interface ServiceFaq {
  q: string;
  a: string;
}

export type ServiceCategory = 'Emergency' | 'Residential' | 'Automotive' | 'Commercial' | 'Security';

export interface Service {
  slug: string;
  name: string;
  /** Short label for nav + cards */
  short: string;
  /** Lowercase noun that reads naturally before "work"/"jobs"/"calls".
   *  e.g. "intercom" -> "the intercom work", not "intercom systems work". */
  workTerm: string;
  category: ServiceCategory;
  /** One-line summary for cards + meta descriptions */
  summary: string;
  /** Opening paragraph on the service page */
  intro: string;
  /** Second paragraph — depth, so the page isn't thin */
  detail: string;
  /** What's included */
  features: string[];
  /** Typical situations we get called for — drives a distinct on-page block */
  scenarios: string[];
  /** Inline SVG icon id (see components/Icon.astro) */
  icon: string;
  /** Ballpark price band shown on the pricing page */
  priceFrom?: string;
  /** True for the services we want featured on the homepage grid */
  featured?: boolean;
  faqs: ServiceFaq[];
}

export const services: Service[] = [
  {
    slug: 'emergency-lockout-service',
    name: 'Emergency Lockout Service',
    short: 'Lockouts',
    workTerm: 'lockout',
    category: 'Emergency',
    icon: 'lockout',
    featured: true,
    priceFrom: '$49',
    summary:
      'Locked out of your house, apartment, store, or car? We come to you and get you back in without wrecking the door.',
    intro:
      "Getting locked out is the call we take most. A licensed tech rolls out from Bay Ridge with the picks, bypass tools, and key machines already in the van, and in the overwhelming majority of cases we open the door without drilling anything — no damage to the lock, the frame, or the door.",
    detail:
      "We handle house and apartment lockouts, storefront and office lockouts, car lockouts, and the ones nobody expects: a snapped key in the cylinder, a deadbolt that's thrown itself, a jammed jimmy-proof lock, a mailbox or a padlock on a roll-down gate. You get a price on the phone before we leave, and we ask for ID or proof you belong at the address — that's how a legitimate locksmith works, and it protects you as much as it protects us.",
    features: [
      'Non-destructive entry whenever possible',
      'Homes, apartments, storefronts, offices, cars',
      'Broken key extraction',
      'Jimmy-proof, mortise & cylinder locks',
      'Price quoted before we roll out',
      'Roll-down gate & padlock openings',
      "Apartment, brownstone & vestibule doors",
      "Mailbox, cabinet & padlock openings",
      "Car lockouts, including keys locked in the trunk",
      "Photo ID and proof of address checked, always",
      "Damaged locks replaced on the spot if needed",
      "Same price evenings, weekends and holidays",
    ],
    scenarios: [
      'Key snapped off inside the cylinder',
      'Door pulled shut with the keys still inside',
      'Deadbolt thrown from the inside of an empty apartment',
      'Storefront gate lock frozen or seized',
      'Lost the only key to a rental unit',
      "Stepped out for the mail and the door swung shut",
      "Lock turns but the bolt will not retract",
      "Child or pet locked inside the apartment",
      "Basement or garage door with a seized cylinder",
      "Building vestibule buzzer dead and no key to the outer door",
    ],
    faqs: [
      {
        q: 'Will you have to drill my lock?',
        a: "Almost never. Picking, bypassing, or shimming gets the door open in most cases, and that keeps your existing lock usable. Drilling is a last resort for high-security or badly damaged cylinders — and if it's needed, we tell you first and quote the replacement before we touch anything.",
      },
      {
        q: 'Do you need proof that I live there?',
        a: "Yes. We ask for a photo ID, a lease, a piece of mail, or something else tying you to the address. Any locksmith who opens a door without asking is one you should not be calling.",
      },
      {
        q: 'How fast can you get here?',
        a: "We're based in Bay Ridge and open every day from 7 AM to 11 PM. Most Brooklyn calls we reach in 20–30 minutes; Staten Island usually runs 30–45 depending on the bridge.",
      },
    ],
  },
  {
    slug: 'lock-rekeying',
    name: 'Lock Rekeying',
    short: 'Rekeying',
    workTerm: 'rekeying',
    category: 'Residential',
    icon: 'key',
    featured: true,
    priceFrom: '$25 / cylinder',
    summary:
      'Keep your existing locks, retire the old keys. The cheapest way to lock out an ex-tenant, a contractor, or a lost keyring.',
    intro:
      "Rekeying re-pins the cylinder you already own so the old keys stop working and a new key takes over. The hardware stays on the door, so it costs a fraction of replacing locks — and if you've just closed on a house, had a roommate move out, or lost a keyring somewhere on the R train, it's exactly the right move.",
    detail:
      "We can rekey most residential and commercial cylinders on site, usually in a few minutes per lock. The best part for anyone with a front door, a vestibule door, and a back door: we key them all alike, so one key runs the whole place instead of the four-key jangle. Landlords with multiple units can go a step further with a master key system, where each tenant's key opens only their door while one master opens everything.",
    features: [
      'Existing hardware kept — much cheaper than replacement',
      'All doors keyed alike to one key',
      'Master key systems for landlords & buildings',
      'Mul-T-Lock and Medeco high-security rekeys',
      'Done on site in minutes per cylinder',
      'New keys cut on the spot',
      "Same-visit rekey for most standard cylinders",
      "Old keys rendered useless immediately",
      "Building-wide rekeys handled unit by unit",
      "Spare keys cut for every household member",
      "Padlocks and cabinet locks rekeyed too",
      "Written record of what was keyed to what",
    ],
    scenarios: [
      'Just bought a house and want the previous owner locked out',
      'Tenant moved out and did not return every key',
      'Lost a keyring with an address tag on it',
      'Contractor or cleaner had a key during a renovation',
      'Tired of carrying four keys for one building',
      "Closing on a house next week and want it done day one",
      "Roommate moved out on bad terms",
      "Airbnb turnover between long-term guests",
      "Keys stolen along with a bag or wallet",
      "Landlord requiring a rekey between tenancies",
    ],
    faqs: [
      {
        q: "What's the difference between rekeying and changing the lock?",
        a: 'Rekeying changes the pins inside the cylinder so old keys no longer work — the lock body stays. Changing the lock swaps the whole hardware. If your locks are in good shape, rekeying gets you the same security outcome for much less money.',
      },
      {
        q: 'Can you make one key open every door in my house?',
        a: "Yes — that's keying alike, and it's the single most popular thing we do. As long as the cylinders are compatible, we can put your front, back, and vestibule doors on one key.",
      },
      {
        q: 'Can you rekey a Mul-T-Lock or Medeco?',
        a: 'We can. High-security cylinders are patented and need the right key blanks and pinning kits, which we carry. Some Medeco systems require proof of ownership before new keys are cut, which is the point of the patent.',
      },
    ],
  },
  {
    slug: 'lock-replacement-and-repair',
    name: 'Lock Replacement & Repair',
    short: 'Lock Repair',
    workTerm: 'lock repair',
    category: 'Residential',
    icon: 'lock',
    featured: true,
    priceFrom: '$75',
    summary:
      'Sticking, loose, or broken locks repaired — or replaced with hardware that will outlive the door it goes on.',
    intro:
      "A lock that you have to fight with is a lock about to fail, usually at the worst moment. We repair and replace every lock type common in Brooklyn and Staten Island housing stock: knob and lever sets, deadbolts, mortise locksets in prewar buildings, jimmy-proof rim locks, storefront cylinders, and commercial hardware.",
    detail:
      "Half of what looks like a broken lock is actually a door alignment problem — a strike plate that's drifted, a swollen door, or hinges that have sagged over a few humid summers. We check that before selling you hardware you don't need. When replacement is genuinely the right answer, we install brand-name locks (Schlage, Kwikset, Yale, Mul-T-Lock, Medeco, Marks) and can key the new lock to your existing key so nothing else in your life has to change.",
    features: [
      'Repair first when repair is the honest answer',
      'Deadbolts, knobs, levers, mortise & rim locks',
      'Jimmy-proof (Segal-style) locks — a Brooklyn staple',
      'Strike plate & door alignment corrected',
      'Keyed to match your existing keys',
      'Brand-name hardware, not hardware-store filler',
      "Door alignment and hinge sag corrected",
      "Storefront and Adams Rite cylinders",
      "Sliding door and patio locks",
      "Latch, spindle and spring replacement",
      "Weather-resistant hardware for exposed doors",
      "Old hardware matched so the door looks unchanged",
    ],
    scenarios: [
      'Key has to be jiggled in a certain spot to turn',
      'Deadbolt no longer lines up with the strike',
      'Lock feels loose and spins in the door',
      'Prewar mortise lockset stopped latching',
      'Break-in damage that needs same-day repair',
      "Lock froze solid over the winter",
      "Door swollen shut and the bolt will not line up",
      "Handle came off in your hand",
      "Cylinder spinning freely inside the door",
      "Cheap builder-grade lock failing after a year",
    ],
    faqs: [
      {
        q: 'Should I repair or replace?',
        a: "If the lock body is worn out or the internals are failing, replacing is cheaper over the life of the door. If the cylinder is fine and the problem is alignment or a strike plate, repair is the right call and costs far less. We tell you which one it is on site.",
      },
      {
        q: 'Can you match a new lock to my old key?',
        a: 'In most cases, yes. If the new cylinder is compatible with your existing keyway we can key it to your current key so you keep carrying the same one.',
      },
      {
        q: 'Do you work on old mortise locks in prewar buildings?',
        a: "Constantly — a lot of Brooklyn's housing stock runs on them. We repair the originals where we can, because a well-built mortise lockset is often better made than what would replace it.",
      },
    ],
  },
  {
    slug: 'deadbolt-installation',
    name: 'Deadbolt Installation',
    short: 'Deadbolts',
    workTerm: 'deadbolt installation',
    category: 'Residential',
    icon: 'deadbolt',
    priceFrom: '$120',
    summary:
      'The best security-per-dollar upgrade there is: a properly installed deadbolt with a reinforced strike.',
    intro:
      'A spring latch keeps a door closed; a deadbolt keeps it shut. Adding one to a door that only has a knob lock is the cheapest meaningful security upgrade available, and we install single-cylinder, double-cylinder, and high-security deadbolts on residential and commercial doors across Brooklyn and Staten Island.',
    detail:
      "Installation quality matters more than the brand on the box. A deadbolt with a one-inch throw into a reinforced strike anchored by three-inch screws into the framing stud is genuinely hard to kick in; the same lock screwed into soft jamb trim is decoration. We drill clean, install the reinforcement, and check the bolt fully extends without binding — because a bolt that only throws halfway is the most common defect we find on doors somebody else installed.",
    features: [
      'Single & double-cylinder deadbolts',
      'High-security Mul-T-Lock & Medeco options',
      'Reinforced strike plates with 3" screws',
      'Clean drilling on wood and metal doors',
      'Keyed alike with your existing locks',
      'Full-throw bolt verified before we leave',
      "Grade 1 and Grade 2 commercial-rated options",
      "Double doors and French doors handled",
      "Existing holes filled and re-bored cleanly",
      "Thumbturn or key-both-sides configurations",
      "Long-throw bolts for gapped frames",
      "Wood, metal, and fiberglass doors",
    ],
    scenarios: [
      'Door has a knob lock but no deadbolt at all',
      'Adding a second lock to an apartment door',
      'Upgrading after a break-in or attempted entry',
      'New back door or basement entrance',
      'Landlord requirement for a rental unit',
      "Insurance or landlord requires a deadbolt",
      "Second lock wanted after a neighborhood break-in",
      "Replacing a flimsy chain lock with something real",
      "New door hung with no bolt bored",
      "Bolt only throws halfway into the frame",
    ],
    faqs: [
      {
        q: 'Single-cylinder or double-cylinder?',
        a: "Single-cylinder uses a key outside and a thumbturn inside. Double-cylinder needs a key on both sides, which stops someone from breaking nearby glass and reaching the turn — but it also means you need a key to get out, so keep one close by. For most apartment doors we recommend single-cylinder.",
      },
      {
        q: 'Which deadbolt is actually the most secure?',
        a: 'High-security deadbolts from Mul-T-Lock and Medeco add pick resistance, drill resistance, and patented key control so nobody can copy your key at a kiosk. For most homes a Grade 1 or Grade 2 deadbolt properly installed is a large step up already.',
      },
      {
        q: 'Can you install one on a metal door?',
        a: 'Yes. Metal and hollow-metal doors need the right bits and a slower hand, but it is routine work for us — very common on Brooklyn apartment and basement doors.',
      },
    ],
  },
  {
    slug: 'high-security-locks',
    name: 'High-Security Lock Installation',
    short: 'High-Security',
    workTerm: 'high-security lock',
    category: 'Residential',
    icon: 'shield',
    priceFrom: '$180',
    summary:
      'Mul-T-Lock and Medeco cylinders: pick resistant, drill resistant, and keys that literally cannot be copied at a kiosk.',
    intro:
      "A standard cylinder can be picked or bumped by someone who watched a video, and its key can be copied at any hardware counter. High-security cylinders solve both problems at once: hardened pins and anti-drill inserts defeat the physical attacks, and a patented keyway means duplicate keys can only be cut with your authorization card.",
    detail:
      "We install and service Mul-T-Lock and Medeco throughout Brooklyn and Staten Island — for brownstone front doors, apartment entries, storefronts, offices, and multi-family vestibules where key control is the whole point. Key control is the part people underestimate: with a patented system, an ex-employee or former tenant physically cannot walk into a shop and get a copy made. For buildings, we design master key systems on high-security platforms so one master runs the building while every tenant key stays restricted.",
    features: [
      'Mul-T-Lock & Medeco authorized installation',
      'Patented keys — copy-proof without your card',
      'Pick, bump, and drill resistant cylinders',
      'Retrofit into most existing lock bodies',
      'Master key systems for buildings',
      'Additional keys cut on your authorization',
      "Authorization cards issued and registered to you",
      "Restricted keyways no kiosk can duplicate",
      "Hardened inserts against drilling and pulling",
      "Bump and pick resistant pin stacks",
      "Matched sets across multiple doors",
      "Existing high-security cylinders re-pinned",
    ],
    scenarios: [
      'Brownstone or private house front door',
      'Storefront where too many old keys are floating around',
      'Ex-employee never returned the shop key',
      'Multi-family building vestibule and unit doors',
      'Apartment door after a bump-key or pick attempt',
      "Too many old keys unaccounted for",
      "Ex-employee or ex-partner may still hold a copy",
      "Ground-floor or garden apartment wanting real deterrence",
      "Repeated attempts on the door lock",
      "Building owner wanting tenant keys under key control",
    ],
    faqs: [
      {
        q: 'Do I have to replace my whole lock?',
        a: "Usually not. High-security cylinders retrofit into most existing deadbolts, mortise cases, and rim locks — we swap the cylinder, keep the hardware, and the door looks the same.",
      },
      {
        q: 'What happens if I lose a high-security key?',
        a: 'Bring us your authorization card and we cut a replacement. If the card is gone too, we can rekey the cylinder to a fresh key set — which is exactly what you want, because it means nobody else could have gotten a copy either.',
      },
      {
        q: 'Is it worth the extra cost?',
        a: "For a front door, a storefront, or any door where you cannot account for every key ever made, yes. For an interior closet, no. We will tell you plainly which of your doors actually justify it.",
      },
    ],
  },
  {
    slug: 'car-key-replacement',
    name: 'Car Key Replacement',
    short: 'Car Keys',
    workTerm: 'car key',
    category: 'Automotive',
    icon: 'car',
    featured: true,
    priceFrom: '$120',
    summary:
      'Lost every car key? We cut and program a new one at your car — for a lot less than the dealer, without the tow.',
    intro:
      "Losing the last key to a car is expensive at a dealership and inconvenient everywhere else, because the car has to get there. We come to the car instead. Our van carries key cutting machines and programming equipment, so we make transponder keys, remote head keys, flip keys, and smart proximity fobs on the spot for most makes and models.",
    detail:
      "Almost every car built since the late 1990s has a transponder chip in the key that has to be electronically married to the immobilizer — cutting the metal alone will open the door but not start the engine. We do both halves: cut the blade to your VIN or by decoding the existing lock, then program the chip to the vehicle. All keys lost is not a problem; that's the situation we're most often called for. We can also erase old keys from the car's memory, which is the thing to do when a key goes missing rather than simply breaks.",
    features: [
      'All-keys-lost situations handled on site',
      'Transponder / chip keys cut and programmed',
      'Remote head keys, flip keys, smart fobs',
      'Push-to-start proximity keys',
      'Old lost keys erased from the vehicle',
      'Far below dealership pricing, no tow needed',
      "Keys originated from the vehicle, no dealer visit",
      "Laser / sidewinder and high-security blades cut",
      "Motorcycle and van keys where supported",
      "Ignition and door cylinder diagnosis",
      "Proof of ownership checked before any key is cut",
      "Second key cut at the same visit for less",
    ],
    scenarios: [
      'Only key lost — car sitting on the street',
      'Key broke off in the ignition or door',
      'Bought a used car that came with one key',
      'Spare key needed before going on a trip',
      'Key works the doors but no longer starts the car',
      "Keys went into the water off the pier",
      "Only key stolen with the bag",
      "Dealer quoted several hundred and a tow",
      "Key turns but the immobilizer light stays on",
      "Inherited or auction car with no keys at all",
    ],
    faqs: [
      {
        q: 'Can you make a key with no working key at all?',
        a: 'Yes — that is the all-keys-lost job and we do it regularly. We originate a key from the vehicle and program it to the immobilizer. Bring your license and the registration or title so we can confirm the car is yours.',
      },
      {
        q: 'Do you cover my make and model?',
        a: "We cover most domestic and import vehicles. Some European models and a handful of the newest platforms are dealer-locked; tell us the year, make, and model when you call and we'll give you a straight yes or no instead of showing up and shrugging.",
      },
      {
        q: 'Is this really cheaper than the dealership?',
        a: "Almost always — and it also saves you the tow, since the dealer needs the car there and you have no key. We quote the full price before we come out.",
      },
    ],
  },
  {
    slug: 'key-fob-and-remote-programming',
    name: 'Key Fob & Remote Programming',
    short: 'Key Fobs',
    workTerm: 'key fob',
    category: 'Automotive',
    icon: 'fob',
    priceFrom: '$60',
    summary:
      'Remotes, smart fobs, and push-to-start keys programmed to your car — new, spare, or replacement.',
    intro:
      "A fob that stopped working is not always a dead fob. We diagnose first: batteries, worn buttons, a fob that lost its pairing after a battery disconnect, or genuine electronic failure. If it can be reprogrammed we reprogram it, and if it needs replacing we supply and program the new one at your car.",
    detail:
      "We program remote head keys, separate remotes, flip keys, and proximity smart fobs for push-to-start vehicles, and we can add spares so you're not down to one key again. Spares are the cheapest insurance in this entire trade — programming a second fob while you still have a working one costs a fraction of what an all-keys-lost job does later.",
    features: [
      'Remote, flip key, and smart fob programming',
      'Push-to-start proximity fobs',
      'Spare fobs added while you still have one',
      'Fob battery and button diagnosis first',
      'Old or lost fobs erased from the car',
      'Programmed at your car, not at a counter',
      "Frequency and part-number checked before ordering",
      "Fob shells replaced when buttons wear out",
      "Keyless entry modules diagnosed",
      "Multiple fobs programmed in one visit",
      "Trunk and sliding-door remotes",
      "Aftermarket fobs paired where the vehicle allows",
    ],
    scenarios: [
      'Fob stopped unlocking after a battery change',
      'Bought a replacement fob online and need it programmed',
      'Want a spare before losing the only one',
      'Buttons work but push-to-start no longer detects the key',
      'Used car came with a fob that was never paired',
      "Fob works up close but not from a distance",
      "One of two fobs stopped responding",
      "Remote start no longer triggering",
      "Buttons cracked and sticking",
      "Fob got wet and died",
    ],
    faqs: [
      {
        q: 'I bought a fob online — can you program it?',
        a: "Usually yes, if it's the correct part number and frequency for your vehicle. Aftermarket quality is a real gamble though; if a cheap fob refuses to program, that's the fob, not the car. Send us the part number before you buy and we'll sanity-check it.",
      },
      {
        q: 'Why did my fob stop working after the battery died?',
        a: "Some vehicles drop the key pairing when power is fully disconnected. Often it just needs reprogramming rather than replacing — which is a much smaller bill.",
      },
      {
        q: 'How much cheaper is a spare than an emergency replacement?',
        a: "Substantially. Programming a spare while you have a working key is simple. All-keys-lost requires originating a key and accessing the immobilizer, which takes longer and costs more. Get the spare.",
      },
    ],
  },
  {
    slug: 'smart-lock-installation',
    name: 'Smart Lock Installation',
    short: 'Smart Locks',
    workTerm: 'smart lock',
    category: 'Residential',
    icon: 'smart',
    priceFrom: '$140',
    summary:
      'Keypad and app-controlled locks installed and set up properly — including on doors that fight back.',
    intro:
      "Keypad and smart locks are genuinely useful: no key to lose, a code you can give a dog walker and delete on Monday, and a log of who came in and when. We install Yale, Schlage Encode, Kwikset Halo, Lockly, August, and Ultraloq on residential and small-commercial doors, and we set them up completely rather than leaving you with a box and a QR code.",
    detail:
      "The catch with smart locks is that the failure modes are installation problems, not software problems. A misaligned strike makes the motor strain and drains batteries in weeks. A door that needs a shoulder to close will fail to auto-lock. A metal apartment door may not fit a given model at all. We check the door first, tell you honestly whether the lock you picked will work on it, install it square, and then walk you through codes, app access, and auto-lock settings before we leave.",
    features: [
      'Yale, Schlage, Kwikset, Lockly, August, Ultraloq',
      'Keypad, app, and auto-lock setup included',
      'Door and strike aligned so batteries last',
      'Codes for family, cleaners, and dog walkers',
      'Mechanical key backup kept where possible',
      'Honest advice on whether your door suits one',
      "Wi-Fi and Bluetooth bridge setup",
      "Existing deadbolt swapped without new holes where possible",
      "Auto-lock timing tuned to the door",
      "Guest and recurring codes configured",
      "Battery type and change interval explained",
      "Removal and reinstatement of the original lock on request",
    ],
    scenarios: [
      'Kids who keep losing house keys',
      'Airbnb or rental turnover between guests',
      'Dog walker or cleaner needing timed access',
      'Smart lock bought online that will not fit the door',
      'Existing smart lock eating batteries every month',
      "Lock keeps failing to latch on auto-lock",
      "App lost connection after a router change",
      "Codes need rotating between short-term guests",
      "Elderly parent who struggles with keys",
      "Smart lock installed crooked by a handyman",
    ],
    faqs: [
      {
        q: 'Will a smart lock fit my apartment door?',
        a: "Depends on the door. Many Brooklyn apartment doors are metal with mortise or jimmy-proof locks that most consumer smart locks don't fit. Send us a photo of the inside of your door and we'll tell you before you spend money.",
      },
      {
        q: 'What happens when the batteries die?',
        a: "Most models warn you for weeks first, keep a physical key override, and have external terminals to jump the lock with a 9V. We show you exactly where those are during setup.",
      },
      {
        q: 'Is a smart lock as secure as a deadbolt?',
        a: "The good ones are deadbolts, with a motor added. Security comes from the bolt and the strike, same as always — which is why we spend the time on alignment and reinforcement rather than the app.",
      },
    ],
  },
  {
    slug: 'intercom-systems',
    name: 'Intercom & Video Intercom Systems',
    short: 'Intercoms',
    workTerm: 'intercom',
    category: 'Commercial',
    icon: 'intercom',
    featured: true,
    priceFrom: 'Quoted on site',
    summary:
      'Audio and video intercoms for multi-family buildings, from a single dead handset to a full building replacement.',
    intro:
      "Brooklyn and Staten Island are full of two- to twenty-unit buildings running intercoms installed decades ago, and when they fail they fail one apartment at a time until nobody can buzz anybody in. We repair the old systems where parts still exist and replace them where they don't, working with Aiphone, Akuvox, Doorking, and the other platforms actually used around here.",
    detail:
      "For repairs we trace the problem properly: the handset, the wiring run, the door strike, or the power supply — because replacing a station that was never the fault is how buildings end up paying twice. For replacements we size the system to the building: audio-only where that's all that's needed, video where tenants want to see who's downstairs, and modern IP or app-based systems that ring a tenant's phone so packages and visitors work whether anyone is home or not. Landlords: we'll walk the building and give you one written number rather than a per-door surprise.",
    features: [
      'Repair of existing audio & video intercoms',
      'Full building replacements, 2 to 20+ units',
      'Aiphone, Akuvox, Doorking and more',
      'App-based systems that ring a tenant phone',
      'Electric strikes and magnetic locks integrated',
      'Directory and buzzer panels replaced',
      "Wiring runs traced before anything is replaced",
      "Directory and nameplate panels updated",
      "Handsets replaced individually",
      "Weatherproof outdoor stations",
      "Power supplies and transformers tested",
      "Existing wiring reused where it is sound",
    ],
    scenarios: [
      'One apartment can no longer buzz the door open',
      'Whole building intercom went dead at once',
      'Panel vandalized or corroded from the weather',
      'Tenants want video instead of audio only',
      'Owner wants visitors to ring a cell phone instead',
      "Buzzer opens the door but there is no audio",
      "Static or crossed lines between apartments",
      "Panel buttons worn through and unreadable",
      "New unit added and never wired to the panel",
      "Door releases but the strike sticks",
    ],
    faqs: [
      {
        q: 'Can you fix just one apartment instead of the whole system?',
        a: 'Very often, yes. Single-station failures are common and much cheaper than a building replacement. We diagnose first and only recommend a full system when the backbone itself is the problem.',
      },
      {
        q: 'Can the intercom ring my phone instead?',
        a: "Yes — app-based systems from Akuvox and similar platforms send the call to your phone, so you can see and buzz in a visitor from anywhere. Popular with landlords and anyone who gets a lot of deliveries.",
      },
      {
        q: 'Do you handle whole buildings for landlords?',
        a: "Regularly. We walk the building, check the existing wiring, and give you one written quote covering every station, the panel, the strike, and the labor.",
      },
    ],
  },
  {
    slug: 'access-control-systems',
    name: 'Access Control Systems',
    short: 'Access Control',
    workTerm: 'access control',
    category: 'Commercial',
    icon: 'access',
    priceFrom: 'Quoted on site',
    summary:
      'Key fobs, cards, and keypads that let you add or revoke someone in seconds instead of rekeying a building.',
    intro:
      "Once more than a handful of people need a door, keys stop making sense. Access control replaces them with fobs, cards, codes, or phone credentials — and gives you the one thing keys can never provide: the ability to delete someone's access instantly, from a screen, without changing a single lock.",
    detail:
      "We install standalone keypads for a single door and networked systems covering an entire building, plus the hardware that goes with them: electric strikes, magnetic locks, door position switches, push-to-exit buttons, and request-to-exit motion sensors. Every install is set up to fail safe or fail secure correctly and to release on the fire alarm where code requires — the part that separates a legal install from a liability. You also get an audit trail of who opened which door and when, which settles a lot of arguments.",
    features: [
      'Fob, card, keypad, and phone credentials',
      'Single door or full building networks',
      'Magnetic locks & electric strikes',
      'Push-to-exit and motion request-to-exit',
      'Instant add/revoke, no rekeying',
      'Audit trail of every door event',
      "Standalone keypads where a network is overkill",
      "Fire-alarm release wired where code requires",
      "Timed access windows for cleaners and staff",
      "Anti-passback and door-held-open alerts",
      "Battery backup for the door hardware",
      "Existing fobs migrated where compatible",
    ],
    scenarios: [
      'Staff turnover means keys keep disappearing',
      'Office, warehouse, or gym needing after-hours control',
      'Building wants fobs instead of tenant keys',
      'Restricting a stockroom or server room',
      'Adding a keypad to a single back door',
      "Fobs still working for people who left",
      "Cleaners needing access only on set days",
      "Door propped open and nobody notices",
      "Shared building entrance with no accountability",
      "Keypad code that everybody in the neighborhood knows",
    ],
    faqs: [
      {
        q: 'Can I add access control to the doors I already have?',
        a: 'Usually. Most existing doors take an electric strike or a maglock with a reader, keeping the door and frame you have. We survey the doors first and tell you which ones need more work.',
      },
      {
        q: 'What happens in a power outage?',
        a: "It depends on how the door is configured. Fail-secure keeps it locked, fail-safe releases it — and fire egress rules dictate which is legal on which door. We set that correctly and explain what your doors will do.",
      },
      {
        q: 'How hard is it to remove someone?',
        a: "Seconds. You delete the credential and that fob or code stops working immediately on every door. That is the entire reason to move off keys.",
      },
    ],
  },
  {
    slug: 'security-camera-installation',
    name: 'Security Camera Installation',
    short: 'Cameras',
    workTerm: 'camera',
    category: 'Security',
    icon: 'camera',
    featured: true,
    priceFrom: 'Quoted on site',
    summary:
      'CCTV that actually produces usable footage — placed, aimed, and set up so you can find the clip when it matters.',
    intro:
      "Most camera systems disappoint their owners at the exact moment they're needed, and it's nearly always the same three reasons: the camera was aimed at the wrong place, it was useless at night, or nobody knew how to pull the footage. We install systems that avoid all three.",
    detail:
      "We design coverage around the actual chokepoints — the front door, the vestibule, the register, the driveway, the package drop — rather than scattering cameras and hoping. We run proper cable instead of relying on Wi-Fi that drops, install IR or color-at-night cameras where lighting is bad, size the recorder for the retention you actually need, and set up remote viewing on your phone. Then we sit with you and pull a clip together, so the first time you export footage isn't the day something happens. Homes, storefronts, warehouses, and multi-family buildings.",
    features: [
      'HD and 4K camera systems',
      'Night vision and low-light color cameras',
      'NVR/DVR sized for real retention needs',
      'Proper cable runs, not dropout-prone Wi-Fi',
      'Remote viewing set up on your phone',
      'We teach you to export a clip before we leave',
      "Coverage walked and planned before a hole is drilled",
      "Cable runs concealed through walls and soffits",
      "Vandal-resistant housings for reachable spots",
      "Motion zones set to cut false alerts",
      "Existing systems expanded rather than replaced",
      "Footage export walked through with you on site",
    ],
    scenarios: [
      'Packages disappearing from the vestibule',
      'Storefront needing register and entrance coverage',
      'Repeated vandalism on a building or gate',
      'Landlord wanting coverage of a shared hallway',
      'Existing cameras that record unusable night footage',
      "Existing cameras recording unusable night footage",
      "Blind spot exactly where the incident happened",
      "System full and overwriting before you can review",
      "Cameras offline and nobody noticed for weeks",
      "Needing footage for an insurance or police report",
    ],
    faqs: [
      {
        q: 'How many cameras do I actually need?',
        a: "Fewer than most people are sold. Cover the chokepoints — entrances, the register, the driveway — with cameras placed close enough to identify a face rather than one wide shot of everything. A well-placed four beats a badly placed twelve.",
      },
      {
        q: 'How long is footage kept?',
        a: 'It depends on the recorder size, camera count, and resolution. Two weeks is the common target and usually enough; we size the drive for what you tell us you need.',
      },
      {
        q: 'Can I watch it on my phone?',
        a: 'Yes, and we set it up and test it with you on your own phone before we leave, including how to scrub back and export a clip.',
      },
    ],
  },
  {
    slug: 'commercial-locksmith',
    name: 'Commercial Locksmith Service',
    short: 'Commercial',
    workTerm: 'commercial locksmith',
    category: 'Commercial',
    icon: 'store',
    priceFrom: 'Quoted on site',
    summary:
      'Storefronts, offices, and buildings: panic bars, door closers, roll-down gates, master keying, and code compliance.',
    intro:
      "Commercial doors take more abuse in a month than a house door takes in a year, and they carry legal requirements a house door doesn't. We handle the full range for Brooklyn and Staten Island businesses — storefront cylinders and Adams Rite hardware, panic bars and exit devices, door closers, roll-down gate locks, master key systems, and file cabinet and desk locks.",
    detail:
      "Exit doors are where we spend a lot of time, because getting them wrong is a real liability: a panic bar has to let people out under a single motion without a key, no matter what you've added to secure the door from outside. We install and service Von Duprin, Detex, and Adams Rite devices, adjust closers so doors latch instead of drifting, and set up master key systems where a manager's key opens everything while each employee key opens only what it should. We also work with landlords and property managers across multiple buildings on a single point of contact.",
    features: [
      'Panic bars & exit devices (Von Duprin, Detex)',
      'Adams Rite storefront hardware & cylinders',
      'Door closers adjusted and replaced',
      'Roll-down gate locks & padlocks',
      'Master key systems for staff hierarchies',
      'Property managers: multiple buildings, one contact',
      "Emergency exit compliance checked",
      "Mortise and cylindrical lever sets",
      "Cam locks for cabinets, tills and lockers",
      "Keyed-alike sets across multiple locations",
      "Scheduled maintenance for high-traffic doors",
      "Invoicing per property for managed portfolios",
    ],
    scenarios: [
      'Storefront lock seized on a Sunday morning',
      'Panic bar not releasing on a single push',
      'Door closer slamming or leaving the door ajar',
      'Manager left and had keys to everything',
      'Roll-down gate padlock cut or frozen',
      "Gate padlock cut overnight",
      "Fire inspection flagged the exit hardware",
      "Handover between tenants of a retail unit",
      "Cylinder worn out from hundreds of daily uses",
      "Office suite needing separate keys per room",
    ],
    faqs: [
      {
        q: 'Can you service my storefront the same day?',
        a: "Most of the time, yes. We're open every day 7 AM to 11 PM and carry common storefront cylinders and Adams Rite hardware on the van, so a lot of it gets solved on the first visit.",
      },
      {
        q: 'What is a master key system?',
        a: 'A hierarchy: each employee key opens only their doors, while a master opens everything. It replaces the ring of twelve keys behind the counter and means one lost key does not compromise the whole business.',
      },
      {
        q: 'Do you work with property managers on multiple buildings?',
        a: 'Yes. We handle recurring work across portfolios, keep records of what is keyed how, and bill per property so your accounting stays clean.',
      },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const featuredServices = services.filter((s) => s.featured);

export const serviceCategories: ServiceCategory[] = [
  'Emergency', 'Residential', 'Automotive', 'Commercial', 'Security',
];
