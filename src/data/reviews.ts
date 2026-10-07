// Customer reviews.
//
// ⚠️  IMPORTANT — READ BEFORE EDITING
// This array is intentionally EMPTY. Only paste in REAL reviews that were
// actually left by real customers (copy them from your Google Business
// Profile or Yelp). Inventing testimonials is against Google's guidelines and
// AggregateRating markup on fake reviews is a common cause of a manual
// penalty — it can get the whole site's rich results pulled.
//
// The site handles both states automatically:
//   • empty  → the reviews section shows a "leave us a review" prompt and the
//              homepage reviews section stays hidden.
//   • filled → reviews render on /reviews/ and the homepage. Still NO rating
//              schema: Google treats a business marking up its own reviews as
//              self-serving and shows no stars for it.
//
// Do not show the review COUNT anywhere — the owner asked for it off the site
// (see googleReviewCount in business.ts).
//
// To add one, copy this shape:
//   { author: 'Maria D.', rating: 5, date: '2026-07-14',
//     area: 'Bay Ridge', service: 'Emergency Lockout',
//     text: 'Locked out at 9pm and they were here in 20 minutes…' },

export interface Review {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** ISO date, e.g. '2026-07-14' */
  date: string;
  /** Neighborhood the job was in */
  area?: string;
  /** Service performed */
  service?: string;
  text: string;
  /** Photo the reviewer attached on Google: a small thumb and the full size. */
  photo?: { thumb: string; full: string; alt: string };
}

// All 15 Google reviews, copied word for word from the Business Profile on
// 2026-10-06 (newest first). Google only gives relative dates ("3 weeks ago"),
// so these dates are approximate; only the month is displayed. Google's
// "Great price" highlight chips are not part of the review text and are left
// out. When the Business Profile API is connected, worker/gbp.js replaces
// these with the live reviews automatically.
export const reviews: Review[] = [
  { author: 'Isabella Esposito', rating: 5, date: '2026-10-06',
    text: 'I was driving with messed up key for a while and finally decided to call a locksmith and get proper key made . Nico showed up on time and I had new key in less than 30 minutes. Great local locksmith in bay ridge neighbourhood. Call them for any locksmith needs!!!',
    photo: { thumb: '/reviews/isabella-lexus-key-300.webp', full: '/reviews/isabella-lexus-key-900.webp',
      alt: 'New Lexus remote key held next to the old taped-up key, in front of the Lexus grille — photo from the Google review' } },
  { author: 'Michele Lane', rating: 5, date: '2026-10-06',
    text: "Very good people Vito is very professional tech we couldn't install lock at our house on statem Island but he had it covered" },
  { author: 'Anne Alarcon', rating: 5, date: '2026-10-06',
    text: 'Best workers ever on time and very professional.' },
  { author: 'Matt White', rating: 5, date: '2026-10-02',
    text: 'I had key made for my Benz this people know what they doing' },
  { author: 'hizam wahib', rating: 5, date: '2026-09-22',
    text: 'Had my lexus emergency key cut' },
  { author: 'John Hess', rating: 5, date: '2026-09-15',
    text: "I would give more stars if I could great neighborhood locksmith that's what we were missing" },
  { author: 'DeJoris Smythe', rating: 5, date: '2026-09-15',
    text: 'Fixed my broken key for fair price' },
  { author: 'Gabriela Matamoros', rating: 5, date: '2026-09-15',
    text: 'Was stuck at Wendy’s I lost key for my car I called numerous locksmith no one was able to help thanks god I found this company' },
  { author: 'Alverto salinas', rating: 5, date: '2026-09-15',
    text: 'Bueno gracias' },
  { author: 'Luciano Salinas', rating: 5, date: '2026-09-15',
    text: 'When lost key for my vehicle turned out to be good help' },
  { author: 'Mayra Ibarra', rating: 5, date: '2026-09-15',
    text: 'muchas Gracias great service in neighborhood' },
  { author: 'Sherri Logan', rating: 5, date: '2026-09-08',
    text: 'Amazing people had key made for my Toyota and I really satisfied with service' },
  { author: 'Phelps J', rating: 5, date: '2026-09-08',
    text: 'Appreciate honesty and thanks for service' },
  { author: 'Robert Mansfield', rating: 5, date: '2026-09-08',
    text: 'I lost key for truck this company arrived on time got me key made In professional manner . Would recommend and say best locksmith in brooklyn' },
  { author: 'Lorenzo', rating: 5, date: '2026-09-01',
    text: 'Very good automotive locksmith in Brooklyn, NY. They programmed my new car key quickly and for a fair price.' },
];

export const hasReviews = reviews.length > 0;

export const averageRating = hasReviews
  ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
  : null;
