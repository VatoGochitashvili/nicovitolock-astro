// Real photographs of Nico & Vito's own work, shot on the job.
//
// These are the most valuable images on the site: nobody else has them, they
// are genuine proof the business exists and does the work, and they give every
// service page unique visual content instead of stock.
//
// `services` and `makes` map each photo to the pages it legitimately belongs
// on. A photo only appears where it actually shows that work — a BMW key does
// not illustrate intercom repair.

export interface WorkPhoto {
  /** File stem in /public/work — `.webp` and `-800.webp` both exist */
  slug: string;
  /** Alt text: describe what is genuinely visible, not keywords */
  alt: string;
  /** Short caption shown under the photo in galleries */
  caption: string;
  /** Service slugs this photo illustrates */
  services: string[];
  /** Car make slugs, where the vehicle is identifiable */
  makes?: string[];
  /** Portrait photos need different framing than landscape */
  orientation: 'portrait' | 'landscape';
  /** Suitable as a wide page background */
  hero?: boolean;
  /** Illustration rather than a photograph — must never be presented as
   *  evidence of a real place, a real job, or a real premises. */
  aiGenerated?: boolean;
  /** Licensed stock, not our own job. Fine for illustrating a service we
   *  offer; never caption it as "our work" and keep it out of the
   *  "Recent work" galleries. */
  stock?: boolean;
}

