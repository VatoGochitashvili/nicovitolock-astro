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
    alt: 'A newly cut car key held at the ignition with a programming tablet connected',
    caption: 'A freshly cut key, programmed on site',
    services: ['car-key-replacement'],
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
    alt: 'Two newly cut Nissan keys held beside the steering wheel of the vehicle',
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
    alt: 'A replacement key fob held inside a luxury car with a red leather interior',
    caption: 'Proximity fob replaced without a dealer visit',
    services: ['key-fob-and-remote-programming', 'car-key-replacement'],
    orientation: 'portrait',
  },

  // ---------------------------- residential ---------------------------
  {
    slug: 'brass-rim-lock-wood-door',
    alt: 'A polished brass rim lock and thumbturn newly fitted to a wooden door',
    caption: 'Brass rim lock fitted to a wooden door',
    services: ['lock-replacement-and-repair', 'deadbolt-installation', 'lock-rekeying'],
    orientation: 'portrait',
  },
  {
    slug: 'jimmy-proof-lock-apartment-door',
    alt: 'A jimmy-proof vertical deadbolt installed on a red Brooklyn apartment door',
    caption: 'Jimmy-proof deadbolt — the Brooklyn apartment standard',
    services: ['emergency-lockout-service', 'lock-replacement-and-repair', 'deadbolt-installation', 'high-security-locks'],
    orientation: 'portrait',
    hero: true,
  },
  {
    slug: 'brass-deadbolt-and-knob',
    alt: 'A brass deadbolt and matching knob installed on a wooden front door',
    caption: 'Deadbolt and knob keyed alike',
    services: ['deadbolt-installation', 'lock-rekeying', 'lock-replacement-and-repair'],
    orientation: 'portrait',
  },
  {
    slug: 'mortise-lock-white-door',
    alt: 'A mortise lock and cylinder fitted into a white entry door',
    caption: 'Mortise lock serviced in place',
    services: ['lock-replacement-and-repair', 'high-security-locks'],
    orientation: 'portrait',
  },
  {
    slug: 'mortise-lock-wood-frame',
    alt: 'A brass mortise lock and strike plate installed in a wooden door frame',
    caption: 'Mortise case and strike, aligned properly',
    services: ['lock-replacement-and-repair', 'deadbolt-installation'],
    orientation: 'portrait',
  },
  {
    slug: 'door-hardware-installed',
    alt: 'Newly installed door hardware and locking points on a residential entry door',
    caption: 'Multi-point hardware on an entry door',
    services: ['lock-replacement-and-repair', 'high-security-locks', 'deadbolt-installation'],
    orientation: 'portrait',
  },
  {
    slug: 'window-security-install',
    alt: 'A window secured with locking hardware during a residential security job',
    caption: 'Window security hardware',
    services: ['lock-replacement-and-repair', 'security-camera-installation'],
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
    slug: 'church-door-service',
    alt: 'Lock work in progress on the entrance door of a church, with a tool case on the step',
    caption: 'Institutional door work in the field',
    services: ['commercial-locksmith', 'lock-replacement-and-repair'],
    orientation: 'portrait',
  },
];

export const photoBySlug = (slug: string) => workPhotos.find((p) => p.slug === slug);

/** Photos that legitimately illustrate a given service. */
export const photosForService = (serviceSlug: string) =>
  workPhotos.filter((p) => p.services.includes(serviceSlug));

/** Photos showing a given car make. */
export const photosForMake = (makeSlug: string) =>
  workPhotos.filter((p) => p.makes?.includes(makeSlug));

export const storefront = workPhotos.find((p) => p.slug === 'storefront-5th-avenue')!;
