// Hand-written neighborhood guides for the priority markets: South Brooklyn
// and Downtown / brownstone Brooklyn.
//
// Everything else on an area page is assembled from shared pools; this is the
// part that is genuinely about one place. Rules for editing:
//   - Only well-known, checkable facts about the neighborhood.
//   - Never claim a specific past job, customer or count.
//   - No sentence may be reused between guides — the point is that each page
//     reads like it was written for that neighborhood, because it was.

export interface GuideFaq { q: string; a: string }
export interface NeighborhoodGuide {
  /** Section heading on the area page */
  heading: string;
  paragraphs: string[];
  /** How we get there from Bay Ridge */
  route: string;
  faqs: GuideFaq[];
}

export type District = 'south' | 'downtown';

export const districts: Record<District, { name: string; blurb: string }> = {
  south: {
    name: 'South Brooklyn',
    blurb: 'Our own backyard: from Bay Ridge and Sunset Park out to Coney Island, Sheepshead Bay and Canarsie.',
  },
  downtown: {
    name: 'Downtown & brownstone Brooklyn',
    blurb: 'Downtown Brooklyn, the Heights, DUMBO and the brownstone blocks around them — straight up the Gowanus from our base.',
  },
};

export const guides: Record<string, NeighborhoodGuide & { district: District }> = {
  // ============================ SOUTH BROOKLYN ============================
  'bay-ridge': {
    district: 'south',
    heading: 'Bay Ridge locks, from Shore Road to 3rd Avenue',
    paragraphs: [
      'The limestone and brick row houses between 4th Avenue and Colonial Road mostly still have their original double front doors, often with a mortise lock behind an outer storm door. When one of those mortise locks wears out we replace the cylinder or the whole body to fit the existing pocket, so nothing gets cut into a hundred-year-old door.',
      'The big prewar co-ops along Shore Road and Ridge Boulevard run on restricted keyways — Medeco and Mul-T-Lock are common — and most boards want a lock change logged. On the 3rd and 5th Avenue strips the work is storefronts: roll-down gate padlocks, glass-door cylinders and closers that stop latching in winter.',
    ],
    route: 'This is where we start the day. Most Bay Ridge calls are a straight run along 3rd, 4th or 5th Avenue rather than a trip across the borough.',
    faqs: [
      { q: 'Can you match a key my Bay Ridge co-op board has to approve?', a: 'Yes. Restricted keys like Medeco and Mul-T-Lock need the right blank and, for some systems, the owner card. Tell us the brand when you call and we will say up front whether we can cut it on site or need the board’s authorisation.' },
      { q: 'My old front door has a mortise lock — do I need a new door to upgrade?', a: 'Usually not. We fit a new mortise body or a high-security cylinder into the existing cut-out, which keeps the original door and the way it looks.' },
    ],
  },
  'dyker-heights': {
    district: 'south',
    heading: 'Dyker Heights: big houses, a lot of doors',
    paragraphs: [
      'Detached and semi-detached houses here typically have a front door, a side door, a back door to the yard and a garage — four keys for one household. Keying all of them alike is the most common job we do in the neighborhood, and it is usually a rekey rather than new hardware.',
      'Wrought-iron front gates are everywhere between 10th and 13th Avenues. Their latches and gate locks take a beating from weather, and a gate that will not lock is often a five-minute adjustment rather than a replacement.',
    ],
    route: 'Dyker Heights is next door to our base — over on 86th Street or Bay Ridge Parkway and we are there.',
    faqs: [
      { q: 'Can you make one key work for my front, side, back and garage doors?', a: 'In most cases, yes, provided the locks share a keyway. We rekey them all to one key; where one lock is a different brand we swap its cylinder so it matches.' },
      { q: 'Do you fix iron gate locks?', a: 'Yes. Many gate problems are a sagging hinge or a misaligned latch. We realign it, and replace the lock box only if it has rusted through.' },
    ],
  },
  'fort-hamilton': {
    district: 'south',
    heading: 'Fort Hamilton, on and around the garrison',
    paragraphs: [
      'Much of Fort Hamilton is the row houses and apartment buildings off 4th Avenue and Fort Hamilton Parkway, a few blocks from the Verrazzano. Military families renting nearby often want a rekey on move-in, because nobody knows how many keys the last tenant left behind.',
      'Housing on the Army post itself is behind a security gate. If you live on post, check the base’s rules for contractor access before we set out — we can only work where we are allowed in.',
    ],
    route: 'Fort Hamilton is the southern tip of our home turf, straight down 4th Avenue or Fort Hamilton Parkway.',
    faqs: [
      { q: 'I just moved near the base — should I change the locks?', a: 'A rekey is the cheap, sensible move. It makes every old key useless without replacing the hardware, and it takes minutes per lock.' },
      { q: 'Can you come onto the Fort Hamilton post?', a: 'Only with the access the base requires for contractors. Ask housing or the gate what they need from a vendor first, and we will arrange the rest.' },
    ],
  },
  'bensonhurst': {
    district: 'south',
    heading: 'Bensonhurst’s two-family houses and avenue shops',
    paragraphs: [
      'The brick two-family houses on the side streets off 18th Avenue and 86th Street usually have a shared front door with separate apartment doors inside. Landlords call us between tenants to rekey the apartment and the common entrance, so each tenant’s key opens only what it should.',
      'Under the D train on 86th Street and along 18th Avenue, shops rely on roll-down gates and padlocks. A seized gate padlock at opening time is a classic Bensonhurst call, and we cut those off and fit a new one on the spot.',
    ],
    route: 'From Bay Ridge it is a short drive east along 86th Street or Bay Ridge Parkway.',
    faqs: [
      { q: 'I own a two-family house. Can tenants have keys for the front door and only their own apartment?', a: 'Yes. We set the locks up so the street door is shared and each apartment key is unique — and we can add an owner key that opens everything.' },
      { q: 'My store gate padlock is stuck. Can you open it without damaging the gate?', a: 'We pick or cut the padlock, not the gate, and supply a new shrouded padlock that is harder to cut.' },
    ],
  },
  'bath-beach': {
    district: 'south',
    heading: 'Bath Beach, between Bay Parkway and the water',
    paragraphs: [
      'Bath Beach mixes postwar apartment buildings along Cropsey Avenue with attached houses on the streets toward Bay Parkway. In the larger buildings the lobby entry and the intercom are the usual weak points, and we repair both.',
      'Being right on Gravesend Bay, outdoor locks here corrode faster than they do inland. Salt air gets into back-door and gate cylinders, and a lock that has gone stiff is worth servicing before it fails with the door shut.',
    ],
    route: 'We reach Bath Beach along the Belt Parkway or down Bay Parkway from Bensonhurst.',
    faqs: [
      { q: 'My back door lock has become hard to turn. Is it about to break?', a: 'Often it is corrosion. Cleaning and lubricating the cylinder fixes many of them; if the pins are pitted we replace the cylinder before it locks you out.' },
      { q: 'Do you repair building intercoms in Bath Beach?', a: 'Yes — buzzers that do not release, dead handsets and lobby panels. We also replace the door strike the intercom operates, which is often the real fault.' },
    ],
  },
  'gravesend': {
    district: 'south',
    heading: 'Gravesend: one of Brooklyn’s oldest towns, newer locks',
    paragraphs: [
      'Gravesend was one of the original towns of Kings County, but most homes today are mid-century attached and semi-detached houses around Kings Highway, Avenue U and McDonald Avenue. Plenty of those front doors still carry the cheap original lockset, and a proper deadbolt is the single best upgrade we can fit.',
      'Larger families in the semi-detached houses often want everyone on one key and a keypad lock on the side entrance so nobody is locked out after school.',
    ],
    route: 'We come down Bay Parkway or across Kings Highway — Gravesend sits between our base and Coney Island.',
    faqs: [
      { q: 'What is the best upgrade for an old front door lock?', a: 'A grade-1 deadbolt with a reinforced strike plate and long screws. It costs far less than a new door and stops the most common forced entry.' },
      { q: 'Can I get a keypad on my side door but keep a key for the front?', a: 'Yes. We fit a keypad deadbolt on the side door and key its backup cylinder to the same key as the front.' },
    ],
  },
  'sunset-park': {
    district: 'south',
    heading: 'Sunset Park: row houses, avenues and Industry City',
    paragraphs: [
      'The brick row houses climbing the hill around the park itself are mostly divided into apartments, so the front door is shared and the building intercom does a lot of work. When the buzzer stops releasing the door, tenants end up propping it open — fixing the strike and the intercom is the safer answer.',
      'The 5th Avenue and 8th Avenue commercial strips keep us busy with storefront cylinders and roll-down gates, and the old industrial buildings by the waterfront need commercial locks, panic bars and keyed-alike suites for small tenants.',
    ],
    route: 'Sunset Park is directly north of Bay Ridge — up 4th or 5th Avenue, no expressway needed.',
    faqs: [
      { q: 'Our building’s front door buzzer stopped opening the door. Who fixes that?', a: 'We do. It is often the electric strike or its wiring rather than the intercom panel, which makes it a cheaper repair than people expect.' },
      { q: 'Can you key a whole floor of small workshops so the landlord has one master key?', a: 'Yes — a master-keyed system gives each tenant their own key and the owner one key for every door.' },
    ],
  },
  'borough-park': {
    district: 'south',
    heading: 'Borough Park: big families, many keys',
    paragraphs: [
      'Borough Park’s large families and multi-generation homes mean a lot of keys in circulation. Keypad and combination deadbolts are popular here because nobody has to carry a key — and mechanical push-button locks, which need no batteries or electronics, are worth considering if anyone in the household prefers to avoid electronic devices on Shabbat and holidays.',
      'Along 13th Avenue the shops close and reopen around the week and the holidays, so a reliable gate lock and a storefront cylinder that turns smoothly matter more than usual.',
    ],
    route: 'We reach Borough Park via Fort Hamilton Parkway or New Utrecht Avenue, straight from Bay Ridge.',
    faqs: [
      { q: 'Is there a keyless lock that does not need electricity?', a: 'Yes. Mechanical push-button locks open with a code and have no batteries or electronics at all. We supply and fit them on front and side doors.' },
      { q: 'We have too many keys out for our house. What can we do?', a: 'Rekey the locks so every old copy stops working, then hand out new keys — or switch to a code lock so you only have to change a number.' },
    ],
  },
  'sheepshead-bay': {
    district: 'south',
    heading: 'Sheepshead Bay, from Emmons Avenue inland',
    paragraphs: [
      'The bay side along Emmons Avenue is restaurants, piers and apartment buildings; a few blocks inland the streets turn to attached houses and the old bungalow courts. Bungalow courts share narrow walkways and gates, and the gate lock is often the first thing to go.',
      'The waterfront air works on locks the same way it does in Gerritsen Beach and Manhattan Beach, so we see a lot of stiff, corroded exterior cylinders here.',
    ],
    route: 'Sheepshead Bay is an easy Belt Parkway run east from Bay Ridge.',
    faqs: [
      { q: 'Can you replace the lock on our shared bungalow court gate?', a: 'Yes. We can key it so every household has a key, without needing to change anyone’s front door lock.' },
      { q: 'My exterior lock keeps sticking near the water. Is there a better option?', a: 'Brass and stainless cylinders hold up better in salt air than plated ones. We can swap the cylinder without changing the rest of the lock.' },
    ],
  },
  'brighton-beach': {
    district: 'south',
    heading: 'Brighton Beach under the elevated',
    paragraphs: [
      'Brighton Beach is dominated by large prewar and postwar elevator buildings between Brighton Beach Avenue and the boardwalk. Most of our work here is apartment doors: lockouts, cylinder changes when a tenant moves, and adding a second deadbolt for peace of mind.',
      'The shops under the B and Q trains on Brighton Beach Avenue open early and close late, and their gate padlocks and door cylinders see heavy use. We handle those as well as the lobby doors and intercoms of the big buildings.',
    ],
    route: 'We reach Brighton Beach along the Belt Parkway and Ocean Parkway.',
    faqs: [
      { q: 'Can I add an extra deadbolt to my apartment door?', a: 'Usually yes, but some buildings require the super to have a key. We fit it, and if your building needs a copy for management we make that too.' },
      { q: 'I am locked out of my apartment — can you open it without damage?', a: 'In almost all cases. We pick or bypass the lock first and only drill as a last resort, and we tell you the price before we start.' },
    ],
  },
  'coney-island': {
    district: 'south',
    heading: 'Coney Island beyond the boardwalk',
    paragraphs: [
      'Away from the amusement parks, Coney Island is mostly large residential towers and apartment buildings along Surf and Neptune Avenues. Lobby doors, intercoms and apartment lockouts are the bread and butter here.',
      'The boardwalk and Surf Avenue businesses are seasonal: shuttered for months, then open seven days a week in summer. A gate or door lock that sat all winter in salt air often seizes on the first spring morning — worth having serviced before opening day.',
    ],
    route: 'Coney Island is a direct run from our base on the Belt Parkway.',
    faqs: [
      { q: 'Can you service our shop locks before the summer season?', a: 'Yes. We clean, lubricate and test gate padlocks, roll-down gate locks and door cylinders, and replace anything that has corroded over the winter.' },
      { q: 'Do you work in the large residential buildings near the boardwalk?', a: 'Yes — individual apartments as well as lobby doors and intercoms when management calls us in.' },
    ],
  },
  'manhattan-beach': {
    district: 'south',
    heading: 'Manhattan Beach: detached homes by the ocean',
    paragraphs: [
      'Manhattan Beach is a quiet grid of detached houses between Sheepshead Bay and Kingsborough Community College. Owners here tend to want real security — high-security cylinders, reinforced strikes, smart locks and cameras — rather than the cheapest fix.',
      'Ocean exposure is constant, so exterior locks and smart-lock keypads need to be rated for weather. We recommend hardware that tolerates salt air and fit it so rain does not run into the keyway.',
    ],
    route: 'We reach Manhattan Beach by the Belt Parkway, past Sheepshead Bay.',
    faqs: [
      { q: 'Which smart locks survive near the ocean?', a: 'Models with a weather rating and a metal exterior. We help you choose one and fit it with a proper strike so it is as strong as a normal deadbolt.' },
      { q: 'Can you install cameras as well as locks?', a: 'Yes — we put in door and driveway cameras so you can see who is at the house as well as control who gets in.' },
    ],
  },
  'homecrest': {
    district: 'south',
    heading: 'Homecrest, around Kings Highway and Avenue U',
    paragraphs: [
      'Homecrest is dense with apartment buildings and attached houses, and two busy shopping streets — Kings Highway and Avenue U. Many buildings have been converted or subdivided over the years, so a single front door can lead to several separately locked units.',
      'Small businesses on Avenue U and Kings Highway regularly need storefront cylinders rekeyed after a staff change — the quickest way to make sure a former employee’s key no longer works.',
    ],
    route: 'From Bay Ridge we take Kings Highway or Bay Parkway across to Homecrest.',
    faqs: [
      { q: 'An employee left with a store key. What should I do?', a: 'Rekey the cylinder as soon as you can. Every old key stops working, the lock itself stays, and you get new keys for the current staff.' },
      { q: 'Can different units in one building have their own keys?', a: 'Yes. We key each unit separately and, if you want it, give the owner a master key for all of them.' },
    ],
  },
  'marine-park': {
    district: 'south',
    heading: 'Marine Park, around Brooklyn’s biggest park',
    paragraphs: [
      'The attached brick houses lining the streets around Marine Park and along Avenue U and Fillmore Avenue are mostly owner-occupied and long-held. Many still have the original front door hardware from when they were built, and upgrades to deadbolts and keyed-alike entries are common requests.',
      'Detached garages and back gates behind these houses are easy to forget until a lock fails. We service those along with the front door.',
    ],
    route: 'Marine Park is a straight Belt Parkway run east, getting off around Flatbush Avenue or Knapp Street.',
    faqs: [
      { q: 'Can you put my garage on the same key as my house?', a: 'Often, yes. If the garage lock uses a compatible keyway we rekey it; if not, we fit a matching cylinder.' },
      { q: 'Is it worth replacing original 1950s door hardware?', a: 'Usually. Old locksets are simple to bypass. A modern deadbolt with a reinforced strike is a meaningful upgrade for a modest price.' },
    ],
  },
  'mill-basin': {
    district: 'south',
    heading: 'Mill Basin’s waterfront homes',
    paragraphs: [
      'Mill Basin is a peninsula of large detached homes, many on the water, around the inlets off Jamaica Bay. These houses often have several entrances, gated driveways and sometimes a dock, and the owners usually want them on a coherent, high-security key system.',
      'Smart locks, keypad entries for housekeepers and contractors, and cameras on the driveway and the dock are common requests here, along with weather-rated hardware for anything facing the water.',
    ],
    route: 'Mill Basin is out along the Belt Parkway near Kings Plaza.',
    faqs: [
      { q: 'Can I give a housekeeper access without handing out a key?', a: 'Yes. A keypad or smart lock lets you give them their own code and remove it at any time.' },
      { q: 'Can you key all of a large house’s doors to one high-security key?', a: 'Yes, with a restricted keyway so copies can only be made with your authorisation.' },
    ],
  },
  'bergen-beach': {
    district: 'south',
    heading: 'Bergen Beach: newer homes, newer hardware',
    paragraphs: [
      'Bergen Beach is one of the newer parts of South Brooklyn, with many attached and semi-detached homes built in the later twentieth century. Front doors here often already have decent hardware, so the jobs are more about convenience — smart locks, keypads and keying everything alike.',
      'Sliding patio doors and back doors facing the yards are a common weak spot. We fit secondary locks and bars so they cannot be lifted out of the track.',
    ],
    route: 'We get to Bergen Beach along the Belt Parkway, off at Flatbush Avenue or Ralph Avenue.',
    faqs: [
      { q: 'How can I secure a sliding patio door?', a: 'A secondary lock or an anti-lift block stops it being forced or lifted off its track. We fit both in one visit.' },
      { q: 'Can a smart lock work with my existing deadbolt?', a: 'Some models retrofit over the inside of a standard deadbolt and keep your existing key. We tell you which will fit your door.' },
    ],
  },
  'gerritsen-beach': {
    district: 'south',
    heading: 'Gerritsen Beach’s bungalows and the water',
    paragraphs: [
      'Gerritsen Beach is a close-knit neighborhood of small bungalows and houses on narrow streets, surrounded by water on three sides. Hurricane Sandy flooded much of it in 2012, and many homes have been rebuilt or raised since — new doors, new frames, and sometimes locks that were never properly fitted.',
      'Salt water and damp are hard on locks. A lock that sat through a flood should be checked even if it still works, because corrosion inside the cylinder tends to show up later.',
    ],
    route: 'We reach Gerritsen Beach by the Belt Parkway, getting off at Knapp Street.',
    faqs: [
      { q: 'My lock got wet in a flood but still works. Should I replace it?', a: 'Have it checked. Salt water corrodes the pins inside, and the lock can fail weeks later. Often a clean and service is enough; sometimes the cylinder needs replacing.' },
      { q: 'My door was replaced after storm damage and the lock never sits right. Can you fix it?', a: 'Yes. Misaligned strikes and latches on new doors are a quick adjustment and stop the lock from jamming.' },
    ],
  },
  'sea-gate': {
    district: 'south',
    heading: 'Sea Gate, behind the gate',
    paragraphs: [
      'Sea Gate is a private gated community at the western tip of Coney Island, with its own gatehouse and patrol. Houses here range from large old summer homes to modern rebuilds, and many face the water on both sides.',
      'Because entry is controlled, a locksmith has to be let in at the gate. When you call, tell the gatehouse we are coming so we are not held up there.',
    ],
    route: 'We come down the Belt Parkway and through Coney Island to the Sea Gate entrance.',
    faqs: [
      { q: 'How do you get into Sea Gate?', a: 'Through the gatehouse, like any visitor. Let them know we are coming, or give us the name on the house so the guards can confirm with you.' },
      { q: 'Do you install weatherproof locks for waterfront houses?', a: 'Yes. We use hardware rated for salt air and fit it to keep water out of the cylinder.' },
    ],
  },
  'madison': {
    district: 'south',
    heading: 'Madison, between Marine Park and Midwood',
    paragraphs: [
      'Madison is a quiet residential pocket of detached and semi-detached houses and some low-rise apartment buildings around Avenue P, Avenue R and Nostrand Avenue. Homeowners here tend to stay for decades, and so do their locks.',
      'A common Madison request is a full key reset after years of handing out spares to family, contractors and neighbours. A rekey of every door brings it back to a known, small set of keys.',
    ],
    route: 'From Bay Ridge we cross Kings Highway or take the Belt Parkway to Nostrand Avenue.',
    faqs: [
      { q: 'We have handed out keys for years. How do we start over?', a: 'Rekey every exterior lock to one new key. All the old copies stop working, and you decide who gets the new ones.' },
      { q: 'Do you work on side and basement doors too?', a: 'Yes — every door into the house, including basement and garage entrances.' },
    ],
  },
  'midwood': {
    district: 'south',
    heading: 'Midwood’s detached houses and apartment blocks',
    paragraphs: [
      'Midwood runs from big detached houses with porches and wide lawns to solid prewar apartment buildings along Ocean Avenue and Avenue J. The detached houses usually have older wooden doors with mortise locks, which we repair or upgrade without replacing the door.',
      'Near Brooklyn College and the Avenue J and Avenue M shopping streets, landlords and small businesses call for rekeys between tenants and after staff changes.',
    ],
    route: 'We reach Midwood across Kings Highway or up Ocean Parkway.',
    faqs: [
      { q: 'Can you repair the old mortise lock on my wooden front door?', a: 'Yes. We service or replace the mortise body to fit the existing pocket, so the door does not need new cut-outs.' },
      { q: 'I rent rooms in my house. Can each room have its own lock?', a: 'Yes — we fit keyed locks on the room doors and can give you a master key for all of them.' },
    ],
  },
  'flatlands': {
    district: 'south',
    heading: 'Flatlands, along Flatbush Avenue and Avenue N',
    paragraphs: [
      'Flatlands is mostly attached brick houses with small front yards, plus the shops along Flatbush Avenue and Avenue N. Many front doors have an outer storm door as well as the main door, and both locks tend to wear at the same time.',
      'Near Kings Plaza and the Flatbush Avenue strip we also do car key work in parking lots — a lost car key away from home is one of the most stressful calls we get.',
    ],
    route: 'Flatlands is a Belt Parkway run east, off at Flatbush Avenue.',
    faqs: [
      { q: 'Can you key my storm door and front door alike?', a: 'Usually, yes, if the storm-door lock takes a standard cylinder. If not, we replace it with one that does.' },
      { q: 'I lost my car key in a parking lot. Can you make one there?', a: 'Yes. We cut and program car keys at the vehicle, so there is no tow to a dealer.' },
    ],
  },
  'canarsie': {
    district: 'south',
    heading: 'Canarsie, from Rockaway Parkway to the pier',
    paragraphs: [
      'Canarsie is block after block of attached and semi-detached brick homes, many with a basement apartment and a separate side entrance. That second entrance needs its own lock and often its own key for the tenant downstairs.',
      'With Canarsie Pier and the Jamaica Bay shore nearby, outdoor gates and basement doors are prone to damp. We service stiff locks and replace corroded ones before they fail.',
    ],
    route: 'Canarsie is at the eastern end of our Belt Parkway run, off at Rockaway Parkway.',
    faqs: [
      { q: 'I rent out my basement. Can the tenant have a key only for their door?', a: 'Yes. We key the basement entrance separately and can give you a master key that opens both.' },
      { q: 'Do you install cameras for houses?', a: 'Yes — front door and driveway cameras, set up so you can view them on your phone.' },
    ],
  },
  'kensington': {
    district: 'south',
    heading: 'Kensington, along Ocean Parkway and Church Avenue',
    paragraphs: [
      'Kensington is lined with large prewar apartment buildings along Ocean Parkway and smaller buildings and houses on the streets between Church Avenue and Ditmas Avenue. Lobby doors and intercoms in older buildings are frequent repairs.',
      'It is also one of the most diverse neighborhoods in the borough, and many families share a house across generations — so keyed-alike doors and spare-key planning come up a lot.',
    ],
    route: 'We reach Kensington via Fort Hamilton Parkway or Ocean Parkway.',
    faqs: [
      { q: 'Our lobby door does not lock after closing. Can you fix it?', a: 'Yes. It is usually the closer or the strike. We adjust or replace whichever is failing so the door latches every time.' },
      { q: 'Can you make several copies of a restricted key?', a: 'If you are authorised on the key system, yes. Otherwise we need the owner or managing agent’s approval.' },
    ],
  },

  // ===================== DOWNTOWN & BROWNSTONE BROOKLYN =====================
  'downtown-brooklyn': {
    district: 'downtown',
    heading: 'Downtown Brooklyn’s towers, offices and Fulton Street',
    paragraphs: [
      'The skyline here has changed completely in the last fifteen years, and most new residential towers run on fobs, keycards and smart locks rather than plain keys. Tenants call us when an apartment smart lock fails or a door will not latch; managers call us for access control and intercom panels.',
      'Around Fulton Street, MetroTech and the courts, offices and shops need keyed-alike suites, panic bars on exit doors and master key systems that let a building manager open every door without carrying a ring of keys.',
    ],
    route: 'Downtown is straight up the Gowanus Expressway and the BQE from Bay Ridge, or up 4th Avenue when the highway is jammed.',
    faqs: [
      { q: 'The smart lock on my apartment door stopped working. Can you open it?', a: 'Yes. Most smart locks have a key override; if yours does not or the key is lost, we open it without damaging the door and reset or replace the lock.' },
      { q: 'Do you install access control for offices?', a: 'Yes — keypad, fob and card readers, plus electric strikes and exit hardware so the door stays code-compliant.' },
    ],
  },
  'brooklyn-heights': {
    district: 'downtown',
    heading: 'Brooklyn Heights: historic doors, careful work',
    paragraphs: [
      'Brooklyn Heights was New York City’s first designated historic district, and its brownstones, brick Federal houses and carriage houses still have heavy original doors. We treat them carefully: new locks go into existing cut-outs wherever possible, and visible hardware is matched to the period so the front of the house does not change.',
      'Many houses are split into apartments or co-ops behind the original stoop door. Keeping the street door, the vestibule door and each apartment on a sensible key system is a common job.',
    ],
    route: 'We reach the Heights via the BQE, coming off at Atlantic Avenue or Cadman Plaza.',
    faqs: [
      { q: 'Will a new lock change how my landmarked front door looks?', a: 'It should not. We fit modern security behind the existing face and match visible trim, so the door looks the same from the street. If you plan to change the door itself, check landmark rules first.' },
      { q: 'Can the street door and vestibule door share one key?', a: 'Yes, and each apartment can keep its own key — we set that up in one visit.' },
    ],
  },
  'dumbo': {
    district: 'downtown',
    heading: 'DUMBO lofts and studios',
    paragraphs: [
      'DUMBO’s former warehouses now hold lofts, studios and tech offices. Heavy steel and wood doors, freight-style entrances and big shared hallways make access control and master keying more common here than simple lockouts.',
      'Residential loft buildings increasingly use keypads and smart locks on individual units. Many of those units use commercial-grade hardware a hardware store does not stock, so we carry the common replacement parts in the van.',
    ],
    route: 'From Bay Ridge we take the BQE north and come off at York Street or Cadman Plaza.',
    faqs: [
      { q: 'Can you install a keypad on a heavy loft door?', a: 'Yes. We use commercial-grade keypad hardware sized for thick doors, rather than residential locks that wear out quickly.' },
      { q: 'Our studio shares a building with other tenants. Can we have our own key?', a: 'Yes — your unit gets its own key, and the landlord can keep a master if the lease requires it.' },
    ],
  },
  'vinegar-hill': {
    district: 'downtown',
    heading: 'Vinegar Hill’s small historic houses',
    paragraphs: [
      'Vinegar Hill is a few blocks of Belgian-block streets and small nineteenth-century houses between DUMBO and the Brooklyn Navy Yard. The doors are old, narrow and often out of square, so off-the-shelf locks rarely fit without adjustment.',
      'We work around the original woodwork: rebuilding old mortise locks where we can and fitting slim modern ones where we cannot.',
    ],
    route: 'Vinegar Hill is off the BQE at York Street, just past DUMBO.',
    faqs: [
      { q: 'My old door is out of square and the lock catches. Can you fix it?', a: 'Usually by adjusting the strike and latch rather than replacing anything. Older doors move with the seasons, and the lock needs to allow for it.' },
      { q: 'Can you repair an original mortise lock instead of replacing it?', a: 'Often, yes. We clean and rebuild the mechanism and replace worn parts, which preserves the original hardware.' },
    ],
  },
  'boerum-hill': {
    district: 'downtown',
    heading: 'Boerum Hill, between Atlantic Avenue and the brownstones',
    paragraphs: [
      'Boerum Hill combines brownstone and brick row houses on its tree-lined blocks with the shops and restaurants along Atlantic Avenue and Smith Street. The row houses often have a stoop door and a garden-level door, both of which need good locks.',
      'Small shops on Atlantic Avenue call us for storefront cylinders, gate locks and door closers — and for rekeys after staff turnover.',
    ],
    route: 'We take the Gowanus Expressway and come off near Atlantic Avenue.',
    faqs: [
      { q: 'Should the garden-level door have the same lock as the stoop door?', a: 'It should be just as strong — the garden level is often the easier way in. We can key both to the same key.' },
      { q: 'Can you fix a shop door that slams or will not close?', a: 'Yes. We adjust or replace the door closer so it shuts and latches properly every time.' },
    ],
  },
  'cobble-hill': {
    district: 'downtown',
    heading: 'Cobble Hill, around Court Street',
    paragraphs: [
      'Cobble Hill is a small landmarked neighborhood of brownstones, brick row houses and a few converted buildings around Court Street and Clinton Street. Most front doors are original, and owners want security without visible change.',
      'Many brownstones here are divided between an owner’s triplex and a rental apartment. We set up the locks so the owner and the tenant each have the right keys and nothing more.',
    ],
    route: 'From Bay Ridge it is the Gowanus Expressway and off at Hamilton Avenue or Atlantic Avenue.',
    faqs: [
      { q: 'Can I add a high-security cylinder without changing my front door?', a: 'Yes. A high-security cylinder fits into most existing deadbolts and mortise locks, so the door and its trim stay as they are.' },
      { q: 'How do I split keys between my unit and my tenant’s?', a: 'We key the shared entrance for both and key each unit separately. You can also hold a master that opens everything.' },
    ],
  },
  'carroll-gardens': {
    district: 'downtown',
    heading: 'Carroll Gardens and its front gardens',
    paragraphs: [
      'Carroll Gardens is known for the deep front gardens in front of its brownstones, which means a front gate as well as a front door. Gate locks and latches here face weather all year and are worth upgrading when they get loose.',
      'Inside, many houses are two- or three-family brownstones. Rekeys between tenants and keeping the shared front door secure are the jobs we do most.',
    ],
    route: 'We take the Gowanus Expressway and come off at Hamilton Avenue, right by the neighborhood.',
    faqs: [
      { q: 'Can you put a lock on my front garden gate?', a: 'Yes. We fit gate locks that suit iron gates and stand up to weather, and we can key them to your house key.' },
      { q: 'Do I need to change the locks between tenants?', a: 'You should at least rekey. It makes the previous tenant’s keys useless and costs much less than replacing the locks.' },
    ],
  },
  'red-hook': {
    district: 'downtown',
    heading: 'Red Hook’s waterfront and warehouses',
    paragraphs: [
      'Red Hook is cut off from the subway and surrounded by water. Its warehouses, workshops and small businesses along Van Brunt Street and the piers need commercial locks, gates and access control far more than residential work.',
      'The neighborhood flooded badly in Hurricane Sandy, and the salt air remains tough on exterior hardware. Corroded gate locks and roll-down gate mechanisms are common calls.',
    ],
    route: 'Red Hook is close by: the Gowanus Expressway to Hamilton Avenue, then a short drive in.',
    faqs: [
      { q: 'Can you service roll-down gate locks on a warehouse?', a: 'Yes. We repair or replace gate locks and padlocks and recommend corrosion-resistant hardware near the water.' },
      { q: 'Do you install cameras for businesses?', a: 'Yes — cameras covering doors, loading areas and gates, viewable on your phone.' },
    ],
  },
  'gowanus': {
    district: 'downtown',
    heading: 'Gowanus: old industry, new buildings',
    paragraphs: [
      'Gowanus is in the middle of a big change: industrial buildings and workshops along the canal sit next to new apartment towers that followed the 2021 rezoning. That means everything from padlocks on old loading doors to fob systems in brand-new lobbies.',
      'Artists’ studios and small manufacturers in converted buildings often need a master key system so the landlord can reach every unit and each tenant has their own key.',
    ],
    route: 'Gowanus is a short drive straight up 4th Avenue from Bay Ridge.',
    faqs: [
      { q: 'Can you set up a master key system for a building of studios?', a: 'Yes. Each tenant gets a unique key and the owner gets one key that opens every door.' },
      { q: 'Can you work on new-build apartment smart locks?', a: 'Yes — we open, reset, repair and replace most residential smart locks.' },
    ],
  },
  'fort-greene': {
    district: 'downtown',
    heading: 'Fort Greene’s brownstones around the park',
    paragraphs: [
      'Fort Greene’s brownstones and Italianate row houses line the streets around Fort Greene Park and down toward BAM and the Atlantic Terminal. Their heavy front doors usually have mortise locks, which we repair or upgrade without changing the door.',
      'Many brownstones are split into apartments, so the street door, the inner door and each unit need a sensible key arrangement.',
    ],
    route: 'We reach Fort Greene via the BQE or up Flatbush Avenue past the Barclays Center.',
    faqs: [
      { q: 'My brownstone’s mortise lock is old and loose. Repair or replace?', a: 'We check it first. A worn cylinder or spring can be replaced on its own; if the body is broken we fit a new one into the same pocket.' },
      { q: 'Can I get one key for the street door and my own apartment?', a: 'Yes. We key your apartment and the shared doors so a single key works for you.' },
    ],
  },
  'clinton-hill': {
    district: 'downtown',
    heading: 'Clinton Hill, from Pratt to the mansions',
    paragraphs: [
      'Clinton Hill has some of Brooklyn’s grandest nineteenth-century houses on Clinton and Washington Avenues, plus brownstones, row houses and the Pratt Institute campus. Large old houses mean big doors, carriage houses and many entrances.',
      'Students and landlords near Pratt call us for rekeys at the start and end of the academic year, when keys change hands most.',
    ],
    route: 'We take the BQE and come off near Flushing Avenue or come up through Fort Greene.',
    faqs: [
      { q: 'I rent to students. When should I rekey?', a: 'Between every tenancy. Students share and copy keys, and a rekey is the cheapest way to start each year clean.' },
      { q: 'Can you work on a carriage house door?', a: 'Yes — we fit locks suited to large wooden carriage doors and can key them to the house.' },
    ],
  },
  'park-slope': {
    district: 'downtown',
    heading: 'Park Slope, from 4th Avenue to Prospect Park',
    paragraphs: [
      'Park Slope’s brownstones and limestones climb from 4th Avenue up to Prospect Park West, with shops on 5th and 7th Avenues. Many houses have been converted into co-ops and condos, which brings shared front doors, intercoms and board rules about keys.',
      'Families here often want smart locks or keypads for babysitters and dog walkers, fitted so the original door is not damaged.',
    ],
    route: 'Park Slope is straight up 4th Avenue or the Prospect Expressway from Bay Ridge.',
    faqs: [
      { q: 'Can a babysitter have a code instead of a key?', a: 'Yes. A keypad or smart lock gives each person their own code, which you can delete at any time.' },
      { q: 'Our co-op intercom stopped working. Can you repair it?', a: 'Yes — handsets, the lobby panel and the door release.' },
    ],
  },
  'prospect-heights': {
    district: 'downtown',
    heading: 'Prospect Heights, around Vanderbilt and the arena',
    paragraphs: [
      'Prospect Heights packs brownstones and row houses onto the blocks between Flatbush Avenue and Washington Avenue, with new residential towers rising near the Barclays Center and Atlantic Avenue.',
      'Restaurants and bars along Vanderbilt Avenue keep late hours, and a door lock or gate that fails at closing time needs someone the same evening — which is why our 11 PM hours matter here.',
    ],
    route: 'We reach Prospect Heights up Flatbush Avenue or via the Prospect Expressway.',
    faqs: [
      { q: 'Our restaurant’s door lock failed at closing. Can you come tonight?', a: 'We are open until 11 PM every day. Call and we will tell you how soon we can be there.' },
      { q: 'Can you change locks in a new-construction condo?', a: 'Yes, though some buildings require their own hardware on unit doors. Check with management and we will match what is needed.' },
    ],
  },
};

export const guideFor = (slug: string) => guides[slug];
export const districtAreas = (d: District) =>
  Object.entries(guides).filter(([, g]) => g.district === d).map(([slug]) => slug);
