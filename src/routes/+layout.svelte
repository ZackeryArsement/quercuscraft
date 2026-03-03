<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/global/Navbar.svelte';
	import Footer from '$lib/components/global/Footer.svelte';

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
	<Footer />
</div>
