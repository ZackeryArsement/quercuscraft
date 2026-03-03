<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import DonationSection from '$lib/components/landingPage/DonationSection.svelte';

	export interface NavSection {
		id: string;
		label: string;
		sub?: { id: string; label: string }[];
	}

	interface Props {
		title: string;
		category: string;
		date: string;
		tags?: string[];
		navSections: NavSection[];
		youtubeUrl?: string;
		children: Snippet;
	}

	let { title, category, date, tags = [], navSections, youtubeUrl, children }: Props = $props();

	let activeId = $state('');
	let videoOpen = $state(false);

	function toEmbedUrl(url: string): string {
		if (url.includes('/embed/')) return url;
		const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
		if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
		const longMatch = url.match(/[?&]v=([^&]+)/);
		if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`;
		return url;
	}

	onMount(() => {
		const allIds = navSections.flatMap((s) => [s.id, ...(s.sub?.map((ss) => ss.id) ?? [])]);

		const obs = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) activeId = entry.target.id;
				}
			},
			{ rootMargin: '-5% 0px -55% 0px', threshold: 0 }
		);

		for (const id of allIds) {
			const el = document.getElementById(id);
			if (el) obs.observe(el);
		}

		return () => obs.disconnect();
	});
</script>

<article style="background: radial-gradient(ellipse 120% 80% at 50% 50%, #111711 0%, #0d0d0d 45%, #080808 100%); background-attachment: fixed;">

	<!-- ── Header ────────────────────────────────────────────────────────────── -->
	<div class="border-b-4 border-green-900" style="background: linear-gradient(160deg, #0c120c 0%, #111a11 40%, #090c09 100%);">
		<div class="mx-auto max-w-6xl px-10 py-20">
			<p class="mb-4 text-xs font-semibold tracking-widest text-green-600 uppercase">
				{category} &nbsp;·&nbsp; {date}
			</p>
			<h1 class="mb-6 max-w-3xl text-5xl font-bold leading-tight text-white lg:text-6xl">
				{title}
			</h1>
			<div class="flex flex-wrap items-center gap-3">
				{#if tags.length > 0}
					{#each tags as tag}
						<span class="border border-stone-700 bg-stone-900 px-3 py-1 text-xs font-medium text-stone-400">
							{tag}
						</span>
					{/each}
				{/if}
				{#if youtubeUrl}
					<button
						onclick={() => (videoOpen = !videoOpen)}
						class="flex items-center gap-2 border border-stone-600 bg-stone-900 px-4 py-1.5 text-xs font-semibold text-stone-300 transition-colors hover:border-stone-400 hover:text-white"
					>
						<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
						</svg>
						{videoOpen ? 'Hide Video' : 'Watch on YouTube'}
					</button>
				{/if}
			</div>
		</div>
	</div>

	<!-- ── YouTube dropdown ───────────────────────────────────────────────────── -->
	{#if videoOpen && youtubeUrl}
		<div class="border-b border-stone-800 bg-stone-950 px-10 py-8">
			<div class="mx-auto max-w-4xl">
				<div class="relative w-full overflow-hidden" style="padding-bottom: 56.25%;">
					<iframe
						class="absolute inset-0 h-full w-full"
						src={toEmbedUrl(youtubeUrl)}
						title="YouTube video"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
			</div>
		</div>
	{/if}

	<!-- ── Body: sidebar + content ───────────────────────────────────────────── -->
	<div class="mx-auto flex max-w-6xl">
		<!-- Left sidebar (desktop only) -->
		<aside class="hidden w-52 shrink-0 xl:block xl:w-60">
			<nav
				class="sticky top-16 flex h-[calc(100vh-4rem)] flex-col overflow-y-auto border-r border-stone-800 px-5 py-8"
				aria-label="Post sections"
			>
				<p class="mb-5 text-m font-semibold tracking-widest text-green-600 uppercase">Contents</p>

				<ul class="space-y-0.5">
					{#each navSections as section}
						<li>
							<button
								class="w-full border-l-2 py-1.5 pr-2 pl-3 text-left text-m transition-colors {activeId === section.id
									? 'border-green-500 text-green-400'
									: 'border-stone-700 text-stone-500 hover:border-stone-500 hover:text-stone-300'}"
								onclick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
							>
								{section.label}
							</button>

							{#if section.sub}
								<ul class="mt-0.5 mb-1">
									{#each section.sub as sub}
										<li>
											<button
												class="w-full border-l-2 py-1 pr-2 pl-6 text-left text-sm transition-colors {activeId === sub.id
													? 'border-green-500 text-green-400'
													: 'border-stone-700 text-stone-500 hover:border-stone-500 hover:text-stone-300'}"
												onclick={() => document.getElementById(sub.id)?.scrollIntoView({ behavior: 'smooth' })}
											>
												{sub.label}
											</button>
										</li>
									{/each}
								</ul>
							{/if}
						</li>
					{/each}
				</ul>
			</nav>
		</aside>

		<!-- Main content -->
		<div class="min-w-0 flex-1">
			{@render children()}
		</div>
	</div>

	<DonationSection />
</article>
