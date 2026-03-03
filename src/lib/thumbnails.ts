// Eagerly imports every PNG from buildThumbnail so Vite hashes and optimises
// them at build time. Import this helper wherever build thumbnails are needed
// rather than duplicating the glob in each component.
const modules = import.meta.glob<{ default: string }>('./assets/buildThumbnail/*.webp', {
	eager: true
});

export function getBuildThumbnail(filename: string): string | null {
	return modules[`./assets/buildThumbnail/${filename}`]?.default ?? null;
}
