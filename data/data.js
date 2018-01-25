// 0 = COMPLETE, 1 = ONGOING, 2 = COMING UP, 3 = TBA

const operations = [
  {
    id: "predeployment",
    img: "img/thumbnails/scotland.jpg",
    title: "Pre-Deployment",
    date: "Between campaigns",
    description:
      "The unit undergoes periods of intensive training to perfect and fine-tune its elements. Commandos trained in the Scottish Highlands before being deployed in any of their major campaigns.",
    status: 0
  },
  {
    id: "poland",
    img: "img/thumbnails/poland.jpg",
    title: "Polish Campaign",
    date: "1st September — 6th October 1939",
    description:
      "Nazi Germany invaded Poland in late '39. British Commandos were deployed in Poland to lay groundwork for the greater British Expeditionary Force to step in. The BEF never got there: the opening of a second, opposite front by the Soviets caused the Commandos evaucation and Poland's surrender.",
    status: 0
  },
  {
    id: "finland",
    img: "img/thumbnails/finland.jpg",
    title: "Finnish Campaign",
    date: "30th November 1939 — 13th March 1940",
    description:
      "When the Soviets invaded Finland in the late '40, the British Commandos were immediately dispatched to help the Finnish Troops. By the time a bigger Franco-British force could be deployed the war was already over: the Soviets had won but that came at a price of heavy casualties.",
    status: 0
  },
  {
    id: "norway",
    img: "img/thumbnails/norway.jpg",
    title: "Norwegian Campaign",
    date: "9th April — 10th June 1940",
    description:
      "British and French forces came to Norway's aid with an expeditionary force in early April. Despite the successes of the Commandos in the northern regions, German forces eventually took over the country in 62 days. Once again the German Army had proved their strength and ruthlessness.",
    status: 0
  },
  {
    id: "france",
    img: "img/thumbnails/france.jpg",
    title: "Invasion of France",
    date: "10th May — 25th June 1940",
    description:
      "Allies were all caught by surprise when the German Army unexpectedly pushed through and conquered the Netherlands, Luxemburg and Belgium and attacked the French front on their less covered side. The British Expeditionary Forces fought bravely through the Ardennes but was forced to retreat to Dunkirk and leave the mainland.",
    status: 0
  },
  {
    id: "africa",
    img: "img/thumbnails/africa.jpg",
    title: "Libyan Desert Campaign",
    date: "10th June 1940 — 13th May 1943",
    description:
      "The Italians sided with Germany and declared war on the Allies, a few days later the British Army was already crossing the border from Egypt into Lybia, where Italy had its colonial interests. It was the start of a series of brutal fights, before the formidable Deutsches Afrika Korps stepped in, led by Erwin Rommel, known as 'The Desert Fox'.",
    status: 4
  },
  {
    id: "svalbard",
    img: "img/thumbnails/svalbard.jpg",
    title: "Svalbard Islands Campaign",
    date: "January - February 1941",
    description:
      "After the Germans started ambushing the British convoys in the North Sea, the No.4 Commandos had been dispatched to the Svalbard archipelago, where the u-boats were suspected to resupply from. The No.4 deployed deep within enemy territory and conducted a guerilla warfare aimed to weaken the German presence before the Canadians' arrival.",
    status: 0
  },
  {
    id: "greece",
    img: "img/thumbnails/greece.jpg",
    title: "Battle of Greece",
    date: "March 1941 — April 1941",
    description:
      "Also known as Operation Marita, it's the common name for the invasion of Allied Greece by Italy and Nazi Germany. The Italians began in late 1940 with an invasion which was followed months later by a German one, on a different front. The Greeks found themselves outnumbered and surrounded, their only hope was a special English detachment.",
    status: 0
  },
  {
    id: "pacific",
    img: "img/thumbnails/pacific.jpg",
    title: "Pacific Campaign",
    date: "December 1941 — September 1945",
    description:
      "The Pacific War itself began when Japan invaded Thailand and attacked the British possessions of Malaya, Singapore, and Hong Kong as well as the United States military and naval bases, such as Pearl Harbor. Commonwealth troops from Australia and the Raj along with Mainland forces were deployed to defend the colony of British Malaya and other allied territories from Japanese aggression.",
    status: 1
  },
  {
    id: "italy",
    img: "img/thumbnails/italy.jpg",
    title: "Italian Campaign",
    date: "10th July 1943 — 2nd May 1945",
    description:
      "Starting with the invasion of Sicily, the Italian campaign was carried out by the Allied coalition and led to the arrest of Benito Mussolini, known as 'Il Duce' or 'Dux' and Italy's surrender. The Axis lost a valuable ally in the war but it still wasn't giving up on the buffer ground that Italy represented, hence the German occupation of Italy began.",
    status: 3
  },
  {
    id: "western",
    img: "img/thumbnails/western.jpg",
    title: "Western Europe Campaign",
    date: "6 June 1944 — 8 May 1945",
    description:
      "The second part of the Western Campaign takes place years after the capitulation of France and sees the Allies making their comeback. Starting off from the Normandy's landings, back through France, Belgium, the Netherlands and all the way to Berlin where the German Army prepared its last stand.",
    status: 3
  },
  {
    id: "eastern",
    img: "img/thumbnails/eastern.jpg",
    title: "Eastern Europe Campaign",
    date: "22nd June 1941 — 9th May 1945",
    description:
      "The Eastern Front was active throughout most of the war. The UK took initially part to the fight only in the form of Lend-Lease programmes but later decided to secretly send the Commandos to turn the tides in the Soviets' favor.",
    status: 3
  }
];

