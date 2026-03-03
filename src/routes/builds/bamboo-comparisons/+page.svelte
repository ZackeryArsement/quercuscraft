<script lang="ts">
	import PostLayout from '$lib/components/posts/PostLayout.svelte';
	import WorldDownloadFooter from '$lib/components/posts/WorldDownloadFooter.svelte';
	import type { NavSection } from '$lib/components/posts/PostLayout.svelte';
	import { builds } from '$lib/data/builds';
	const build = builds.find(b => b.href === '/builds/bamboo-comparisons')!;

	// ── Images ───────────────────────────────────────────────────────────────
	import heroImg            from '$lib/assets/posts/worldPages/bambooComparison/BRICK_DETECTOR.webp';
	import prelimImg          from '$lib/assets/posts/worldPages/bambooComparison/PrelimBambooTest.webp';
	import bambooPerTickImg   from '$lib/assets/posts/worldPages/bambooComparison/BambooPerTick.webp';
	import singleFlyingImg    from '$lib/assets/posts/worldPages/bambooComparison/SINGLE_CHUNK_FLYING.webp';
	import threeFlyingImg     from '$lib/assets/posts/worldPages/bambooComparison/THREE_CHUNK_FLYING.webp';
	import originalFarmImg    from '$lib/assets/posts/worldPages/bambooComparison/ORIGINAL_FARM.webp';
	import altFarmImg         from '$lib/assets/posts/worldPages/bambooComparison/ALTERNATING_FARM.webp';
	import topTimedImg        from '$lib/assets/posts/worldPages/bambooComparison/TOP_TIMED.webp';
	import sideTimedImg       from '$lib/assets/posts/worldPages/bambooComparison/SIDE_TIMED.webp';
	import threeTimedImg      from '$lib/assets/posts/worldPages/bambooComparison/THREE_TIMED.webp';
	import topDetectorImg     from '$lib/assets/posts/worldPages/bambooComparison/TOP_DETECTOR.webp';
	import sideDetectorImg    from '$lib/assets/posts/worldPages/bambooComparison/SIDE_DETECTOR.webp';
	import oneChunkTotalImg   from '$lib/assets/posts/worldPages/bambooComparison/1ChunkTotal.webp';
	import threeChunkTotalImg from '$lib/assets/posts/worldPages/bambooComparison/3ChunkTotal.webp';
	import perTileImg         from '$lib/assets/posts/worldPages/bambooComparison/PerTile.webp';
	import totalBambooImg     from '$lib/assets/posts/worldPages/bambooComparison/TotalBamboo.webp';
	import totalBambooSpecImg from '$lib/assets/posts/worldPages/bambooComparison/TotalBambooSpecifics.webp';

	// ── Sidebar nav ──────────────────────────────────────────────────────────
	const navSections: NavSection[] = [
		{ id: 'intro',           label: 'Introduction' },
		{ id: 'how-bamboo-grows', label: 'How Bamboo Grows' },
		{
			id: 'farm-comparisons',
			label: 'Farm Comparisons',
			sub: [
				{ id: 'flying-machine',       label: 'Flying Machine' },
				{ id: 'observer-piston',      label: 'Observer-Piston' },
				{ id: 'observer-piston-alt',  label: 'Alt Observer-Piston' },
				{ id: 'timed-farm',           label: 'Timed Farm' },
				{ id: 'detector-rail',        label: 'Detector Rail Farm' }
			]
		},
		{ id: 'results',  label: 'Results' },
		{ id: 'download', label: 'World Download' }
	];
</script>

<svelte:head>
	<title>Bamboo Comparisons — QuercusCraft</title>
	<meta name="description" content="A head-to-head comparison of five bamboo farm designs in vanilla Minecraft — including two original farms never documented before — measuring lag, output, and resource efficiency." />
</svelte:head>

<PostLayout
	title="Bamboo Comparisons"
	heroSrc={heroImg}
	heroAlt="The detector rail bamboo farm — the most resource-efficient design in this comparison"
	{navSections}
	youtubeUrl={build.youtubeUrl}
