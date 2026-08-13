// ── Site-wide SEO constants and helpers ──────────────────────────────────────
// Single source of truth for anything that has to be an absolute URL (Open
// Graph images, canonical links and structured data all reject relative paths).

export const SITE_URL = 'https://www.quercuscraft.com';
export const SITE_NAME = 'QuercusCraft';
export const YOUTUBE_CHANNEL = 'https://www.youtube.com/@QuercusCraft';
export const PATREON = 'https://www.patreon.com/cw/QuercusCraft';

/** Turn a site-relative path into an absolute URL. Passes through absolute URLs. */
export function abs(pathOrUrl: string): string {
	if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
	return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

/** Pull the 11-character video id out of any common YouTube URL shape. */
export function youTubeId(url: string | undefined): string | null {
	if (!url) return null;
	const m =
		url.match(/[?&]v=([A-Za-z0-9_-]{11})/) ??
		url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/) ??
		url.match(/\/embed\/([A-Za-z0-9_-]{11})/);
	return m?.[1] ?? null;
}

export function youTubeThumb(id: string): string {
	return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

export function youTubeEmbed(id: string): string {
	return `https://www.youtube.com/embed/${id}`;
}

/** Publisher stanza reused across every structured-data block. */
export const publisher = {
	'@type': 'Organization',
	name: SITE_NAME,
	url: SITE_URL,
	sameAs: [YOUTUBE_CHANNEL, PATREON]
};

export interface Crumb {
	name: string;
	path: string;
}

export function breadcrumbs(crumbs: Crumb[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: c.name,
			item: abs(c.path)
		}))
	};
}