const weapons = [
  {
    img: "img/arsenal/enfield.jpg",
    name: "SMLE No. 4 Mk. I",
    title: "British Standard Rifle",
    description:
      "This is the standard issue rifle, it fires a .303 bullet and has an internal 10-round magazine that is reloaded via stripper clip. Effective up to 500m. Marksman mount a telescopic 3x optic on top of their rifles to increase the effective range and accuracy."
  },
  {
    img: "img/arsenal/piat.jpg",
    name: "Projector, Infantry, Anti Tank (PIAT)",
    title: "Anti-Tank Launcher",
    description:
      "Used by the Commandos to fight off armored vehicles or tanks but can also be used to destroy fortified positions and such. It fires a 2.5 pound hollow chrage. Effective range is limited to 100m, past this distance the weapon accuracy is unreliable but the charge can travel up to 300m."
  },
  {
    img: "img/arsenal/bren.jpg",
    name: "Bren Mk.II",
    title: "Light Machine Gun",
    description:
      "This beast can deliver continuous fire without overheating as fast. It fires a .303 cartridge and is fed by a particular top-mounted 30-round detachable box magazine. Effective up to 500m."
  },
  // {
  //   img: "img/arsenal/vickers.jpg",
  //   name: "Vickers MG",
  //   title: "Static Machine Gun",
  //   description:
  //     "A .30 caliber widely used among the British armored, air and infantry forces. Famous for its great solidity and reliability. Considerably more capable than the Bren gun when it comes to suppressing the enemy for an extended amount of time. The Vickers fits large magazines capable of holding hundred of bullets but it comes to the cost of not being able to be fired without being fully deployed."
  // },
  {
    img: "img/arsenal/m1919.jpg",
    name: "M1919 Browning",
    title: "Static Machine Gun",
    description:
      "A .30 caliber medium machine gun that was widely used during the 20th century, especially during World War II by the US Forces, but also by British Forces as part of the Lend-Lease program which saw the M1919 side by side with the MG Vickers. Its 50-Rounds magazines can keep the enemy suppressed for a long time if used properly. Must be carried around by a two-man machine gun team."
  },
  {
    img: "img/arsenal/thompson.jpg",
    name: "Thompson M1928",
    title: "Sub Machine Gun",
    description:
      "The first SMG that the UK adopted during WW2 as part of a lend-lease program with the US. Expensive and likely to jam, it was replaced by the Sten gun as soon as it entered production. It can fit a 30 rounds .45 magazine or a drum mag capable of holding 50 rounds. It has little recoil and a good fire rate. Accurate up to 200m"
  },
  {
    img: "img/arsenal/sten.jpg",
    name: "Sten Mk.II",
    title: "Sub Machine Gun",
    description:
      "The standard issue full automatic 9mm SMG of the British Expeditionary Force during the late war, it comes with an unique side-mounted 32-round detachable box magazine. A suppressor can be mounted to silence the gun for stealth operations. Effective at close range."
  },
  {
    img: "img/arsenal/flamethrower.jpg",
    name: "M1 Flamethrower",
    title: "Special Weapon",
    description:
      "Flamethrowers saw very little usage in the Europe theater but they had been largely used in the Pacific, after the involvement of the US in the war against the Japanese Empire. It proved itself a worthy allied when assaulting pillboxes and fortifications."
  },
  {
    img: "img/arsenal/mortar.jpg",
    name: "Ordnance ML 3-Inch Mortar",
    title: "Muzzle-loaded, drop-fired Mortar",
    description:
      "The British Infantry sought some sort of quick-reacting artillery for close support, hence the development of the 3-Inch Mortar, which was introduced in the '30s and saw action since the very beginning of the war. It's able to fire HE, Smoke as well as Illumination rounds."
  },
  {
    img: "img/arsenal/explosives.jpg",
    name: "Explosives",
    title: "Demolition Means",
    description:
      "The unit's sappers are equipped with a vast array of explosives, ranging from fixed charges, to anti-tank and anti-personnel mines, the first ones can be triggered by detonators or fuses, while the latters can be triggered by pressure plates. Useful for setting up ambushes or clearing the path from obstacles."
  },
  {
    img: "img/arsenal/spitfire.jpg",
    name: "Supermarine Spitfire",
    title: "Mk.II (CAP) & Mk. VIII (CAS)",
    description:
      "The iconic Supermarine Spitfire is the workhorse of the Royal Air Force detachment assigned to the No.4 Commandos, Able Flight. It comes in two different versions, a light armed version with 8x .303 Brownings and a ground strike version, armed with two 20mm AP & HE cannons, 4x .303 Brownings and a 250kg bomb."
  }
];