>

	<!-- ── Introduction ──────────────────────────────────────────────────── -->
	<section id="intro" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Introduction</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">Finding the Most Efficient Bamboo Farm</h2>

			<div class="space-y-5 text-2xl leading-relaxed text-stone-300">
				<p>
					I set out with a clear goal: find the most efficient bamboo farm in Minecraft —
					not just by raw output, but by three factors that actually matter to a survival player.
					Lag impact, bamboo output per volume used, and total resource cost.
					Most comparisons you'll find online focus on a single metric and call it done.
					I wanted the full picture.
				</p>
				<p>
					What I found along the way surprised me. In the process of designing and testing,
					I stumbled across two bamboo farm designs that, as far as I can tell, have never
					been documented anywhere before. This post covers five farms — two popular
					existing designs, one variant on a classic, and my two originals.
				</p>
				<p>
					I'll show you why you shouldn't build one of my farms, and why one of the
					most widely recommended designs isn't as efficient as its reputation suggests.
				</p>
				<p>
					One of those original designs has since been refined well beyond what's tested here.
					The full, optimised version now stands as a legitimate heavyweight in the bamboo farm
					world — and you can find that dedicated build post linked below. Consider this the
					story of how it got there.
				</p>
				<p>
					The numbers below give you an idea of how effective each farm is, but they don't tell
					the full story. Keep reading to find out the best farm to use!
				</p>
			</div>

			<figure class="mx-auto mt-10 w-4/5">
				<img
					src={oneChunkTotalImg}
					alt="The preliminary bamboo farm test setup used across all five comparison runs in a chunk"
					class="w-full"
				/>
				<figcaption class="mt-3 text-center text-xs text-stone-600">
					The preliminary bamboo outputs used across all five comparison runs in a chunk. Where 12/40
					are timed farms using Etho-Hopper Clock and OG is Observer-Piston Farm
				</figcaption>
			</figure>
		</div>
	</section>

	<!-- ── How Bamboo Grows ───────────────────────────────────────────────── -->
	<section id="how-bamboo-grows" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Mechanics</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">How Bamboo Grows</h2>

			<div class="space-y-5 text-2xl leading-relaxed text-stone-300">
				<p>
					Before comparing designs, it's worth understanding the mechanic that every bamboo
					farm lives and dies by. On every game tick — and Minecraft runs at 20 ticks per
					second — the game randomly selects 3 blocks from within a 16×16×16 chunk volume.
					If any of those randomly selected blocks happens to be a bamboo shoot with open
					air directly above it, that bamboo grows by one block.
				</p>
				<p>
					The implication for farm design is significant. A farm that fills its chunk volume
					as densely as possible with bamboo shoots maximises the probability that any given
					random tick lands on a harvestable plant. A farm that fills the same volume with
					mechanical components, empty buffer space, or transit tracks is effectively wasting
					random ticks on blocks that don't grow.
				</p>
				<p>
					Every design in this comparison was evaluated with that trade-off in mind: how much
					of the 16×16×16 volume is productive bamboo, and how much is overhead?
				</p>
			</div>

			<figure class="mx-auto mt-10 w-4/5">
				<img
					src={bambooPerTickImg}
					alt="Chart showing bamboo growth rate relative to random tick distribution in a chunk"
					class="w-full"
				/>
				<figcaption class="mt-3 text-center text-xs text-stone-600">
					Bamboo growth rate in a subchunk over time as bamboo shoots grow and take up air space
				</figcaption>
			</figure>
		</div>
	</section>

	<!-- ── Farm Comparisons ───────────────────────────────────────────────── -->
	<section id="farm-comparisons" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Comparisons</p>
			<h2 class="mb-12 text-center text-3xl font-bold text-white">Farm Comparisons</h2>

			<!-- Flying Machine -->
			<div id="flying-machine" class="mb-20 scroll-mt-24">
				<h3 class="mb-6 text-center text-xl font-semibold text-green-400">Flying Machine</h3>
				<div class="space-y-4 text-2xl leading-relaxed text-stone-300">
					<p>
						The flying machine farm is one of the most visually impressive bamboo designs in
						the community. A slime-block flying machine sweeps back and forth
						across a field of bamboo, shearing stalks as it passes. It scales cleanly to
						multiple chunks, requires no redstone at the individual plant level, and looks
						undeniably satisfying in action.
					</p>
					<p>
						The problem reveals itself when you map the design against the surrounding area.
						The build demands space and there's simply no way around it. On top of this, flying machines
						are notorious prone to breaking during chunk loading and unloading. Giving them a couple strikes
						dispite their impressive output numbers
					</p>
				</div>

				<div class="mt-8 grid grid-cols-2 gap-4">
					<figure>
						<img
							src={singleFlyingImg}
							alt="Single-chunk flying machine bamboo farm"
							class="w-full"
						/>
						<figcaption class="mt-2 text-center text-xs text-stone-600">Single-chunk variant.</figcaption>
					</figure>
					<figure>
						<img
							src={threeFlyingImg}
							alt="Three-chunk flying machine bamboo farm scaled up"
							class="w-full"
						/>
						<figcaption class="mt-2 text-center text-xs text-stone-600">Scaled to three chunks.</figcaption>
					</figure>
				</div>
			</div>

			<!-- Observer-Piston -->
			<div id="observer-piston" class="mb-20 scroll-mt-24">
				<h3 class="mb-6 text-center text-xl font-semibold text-green-400">Observer-Piston</h3>
				<div class="space-y-4 text-2xl leading-relaxed text-stone-300">
					<p>
						The observer-piston farm is the most common bamboo design you'll encounter in
						survival worlds and tutorial videos. Each bamboo stalk gets its own dedicated
						observer watching for growth — when the stalk grows by one block, the
						observer quasi-powers a piston under and behind it for harvesting.
					</p>
					<p>
						The design is reliable and genuinely self-contained. Every stalk manages its own
						harvest cycle pseudo-independently, with no timing and minimal cross-plant coordination required.
						It's straightforward to build, trivial to tile, and it works. The trade-off is
						resource cost: one observer per stalk adds up fast, and the observer density
						makes this design one of the most expensive to build at scale.
					</p>
					<p>
						Output per tile is decent but not exceptional. Because each stalk reacts
						immediately to every growth event, there's no wasted bamboo sitting on the ground —
						but the component overhead means fewer stalks fit within the same chunk volume
						compared to lighter designs. This may not seem like a huge issue, but it's actually
						the achilles heal of the entire design.
					</p>
					<p>
						More on that later.
					</p>
				</div>

				<figure class="mx-auto mt-8 w-4/5">
					<img
						src={originalFarmImg}
						alt="Original observer-piston bamboo farm design"
						class="w-full"
					/>
					<figcaption class="mt-3 text-center text-xs text-stone-600">
						The standard observer-piston design as tested.
					</figcaption>
				</figure>
			</div>

			<!-- Observer-Piston Alt -->
			<div id="observer-piston-alt" class="mb-20 scroll-mt-24">
				<h3 class="mb-6 text-center text-xl font-semibold text-green-400">Alt Observer-Piston</h3>
				<div class="space-y-4 text-2xl leading-relaxed text-stone-300">
					<p>
						The alternating variant attempts to address the observers cost overhead by sharing a single
						observer for every 2 pistons, firing the piston underneath and three pisonts behind
						rather than dedicating one to each plant. On paper this nearly halves the component
						count while preserving the event-driven harvesting model.
					</p>
					<p>
						In practice there's no output gains but instead resource reductions. The shared timing introduces 
						small windows where a stalk can grow and not be immediately detected — depending on
						which row the piston last fired, you may miss one growth event per cycle. Because some tiles
						don't have a piston, a fully grown bamboo may sit there and wait until it's neighbor who does have
						an observer finally grows.
					</p>
					<p>
						Resource savings are genuine, but output per tile decreases, with tiles per chunk increasing. This
						ends up meaning you get identical rates for less resource input.
					</p>
				</div>

				<figure class="mx-auto mt-8 w-4/5">
					<img
						src={altFarmImg}
						alt="Alternating observer-piston bamboo farm variant"
						class="w-full"
					/>
					<figcaption class="mt-3 text-center text-xs text-stone-600">
						The alternating observer-piston variant — one observer servicing two rows.
					</figcaption>
				</figure>
			</div>

			<!-- Timed Farm -->
			<div id="timed-farm" class="mb-20 scroll-mt-24">
				<h3 class="mb-6 text-center text-xl font-semibold text-green-400">Timed Farm <span class="text-stone-500 text-base font-normal">(Original)</span></h3>
				<div class="space-y-4 text-2xl leading-relaxed text-stone-300">
					<p>
						The timed farm was my first original design, built around a completely different
						philosophy: instead of reacting to individual growth events, use a clock to
						sweep all stalks at once on a fixed interval. I used an etho-clock to fire a
						row of pistons approximately every 15 seconds (40 items), pushing down across an entire
						line of bamboo simultaneously.
					</p>
					<p>
						The advantage is component density. With no observers at the plant level at all,
						you can pack bamboo shoots significantly tighter within the chunk volume. The
						entire harvesting mechanism is centralised into a single clock and piston row,
						rather than distributed across every individual stalk. Per tile, this translates
						to more bamboo growing in the same footprint.
					</p>
					<p>
						The main disadvantage is ironically tied to how efficient this design is.
					</p>
					<p>
						Computing Resource, aka. LAG...
					</p>
					<p>
						Because we can fit so many pisons in a small area, this can come end up firing 256 pistons
						every 15 seconds, which as you can imagine, causing a decent amount of block updates. 
					</p>
					<p>
						This directly translates to noticable latency in your gameplay, especially as you scale the farm up.
					</p>
					
				</div>

				<div class="mt-8 grid grid-cols-2 gap-4">
					<figure>
						<img
							src={topTimedImg}
							alt="Top-down view of the timed bamboo farm"
							class="w-full"
						/>
						<figcaption class="mt-2 text-center text-xs text-stone-600">Top view — the piston row and clock mechanism.</figcaption>
					</figure>
					<figure>
						<img
							src={sideTimedImg}
							alt="Side view of the timed bamboo farm showing the piston sweep"
							class="w-full"
						/>
						<figcaption class="mt-2 text-center text-xs text-stone-600">Side view — pistons firing down through the stalks.</figcaption>
					</figure>
				</div>

				<figure class="mx-auto mt-6 w-4/5">
					<img
						src={threeTimedImg}
						alt="Three timed bamboo farm units tiled side by side"
						class="w-full"
					/>
					<figcaption class="mt-3 text-center text-xs text-stone-600">
						Three tiled units — showing how the design scales horizontally.
					</figcaption>
				</figure>
			</div>

			<!-- Detector Rail Farm -->
			<div id="detector-rail" class="scroll-mt-24">
				<h3 class="mb-6 text-center text-xl font-semibold text-green-400">Detector Rail Farm <span class="text-stone-500 text-base font-normal">(Original)</span></h3>
				<div class="space-y-4 text-2xl leading-relaxed text-stone-300">
					<p>
						The detector rail farm is my second original design, and the one that ultimately
						earned a dedicated post of its own. The concept came from thinking about collection
						differently: what if the same component that triggers the harvest also picks up
						the output?
					</p>
					<p>
						A hopper minecart runs continuously along a loop of powered rails laid down
						throughout the farm. As it passes over detector rails embedded in the track, it
						activates a harvesting mechanism that knocks bamboo down from the stalks on
						either side. The minecart then rolls drops down a lever below the harvest bamboo and collects
						the stalks through the dirt above — no separate collection layer, no ground hoppers, no
						additional infrastructure.
					</p>
					<p>
						The loop is compact, the component count is low, and the minecart covers the
						entire farm continuously rather than waiting for a fixed sweep cycle. Because
						collection and triggering are unified in one moving component, the design is
						lean enough to pack bamboo shoots very densely within the available volume.
					</p>
					<p>
						This version is the prototype. The full build — linked at the bottom of this
						post — has been substantially refined and represents what I believe is one of
						the most resource-efficient bamboo farms currently documented for Minecraft 1.21.
					</p>
				</div>

				<div class="mt-8 grid grid-cols-2 gap-4">
					<figure>
						<img
							src={topDetectorImg}
							alt="Top-down view of the detector rail bamboo farm"
							class="w-full"
						/>
						<figcaption class="mt-2 text-center text-xs text-stone-600">Top view — the minecart track loop and bamboo grid.</figcaption>
					</figure>
					<figure>
						<img
							src={sideDetectorImg}
							alt="Side view of the detector rail bamboo farm"
							class="w-full"
						/>
						<figcaption class="mt-2 text-center text-xs text-stone-600">Side view — the hopper minecart passing beneath the stalks.</figcaption>
					</figure>
				</div>
			</div>
		</div>
	</section>

	<!-- ── Results ────────────────────────────────────────────────────────── -->
	<section id="results" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Data</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">Results</h2>

			<div class="space-y-5 text-2xl leading-relaxed text-stone-300">
				<p>
					With all five designs built and tested under identical conditions, the data told
					a consistent story. The observer-piston farm is far too resource hungry for such little return,
					the timed farm, although the fastest, causes too many block updates in single tick instances,
					and the detector rail farm, at this point in time, couldn't get outputs to match the others. 
				</p>
				<p>
					This left me with a single rational conclusion. 
				</p>
				<p>
					The flying machine is the ULTIMATE bamboo farm.
				</p>
				<p>
					My timed machines were meant to achieve the theoretical maximum output for any given space,
					yet the flying machines were not far behind and did not cause the insane concurrent
					game updates. On top of this, I noticed once the flying machine were in a 3 chunk space, they 
					reached the same output of the timed machine reletive to the farms volume. Meaning, in a survival
					world if you wanted a large bamboo farm and needed it take up 3+ chunks; the flying machine
					would outperform the timed machine. Which, again, was designed specifically to reach maximum
					output.
				</p>
			</div>

			<div class="mt-10 grid grid-cols-2 gap-4">
				<figure>
					<img
						src={oneChunkTotalImg}
						alt="Total bamboo output comparison across all five designs at one-chunk scale"
						class="w-full"
					/>
					<figcaption class="mt-2 text-center text-xs text-stone-600">One-chunk total output.</figcaption>
				</figure>
				<figure>
					<img
						src={threeChunkTotalImg}
						alt="Total bamboo output comparison across all five designs at three-chunk scale"
						class="w-full"
					/>
					<figcaption class="mt-2 text-center text-xs text-stone-600">Three-chunk total output.</figcaption>
				</figure>
			</div>

			<figure class="mx-auto mt-8 w-4/5">
				<img
					src={perTileImg}
					alt="Bamboo output per horizontal tile for all five farm designs"
					class="w-full"
				/>
				<figcaption class="mt-3 text-center text-xs text-stone-600">
					Output per tile — not considering the overhead volume taken up for each tile
				</figcaption>
			</figure>

			<div class="mt-10 space-y-5 text-2xl leading-relaxed text-stone-300">
				<p>
					If you're choosing a farm for a survival world today: skip the observer-piston farm.
					Use the standard flying machine if you want a proven, high-output, low-input farm. 
					And if you want the best resource-to-output ratio currently available without having to,
					worry about breaking during chunk loading, look at the full detector rail build linked 
					below — the version tested here is just where it started.
				</p>
			</div>
		</div>
	</section>

	<!-- ── World Download ────────────────────────────────────────────────── -->
	<WorldDownloadFooter
		worldName="Bamboo Comparisons"
		downloadUrl="https://pub-34f93473d6854fe28e01e96e6aacea21.r2.dev/Bamboo Testing.zip"
		minecraftVersion="1.21.10"
		notes="The full comparison world — all five bamboo farm designs built side by side in a controlled test environment. Run your own numbers, tweak the designs, or use it as a reference when planning your own farm."
	/>

</PostLayout>
