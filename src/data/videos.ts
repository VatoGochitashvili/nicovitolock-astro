// Our YouTube videos (channel: business.social.youtube). Each one is embedded
// from YouTube — not self-hosted — so every play on the site counts toward the
// YouTube video, and /videos/ is its "watch page" for Google video results.
// To add a video: upload it, then add an entry here (newest first).

export interface Video {
  /** YouTube video id (the part after youtu.be/) */
  id: string;
  title: string;
  description: string;
  /** ISO date it went up on YouTube */
  uploadDate: string;
  /** ISO 8601 duration, e.g. PT35S, PT1M20S */
  duration: string;
}

export const videos: Video[] = [
  {
    id: 'p5J_7yi3-DU',
    title: 'Brooklyn & Staten Island Mobile Locksmith: Lockouts, Car Keys, Lock Changes',
    description:
      'Nico & Vito Locksmith is a family-owned mobile locksmith run by two brothers out of Bay Ridge, serving Brooklyn and Staten Island every day from 7am to 11pm. Lockouts, car keys cut in the van and programmed at the car, lock changes and rekeys, deadbolts, smart locks and commercial doors — all real jobs.',
    uploadDate: '2026-10-13',
    duration: 'PT35S',
  },
];

export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
export const youtubeWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const youtubeEmbed = (id: string) => `https://www.youtube.com/embed/${id}`;

export function videoSchema(v: Video, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.title,
    description: v.description,
    thumbnailUrl: [youtubeThumb(v.id)],
    uploadDate: v.uploadDate,
    duration: v.duration,
    embedUrl: youtubeEmbed(v.id),
    url: pageUrl,
    publisher: { '@id': 'https://nicovitolocksmith.com/#business' },
  };
}
