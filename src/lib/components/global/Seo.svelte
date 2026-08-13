<script lang="ts">
	import { SITE_NAME, abs } from '$lib/seo';

	interface Props {
		/** Full contents of <title>. Keep the target phrase near the front. */
		title: string;
		description: string;
		/** Site-relative path of this page, e.g. '/builds/chess-valley'. */
		path: string;
		/** Social card image — site-relative path under /static, 1200x630. */
		image?: string;
		imageAlt?: string;
		/** 'website' for indexes and the home page, 'article' for a build/post. */
		type?: 'website' | 'article';
		/** Emitted as <meta name="keywords">. Google ignores it; Bing still reads it. */
		keywords?: string[];
		/** One or more schema.org objects, each emitted as its own ld+json block. */
		jsonLd?: Record<string, unknown>[];
	}

	let {
		title,
		description,
		path,
		image = '/og/default.jpg',
		imageAlt,
		type = 'website',
		keywords,
		jsonLd = []
	}: Props = $props();

	const url = $derived(abs(path));
	const imageUrl = $derived(abs(image));

	// Escaping every `<` stops a closing script tag inside any string value from
	// terminating the block early. Inlined via {@html} because Svelte will not
	// render raw text into a script element for us.
	function ldBlock(data: Record<string, unknown>): string {
		const json = JSON.stringify(data).replace(/</g, '\\u003c');
		return `<script type="application/ld+json">${json}<\/script>`;
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if keywords?.length}
		<meta name="keywords" content={keywords.join(', ')} />
	{/if}
	<link rel="canonical" href={url} />

	<!-- Open Graph — Discord, Facebook, LinkedIn, Reddit -->
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:secure_url" content={imageUrl} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	{#if imageAlt}
		<meta property="og:image:alt" content={imageAlt} />
	{/if}
	<meta property="og:locale" content="en_US" />

	<!-- X / Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	{#if imageAlt}
		<meta name="twitter:image:alt" content={imageAlt} />
	{/if}

	<!-- Let Google use a full-size image and video preview if it wants to -->
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

	{#each jsonLd as data, i (i)}
		{@html ldBlock(data)}
	{/each}
</svelte:head>
