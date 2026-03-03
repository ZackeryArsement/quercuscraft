<script lang="ts">
	import bannerImg from '$lib/assets/landingPage/Banner.webp';
</script>

<!-- ── Hero ── -->
<section class="hero-bg relative overflow-hidden px-4 py-28 sm:py-36">
	<!-- Banner image -->
	<img
		src={bannerImg}
		alt=""
		loading='eager'
		fetchpriority='high'
		decoding="async"
		width="1920"
		height="1080"
		class="pointer-events-none absolute inset-0 h-full w-full object-cover"
		aria-hidden="true"
	/>

	<!-- Radial glow -->
	<div
		class="pointer-events-none absolute inset-0"
		style="background: radial-gradient(ellipse 70% 50% at 50% 40%, rgba(34,197,94,0.08) 0%, transparent 70%)"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto max-w-3xl text-center">
		<p class="mb-4 text-2xl font-bold tracking-widest text-green-500 uppercase">
			Minecraft Builds &amp; Tutorials
		</p>
		<h1 class="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-8xl">
			Welcome to<br />
			<span class="text-green-400">QuercusCraft</span>
		</h1>
		<p class="mx-auto mb-10 max-w-xl text-xl text-stone-400">
			A showcase of original VANILLA Minecraft builds — from technical anysis to complex redstone games.
			Tutorials and world downloads included!
		</p>
		<div class="flex flex-wrap justify-center gap-3">
			<a
				href="/builds"
				class="rounded-md bg-green-500 px-6 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-green-400"
			>
				Browse Builds
			</a>
			<a
				href="/tutorials"
				class="rounded-md border border-stone-600 px-6 py-3 text-sm font-semibold text-stone-200 transition-colors hover:border-stone-400 hover:text-white"
			>
				View Tutorials
			</a>
		</div>
	</div>
</section>
