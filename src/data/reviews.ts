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

// Google reviews, copied word for word from the Business Profile (newest
// first); last added 2026-10-25. Held back while Google Ads verification is
// pending, because they state response times: Andria Khatiashvili ("14 min"),
// Miriam Mahmoud ("20 minutes"), Jack K ("30 minutes"), John Amos ("15 min",
// has a photo) and Tony Leonardo Cimino, DMA ("20 minutes"). Google only gives relative dates ("3 weeks ago"),
// so these dates are approximate; only the month is displayed. Google's
// "Great price" highlight chips are not part of the review text and are left
// out. When the Business Profile API is connected, worker/gbp.js replaces
// these with the live reviews automatically.
export const reviews: Review[] = [
  { author: 'Marc Co', rating: 5, date: '2026-10-25',
    text: 'I was locked out of the house and Vito was able to unlock it without ruining my lock.Nice professional service.' },
  { author: 'Martin Lu', rating: 5, date: '2026-10-25',
    text: 'i have mazda 1993 my key was broken nico helped me make a whole new key very professional.' },
  { author: 'Doreen Danna', rating: 5, date: '2026-10-24',
    text: 'We had residential lock replaced and door guard installed . Technician was polite and precise throughout whole process',
    photo: { thumb: '/reviews/doreen-door-guard-300.webp', full: '/reviews/doreen-door-guard-900.webp',
      alt: 'Satin nickel door guard, deadbolt and knob on a white front door — photo from the Google review' } },
  { author: 'doloresguerrera4 Guerrera', rating: 5, date: '2026-10-24',
    text: 'Vito came right away knowledgeable he fixed my key he so kind and just professional. I highly recommend his company. - Dolores K , Staten Island NY',
    photo: { thumb: '/reviews/dolores-car-key-300.webp', full: '/reviews/dolores-car-key-900.webp',
      alt: 'Remote head car key with a panic button handed over on a Staten Island sidewalk — photo from the Google review' } },
  { author: 'Alberto Minoccheri', rating: 5, date: '2026-10-23',
    text: 'I locked myself out. Very fast to get to my place and super fast to open my door. Amazing!' },
  { author: 'Shelly Shapiro', rating: 5, date: '2026-10-22',
    text: 'Mr Vito was on time he has very reasonable pricing he made sure job was done very correct and that\'s the TRUTH . I would give 10 starts if i could . Please call them for any locksmith needs',
    photo: { thumb: '/reviews/shelly-jimmy-proof-deadbolt-300.webp', full: '/reviews/shelly-jimmy-proof-deadbolt-900.webp',
      alt: 'Brass jimmy-proof deadbolt installed on a white apartment door — photo from the Google review' } },
  { author: 'Andrew Silva', rating: 5, date: '2026-10-22',
    text: 'Lost key for Chevy Silverado 2023 service was print and technician showed up quick on Staten Island . Recommend this company' },
  { author: 'Carol J Castillo', rating: 5, date: '2026-10-20',
    text: 'LITERALLY LIFE SAVERS... Stuck in Staten Island they came and SAVED THE DAY were nice + professional. 200 STARS 🌟 🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟FOREVER GRATEFUL CALL DONE HESTISATE.' },
  { author: 'Max Glezer', rating: 5, date: '2026-10-20',
    text: 'Ha problem with gate simplex lock they named problem now will get estimates' },
  { author: 'Nerita Rivera', rating: 5, date: '2026-10-20',
    text: 'Thanks for showing up that quick when my neighbor got locked out from her house . Technician was servicie oriented and promt' },
  { author: 'Boogie Marcel', rating: 5, date: '2026-10-19',
    text: 'I lost key for vehicle had it parked for 5 days Vito was able to help me he unlocked car and made me key . Service was affordable and technician knew his staff !' },
  { author: 'Robyn Robinson', rating: 5, date: '2026-10-19',
    text: 'Vito’s service was excellent. He was professional, took the time to explain everything that was being done, and never rushed through the process. He was patient, knowledgeable, and made sure all of my questions were answered. I highly recommend his services.' },
  { author: 'Gurpreet Singh', rating: 5, date: '2026-10-18',
    text: 'Vito was very helpful. Thanks for coming late night' },
  { author: 'Rao Azan', rating: 5, date: '2026-10-18',
    text: 'Very helpful' },
  { author: 'Mustafa Boukar', rating: 5, date: '2026-10-18',
    text: 'He really helps me the best of the best',
    photo: { thumb: '/reviews/mustafa-remote-key-300.webp', full: '/reviews/mustafa-remote-key-900.webp',
      alt: 'New remote head car key held in front of the parts organizers in the service van — photo from the Google review' } },
  { author: '_ assisi', rating: 5, date: '2026-10-18',
    text: 'Vito helped very fast getting here and quickly done.' },
  { author: 'Kathie', rating: 5, date: '2026-10-18',
    text: 'Friendly , professional and helped quickly. Highly recommend!' },
  { author: 'Denise Pino', rating: 5, date: '2026-10-18',
    text: 'So amazing, efficient and affordable!  Came super fast to our location and customer service was dang Highly recommend' },
  { author: 'Imran Khan', rating: 5, date: '2026-10-18',
    text: 'Good service outstanding!' },
  { author: 'Leda Maria Matzenbacher', rating: 5, date: '2026-10-18',
    text: 'Veryy verry good and best they open my door without any damage!' },
  { author: 'Jerry Vaiana', rating: 5, date: '2026-10-18',
    text: 'Needed electric strike supplied and installed  in Brooklyn bay ridge earliest convenience this company made it happen .',
    photo: { thumb: '/reviews/jerry-electric-strike-300.webp', full: '/reviews/jerry-electric-strike-900.webp',
      alt: 'Electric strike installed in a dark metal door frame next to a brick wall in Bay Ridge — photo from the Google review' } },
  { author: 'Feda Abuzahrieh', rating: 5, date: '2026-10-11',
    text: 'Our basement was locked we live on bay ridge and we didn’t have key this service was helpful and fast' },
  { author: "Kieron O'Sullivan", rating: 5, date: '2026-10-16',
    text: 'Lost key for Dodge Dakota 1996 not many locksmith can make key for but Vito had it covered thanks to this company they straightforward with pricing',
    photo: { thumb: '/reviews/kieron-dodge-dakota-300.webp', full: '/reviews/kieron-dodge-dakota-900.webp',
      alt: 'Dashboard and ignition of a 1996 Dodge Dakota during the key job — photo from the Google review' } },
  { author: 'daniel gavrity', rating: 5, date: '2026-10-16',
    text: 'Everything was straight forward great prices',
    photo: { thumb: '/reviews/daniel-keys-300.webp', full: '/reviews/daniel-keys-900.webp',
      alt: 'New remote car key and a house key held in a hand — photo from the Google review' } },
  { author: 'Queen', rating: 5, date: '2026-10-16',
    text: 'I lost key for Volkswagen EOS 2010 even the key was hard to make vito was precise and awesome.' },
  { author: 'Guerino Boucicault', rating: 5, date: '2026-10-11',
    text: 'Had key done for my bmw on bay ridge' },
  { author: 'antoine francois', rating: 5, date: '2026-10-11',
    text: 'Was locked out of my apartment eve tho it\'s was rush hour tech was able to get here quick enough and picked my lock fast -. 👍 good  people use them',
    photo: { thumb: '/reviews/antoine-apartment-lockout-300.webp', full: '/reviews/antoine-apartment-lockout-900.webp',
      alt: 'Apartment door standing open after the lock was picked — photo from the Google review' } },
  { author: 'Arissa A', rating: 5, date: '2026-10-11',
    text: 'Quick and affordable lockout service in Brooklyn park slope neighborhood recommended' },
  { author: 'Abhi Gangasani', rating: 5, date: '2026-10-11',
    text: 'Great experience quick and easy! Took less than a few minutes to get my car back open!' },
  { author: 'Sharon Doyle', rating: 5, date: '2026-10-11',
    text: 'Quick service' },
  { author: 'Arthur G', rating: 5, date: '2026-10-11',
    text: 'Quick arrival wonderful service' },
  { author: 'Giga S', rating: 5, date: '2026-10-11',
    text: 'I left my keys in my car in brooklyn at night and called this company dispatch was quick and service was affordable . Recommend this company' },
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
