// Per-service field notes.
//
// The trait matrix in localknowledge.ts differentiates pages by what the
// neighborhood is built from. This file differentiates them by which part of
// the job is being talked about. Eight notes per service, two drawn per page,
// means two pages about the same service in different neighborhoods are
// discussing different aspects of it rather than rephrasing one paragraph.
//
// Each note has to teach the reader something they did not know. If it could
// be deleted without losing information, it does not belong here.
//
// %CITY% and %REGION% are substituted at render time.

export const SERVICE_FIELD_NOTES: Record<string, string[]> = {
  'commercial-lockout': [
    'Most storefront glass doors in %CITY% use a narrow-stile deadlock with a hook or swing bolt, and the cylinder is held in by a single set screw on the door edge. That is good news on a lockout: the door can usually be opened through the lock itself, without touching the glass or the frame, and the hardware is still usable afterwards.',
    'Roll-down gates are the part of a commercial lockout most likely to need cutting, because many are secured with a padlock on a bottom bar where there is nothing to pick from a comfortable angle. If the padlock has to go, we tell you first, cut only the padlock, and can supply a replacement on the spot so the gate locks again that night.',
    'A business lockout often turns out to be a key problem rather than a door problem: a manager who left with the only key, or a new tenant who was never given one. Once you are in, the sensible next step is a rekey of that cylinder so every key that went missing stops working, done on the same visit while the door is open.',
    'We ask for proof that you are entitled to enter before opening a commercial door, usually ID together with a lease, a business document, or the owner on the phone. It can feel like a delay when you are standing outside your own shop, but it is the same check that stops someone else talking their way into it.',
  ],
  'storefront-lock-repair': [
    'The classic storefront failure is a cylinder that turns but no longer throws the bolt. Nine times out of ten the cylinder is fine and the cam on the back of it has worn, or the cylinder has backed out a fraction because its set screw loosened, so the cam no longer reaches the lock body. Re-seating it and tightening the set screw is a repair, not a replacement.',
    'If you have to lift the door or lean on it to get the key to turn, the lock is not the problem; the door has dropped on its pivots or hinges and the bolt is binding in the strike. Forcing it is how keys snap and cams strip. Adjusting the door and the strike fixes the lock without new parts.',
    'Storefront cylinders on busy %CITY% shops are turned hundreds of times a day, and the brass wears just like the keys do. When the key starts needing to be jiggled, the pins are worn, and that is the point to replace the cylinder before it fails at closing time with the shop full of stock.',
    'The same work applies to office and building doors, not only shopfronts: a lock change on an office suite or a lobby door is usually a cylinder or a lever set, keyed to new keys so the old ones stop working, or keyed alike with the other doors so one key does it all.',
  ],
  'panic-bar-installation': [
    'A required exit has to open with a single motion and no key, from the inside, every time. That rule is why chains, slide bolts and extra deadbolts on exit doors are flagged by inspectors, and why a panic bar is the way to keep the door secure from outside while leaving the exit legal.',
    'The most common exit device complaint is a door that has to be pushed twice. That is almost always the latch dragging on the strike or the bar sitting out of level, and both are adjustments. Replacing the device is only needed when internal parts are worn or broken.',
    'Vertical rod devices, the kind that latch at the top and bottom of the door, drift out of adjustment as the door settles. When the bottom rod no longer clears the floor or the top latch stops catching, the fix is setting the rods to the door as it hangs now, not as it hung when it was installed.',
    'Dogging lets a panic bar stay pushed in during business hours, so customers can push or pull the door open without latching it every time. It is useful on a busy %CITY% entrance, as long as the door goes back to latching at closing and the dogging key is kept where staff can find it.',
  ],
  'door-closer-repair': [
    'A surface closer has separate adjustments for the main swing, the last few inches where the door latches, and the backcheck that cushions it when it is thrown open. Most slamming and drifting complaints are fixed with those valves, which is why we adjust before we talk about replacing anything.',
    'Oil on the floor under a closer, or a door that suddenly swings freely, means the closer has failed internally. It cannot be adjusted back to life, and the right fix is a new closer sized to the door, because an undersized one never latches the door and an oversized one makes it hard to open.',
    'Wind is a closer\'s worst enemy on %CITY% storefronts and building entrances. A gust that catches an open door can bend the arm and tear the closer off its bracket. The backcheck setting is what protects it, and a door that faces the wind may need a parallel arm or a stronger closer.',
    'A fire door that no longer closes and latches on its own is no longer doing its job, and a failed closer is the most common cause. Getting it closing and latching again is usually a closer adjustment or replacement and a strike alignment.',
  ],
  'master-key-systems': [
    'A master key system is a plan before it is hardware: a list of doors and a list of who needs to open which ones. Getting that plan right at the start is what keeps the system manageable for years, because every later change, a new tenant or a lost key, is then a small rekey rather than a redesign.',
    'Many existing cylinders can be rekeyed into a master key system without buying new locks, as long as they are in good condition and of a type that takes master pins. Worn or very old cylinders are the ones worth replacing, and we point those out rather than rekey something that will fail.',
    'The records matter as much as the keys. A master system with no record of how each cylinder is pinned becomes a puzzle the moment something changes. We keep a record of the keying so the next change is quick and accurate.',
    'For %CITY% buildings with several tenants, a master system usually gives each unit its own key, a building master for management, and common doors like the lobby and mail room that every tenant key opens. Restricted keyways stop tenants copying keys freely.',
  ],
  'commercial-rekeying': [
    'Rekeying changes the pin stack inside a cylinder so it answers to a new key. The lock body, the handles and the finish stay exactly as they are, which is why it is usually the cheaper and faster way to make old keys worthless after staff turnover or a new lease.',
    'Whenever a key leaves with someone who should no longer have access, the business is relying on that person\'s goodwill. Rekeying the doors they could open is the clean answer, and it is quickest when done as one visit for every affected door.',
    'Rekeying is the natural moment to simplify: keying the front, back and office doors alike so one key opens all three, or moving the business onto a master key system so managers carry one key and staff carry only what they need.',
    'A cylinder that is badly worn is not worth rekeying, because the new key will soon start sticking for the same reason the old one did. On busy %CITY% storefronts we check the cylinder first and recommend a replacement where that is the better use of your money.',
  ],
  'key-duplication': [
    'Every copy of a copy drifts a little further from the original cuts, which is why a spare made from another spare often sticks or needs jiggling. Cutting from the original key, or from the key code where we can, gives a key that works like the first one.',
    'If you have several doors with different keys, the time you are getting spares cut is a good time to ask about keying them alike, so one key opens the front door, the back door and the deadbolt instead of three separate keys on the ring.',
    'Car key spares are a different job: the blade is cut, then the chip inside is programmed to the car. Making a spare while you still have one working key is far simpler than starting from nothing after the last key is lost.',
    'Keys stamped "do not duplicate" or cut on a restricted keyway are copied only with the authorization of the owner or the building\'s management. That restriction is what makes them secure, and a %CITY% landlord who chose them is relying on it.',
  ],
  'car-lockout': [
    'Modern car doors are opened with an inflatable wedge to create a small gap and a long-reach tool to press the unlock button or pull the handle from inside. Done properly, nothing touches the paint and the weather seals return to shape. Coat hangers and slim jims belong to older cars and are how door wiring gets damaged on new ones.',
    'Many cars lock themselves with the fob inside, and some will not let a door lock while the fob is in the cabin. If yours did lock with the fob inside, the fob battery may be weak, which is worth replacing once you are back in.',
    'If the key is not locked in the car but lost, opening the door only gets you halfway. The job then becomes cutting and programming a new key at the vehicle, which we can do for most makes in %CITY% without a tow.',
    'If a child or a pet is locked in a car, call 911 first. Emergency services will act immediately and will not wait on anything, and a locksmith is the second call, not the first.',
  ],
  'broken-key-extraction': [
    'A key usually snaps because it is worn thin at the shoulder or because the lock has become stiff and the key was forced. Pulling the broken piece out solves today\'s problem, but finding out which of those it was is what stops it happening again.',
    'Superglue on a matchstick and tweezers are the two most common home attempts, and both tend to push the piece deeper or glue it to the pins. If nothing is sticking out to grip, leaving it alone and calling saves the lock.',
    'Keep both halves of a snapped key. With the bow in your hand and the tip extracted, the cuts can usually be read directly and a new key cut on the spot without decoding the lock.',
    'A key broken in a car ignition is extracted the same way, with thin hooked tools that catch the side of the blade. Once it is out we check the ignition turns smoothly, because a stiff ignition is often why the key broke in the first place.',
  ],

  'emergency-lockout-service': [
    'Drilling is a decision, not a technique. A lock gets drilled when it is a high-security cylinder we cannot pick in reasonable time, when it has already been forced and the pins are bent, or when the key snapped deep enough to jam the plug. Every other lockout should end with the door unmarked, and if a locksmith reaches for a drill first in %CITY%, that tells you what you need to know.',
    'The cheapest lockout quote on the phone is usually the most expensive one at the door. The pattern is a very low call-out figure, then a separate charge for the opening once the technician is standing there and you have no other option. We quote the job, not the visit, and the number we give on the call is the number on the invoice.',
    'If you are locked out with the stove on, a child or a pet inside, or any other immediate risk, call 911 first and us second. The fire service will be faster than any locksmith and they will not wait on a price. We would rather lose the job than have someone sit outside a %CITY% door doing arithmetic.',
    'A door that locked itself behind you is a different problem from a door whose lock has failed. The first is a five-minute opening; the second means the mechanism gave way and the lock is going to need work whatever happens. We ask on the phone which it is, because it changes both the price and the parts we bring to %CITY%.',
    'Keep the broken half of a snapped key if you still have it. With the tip we extract and the bow in your hand we can often cut a replacement directly, which saves decoding the lock and turns a second visit into a same-visit fix.',
    'Storm doors, screen doors and vestibules add a layer people forget when they call. If your %CITY% entrance has an outer door with its own lock, mention it — arriving to find two locked doors instead of one changes the tools and the time.',
    'We ask for ID and proof of address on every residential lockout, including ones where it is obviously your home. It is not scepticism about you; it is the reason the next person cannot talk their way into your apartment. A locksmith who skips it is a liability to the whole building.',
    'Most lockouts we attend in %CITY% have no lock fault at all — the door simply closed on a spring latch. Those open fast and cost accordingly. It is worth saying on the phone whether the deadbolt was thrown, because a thrown deadbolt is genuinely more work than a latched door.',
  ],

  'lock-rekeying': [
    'Rekeying changes the pin stack inside the cylinder, so the lock stays on the door and only the key that operates it changes. Nothing visible is replaced, nothing is drilled, and the hardware you already paid for keeps working — which is why it is cheaper than replacement in nearly every situation where the lock itself is sound.',
    'The right time to rekey is the day you take possession, not the week after something goes wrong. Between the previous owner, their family, a broker, a contractor and whoever borrowed a key once, the honest answer for any %CITY% property changing hands is that nobody knows how many keys exist.',
    'Keying alike is the request people are most pleased with afterwards. One key for the front, the back, the garage and the basement removes a daily annoyance for as long as you live there, and it costs very little on top of a rekey you were doing anyway.',
    'Not every cylinder can be rekeyed to every other. Different manufacturers use different keyways, and a key cut for one will not enter the other whatever the pinning. Where a %CITY% property has a mixture we swap in matched cylinders so the set genuinely works alike rather than nearly.',
    'A master key system gives one key that opens everything and individual keys that open only what they should. It is worth designing at the outset for a building with tenants or staff, because retrofitting a hierarchy onto locks that were pinned ad hoc is slower and produces a worse system.',
    'Rekeying does not make a weak lock strong. If the cylinder is worn, the plug scored or the housing loose, new pins go into a lock that was already failing. We check the condition first and say plainly when replacement is the better use of the money.',
    'Ask any locksmith how many keys they cut and take them all. Keys left with a locksmith, a contractor or a former tenant are exactly the keys a rekey was meant to retire, and the count is the only part of the job you cannot verify later.',
    'Some cylinders on %CITY% doors are older than the people living behind them and take pins that are no longer stocked. They are usually still rekeyable, but it needs a locksmith who carries legacy pin kits rather than one who only works with modern hardware.',
  ],

  'lock-replacement-and-repair': [
    'Grade is the number that matters when you replace a lock. ANSI Grade 3 is builder-standard and lasts about as long as you would expect; Grade 2 is the sensible residential minimum for a %CITY% exterior door; Grade 1 is commercial. The price difference between grades is far smaller than the difference in service life.',
    'A door that has to be lifted, shoved or leaned on before the key will turn is telling you the frame has moved. Fitting a new lock to a misaligned door transfers the strain to the new mechanism and it fails the same way. The strike and the hinges come first.',
    'Exterior locks in %REGION% take a full freeze-thaw cycle every winter. Moisture gets into the cylinder, expands, and works the springs loose. A yearly shot of dry graphite or PTFE lubricant — never oil, which attracts grit and gums the pins — adds years to an exterior cylinder.',
    'When only the cylinder has failed, only the cylinder needs replacing. On mortise and rim locks the cylinder unscrews out of the case, so the visible hardware, the case and the door preparation all stay. That is a much smaller job than the full lockset replacement people expect to be quoted.',
    'Hollow-core interior doors will not hold a security lock, whatever is fitted to them. If a room in a %CITY% property genuinely needs securing, the door has to be solid first — a Grade 1 deadbolt in a hollow door simply relocates the failure to the door skin.',
    'Screws are the cheapest security upgrade in the trade. Most hinge and strike plates ship with three-quarter-inch screws that bite only into the trim. Replacing them with three-inch screws that reach the framing costs almost nothing and changes how the door behaves under force entirely.',
    'A key that has become stiff over months is a warning, not a quirk. It is nearly always a worn key, a worn plug, or debris in the mechanism, and all three are cheap to address before the day the key stops turning at all — which will be a day you are in a hurry.',
    'Matching an old lock exactly is sometimes impossible, and the honest options are then a wrap plate, a filler, or a different hardware choice for the whole door. We would rather have that conversation before drilling than leave a %CITY% door with a visible hole and an explanation.',
  ],

  'deadbolt-installation': [
    'A deadbolt has no spring. That is the entire point of it: a latch is held by spring pressure and can be shimmed or carded open in seconds, while a deadbolt is thrown by hand and has to be forced or picked. Any %CITY% exterior door with only a spring latch is not really locked.',
    'Bolt throw is the measurement nobody asks about and everybody should. A one-inch throw puts the bolt properly into the frame; the short throws found on cheap hardware leave barely enough engagement to resist a shoulder. It is worth checking on a door you already have.',
    'The strike is where forced entries actually fail. A reinforced strike plate anchored with three-inch screws into the stud behind the jamb turns a door that splits on the first kick into one that does not. It is a small part and it matters more than the lock above it.',
    'Fitting a deadbolt is irreversible, so measurement comes first: door thickness, stile width, backset and whether the door is timber, hollow metal or solid steel. A bore in the wrong place on a narrow stile permanently weakens a %CITY% door and cannot be undone.',
    'Double-cylinder deadbolts — keyed on both sides — are a genuine fire risk and are restricted on many doors. If you are worried about glass near the lock, laminate film on the glazing or a reinforced frame solves the problem without requiring you to find a key in the dark.',
    'A deadbolt can nearly always be keyed to the key you already carry, so adding one to a %CITY% door does not mean adding a key to your pocket. Say so when booking and we bring the pinning kit to match your existing cylinder on the spot.',
    'Where the door is genuinely unsuitable, the answer is not a deadbolt. Narrow-stile glass doors take a hookbolt in a mortise case, and some apartment doors take a rim lock rather than a bored bolt. Fitting the wrong type is worse than fitting nothing.',
    'Two locks on one door only helps if the second one is in a different part of the frame. Stacked close together they load the same few inches of jamb, and the jamb is what gives way — spacing them properly is part of the installation, not a detail.',
  ],

  'high-security-locks': [
    'Three things separate a high-security cylinder from a good one: a patented keyway that controls duplication, hardened inserts that resist drilling, and a sidebar or similar mechanism that defeats picking and bumping. A lock marketed on only one of the three is not a high-security lock.',
    'Key control is the part that changes daily life. A restricted blank cannot be cut at a hardware counter, so copies exist only where you authorised them. For a %CITY% property with tenants, staff or a history of keys going missing, that is worth more than the pick resistance.',
    'A high-security cylinder in a weak door is money in the wrong place. If the frame will split under a shoulder, the cylinder is irrelevant. We look at the door, the frame and the strike before recommending an upgrade, and sometimes the honest advice is to spend it on the frame.',
    'Bump keys work on standard pin-tumbler cylinders and are trivially available. Properly designed high-security cylinders defeat bumping through their sidebar and pin geometry, which is one of the few security claims in this trade that is straightforwardly true.',
    'Restricted systems tie you to a locksmith, and that is a real consideration. Ask before you buy who can cut your keys, how long that will remain true, and what happens if they close. We answer that question honestly for %CITY% customers before fitting anything.',
    'High-security cylinders retrofit into most existing hardware. Mortise cases, rim locks and standard bored deadbolts all take one, so an upgrade usually means changing the cylinder rather than the visible hardware — particularly useful on a door whose original hardware is worth keeping.',
    'For a property with several doors, a high-security system is also a convenience upgrade: one restricted key for every opening, plus a record of every copy ever cut. That combination is difficult to achieve any other way.',
    'Insurance policies sometimes specify a lock grade or standard. If yours does, tell us before we fit rather than after, because retrofitting to a specification is a second visit and the paperwork needs to describe what is actually on the %CITY% door.',
  ],

  'car-key-replacement': [
    'Almost every vehicle built since the late nineties carries a transponder chip in the key. The blade turns the ignition; the chip tells the immobiliser to allow the engine to start. A key cut without programming will turn and do nothing, which is why key cutting alone is not a car key service.',
    'All-keys-lost is a genuinely different job from cutting a spare. With no working key we have to originate one from the vehicle — decoding a lock or working from the key code — and then run the security procedure. Some makes enforce a timed wait of ten to thirty minutes that nobody can shorten.',
    'Proof of ownership is not optional. Registration or title plus photo ID, matched to the vehicle. It is the same check that stops somebody else having a key cut to your car while it sits on a %CITY% street, and any locksmith who skips it is one you should not use.',
    'Coming to the vehicle is usually the cheaper route even before the price of the key is compared, because a tow to a dealer is often the largest single line on that invoice. A mobile locksmith removes it entirely — the van carries the cutting machine and the programmer.',
    'Have a spare made before you need one. Adding a key while you still hold a working one is a short, inexpensive job; originating one from nothing is longer and costs more. The gap between those two prices is the best argument for a spare that exists.',
    'Not every key is a dealer-only part. Plenty of vehicles that dealers claim require a franchised visit can be keyed by an independent locksmith with the right equipment, and older transponder systems are frequently ones dealers no longer support at all.',
    'A worn ignition or door cylinder can make a correctly cut key feel wrong. Where a fresh key still binds we decode and check the cylinder rather than recutting, because the fault is the lock in that case and another key will behave exactly the same.',
    'Tell us the year, make, model and whether you have any working key when you call. Those four facts determine which equipment comes to %CITY% and whether the job is twenty minutes or an hour, and guessing them wastes a visit.',
  ],

  'key-fob-and-remote-programming': [
    'Try the battery first. It is the cause of a substantial share of the fobs we are called about, it costs almost nothing, and a locksmith who charges to diagnose a flat coin cell is charging for the obvious. We will tell you to do this on the phone.',
    'Bring every remote you own to the appointment. Some vehicles require all fobs to be present and paired in one session, and any left at home stop working. It is the most common avoidable problem in remote programming.',
    'A lost remote can usually be de-authorised by re-pairing the vehicle to the ones you still hold. That matters when the fob went missing with anything identifying the car, since the fob on its own is a key to a vehicle somebody could find.',
    'Aftermarket remotes vary enormously. A quality replacement performs identically to the original; a very cheap one may not take a program at all, and no amount of equipment will make it. Where a %CITY% customer supplies the part, we test before charging for the attempt.',
    'Proximity fobs do two jobs — the remote functions and the immobiliser authorisation — and both have to be paired. That is why a push-to-start key costs more than a plain remote: it is two systems in one housing, not a fancier button.',
    'Cracked shells are far more common than dead electronics. Transferring the board and the emergency blade into a fresh housing and re-pairing it restores the remote for a fraction of a new one, and it is not a repair most people know is available.',
    'Range problems are frequently the receiver, not the fob. If both remotes have gradually got worse the antenna or the receiver module is the likely cause, and replacing the fobs will not fix it — worth diagnosing before spending on new remotes.',
    'Garage and gate transmitters are separate systems from the vehicle, on different frequencies. We can often program those too at a %CITY% address, but they are quoted separately because they are genuinely a different job in the same visit.',
  ],

  'smart-lock-installation': [
    'The door decides which smart lock is possible, not the review you read. Bore diameter, backset, door thickness and material rule most models in or out before any feature is considered. Send a photo of both sides of the %CITY% door before buying anything.',
    'Retrofit smart locks sit on the inside and turn your existing thumbturn. Nothing changes outside, your key still works, and no drilling happens. For renters and for doors where the outside hardware matters, it is usually the right product rather than the compromise.',
    'Batteries are the maintenance item that catches people out. Expect a year on alkalines, less on an exposed door through a %REGION% winter. Set the low-battery alert at installation and keep a physical key somewhere that is not inside the locked house.',
    'A smart lock is a convenience upgrade with security roughly equal to a decent Grade 2 deadbolt. It does not make a weak door strong. Reinforcing the strike at the same time costs very little and addresses the way doors actually get opened by force.',
    'Codes are the real feature. A cleaner, a dog walker, a contractor or a guest can each have their own, added and revoked individually, with no key cut and nothing to get back. That is the thing a mechanical lock genuinely cannot do.',
    'Most %CITY% apartment doors are steel with a mortise or jimmy-proof rim lock, and consumer smart locks fit neither. Anyone who tells you otherwise without seeing the door has not seen enough of these doors.',
    'Wifi is optional on nearly every model. The keypad works standalone, and a bridge or wifi module only adds remote access and notifications. Plenty of customers deliberately skip it, and the lock is not diminished by that choice.',
    'Auto-lock is worth turning on and worth understanding. It closes the gap left by a door pulled shut but not locked, and it is also the setting most likely to lock somebody out of a %CITY% house while they take the bins out.',
  ],

  'intercom-systems': [
    'Whether the fault is the panel or the wiring changes the job completely, and it is testable in minutes. Sound cable between the street door and the units means a panel swap; failed cable means a rewire. Nobody should be quoting a %CITY% building either way without testing first.',
    'A door that buzzes but does not open is an electric strike problem, not an intercom problem. You can hear the strike energising while the bolt fails to clear it, usually from misalignment or wear. It is a door fault with an electrical symptom, and it is cheap to fix.',
    'One dead handset is that apartment; a whole building unable to release the door is the power supply, the panel or the strike. Working from that distinction rather than from the complaints saves opening up units that were never faulty.',
    'The cabling in older %CITY% buildings is frequently the best part of the system. Panels become unsupported after fifteen or twenty years while the wire behind them keeps working, which is why testing continuity before condemning the installation matters so much.',
    'Video is the most requested upgrade and it is not always a rewire. Some systems run video on the existing pairs and some do not, and which one you have determines whether this is a panel swap or a much larger job.',
    'Directory panels in larger buildings serve dozens of units on shared risers, so one fault can look like many. We work riser by riser rather than complaint by complaint, which finds the cause instead of chasing symptoms floor to floor.',
    'Common-area intercom work needs the owner, board or managing agent to authorise it, not an individual resident. We would rather have that agreed before we start than stop halfway through a %CITY% lobby.',
    'Exterior door stations fail from water more than from anything else. Sealing the cable entry properly at installation, rather than trusting the gasket alone, is what determines whether the panel lasts two years or fifteen.',
  ],

  'access-control-systems': [
    'The business case is deletion. A lost fob is removed from the system in seconds; a lost key means rekeying every cylinder it opened. For any %CITY% building with turnover, that single difference usually pays for the installation.',
    'Fail-safe and fail-secure are not preferences, they are code. Doors on an egress path must release when the fire alarm sounds, and a maglock without a proper release arrangement is both a violation and a genuine danger. We wire and document that correctly.',
    'A properly specified system keeps working when the internet does not. Credentials live on the controller at the building, so an outage affects remote administration and nothing else. If a supplier tells you the doors stop working, that is the wrong system.',
    'Audit trails are why businesses move to credentials rather than better locks. Knowing which fob opened the back door at 4 AM is information a key can never provide, and it changes conversations that would otherwise be guesswork.',
    'Size the controller for the doors you will have, not the doors you have. Adding a fourth door to a three-door controller means buying the head end twice, and it is a %CITY% mistake we see regularly on systems installed cheaply.',
    'Credentials can be limited by time as well as by door. A cleaner’s fob that works on weekday mornings and not at midnight is a straightforward configuration, and it removes the awkward conversation about handing keys back.',
    'Retrofitting an older building is mostly carpentry and cable routing, not electronics. Getting a strike into a frame that was never designed for one, and a cable to it without wrecking the finishes, is where the time in these jobs goes.',
    'Keep a mechanical override. Electronics fail, and a %CITY% building whose only way in is a reader is a building waiting for a bad morning. We specify a mechanical fallback on primary doors as a matter of course.',
  ],


  'commercial-locksmith': [
    'Commercial hardware is not residential hardware in a different finish. A %CITY% storefront door cycles more in a month than a house door does in a decade, and Grade 1 hardware exists because Grade 3 does not survive that. It is the cheaper choice measured over a year.',
    'Exit devices have to release with a single motion, and nothing on an egress path may need a key from the inside. Those are the two rules that catch businesses out at inspection, and they are usually broken by somebody adding a lock with good intentions.',
    'Closers are the most neglected item on a commercial door and the cause of most latching complaints. A door that does not close fully does not lock, and adjusting the closer usually resolves what gets reported as a lock fault.',
    'Master keying a business is worth designing rather than accumulating. Staff keys that open what they should, a management key that opens everything, and a written record — built at the start it stays coherent for years, built piecemeal it becomes a drawer of unlabelled keys.',
    'Restricted keys change what happens when an employee leaves. Instead of rekeying because a key might have been copied, you get the key back and know that is all of them. For a %CITY% business with turnover, that is the whole argument.',
    'Roll-down gates and the door behind them are two separate lock problems on one entrance, and they fail independently. We carry parts for both, because getting a gate up and finding the glass door still locked is not a completed job.',
    'After a break-in the first job is making the premises lockable, even if the permanent repair comes later. A business that cannot lock up cannot open, and we schedule those ahead of routine work.',
    'Scheduled maintenance costs less than emergencies, and for commercial doors it is genuinely predictable. Closers adjusted, exit devices tested and cylinders serviced on a planned visit avoids the failures that otherwise happen mid-trading.',
  ],
};

export function fieldNotesFor(serviceSlug: string, city: string, region: string): string[] {
  return (SERVICE_FIELD_NOTES[serviceSlug] ?? []).map((n) =>
    n.split('%CITY%').join(city).split('%REGION%').join(region),
  );
}