export const workPhotos: WorkPhoto[] = [
  {
    // AI-GENERATED, and NOT USED ANYWHERE ON THE SITE.
    //
    // Nico & Vito is a FULLY MOBILE locksmith: no shop, no walk-in premises,
    // no published street address. This image shows a storefront carrying the
    // company's name, so any use of it — even blurred as a background — implies
    // a place customers could visit. It is retained here only so the file is
    // accounted for. Do not put it on a page.
    slug: 'storefront-5th-avenue',
    alt: 'Nico & Vito Locksmith branding',
    caption: 'Nico & Vito Locksmith',
    services: [],
    orientation: 'landscape',
    aiGenerated: true,
  },
  {
    slug: 'van-interior-equipment',
    alt: 'Inside the Nico & Vito service van: key machines, programming equipment and tool cases',
    caption: 'The van carries the parts, so most jobs finish first visit',
    // Kept out of galleries at the owner's request — it is used only as the
    // heavily blurred background texture at /brand/bg-vanblur.webp.
    services: [],
    orientation: 'portrait',
  },
  {
    slug: 'van-laptop-programming',
    alt: 'A key programming tablet set up on the dashboard of a customer vehicle during a car key job',
    caption: 'Programming gear set up in the customer’s vehicle',
    services: ['car-key-replacement', 'key-fob-and-remote-programming'],
    orientation: 'portrait',
  },

  // ---------------------------- automotive ----------------------------
  {
    slug: 'car-key-programming-dashboard',
    alt: 'A Nico & Vito locksmith working under the hood of a vehicle with a key programming tool connected',
    caption: 'Working the immobiliser under the hood',
    services: ['car-key-replacement', 'key-fob-and-remote-programming'],
    orientation: 'portrait',
    hero: true,
  },
  {
    slug: 'car-key-programming-column',
    alt: 'A key programming tablet connected to a car steering column during a car key replacement',
    caption: 'Pairing a new transponder key to the immobiliser',
    services: ['car-key-replacement', 'key-fob-and-remote-programming'],
    orientation: 'portrait',
  },
  {
    slug: 'ignition-key-programming',
    alt: 'A freshly cut Cadillac transponder key held at the wheel while an Autel programmer runs the add-key routine',
    caption: 'Cadillac key cut and coded to the immobiliser at the kerb',
    services: ['car-key-replacement', 'key-fob-and-remote-programming'],
    makes: ['cadillac'],
    orientation: 'portrait',
  },
  {
    slug: 'ford-key-fobs',
    alt: 'Two Ford key fobs held in front of a Ford Transit grille after being cut and programmed',
    caption: 'Ford keys cut and programmed at the vehicle',
    services: ['car-key-replacement', 'key-fob-and-remote-programming'],
    makes: ['ford'],
    orientation: 'portrait',
  },
  {
    slug: 'nissan-key-cut',
    alt: 'Two newly cut Nissan transponder keys held at the open driver window of a Nissan Altima',
    caption: 'Nissan keys originated at the car',
    services: ['car-key-replacement'],
    makes: ['nissan', 'infiniti'],
    orientation: 'portrait',
  },
  {
    slug: 'bmw-key-grille',
    alt: 'A BMW key held in front of the grille of a white BMW after replacement',
    caption: 'BMW key replaced on site',
    services: ['car-key-replacement', 'key-fob-and-remote-programming'],
    makes: ['bmw'],
    orientation: 'portrait',
  },
  {
    slug: 'bmw-key-steering-wheel',
    alt: 'A replacement BMW key held at the steering wheel of the vehicle',
    caption: 'A spare BMW key, programmed at the kerb',
    services: ['car-key-replacement'],
    makes: ['bmw'],
    orientation: 'portrait',
  },
  {
    slug: 'chrysler-key-fobs',
    alt: 'Two Chrysler key fobs held beside the door of a red vehicle after programming',
    caption: 'Chrysler fobs programmed at the vehicle',
    services: ['key-fob-and-remote-programming', 'car-key-replacement'],
    makes: ['chrysler', 'dodge', 'jeep', 'ram'],
    orientation: 'portrait',
  },
  {
    slug: 'luxury-car-key-fob',
    alt: 'A replacement flip key and fob, freshly cut, held inside a luxury car with a red leather interior',
    caption: 'Luxury flip key cut and programmed — no dealer, no tow',
    services: ['key-fob-and-remote-programming', 'car-key-replacement'],
    orientation: 'portrait',
  },

  // ---------------------------- residential ---------------------------
  {
    slug: 'brass-rim-lock-wood-door',
    alt: 'A polished brass mortise lock set with escutcheon plate newly fitted to a painted wooden apartment door',
    caption: 'Brass mortise set fitted to a prewar apartment door',
    services: ['lock-replacement-and-repair', 'deadbolt-installation', 'lock-rekeying'],
    orientation: 'portrait',
  },
  {
    slug: 'brass-deadbolt-and-knob',
    alt: 'A brass Schlage deadbolt and matching handleset installed on a red wooden front door',
    caption: 'Deadbolt and handleset keyed alike on one front door',
    services: ['deadbolt-installation', 'lock-rekeying', 'lock-replacement-and-repair'],
    orientation: 'portrait',
  },
  {
    slug: 'picking-lock-open-entry-door',
    alt: 'A locksmith’s pick and tension wrench in the keyway of an antique mortise lock, opening a locked entry door without drilling',
    caption: 'Picked open — no drilling, no damage to the door',
    services: ['emergency-lockout-service', 'lock-rekeying'],
    orientation: 'portrait',
    hero: true,
  },
  {
    slug: 'mortise-lock-wood-frame',
    alt: 'A heavy brass mortise lock set with escutcheon plate fitted to a stained hardwood entry door, deadbolt thrown',
    caption: 'Mortise case, cylinder and strike aligned on a hardwood entry door',
    services: ['lock-replacement-and-repair', 'high-security-locks', 'deadbolt-installation'],
    orientation: 'portrait',
  },
  {
    slug: 'smart-deadbolt-keypad-front-door',
    alt: 'A satin nickel keypad smart deadbolt and matching handleset installed on a residential front door',
    caption: 'Keypad smart deadbolt fitted and paired on a front door',
    services: ['smart-lock-installation', 'deadbolt-installation', 'lock-replacement-and-repair'],
    orientation: 'portrait',
  },

  // ---------------------------- commercial ----------------------------
  {
    slug: 'keypad-access-control',
    alt: 'A keypad access control unit and cylinder installed on a commercial glass storefront door',
    caption: 'Keypad access control on a storefront door',
    services: ['access-control-systems', 'commercial-locksmith', 'smart-lock-installation'],
    orientation: 'portrait',
    hero: true,
  },
  {
    slug: 'storefront-door-closer',
    alt: 'A door closer fitted to a commercial glass entrance door',
    caption: 'Door closer adjusted on a commercial entrance',
    services: ['commercial-locksmith', 'access-control-systems'],
    orientation: 'portrait',
  },
  {
    slug: 'panic-bar-exit-device-install',
    alt: 'A panic bar exit device being levelled and fitted to a red commercial fire door',
    caption: 'Panic bar set level on a commercial fire door',
    services: ['commercial-locksmith', 'lock-replacement-and-repair'],
    orientation: 'portrait',
    hero: true,
  },
  {
    slug: 'commercial-exit-door-panic-bar',
    alt: 'A commercial exit door fitted with a push bar, overhead closer and an electric strike on the frame',
    caption: 'Push bar, closer and electric strike on one exit door',
    services: ['commercial-locksmith', 'access-control-systems'],
    orientation: 'portrait',
  },
  {
    slug: 'church-door-service',
    alt: 'A high-security mortise cylinder fitted to the entrance door of a church, tool case open on the step',
    caption: 'High-security cylinder on an institutional entrance',
    services: ['commercial-locksmith', 'high-security-locks', 'lock-replacement-and-repair'],
    orientation: 'portrait',
  },
];

