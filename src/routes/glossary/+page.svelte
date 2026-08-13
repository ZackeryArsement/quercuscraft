<script lang="ts">
	import { onMount } from 'svelte';
	import Seo from '$lib/components/global/Seo.svelte';
	import { glossary } from '$lib/data/glossary';
	import { SITE_URL, abs, breadcrumbs, publisher } from '$lib/seo';

	// Highlights the entry you are currently reading in the sidebar, same
	// behaviour and thresholds as the Contents rail on the build pages.
	let activeId = $state('');

	onMount(() => {
		const obs = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) activeId = entry.target.id;
				}
			},
			{ rootMargin: '-5% 0px -55% 0px', threshold: 0 }
		);
		for (const entry of glossary) {
			const el = document.getElementById(entry.slug);
			if (el) obs.observe(el);
		}
		return () => obs.disconnect();
	});

	const PATH = '/glossary';
	const SEO_DESCRIPTION =
		'What is a Minecraft tick? How fast does bamboo grow, and how tall? Plain-English definitions of vanilla Java mechanics, every number cited.';

	const jsonLd: Record<string, unknown>[] = [
		{
			'@context': 'https://schema.org',
			'@type': 'DefinedTermSet',
			'@id': `${SITE_URL}${PATH}#glossary`,
			name: 'Minecraft Mechanics Glossary',
			description: SEO_DESCRIPTION,
			url: abs(PATH),
			inLanguage: 'en',
			publisher,
			hasDefinedTerm: glossary.map((e) => ({
				'@type': 'DefinedTerm',
				'@id': `${SITE_URL}${PATH}#${e.slug}`,
				name: e.term,
				description: e.short,
				url: `${abs(PATH)}#${e.slug}`,
				inDefinedTermSet: `${SITE_URL}${PATH}#glossary`
			}))
		},
		// The short definitions double as FAQ answers — this is the block that can
		// surface a "what is a Minecraft tick" answer directly in search results.
		{
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: glossary.map((e) => ({
				'@type': 'Question',
				name: `What is ${/^[aeiou]/i.test(e.term) ? 'an' : 'a'} ${e.term} in Minecraft?`,
				acceptedAnswer: { '@type': 'Answer', text: e.short }
			}))
		},
		breadcrumbs([
			{ name: 'Home', path: '/' },
			{ name: 'Glossary', path: PATH }
		])
	];
</script>

<Seo
	title="Minecraft Glossary — Ticks, Random Ticks & Bamboo Explained"
	description={SEO_DESCRIPTION}
	path={PATH}
	image="/og/glossary.jpg"
	imageAlt="QuercusCraft glossary of vanilla Minecraft mechanics"
	type="website"
	keywords={[
		'minecraft tick',
		'what is a minecraft tick',
		'minecraft random tick',
		'redstone tick',
		'minecraft bamboo',
		'how fast does bamboo grow in minecraft',
		'bamboo max height minecraft',
		'etho hopper clock',
		'what is an etho clock',
		'minecraft glossary'
	]}
	{jsonLd}
/>

