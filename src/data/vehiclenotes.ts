// One more genuinely make-specific paragraph per car make.
//
// The /car-keys pages carried about 100 words of make-specific detail and 160
// words drawn from shared pools, which is why 22 pages about car keys read as
// variations on one page. These add a second block of real, per-make content
// so the unique share of each page is the majority of it.
//
// Everything here has to be true of that make and wrong about the others.

export const MAKE_OWNER_NOTES: Record<string, string> = {
  honda:
    'The Honda job we get called to most is a 2006–2015 Civic or Accord where the only key has been lost. Those take a plain HON66 transponder blade, and the whole thing — cut, program, test — is usually done inside half an hour at the kerb. The other recurring Honda call is an Odyssey whose sliding doors have stopped responding, which is a remote fault far more often than a door motor fault, and worth testing before anyone quotes a repair.',
  toyota:
    'The dividing line on Toyota is the chip generation. Cars up to roughly 2013 use the G chip and are quick; the H chip that followed is more secure and takes longer, and the two are not interchangeable, so identifying which your Camry or Corolla carries is the first thing we do rather than the last. Smart Key models add a proximity fob that still programs on site — the extra time is the security routine, not the drive to a dealer.',
  nissan:
    'Nissan is a make where the ignition itself is often the real fault. Worn Altima and Sentra ignition cylinders will refuse a perfectly good key, so we decode and check the cylinder before assuming the key is wrong — otherwise you buy a second key that behaves exactly like the first. Push-button Rogues and Muranos use an intelligent key that we originate and pair at the vehicle, including all-keys-lost.',
  ford:
    'Fords split cleanly between the older 8-cut PATS keys and the newer high-security laser-cut blades, and they need different cutting equipment, so telling us the year matters more on a Ford than on most makes. Transit and F-150 work vans are a large share of what we key here, and losing the only key generally stops a working day — those get treated as urgent.',
  chevrolet:
    'The older Chevy VATS and Circle Plus systems are still very much on the road in Brooklyn, and they are systems a lot of newer locksmiths no longer carry equipment for. We do. Newer Silverados, Equinoxes and Malibus use conventional transponder or proximity systems that program at the vehicle, and the all-keys-lost routine on GM platforms often includes a security wait that nobody can shorten.',
  jeep:
    'Jeep shares its immobiliser platform with the rest of the Chrysler group, so a Wrangler, a Grand Cherokee and a Dodge saloon are closer relatives under the dash than they look on the driveway. The common Jeep call is a second fob for a household that shares the vehicle, and the second most common is a fob that has physically broken up — Wrangler keys live a harder life than most.',
  dodge:
    'Dodge fobs take a beating and the failure is usually mechanical rather than electronic: a cracked shell, worn buttons, or a snapped emergency blade. Transplanting the board into a fresh housing restores the remote at a fraction of the cost of a new one. On the older Chrysler-group platforms we can also add keys through the on-board procedure where the vehicle still supports it.',
  ram:
    'Ram trucks are working vehicles, and the calls reflect that: a lost key on a job site, a fob that has been through a wash, a spare needed because two people share the truck. We come to the vehicle rather than asking a loaded truck to be towed, and we carry the blanks for both the older transponder keys and the current proximity fobs.',
  chrysler:
    'Chrysler minivans are the make where the sliding-door and liftgate functions on the fob matter as much as the ignition. A Pacifica or Town & Country fob that has lost those functions has usually lost its pairing rather than failed, and re-pairing restores everything. Older 300s and Sebrings take a conventional transponder key we cut and program on site.',
  hyundai:
    'Hyundai changed its key platforms fairly rapidly through the 2010s, and the difference between an Elantra of one model year and the next can be an entirely different key system. That is why we ask for the year before quoting rather than after. Sonata and Tucson proximity fobs are routine, and all-keys-lost on most Hyundais is a job we complete at the vehicle.',
  kia:
    'Kia and Hyundai share engineering, so much of what applies to one applies to the other — but the keyways and some of the security routines differ, and assuming they are identical is how a job goes wrong. Optima, Forte and Sorento are the ones we see most, and a common call is a second fob for a family that has been running on one for years.',
  mazda:
    'Mazda smart keys are reliable enough that the calls we get are mostly lost keys rather than faults. The Mazda3 and CX-5 are the two we key most often, and both program at the vehicle. Older Mazdas with a conventional transponder are quick jobs; the newer proximity systems take longer only because of the security routine.',
  subaru:
    'Subarus in Brooklyn skew older than average and a lot of them are on their second or third owner, which means the key history is frequently unknown. That makes a rekey of the vehicle — deleting old fobs while pairing yours — worth asking about at the same time as cutting a new one. Outback and Forester are the two we see most.',
  volkswagen:
    'Volkswagen is one of the makes where the honest answer sometimes involves component-level work, particularly on some immobiliser generations where a key cannot simply be added. We will tell you on the phone which side of that line your Jetta, Passat or Golf falls on, because finding out at the kerb helps nobody. Where it is a straightforward add, it is straightforward.',
  bmw:
    'BMW is the make people most expect to need a dealer for, and frequently it does not. We originate and code keys for most model ranges at the vehicle, including CAS-based systems. The genuine caveat is the newest platforms, where the security architecture does restrict what anybody outside the dealer network can do — and we say so before you book rather than after we arrive.',
  'mercedes-benz':
    'Mercedes keys are a specialist area, and the honest position is that it depends heavily on the year and the platform. Some are routine for us at the roadside; others involve infrared FBS systems where the realistic answer is a dealer. Telling you which one your car is, on the phone, before anybody spends anything, is more useful than optimism.',
  lexus:
    'Lexus follows Toyota engineering, so the same G-chip and H-chip distinction applies, and Smart Key models behave much like their Toyota equivalents with more of the security routine enforced. RX and ES are the two we key most. All-keys-lost is achievable on most years at the vehicle, with a wait built into the procedure rather than into our schedule.',
  acura:
    'Acura shares Honda platforms, which is good news: the underlying key systems are ones we work on constantly. The MDX and TL are the two we see most, and a frequent call is a proximity fob that has stopped being detected — often a battery or a worn fob rather than a vehicle fault, which is worth ruling out before paying for a replacement.',
  infiniti:
    'Infiniti runs Nissan systems with more of the intelligent-key architecture, and the same ignition-wear caution applies: a worn cylinder on an older G35 or G37 will reject a correctly cut key. We check the cylinder rather than recutting. Newer QX models are proximity systems that we originate and pair on site.',
  gmc:
    'GMC and Chevrolet share platforms, so a Sierra and a Silverado are the same job under the dash. The trucks are frequently work vehicles where two or three people need a key, and adding fobs while we are already at the vehicle is far cheaper than calling us back. Older GM systems with a security wait are common and we plan the visit around them.',
  volvo:
    'Volvo is a make where the model year matters enormously. Older Volvos are straightforward for us; several of the newer platforms have security architecture that genuinely restricts key origination outside the dealer network. We give you that answer on the phone with your year and VIN, because a wasted call-out is worse for us than a booking we turned down.',
  mitsubishi:
    'Mitsubishi is a smaller share of what we do, which means we ask more questions before booking rather than fewer. Outlander and Lancer are the two we see, and both are usually straightforward for adding a key. Where a particular year needs equipment we would have to source, we say so upfront instead of arriving and discovering it.',
};
