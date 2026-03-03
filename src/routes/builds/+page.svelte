<script lang="ts">
	import { builds } from '$lib/data/builds';
	import { getBuildThumbnail } from '$lib/thumbnails';

	// ── Filter state ──────────────────────────────────────────────────────────
	type SortKey = 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc';

	let sortBy = $state<SortKey>('date-desc');
	let selectedTags = $state<string[]>([]);
	let featuredOnly = $state(false);

	// All unique tags across every build, sorted alphabetically
	const allTags = [...new Set(builds.flatMap((b) => b.tags))].sort();

	// Parse 'Jan 2026' / 'Dec 2025' style date strings reliably
	const monthIndex: Record<string, number> = {
		Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
		Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
	};
	function parseDate(dateStr: string): number {
		const [month, year] = dateStr.split(' ');
		return new Date(parseInt(year), monthIndex[month] ?? 0).getTime();
	}

	// A build matches the current base filters (featured + already-selected tags, AND logic)
	function matchesBase(b: (typeof builds)[number]): boolean {
		if (featuredOnly && !b.featured) return false;
		if (selectedTags.length > 0 && !selectedTags.every((t) => b.tags.includes(t))) return false;
		return true;
	}

	// Only show a tag if it's already selected OR adding it (AND logic) still yields ≥1 result
	const availableTags = $derived(
		allTags.filter((tag) => {
			if (selectedTags.includes(tag)) return true;
			return builds.some((b) => matchesBase(b) && b.tags.includes(tag));
		})
	);

	// ── Derived filtered + sorted list ────────────────────────────────────────
	const filteredBuilds = $derived(
		builds
			.filter(matchesBase)
			.sort((a, b) => {
				switch (sortBy) {
					case 'date-desc': return parseDate(b.date) - parseDate(a.date);
					case 'date-asc':  return parseDate(a.date) - parseDate(b.date);
					case 'name-asc':  return a.title.localeCompare(b.title);
					case 'name-desc': return b.title.localeCompare(a.title);
				}
			})
	);

	const hasActiveFilters = $derived(
		selectedTags.length > 0 || featuredOnly || sortBy !== 'date-desc'
	);

	function toggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter((t) => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	}

	function clearFilters() {
		selectedTags = [];
		featuredOnly = false;
		sortBy = 'date-desc';
	}

	const sortOptions: { label: string; value: SortKey }[] = [
		{ label: 'Newest', value: 'date-desc' },
		{ label: 'Oldest', value: 'date-asc' },
		{ label: 'A → Z',  value: 'name-asc' },
		{ label: 'Z → A',  value: 'name-desc' }
	];
</script>

<svelte:head>
	<title>All Builds — QuercusCraft</title>
</svelte:head>

