// Car makes we cut and program keys for.
//
// This exists because "honda key replacement brooklyn" is a completely
// different search from "car key replacement brooklyn", and the generic
// service page never ranks for it. Each entry carries real, make-specific
// detail — key systems, common failures, and honestly which platforms are
// dealer-locked, because sending someone on a wasted trip is worse for us
// than saying no on the phone.

export interface Vehicle {
  slug: string;
  make: string;
  /** Immobiliser / key platform used across the range */
  system: string;
  /** Key types we cut and program for this make */
  keyTypes: string[];
  /** Genuinely make-specific notes */
  notes: string;
  /** What owners of this make actually call us about */
  common: string[];
  /** True where we can originate an all-keys-lost key on site */
  allKeysLost: boolean;
  /** Models we actually see, for genuine on-page specificity */
  models: string[];
  /** Model-year and platform detail unique to this make */
  yearNotes: string;
  /** Honest caveat, where one exists */
  caveat?: string;
  popular?: boolean;
}

export const vehicles: Vehicle[] = [
  {
    slug: 'honda', make: 'Honda', system: 'Honda immobiliser (HON66 / HO01 keyways)', popular: true,
    keyTypes: ['Transponder chip keys', 'Remote head keys', 'Smart proximity fobs (Accord, Civic, CR-V)'],
    notes: 'Hondas are among the most straightforward makes we work on. Pre-2015 Civics, Accords and CR-Vs take a standard transponder key we can cut and program in minutes at the car. Newer push-to-start models use a proximity fob that still programs on site.',
    common: ['Only key lost on an older Civic or Accord', 'Worn key that no longer turns the ignition', 'Push-to-start CR-V fob not detected', 'Spare needed for a second driver'],
    allKeysLost: true,
    models: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey", "HR-V", "Fit"],
    yearNotes: "The 2006\u20132015 Civic and Accord are the two we cut most often in Brooklyn \u2014 a plain transponder blade, done in under twenty minutes. From 2016 the Civic moved to a proximity fob, which costs more but still programs at the kerb. Odyssey sliding-door remotes are a fob fault far more often than a door fault.",
  },
  {
    slug: 'toyota', make: 'Toyota', system: 'Toyota G-chip / H-chip immobiliser, Smart Key', popular: true,
    keyTypes: ['G and H transponder chip keys', 'Remote head keys', 'Smart Key proximity fobs'],
    notes: 'Toyota moved from the G chip to the more secure H chip around 2013–2014, and the two are not interchangeable — part of the job is identifying which your car uses before cutting anything. Camry, Corolla, RAV4 and Highlander are all routine for us.',
    common: ['All keys lost on a Corolla or Camry', 'H-chip key from an online seller that will not program', 'Smart Key stopped being recognised', 'Key turns but the security light stays on'],
    allKeysLost: true,
    models: ["Camry", "Corolla", "RAV4", "Highlander", "Prius", "Tacoma", "Sienna"],
    yearNotes: "The G-to-H chip change around 2013\u20132014 is the single thing that decides how a Toyota job goes. A 2012 Camry and a 2015 Camry take different keys that look nearly identical. Prius models add a smart-key layer on top. We identify the chip from the VIN before cutting anything.",
  },
  {
    slug: 'nissan', make: 'Nissan', system: 'NATS (Nissan Anti-Theft System)', popular: true,
    keyTypes: ['NATS transponder keys', 'Remote head keys', 'Intelligent Key proximity fobs'],
    notes: 'Altima, Sentra and Rogue keys are standard work. Nissan Intelligent Keys are a common battery-and-pairing problem rather than a failure — worth checking before buying a replacement fob.',
    common: ['Intelligent Key not detected after a battery change', 'All keys lost on an Altima or Sentra', 'Key fob buttons working but no push-to-start', 'Spare Intelligent Key'],
    allKeysLost: true,
    models: ["Altima", "Sentra", "Rogue", "Maxima", "Pathfinder", "Versa", "Murano"],
    yearNotes: "Altima and Sentra make up most of our Nissan work. The Intelligent Key fitted from roughly 2013 loses its pairing after a flat 12V battery far more readily than other makes \u2014 worth trying a re-pair before buying a replacement fob.",
  },
  {
    slug: 'ford', make: 'Ford', system: 'PATS (Passive Anti-Theft System)', popular: true,
    keyTypes: ['PATS transponder keys', '8-cut and 10-cut blades', 'Intelligent Access proximity fobs'],
    notes: 'F-150, Escape, Explorer and Fusion are all regular work. Ford blade profiles changed around 2011 from 8-cut to a high-security design, so identifying the year matters before cutting.',
    common: ['All keys lost on an F-150 or Escape', 'Key breaks in the ignition', 'Intelligent Access fob not detected', 'Second key for a work truck'],
    allKeysLost: true,
    models: ["F-150", "Escape", "Explorer", "Fusion", "Focus", "Transit", "Edge"],
    yearNotes: "The blade changed around 2011 from the older 8-cut to a high-security profile, so the model year decides the machine we use. F-150 and Transit work is often for contractors who need the truck moving the same morning, and we prioritise accordingly.",
  },
  {
    slug: 'chevrolet', make: 'Chevrolet', system: 'GM immobiliser / PEPS proximity', popular: true,
    keyTypes: ['Transponder keys', 'Remote head keys', 'PEPS proximity fobs'],
    notes: 'Silverado, Equinox, Malibu and Impala keys are routine. Older GM vehicles used a VATS resistor pellet in the blade — a completely different system that still turns up on well-kept older cars.',
    common: ['All keys lost on a Silverado or Equinox', 'Older GM key with a worn VATS pellet', 'Remote start no longer working', 'Spare fob for a second driver'],
    allKeysLost: true,
    models: ["Silverado", "Equinox", "Malibu", "Impala", "Traverse", "Tahoe", "Cruze"],
    yearNotes: "Silverado and Equinox are the bulk of it. Anything pre-2007 may still carry a VATS resistor pellet in the blade \u2014 a resistance-based system rather than a chip, and one a lot of newer locksmiths no longer carry blanks for. We do.",
  },
  {
    slug: 'jeep', make: 'Jeep', system: 'SKIM / SKREEM (Sentry Key)', popular: true,
    keyTypes: ['Sentry Key transponder keys', 'Fobik keys', 'Proximity fobs'],
    notes: 'Jeep shares its Sentry Key platform with Dodge, Chrysler and Ram, so the same equipment covers all four. Wrangler, Grand Cherokee and Cherokee are all standard jobs.',
    common: ['All keys lost on a Wrangler or Grand Cherokee', 'Fobik key worn out', 'Key programs but remote functions do not', 'Spare for a leased vehicle'],
    allKeysLost: true,
    models: ["Wrangler", "Grand Cherokee", "Cherokee", "Compass", "Renegade", "Gladiator"],
    yearNotes: "Wrangler and Grand Cherokee dominate. The Fobik key used across the mid-2000s to mid-2010s range wears at the buttons long before the electronics fail, so a housing swap often solves what looks like a dead key.",
  },
  {
    slug: 'dodge', make: 'Dodge', system: 'SKIM / SKREEM (Sentry Key)',
    keyTypes: ['Sentry Key transponder keys', 'Fobik keys', 'Proximity fobs'],
    notes: 'Charger, Challenger, Durango and Caravan run the same Sentry Key platform as Jeep, Chrysler and Ram. Fobik keys in particular wear out at the buttons long before the electronics fail, which is a cheap fix.',
    common: ['All keys lost on a Charger or Caravan', 'Fobik buttons cracked or unresponsive', 'Push-to-start not detecting the fob', 'Spare key before a road trip'],
    allKeysLost: true,
    models: ["Charger", "Challenger", "Durango", "Grand Caravan", "Journey"],
    yearNotes: "Grand Caravan work is usually sliding-door remotes and worn Fobiks. Charger and Challenger proximity fobs are straightforward for spares; all-keys-lost takes longer because the module has to be accessed.",
  },
  {
    slug: 'ram', make: 'Ram', system: 'SKIM / SKREEM (Sentry Key)',
    keyTypes: ['Sentry Key transponder keys', 'Fobik keys', 'Proximity fobs'],
    notes: 'Ram 1500, 2500 and ProMaster keys are common work for us, especially for contractors and delivery operators running vans across Brooklyn who cannot afford a truck sitting still.',
    common: ['All keys lost on a work truck', 'ProMaster van key for a fleet', 'Fobik worn from daily use', 'Extra keys for multiple drivers'],
    allKeysLost: true,
    models: ["1500", "2500", "3500", "ProMaster", "ProMaster City"],
    yearNotes: "Nearly all our Ram work is commercial \u2014 contractors and delivery operators running ProMasters around the boroughs. We keep blanks on the van because a work truck standing still costs more than the key does.",
  },
  {
    slug: 'chrysler', make: 'Chrysler', system: 'SKIM / SKREEM (Sentry Key)',
    keyTypes: ['Sentry Key transponder keys', 'Fobik keys', 'Proximity fobs'],
    notes: 'Pacifica, 300 and Town & Country all use the Sentry Key system. Sliding-door remote functions are a frequent complaint on the minivans and are usually a fob problem rather than a door problem.',
    common: ['All keys lost on a Pacifica or 300', 'Sliding door remote not responding', 'Fobik key replacement', 'Spare for a family second driver'],
    allKeysLost: true,
    models: ["Pacifica", "300", "Town & Country", "Voyager"],
    yearNotes: "Pacifica and Town & Country are family vehicles where the sliding-door remote is the usual complaint. The 300 shares its platform with the Charger, so the same equipment covers both.",
  },
  {
    slug: 'hyundai', make: 'Hyundai', system: 'Hyundai immobiliser / Smart Key', popular: true,
    keyTypes: ['Transponder chip keys', 'Remote head keys', 'Smart Key proximity fobs'],
    notes: 'Elantra, Sonata and Tucson are routine. Worth knowing: many 2011–2021 Hyundais were built WITHOUT an engine immobiliser, which is the flaw behind the well-publicised theft wave. If that is your car, ask us about it — a replacement key is straightforward, but the security gap is worth addressing separately.',
    common: ['All keys lost on an Elantra or Sonata', 'Smart Key not detected', 'Concerns after the Hyundai/Kia theft wave', 'Spare key'],
    allKeysLost: true,
    models: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Accent", "Kona", "Palisade"],
    yearNotes: "Elantra and Sonata are the volume. The thing worth knowing: a large share of 2011\u20132021 Hyundais shipped with no engine immobiliser at all, which is why those years were targeted so heavily. A key is straightforward either way, but if you own one, ask us what else is worth doing.",
  },
  {
    slug: 'kia', make: 'Kia', system: 'Kia immobiliser / Smart Key', popular: true,
    keyTypes: ['Transponder chip keys', 'Remote head keys', 'Smart Key proximity fobs'],
    notes: 'Optima, Forte, Soul and Sportage keys are standard work. Like Hyundai, a large number of 2011–2021 Kias shipped without an immobiliser — the reason those models were targeted so heavily. We can cut and program keys either way, and advise honestly on what else is worth doing.',
    common: ['All keys lost on a Forte or Optima', 'Smart Key battery and pairing issues', 'Security worries on an older Soul or Sportage', 'Second key for a household'],
    allKeysLost: true,
    models: ["Optima", "Forte", "Soul", "Sportage", "Sorento", "Rio", "Telluride"],
    yearNotes: "Forte, Soul and Optima are the ones we see. Same immobiliser gap as Hyundai across roughly 2011\u20132021 \u2014 the two makes share engineering. We will tell you plainly whether your specific car has one.",
  },
  {
    slug: 'mazda', make: 'Mazda', system: 'Mazda immobiliser / Advanced Keyless',
    keyTypes: ['Transponder chip keys', 'Remote head keys', 'Advanced Keyless proximity fobs'],
    notes: 'Mazda3, CX-5 and CX-9 are all standard jobs. Mazda proximity fobs are prone to battery drain if left near the vehicle overnight, which owners often mistake for a dead fob.',
    common: ['All keys lost on a Mazda3 or CX-5', 'Proximity fob draining batteries fast', 'Key worn and sticking in the ignition', 'Spare fob'],
    allKeysLost: true,
    models: ["Mazda3", "CX-5", "CX-9", "Mazda6", "CX-30", "MX-5"],
    yearNotes: "Mazda3 and CX-5 make up most of it. Advanced Keyless fobs drain their batteries if the car is parked with the fob close by overnight \u2014 owners read that as a dead fob when it is a habit problem.",
  },
  {
    slug: 'subaru', make: 'Subaru', system: 'Subaru immobiliser / Keyless Access',
    keyTypes: ['Transponder chip keys', 'Remote head keys', 'Keyless Access proximity fobs'],
    notes: 'Outback, Forester and Impreza keys are routine. Some newer Subarus need the vehicle present with proof of ownership before keys can be originated, which we handle at the car.',
    common: ['All keys lost on an Outback or Forester', 'Keyless Access fob not recognised', 'Spare key before winter', 'Worn key blade'],
    allKeysLost: true,
    models: ["Outback", "Forester", "Impreza", "Crosstrek", "Ascent", "Legacy"],
    yearNotes: "Outback and Forester, overwhelmingly. Some newer Subarus require the car present with proof of ownership before a key can be originated at all, which we handle at the vehicle rather than asking you to tow it anywhere.",
  },
  {
    slug: 'volkswagen', make: 'Volkswagen', system: 'Immobiliser 4 / MQB platform',
    keyTypes: ['Transponder chip keys', 'Flip keys', 'KESSY proximity fobs'],
    notes: 'Older Jettas, Passats and Golfs we handle on site without difficulty. Newer cars on the MQB platform are far more locked down — call with your year and model and we will tell you honestly before coming out.',
    common: ['All keys lost on an older Jetta or Passat', 'Flip key blade snapped at the hinge', 'Remote functions stopped working', 'Spare key'],
    allKeysLost: true,
    models: ["Jetta", "Passat", "Golf", "Tiguan", "Atlas", "Beetle"],
    yearNotes: "Older Jettas, Passats and Golfs are ordinary work. The MQB platform from roughly 2015 is a different proposition \u2014 significantly locked down, and where a lot of locksmiths quote first and fail later. We check the year before quoting.",
    caveat: 'MQB-platform VWs (broadly 2015 onward) are frequently dealer-only for all-keys-lost. We check your specific year and model on the phone rather than charging you for a wasted visit.',
  },
  {
    slug: 'bmw', make: 'BMW', system: 'CAS / FEM-BDC, Comfort Access',
    keyTypes: ['CAS-generation keys', 'Comfort Access proximity fobs', 'Spare key programming'],
    notes: 'BMW key work depends heavily on which control module the car uses. CAS-generation cars (broadly to 2013) are usually workable on site. FEM/BDC cars from around 2014 onward often require bench work on the module, which not every locksmith will attempt.',
    common: ['Spare Comfort Access key', 'Key detected intermittently', 'All keys lost on an older 3 Series or X5', 'Fob battery and pairing issues'],
    allKeysLost: false,
    models: ["3 Series", "5 Series", "X3", "X5", "X1", "7 Series", "4 Series"],
    yearNotes: "The dividing line is the control module, not the badge. CAS-generation cars up to about 2013 are usually workable at the roadside. FEM/BDC cars from around 2014 often need the module out on the bench \u2014 a different job, a different price, and one many locksmiths will not attempt.",
    caveat: 'Spares and older CAS cars are routine. All-keys-lost on FEM/BDC BMWs (roughly 2014+) may need the module removed or a dealer. Call with your VIN year and we will tell you which category you are in before anyone drives anywhere.',
  },
  {
    slug: 'mercedes-benz', make: 'Mercedes-Benz', system: 'FBS3 / FBS4 (DAS)',
    keyTypes: ['FBS3 keys', 'Spare key programming', 'Key fob diagnosis'],
    notes: 'Mercedes uses one of the most locked-down key systems on the road. FBS3 cars can often be worked; FBS4 (broadly 2015 onward) is effectively dealer-only, and any locksmith telling you otherwise on the phone is guessing.',
    common: ['Spare key for an older C-Class or E-Class', 'Key not detected', 'Worn key housing', 'Advice on dealer vs locksmith'],
    allKeysLost: false,
    models: ["C-Class", "E-Class", "GLC", "GLE", "S-Class", "A-Class", "Sprinter"],
    yearNotes: "FBS3 cars can often be worked. FBS4, broadly 2015 onward, is effectively dealer-only for key origination \u2014 and any locksmith promising otherwise over the phone has not asked enough questions. Sprinter vans follow the same rule, which matters for commercial owners.",
    caveat: 'FBS4 Mercedes (roughly 2015 onward) are dealer-only for key origination. We will say so on the phone rather than take your money for a call-out that cannot succeed.',
  },
  {
    slug: 'lexus', make: 'Lexus', system: 'Toyota H-chip / Smart Access',
    keyTypes: ['H-chip transponder keys', 'Smart Access proximity fobs'],
    notes: 'Lexus shares Toyota\'s key platform, so RX, ES and IS models follow the same rules — including the G to H chip transition. Smart Access fobs are programmable on site for most model years.',
    common: ['All keys lost on an RX or ES', 'Smart Access fob not detected', 'Spare key', 'Fob battery replacement and re-pairing'],
    allKeysLost: true,
    models: ["RX", "ES", "NX", "IS", "GX", "UX"],
    yearNotes: "Lexus runs Toyota engineering, so the G-to-H chip transition applies here too. RX and ES are the models we see most, and Smart Access fobs program on site for most model years.",
  },
  {
    slug: 'acura', make: 'Acura', system: 'Honda immobiliser platform',
    keyTypes: ['Transponder chip keys', 'Remote head keys', 'Smart proximity fobs'],
    notes: 'Acura runs Honda\'s key platform, so MDX, RDX and TLX keys follow the same process as their Honda equivalents — generally straightforward on site.',
    common: ['All keys lost on an MDX or TLX', 'Smart fob not recognised', 'Worn key blade', 'Spare key'],
    allKeysLost: true,
    models: ["MDX", "RDX", "TLX", "ILX", "Integra"],
    yearNotes: "Acura is Honda underneath, so an MDX follows the same process as a Pilot. Straightforward work in nearly all cases.",
  },
  {
    slug: 'infiniti', make: 'Infiniti', system: 'NATS / Intelligent Key',
    keyTypes: ['NATS transponder keys', 'Intelligent Key proximity fobs'],
    notes: 'Infiniti uses Nissan\'s NATS platform, so Q50, QX60 and G-series keys are handled the same way. Intelligent Key faults are frequently battery or pairing rather than hardware.',
    common: ['Intelligent Key stopped working', 'All keys lost on a Q50 or QX60', 'Spare proximity fob', 'Push-to-start not detecting the key'],
    allKeysLost: true,
    models: ["Q50", "QX60", "QX80", "Q60", "QX50"],
    yearNotes: "Infiniti uses Nissan NATS, so a Q50 is handled like a Maxima. Intelligent Key faults here are usually battery or pairing rather than a failed fob \u2014 worth checking before spending.",
  },
  {
    slug: 'gmc', make: 'GMC', system: 'GM immobiliser / PEPS proximity',
    keyTypes: ['Transponder keys', 'Remote head keys', 'PEPS proximity fobs'],
    notes: 'Sierra, Yukon and Acadia share GM\'s key platform with Chevrolet, so the same equipment and process applies. Common work for contractors running Sierras around the boroughs.',
    common: ['All keys lost on a Sierra or Yukon', 'Remote start not responding', 'Spare key for a work truck', 'Worn key blade'],
    allKeysLost: true,
    models: ["Sierra", "Yukon", "Acadia", "Terrain", "Canyon"],
    yearNotes: "Sierra and Yukon share GM engineering with Silverado and Tahoe, so the same equipment covers both badges. Much of this is contractor work where the truck needs to move today.",
  },
  {
    slug: 'volvo', make: 'Volvo', system: 'Volvo immobiliser / Keyless Drive',
    keyTypes: ['Transponder keys', 'Keyless Drive proximity fobs'],
    notes: 'Older Volvos are workable on site. Newer models are considerably more restricted, so we check the year before committing to a visit.',
    common: ['Spare key for an XC60 or XC90', 'Key not detected', 'All keys lost on an older model', 'Fob battery and pairing'],
    allKeysLost: false,
    models: ["XC60", "XC90", "XC40", "S60", "V60"],
    yearNotes: "Older Volvos are workable. Newer ones are considerably more restricted, and we would rather check your model year on the phone than take a call-out fee for a job that cannot be completed at the kerb.",
    caveat: 'Newer Volvos are often dealer-only for all-keys-lost. Call with the year and model and we will check before coming out.',
  },
  {
    slug: 'mitsubishi', make: 'Mitsubishi', system: 'Mitsubishi immobiliser / FAST key',
    keyTypes: ['Transponder chip keys', 'Remote head keys', 'FAST proximity fobs'],
    notes: 'Outlander, Eclipse Cross and Mirage keys are standard work, cut and programmed at the vehicle.',
    common: ['All keys lost on an Outlander', 'FAST key not detected', 'Spare key', 'Worn key blade'],
    allKeysLost: true,
    models: ["Outlander", "Outlander Sport", "Eclipse Cross", "Mirage", "Lancer"],
    yearNotes: "Outlander is most of it. FAST key systems program on site, and the blades are inexpensive compared with most makes.",
  },
];

export const vehicleBySlug = (slug: string) => vehicles.find((v) => v.slug === slug);
export const popularVehicles = vehicles.filter((v) => v.popular);
