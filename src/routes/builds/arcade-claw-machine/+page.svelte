<script lang="ts">
	import PostLayout from '$lib/components/posts/PostLayout.svelte';
	import WorldDownloadFooter from '$lib/components/posts/WorldDownloadFooter.svelte';
	import SongPlayer from '$lib/components/posts/SongPlayer.svelte';
	import Seo from '$lib/components/global/Seo.svelte';
	import type { NavSection } from '$lib/components/posts/PostLayout.svelte';
	import { builds } from '$lib/data/builds';
	import { SITE_URL, abs, breadcrumbs, publisher, youTubeId, youTubeThumb, youTubeEmbed } from '$lib/seo';
	const build = builds.find((b) => b.href === '/builds/arcade-claw-machine')!;

	// ── SEO ──────────────────────────────────────────────────────────────────
	const PATH = '/builds/arcade-claw-machine';
	const SEO_DESCRIPTION =
		'A working Minecraft claw machine built in vanilla — no mods. Nine colour-matched buttons, a claw that grabs your toy, and a free world download.';

	const videoId = youTubeId(build.youtubeUrl);

	const arcadeLd: Record<string, unknown>[] = [
		{
			'@context': 'https://schema.org',
			'@type': 'CreativeWork',
			'@id': `${SITE_URL}${PATH}#build`,
			name: 'The Arcade Claw Machine — Minecraft Claw Machine',
			alternateName: 'Minecraft Claw Machine',
			headline: 'Working Minecraft Claw Machine in Vanilla — No Mods',
			description: SEO_DESCRIPTION,
			url: abs(PATH),
			image: abs('/og/arcade-claw-machine.jpg'),
			inLanguage: 'en',
			genre: ['Minecraft', 'Redstone', 'Map'],
			about: [
				{ '@type': 'Thing', name: 'Minecraft' },
				{ '@type': 'Thing', name: 'Claw machine' },
				{ '@type': 'Thing', name: 'Arcade game' },
				{ '@type': 'VideoGame', name: 'Minecraft' }
			],
			keywords:
				'minecraft claw machine, vanilla minecraft claw machine, minecraft arcade, minecraft arcade machine, minecraft claw machine no mods, redstone claw machine, minecraft toy machine, minecraft arcade world download',
			isAccessibleForFree: true,
			author: publisher,
			publisher
		},
		breadcrumbs([
			{ name: 'Home', path: '/' },
			{ name: 'Builds', path: '/builds' },
			{ name: 'The Arcade Claw Machine', path: PATH }
		])
	];

	// Emitted only once the video exists and its real upload date is recorded —
	// Google requires uploadDate before it will treat this as a video result.
	if (videoId && build.videoUploadDate) {
		arcadeLd.push({
			'@context': 'https://schema.org',
			'@type': 'VideoObject',
			name: 'Minecraft Claw Machine — Vanilla, No Mods',
			description: SEO_DESCRIPTION,
			thumbnailUrl: [youTubeThumb(videoId)],
			uploadDate: build.videoUploadDate,
			embedUrl: youTubeEmbed(videoId),
			contentUrl: build.youtubeUrl,
			publisher
		});
	}

	// ── Images ───────────────────────────────────────────────────────────────
	import heroImg      from '$lib/assets/posts/postThumbnail/ARCADE_CLAW.webp';
	import buttonImg    from '$lib/assets/posts/worldPages/arcadeMachine/buttonPanel.webp';
	import clawImg      from '$lib/assets/posts/worldPages/arcadeMachine/clawGrabbingBeeToy.webp';
	import tilesImg     from '$lib/assets/posts/worldPages/arcadeMachine/smartTiles.webp';
	import splitImg     from '$lib/assets/posts/worldPages/arcadeMachine/splittingArcadeMachine.webp';
	import timerImg     from '$lib/assets/posts/worldPages/arcadeMachine/timer.webp';
	import pacPacImg    from '$lib/assets/posts/worldPages/arcadeMachine/pac-pac.webp';
	import jukeboxImg   from '$lib/assets/posts/worldPages/arcadeMachine/jukebox.webp';

	// ── The nine prizes ──────────────────────────────────────────────────────
	import soccerBallImg  from '$lib/assets/posts/worldPages/arcadeMachine/toys9/soccerBAll.webp';
	import beeImg         from '$lib/assets/posts/worldPages/arcadeMachine/toys9/bee.webp';
	import monkeyImg      from '$lib/assets/posts/worldPages/arcadeMachine/toys9/monkey.webp';
	import alienImg       from '$lib/assets/posts/worldPages/arcadeMachine/toys9/alien.webp';
	import spaceRangerImg from '$lib/assets/posts/worldPages/arcadeMachine/toys9/spaceRanger.webp';
	import bootImg        from '$lib/assets/posts/worldPages/arcadeMachine/toys9/boot.webp';
	import goldHeadImg    from '$lib/assets/posts/worldPages/arcadeMachine/toys9/goldHead.webp';
	import lanternImg     from '$lib/assets/posts/worldPages/arcadeMachine/toys9/lantern.webp';
	import nicnakImg      from '$lib/assets/posts/worldPages/arcadeMachine/toys9/nicnak.webp';

	// ── Lighting: schematic diagrams + real before/after captures ────────────
	import diagramSealedImg from '$lib/assets/posts/worldPages/arcadeMachine/lighting/lightingDiagramSealed.svg';
	import diagramLitImg    from '$lib/assets/posts/worldPages/arcadeMachine/lighting/lightingDiagramLit.svg';
	import fullNoLightImg   from '$lib/assets/posts/worldPages/arcadeMachine/lighting/fullNoLight.webp';
	import fullLightImg     from '$lib/assets/posts/worldPages/arcadeMachine/lighting/fullLight.webp';
	import floorNoLightImg  from '$lib/assets/posts/worldPages/arcadeMachine/lighting/noLightFloor.webp';
	import floorLightImg    from '$lib/assets/posts/worldPages/arcadeMachine/lighting/lightFloor.webp';
	import toysNoLightImg   from '$lib/assets/posts/worldPages/arcadeMachine/lighting/noLightToys.webp';
	import toysLightImg     from '$lib/assets/posts/worldPages/arcadeMachine/lighting/lightToys.webp';
	import ceilingImg       from '$lib/assets/posts/worldPages/arcadeMachine/lighting/lightsCeiling.webp';

	// ── Soundtrack ───────────────────────────────────────────────────────────
	// Imported rather than referenced from /static so Vite content-hashes it,
	// same as every image on this page.
	import arcadeSongUrl from '$lib/assets/posts/worldPages/arcadeMachine/audio/jukeboxAudio.mp3';

	// ── Prize line-up ────────────────────────────────────────────────────────
	// Cards are square so the grid stays even whether a shot is 16:9 or square.
	const TOYS: { name: string; note: string; src: string; alt: string; starred?: boolean }[] = [
		{
			name: 'Soccer Ball',
			note: 'The one everyone goes for first',
			src: soccerBallImg,
			alt: 'The soccer ball prize — a white and black blocky ball in the claw machine pit'
		},
		{
			name: 'The Bee',
			note: 'Small, stripy, dangerously cute',
			src: beeImg,
			alt: 'The bee prize — a yellow and brown bee with antennae and folded wings'
		},
		{
			name: 'The Monkey',
			note: 'Cheeky little guy',
			src: monkeyImg,
			alt: 'The monkey prize — a green and orange figure with wide eyes and outstretched arms'
		},
		{
			name: 'Space Alien',
			note: 'Utterly devoted to the claw',
			src: alienImg,
			alt: 'The space alien prize — a teal three-eyed alien with two antennae',
			starred: true
		},
		{
			name: 'Space Ranger',
			note: 'Absolutely convinced he can fly',
			src: spaceRangerImg,
			alt: 'The space ranger prize — a green, purple and white figure in a flight suit',
			starred: true
		},
		{
			name: 'Cowboy Boot',
			note: 'Complete with a spur on the heel',
			src: bootImg,
			alt: 'The cowboy boot prize — a tall brown leather boot with a spur',
			starred: true
		},
		{
			name: 'The Gold Head',
			note: 'Worth more than the machine, probably',
			src: goldHeadImg,
			alt: 'The gold head prize — a warm orange and amber blocky head'
		},
		{
			name: 'The Lantern',
			note: 'A prize that lights its own corner',
			src: lanternImg,
			alt: 'The lantern prize — a teal prismarine lantern with a glowing strip'
		},
		{
			name: 'The Nic-Nak',
			note: 'Exactly what it says on the tin',
			src: nicnakImg,
			alt: 'The nic-nak prize — a stacked orange, pink and yellow ornament'
		}
	];

	// ── Lighting before/after pairs ──────────────────────────────────────────
	const LIGHT_PAIRS = [
		{
			heading: 'The whole arcade',
			blurb:
				'Sealed up, the three cabinets are barely shapes in the dark. Open the roof and the row reads instantly — marquees, side art, and the star-tiled floor underneath.',
			off: fullNoLightImg,
			on: fullLightImg,
			offAlt: 'The three arcade cabinets with the roof sealed, almost entirely lost in darkness',
			onAlt: 'The same three arcade cabinets lit from above, marquees and side art clearly readable'
		},
		{
			heading: 'The floor',
			blurb:
				'The most extreme of the three. With no light coming in, the floor is a black surface with a handful of faint shapes on it. Lit, the whole star pattern comes out in gold, red, blue and purple.',
			off: floorNoLightImg,
			on: floorLightImg,
			offAlt: 'The arcade floor unlit — a near-black surface with barely visible pattern',
			onAlt: 'The same arcade floor lit from above, revealing a dense pattern of gold, red, blue and purple stars'
		},
		{
			heading: 'The prize casing',
			blurb:
				"Inside the claw machine's glass. Unlit, the pit is a muddy silhouette; lit, every coloured tile and every toy separates out from its neighbour.",
			off: toysNoLightImg,
			on: toysLightImg,
			offAlt: 'The inside of the claw machine prize casing unlit, the toys and tiles muted and hard to separate',
			onAlt: 'The same prize casing lit from above, the coloured tiles and individual toys clearly picked out'
		}
	];

	// The nine ring colours used across the cabinet, in panel order.
	const RING_COLORS = [
		'#62b62c', '#16919a', '#a3211f',
		'#313fa0', '#dc8095', '#3b8fd6',
		'#e07a10', '#a32bb0', '#e5b310'
	];

	// ── Sidebar nav ──────────────────────────────────────────────────────────
	const navSections: NavSection[] = [
		{ id: 'intro',  label: 'Introduction' },
		{ id: 'prizes', label: 'The Prize Line-Up' },
		{ id: 'panel',  label: 'The Control Panel' },
		{
			id: 'how-it-works',
			label: 'How It Works',
			sub: [
				{ id: 'the-claw',    label: 'The Drop & Grab' },
				{ id: 'the-haul',    label: 'Into the Machine' },
				{ id: 'smart-tiles', label: 'The Smart Tiles' },
				{ id: 'dropbox',     label: 'The Dropbox' }
			]
		},
		{ id: 'reset', label: 'The Reset Button' },
		{ id: 'timer', label: 'The Countdown Timer' },
		{
			id: 'immersion',
			label: 'Building an Arcade',
			sub: [
				{ id: 'hidden-redstone', label: 'Hiding the Redstone' },
				{ id: 'neighbours',      label: 'The Other Cabinets' },
				{ id: 'black-box',       label: 'The Black Box' },
				{ id: 'lighting',        label: 'Light Through the Roof' }
			]
		},
		{ id: 'unbreakable', label: 'Vanilla & Unbreakable' },
		{ id: 'soundtrack',  label: 'The Arcade Theme' },
		{ id: 'download',    label: 'World Download' }
	];
