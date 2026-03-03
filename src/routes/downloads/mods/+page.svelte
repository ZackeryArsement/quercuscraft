<script lang="ts">
	interface Mod {
		id: string;
		name: string;
		description: string;
		category: 'Performance' | 'Visual' | 'Building' | 'Camera' | 'Technical' | 'Interface' | 'Library';
		href: string;
		icon?: string; // filename in assets/mods/icons/
	}

	const categoryColor: Record<Mod['category'], string> = {
		Performance: 'border-amber-700  text-amber-500',
		Visual:      'border-sky-700    text-sky-400',
		Building:    'border-green-700  text-green-400',
		Camera:      'border-purple-700 text-purple-400',
		Technical:   'border-red-800    text-red-400',
		Interface:   'border-stone-600  text-stone-400',
		Library:     'border-stone-700  text-stone-500',
	};

	const icons = import.meta.glob<{ default: string }>(
		'../../../lib/assets/mods/icons/*.webp',
		{ eager: true }
	);

	function getIcon(filename: string | undefined): string | null {
		if (!filename) return null;
		return icons[`../../../lib/assets/mods/icons/${filename}`]?.default ?? null;
	}

	function abbrev(name: string): string {
		const words = name.trim().split(/\s+/);
		if (words.length === 1) return name.slice(0, 3).toUpperCase();
		if (words.length === 2) return (words[0].slice(0, 2) + words[1][0]).toUpperCase();
		return words.slice(0, 3).map(w => w[0]).toUpperCase();
	}

	const mods: Mod[] = [
		{
			id: 'flashback',
			name: 'Flashback',
			description: 'Records gameplay and lets you review, pause, and photograph from any angle after the fact. Every screenshot and cinematic shot on this site was captured using Flashback.',
			category: 'Camera',
			href: 'https://modrinth.com/mod/flashback',
			icon: 'Flashback_Icon.webp'
		},
		{
			id: 'axiom',
			name: 'Axiom',
			description: 'A powerful in-game building and editing tool. Provides a blueprint, selection, and paste workflow integrated directly into the client. Used extensively in the construction of these builds.',
			category: 'Building',
			href: 'https://modrinth.com/mod/axiom',
			icon: 'Axiom_Icon.webp'
		},
		{
			id: 'carpet',
			name: 'Carpet',
			description: 'The definitive technical utility mod. Adds fake players, event logging, spawning visualizers, and dozens of toggleable game rules. If you do serious technical work, you use Carpet.',
			category: 'Technical',
			href: 'https://modrinth.com/mod/carpet',
			icon: 'Carpet_Icon.webp'
		},
		{
			id: 'bobby',
			name: 'Bobby',
			description: "Extends the client's render distance by caching chunks locally beyond what the server sends. Essential for seeing the full scope of large builds without forcing the server to load every chunk.",
			category: 'Visual',
			href: 'https://modrinth.com/mod/bobby',
			icon: 'Bobby_Icon.webp'
		},
		{
			id: 'modmenu',
			name: 'Mod Menu',
			description: 'Provides a unified mod list and settings interface for Fabric mods. Most mods rely on it for their configuration UI — not exciting on its own, but quietly essential.',
			category: 'Interface',
			href: 'https://modrinth.com/mod/modmenu',
			icon: 'ModMenu_Icon.webp'
		},
		{
			id: 'camera-utils',
			name: 'CameraUtils',
			description: 'Adds precise FOV control, camera roll, and cinematic tweaks. Rounds out the camera toolkit alongside Flashback and Freecam for exact framing of screenshots and video.',
			category: 'Camera',
			href: 'https://modrinth.com/mod/camera-utils',
			icon: 'CameraUtils_Icon.webp'
		},
		{
			id: 'iris',
			name: 'Iris Shaders',
			description: 'Brings OptiFine-compatible shader support to Fabric with full Sodium integration. The shadows, lighting, and water effects make builds look dramatically more polished in screenshots.',
			category: 'Visual',
			href: 'https://modrinth.com/mod/iris',
			icon: 'Iris_Icon.webp'
		},
		{
			id: 'simplefog',
			name: 'Simple Fog',
			description: 'Gives precise control over fog distance and density. For cinematic shots, controlling exactly when fog begins and how dense it becomes is indispensable.',
			category: 'Visual',
			href: 'https://modrinth.com/mod/simplefog',
			icon: 'SimpleFog_Icon.webp'
		},
		{
			id: 'minihud',
			name: 'MiniHUD',
			description: 'Adds a configurable information overlay — coordinates, biome, chunk bounds, spawn circles, light levels — directly on-screen. A constant companion for technical play.',
			category: 'Interface',
			href: 'https://modrinth.com/mod/minihud',
			icon: 'MiniHud_Icon.webp'
		},
		{
			id: 'malilib',
			name: 'MaLiLib',
			description: "A shared library by masa that powers Litematica, MiniHUD, and other mods in the suite. Provides no functionality on its own — it simply needs to be present in your mods folder.",
			category: 'Library',
			href: 'https://modrinth.com/mod/malilib',
			icon: 'MaLiLib_Icon.webp'
		},
		{
			id: 'litematica',
			name: 'Litematica',
			description: 'Loads schematic files into the game as a ghost overlay for precise construction. Essential for transferring designs between worlds and building from technical blueprints.',
			category: 'Building',
			href: 'https://modrinth.com/mod/litematica',
			icon: 'Litematica_Icon.webp'
		},
		{
			id: 'freecam',
			name: 'Freecam',
			description: 'Detaches the camera from the player and allows free movement through the world. Works alongside Flashback and CameraUtils for precise shot composition.',
			category: 'Camera',
			href: 'https://modrinth.com/mod/freecam',
			icon: 'Freecam_Icon.webp'
		},
		{
			id: 'lithium',
			name: 'Lithium',
			description: 'Optimizes game logic — mob AI, block ticking, physics, and chunk loading. Works alongside Sodium without overlap: Sodium handles rendering, Lithium handles everything else.',
			category: 'Performance',
			href: 'https://modrinth.com/mod/lithium',
			icon: 'Lithium_Icon.webp'
		},
		{
			id: 'sodium',
			name: 'Sodium',
			description: "Replaces Minecraft's rendering pipeline with a highly optimized one, dramatically improving frame rates without visual changes. The most impactful single performance improvement available.",
			category: 'Performance',
			href: 'https://modrinth.com/mod/sodium',
			icon: 'Sodium_Icon.webp'
		},
	];
