// Posts from instagram.com/nicovitolocksmith shown in the "From our Instagram"
// strip (InstagramFeed.astro). Newest first.
//
// Reels and slides are served from /public/instagram/, not Instagram's embed
// script: it keeps the page fast and the images indexable as ours. Only a
// reel we don't have the exact file for opens Instagram's own player
// (`embed`), and only after a click.
//
// To add a post: export the slides at 720px wide as .webp into
// public/instagram/, add an entry here with the post's URL. Leave out posts
// that show a storefront: the business is mobile with no walk-in shop.

export interface IgSlide { src: string; alt: string }

interface IgBase {
  url: string;
  /** ISO date it went up on Instagram */
  date: string;
  /** One or two lines, shown under the card and in the viewer */
  caption: string;
}

export type IgPost =
  | (IgBase & {
      kind: 'reel';
      poster: string;
      alt: string;
      /** Self-hosted reel with sound */
      video?: string;
      /** Short muted loop played on the card while it is on screen */
      preview?: string;
      /** No local file: open Instagram's player in the viewer instead */
      embed?: boolean;
      duration?: string;
    })
  | (IgBase & { kind: 'carousel'; slides: IgSlide[] });

export const instagramPosts: IgPost[] = [
  {
    kind: 'reel',
    url: 'https://www.instagram.com/reel/DfAmbYgPcg2/',
    date: '2026-10-27',
    caption: 'Two brothers from Bay Ridge: how Nico & Vito became the block’s locksmiths.',
    poster: '/instagram/story-reel-poster.webp',
    video: '/instagram/story-reel.mp4',
    preview: '/instagram/story-reel-preview.mp4',
    duration: '0:55',
    alt: 'Animated story of the two Nico & Vito brothers from Bay Ridge, Brooklyn, with the Verrazzano Bridge at dusk',
  },
  {
    kind: 'carousel',
    url: 'https://www.instagram.com/p/DeX-I6Ylef7/',
    date: '2026-10-11',
    caption: 'Cut. Programmed. Done. What a car key job looks like, right where the car is parked.',
    slides: [
      { src: '/instagram/cut-and-programmed-1.webp', alt: 'Key programmer plugged into a car dashboard: new car key cut, then programmed at your car' },
      { src: '/instagram/cut-and-programmed-2.webp', alt: 'Xhorse key cutting machine and key blanks inside the Nico & Vito van' },
      { src: '/instagram/cut-and-programmed-3.webp', alt: 'Jeep smart key programmed on site, held in front of the steering wheel' },
      { src: '/instagram/cut-and-programmed-4.webp', alt: 'Chevrolet dashboard with a laptop running dealer software to program a key' },
      { src: '/instagram/cut-and-programmed-5.webp', alt: 'Cadillac transponder key cut and programmed with a tablet on the dashboard' },
      { src: '/instagram/cut-and-programmed-6.webp', alt: 'Two keys for a heavy-duty Ford truck, cut and programmed on site' },
      { src: '/instagram/cut-and-programmed-7.webp', alt: 'Nissan emergency key and chipped key, ready to go' },
    ],
  },
  {
    kind: 'carousel',
    url: 'https://www.instagram.com/p/DeSJ2KQlRf_/',
    date: '2026-10-09',
    caption: 'Locked out? Three things to do before you call anyone.',
    slides: [
      { src: '/instagram/lockout-tips-1.webp', alt: 'Front door with a brass lock: locked out? Do this first' },
      { src: '/instagram/lockout-tips-2.webp', alt: 'Lockout tip 1: check every door you can reach, never climb or break glass' },
      { src: '/instagram/lockout-tips-3.webp', alt: 'Lockout tip 2: don’t force the key or the door' },
      { src: '/instagram/lockout-tips-4.webp', alt: 'Lockout tip 3: ask for the price and the business name on the phone first' },
      { src: '/instagram/lockout-tips-5.webp', alt: 'Nico & Vito Locksmith, Brooklyn and Staten Island, open every day 7 AM to 11 PM' },
    ],
  },
  {
    kind: 'reel',
    url: 'https://www.instagram.com/reel/DeMqdd0hq0P/',
    date: '2026-10-07',
    caption: 'Need a locksmith in Brooklyn or Staten Island? Real jobs from the van.',
    poster: '/instagram/need-a-locksmith-reel-cover.webp',
    embed: true,
    alt: 'Need a locksmith? Reel of real Nico & Vito jobs in Brooklyn and Staten Island',
  },
];

export const instagramEmbedUrl = (url: string) => url.replace(/\/?$/, '/') + 'embed/';
