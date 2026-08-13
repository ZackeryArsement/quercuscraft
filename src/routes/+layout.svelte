<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/global/Navbar.svelte';
	import Footer from '$lib/components/global/Footer.svelte';
	import { SITE_URL, SITE_NAME, YOUTUBE_CHANNEL, PATREON } from '$lib/seo';

	let { children } = $props();

	// Site-wide identity only. Titles, descriptions and social cards belong to
	// the individual pages (via <Seo>) — emitting them here too would duplicate
	// every tag, and search engines then have to guess which one is canonical.
	const siteLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': `${SITE_URL}/#organization`,
				name: SITE_NAME,
				url: SITE_URL,
				logo: `${SITE_URL}/favicon.svg`,
				sameAs: [YOUTUBE_CHANNEL, PATREON]
			},
			{
				'@type': 'WebSite',
				'@id': `${SITE_URL}/#website`,
				name: SITE_NAME,
				url: SITE_URL,
				publisher: { '@id': `${SITE_URL}/#organization` },
				inLanguage: 'en'
			}
		]
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(siteLd).replace(/</g, '\\u003c')}<\/script>`}
</svelte:head>

<div class="flex min-h-screen flex-col bg-stone-950 text-stone-100">
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
