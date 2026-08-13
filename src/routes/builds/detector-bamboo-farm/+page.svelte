<script lang="ts">
	import PostLayout from '$lib/components/posts/PostLayout.svelte';
	import WorldDownloadFooter from '$lib/components/posts/WorldDownloadFooter.svelte';
	import GlossaryTerm from '$lib/components/GlossaryTerm.svelte';
	import type { NavSection } from '$lib/components/posts/PostLayout.svelte';
	import { builds } from '$lib/data/builds';
	import { SITE_URL, abs, breadcrumbs, publisher, youTubeId, youTubeThumb, youTubeEmbed } from '$lib/seo';
	const build = builds.find(b => b.href === '/builds/detector-bamboo-farm')!;

	// ── SEO ──────────────────────────────────────────────────────────────────
	const PATH = '/builds/detector-bamboo-farm';
	const SEO_DESCRIPTION =
		'A tileable Minecraft bamboo farm for Java 1.21.10+ — no observers, chunk-unload safe, 9,475 bamboo per hour in one chunk. Free world download.';

	const videoId = youTubeId(build.youtubeUrl);

	const farmLd: Record<string, unknown>[] = [
		{
			'@context': 'https://schema.org',
			'@type': 'CreativeWork',
			'@id': `${SITE_URL}${PATH}#build`,
			name: 'Detector Rail Bamboo Farm — Minecraft Java',
			alternateName: 'Minecraft Bamboo Farm',
			headline: 'Tileable Minecraft Bamboo Farm — Java, No Observers, Chunk-Safe',
			description: SEO_DESCRIPTION,
			url: abs(PATH),
			image: abs('/og/detector-bamboo-farm.jpg'),
			inLanguage: 'en',
			genre: ['Minecraft', 'Redstone', 'Farm'],
			about: [
				{ '@type': 'Thing', name: 'Minecraft' },
				{ '@type': 'Thing', name: 'Bamboo' },
				{ '@type': 'VideoGame', name: 'Minecraft' }
			],
			keywords:
				'minecraft bamboo farm, java bamboo farm, bamboo farm tutorial, bamboo java tutorial, tileable bamboo farm, detector rail bamboo farm, no observer bamboo farm, minecraft bamboo, chunk safe bamboo farm',
			isAccessibleForFree: true,
			author: publisher,
			publisher
		},
		breadcrumbs([
			{ name: 'Home', path: '/' },
			{ name: 'Builds', path: '/builds' },
			{ name: 'Detector Rail Bamboo Farm', path: PATH }
		])
	];

	if (videoId && build.videoUploadDate) {
		farmLd.push({
			'@context': 'https://schema.org',
			'@type': 'VideoObject',
			name: 'Detector Rail Bamboo Farm Tutorial Java 1.21.10+',
			description: SEO_DESCRIPTION,
			thumbnailUrl: [youTubeThumb(videoId)],
			uploadDate: build.videoUploadDate,
			embedUrl: youTubeEmbed(videoId),
			contentUrl: build.youtubeUrl,
			publisher
		});
	}

	import heroImg from '$lib/assets/posts/worldPages/bambooComparison/TOP_DETECTOR.webp';
	import Seo from '$lib/components/global/Seo.svelte';

	const navSections: NavSection[] = [
		{ id: 'metrics',  label: 'Performance' },
		{ id: 'download', label: 'World Download' }
	];
</script>

<Seo
	title="Minecraft Bamboo Farm — Tileable Java Tutorial, No Observers"
	description={SEO_DESCRIPTION}
	path={PATH}
	image="/og/detector-bamboo-farm.jpg"
	imageAlt="Top-down view of the detector rail bamboo farm running in vanilla Minecraft Java Edition"
	type="article"
	keywords={[
		'minecraft bamboo farm',
		'java bamboo farm',
		'bamboo farm tutorial',
		'bamboo java tutorial',
		'tileable bamboo farm',
		'detector rail bamboo farm',
		'no observer bamboo farm',
		'chunk safe bamboo farm',
		'minecraft bamboo'
	]}
	jsonLd={farmLd}
/>

