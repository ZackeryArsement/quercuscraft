<script lang="ts">
	import { onMount } from 'svelte';

	// ── In-page audio player for original soundtrack clips ────────────────────
	// Point `src` at an imported asset (preferred — Vite content-hashes it) or a
	// path under /static. If the file is missing or the browser can't decode it,
	// the component renders a "coming soon" state instead of a broken button.

	interface Props {
		/** Audio URL — usually an imported asset, e.g. `import song from '...mp3'` */
		src?: string;
		/** Track name shown beside the play button */
		title: string;
		/** Short line under the title — composer credit, length, etc. */
		subtitle?: string;
	}

	let { src, title, subtitle }: Props = $props();

	let audio = $state<HTMLAudioElement | null>(null);
	let scrubber = $state<HTMLElement | null>(null);
	let playing = $state(false);
	let loadFailed = $state(false);
	let current = $state(0);
	let duration = $state(0);

	/** No file configured, or the browser couldn't load the one that is. */
	const unavailable = $derived(!src || loadFailed);
	const progress = $derived(duration > 0 ? (current / duration) * 100 : 0);

	// The src is attached here rather than in the markup on purpose: rendered
	// server-side, the browser starts fetching before Svelte hydrates, so a 404
	// fires `error` with no listener attached and the fallback never shows.
	onMount(() => {
		if (!src || !audio) return;
		if (audio.error) {
			loadFailed = true;
			return;
		}
		audio.src = src;
	});

	function fmt(seconds: number): string {
		if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
		const m = Math.floor(seconds / 60);
		const s = Math.floor(seconds % 60);
		return `${m}:${s.toString().padStart(2, '0')}`;
	}

	async function toggle() {
		if (!audio || unavailable) return;
		if (playing) {
			audio.pause();
			return;
		}
		try {
			await audio.play();
		} catch {
			// Missing file, unsupported codec, or a blocked autoplay policy.
			loadFailed = true;
			playing = false;
		}
	}

	function seek(event: MouseEvent) {
		if (!audio || !scrubber || unavailable || duration <= 0) return;
		const rect = scrubber.getBoundingClientRect();
		if (rect.width <= 0) return;
		const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
		audio.currentTime = ratio * duration;
		current = audio.currentTime;
	}
</script>

<div class="border-2 border-stone-700 bg-stone-950 p-6 sm:p-8">
	{#if src}
		<audio
			bind:this={audio}
			preload="metadata"
			onplay={() => (playing = true)}
			onpause={() => (playing = false)}
			onended={() => {
				playing = false;
				current = 0;
			}}
			onloadedmetadata={() => (duration = audio?.duration ?? 0)}
			ontimeupdate={() => (current = audio?.currentTime ?? 0)}
			onerror={() => {
				loadFailed = true;
				playing = false;
			}}
		></audio>
	{/if}

	<div class="flex items-center gap-5">
		<button
			onclick={toggle}
			disabled={unavailable}
			aria-label={playing ? `Pause ${title}` : `Play ${title}`}
			class="flex h-16 w-16 shrink-0 items-center justify-center border-2 transition-colors {unavailable
				? 'cursor-not-allowed border-stone-700 text-stone-600'
				: 'border-green-600 bg-green-900 text-green-300 hover:bg-green-700 hover:text-white'}"
		>
			{#if unavailable}
				<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 4.9 14.3L5.7 7.1A8 8 0 0 1 12 4zm0 16a8 8 0 0 1-6.3-12.9l11.2 11.2A8 8 0 0 1 12 20z" />
				</svg>
			{:else if playing}
				<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M7 4h4v16H7zM13 4h4v16h-4z" />
				</svg>
			{:else}
				<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M6 3.5v17l14-8.5z" />
				</svg>
			{/if}
		</button>

		<div class="min-w-0 flex-1">
			<p class="mb-1 text-xs font-semibold tracking-widest text-green-600 uppercase">
				{unavailable ? 'Original Soundtrack — Coming Soon' : 'Original Soundtrack'}
			</p>
			<p class="truncate text-lg font-bold text-white">{title}</p>
			{#if subtitle}
				<p class="mt-0.5 truncate text-sm text-stone-500">{subtitle}</p>
			{/if}

			<!-- Progress bar / scrubber -->
			<button
				type="button"
				bind:this={scrubber}
				onclick={seek}
				disabled={unavailable}
				aria-label="Seek within {title}"
				class="mt-3 block h-2.5 w-full border border-stone-700 bg-stone-900 p-0 {unavailable
					? 'cursor-default'
					: 'cursor-pointer'}"
			>
				<div class="pointer-events-none h-full bg-green-600" style="width: {progress}%"></div>
			</button>

			<div class="mt-1.5 flex justify-between font-mono text-xs text-stone-600">
				<span>{unavailable ? '--:--' : fmt(current)}</span>
				<span>{unavailable ? '--:--' : fmt(duration)}</span>
			</div>
		</div>
	</div>

	{#if unavailable}
		<p class="mt-5 border-t border-stone-800 pt-4 text-sm leading-relaxed text-stone-500">
			The track isn't uploaded yet — the player will light up automatically the moment the audio
			file lands on the server.
		</p>
	{/if}
</div>
