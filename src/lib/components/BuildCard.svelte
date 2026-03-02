<script lang="ts">
	import type { BuildCard } from '$lib/types';

	let { build }: { build: BuildCard } = $props();
</script>

<a
	href={build.href}
	class="group flex flex-col overflow-hidden rounded-xl border border-stone-800 bg-stone-900 transition-colors hover:border-stone-600"
>
	<!-- Image placeholder -->
	<div
		class="h-48 bg-stone-800"
		style="background-image: linear-gradient(135deg, #1c1917 0%, #292524 50%, #1c1917 100%)"
	>
		<div class="flex h-full items-center justify-center">
			<span class="text-4xl opacity-20" aria-hidden="true">⛏</span>
		</div>
	</div>

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

		<p class="text-xs text-stone-600">{build.date}</p>
	</div>
</a>
