<script lang="ts">
	import type { Snippet } from 'svelte';

	// ── "The Short Answer" block ──────────────────────────────────────────────
	// Sits at the top of a post and answers the question the page is about in a
	// few self-contained sentences. Two audiences: readers who only want the
	// conclusion, and search/AI engines, which quote a direct answer far more
	// readily than they infer one from prose or tables further down the page.
	//
	// Rules for the copy inside it:
	//   - Lead with the answer, not the setup.
	//   - Make it readable lifted out of context — name the subject explicitly
	//     ("the fastest bamboo farm in Minecraft is…", not "the fastest is…").
	//   - State numbers plainly and avoid hedges like "roughly" or "about".
	//   - Only claim what the page below actually demonstrates.

	interface Props {
		/** Question this block answers, phrased as a reader would search it. */
		heading: string;
		/** Anchor id — also used for the sidebar nav entry. */
		id?: string;
		eyebrow?: string;
		children: Snippet;
		/** Optional extra content below the box: stat tiles, caveats, links. */
		footer?: Snippet;
	}

	let { heading, id = 'short-answer', eyebrow = 'The Short Answer', children, footer }: Props =
		$props();
</script>

<section {id} class="border-b border-stone-800 py-16">
	<div class="mx-auto max-w-4xl px-8">
		<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">{eyebrow}</p>
		<h2 class="mb-8 text-center text-3xl font-bold text-white">{heading}</h2>

		<div class="border-2 border-green-800 bg-stone-900 px-8 py-8">
			<div class="space-y-5 text-xl leading-relaxed text-stone-200">
				{@render children()}
			</div>
		</div>

		{#if footer}
			{@render footer()}
		{/if}
	</div>
</section>
