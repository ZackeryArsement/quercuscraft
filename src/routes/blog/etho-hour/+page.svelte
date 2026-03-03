<script lang="ts">
	import BlogLayout from '$lib/components/posts/BlogLayout.svelte';
	import type { NavSection } from '$lib/components/posts/BlogLayout.svelte';
	import { posts } from '$lib/data/posts';
	const post = posts.find(p => p.href === '/blog/etho-hour')!;

	import soapBoxImg      from '$lib/assets/posts/blogPages/ethoHour/SOAP_BOX.webp';
	import clockCounterImg from '$lib/assets/posts/blogPages/ethoHour/CLOCK_WITH_COUNTER.webp';

	const navSections: NavSection[] = [
		{ id: 'problem',    label: 'The Problem' },
		{ id: 'tick',       label: 'The Tick' },
		{ id: 'etho-clock', label: 'Etho Hopper Clock' },
		{ id: 'etho-hour',  label: 'Building an Etho Hour' },
		{ id: 'why',        label: 'Why It Matters' }
	];
</script>

<svelte:head>
	<title>Etho Hour — QuercusCraft</title>
	<meta name="description" content="Minecraft has no standardized unit of time. An Etho Hour clock dilates with the game's dynamic tick rate, giving you a consistent metric that actually means something." />
</svelte:head>

<BlogLayout
	title="Etho Hour"
	category="Analysis"
	date="Mar 2026"
	tags={['Redstone', 'Analysis', 'Technical', 'Clocks']}
	{navSections}
	youtubeUrl={post.youtubeUrl}
