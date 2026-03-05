<script lang="ts">
	import DonationSection from '$lib/components/landingPage/DonationSection.svelte';
</script>

<svelte:head>
	<title>About — QuercusCraft</title>
	<meta name="description" content="Learn about QuercusCraft — a technical Minecraft creator focused on redstone, farms, and precision builds. Gear list and setup included." />
</svelte:head>

<!-- ── Header ── -->
<div class="border-b-4 border-green-900" style="background: linear-gradient(160deg, #0c120c 0%, #111a11 40%, #090c09 100%);">
	<div class="mx-auto max-w-4xl px-10 py-20">
		<p class="mb-4 text-xs font-semibold tracking-widest text-green-600 uppercase">About</p>
		<h1 class="mb-6 text-5xl font-bold leading-tight text-white lg:text-6xl">QuercusCraft</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-stone-400">
			Servant of Christ Jesus performing Technical Minecraft focused on redstone engineering, farm optimization, and precision builds.
			Every project on this site is designed to be functional, well-documented, and free to download.
		</p>
	</div>
</div>

<div style="background: radial-gradient(ellipse 120% 80% at 50% 50%, #111711 0%, #0d0d0d 45%, #080808 100%); background-attachment: fixed;">

	<!-- ── About Section ── -->
	<section class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-xs font-semibold tracking-widest text-green-600 uppercase">The Creator</p>
			<h2 class="mb-8 text-3xl font-bold text-white">What This Site Is About</h2>

			<div class="space-y-5 text-lg leading-relaxed text-stone-300">
				<p>
					QuercusCraft is a technical Minecraft channel and resource site. The focus is on builds that
					actually work — farms with measured, reproducible output rates, redstone systems with fully
					documented mechanics, and world downloads that let you explore, learn from, or adapt anything
					I've built. No handwaving, no "it works on my machine" — just numbers, methodology, and
					the world file to verify it yourself.
				</p>
				<p>
					My background shapes how I approach every project. I have a degree in mechanical engineering,
					work professionally as a software developer, and spend my spare time in game development.
					That combination means I think about Minecraft builds the way an engineer thinks about systems:
					inputs, outputs, failure modes, and optimization. When I see a farm measured in "bamboo per
					hour" without specifying TPS, I want to fix the measurement. When I see a redstone circuit
					that works but nobody explains why, I want to document the underlying mechanic.
				</p>
				<p>
					A lot of Minecraft content skips the "why" and goes straight to the tutorial. I try to do
					the opposite: understand the mechanic first, then build around it. That's where things like
					the <a href="/blog/etho-hour" class="text-green-400 underline-offset-2 hover:underline">Etho Hour</a> come from —
					recognizing that most farm comparisons are measuring the wrong thing, and building a
					rigorous alternative from the ground up.
				</p>
				<p>
					My faith in Jesus Christ is the foundation of everything I do, including this channel.
					That means the content here is clean, family-friendly, and made with integrity. You won't
					find cheap engagement bait, misleading thumbnails, or anything you'd be uncomfortable
					watching with your kids. What you will find is honest analysis, well-documented builds,
					and a genuine effort to be useful to the technical Minecraft community.
				</p>
				<p>
					Everything on this site is free. The world downloads, the analysis posts, the mod recommendations —
					all of it. If you want to support future projects, the donation tiers on each build page are
					the best way to do that.
				</p>
			</div>

			<!-- Personal quote -->
			<blockquote class="my-10 border-l-4 border-green-700 pl-6 text-center italic">
				<p class="text-2xl font-light text-stone-200">"Minecraft is a hobby, Christ is my life."</p>
			</blockquote>

			<!-- Scripture -->
			<div class="rounded border border-stone-700 bg-stone-900/60 px-8 py-6">
				<p class="mb-1 text-xs font-semibold tracking-widest text-green-600 uppercase">Ecclesiastes 12:13</p>
				<p class="text-lg leading-relaxed text-stone-300 italic">
					"Let us hear the conclusion of the whole matter: Fear God, and keep his commandments: for this is the whole duty of man."
				</p>
			</div>

		</div>
	</section>

	<!-- ── Setup / Gear Section ── -->
	<section class="py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-xs font-semibold tracking-widest text-green-600 uppercase">Setup</p>
			<h2 class="mb-4 text-3xl font-bold text-white">What I Use</h2>
			<p class="mb-12 max-w-xl leading-relaxed text-stone-400">
				Entry-level gear that punches well above its price point. Nothing flashy — just reliable tools
				that get out of the way and let you focus on the work.
			</p>

			<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">

				<!-- Microphone -->
				<a
					href="https://amzn.to/4cYBpaU"
					target="_blank"
					rel="noopener noreferrer sponsored"
					class="group flex flex-col border border-stone-800 bg-stone-900 p-6 transition-colors hover:border-stone-600"
				>
					<p class="mb-3 text-xs font-semibold tracking-widest text-green-600 uppercase">Microphone</p>
					<h3 class="mb-3 text-lg font-bold text-white transition-colors group-hover:text-green-400">Dynamic Mic</h3>
					<p class="flex-1 text-sm leading-relaxed text-stone-400">
						Dynamic microphones only pick up sound close to the capsule, so background noise and room
						reflections stay out of the recording — no acoustic treatment required. Condenser mics
						sound great in a studio; dynamic mics sound great everywhere else.
					</p>
					<span class="mt-6 text-xs font-semibold text-green-600 transition-colors group-hover:text-green-400">
						View on Amazon →
					</span>
				</a>

				<!-- Mouse -->
				<a
					href="https://amzn.to/3OX7hmh"
					target="_blank"
					rel="noopener noreferrer sponsored"
					class="group flex flex-col border border-stone-800 bg-stone-900 p-6 transition-colors hover:border-stone-600"
				>
					<p class="mb-3 text-xs font-semibold tracking-widest text-green-600 uppercase">Mouse</p>
					<h3 class="mb-3 text-lg font-bold text-white transition-colors group-hover:text-green-400">Razer DeathAdder</h3>
					<p class="flex-1 text-sm leading-relaxed text-stone-400">
						Two buttons, a scroll wheel, and a sensor that tracks exactly where you move it. No macro
						buttons to accidentally hit, no cluttered software profile to manage. The ergonomic shape
						holds up through long sessions without any fatigue.
					</p>
					<span class="mt-6 text-xs font-semibold text-green-600 transition-colors group-hover:text-green-400">
						View on Amazon →
					</span>
				</a>

				<!-- Keyboard -->
				<a
					href="https://amzn.to/4aO4C7c"
					target="_blank"
					rel="noopener noreferrer sponsored"
					class="group flex flex-col border border-stone-800 bg-stone-900 p-6 transition-colors hover:border-stone-600"
				>
					<p class="mb-3 text-xs font-semibold tracking-widest text-green-600 uppercase">Keyboard</p>
					<h3 class="mb-3 text-lg font-bold text-white transition-colors group-hover:text-green-400">Mechanical Keyboard</h3>
					<p class="flex-1 text-sm leading-relaxed text-stone-400">
						Snappy, responsive switches with per-key RGB backlighting that's fully customizable.
						Working at night is no problem — the keys stay visible at whatever brightness you set,
						and the lighting profiles are easy to configure and save.
					</p>
					<span class="mt-6 text-xs font-semibold text-green-600 transition-colors group-hover:text-green-400">
						View on Amazon →
					</span>
				</a>

			</div>

			<!-- Amazon disclosure — required by Amazon Associates program -->
			<p class="mt-10 text-xs text-stone-500">
				As an Amazon Associate I earn from qualifying purchases. The links above are affiliate links —
				clicking them costs you nothing extra, but a small commission helps support the channel.
			</p>
		</div>
	</section>

</div>

<DonationSection />
