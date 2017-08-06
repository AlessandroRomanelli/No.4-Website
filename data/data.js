// 0 = COMPLETE, 1 = ONGOING, 2 = COMING UP, 3 = TBA

const operations = [
  {
    id: "predeployment",
    img: "img/thumbnails/scotland.jpg",
    title: "Pre-Deployment",
    date: "Between campaigns",
    description: "The unit undergoes periods of intensive training to perfect and fine-tune its elements. Commandos trained in the Scottish Highlands before being deployed in any of their major campaigns.",
    status: 1
  },
  {
    id: "poland",
    img: "img/thumbnails/poland.jpg",
    title: "Polish Campaign",
    date: "1st September — 6th October 1939",
    description: "Nazi Germany invaded Poland in late '39. British Commandos were deployed in Poland to lay groundwork for the greater British Expeditionary Force to step in. The BEF never got there: the opening of a second, opposite front by the Soviets caused the Commandos evaucation and Poland's surrender.",
    status: 0
  },
  {
    id: "finland",
    img: "img/thumbnails/finland.jpg",
    title: "Finnish Campaign",
    date: "30th November 1939 — 13th March 1940",
    description: "When the Soviets invaded Finland in the late '40, the British Commandos were immediately dispatched to help the Finnish Troops. By the time a bigger Franco-British force could be deployed the war was already over: the Soviets had won but that came at a price of heavy casualties.",
    status: 0
  },
  {
    id: "norway",
    img: "img/thumbnails/norway.jpg",
    title: "Norwegian Campaign",
    date: "9th April — 10th June 1940",
    description: "British and French forces came to Norway's aid with an expeditionary force in early April. Despite the successes of the Commandos in the northern regions, German forces eventually took over the country in 62 days. Once again the German Army had proved their strength and ruthlessness.",
    status: 0
  },
  {
    id: "france",
    img: "img/thumbnails/france.jpg",
    title: "Invasion of France",
    date: "10th May — 25th June 1940",
    description: "Allies were all caught by surprise when the German Army unexpectedly pushed through and conquered the Netherlands, Luxemburg and Belgium and attacked the French front on their less covered side. The BEF fought bravely through the Ardennes but was forced to retreat to Dunkirk and leave the mainland.",
    status: 0
  },
  {
    id: "africa",
    img: "img/thumbnails/africa.jpg",
    title: "Libyan Desert Campaign",
    date: "10th June 1940 — 13th May 1943",
    description: "The Italians sided with Germany and declared war on the Allies, a few days later the British Army was already crossing the border from Egypt into Lybia, where Italy had its colonial interests. It was the start of a series of brutal fights, before the formidable Deutsches Afrika Korps stepped in, led by Erwin Rommel, known as 'The Desert Fox'.",
    status: 1
  },
  {
    id: "svalbard",
    img: "img/thumbnails/africa.jpg",
    title: "Svalbard Islands Campaign",
    date: "January - February 1941",
    description: "After the Germans started ambushing the British convoys in the North Sea, the No.4 Commandos had been dispatched to the Svalbard archipelago, where the u-boats were suspected to resupply from. The No.4 deployed deep within enemy territory and conducted a guerilla warfare aimed to weaken the German presence before the Canadians' arrival.",
    status: 0
  },
  {
    id: "greece",
    img: "img/thumbnails/africa.jpg",
    title: "Battle of Greece",
    date: "May 1941 — April 1941",
    description: "Allies were all caught by surprise when the German Army unexpectedly pushed through and conquered the Netherlands, Luxemburg and Belgium and attacked the French front on their less covered side. The BEF fought bravely through the Ardennes but was forced to retreat to Dunkirk and leave the mainland.",
    status: 2
  },
  {
    id: "italy",
    img: "img/thumbnails/italy.jpg",
    title: "Italian Campaign",
    date: "10th July 1943 — 2nd May 1945",
    description: "Starting with the invasion of Sicily, the Italian campaign was carried out by the Allied coalition and led to the arrest of Benito Mussolini, known as 'Il Duce' or 'Dux' and Italy's surrender. The Axis lost a valuable ally in the war but it still wasn't giving up on the buffer ground that Italy represented, hence the German occupation of Italy began.",
    status: 3
  },
  {
    id: "western",
    img: "img/thumbnails/western.jpg",
    title: "Western Europe Campaign",
    date: "6 June 1944 — 8 May 1945",
    description: "The second part of the Western Campaign takes place years after the capitulation of France and sees the Allies making their comeback. Starting off from the Normandy's landings, back through France, Belgium, the Netherlands and all the way to Berlin where the German Army prepared its last stand.",
    status: 3
  },
  {
    id: "eastern",
    img: "img/thumbnails/eastern.jpg",
    title: "Eastern Europe Campaign",
    date: "22nd June 1941 — 9th May 1945",
    description: "The Eastern Front was active throughout most of the war. The UK took initially part to the fight only in the form of Lend-Lease programmes but later decided to secretly send the Commandos to turn the tides in the Soviets' favor.",
    status: 3
  },
];