</script>

<svelte:head>
	<title>Mods — QuercusCraft</title>
	<meta name="description" content="The full list of Fabric mods used across QuercusCraft builds — performance, visual, building, camera, and technical tools." />
</svelte:head>

<div class="min-h-screen bg-stone-950">

	<!-- ── Page header ────────────────────────────────────────────────────── -->
	<div class="border-b-4 border-green-900 bg-stone-900 px-8 py-14 sm:px-12 lg:px-16">
		<p class="mb-2 font-mono text-xs font-semibold tracking-widest text-green-600 uppercase">
			Downloads / Mods
		</p>
		<h1 class="mb-3 text-5xl font-bold text-white">Mods &amp; Tools</h1>
		<p class="max-w-2xl text-stone-400">
			Every mod used across QuercusCraft builds — from rendering optimizations and cinematic tools
			to technical utilities and construction aids. All mods run on Fabric.
		</p>
	</div>

	<div class="px-8 sm:px-12 lg:px-16">

		<!-- ── Fabric Foundation ──────────────────────────────────────────── -->
		<div class="border-b border-stone-800 py-14">
			<p class="mb-6 font-mono text-xs font-semibold tracking-widest text-green-600 uppercase">
				— Foundation
			</p>

			<div class="flex gap-8 rounded-none border border-green-900 bg-stone-900 p-8 lg:p-10">
				<!-- Icon -->
				<div class="hidden shrink-0 sm:block">
					<div class="flex h-20 w-20 items-center justify-center border border-green-800 bg-stone-950">
						<span class="font-mono text-3xl font-bold text-green-500">F</span>
					</div>
				</div>

				<!-- Content -->
				<div class="min-w-0">
					<div class="mb-1 flex flex-wrap items-baseline gap-3">
						<h2 class="text-2xl font-bold text-white">Fabric Loader</h2>
						<span class="font-mono text-xs text-green-600 uppercase tracking-widest">fabric.mod.loader</span>
					</div>
					<p class="mb-1 text-xs text-stone-600">fabricmc.net</p>

					<div class="mt-4 space-y-3 text-base leading-relaxed text-stone-400">
						<p>
							Fabric is a lightweight, modular mod loader for Minecraft designed to update rapidly
							alongside each game release. Unlike older mod loaders, Fabric separates the loader
							from the API layer, making it faster to maintain and less prone to breaking across
							Minecraft updates. Every mod on this page requires Fabric to function.
						</p>
						<p>
							The Fabric ecosystem has become the preferred platform for technical Minecraft modding.
							Its permissive approach to game internals allows mods like Sodium and Lithium to make
							deep performance optimizations that wouldn't be possible on more restrictive loaders.
							If you're setting up a technical Minecraft environment, Fabric is the starting point.
						</p>
					</div>

					<div class="mt-6 flex flex-wrap gap-3">
						<a
							href="https://fabricmc.net/"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 border border-green-700 bg-green-950 px-5 py-2 font-mono text-sm font-semibold text-green-300 transition-colors hover:bg-green-900 hover:text-white"
						>
							fabricmc.net
							<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
						</a>
						<a
							href="https://fabricmc.net/use/installer/"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 border border-stone-700 px-5 py-2 font-mono text-sm text-stone-400 transition-colors hover:border-stone-500 hover:text-white"
						>
							Download Installer ↓
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- ── Mod grid ───────────────────────────────────────────────────── -->
		<div class="py-14">
			<p class="mb-8 font-mono text-xs font-semibold tracking-widest text-green-600 uppercase">
				— Mods ({mods.length})
			</p>

			<div class="grid grid-cols-1 gap-px border border-stone-800 bg-stone-800 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each mods as mod}
					{@const iconSrc = getIcon(mod.icon)}
					<div class="flex flex-col bg-stone-950 transition-colors hover:bg-stone-900">

						<!-- Card body -->
						<div class="flex flex-1 flex-col p-6">

							<!-- Header: abbrev badge + name + category -->
							<div class="mb-4 flex items-start gap-3">
								<div class="flex h-9 w-9 shrink-0 items-center justify-center border border-stone-700 bg-stone-900">
									<span class="font-mono text-xs font-bold text-stone-400">{abbrev(mod.name)}</span>
								</div>
								<h3 class="flex-1 text-base font-bold leading-snug text-white">{mod.name}</h3>
								<span class="shrink-0 border px-2 py-0.5 font-mono text-xs {categoryColor[mod.category]}">
									{mod.category}
								</span>
							</div>

							<!-- Description -->
							<p class="mb-5 text-sm leading-relaxed text-stone-400">
								{mod.description}
							</p>

							<!-- Icon image (links to Modrinth) -->
							<a
								href={mod.href}
								target="_blank"
								rel="noopener noreferrer"
								class="block border border-stone-800 bg-stone-900"
							>
								{#if iconSrc}
									<img src={iconSrc} alt="{mod.name} icon" class="h-36 w-full object-cover" />
								{:else}
									<div class="flex h-36 w-full items-center justify-center">
										<span class="font-mono text-4xl font-bold text-stone-700">{abbrev(mod.name)}</span>
									</div>
								{/if}
							</a>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- ── Footer note ────────────────────────────────────────────────── -->
		<div class="border-t border-stone-800 py-10">
			<p class="font-mono text-xs text-stone-700">
				// All mods are for Fabric. Versions are updated periodically — always check the
				linked Modrinth page for the latest compatible release.
			</p>
		</div>
	</div>
</div>
