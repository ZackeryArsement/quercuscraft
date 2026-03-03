<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';

	export interface NavSub {
		id: string;
		label: string;
	}

	export interface NavSection {
		id: string;
		label: string;
		sub?: NavSub[];
	}

	interface Props {
		title: string;
		heroSrc: string;
		heroAlt?: string;
		navSections: NavSection[];
		children: Snippet;
	}

	let { title, heroSrc, heroAlt = '', navSections, children }: Props = $props();

	let activeId = $state('');

	onMount(() => {
		const allIds = navSections.flatMap((s) => [s.id, ...(s.sub?.map((ss) => ss.id) ?? [])]);
		const observers: IntersectionObserver[] = [];

		for (const id of allIds) {
			const el = document.getElementById(id);
			if (!el) continue;

			const obs = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) activeId = id;
				},
				// Element becomes "active" when it enters the upper 40% of the viewport
				{ rootMargin: '-5% 0px -55% 0px', threshold: 0 }
			);
			obs.observe(el);
			observers.push(obs);
		}

		return () => observers.forEach((obs) => obs.disconnect());
	});
</script>

<article style="background: radial-gradient(ellipse 120% 80% at 50% 50%, #111711 0%, #0d0d0d 45%, #080808 100%); background-attachment: fixed;">
	<!-- ── Hero ──────────────────────────────────────────────────────────────── -->
	<div class="relative h-[65vh] min-h-[420px] overflow-hidden">
		<img
			src={heroSrc}
			alt={heroAlt}
			class="absolute inset-0 h-full w-full object-cover"
		/>
		<!-- Gradient: strong at bottom so title is always legible, subtle at top -->
		<div
			class="absolute inset-0"
			style="background: linear-gradient(to top, rgba(0,0,0,0.92) 25%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.1) 100%)"
			aria-hidden="true"
		></div>

		<!-- Bottom bar: title left, download button right — aligns to body max-width -->
		<div class="absolute right-0 bottom-0 left-0 pb-10">
		<div class="mx-auto flex max-w-6xl items-end justify-between px-10">
			<h1 class="max-w-2xl text-5xl font-bold leading-tight text-white drop-shadow-lg lg:text-6xl">
				{title}
			</h1>
			<a
				href="#download"
				class="shrink-0 border-2 border-green-600 bg-green-900/60 px-6 py-3 text-sm font-semibold text-green-300 backdrop-blur-sm transition-colors hover:bg-green-700 hover:text-white"
			>
				Go To Download ↓
			</a>
		</div>
		</div>
	</div>

	<!-- ── Body: sidebar + content ───────────────────────────────────────────── -->
	<div class="mx-auto flex max-w-6xl">
		<!-- Left sidebar (desktop only) -->
		<aside class="hidden w-52 shrink-0 xl:block xl:w-60">
			<nav
				class="sticky top-16 flex h-[calc(100vh-4rem)] flex-col overflow-y-auto border-r border-stone-800 px-5 py-8"
				aria-label="Post sections"
			>
				<p class="mb-5 text-m font-semibold tracking-widest text-green-600 uppercase">
					Contents
				</p>

				<ul class="space-y-0.5">
					{#each navSections as section}
						<li>
							<button
								class="w-full border-l-2 py-1.5 pr-2 pl-3 text-left text-m transition-colors {activeId ===
								section.id
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
												class="w-full border-l-2 py-1 pr-2 pl-6 text-left text-xs transition-colors {activeId ===
												sub.id
													? 'border-green-500 text-green-400'
													: 'border-stone-800 text-stone-600 hover:border-stone-600 hover:text-stone-400'}"
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
		<main class="min-w-0 flex-1">
			{@render children()}
		</main>
	</div>
</article>
