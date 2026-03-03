<script lang="ts">
	import PostLayout from '$lib/components/posts/PostLayout.svelte';
	import WorldDownloadFooter from '$lib/components/posts/WorldDownloadFooter.svelte';
	import type { NavSection } from '$lib/components/posts/PostLayout.svelte';

	import heroImg from '$lib/assets/worldPages/bambooComparison/TOP_DETECTOR.webp';

	const navSections: NavSection[] = [
		{ id: 'video',    label: 'Video' },
		{ id: 'download', label: 'World Download' }
	];
</script>

<svelte:head>
	<title>Detector Rail Bamboo Farm — QuercusCraft</title>
	<meta name="description" content="An innovative, tileable bamboo farm powered by a hopper minecart on detector rails. No observers, minimal lag, and chunk-unload safe." />
</svelte:head>

<PostLayout
	title="Detector Rail Bamboo Farm"
	heroSrc={heroImg}
	heroAlt="Top-down view of the detector rail bamboo farm"
	{navSections}
>

	<!-- ── Video ─────────────────────────────────────────────────────────── -->
	<section id="video" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-xs font-semibold tracking-widest text-green-600 uppercase">Watch</p>
			<h2 class="mb-10 text-center text-3xl font-bold text-white">Full Breakdown</h2>

			<div class="relative w-full overflow-hidden" style="padding-bottom: 56.25%;">
				<iframe
					class="absolute inset-0 h-full w-full"
					src="https://www.youtube.com/embed/WUqqw2ixf5M?start=56"
					title="Detector Rail Bamboo Farm — QuercusCraft"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				></iframe>
			</div>
		</div>
	</section>

	<!-- ── World Download ────────────────────────────────────────────────── -->
	<WorldDownloadFooter
		worldName="Detector Rail Bamboo Farm"
		minecraftVersion="1.21.10"
		notes="The complete Detector Rail Bamboo Farm world save. Chunk-unload safe, observer-free, and fully tileable. No mods or resource packs required."
	/>

</PostLayout>
