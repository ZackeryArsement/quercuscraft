export interface BuildCard {
	title: string;
	category: string;
	date: string;
	description: string;
	tags: string[];
	href: string;
	featured?: boolean;
	image?: string; // filename in src/lib/assets/buildThumbnail/, e.g. 'CHESS_SHOWCASE.png'
	alt?: string;   // alt text for the image
	youtubeUrl?: string;
}

export interface BlogPost {
	title: string;
	category: string;
	date: string;
	excerpt: string;
	tags: string[];
	href: string;
	image?: string; // filename in src/lib/assets/blogThumbnails/
	alt?: string;
	youtubeUrl?: string;
}

export interface PostCard {
	title: string;
	type: string;
	date: string;
	excerpt: string;
	href: string;
}

export interface Affiliate {
	name: string;
	description: string;
	url: string;
	logo?: string;                // path to image in /static, e.g. '/logos/foo.png'
	category?: string;            // e.g. 'Content Creator', 'Server Host', 'Tool'
	gradient?: [string, string];  // [top-left color, bottom-right color]
}
