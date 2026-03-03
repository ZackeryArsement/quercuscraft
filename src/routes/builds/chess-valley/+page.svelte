<script lang="ts">
	import PostLayout from '$lib/components/posts/PostLayout.svelte';
	import WorldDownloadFooter from '$lib/components/posts/WorldDownloadFooter.svelte';
	import type { NavSection } from '$lib/components/posts/PostLayout.svelte';
	import { builds } from '$lib/data/builds';
	const build = builds.find(b => b.href === '/builds/chess-valley')!;

	// ── Images ───────────────────────────────────────────────────────────────
	import heroImg         from '$lib/assets/posts/worldPages/chessValley/FULLBOARD.webp';
	import fullBuildImg    from '$lib/assets/posts/worldPages/chessValley/FULL_BUILD.webp';
	import manualImg       from '$lib/assets/posts/worldPages/chessValley/MANUAL.webp';
	import pawnImg         from '$lib/assets/posts/worldPages/chessValley/PAWN.webp';
	import billboardImg    from '$lib/assets/posts/worldPages/chessValley/CHESS_BILLBOARD.webp';
	import activeOnImg     from '$lib/assets/posts/worldPages/chessValley/ACTIVE_ON.webp';
	import activeOffImg    from '$lib/assets/posts/worldPages/chessValley/ACTIVE_OFF.webp';
	import graveyardImg    from '$lib/assets/posts/worldPages/chessValley/GRAVEYARD.webp';
	import graveyardExImg  from '$lib/assets/posts/worldPages/chessValley/GRAVEYARD_EX.webp';
	import promotionsImg   from '$lib/assets/posts/worldPages/chessValley/PROMOTIONS.webp';

	// ── Sidebar nav ──────────────────────────────────────────────────────────
	const navSections: NavSection[] = [
		{ id: 'intro',         label: 'Introduction' },
		{ id: 'full-build',    label: 'Full Build' },
		{ id: 'how-it-works',  label: 'How It Works' },
		{
			id: 'how-to-play',
			label: 'How To Play',
			sub: [
				{ id: 'moving-pieces', label: 'Moving Pieces' },
				{ id: 'billboards',    label: 'Billboards' },
				{ id: 'graveyard',     label: 'Graveyard' },
				{ id: 'promotions',    label: 'Promotions' }
			]
		},
		{ id: 'hidden-pieces', label: 'Hidden Chess Pieces' },
		{ id: 'download',      label: 'World Download' }
	];

</script>

<svelte:head>
	<title>Chess Valley — QuercusCraft</title>
	<meta name="description" content="A fully functional game of chess built inside vanilla Minecraft, set within a sculpted interactive valley. Free world download included." />
</svelte:head>

<PostLayout
	title="Chess Valley"
	heroSrc={heroImg}
	heroAlt="Aerial view of Chess Valley — a fully functional chess board inside a sculpted Minecraft valley"
	{navSections}
	youtubeUrl={build.youtubeUrl}