</script>

<Seo
	title="Minecraft Claw Machine — Working Vanilla Arcade Build, No Mods"
	description={SEO_DESCRIPTION}
	path={PATH}
	image="/og/arcade-claw-machine.jpg"
	imageAlt="The R-QADE Minecraft claw machine cabinet built in vanilla, its glass prize pit packed with colourful toys"
	type="article"
	keywords={[
		'minecraft claw machine',
		'vanilla minecraft claw machine',
		'minecraft claw machine no mods',
		'minecraft arcade',
		'minecraft arcade machine',
		'redstone claw machine',
		'minecraft toy machine',
		'minecraft arcade world download'
	]}
	jsonLd={arcadeLd}
/>

<PostLayout
	title="The Arcade Claw Machine"
	heroSrc={heroImg}
	heroAlt="The R-QADE arcade claw machine cabinet in vanilla Minecraft, its glass prize pit full of colourful toys"
	{navSections}
	youtubeUrl={build.youtubeUrl}
>

	<!-- ── Introduction ──────────────────────────────────────────────────── -->
	<section id="intro" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Introduction</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">
				A Claw Machine That Always Wins
			</h2>

			<div class="space-y-5 text-xl leading-relaxed text-stone-300">
				<p>
					Every real claw machine is designed to disappoint you. The grip goes slack halfway up,
					the toy tumbles back into the pit, and your money is gone. So I built one that does the
					opposite. Press a button, pick a prize, and the claw brings it home —
					<em>every single time</em>.
				</p>
				<p>
					Nine toys sit in the prize pit, each one ringed in its own colour. Nine buttons sit on
					the control panel, each one ringed in the matching colour. Press the button, and the
					claw drops out of the ceiling of the cabinet, closes around that exact toy, and hauls it
					up into the machine. From there it gets carried to the back, dropped into the delivery
					system, ferried to the front, and unloaded into the dropbox — where you can walk right
					up and take it.
				</p>
				<p>
					Then you press reset, and the machine puts the toy back on the precise tile it was
					lifted from, ready for the next round.
				</p>
				<p>
					<strong class="text-white">All of it runs in vanilla Minecraft.</strong> No mods, no
					plugins, no resource packs, no external tools. And — the part I'm proudest of — there is
					no way for a player to break it.
				</p>
				<p>
					The world download is free and available at the bottom of this post.
				</p>
			</div>
		</div>
	</section>

	<!-- ── The Prize Line-Up ─────────────────────────────────────────────── -->
	<section id="prizes" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">The Prizes</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">Nine Toys in the Pit</h2>

			<div class="space-y-5 text-xl leading-relaxed text-stone-300">
				<p>
					A claw machine is only as good as what's inside it, so the prize pit got as much
					attention as the redstone. Nine prizes, all built block by block: there's a
					<strong class="text-white">soccer ball</strong>, a
					<strong class="text-white">bee</strong>, and a
					<strong class="text-white">monkey-looking fellow</strong> who I'm still not entirely sure
					about, plus a gold head, a lantern and a nic-nak filling out the back row — and then
					there's the corner of the pit I really want you to look at.
				</p>
			</div>

			<!-- 3×3 prize collage. Square cells keep the grid even regardless of the
			     source aspect ratio — a 16:9 shot centre-crops, a square one fits exactly. -->
			<div class="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
				{#each TOYS as toy (toy.name)}
					<figure
						class="border-2 {toy.starred
							? 'border-green-600 bg-stone-900'
							: 'border-stone-800 bg-stone-950'}"
					>
						<div class="relative aspect-square overflow-hidden bg-black">
							<img
								src={toy.src}
								alt={toy.alt}
								loading="lazy"
								decoding="async"
								class="h-full w-full object-cover object-center"
							/>
							{#if toy.starred}
								<span
									class="absolute top-0 right-0 bg-green-700 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase"
								>
									★
								</span>
							{/if}
						</div>
						<figcaption class="px-3 py-2.5">
							<p class="text-sm font-bold {toy.starred ? 'text-green-400' : 'text-white'}">
								{toy.name}
							</p>
							<p class="mt-0.5 text-xs leading-snug text-stone-500">{toy.note}</p>
						</figcaption>
					</figure>
				{/each}
			</div>
			<p class="mt-3 text-center text-xs text-stone-600">
				All nine prizes, each one ringed in the colour of the button that fetches it.
			</p>

			<!-- Toy Story callout -->
			<div class="mt-12 border-2 border-green-800 bg-stone-900 px-8 py-8">
				<p class="mb-2 text-xs font-semibold tracking-widest text-green-600 uppercase">
					The Ones I'm Actually Excited About
				</p>
				<h3 class="mb-5 text-2xl font-bold text-white">
					The Space Alien, the Space Ranger, and the Cowboy Boot
				</h3>
				<div class="space-y-4 text-xl leading-relaxed text-stone-300">
					<p>
						If you grew up anywhere near a certain animated film about toys, you already know
						exactly why these three are in here together. Building a claw machine and
						<em>not</em> putting a little green alien in the pit would have been a crime.
					</p>
					<p>
						The <strong class="text-white">Space Alien</strong> is the heart of the whole build —
						wide-eyed, antenna up, entirely at peace with whatever the claw decides. The
						<strong class="text-white">Space Ranger</strong> stands beside him in full flight-ready
						posture, and the <strong class="text-white">Cowboy Boot</strong> rounds out the trio
						with a name scuffed into the sole.
					</p>
					<p>
						Grab all three in a row and you've effectively re-enacted the best scene in the movie,
						except this time the claw actually cooperates.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ── The Control Panel ─────────────────────────────────────────────── -->
	<section id="panel" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Controls</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">Nine Buttons, Colour Matched</h2>

			<div class="space-y-5 text-xl leading-relaxed text-stone-300">
				<p>
					The entire user interface is nine buttons and one reset button. That's it. No levers to
					pull in sequence, no coordinates to type, no manual to memorise before your first go.
				</p>
				<p>
					Each of the nine buttons is surrounded by a coloured frame, and every toy in the pit is
					surrounded by that same colour. Want the toy in the green ring? Press the button in the
					green ring. That's the entire control scheme — you can hand the machine to somebody who
					has never touched redstone in their life and they'll work it out in about four seconds.
				</p>
				<p>
					It's a deliberately dumb interface for a very not-dumb machine, and that's the point.
					The complexity lives in the walls, not in the player's head.
				</p>
			</div>

			<!-- Ring colour swatches -->
			<div class="mx-auto mt-10 max-w-md">
				<p class="mb-3 text-center text-xs font-semibold tracking-widest text-stone-500 uppercase">
					The nine ring colours
				</p>
				<div class="grid grid-cols-3 gap-2">
					{#each RING_COLORS as color (color)}
						<div class="flex aspect-[2/1] items-center justify-center" style="background: {color}">
							<div class="h-1/3 w-1/3 border-2 border-black/30 bg-stone-200"></div>
						</div>
					{/each}
				</div>
				<p class="mt-3 text-center text-xs text-stone-600">
					Each frame is mirrored around its matching toy down in the pit.
				</p>
			</div>

			<figure class="mx-auto mt-10 w-4/5">
				<img width="1400" height="788" loading="lazy" decoding="async"
					src={buttonImg}
					alt="The claw machine control panel: a three by three grid of colour-framed buttons with a red reset button below"
					class="w-full"
				/>
				<figcaption class="mt-3 text-center text-xs text-stone-600">
					The panel. Nine colour-framed buttons up top, the reset button below.
				</figcaption>
			</figure>
		</div>
	</section>

	<!-- ── How It Works ──────────────────────────────────────────────────── -->
	<section id="how-it-works" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Technical</p>
			<h2 class="mb-6 text-center text-3xl font-bold text-white">How It Works</h2>

			<p class="mb-12 text-center text-xl leading-relaxed text-stone-400">
				One button press kicks off a four-stage journey. Here's the whole route, front to back and
				back to front again.
			</p>

			<!-- Route summary -->
			<div class="mb-16 grid grid-cols-1 gap-px bg-stone-800 sm:grid-cols-4">
				{#each [
					{ n: '01', t: 'Drop & Grab', d: 'The claw descends from the ceiling and takes the toy' },
					{ n: '02', t: 'Haul Back',   d: 'Flying machines carry it to the back of the machine' },
					{ n: '03', t: 'Smart Tiles', d: 'It drops into the tile system and rides to the front' },
					{ n: '04', t: 'Dropbox',     d: 'The prize unloads at the front of the machine' }
				] as step (step.n)}
					<div class="bg-stone-950 px-5 py-7 text-center">
						<p class="mb-2 font-mono text-xs font-bold tracking-widest text-green-600">{step.n}</p>
						<p class="mb-2 text-sm font-bold tracking-wide text-white uppercase">{step.t}</p>
						<p class="text-xs leading-relaxed text-stone-500">{step.d}</p>
					</div>
				{/each}
			</div>

			<!-- Drop & Grab -->
			<div id="the-claw" class="mb-16 scroll-mt-24">
				<h3 class="mb-5 text-center text-xl font-semibold text-green-400">The Drop &amp; Grab</h3>
				<div class="space-y-4 text-xl leading-relaxed text-stone-300">
					<p>
						The moment a button goes in, the claw comes down. It lives up in the top of the
						cabinet, out of sight behind the marquee, and it drops straight down through the pit
						to the toy that button belongs to.
					</p>
					<p>
						It closes, it lifts, and it carries the toy back up into the machine. No swinging, no
						near-misses, no dramatic slip at the last second. The claw goes down, the claw comes
						up, and the toy comes with it.
					</p>
				</div>
				<figure class="mx-auto mt-8 w-4/5">
					<img width="1400" height="788" loading="lazy" decoding="async"
						src={clawImg}
						alt="The claw closed around the bee toy inside the prize pit, mid-grab"
						class="w-full"
					/>
					<figcaption class="mt-3 text-center text-xs text-stone-600">
						The claw closed around the bee, right before the lift.
					</figcaption>
				</figure>
			</div>

			<!-- Into the machine -->
			<div id="the-haul" class="mb-16 scroll-mt-24">
				<h3 class="mb-5 text-center text-xl font-semibold text-green-400">Into the Machine</h3>
				<div class="space-y-4 text-xl leading-relaxed text-stone-300">
					<p>
						Once the toy is inside, a set of flying machines takes over. They carry it from the
						grab point all the way to the back of the machine, and then drop it straight down into
						the delivery system waiting underneath.
					</p>
					<p>
						This is the part of the build nobody playing it will ever see, and it's the part that
						took the longest. Everything from here on happens behind the panels — from the
						player's side of the glass, the toy simply vanishes into the ceiling and reappears at
						the front a few seconds later.
					</p>
				</div>
				<figure class="mx-auto mt-8 w-4/5">
					<img width="1400" height="788" loading="lazy" decoding="async"
						src={splitImg}
						alt="An exploded view of the arcade claw machine build, showing the cabinet separated into its internal layers"
						class="w-full"
					/>
					<figcaption class="mt-3 text-center text-xs text-stone-600">
						The cabinet pulled apart layer by layer. The player sees the front pane and nothing else.
					</figcaption>
				</figure>
			</div>

			<!-- Smart Tiles -->
			<div id="smart-tiles" class="mb-16 scroll-mt-24">
				<h3 class="mb-5 text-center text-xl font-semibold text-green-400">The Smart Tiles</h3>
				<div class="space-y-4 text-xl leading-relaxed text-stone-300">
					<p>
						The toy lands in the smart tile system — the layer that handles delivery. Once the
						flying machines have dropped it in at the back, the tiles take the toy the rest of the
						way and move it forward to the front of the machine.
					</p>
					<p>
						It is, by a wide margin, the densest section of the build. What looks like an
						impenetrable wall of pistons, observers and redstone in the screenshot below is
						really just one job done nine different ways: get the toy from wherever it entered to
						where the player is standing.
					</p>
				</div>
				<figure class="mx-auto mt-8 w-4/5">
					<img width="1400" height="788" loading="lazy" decoding="async"
						src={tilesImg}
						alt="The smart tile delivery system, a dense multi-layer grid of pistons, observers and redstone"
						class="w-full"
					/>
					<figcaption class="mt-3 text-center text-xs text-stone-600">
						The smart tile system. Every one of those layers is doing delivery work.
					</figcaption>
				</figure>
			</div>

			<!-- Dropbox -->
			<div id="dropbox" class="scroll-mt-24">
				<h3 class="mb-5 text-center text-xl font-semibold text-green-400">The Dropbox</h3>
				<div class="space-y-4 text-xl leading-relaxed text-stone-300">
					<p>
						The last thing the machine does is unload the toy at the front, into the dropbox —
						the same slot a real claw machine would spit your prize into, except this one
						actually delivers.
					</p>
					<p>
						Walk up, look in, and there's your toy: exactly the one whose colour you pressed,
						sitting at the front of the machine waiting for you.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ── Reset Button ──────────────────────────────────────────────────── -->
	<section id="reset" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Memory</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">The Reset Button Remembers</h2>

			<div class="space-y-5 text-xl leading-relaxed text-stone-300">
				<p>
					A claw machine you can only use once isn't much of a claw machine. So underneath the nine
					prize buttons there's a tenth: reset.
				</p>
				<p>
					The machine <strong class="text-white">remembers the tile it last picked up from</strong>.
					When you hit reset, it already knows exactly where that toy came from, and it sends it
					straight back to that spot in the pit. Not a generic "return to start" — the actual tile,
					the same one, every time.
				</p>
				<p>
					That's what makes the whole thing replayable. Grab the alien, admire the alien, hit
					reset, watch the alien go home, then go straight for the boot. There's no manual
					rebuild, no walking round the back to place anything, and nothing for you to line up
					yourself. One button, and the machine is loaded for the next player.
				</p>
			</div>

			<div class="mx-auto mt-10 max-w-2xl border-l-4 border-green-700 bg-stone-900 px-8 py-6">
				<p class="text-lg leading-relaxed text-stone-300">
					<strong class="text-white">The short version:</strong> nine buttons take a toy out, one
					button puts it back where it was. That's the entire user manual.
				</p>
			</div>
		</div>
	</section>

	<!-- ── Countdown Timer ───────────────────────────────────────────────── -->
	<section id="timer" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Feedback</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">A Timer So You're Never Guessing</h2>

			<div class="space-y-5 text-xl leading-relaxed text-stone-300">
				<p>
					The one genuinely annoying thing about big redstone contraptions is the waiting. You
					press the button, something starts clunking away inside the walls, and you have no idea
					whether it'll be done in two seconds or twenty — so you stand there mashing the button
					again, which is exactly how people break machines.
				</p>
				<p>
					So the cabinet has a timer. While the machine is off fetching your toy, it shows you a
					live visual of how much longer there is to go. You can see the run counting down in front
					of you, so you know the machine is working and you know roughly when to expect your prize
					in the dropbox.
				</p>
				<p>
					It's a small addition that changes the feel of the entire build. Waiting for something
					is fine. Waiting for something with no idea if it's even working is not.
				</p>
			</div>

			<!-- The timer dial is square-ish inside a 16:9 shot, so it sits a little
			     narrower than the wide screenshots to keep the ring a sensible size. -->
			<figure class="mx-auto mt-10 w-full max-w-xl">
				<img width="1200" height="675"
					src={timerImg}
					alt="The claw machine's timer — a ring of copper blocks around a lit central cross, part of the ring glowing"
					loading="lazy"
					decoding="async"
					class="w-full"
				/>
				<figcaption class="mt-3 text-center text-xs text-stone-600">
					The timer. One glance tells you how much longer the machine needs.
				</figcaption>
			</figure>
		</div>
	</section>

	<!-- ── Building an Arcade ────────────────────────────────────────────── -->
	<section id="immersion" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Atmosphere</p>
			<h2 class="mb-6 text-center text-3xl font-bold text-white">Building an Arcade, Not a Machine</h2>

			<p class="mb-12 text-center text-xl leading-relaxed text-stone-400">
				A working claw machine sitting alone on a superflat is a tech demo. I wanted it to feel
				like a place you'd actually walk into — so a big chunk of this build has nothing to do
				with redstone at all.
			</p>

			<!-- Hiding the redstone -->
			<div id="hidden-redstone" class="mb-16 scroll-mt-24">
				<h3 class="mb-5 text-center text-xl font-semibold text-green-400">Hiding the Redstone</h3>
				<div class="space-y-4 text-xl leading-relaxed text-stone-300">
					<p>
						Every last piece of the mechanism is hidden. The claw rig, the flying machines, the
						smart tile system, the memory for the reset button — none of it is visible from
						anywhere a player can stand. You get a cabinet, a pane of glass, a pit full of toys,
						and a control panel.
					</p>
					<p>
						This is the least glamorous work in the entire project and easily the most important.
						Exposed redstone screams "contraption" and instantly breaks the illusion. Once it's
						buried, your brain stops reading it as a machine made of pistons and starts reading
						it as an arcade machine, which is exactly the trick I was going for.
					</p>
					<p>
						The exploded view further up this page is the only place you'll ever see the guts.
						In the world itself, they're sealed away.
					</p>
				</div>
			</div>

			<!-- The other cabinets -->
			<div id="neighbours" class="mb-16 scroll-mt-24">
				<h3 class="mb-5 text-center text-xl font-semibold text-green-400">The Other Cabinets</h3>
				<div class="space-y-4 text-xl leading-relaxed text-stone-300">
					<p>
						One arcade machine on its own doesn't read as an arcade. It reads as an arcade
						machine. So I built <strong class="text-white">two more cabinets</strong> and stood
						them either side of the claw machine — purely for the atmosphere.
					</p>
					<p>
						On the left is <strong class="text-white">Pac-Pac</strong>, a full-height cabinet in
						arcade yellow with its maze running across the screen and the side art wrapping the
						entire panel. On the right sits the <strong class="text-white">jukebox</strong> —
						lower, wider, and glowing under its own backglass.
					</p>
					<p>
						They exist for one reason: to make the space feel like a room you've wandered into
						rather than a stage built around a single object. Your eye lands on a row of
						cabinets, not a lone machine, and the claw machine becomes the one you walked over
						to instead of the only thing in the world.
					</p>
				</div>
				<div class="mt-8 grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
					<figure>
						<img width="900" height="506"
							src={pacPacImg}
							alt="The Pac-Pac cabinet, a tall yellow arcade machine with maze artwork wrapping its side panel"
							loading="lazy"
							decoding="async"
							class="w-full"
						/>
						<figcaption class="mt-2 text-center text-xs text-stone-600">
							Pac-Pac, standing to the left of the claw machine.
						</figcaption>
					</figure>
					<figure>
						<img width="900" height="506"
							src={jukeboxImg}
							alt="The jukebox cabinet beside the claw machine, its lit backglass glowing over the deck"
							loading="lazy"
							decoding="async"
							class="w-full"
						/>
						<figcaption class="mt-2 text-center text-xs text-stone-600">
							The jukebox on the right, with the claw machine's prize pit beside it.
						</figcaption>
					</figure>
				</div>
			</div>

			<!-- The black box -->
			<div id="black-box" class="mb-16 scroll-mt-24">
				<h3 class="mb-5 text-center text-xl font-semibold text-green-400">The Black Box</h3>
				<div class="space-y-4 text-xl leading-relaxed text-stone-300">
					<p>
						Then all three machines went inside a black box. Think about every arcade you've
						ever been in — they're dark. Not dim, properly dark, so that the only things you can
						see are the things that are lit up. That darkness is the whole reason arcade cabinets
						look the way they do.
					</p>
					<p>
						So the room around the machines is black, top to bottom. It sounds like a strange
						thing to spend time on, but the black box is what makes everything else in this
						section work.
					</p>
				</div>
			</div>

			<!-- Lighting -->
			<div id="lighting" class="scroll-mt-24">
				<h3 class="mb-5 text-center text-xl font-semibold text-green-400">Light Through the Roof</h3>
				<div class="space-y-4 text-xl leading-relaxed text-stone-300">
					<p>
						With a sealed black room, the question becomes how you light it — and I didn't want
						to just scatter light sources around. Instead I
						<strong class="text-white">poked holes in the roof</strong>, directly above the areas
						I wanted to draw your eye to.
					</p>
					<p>
						Light pours down through those gaps and lands exactly where I aimed it. Anything
						under a hole is picked out of the dark; everything else stays black. The result is a
						soft glowing effect on the highlighted areas that you simply don't get from placing
						torches, lanterns or glowstone in a normal build.
					</p>
					<p>
						It turns lighting into composition. Rather than making the room "bright enough to
						see", the roof holes decide what you look at — the cabinets, the floor, the prize
						casing — and let the rest of the box disappear. Here's each of those three with the
						roof sealed and then opened.
					</p>
				</div>

				<!-- Schematic: the idea in cross-section, before the real captures -->
				<div class="mt-10 border border-stone-800 bg-stone-950 p-5 sm:p-6">
					<p class="mb-4 text-center text-xs font-semibold tracking-widest text-stone-500 uppercase">
						The idea, in cross-section
					</p>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<figure>
							<img width="1600" height="900" loading="lazy" decoding="async"
								src={diagramSealedImg}
								alt="Diagram of the arcade black box with a sealed roof, everything sitting in darkness"
								class="w-full"
							/>
							<figcaption class="mt-2 text-center text-xs text-stone-600">
								Sealed roof — the box swallows everything.
							</figcaption>
						</figure>
						<figure>
							<img width="1600" height="900" loading="lazy" decoding="async"
								src={diagramLitImg}
								alt="Diagram of the arcade black box with holes cut in the roof, light shafts picking out the blocks below"
								class="w-full"
							/>
							<figcaption class="mt-2 text-center text-xs text-stone-600">
								Holes cut above the things worth seeing.
							</figcaption>
						</figure>
					</div>
				</div>

				<!-- The actual roof. Near-black, so it gets a border to read as an image. -->
				<figure class="mt-12">
					<img width="1700" height="956"
						src={ceilingImg}
						alt="Looking up at the arcade's black roof, scattered with small holes that read as points of light"
						loading="lazy"
						decoding="async"
						class="w-full border border-stone-800"
					/>
					<figcaption class="mx-auto mt-3 max-w-2xl text-center text-xs leading-relaxed text-stone-600">
						The rig itself, looking straight up. Every one of those points is a hole in the roof —
						that scattering is what's doing all the lighting in the shots below.
					</figcaption>
				</figure>

				<!-- Real before/after captures -->
				{#each LIGHT_PAIRS as pair (pair.heading)}
					<div class="mt-12">
						<h4 class="mb-2 text-center text-lg font-semibold text-white">{pair.heading}</h4>
						<p class="mx-auto mb-5 max-w-2xl text-center text-base leading-relaxed text-stone-400">
							{pair.blurb}
						</p>
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<figure>
								<!-- All six comparison shots are 900x506; the dimensions reserve
							     layout space so nothing jumps as they lazy-load in. -->
							<img src={pair.off} alt={pair.offAlt} loading="lazy" decoding="async" width="900" height="506" class="w-full" />
								<figcaption class="mt-2 text-center text-xs text-stone-600">
									Roof sealed.
								</figcaption>
							</figure>
							<figure>
								<img src={pair.on} alt={pair.onAlt} loading="lazy" decoding="async" width="900" height="506" class="w-full" />
								<figcaption class="mt-2 text-center text-xs text-green-600">
									Light coming in.
								</figcaption>
							</figure>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ── Vanilla & Unbreakable ─────────────────────────────────────────── -->
	<section id="unbreakable" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Design Goals</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">Vanilla, Friendly, and Unbreakable</h2>

			<!-- Feature flags row -->
			<div class="mb-10 grid grid-cols-2 gap-px bg-stone-700 sm:grid-cols-4">
				{#each [
					{ l: '100% Vanilla' },
					{ l: 'No Mods' },
					{ l: 'User Friendly' },
					{ l: 'Unbreakable' }
				] as flag (flag.l)}
					<div class="flex flex-col items-center justify-center gap-2 bg-stone-950 px-4 py-8 text-center">
						<span class="font-mono text-2xl font-bold text-green-400">✓</span>
						<p class="font-mono text-xs font-semibold tracking-widest text-stone-300 uppercase">
							{flag.l}
						</p>
					</div>
				{/each}
			</div>

			<div class="space-y-5 text-xl leading-relaxed text-stone-300">
				<p>
					<strong class="text-white">It's entirely vanilla.</strong> No mods, no plugins, no
					resource packs, no external tools. Everything you see is blocks the game already gave
					you, arranged carefully enough to behave like a machine. Load the world, walk up, play.
				</p>
				<p>
					<strong class="text-white">It's built for people, not for redstoners.</strong> The
					interface is nine colour-matched buttons and a reset. There's no start-up procedure, no
					lever you have to flip first, and no order you need to learn. If you can match a colour
					to a colour, you can operate it.
				</p>
				<p>
					<strong class="text-white">And you cannot break it.</strong> That was the hard
					requirement the entire build was designed around, and it's the constraint that ate the
					most hours. Mash all nine buttons at once. Hit reset at the worst possible moment. Spam
					the panel while the claw is mid-run. Walk off halfway through and come back later. The
					machine does not care — it will not jam, it will not desync, and it will not need
					someone crawling into the back with a pickaxe to fix it.
				</p>
				<p>
					This is genuinely the difference between a redstone <em>demo</em> and a redstone
					<em>build</em>. A demo works when the person who made it operates it correctly. A build
					works when you hand it to a stranger and walk away. This one is the second thing.
				</p>
			</div>

			<div class="mx-auto mt-10 max-w-2xl border border-green-900 bg-stone-900 px-8 py-6">
				<p class="mb-1 font-mono text-xs font-semibold tracking-widest text-green-600 uppercase">
					Player Proofing
				</p>
				<p class="text-base leading-relaxed text-stone-300">
					No sequence of button presses puts the machine into a state it can't recover from. There
					is no "wrong" way to play it, which means there's nothing to explain before someone's
					first go.
				</p>
			</div>
		</div>
	</section>

	<!-- ── Soundtrack ────────────────────────────────────────────────────── -->
	<section id="soundtrack" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Audio</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">I Wrote It Its Own Song</h2>

			<div class="space-y-5 text-xl leading-relaxed text-stone-300">
				<p>
					An arcade cabinet without an arcade tune is just a vending machine with extra steps. So
					the machine got a custom soundtrack — an original track written specifically for this
					build, all chiptune bounce and coin-op swagger.
				</p>
				<p>
					Hit play below and you can hear exactly what the prize pit sounds like.
				</p>
			</div>

			<div class="mx-auto mt-10 max-w-2xl">
				<SongPlayer
					src={arcadeSongUrl}
					title="R-QADE Theme"
					subtitle="Original track — written for the claw machine"
				/>
			</div>
		</div>
	</section>

	<!-- ── World Download ────────────────────────────────────────────────── -->
	<WorldDownloadFooter
		worldName="The Arcade Claw Machine"
		downloadUrl="https://pub-34f93473d6854fe28e01e96e6aacea21.r2.dev/Arcade%20Claw%20Download.zip"
		minecraftVersion="1.21.10"
		notes="The complete arcade world save — the claw machine and its full delivery system, all nine prizes, the reset memory, the countdown timer, the Pac-Pac and jukebox cabinets, and the black box with its roof lighting. No mods or resource packs required. Pure vanilla."
	/>

</PostLayout>
