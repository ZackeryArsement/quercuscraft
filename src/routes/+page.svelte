<script lang="ts">
	import type { PostCard, Affiliate } from '$lib/types';
	import { builds } from '$lib/data/builds';
	import HeroSection from '$lib/components/landingPage/HeroSection.svelte';
	import FeaturedBuilds from '$lib/components/FeaturedBuilds.svelte';
	import LatestPosts from '$lib/components/LatestPosts.svelte';
	import QuickLinks from '$lib/components/landingPage/QuickLinks.svelte';
	import DonationSection from '$lib/components/landingPage/DonationSection.svelte';
	import AffiliatesSection from '$lib/components/landingPage/AffiliatesSection.svelte';

	/*const affiliates: Affiliate[] = [
		{
			name: 'GPORTAL',
			description: 'Want to host your own server? Use GPORTAL, my go to server provider for whenever I want to play minecraft and have a smooth online experience',
			url: 'https://example.com',
			category: 'Server Hosting',
			gradient: ['#0a1f5c', '#1a1a1a']
		},
		{
			name: 'NordVPN',
			description: 'Use NordVPN!',
			url: 'https://example.com',
			category: 'VPN Provider',
			gradient: ['#0b7a8a', '#7a9ea8']
		}
	];*/

	const latestPosts: PostCard[] = [
		{
			title: 'Etho Hour',
			type: 'Technical',
			date: 'Dec 23, 2025',
			excerpt: 'An extensive proposal for standardizing time in Minecraft',
			href: '/blog/etho-hour'
		}/*,
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
		}*/
	];
</script>

<HeroSection />
<FeaturedBuilds {builds} />
<LatestPosts posts={latestPosts} />
<!-- <AffiliatesSection {affiliates} /> -->
<QuickLinks />
<DonationSection />
