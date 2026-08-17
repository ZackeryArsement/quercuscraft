<script lang="ts">
	// ── Donation tiers are site-wide — update URLs here when Patreon/Stripe links are ready ──
	const DONATION_TIERS = [
		{
			label: 'Community',
			price: 'Free',
			benefit: 'Download and explore the full world at no cost, forever. No strings attached.',
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

	interface Props {
		worldName: string;
		downloadUrl?: string;
		minecraftVersion?: string;
		fileSize?: string;
		notes?: string;
	}

	let { worldName, downloadUrl, minecraftVersion, fileSize, notes }: Props = $props();
</script>

<!--
	id="download" is the anchor target for the hero "Go To Download" button, so
	the actual download has to be the FIRST thing in this section. It used to sit
	below the donation tiers, which meant the button landed the reader on Patreon
	pricing and read like a paywall. The download is free; it goes first.
-->
<section id="download" class="border-t-4 border-green-900 bg-stone-900 px-10 pt-10 pb-16">

	<!-- ── Download ───────────────────────────────────────────────────────── -->
	<div class="mb-14">
		<p class="mb-2 text-xs font-semibold tracking-widest text-green-600 uppercase">
			Free World Download
		</p>
		<h2 class="mb-4 text-4xl font-bold text-white">{worldName}</h2>

		<!-- Unambiguous: no signup, no payment, no strings -->
		<div class="mb-6 flex flex-wrap items-center gap-3">
			<span class="border-2 border-green-600 bg-green-900 px-3 py-1 text-sm font-bold tracking-wide text-green-200 uppercase">
				100% Free
			</span>
			<span class="text-base text-stone-300">
				No sign-up, no email, no Patreon needed — just click and download.
			</span>
		</div>

		<!-- Button sits above the notes and metadata on purpose: with those first,
		     a long `notes` string pushed the button below the fold on shorter
		     screens even though the anchor landed correctly. -->
		{#if downloadUrl}
			<a
				href={downloadUrl}
				download
				target="_blank"
				rel="noopener noreferrer"
				class="mb-8 inline-block border-2 border-green-600 bg-green-900 px-10 py-4 text-base font-bold text-green-300 transition-colors hover:bg-green-700 hover:text-white"
			>
				⬇&nbsp; Download World — Free
			</a>
		{:else}
			<!-- No URL set yet — show an inert placeholder rather than a dead link. -->
			<span
				class="mb-8 inline-block cursor-default border-2 border-stone-700 px-10 py-4 text-base font-bold text-stone-500"
			>
				⬇&nbsp; Download Coming Soon
			</span>
		{/if}

		{#if notes}
			<p class="mb-8 max-w-2xl leading-relaxed text-stone-400">{notes}</p>
		{/if}

		{#if minecraftVersion || fileSize}
			<div class="flex flex-wrap gap-4">
				{#if minecraftVersion}
					<div class="border border-stone-700 bg-stone-800 px-5 py-3">
						<p class="mb-1 text-xs font-semibold tracking-widest text-stone-400 uppercase">
							Minecraft Version
						</p>
						<p class="text-sm font-medium text-white">{minecraftVersion}</p>
					</div>
				{/if}
				{#if fileSize}
					<div class="border border-stone-700 bg-stone-800 px-5 py-3">
						<p class="mb-1 text-xs font-semibold tracking-widest text-stone-400 uppercase">
							File Size
						</p>
						<p class="text-sm font-medium text-white">{fileSize}</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- ── Donations — strictly optional, and after the download ──────────── -->
	<div class="border-t border-stone-700 pt-14">
		<p class="mb-2 text-xs font-semibold tracking-widest text-stone-400 uppercase">
			Optional — Support the Creator
		</p>
		<h3 class="mb-3 text-3xl font-bold text-white">Enjoying the build?</h3>
		<p class="mb-12 max-w-xl leading-relaxed text-stone-400">
			You've already got the world — it's free, and it stays free. Nothing below is
			required to download or play it. If you'd like to support future projects, each
			tier comes with a permanent thank-you built into the work itself.
		</p>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
			{#each DONATION_TIERS as tier}
				<div
					class="relative flex flex-col border p-3 sm:p-4 xl:p-7 {tier.featured
						? 'border-green-600 bg-stone-800'
						: 'border-stone-700'}"
					style={tier.featured ? '' : 'background-color: #1a1917;'}
				>
					{#if tier.featured}
						<span
							class="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-700 px-4 py-0.5 text-xs font-bold tracking-wider text-white uppercase"
						>
							Most Popular
						</span>
					{/if}

					<p class="mb-2 xl:mb-5 text-xs font-semibold tracking-widest text-stone-400 uppercase">
						{tier.label}
					</p>

					<div class="mb-2 xl:mb-5 flex items-baseline gap-1">
						<span class="text-2xl sm:text-3xl xl:text-4xl font-bold text-white">{tier.price}</span>
						{#if tier.period}
							<span class="text-xs xl:text-sm text-stone-400">{tier.period}</span>
						{/if}
					</div>

					<p class="mb-3 xl:mb-8 flex-1 text-xs sm:text-sm xl:text-base leading-relaxed text-stone-400">{tier.benefit}</p>

					{#if tier.url}
						<a
							href={tier.url}
							class="block text-center py-1.5 px-2 xl:py-3 xl:px-4 text-xs xl:text-sm font-bold transition-colors {tier.featured
								? 'border-2 border-green-600 bg-green-900 text-green-300 hover:bg-green-700 hover:text-white'
								: 'border-2 border-stone-600 bg-stone-900 text-stone-300 hover:border-stone-400 hover:text-white'}"
							target="_blank"
							rel="noopener noreferrer"
						>
							{tier.price === 'Free' ? 'Download Free' : 'Choose This Tier →'}
						</a>
					{:else}
						<span
							class="block cursor-default text-center py-1.5 px-2 xl:py-3 xl:px-4 text-xs xl:text-sm font-bold border-2 border-stone-700 text-stone-400"
						>
							{tier.price === 'Free' ? 'Already Free ↑' : 'Coming Soon'}
						</span>
					{/if}
				</div>
			{/each}
		</div>

		<p class="mt-8 text-xs text-stone-400">
			Monthly tier via Patreon. One-time tiers processed securely via Stripe.
		</p>
	</div>

</section>
