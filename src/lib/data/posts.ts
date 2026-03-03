import type { BlogPost } from '$lib/types';

export const posts: BlogPost[] = [
	{
		title: 'Etho Hour',
		category: 'Analysis',
		date: 'Dec 2025',
		excerpt:
			"Minecraft has no standardized unit of time. A tick is roughly 1/20th of a second — but lag can quietly stretch your seconds, skew your farm timings, and corrupt your data. Here's how to fix it.",
		tags: ['Redstone', 'Analysis', 'Technical', 'Clocks'],
		href: '/blog/etho-hour',
		image: 'ETHO_HOPPER_CLOCK.webp',
		alt: 'An Etho Hopper Clock built in Minecraft',
		youtubeUrl: 'https://www.youtube.com/watch?v=fy5y5KW3OwI'
	}
];
