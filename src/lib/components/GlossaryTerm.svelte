<script lang="ts">
	import { glossary } from '$lib/data/glossary';

	interface Props {
		/** Slug of a glossary entry, e.g. 'tick'. */
		slug: string;
		/** Link text. Defaults to the entry's term. Use this to match surrounding prose. */
		children?: import('svelte').Snippet;
	}

	let { slug, children }: Props = $props();

	const entry = $derived(glossary.find((e) => e.slug === slug));
</script>

<!--
	Inline reference into /glossary. Dotted underline rather than a full link
	colour so a paragraph with two or three of these still reads as prose.
-->
<a
	href="/glossary#{slug}"
	title={entry?.short}
	class="text-stone-100 underline decoration-green-700 decoration-dotted underline-offset-4 transition-colors hover:text-green-300 hover:decoration-green-400"
>
	{#if children}{@render children()}{:else}{entry?.term ?? slug}{/if}
</a>
