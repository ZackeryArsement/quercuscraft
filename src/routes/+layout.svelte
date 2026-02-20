<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>QuercusCraft</title>
	<meta name="description" content="Minecraft builds, tutorials, and world downloads by QuercusCraft." />
</svelte:head>

<div class="flex min-h-screen flex-col bg-stone-950 text-stone-100">
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="border-t border-stone-800 bg-stone-950 px-4 py-10">
		<div class="mx-auto max-w-7xl">
			<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<p class="text-sm font-semibold text-white">QuercusCraft</p>
				<p class="text-xs text-stone-500">Built with SvelteKit &amp; Tailwind CSS</p>
			</div>
		</div>
	</footer>
</div>
