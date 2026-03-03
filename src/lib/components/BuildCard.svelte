<script lang="ts">
	import type { BuildCard } from '$lib/types';
	import { getBuildThumbnail } from '$lib/thumbnails';

	let { build }: { build: BuildCard } = $props();

	const imgSrc = $derived(build.image ? getBuildThumbnail(build.image) : null);
</script>

<a
	href={build.href}
	class="group flex flex-col overflow-hidden rounded-xl border border-stone-800 bg-stone-900 transition-colors hover:border-stone-600"
>
	<!-- Thumbnail or placeholder -->
	{#if imgSrc}
		<img
			src={imgSrc}
			alt={build.alt ?? build.title}
			loading='lazy'
			fetchpriority='auto'
			decoding="async"
			width="410"
			height="192"
			class="h-48 w-full object-cover"
		/>
	{:else}
		<div
			class="flex h-48 items-center justify-center bg-stone-800"
			style="background-image: linear-gradient(135deg, #1c1917 0%, #292524 50%, #1c1917 100%)"
			aria-hidden="true"
		>
			<span class="text-4xl opacity-20">⛏</span>
		</div>
	{/if}

	<div class="flex flex-1 flex-col p-5">
		<div class="mb-3 flex flex-wrap gap-1.5">
			{#each build.tags as tag}
				<span class="rounded bg-stone-800 px-2 py-0.5 text-xs text-stone-400">{tag}</span>
			{/each}
		</div>

		<h3 class="mb-2 font-semibold text-white transition-colors group-hover:text-green-400">
			{build.title}
		</h3>
		<p class="mb-4 flex-1 text-sm text-stone-400">{build.description}</p>

		<p class="text-xs text-stone-400">{build.date}</p>
	</div>
</a>
