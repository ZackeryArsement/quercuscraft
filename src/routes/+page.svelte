<script lang="ts">
	import type { BuildCard, PostCard, Affiliate } from '$lib/types';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import FeaturedBuilds from '$lib/components/FeaturedBuilds.svelte';
	import LatestPosts from '$lib/components/LatestPosts.svelte';
	import QuickLinks from '$lib/components/QuickLinks.svelte';
	import AffiliatesSection from '$lib/components/AffiliatesSection.svelte';

	const builds: BuildCard[] = [
		{
			title: 'Chess Valley',
			category: 'Game',
			date: 'Jan 2026',
			description: 'A playable chess map inside of a custom interactive valley, with a hidden puzzle.',
			tags: ['Technical', 'Game', 'Puzzle'],
			href: '/builds/chess-valley',
			featured: true
		},
		{
			title: 'Detector Rail Bamboo Farm',
			category: 'Resource',
			date: 'Jan 2026',
			description: 'Innovative, tileable bamboo farm that does not break during chunk unloading',
			tags: ['Survival', 'Technical', 'Farm', 'Bamboo'],
			href: '/builds/detector-bamboo-farm',
			featured: true
		},
		{
			title: 'Bamboo Comparisons',
			category: 'Resource',
			date: 'Dec 2025',
			description: 'Accumulation of different bamboo farms for gathering comparative results.',
			tags: ['Technical', 'Farm', 'Bamboo'],
			href: '/builds/bamboo-comparisons',
			featured: true
		}
	];

	const affiliates: Affiliate[] = [
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
</script>

<HeroSection />
<FeaturedBuilds {builds} />
<LatestPosts posts={latestPosts} />
<AffiliatesSection {affiliates} />
<QuickLinks />
