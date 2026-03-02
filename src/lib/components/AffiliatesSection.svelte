<script lang="ts">
	import type { Affiliate } from '$lib/types';
	import AffiliateCard from './AffiliateCard.svelte';

	let { affiliates }: { affiliates: Affiliate[] } = $props();

	function hexToRgba(hex: string, alpha: number): string {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	function shadowGradient(affiliate: Affiliate): string {
		if (!affiliate.gradient) return 'transparent';
		return `linear-gradient(135deg, ${hexToRgba(affiliate.gradient[0], 0.35)} 0%, ${hexToRgba(affiliate.gradient[1], 0.35)} 100%)`;
	}
</script>

<!-- ── Affiliates ── -->
<section class="border-t border-stone-800">
	{#each affiliates as affiliate}
		<!-- Full-width shadow gradient bleeds into margins -->
		<div style="background: {shadowGradient(affiliate)}">
			<!-- Constrained card stays at full brightness -->
			<div class="mx-auto max-w-7xl">
				<AffiliateCard {affiliate} />
			</div>
		</div>
	{/each}
</section>
