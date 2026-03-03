<script lang="ts">
	const DONATION_TIERS = [
		{
			label: 'Community',
			price: 'Free',
			benefit: 'Download and explore every world on this site at no cost, forever. No strings attached.',
			url: undefined as string | undefined,
			featured: false
		},
		{
			label: 'Supporter',
			price: '$1.99',
			period: '/ month',
			benefit: 'Your name credited at the end of all related YouTube videos.',
			url: 'https://www.patreon.com/cw/QuercusCraft' as string | undefined,
			featured: false
		},
		{
			label: 'Patron',
			price: '$4.99',
			period: '/ month',
			benefit: 'A named sign placed inside future world downloads as a permanent thank-you.',
			url: 'https://www.patreon.com/cw/QuercusCraft' as string | undefined,
			featured: true
		},
		{
			label: 'Champion',
			price: '$9.99',
			period: '/ month',
			benefit: 'A small statue or named mob in your honor built into future world downloads.',
			url: 'https://www.patreon.com/cw/QuercusCraft' as string | undefined,
			featured: false
		}
	];
</script>

<section class="border-t border-stone-800 bg-stone-900 px-4 py-16 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">

		<p class="mb-2 text-xs font-semibold tracking-widest text-stone-400 uppercase">Support the Creator</p>
		<h2 class="mb-3 text-3xl font-bold text-white">Enjoying the builds?</h2>
		<p class="mb-12 max-w-xl leading-relaxed text-stone-400">
			Every world on this site is completely free. If you'd like to support future
			projects, each tier below comes with a permanent thank-you built into the work itself.
		</p>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
			{#each DONATION_TIERS as tier}
				<div
					class="relative flex flex-col border p-6 {tier.featured
						? 'border-green-600 bg-stone-800'
						: 'border-stone-700 bg-stone-950'}"
				>
					{#if tier.featured}
						<span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 px-4 py-0.5 text-xs font-bold tracking-wider text-white uppercase">
							Most Popular
						</span>
					{/if}

					<p class="mb-4 text-xs font-semibold tracking-widest text-stone-400 uppercase">{tier.label}</p>

					<div class="mb-4 flex items-baseline gap-1">
						<span class="text-3xl font-bold text-white">{tier.price}</span>
						{#if tier.period}
							<span class="text-sm text-stone-400">{tier.period}</span>
						{/if}
					</div>

					<p class="mb-8 flex-1 text-sm leading-relaxed text-stone-400">{tier.benefit}</p>

					{#if tier.url}
						<a
							href={tier.url}
							target="_blank"
							rel="noopener noreferrer"
							class="block text-center py-2.5 px-4 text-sm font-bold transition-colors {tier.featured
								? 'border-2 border-green-600 bg-green-900 text-green-300 hover:bg-green-700 hover:text-white'
								: 'border-2 border-stone-600 bg-stone-900 text-stone-300 hover:border-stone-400 hover:text-white'}"
						>
							Choose This Tier →
						</a>
					{:else}
						<span class="block text-center py-2.5 px-4 text-sm font-bold border-2 border-stone-700 text-stone-400 cursor-default">
							Always Free
						</span>
					{/if}
				</div>
			{/each}
		</div>

		<p class="mt-8 text-xs text-stone-400">Monthly tiers via Patreon.</p>
	</div>
</section>
