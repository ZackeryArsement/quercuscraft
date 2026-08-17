import type { BuildCard } from '$lib/types';

export const builds: BuildCard[] = [
	{
		title: 'The Arcade Claw Machine',
		category: 'Game',
		date: 'Aug 2026',
		description:
			'A fully working claw machine inside a hand-lit arcade — nine colour-matched prizes, and completely unbreakable.',
		tags: ['Technical', 'Game', 'Redstone', 'Vanilla'],
		href: '/builds/arcade-claw-machine',
		featured: true,
		image: 'ARCADE_CLAW.webp',
		alt: 'The R-QADE claw machine cabinet in vanilla Minecraft, its prize pit packed with colourful toys',
		youtubeUrl: 'https://www.youtube.com/watch?v=0S7wxkARBO4&t=554s',
		videoUploadDate: '2026-08-13T12:00:00-05:00'
	},
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
		// Primary video: the technical showcase. The earlier casual playthrough
		// (Q_N5OvFtnvw, 3 Mar 2026) is embedded further down the build page.
		youtubeUrl: 'https://youtu.be/opvlO2BStZY',
		videoUploadDate: '2026-03-16T12:00:00-05:00'
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
		youtubeUrl: 'https://www.youtube.com/watch?v=WUqqw2ixf5M&t=56s',
		videoUploadDate: '2026-01-12T12:00:00-06:00'
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
		youtubeUrl: 'https://www.youtube.com/watch?v=16LjyiLmYjQ',
		videoUploadDate: '2026-01-03T12:00:00-06:00'
	}
];
