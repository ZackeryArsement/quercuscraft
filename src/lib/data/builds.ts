import type { BuildCard } from '$lib/types';

export const builds: BuildCard[] = [
	{
		title: 'Chess Valley',
		category: 'Game',
		date: 'Mar 2026',
		description: 'A playable chess map inside of a custom interactive valley, with a hidden puzzle.',
		tags: ['Technical', 'Game', 'Puzzle'],
		href: '/builds/chess-valley',
		featured: true,
		image: 'CHESS_SHOWCASE.webp',
		alt: 'Ground view of Chess Valley highlighting a pawn on the chess board',
		youtubeUrl: 'https://www.youtube.com/watch?v=Q_N5OvFtnvw'
	},
	{
		title: 'Detector Rail Bamboo Farm',
		category: 'Resource',
		date: 'Jan 2026',
		description: 'Innovative, tileable bamboo farm that does not break during chunk unloading',
		tags: ['Survival', 'Technical', 'Farm', 'Bamboo'],
		href: '/builds/detector-bamboo-farm',
		featured: true,
		image: 'DETECTOR_RAIL_FARM.webp',
		alt: 'Minecart actively harvesting bamboo in original bamboo farm',
		youtubeUrl: 'https://www.youtube.com/watch?v=WUqqw2ixf5M&t=56s'
	},
	{
		title: 'Bamboo Comparisons',
		category: 'Resource',
		date: 'Dec 2025',
		description: 'Comparative results for the major bamboo farm varieties',
		tags: ['Technical', 'Farm', 'Bamboo'],
		href: '/builds/bamboo-comparisons',
		featured: true,
		image: 'BAMBOO_COMPARISON.webp',
		alt: 'Close up of Minecraft Panda eating a bamboo shoot',
		youtubeUrl: 'https://www.youtube.com/watch?v=16LjyiLmYjQ'
	}
];