// ------------------------- licensed stock -------------------------
// Used only where we have no first-party photo yet. Unsplash License,
// commercial use permitted. Replace each one the moment a real job photo
// exists — our own beats stock every time, for trust and for image search.
workPhotos.push(
  {
    slug: 'stock-security-cameras',
    alt: 'Two bullet security cameras mounted on an exterior wall',
    caption: 'CCTV coverage on a building exterior',
    services: ['security-camera-installation'],
    orientation: 'landscape',
    stock: true,
  },
  {
    slug: 'stock-intercom-panel',
    alt: 'A multi-button apartment intercom panel mounted beside a brick entrance',
    caption: 'Multi-unit intercom panel',
    services: ['intercom-systems'],
    orientation: 'landscape',
    stock: true,
  },
);

export const photoBySlug = (slug: string) => workPhotos.find((p) => p.slug === slug);

/** Photos that legitimately illustrate a given service. */
export const photosForService = (serviceSlug: string) =>
  workPhotos.filter((p) => p.services.includes(serviceSlug));

/** Only our OWN photographs — for the "Recent work" galleries, where stock
 *  would be dishonest. */
export const ownPhotosForService = (serviceSlug: string) =>
  workPhotos.filter((p) => p.services.includes(serviceSlug) && !p.stock && !p.aiGenerated);

/** Photos showing a given car make. */
export const photosForMake = (makeSlug: string) =>
  workPhotos.filter((p) => p.makes?.includes(makeSlug));

export const storefront = workPhotos.find((p) => p.slug === 'storefront-5th-avenue')!;


/**
 * One representative photo per service, for the homepage service cards.
 * Chosen so the image genuinely depicts that work — a card showing the wrong
 * job is worse than no image.
 */
export const serviceCardPhoto: Record<string, string> = {
  'emergency-lockout-service': 'picking-lock-open-entry-door',
  'lock-rekeying': 'brass-rim-lock-wood-door',
  'lock-replacement-and-repair': 'mortise-lock-wood-frame',
  'deadbolt-installation': 'brass-deadbolt-and-knob',
  'high-security-locks': 'church-door-service',
  'car-key-replacement': 'ford-key-fobs',
  'key-fob-and-remote-programming': 'chrysler-key-fobs',
  'smart-lock-installation': 'smart-deadbolt-keypad-front-door',
  'intercom-systems': 'stock-intercom-panel',
  'access-control-systems': 'keypad-access-control',
  'security-camera-installation': 'stock-security-cameras',
  'commercial-locksmith': 'panic-bar-exit-device-install',
};