const awards = [
  {
    title: "Victoria Cross Medal",
    text:
      'The Victoria Cross is the highest award of the United Kingdom honours system. It is awarded for gallantry "in the face of the enemy" to members of the British armed forces. It may be awarded posthumously.'
  },
  {
    title: "Distinguished Service Cross",
    text:
      "The Distinguished Service Cross is a third level military decoration awarded to the British Armed Forces, Royal Fleet Auxiliary and British Merchant Navy and formerly also to officers of other Commonwealth countries."
  },
  {
    title: "Distinguished Flying Cross",
    text:
      "The Distinguished Flying Cross is the third-level military decoration awarded to personnel of the United Kingdom's Royal Air Force and other services, and formerly to officers of other Commonwealth countries, instituted for \"an act or acts of valour, courage or devotion to duty whilst flying in active operations against the enemy."
  },
  {
    title: "General Service Medal",
    text:
      "The General Service Medal was instituted to recognise service in minor Army and Air Force operations for which no separate medal was intended."
  },
  {
    title: "Meritorious Service Medal",
    text:
      "The Meritorious Service Medal  is a military award presented to members of the British Armed Forces who distinguished themselves by outstanding meritorious achievement or service to the British Army."
  },
  {
    title: "Air Medal",
    text:
      'The Air Force Medal was a military decoration, awarded to personnel of the Royal Air Force (United Kingdom) and other services, and formerly also to personnel of other Commonwealth countries, for "an act or acts of valour, courage or devotion to duty whilst flying in active operations against the enemy".'
  },
  {
    title: "War Medal",
    text:
      "The War Medal 1939–1945 is a campaign medal which was instituted by the United Kingdom on 16 August 1945, for award to subjects of the British Commonwealth who had served full-time in the Armed Forces or the Merchant Navy for at least 28 days between 3 September 1939 and 2 September 1945."
  },
  {
    title: "Artic Star",
    text:
      "The Arctic Star is a military campaign medal which was instituted by the United Kingdom for award to subjects of the British Commonwealth for service in the Second World War, specifically those who served on the Arctic Convoys north of the Arctic Circle."
  },
  {
    title: "Italy Star",
    text:
      "The Italy Star is a military campaign medal, instituted by the United Kingdom in May 1945 for award to subjects of the British Commonwealth who served in the Second World War, specifically in the Italian Campaign from 1943 to 1945."
  },
  {
    title: "France and Germany Star",
    text:
      "The France and Germany Star was awarded for entry into operational service in France, Belgium, Luxembourg, Holland and Germany between 6 June 1944 and 8 May 1945."
  },
  {
    title: "Pacific Star",
    text:
      "The Pacific Star is a military campaign medal instituted by the United Kingdom in May 1945 for award to subjects of the    British Commonwealth who served in the Second World War, specifically in the Pacific Campaign from 1941 to 1945."
  },
  {
    title: "Africa Star",
    text:
      "The Africa Star is a military campaign medal, instituted by the United Kingdom for award to subjects of the British Commonwealth who served in the Second World War, specifically in North Africa between 10 June 1940 and 12 May 1943 inclusive."
  }
];

module.exports.operations = operations;
module.exports.weapons = weapons;
module.exports.awards = awards;
