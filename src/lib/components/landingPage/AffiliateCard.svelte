<script lang="ts">
	import type { Affiliate } from '$lib/types';

	let { affiliate }: { affiliate: Affiliate } = $props();

	const bg = affiliate.gradient
		? `linear-gradient(135deg, ${affiliate.gradient[0]} 0%, ${affiliate.gradient[1]} 100%)`
		: 'linear-gradient(135deg, #1c1917 0%, #0c0a09 100%)';
</script>

<a
	href={affiliate.url}
	target="_blank"
	rel="noopener noreferrer"
	class="group flex items-center gap-8 px-14 py-11 transition-opacity hover:opacity-90"
	style="background: {bg}"
>
	<!-- Logo -->
	{#if affiliate.logo}
		<img
			src={affiliate.logo}
			alt="{affiliate.name} logo"
			class="h-16 w-16 shrink-0 rounded-md object-contain"
		/>
	{/if}

	<!-- Name -->
	<div class="shrink-0">
		<p class="text-4xl font-bold text-white transition-colors group-hover:text-green-400">
			{affiliate.name}
		</p>
		{#if affiliate.category}
			<p class="mt-1 text-xs text-white/50">{affiliate.category}</p>
		{/if}
	</div>

	<!-- Divider -->
	<div class="mx-2 w-px self-stretch bg-white/20"></div>

	<!-- Description -->
	<p class="flex-1 leading-relaxed text-white/80">{affiliate.description}</p>

	<!-- CTA -->
	<span class="shrink-0 rounded-md bg-green-500 px-5 py-2.5 text-sm font-semibold text-stone-950 transition-colors group-hover:bg-green-400">
		Visit Site →
	</span>
</a>
