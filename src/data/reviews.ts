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
//   • empty  → the reviews section shows a "leave us a review" prompt and NO
//              rating schema is emitted (correct, penalty-free).
//   • filled → reviews render, and AggregateRating schema is calculated from
//              the real numbers below.
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

/** Only emit rating schema when there is genuine data behind it. */
export function aggregateRatingSchema() {
  if (!hasReviews || averageRating === null) return null;
  return {
    '@type': 'AggregateRating',
    ratingValue: String(averageRating),
    reviewCount: String(reviews.length),
    bestRating: '5',
    worstRating: '1',
  };
}