>

	<!-- ── Introduction ──────────────────────────────────────────────────── -->
	<section id="intro" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Introduction</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">Over a Month in the Making</h2>

			<div class="space-y-5 text-xl leading-relaxed text-stone-300">
				<p>
					Chess Valley took more than a month of dedicated, often obsessive work to bring to life.
					The chess mechanics alone — building a fully functional game of chess inside vanilla
					Minecraft, complete with a graveyard for captured pieces, pawn promotion capabilities,
					and an auto-reset button — consumed over four weeks of late nights and relentless iterations.
					I wanted to prioritize making the board LOOK like chess and not another redstone build
					that is so heavy on the technical components that it neglects the important aspects of having 
					an enjoyable user experience.
				</p>
				<p>
					This design absolutely pushes the bounds of all redstone chess. I am extremely confident to state
					that 4 wide chess pieces, centered on 2x2 honey-slime, are THE BIGGEST chess pieces you can 
					use for movable chess. I also feel completely confident to state that this is the absolute smallest
					tile size you can fit for holding 4 wide chess pieces. This chess board is absolutely maxing out all theoretical
					and practical limitations for making a movable chess board in Minecraft.
				</p>
				<p>
					Once the logic was solid, a separate week was spent sculpting the valley itself: the
					surrounding terrain, the atmospheric details, and the environmental storytelling that
					makes the world feel like a place rather than just a technical demonstration. The board
					sits at the heart of a natural amphitheatre, with the valley walls framing every match.
				</p>
				<p>
					Nestled within these walls awaits a hidden secret... More on that further down.
				</p>
				<p>
					The world download is completely free and available at the bottom of this post!
				</p>
			</div>
		</div>
	</section>

	<!-- ── Full Build ────────────────────────────────────────────────────── -->
	<section id="full-build" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Overview</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">Full Build</h2>

			<p class="text-xl leading-relaxed text-stone-300">
				The valley wraps around the board on all sides, giving spectators natural elevated vantage
				points to watch a match unfold. Every angle was considered — this is a world designed to
				be experienced not just played.
			</p>

			<figure class="mx-auto mt-10 w-4/5">
				<img
					src={billboardImg}
					alt="Billboard overlooking chess valley"
					class="w-full"
				/>
				<figcaption class="mt-3 text-center text-xs text-stone-600">
					Billboard overlooking chess valley.
				</figcaption>
			</figure>
		</div>
	</section>

	<!-- ── How It Works ──────────────────────────────────────────────────── -->
	<section id="how-it-works" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Technical</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">How It Works</h2>

			<div class="space-y-5 text-xl leading-relaxed text-stone-300">
				<p>
					Chess Valley runs entirely on vanilla Minecraft — no mods, no plugins, no external tools.
					The board is built on the concept of alternating flying machines pushing and pulling the
					chess pieces from one location to another. This is required, since a 4 wide chess piece
					exceeds the push limit for even a 2 wide flying machine.
				</p>
				<p>
					This means that there are tunnels underneath the entire board, to allow these flying machines
					to travel from any tile to any other selected tile. If you perform a diagonal move then 
					the board will first move the chess piece from left to right, into the final column you are 
					moving to, and then it will bring the piece forward or back depending on it's final location.
				</p>
				<p>
					A full manual is available at the world's spawn point. It covers the complete rule set,
					edge cases, and tips for getting the most out of the system.
				</p>
			</div>

			<figure class="mx-auto mt-10 w-4/5">
				<img
					src={manualImg}
					alt="The in-world manual book available at the spawn point of Chess Valley"
					class="w-full"
				/>
				<figcaption class="mt-3 text-center text-xs text-stone-600">
					The manual at spawn covers every rule and mechanic in detail.
				</figcaption>
			</figure>
		</div>
	</section>

	<!-- ── How To Play ───────────────────────────────────────────────────── -->
	<section id="how-to-play" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Gameplay</p>
			<h2 class="mb-12 text-center text-3xl font-bold text-white">How To Play</h2>

			<!-- Moving Pieces -->
			<div id="moving-pieces" class="mb-16 scroll-mt-24">
				<h3 class="mb-5 text-center text-xl font-semibold text-green-400">Moving Pieces</h3>
				<div class="space-y-4 text-xl leading-relaxed text-stone-300">
					<p>
						Before doing anything, it is best to set your tick rate as high as possible, using the command:
						"/tick rate xx". I recommend x16 speed or x32 speed, which is "/tick rate 320" and "/tick rate 640".
						It also helps to have the leaves graphics set to "fast", since this build has tons of leaves underneath it.
					</p>
					<p>
						To move a piece, you must first pull the lever on the tile of the piece you are attempting to move.
						Once the tile lights up, you then pull the lever of the tile you want it to move to. The tile you are
						moving to must be an EMPTY tile, otherwise the game will break.
					</p>
				</div>
				<figure class="mx-auto mt-8 w-4/5">
					<img
						src={fullBuildImg}
						alt="A pawn selected on the Chess Valley board with valid move squares highlighted"
						class="w-full"
					/>
					<figcaption class="mt-3 text-center text-xs text-stone-600">
						A selected pawn with its available moves lit up on the board.
					</figcaption>
				</figure>
			</div>

			<!-- Billboards -->
			<div id="billboards" class="mb-16 scroll-mt-24">
				<h3 class="mb-5 text-center text-xl font-semibold text-green-400">Billboards</h3>
				<div class="space-y-4 text-xl leading-relaxed text-stone-300">
					<p>
						At the North-East side of the board stands a large white billboard that give you live feedback as you play.
						While a chess piece is actively moving the billboard will display a red line. Meaning no furhter action
						can currently be taken. If you attempt to pull a lever at this time, nothing will happen
					</p>
					<p>
						While the billboard is not displaying red, then you are free to pull levers and move pieces.
					</p>
				</div>
				<!-- Side-by-side: active on / active off -->
				<div class="mt-6 grid grid-cols-2 gap-4">
					<figure>
						<img
							src={activeOnImg}
							alt="Billboard showing the piece CAN move — active green state"
							class="w-full"
						/>
						<figcaption class="mt-2 text-center text-xs text-stone-600">Active — moving is not allowed.</figcaption>
					</figure>
					<figure>
						<img
							src={activeOffImg}
							alt="Billboard showing the piece CANNOT move — inactive state"
							class="w-full"
						/>
						<figcaption class="mt-2 text-center text-xs text-stone-600">Inactive — moving is allowed.</figcaption>
					</figure>
				</div>
			</div>

			<!-- Graveyard -->
			<div id="graveyard" class="scroll-mt-24">
				<h3 class="mb-5 text-center text-xl font-semibold text-green-400">Graveyard</h3>
				<div class="space-y-4 text-xl leading-relaxed text-stone-300">
					<p>
						Every piece captured during the game is recorded in the Graveyard — a dedicated space
						behind each end of the board that displays every fallen piece for both players to see.
						It serves as both a visual scoreboard and a reminder of the material balance.
					</p>
					<p>
						The Graveyard can be opened and closed at any time without affecting the game state.
						Use it to track captures, assess material advantage, or simply admire the carnage.
					</p>
					<p>
						To capture a piece you:
					</p>
					<p>
						First -- pull the indented lever found on each tile, this does
						not cause the lights to turn on, to add a temporary indicator of your intended move.
					</p>
					<p>
						Secondly -- open the graveyard behind your opponent, since you are taking their piece
					</p>
					<p>
						Thirdly -- move the captured piece into the graveyard
					</p>
					<p>
						Fourthly -- CLOSE the graveyard
					</p>
					<p>
						Fifthly -- move YOUR piece onto the tile you just captured and turn off the temporary markers
					</p>
				</div>
				<!-- Side-by-side: closed / open -->
				<div class="mt-8 grid grid-cols-2 gap-4">
					<figure>
						<img
							src={graveyardImg}
							alt="The Chess Valley graveyard in its closed state"
							class="w-full"
						/>
						<figcaption class="mt-2 text-center text-xs text-stone-600">Graveyard — closed.</figcaption>
					</figure>
					<figure>
						<img
							src={graveyardExImg}
							alt="The Chess Valley graveyard open, showing captured pieces"
							class="w-full"
						/>
						<figcaption class="mt-2 text-center text-xs text-stone-600">Graveyard — open.</figcaption>
					</figure>
				</div>
			</div>

			<!-- Promotions -->
			<div id="promotions" class="scroll-mt-24 mt-24">
				<h3 class="mb-5 text-center text-xl font-semibold text-green-400">Promotions</h3>
				<div class="space-y-4 text-xl leading-relaxed text-stone-300">
					<p>
						If you get one of your pawns to the end of the board, there is the possibility
						to promote it to a Queen, Rook, or Bishop.
					</p>
					<p>
						To move pieces in and out of the promotions you must open and close the promotions,
						similar to how you open and close the graveyard.	
					</p>
				</div>
				<figure class="mx-auto mt-10 w-4/5">
					<img
						src={promotionsImg}
						alt="Promotion segment, showing available queens"
						class="w-full"
					/>
					<figcaption class="mt-3 text-center text-xs text-stone-600">
						3 Queens, 2 Rooks/Bishops, 1 Knight available
					</figcaption>
				</figure>
			</div>
		</div>
	</section>

	<!-- ── Hidden Chess Pieces ───────────────────────────────────────────── -->
	<section id="hidden-pieces" class="border-b border-stone-800 py-16">
		<div class="mx-auto max-w-4xl px-8">
			<p class="mb-3 text-s font-semibold tracking-widest text-green-600 uppercase">Secrets</p>
			<h2 class="mb-8 text-center text-3xl font-bold text-white">Hidden Chess Pieces</h2>

			<div class="space-y-5 text-xl leading-relaxed text-stone-300">
				<p>
					Scattered throughout the valley are six hidden chess pieces, each tucked into the
					landscape in a spot you wouldn't expect. They range from mildly tricky to genuinely
					well concealed — finding all six requires exploring every corner of the world, not just
					the board itself.
				</p>
				<p>
					There are no markers, no hints, and no map. They're simply there, waiting.
					Whether you spot them naturally or hunt deliberately is entirely up to you.
				</p>
			</div>

			<figure class="mx-auto mt-10 w-4/5">
				<img
					src={pawnImg}
					alt="One of the six hidden chess pieces concealed within the Chess Valley environment"
					class="w-full"
				/>
				<figcaption class="mt-3 text-center text-xs text-stone-600">
					One of six. The rest are for you to find.
				</figcaption>
			</figure>
		</div>
	</section>

	<figure class="mx-auto mt-8 mb-8 w-4/5">
		<img
			src={billboardImg}
			alt="One of the large billboard displays beside the Chess Valley board"
			class="w-full"
		/>
		<figcaption class="mt-3 text-center text-xs text-stone-600">
			The billboard positioned beside the board for both players to read.
		</figcaption>
	</figure>

	<!-- ── World Download ────────────────────────────────────────────────── -->
	<WorldDownloadFooter
		worldName="Chess Valley"
		downloadUrl="https://pub-34f93473d6854fe28e01e96e6aacea21.r2.dev/Quercus_Chess.zip"
		minecraftVersion="1.21.10"
		notes="The complete Chess Valley world save — functional chess engine, sculpted valley, in-world manual, and all six hidden pieces included. No mods or resource packs required. Pure vanilla."
	/>

</PostLayout>
