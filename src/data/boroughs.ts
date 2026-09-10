// Borough-level landing pages.
//
// "Brooklyn locksmith" and "Staten Island locksmith" are the highest-volume
// terms this business can realistically compete for, and until now nothing on
// the site targeted them: there were 105 neighborhood pages and one page
// covering both boroughs at once, with no level in between.
//
// These are also the strongest internal hubs on the site. A borough page
// links every neighborhood in that borough and every service, which puts the
// deep pages two clicks from the homepage through a page that is itself about
// the term they want to rank for.

export interface BoroughPage {
  slug: string;
  name: 'Brooklyn' | 'Staten Island';
  /** Title tag. Under 60 characters. */
  title: string;
  h1: string;
  metaDescription: string;
  lead: string;
  /** Substantial, borough-specific body copy. */
  sections: { heading: string; body: string[] }[];
  faqs: { q: string; a: string }[];
}

export const boroughs: BoroughPage[] = [
  {
    slug: 'brooklyn',
    name: 'Brooklyn',
    title: 'Brooklyn Locksmith | Nico & Vito, Bay Ridge',
    h1: 'Brooklyn Locksmith',
    metaDescription:
      'Licensed Brooklyn locksmith based in Bay Ridge. Lockouts, rekeys, car keys, intercoms and cameras across all 50 neighborhoods. Open daily 7AM–11PM. Call (718) 618-6002.',
    lead:
      'We are a Brooklyn locksmith in the literal sense: we live here, the van is parked here, and the number you call reaches the person who turns up. Bay Ridge is home base, and the whole borough is on the daily route — every day, 7 AM to 11 PM.',
    sections: [
      {
        heading: 'What a Brooklyn locksmith actually deals with',
        body: [
          'Brooklyn is not one housing stock, it is a dozen, and the lock work changes street by street. Prewar walk-ups through Park Slope and Crown Heights run mortise cases that are ninety years old and better made than anything that would replace them. The attached row houses of Bay Ridge and Sunset Park stack a stoop door, a parlour door and a garden door on one property, which is why so much of our work here is keying a set alike rather than changing a single lock.',
          'South Brooklyn brings its own problem: the blocks along the Belt and out towards Coney Island take salt air, and it eats exterior hardware. A cylinder that would last fifteen years inland gives up in three or four, and the failure is nearly always the same — the key gets stiff over a season, then very stiff, then it snaps. Almost every broken-key call we take on those streets had months of warning.',
          'Then there are the commercial strips — 5th Avenue, 86th Street, 18th Avenue, Flatbush — where a storefront door cycles more in a month than a house door does in a decade. Those need commercial-grade hardware as a baseline, and they need the work scheduled before opening rather than at midday.',
        ],
      },
      {
        heading: 'How fast we get there',
        body: [
          'Bay Ridge sits in the south-west corner of the borough, so our honest arrival times are shortest in Dyker Heights, Fort Hamilton, Bensonhurst and Sunset Park — usually under fifteen minutes — and longest up towards Greenpoint and East New York, where twenty-five to thirty-five is realistic depending on the BQE.',
          'Every neighborhood page on this site carries its own estimate rather than a single borough-wide promise, because a number that is true for Bay Ridge is a lie for Bushwick. When you call, we tell you where the technician actually is.',
        ],
      },
      {
        heading: 'Why local matters in this category specifically',
        body: [
          'Locksmithing in New York has a lead-generation problem. A large share of the numbers that appear for "locksmith near me" are call centres that sell your job to whoever bids, quote a low call-out fee on the phone, and then arrive with a different price and a drill. Google polices the category heavily because of it.',
          'The test is simple and you can apply it before anyone reaches your door: ask for a firm price on the call, ask whether the person coming is an employee, and ask them to show credentials on arrival. We quote the job rather than the visit, and the number we give on the phone is the number on the invoice.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you cover all of Brooklyn?',
        a: 'Every neighborhood, all 50 listed on this page. Coverage is genuinely borough-wide rather than a short list near our base with the rest added for show — although the arrival times differ, and each neighborhood page states its own honestly.',
      },
      {
        q: 'How much does a Brooklyn locksmith charge?',
        a: 'It depends entirely on the job, which is why we quote on the phone before anyone travels rather than advertising a call-out fee. Describe the door, the lock or the vehicle on (718) 618-6002 and you will get a real number, and that number is what appears on the invoice.',
      },
      {
        q: 'Are you available at night in Brooklyn?',
        a: 'We take calls until 11 PM, every day including weekends and holidays. We are not a 24-hour operation, and we would rather tell you that plainly than take a job at 3 AM and leave you waiting for a truck that is not coming.',
      },
      {
        q: 'Do you charge extra to come to my part of Brooklyn?',
        a: 'No. There is no trip surcharge anywhere in the borough. You pay for the work itself, quoted before we start, whether you are ten minutes from us in Dyker Heights or up in Greenpoint.',
      },
    ],
  },

  {
    slug: 'staten-island',
    name: 'Staten Island',
    title: 'Staten Island Locksmith | Nico & Vito Locksmith',
    h1: 'Staten Island Locksmith',
    metaDescription:
      'Licensed Staten Island locksmith covering all 55 neighborhoods, from St. George to Tottenville. Lockouts, rekeys, car keys and access control. Daily 7AM–11PM. (718) 618-6002.',
    lead:
      'We cross the Verrazzano daily. Our base in Bay Ridge sits at the foot of the bridge, which makes the North Shore closer to us than much of Brooklyn is — and we run the whole island, down to Tottenville, every day from 7 AM to 11 PM.',
    sections: [
      {
        heading: 'Staten Island is a different job from the rest of the city',
        body: [
          'Most of the island is detached and semi-detached housing on its own lot, and that changes the work fundamentally. A Brooklyn apartment has one door. A house in Eltingville or Great Kills has a front, a side, a rear, a garage passage door and often a basement entrance — and security is decided by the weakest of them, which is almost never the front.',
          'It also means most households here have accumulated four or five different keys over the years, one per repair. Consolidating those onto a single key is the request we hear most on the island, and it is the one people are happiest about afterwards.',
          'Gated and fenced properties are far more common here than across the water, and the gate is the part that gets the most weather and the least maintenance. Padlocks seize, gate cylinders fill with grit, and electric strikes fail closed. We treat the perimeter as the first door of the job.',
        ],
      },
      {
        heading: 'North Shore, Mid-Island, South Shore',
        body: [
          'The North Shore — St. George, Tompkinsville, Stapleton, New Brighton, Port Richmond — is the densest part of the island and the closest to us, typically fifteen to twenty minutes over the bridge. It carries more multi-family housing and more commercial frontage than the rest, so the work skews towards rekeys between tenants, storefront cylinders and intercom faults.',
          'Mid-Island, through Todt Hill, New Springville, Bulls Head and Westerleigh, is largely single-family with the occasional gated property, and the calls are mostly rekeys, deadbolts and smart locks.',
          'The South Shore — Great Kills, Eltingville, Annadale, Huguenot, Tottenville — is the furthest run, realistically thirty to forty minutes depending on the expressway, and we say so rather than quoting an island-wide number. Waterfront blocks down there take real weather, and corroded exterior hardware is a large share of what we replace.',
        ],
      },
      {
        heading: 'Car keys on the island',
        body: [
          'Staten Island is the most car-dependent borough, and it is where a lost key stops a day rather than inconveniencing it. We cut and program car keys at the vehicle, wherever it is parked — driveways here make this the easiest version of that job, because we can work without traffic and the programming runs off the vehicle port rather than any network.',
          'That includes all-keys-lost on most makes, which is the situation people assume requires a dealer and a tow. It usually does not, and the tow is often the largest line on a dealer invoice.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you really cover the whole of Staten Island?',
        a: 'All 55 neighborhoods, North Shore to South Shore. Our base at the foot of the Verrazzano makes the island genuinely part of the daily route rather than an occasional trip, though the South Shore is a longer run and the neighborhood pages say so.',
      },
      {
        q: 'How long does it take you to get to Staten Island?',
        a: 'The North Shore is typically fifteen to twenty minutes from Bay Ridge, Mid-Island twenty-five to thirty, and the South Shore thirty to forty depending on the expressway. Bridge traffic is the variable, and we will tell you what it is doing when you call rather than quoting a best case.',
      },
      {
        q: 'Is there a bridge toll added to the bill?',
        a: 'No. There is no trip surcharge and no toll line on the invoice. You pay for the work, quoted before we leave.',
      },
      {
        q: 'Can you rekey every door on my Staten Island house to one key?',
        a: 'Yes, and it is the most common job we do here. Front, side, rear, garage and shed onto a single key. Where the cylinders are mismatched brands we swap in matched ones so the set genuinely works alike rather than nearly.',
      },
    ],
  },
];

export const boroughBySlug = (slug: string) => boroughs.find((b) => b.slug === slug);
