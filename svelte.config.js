import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404s for navbar links that don't have pages yet
				if (message.includes('404')) {
					console.warn(`Warning: 404 for ${path} (linked from ${referrer})`);
					return;
				}
				throw new Error(message);
			}
		}
	},
	preprocess: [mdsvex()],
	extensions: ['.svelte', '.svx']
};

export default config;
