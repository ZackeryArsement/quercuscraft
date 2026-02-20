<script lang="ts">
	interface BuildCard {
		title: string;
		category: string;
		date: string;
		description: string;
		tags: string[];
		href: string;
	}

	interface PostCard {
		title: string;
		type: string;
		date: string;
		excerpt: string;
		href: string;
	}

	const featuredBuilds: BuildCard[] = [
		{
			title: 'Oak Forest Cottage',
			category: 'Survival',
			date: 'Feb 2026',
			description: 'A cozy woodland retreat nestled into a hillside, with a wraparound porch and hand-crafted interior.',
			tags: ['Survival', 'Medieval', 'Small'],
			href: '/builds/oak-forest-cottage'
		},
		{
			title: 'Iron District Trading Post',
			category: 'Medieval',
			date: 'Jan 2026',
			description: 'A sprawling market district with merchant stalls, a blacksmith, and a central fountain plaza.',
			tags: ['Medieval', 'Mega', 'Town'],
			href: '/builds/iron-district'
		},
		{
			title: 'Floating Sky Fortress',
			category: 'Fantasy',
			date: 'Dec 2025',
			description: 'An impossible fortress suspended in the clouds, held aloft by ancient-looking stone chains.',
			tags: ['Fantasy', 'Mega', 'Showcase'],
			href: '/builds/sky-fortress'
		}
	];

	const latestPosts: PostCard[] = [
		{
			title: 'How I Build Organic Tree Canopies',
			type: 'Tutorial',
			date: 'Feb 18, 2026',
			excerpt: 'A step-by-step breakdown of my leaf placement technique for making trees look natural at any scale.',
			href: '/tutorials/organic-tree-canopies'
		},
		{
			title: 'Iron District — Full World Download',
			type: 'World Download',
			date: 'Feb 10, 2026',
			excerpt: 'The complete medieval trading district is now available to download, including schematic files.',
			href: '/downloads/iron-district-world'
		},
		{
			title: 'Building the Sky Fortress — Timelapse & BTS',
			type: 'Blog',
			date: 'Jan 28, 2026',
			excerpt: 'A look behind the scenes at how the floating fortress came together over three weeks.',
			href: '/blog/sky-fortress-bts'
		},
		{
			title: 'Mastering Stone Palettes for Medieval Builds',
			type: 'Tutorial',
			date: 'Jan 15, 2026',
			excerpt: 'Which stone variants to use together, which to avoid, and how to add depth without noise.',
			href: '/tutorials/stone-palettes'
		}
	];

	const typeColors: Record<string, string> = {
		Tutorial: 'bg-green-900/50 text-green-400 border border-green-800',
		'World Download': 'bg-blue-900/50 text-blue-400 border border-blue-800',
		Blog: 'bg-stone-800 text-stone-400 border border-stone-700'
	};
</script>

<!-- ── Hero ── -->
<section class="hero-bg relative overflow-hidden px-4 py-28 sm:py-36">
	<!-- Decorative block grid overlay -->
	<div
		class="pointer-events-none absolute inset-0"
		style="
			background-image:
				linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px),
				linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px);
			background-size: 32px 32px;
		"
		aria-hidden="true"
	></div>

	<!-- Radial glow -->
	<div
		class="pointer-events-none absolute inset-0"
		style="background: radial-gradient(ellipse 60% 50% at 50% 40%, rgba(34,197,94,0.08) 0%, transparent 70%)"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto max-w-3xl text-center">
		<p class="mb-4 text-xs font-semibold tracking-widest text-green-400 uppercase">
			Minecraft Builds &amp; Tutorials
		</p>
		<h1 class="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
			Welcome to<br />
			<span class="text-green-400">QuercusCraft</span>
		</h1>
		<p class="mx-auto mb-10 max-w-xl text-lg text-stone-400">
			A showcase of Minecraft builds — from cozy survival cottages to sprawling medieval cities.
			Tutorials, world downloads, and behind-the-scenes included.
		</p>
		<div class="flex flex-wrap justify-center gap-3">
			<a
				href="/builds"
				class="rounded-md bg-green-500 px-6 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-green-400"
			>
				Browse Builds
			</a>
			<a
				href="/tutorials"
				class="rounded-md border border-stone-600 px-6 py-3 text-sm font-semibold text-stone-200 transition-colors hover:border-stone-400 hover:text-white"
			>
				View Tutorials
			</a>
		</div>
	</div>
</section>

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
			{#each featuredBuilds as build}
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
			{/each}
		</div>
	</div>
</section>

<!-- ── Latest Posts ── -->
<section class="border-t border-stone-800 px-4 py-16 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="mb-8 flex items-end justify-between">
			<div>
				<p class="mb-1 text-xs font-semibold tracking-widest text-green-400 uppercase">Recent</p>
				<h2 class="text-2xl font-bold text-white">Latest Posts</h2>
			</div>
			<a href="/blog" class="text-sm text-stone-400 transition-colors hover:text-green-400">
				All posts →
			</a>
		</div>

		<div class="grid gap-4 sm:grid-cols-2">
			{#each latestPosts as post}
				<a
					href={post.href}
					class="group flex flex-col gap-3 rounded-xl border border-stone-800 bg-stone-900 p-5 transition-colors hover:border-stone-600"
				>
					<div class="flex items-center justify-between gap-2">
						<span class="rounded-full px-2.5 py-0.5 text-xs font-medium {typeColors[post.type] ?? typeColors['Blog']}">
							{post.type}
						</span>
						<span class="text-xs text-stone-600">{post.date}</span>
					</div>

					<h3 class="font-semibold text-white transition-colors group-hover:text-green-400">
						{post.title}
					</h3>
					<p class="text-sm leading-relaxed text-stone-400">{post.excerpt}</p>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ── Quick Links ── -->
<section class="border-t border-stone-800 px-4 py-16 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="grid gap-4 sm:grid-cols-3">
			<a
				href="/tutorials"
				class="group flex flex-col gap-3 rounded-xl border border-stone-800 bg-stone-900 p-6 transition-colors hover:border-green-800 hover:bg-stone-800"
			>
				<span class="text-2xl" aria-hidden="true">📖</span>
				<h3 class="font-semibold text-white">Tutorials</h3>
				<p class="text-sm text-stone-400">Building techniques, tips, and guides for all skill levels.</p>
				<span class="mt-auto text-sm text-green-400 transition-colors group-hover:text-green-300">
					Browse tutorials →
				</span>
			</a>

			<a
				href="/downloads/worlds"
				class="group flex flex-col gap-3 rounded-xl border border-stone-800 bg-stone-900 p-6 transition-colors hover:border-blue-800 hover:bg-stone-800"
			>
				<span class="text-2xl" aria-hidden="true">⬇️</span>
				<h3 class="font-semibold text-white">World Downloads</h3>
				<p class="text-sm text-stone-400">Full worlds and schematics ready to drop into your game.</p>
				<span class="mt-auto text-sm text-blue-400 transition-colors group-hover:text-blue-300">
					Get downloads →
				</span>
			</a>

			<a
				href="/blog"
				class="group flex flex-col gap-3 rounded-xl border border-stone-800 bg-stone-900 p-6 transition-colors hover:border-stone-600 hover:bg-stone-800"
			>
				<span class="text-2xl" aria-hidden="true">✍️</span>
				<h3 class="font-semibold text-white">Blog</h3>
				<p class="text-sm text-stone-400">Project updates, timelapses, and behind-the-scenes posts.</p>
				<span class="mt-auto text-sm text-stone-400 transition-colors group-hover:text-stone-300">
					Read the blog →
				</span>
			</a>
		</div>
	</div>
</section>