<div class="bg-black py-12">
	<!-- Page header -->
	<div class="mx-8 mb-6 sm:mx-12 lg:mx-16">
		<p class="mb-1 text-xs font-semibold tracking-widest text-green-600 uppercase">Gallery</p>
		<h1 class="text-3xl font-bold text-white">All Builds</h1>
	</div>

	<!-- Outer frame — filter bar + cards share one border -->
	<div class="mx-8 border-4 border-green-900 sm:mx-12 lg:mx-16">

		<!-- ── Filter bar ─────────────────────────────────────────────────────── -->
		<div class="border-b-4 border-green-900 bg-stone-950 px-6 py-5">

			<!-- Row 1: Sort -->
			<div class="flex flex-wrap items-center gap-3">
				<span class="text-xs font-semibold tracking-widest text-green-600 uppercase">Sort</span>
				<div class="flex gap-1">
					{#each sortOptions as opt}
						<button
							class="border px-3 py-1 text-xs font-medium transition-colors {sortBy === opt.value
								? 'border-green-700 bg-green-900 text-green-300'
								: 'border-stone-700 text-stone-500 hover:border-stone-500 hover:text-stone-200'}"
							onclick={() => (sortBy = opt.value)}
						>
							{opt.label}
						</button>
					{/each}
				</div>
			</div>

			<!-- Row 2: Tag chips -->
			<div class="mt-4 flex flex-wrap items-center gap-2">
				<span class="text-xs font-semibold tracking-widest text-green-600 uppercase">Tags</span>
				{#each availableTags as tag}
					<button
						class="border px-3 py-1 text-sm font-medium transition-colors {selectedTags.includes(tag)
							? 'border-green-700 bg-green-900 text-green-300'
							: 'border-stone-700 text-stone-500 hover:border-green-900 hover:text-stone-300'}"
						onclick={() => toggleTag(tag)}
						aria-pressed={selectedTags.includes(tag)}
					>
						{tag}
					</button>
				{/each}
			</div>

			<!-- Row 3: Featured + Clear | Build count -->
			<div class="mt-4 flex flex-wrap items-center justify-between gap-4">
				<div class="flex items-center gap-3">
					<!-- Featured-only toggle -->
					<button
						class="flex items-center gap-2 text-sm font-medium transition-colors {featuredOnly
							? 'text-green-400'
							: 'text-stone-500 hover:text-stone-300'}"
						onclick={() => (featuredOnly = !featuredOnly)}
						aria-pressed={featuredOnly}
					>
						<span
							class="flex h-4 w-4 items-center justify-center border transition-colors {featuredOnly
								? 'border-green-600 bg-green-900'
								: 'border-stone-600'}"
							aria-hidden="true"
						>
							{#if featuredOnly}
								<svg class="h-2.5 w-2.5 text-green-400" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5">
									<path stroke-linecap="round" stroke-linejoin="round" d="M2 6l3 3 5-5" />
								</svg>
							{/if}
						</span>
						Featured only
					</button>

					<!-- Clear all filters -->
					{#if hasActiveFilters}
						<button
							class="border border-stone-700 px-3 py-1 text-xs font-medium text-stone-400 transition-colors hover:border-red-800 hover:bg-red-950/40 hover:text-red-400"
							onclick={clearFilters}
						>
							Clear all filters
						</button>
					{/if}
				</div>

				<!-- Build count -->
				<div class="text-right">
					<p class="text-4xl font-bold text-white">{filteredBuilds.length}</p>
					<p class="text-xs font-semibold tracking-widest text-stone-500 uppercase">
						build{filteredBuilds.length !== 1 ? 's' : ''}
					</p>
				</div>
			</div>
		</div>

		<!-- ── Card stack ─────────────────────────────────────────────────────── -->
		{#if filteredBuilds.length > 0}
			<div class="divide-y-4 divide-green-900">
				{#each filteredBuilds as build, i (build.href)}
					{@const imgSrc = build.image ? getBuildThumbnail(build.image) : null}

					<article class="group relative h-96 overflow-hidden bg-black">
						{#if imgSrc}
							<img
								src={imgSrc}
								alt={build.alt ?? build.title}
								loading={i === 0 ? 'eager' : 'lazy'}
								fetchpriority={i === 0 ? 'high' : 'auto'}
								decoding="async"
								width="800"
								height="384"
								class="absolute inset-0 h-full w-full object-cover"
								style="
									-webkit-mask-image: linear-gradient(to bottom right, black 35%, transparent 70%);
									mask-image: linear-gradient(to bottom right, black 35%, transparent 70%);
								"
							/>
						{/if}

						<!-- Title block — top-left -->
						<a href={build.href} class="absolute top-0 left-0 max-w-lg p-8">
							<div class="mb-3 flex flex-wrap gap-1.5">
								{#each build.tags.toSorted() as tag}
									<span class="border border-green-900 bg-green-950/70 px-2.5 py-0.5 text-xs font-medium text-white-400">
										{tag}
									</span>
								{/each}
							</div>

							<h2 class="text-4xl font-bold text-white drop-shadow-md transition-colors group-hover:text-green-400">
								{build.title}
							</h2>

							<p class="mt-2 text-m text-white-600">{build.date}</p>
						</a>

						<!-- Description block — bottom-right -->
						<div class="absolute right-0 bottom-0 flex h-1/2 w-2/5 flex-col justify-end p-8 text-center">
							<p class="text-2xl leading-relaxed text-stone-300">{build.description}</p>
						</div>
					</article>
				{/each}
			</div>
		{:else}
			<div class="flex h-48 items-center justify-center">
				<p class="text-sm text-stone-600">No builds match the selected filters.</p>
			</div>
		{/if}
	</div>
</div>
