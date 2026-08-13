// ── Minecraft mechanics glossary ─────────────────────────────────────────────
// Every numeric claim in here is taken from the Minecraft Wiki (Java Edition)
// or from a QuercusCraft post that derives it, and is cited in `source`.
// Please keep it that way — this page exists to be the reliable reference the
// build pages link into, so a wrong number here poisons the whole site.

export interface GlossaryFact {
	label: string;
	value: string;
}

export interface GlossaryRef {
	label: string;
	href: string;
}

export interface GlossaryItem {
	count: number;
	name: string;
}

export interface GlossaryEntry {
	/** Anchor id — deep-linked as /glossary#<slug>. */
	slug: string;
	term: string;
	/** One-sentence answer, written to stand alone as a search snippet. */
	short: string;
	body: string[];
	facts?: GlossaryFact[];
	/** Build materials, where the term describes something you construct. */
	items?: { heading: string; list: GlossaryItem[] };
	/** Pages on this site that use the term. */
	referencedIn?: GlossaryRef[];
	source: string;
}

export const glossary: GlossaryEntry[] = [
	{
		slug: 'tick',
		term: 'Minecraft Tick',
		short:
			'A tick is one step of the Minecraft game loop. The game targets 20 ticks per second, so one tick is 0.05 seconds — 50 milliseconds.',
		body: [
			'Almost everything in Minecraft is scheduled in ticks rather than in seconds: block updates, mob AI, redstone, hopper transfers, crop growth and item despawn timers are all counted in ticks. When a wiki page or a farm rate says something happens "every 8 ticks", it means eight steps of that loop, not a fraction of a second.',
			'The 20-per-second figure is a target, not a guarantee. If the game or the server cannot process a tick fast enough, the ticks-per-second rate drops and every tick-based system slows down with it. This is why the same farm can produce different hourly rates on two different machines while behaving identically in game terms — the farm has not changed, the clock has.',
			'That distinction matters enormously for measurement. A rate quoted "per hour" silently depends on the conditions it was recorded under, whereas a rate quoted per tick is reproducible anywhere.'
		],
		facts: [
			{ label: 'Target rate', value: '20 ticks per second' },
			{ label: 'One tick', value: '0.05 seconds (50 ms)' },
			{ label: 'Under load', value: 'TPS drops; ticks take longer in real time' },
			{ label: 'One in-game day', value: '24,000 ticks' }
		],
		referencedIn: [
			{ label: 'Etho Hour — standardising time in Minecraft', href: '/blog/etho-hour' },
			{ label: 'Bamboo Comparisons — rates measured per tick', href: '/builds/bamboo-comparisons' }
		],
		source: 'Minecraft Wiki — Tick'
	},
	{
		slug: 'redstone-tick',
		term: 'Redstone Tick',
		short:
			'A redstone tick is a delay of two game ticks — one tenth of a second at full speed.',
		body: [
			'Redstone components are usually described in redstone ticks rather than game ticks, which is a common source of confusion when reading timings: a delay given as "2 ticks" means two game ticks in one context and four game ticks in another.',
			'When you see a timing on this site, it is in game ticks unless it explicitly says otherwise.'
		],
		facts: [
			{ label: 'One redstone tick', value: '2 game ticks' },
			{ label: 'In real time', value: '0.1 seconds at 20 TPS' }
		],
		source: 'Minecraft Wiki — Tick'
	},
	{
		slug: 'random-tick',
		term: 'Random Tick',
		short:
			'A random tick is an update given to randomly chosen blocks each game tick. It is what drives plant growth, including bamboo.',
		body: [
			'Each game tick, the game picks a number of block positions at random from every subchunk and gives those blocks a random tick. A block only grows, spreads or decays when it happens to be selected, which is why plant growth is a statistical average rather than a fixed timer.',
			'The number of positions chosen per subchunk is controlled by the <code>randomTickSpeed</code> game rule, which defaults to 3 in Java Edition. Raising it speeds up every random-tick-driven process at once, which is useful for testing a farm quickly but makes any rate you record incomparable with a default world.'
		],
		facts: [
			{ label: 'Game rule', value: 'randomTickSpeed' },
			{ label: 'Java default', value: '3 blocks per subchunk per tick' },
			{ label: 'Drives', value: 'Crop and bamboo growth, leaf decay, ice melting' }
		],
		referencedIn: [
			{ label: 'Bamboo Comparisons', href: '/builds/bamboo-comparisons' }
		],
		source: 'Minecraft Wiki — Tick'
	},
	{
		slug: 'bamboo',
		term: 'Bamboo',
		short:
			'Bamboo grows to a maximum height of 12–16 blocks, chosen at random per plant, and at the default random tick speed each plant grows roughly once every 4,096 game ticks — about 204.8 seconds.',
		body: [
			'Bamboo is the fastest-growing plant available for automation in vanilla Minecraft, which is what makes it the standard fuel and scaffolding crop for large farms. Its growth is driven entirely by random ticks, so a plant does not grow on a fixed schedule — 4,096 ticks is the average interval, not a timer you can rely on for any single stalk.',
			'The maximum height is decided per plant rather than globally. Two stalks planted side by side can top out four blocks apart, which is why farm designs have to harvest at a fixed height rather than waiting for plants to finish.',
			'Bone meal bypasses the wait, adding 1–2 blocks of height per use. Bamboo can be planted on grass, dirt, coarse dirt, rooted dirt, gravel, sand, red sand, mud, podzol, mycelium, moss and several related blocks.'
		],
		facts: [
			{ label: 'Maximum height', value: '12–16 blocks, random per plant' },
			{ label: 'Average growth', value: 'once per ~4,096 game ticks (~204.8 s) at randomTickSpeed 3' },
			{ label: 'Bone meal', value: 'Adds 1–2 blocks of height' },
			{ label: 'Growth driver', value: 'Random ticks' }
		],
		referencedIn: [
			{ label: 'Bamboo Comparisons — five farms measured', href: '/builds/bamboo-comparisons' },
			{ label: 'Detector Rail Bamboo Farm', href: '/builds/detector-bamboo-farm' }
		],
		source: 'Minecraft Wiki — Bamboo'
	},
	{
		slug: 'etho-hopper-clock',
		term: 'Etho Hopper Clock',
		short:
			'An Etho hopper clock is a timing circuit made from two hoppers facing each other with items passing between them. Its cycle length is 8x − 6 game ticks, where x is the number of items inside it.',
		body: [
			'Named after the Minecraft YouTuber Etho, who popularised the design, it is one of the most precise timers available in vanilla. Each successful hopper transfer starts an 8-tick cooldown, so the number of items in the clock sets the period directly and predictably.',
			'Because hopper cooldowns are counted in game ticks rather than real time, the clock slows down and speeds up in lock-step with the game itself. That makes it lag-resistant: it measures the same number of ticks whether the server is running at 20 TPS or 12.'
		],
		facts: [
			{ label: 'Cycle length', value: '8x − 6 game ticks (x = item count)' },
			{ label: 'Hopper cooldown', value: '8 ticks per transfer' },
			{ label: 'Behaviour under lag', value: 'Tick-accurate; dilates with the game' }
		],
		items: {
			heading: 'What you need to build one',
			list: [
				{ count: 2, name: 'Pistons' },
				{ count: 1, name: 'Redstone block' },
				{ count: 2, name: 'Comparators' },
				{ count: 2, name: 'Hoppers' },
				{ count: 2, name: 'Redstone dust' },
				{ count: 2, name: 'Solid blocks' }
			]
		},
		referencedIn: [{ label: 'Etho Hour — the full write-up', href: '/blog/etho-hour' }],
		source: 'QuercusCraft — Etho Hour'
	}
];
