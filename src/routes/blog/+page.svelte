<script lang="ts">
	import { posts } from '$lib/data/posts';
	import type { BlogPost } from '$lib/types';

	const thumbnails = import.meta.glob<{ default: string }>(
		'../../lib/assets/posts/postThumbnail/*.{webp,png,jpg}',
		{ eager: true }
	);

	function getThumbnail(filename: string | undefined): string | null {
		if (!filename) return null;
		return thumbnails[`../../lib/assets/posts/postThumbnail/${filename}`]?.default ?? null;
	}

	// ── Filter state ──────────────────────────────────────────────────────────
	let sortBy = $state<'date-desc' | 'date-asc' | 'name-asc' | 'name-desc'>('date-desc');
	let selectedTags = $state<string[]>([]);

	const monthIndex: Record<string, number> = {
		Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
		Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
	};
	function parseDate(d: string) {
		const [month, year] = d.split(' ');
		return new Date(parseInt(year), monthIndex[month] ?? 0);
	}

	function matchesBase(p: BlogPost) {
		return selectedTags.every((t) => p.tags.includes(t));
	}

	const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

	const availableTags = $derived(
		allTags.filter(
			(t) =>
				selectedTags.includes(t) ||
				posts.some((p) => matchesBase(p) && p.tags.includes(t) && !selectedTags.includes(t))
		)
	);

	const filteredPosts = $derived(
		posts
			.filter(matchesBase)
			.sort((a, b) => {
				if (sortBy === 'date-desc') return parseDate(b.date).getTime() - parseDate(a.date).getTime();
				if (sortBy === 'date-asc')  return parseDate(a.date).getTime() - parseDate(b.date).getTime();
				if (sortBy === 'name-asc')  return a.title.localeCompare(b.title);
				return b.title.localeCompare(a.title);
			})
	);

	function toggleTag(tag: string) {
		selectedTags = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [...selectedTags, tag];
	}

	const hasFilters = $derived(selectedTags.length > 0);
</script>

<svelte:head>
	<title>Blog — QuercusCraft</title>
	<meta name="description" content="In-depth analysis, experiments, and findings from the world of Minecraft technical play." />
</svelte:head>

<div class="min-h-screen bg-stone-950">

	<!-- ── Page header ────────────────────────────────────────────────────── -->
	<div class="border-b-4 border-green-900 bg-stone-900 px-8 py-14 sm:px-12 lg:px-16">
		<p class="mb-2 text-xs font-semibold tracking-widest text-green-600 uppercase">QuercusCraft</p>
		<h1 class="text-5xl font-bold text-white">Blog</h1>
		<p class="mt-3 max-w-xl text-stone-400">In-depth analysis, experiments, and findings from the world of Minecraft technical play.</p>
	</div>

	<!-- ── Filter bar ─────────────────────────────────────────────────────── -->
	<div class="border-b border-stone-800 bg-stone-900/60 px-8 py-4 sm:px-12 lg:px-16">
		<!-- Row 1: Sort -->
		<div class="mb-3 flex flex-wrap items-center gap-2">
			<span class="text-xs font-semibold tracking-widest text-stone-500 uppercase">Sort</span>
			{#each [
				{ v: 'date-desc', l: 'Newest' },
				{ v: 'date-asc',  l: 'Oldest' },
				{ v: 'name-asc',  l: 'A → Z' },
				{ v: 'name-desc', l: 'Z → A' }
			] as opt}
				<button
					onclick={() => (sortBy = opt.v as typeof sortBy)}
					class="border px-3 py-1 text-sm font-medium transition-colors {sortBy === opt.v
						? 'border-green-600 bg-green-900 text-green-300'
						: 'border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200'}"
				>
					{opt.l}
				</button>
			{/each}
		</div>

		<!-- Row 2: Tags -->
		<div class="mb-3 flex flex-wrap gap-2">
			{#each availableTags as tag}
				<button
					onclick={() => toggleTag(tag)}
					class="border px-3 py-1 text-sm font-medium transition-colors {selectedTags.includes(tag)
						? 'border-green-600 bg-green-900 text-green-300'
						: 'border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200'}"
				>
					{tag}
				</button>
			{/each}
		</div>

		<!-- Row 3: Clear + count -->
		<div class="flex items-center justify-between">
			<div>
				{#if hasFilters}
					<button
						onclick={() => { selectedTags = []; }}
						class="border border-stone-600 px-4 py-1.5 text-sm font-semibold text-stone-300 transition-colors hover:border-stone-400 hover:text-white"
					>
						✕ Clear filters
					</button>
				{/if}
			</div>
			<span class="text-4xl font-bold text-white">{filteredPosts.length}</span>
		</div>
	</div>

	<!-- ── Post cards ─────────────────────────────────────────────────────── -->
	<div class="mx-8 sm:mx-12 lg:mx-16">
		<div class="divide-y-4 divide-green-900 border-x-4 border-b-4 border-green-900">
			{#each filteredPosts as post}
				{@const thumb = getThumbnail(post.image)}
				<a
					href={post.href}
					class="flex h-48 bg-stone-950 transition-colors hover:bg-stone-900"
				>
					<!-- Left: image (1/3) -->
					<div class="relative w-1/3 shrink-0 overflow-hidden border-r-4 border-green-900">
						{#if thumb}
							<img
								src={thumb}
								alt={post.alt ?? post.title}
								class="h-full w-full object-cover"
							/>
							<div
								class="absolute inset-0"
								style="background: linear-gradient(to right, transparent 70%, rgba(10,10,10,0.5) 100%)"
								aria-hidden="true"
							></div>
						{:else}
							<!-- Placeholder when no thumbnail is set -->
							<div class="flex h-full w-full items-center justify-center bg-stone-900">
								<span class="text-xs font-semibold tracking-widest text-stone-700 uppercase">{post.category}</span>
							</div>
						{/if}
					</div>

					<!-- Right: content (2/3) -->
					<div class="flex flex-1 flex-col justify-between p-6 lg:p-8">
						<div>
							<p class="mb-1 text-xs font-semibold tracking-widest text-green-600 uppercase">
								{post.category} &nbsp;·&nbsp; {post.date}
							</p>
							<h2 class="mb-2 text-xl font-bold text-white lg:text-2xl">{post.title}</h2>
							<p class="line-clamp-2 text-sm leading-relaxed text-stone-400 lg:text-base">{post.excerpt}</p>
						</div>
						<div class="flex flex-wrap gap-1.5">
							{#each post.tags as tag}
								<span class="border border-stone-700 bg-stone-900 px-2 py-0.5 text-xs text-stone-500">
									{tag}
								</span>
							{/each}
						</div>
					</div>
				</a>
			{/each}

			{#if filteredPosts.length === 0}
				<div class="flex h-48 items-center justify-center">
					<p class="text-stone-600">No posts match the selected filters.</p>
				</div>
			{/if}
		</div>
	</div>
</div>
