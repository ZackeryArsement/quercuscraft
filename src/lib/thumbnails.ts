// Eagerly imports every webp from postThumbnail so Vite hashes and optimises
// them at build time. Import this helper wherever post thumbnails are needed
// rather than duplicating the glob in each component.
const modules = import.meta.glob<{ default: string }>('./assets/posts/postThumbnail/*.webp', {
	eager: true
});

export function getBuildThumbnail(filename: string): string | null {
	return modules[`./assets/posts/postThumbnail/${filename}`]?.default ?? null;
}