>

	<!-- ── The Problem ───────────────────────────────────────────────────── -->
	<section id="problem" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-xs font-semibold tracking-widest text-green-600 uppercase">The Problem</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">There Is No Standard Unit of Time in Minecraft</h2>

			<div class="space-y-5 text-2xl leading-relaxed text-stone-300">
				<p>
					If you asked ten Minecraft players how long a minute is, you'd get ten different answers —
					and none of them would be wrong. The game has no official, reliable unit of time that
					players can use as a shared reference point. "A minute" in Minecraft means something
					different on a loaded single-player world, a busy multiplayer server, and a lagging
					server farm.
				</p>
				<p>
					This matters more than most players realize. Farm output rates, redstone timing,
					mob spawning cycles, item despawn windows, potion durations — all of these are
					measured in time. If your unit of time is unreliable, every measurement you make
					is unreliable with it.
				</p>
				<p>
					The root cause is the tick. Minecraft's internal clock runs in ticks, not seconds.
					And ticks are not guaranteed to line up with real-world time.
				</p>
			</div>

			<figure class="mx-auto mt-10 w-4/5">
				<img
					src={soapBoxImg}
					alt="The author standing on a soap box, passionately making a point about Minecraft timekeeping"
					class="w-full"
				/>
				<figcaption class="mt-3 text-center text-xs text-stone-600">
					Me, every time someone tells me their farm produces "about 3,000 bamboo an hour."
				</figcaption>
			</figure>
		</div>
	</section>

	<!-- ── The Tick ──────────────────────────────────────────────────────── -->
	<section id="tick" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-xs font-semibold tracking-widest text-green-600 uppercase">Mechanics</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">The Tick — Minecraft's Unit of Time</h2>

			<div class="space-y-5 text-2xl leading-relaxed text-stone-300">
				<p>
					Minecraft targets 20 ticks per second (TPS). Under ideal conditions, each tick takes
					exactly 50 milliseconds to process, and 20 of them add up to one second of real-world
					time. This is the definition most tutorials assume, and it works fine on a fresh
					single-player world with nothing loaded.
				</p>
				<p>
					The moment the game experiences any latency — from chunk loading, from entities,
					from redstone, from server load — ticks start to fall behind. The server can't make
					up lost time. A tick that takes 80ms to process is still just one tick, but it consumed
					80ms instead of 50ms. The next second of real time might contain only 12 ticks instead
					of 20.
				</p>
				<p>
					At 18 TPS, what feels like a minute is actually 66.7 real seconds.
					At 15 TPS, that "minute" stretches to 80 seconds.
					At 10 TPS — which is not unusual on a busy public server — your minute is now
					two real-world minutes long.
				</p>
				<p>
					Any farm or contraption that was designed and measured at 20 TPS will drift under
					real conditions. More importantly, any comparison between farms measured under
					different TPS conditions is meaningless. You're not comparing the farms — you're
					comparing the server loads they were tested under.
				</p>
				<p>
					The solution is to stop measuring in real seconds entirely. Measure in ticks.
					And to do that reliably across all conditions, you need a clock that counts ticks —
					not wall-clock time.
				</p>
			</div>
		</div>
	</section>

	<!-- ── Etho Hopper Clock ──────────────────────────────────────────────── -->
	<section id="etho-clock" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-xs font-semibold tracking-widest text-green-600 uppercase">The Clock</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">The Etho Hopper Clock</h2>

			<div class="space-y-5 text-2xl leading-relaxed text-stone-300">
				<p>
					The Etho Hopper Clock — named after the Minecraft YouTuber Etho, who popularized
					the design — is one of the most precise timing mechanisms available in vanilla
					Minecraft. It consists of two hoppers facing each other with items bouncing
					continuously between them. Each time an item successfully transfers through a hopper,
					the hopper enters an 8-tick cooldown before it can transfer again.
				</p>
				<p>
					The result is a clock whose cycle length is directly determined by the number of
					items inside it. With <em>x</em> items in the clock, each full cycle takes:
				</p>

				<!-- Formula block -->
				<div class="mx-auto my-6 max-w-sm border border-stone-700 bg-stone-900 px-8 py-6 text-center">
					<p class="mb-1 text-xs font-semibold tracking-widest text-stone-500 uppercase">Ticks per cycle</p>
					<p class="font-mono text-3xl font-bold text-green-400">8x − 6</p>
					<p class="mt-2 text-sm text-stone-500">where <em>x</em> = number of items in the hopper clock</p>
				</div>

				<p>
					The −6 accounts for a small timing offset that occurs at the transition points of
					the cycle. This formula holds precisely and consistently, tick for tick, regardless
					of server load — because hopper cooldowns are measured in ticks, not in real-world
					milliseconds. The clock slows down when the server slows down, and speeds back up
					when the server recovers. It is, by definition, lag-resistant.
				</p>
				<p>
					This is exactly the property we need. A clock that runs in lock-step with the game
					itself, giving us a unit of time that is consistent relative to the game's execution —
					even when that execution is inconsistent relative to the real world.
				</p>
			</div>
		</div>
	</section>

	<!-- ── Building an Etho Hour ─────────────────────────────────────────── -->
	<section id="etho-hour" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-xs font-semibold tracking-widest text-green-600 uppercase">Construction</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">Building an Etho Hour</h2>

			<div class="space-y-5 text-2xl leading-relaxed text-stone-300">
				<p>
					The goal is a clock that approximates one minute at 20 TPS and then counts 60 of
					those minutes to produce one "Etho Hour." We start by choosing the item count for
					the base clock.
				</p>
				<p>
					One real minute at 20 TPS = 1,200 ticks. Solving the formula for x:
				</p>

				<!-- Calculation block -->
				<div class="mx-auto my-6 max-w-md border border-stone-700 bg-stone-900 px-8 py-6">
					<p class="mb-4 text-xs font-semibold tracking-widest text-stone-500 uppercase">Finding x for ~1 minute</p>
					<div class="space-y-2 font-mono text-lg text-stone-300">
						<p>8x − 6 = 1,200</p>
						<p>8x = 1,206</p>
						<p>x = 150.75</p>
					</div>
					<p class="mt-4 text-sm text-stone-500">
						Rounding to <span class="text-green-400 font-semibold">150 items</span> gives
						8(150) − 6 = <span class="text-white font-semibold">1,194 ticks</span> per cycle —
						six ticks short of a "real" minute at 20 TPS.
					</p>
				</div>

				<p>
					Those six missing ticks are intentional. 1,194 is a clean, consistent number
					that we can work with precisely. The definition of an Etho minute is simply
					<strong class="text-white">1,194 game ticks</strong> — not "approximately 60 seconds."
				</p>
				<p>
					To build an Etho Hour, attach a 60-item counter to the base clock. The counter
					increments by one each time the 150-item clock completes a full cycle. When the
					counter reaches 60, one Etho Hour has elapsed:
				</p>

				<!-- Hour calculation -->
				<div class="mx-auto my-6 max-w-md border border-stone-700 bg-stone-900 px-8 py-6">
					<p class="mb-4 text-xs font-semibold tracking-widest text-stone-500 uppercase">Etho Hour in ticks</p>
					<div class="space-y-2 font-mono text-lg text-stone-300">
						<p>60 cycles × 1,194 ticks</p>
						<p class="border-t border-stone-700 pt-2 text-green-400 font-bold text-xl">= 71,640 ticks</p>
					</div>
					<p class="mt-4 text-sm text-stone-500">
						At 20 TPS this is ~59.7 real minutes. At 15 TPS this is ~79.6 real minutes.
						In both cases, it is exactly 71,640 game ticks.
					</p>
				</div>

				<p>
					The counter itself can be implemented in several ways: a hopper line that fills
					incrementally, a binary counter for precision, or any redstone circuit that can
					count 60 pulses from the clock output. The complexity of the counter doesn't
					affect the accuracy of the measurement — only the base clock determines that.
				</p>
			</div>

			<figure class="mx-auto mt-10 w-4/5">
				<img
					src={clockCounterImg}
					alt="The Etho Hopper Clock with a 60-item counter attached, forming a complete Etho Hour timer"
					class="w-full"
				/>
				<figcaption class="mt-3 text-center text-xs text-stone-600">
					The 150-item Etho clock with a 60-cycle counter attached. One full count = one Etho Hour.
				</figcaption>
			</figure>
		</div>
	</section>

	<!-- ── Why It Matters ────────────────────────────────────────────────── -->
	<section id="why" class="py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-xs font-semibold tracking-widest text-green-600 uppercase">Applications</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">Why This Matters</h2>

			<div class="space-y-5 text-2xl leading-relaxed text-stone-300">
				<p>
					The Etho Hour is not an academic curiosity. It has direct, practical implications
					for anyone doing serious technical work in Minecraft.
				</p>
				<p>
					<strong class="text-white">Farm comparisons.</strong> Every bamboo farm in my comparison
					study was measured in Etho minutes. This is the only way to ensure the numbers
					mean something — two farms tested at different TPS values on separate sessions
					would otherwise be incomparable. Measuring in ticks removes that variable entirely.
				</p>
				<p>
					<strong class="text-white">Redstone timing.</strong> Any circuit that needs to fire
					on a precise interval — an AFK alert, a harvest cycle, a scheduled output flush —
					benefits from being built around a tick-based clock rather than a real-time one.
					Your contraption will behave the same way at 20 TPS as it does at 15 TPS, because
					both conditions see the same number of ticks.
				</p>
				<p>
					<strong class="text-white">Spawning and despawn windows.</strong> Mob spawning rates
					and item despawn timers (items disappear after 6,000 ticks, always) are tick-based.
					If you're trying to understand or optimize spawning behavior, you need a tick-based
					reference. Real seconds will mislead you.
				</p>
				<p>
					<strong class="text-white">Data collection.</strong> Any time you're gathering
					output data from a farm or contraption, the Etho Hour gives you a denominator
					that is replicable. "Bamboo per Etho Hour" is a meaningful number you can share
					with other players and reproduce on different servers. "Bamboo per real hour" is
					a number that depends on conditions that are impossible to standardize.
				</p>
				<p>
					The Etho Hour doesn't replace real-world time — it gives technical players a
					consistent alternative when real-world time is too unreliable to use. It is, in
					a small way, a solution to the fact that Minecraft was never designed with rigorous
					measurement in mind.
				</p>
			</div>
		</div>
	</section>

</BlogLayout>
