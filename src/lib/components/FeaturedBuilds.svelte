<script lang="ts">
	import type { BuildCard } from '$lib/types';
	import BuildCardComponent from './BuildCard.svelte';

	let { builds }: { builds: BuildCard[] } = $props();

	const featured = $derived(
		builds
			.filter((b) => b.featured)
			.sort((a, b) => a.title.localeCompare(b.title))
			.slice(0, 3)
	);
</script>

<!-- ── Featured Builds ── -->
<section class="px-4 py-16 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="mb-8 flex items-end justify-between">
			<div>
				<p class="mb-1 text-xs font-semibold tracking-widest text-green-400 uppercase">Showcase</p>
				<h2 class="text-2xl font-bold text-white">Featured Builds</h2>
			</div>
			<a href="/builds/featured" class="text-sm text-stone-400 transition-colors hover:text-green-400">
				View all →
			</a>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each featured as build}
				<BuildCardComponent {build} />
			{/each}
		</div>
	</div>
</section>