const weapons = [
  {
    img: "img/enfield.jpg",
    name: "SMLE No. 4 Mk. I",
    title: "British Standard Rifle",
    description: "This is the standard issue rifle, it fires a .303 bullet and has an internal 10-round magazine that is reloaded via stripper clip. Effective up to 500m.",
  },
  {
    img: "img/sniper.jpg",
    name: "SMLE No. 4 Mk. I (T)",
    title: "Designated Marksman Rifle",
    description: "Designated Marksman Rifle', data-content='Identical to the SMLE No. 4 Mk. I except that this variant is issued to marksmen and is fitted with a 3x telescopic sight for better accuracy at range. Effective up to 700m.",
  },
  {
    img: "img/bazooka.jpg",
    name: "M1 Bazooka",
    title: "Anti-Tank Launcher",
    description: "Used by the Commandos to fight off armored vehicles or tanks but can also be used to destroy fortified positions and such. It fires a 60mm HEAT M6 rocket. Effective range is 200m, after this range the rocket is still lethal however not anymore accurate.",
  },
  {
    img: "img/bren.jpg",
    name: "Bren Mk.II",
    title: "Light Machine Gun",
    description: "This beast can deliver continuous fire without overheating as fast. It fires a .303 cartridge and is fed by a particular top-mounted 30-round detachable box magazine. Effective up to 500m.",
  },
  {
    img: "img/1919.jpg",
    name: "Browning M1919",
    title: "Heavy Machine Gun",
    description: "A .30 caliber widely used among allied forces. Considerably more powerful than the standard Bren gun when it comes to suppressive fire. The M1919 fits both 50 and 100 rounds magazine and can also be deployed on a static tripod to achieve maximum effect.",
  },
  {
    img: "img/1929.jpg",
    name: "Thompson M1928",
    title: "Sub Machine Gun",
    description: "The first SMG that the UK adopted during WW2 as part of a lend-lease program with the US. Expensive and likely to jam, it was replaced by the Sten in the late stages of the war. It can fit a 30 rounds .45 magazine or a drum mag capable of holding 50 rounds. It has little recoil and a good fire rate. Accurate up to 200m",
  },
  {
    img: "img/sten.jpg",
    name: "Sten Mk.II",
    title: "Sub Machine Gun",
    description: "The standard issue full automatic 9mm SMG of the British Expeditionary Force during the late war, it comes with an unique side-mounted 32-round detachable box magazine. A suppressor can be mounted to silence the gun for stealth operations. Effective at close range.",
  },
  {
    img: "img/stenMkV.jpg",
    name: "Sten Mk.V",
    title: "Sub Machine Gun",
    description: "This weapon is the paratrooper variant of the Sten Gun and is carried by some Commandos during, you guessed it, airborne operations.",
  },
];

module.exports.operations = operations;
module.exports.weapons = weapons;
