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
}

export const reviews: Review[] = [];

export const hasReviews = reviews.length > 0;

export const averageRating = hasReviews
  ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
  : null;