<PostLayout
	title="Detector Rail Bamboo Farm"
	heroSrc={heroImg}
	heroAlt="Top-down view of the detector rail bamboo farm"
	{navSections}
	youtubeUrl={build.youtubeUrl}
>

	<!-- ── Performance Metrics ───────────────────────────────────────────── -->
	<section id="metrics" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-xs font-semibold tracking-widest text-green-600 uppercase">Performance</p>
			<h2 class="mb-12 text-center text-3xl font-bold text-white">Key Metrics</h2>

			<!-- Big numbers row -->
			<div class="mb-6 grid grid-cols-1 gap-px bg-stone-700 sm:grid-cols-2">
				<div class="bg-stone-950 px-8 py-10 text-center">
					<p class="mb-1 font-mono text-xs font-semibold tracking-widest text-green-600 uppercase">Bamboo / Hour</p>
					<p class="font-mono text-6xl font-bold text-white">9,475</p>
					<p class="mt-2 text-xs text-stone-600">at 20 TPS</p>
				</div>
				<div class="bg-stone-950 px-8 py-10 text-center">
					<p class="mb-1 font-mono text-xs font-semibold tracking-widest text-green-600 uppercase">Bamboo / Etho Hour</p>
					<p class="font-mono text-6xl font-bold text-white">9,427</p>
					<p class="mt-2 text-xs text-stone-600">lag-normalized (71,640 ticks)</p>
				</div>
			</div>

			<!-- Feature flags row -->
			<div class="grid grid-cols-2 gap-px bg-stone-700 sm:grid-cols-4">
				<div class="flex flex-col items-center justify-center gap-2 bg-stone-950 px-4 py-8 text-center">
					<span class="font-mono text-2xl font-bold text-green-400">✓</span>
					<p class="font-mono text-xs font-semibold tracking-widest text-stone-300 uppercase">No Observers</p>
				</div>
				<div class="flex flex-col items-center justify-center gap-2 bg-stone-950 px-4 py-8 text-center">
					<span class="font-mono text-2xl font-bold text-green-400">✓</span>
					<p class="font-mono text-xs font-semibold tracking-widest text-stone-300 uppercase">No Slime</p>
				</div>
				<div class="flex flex-col items-center justify-center gap-2 bg-stone-950 px-4 py-8 text-center">
					<span class="font-mono text-2xl font-bold text-green-400">✓</span>
					<p class="font-mono text-xs font-semibold tracking-widest text-stone-300 uppercase">Tileable</p>
				</div>
				<div class="flex flex-col items-center justify-center gap-2 bg-stone-950 px-4 py-8 text-center">
					<span class="font-mono text-2xl font-bold text-green-400">✓</span>
					<p class="font-mono text-xs font-semibold tracking-widest text-stone-300 uppercase">Single Chunk</p>
				</div>
			</div>

			<!-- Chunk-safe callout -->
			<div class="mt-6 border border-green-900 bg-stone-900 px-8 py-6">
				<p class="mb-1 font-mono text-xs font-semibold tracking-widest text-green-600 uppercase">Chunk Safety</p>
				<p class="text-base leading-relaxed text-stone-300">
					Does not break during chunk loading and unloading — the minecart resumes harvesting automatically when the chunk reloads. No reset or babysitting required.
				</p>
			</div>

			<p class="mt-6 text-base leading-relaxed text-stone-400">
				Rates above are quoted per hour and per
				<a href="/blog/etho-hour" class="text-green-500 underline-offset-2 hover:underline">Etho Hour</a>
				— see the glossary for what a
				<GlossaryTerm slug="tick">Minecraft tick</GlossaryTerm> is, and how fast
				<GlossaryTerm slug="bamboo">bamboo</GlossaryTerm> actually grows.
			</p>
		</div>
	</section>

	<!-- ── World Download ────────────────────────────────────────────────── -->
	<WorldDownloadFooter
		worldName="Detector Rail Bamboo Farm"
		downloadUrl="https://pub-34f93473d6854fe28e01e96e6aacea21.r2.dev/BambooTutorial.zip"
		minecraftVersion="1.21.10"
		notes="The complete Detector Rail Bamboo Farm world save. Chunk-unload safe, observer-free, and fully tileable. No mods or resource packs required."
	/>

</PostLayout>