<div class="min-h-screen bg-stone-950">

	<!-- ── Page header ────────────────────────────────────────────────────── -->
	<div class="border-b-4 border-green-900 bg-stone-900 px-8 py-14 sm:px-12 lg:px-16">
		<p class="mb-2 text-xs font-semibold tracking-widest text-green-600 uppercase">Reference</p>
		<h1 class="text-5xl font-bold text-white">Minecraft Glossary</h1>
		<p class="mt-3 max-w-2xl leading-relaxed text-stone-400">
			The mechanics referenced across this site, defined once and in plain English. Every number
			here is Java Edition, vanilla, and cited — the build pages link back to these entries rather
			than re-explaining them.
		</p>
	</div>

	<!-- ── Jump links (mobile / tablet — the sidebar takes over at xl) ─────── -->
	<div class="border-b border-stone-800 bg-stone-900/60 px-8 py-4 sm:px-12 lg:px-16 xl:hidden">
		<div class="flex flex-wrap gap-2">
			{#each glossary as entry (entry.slug)}
				<a
					href="#{entry.slug}"
					class="border px-3 py-1 text-sm font-medium transition-colors {activeId === entry.slug
						? 'border-green-600 bg-green-900 text-green-300'
						: 'border-stone-700 text-stone-400 hover:border-green-600 hover:text-green-300'}"
				>
					{entry.term}
				</a>
			{/each}
		</div>
	</div>

	<!-- ── Body: sticky sidebar + entries ─────────────────────────────────── -->
	<div class="mx-auto flex max-w-6xl">
		<!-- Sidebar (desktop only) — mirrors the Contents rail on the build pages -->
		<aside class="hidden w-52 shrink-0 xl:block xl:w-60">
			<nav
				class="sticky top-16 flex h-[calc(100vh-4rem)] flex-col overflow-y-auto border-r border-stone-800 px-5 py-8"
				aria-label="Glossary terms"
			>
				<p class="mb-5 text-m font-semibold tracking-widest text-green-600 uppercase">Terms</p>

				<ul class="space-y-0.5">
					{#each glossary as entry (entry.slug)}
						<li>
							<button
								class="w-full border-l-2 py-1.5 pr-2 pl-3 text-left text-m transition-colors {activeId ===
								entry.slug
									? 'border-green-500 text-green-400'
									: 'border-stone-700 text-stone-500 hover:border-stone-500 hover:text-stone-300'}"
								onclick={() =>
									document.getElementById(entry.slug)?.scrollIntoView({ behavior: 'smooth' })}
							>
								{entry.term}
							</button>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>

		<!-- ── Entries ────────────────────────────────────────────────────────── -->
		<div class="min-w-0 flex-1 px-8 py-14">
			{#each glossary as entry, i (entry.slug)}
				<section
					id={entry.slug}
					class="scroll-mt-24 {i > 0 ? 'mt-16 border-t border-stone-800 pt-16' : ''}"
				>
					<h2 class="mb-4 text-3xl font-bold text-white">{entry.term}</h2>

					<!-- Short definition — the bit written to be quotable on its own -->
					<p class="mb-8 border-l-4 border-green-700 bg-stone-900 px-6 py-4 text-xl leading-relaxed text-stone-200">
						{entry.short}
					</p>

					<div class="space-y-5 text-lg leading-relaxed text-stone-300">
						{#each entry.body as para}
							<p>{@html para}</p>
						{/each}
					</div>

					{#if entry.facts?.length}
						<!-- Separate bordered cards rather than a gap-px grid: an odd number of
						     facts would otherwise leave a lit, empty cell at the end. -->
						<dl class="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
							{#each entry.facts as fact (fact.label)}
								<div class="border border-stone-800 bg-stone-950 px-5 py-4">
									<dt class="mb-1 font-mono text-xs font-semibold tracking-widest text-green-600 uppercase">
										{fact.label}
									</dt>
									<dd class="text-base text-stone-200">{fact.value}</dd>
								</div>
							{/each}
						</dl>
					{/if}

					{#if entry.items}
						<div class="mt-8 border border-stone-800 bg-stone-950 px-6 py-5">
							<p class="mb-4 font-mono text-xs font-semibold tracking-widest text-green-600 uppercase">
								{entry.items.heading}
							</p>
							<ul class="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
								{#each entry.items.list as item (item.name)}
									<li class="flex items-baseline gap-3 border-b border-stone-800/70 pb-2">
										<span class="min-w-8 font-mono text-lg font-bold text-green-400">{item.count}×</span>
										<span class="text-base text-stone-200">{item.name}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					<div class="mt-6 flex flex-wrap items-baseline justify-between gap-3">
						{#if entry.referencedIn?.length}
							<p class="text-sm text-stone-500">
								Used in:
								{#each entry.referencedIn as ref, j (ref.href)}
									{#if j > 0}<span aria-hidden="true"> · </span>{/if}
									<a href={ref.href} class="text-green-500 underline-offset-2 hover:underline">
										{ref.label}
									</a>
								{/each}
							</p>
						{:else}
							<span></span>
						{/if}
						<p class="text-xs text-stone-600">Source: {entry.source}</p>
					</div>
				</section>
			{/each}
		</div>
	</div>
</div>
