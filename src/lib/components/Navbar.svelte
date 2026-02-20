<script lang="ts">
	interface NavLink {
		label: string;
		href: string;
		description?: string;
	}

	interface NavSection {
		title: string;
		links: NavLink[];
	}

	interface NavItem {
		id: string;
		label: string;
		sections: NavSection[];
	}

	const navItems: NavItem[] = [
		{
			id: 'builds',
			label: 'Builds',
			sections: [
				{
					title: 'Browse',
					links: [
						{ label: 'All Builds', href: '/builds', description: 'The full gallery' },
						{ label: 'Featured', href: '/builds/featured', description: 'Hand-picked showcases' },
						{ label: 'Latest', href: '/builds/latest', description: 'Most recently posted' }
					]
				},
				{
					title: 'By Style',
					links: [
						{ label: 'Medieval', href: '/builds/medieval' },
						{ label: 'Modern', href: '/builds/modern' },
						{ label: 'Fantasy', href: '/builds/fantasy' },
						{ label: 'Survival', href: '/builds/survival' },
						{ label: 'Redstone', href: '/builds/redstone' }
					]
				},
				{
					title: 'By Scale',
					links: [
						{ label: 'Mega Builds', href: '/builds/mega' },
						{ label: 'Base Builds', href: '/builds/base' },
						{ label: 'Detail Pieces', href: '/builds/detail' }
					]
				}
			]
		},
		{
			id: 'tutorials',
			label: 'Tutorials',
			sections: [
				{
					title: 'Skill Level',
					links: [
						{ label: 'Beginner Guides', href: '/tutorials/beginner', description: 'New to building? Start here.' },
						{ label: 'Intermediate', href: '/tutorials/intermediate', description: 'Level up your technique' },
						{ label: 'Advanced', href: '/tutorials/advanced', description: 'Master-level methods' }
					]
				},
				{
					title: 'Topics',
					links: [
						{ label: 'Building Techniques', href: '/tutorials/techniques' },
						{ label: 'Tips & Tricks', href: '/tutorials/tips' },
						{ label: 'Palette Building', href: '/tutorials/palettes' },
						{ label: 'Terraforming', href: '/tutorials/terraforming' },
						{ label: 'Interior Design', href: '/tutorials/interiors' }
					]
				}
			]
		},
		{
			id: 'downloads',
			label: 'World Downloads',
			sections: [
				{
					title: 'Files',
					links: [
						{ label: 'Full Worlds', href: '/downloads/worlds', description: 'Complete world saves' },
						{ label: 'Schematics', href: '/downloads/schematics', description: 'Individual structures' }
					]
				},
				{
					title: 'Resources',
					links: [
						{ label: 'Resource Packs', href: '/downloads/resource-packs' },
						{ label: 'Data Packs', href: '/downloads/data-packs' }
					]
				}
			]
		},
		{
			id: 'blog',
			label: 'Blog',
			sections: [
				{
					title: 'Posts',
					links: [
						{ label: 'All Posts', href: '/blog', description: 'Browse every article' },
						{ label: 'News & Updates', href: '/blog/news', description: 'Project announcements' },
						{ label: 'Timelapses', href: '/blog/timelapses', description: 'Watch builds come to life' },
						{ label: 'Behind the Scenes', href: '/blog/bts', description: 'Process and planning' }
					]
				}
			]
		}
	];

	let activeMenu = $state<string | null>(null);
	let mobileOpen = $state(false);

	function closeAll() {
		activeMenu = null;
		mobileOpen = false;
	}

	const activeItem = $derived(navItems.find((i) => i.id === activeMenu) ?? null);
</script>

<!-- The nav wraps both the bar and the dropdown so onmouseleave fires only when leaving both -->
<nav
	class="relative z-50 bg-stone-950 border-b border-stone-800"
	onmouseleave={() => (activeMenu = null)}
>
	<!-- ── Nav bar row ── -->
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Brand -->
			<a href="/" class="flex items-center gap-2 text-xl font-bold text-white" onclick={closeAll}>
				<span class="text-green-400" aria-hidden="true">
					<!-- Pickaxe-ish SVG icon -->
					<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
						<path d="M21 3L3 10.5l6.75 2.25L12 21l2.25-6.75L21 3z" />
					</svg>
				</span>
				QuercusCraft
			</a>

			<!-- Desktop links -->
			<div class="hidden items-center gap-0.5 md:flex">
				{#each navItems as item}
					<button
						class="flex cursor-pointer items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors {activeMenu ===
						item.id
							? 'bg-stone-800 text-green-400'
							: 'text-stone-300 hover:bg-stone-800 hover:text-white'}"
						onmouseenter={() => (activeMenu = item.id)}
						onclick={() => (activeMenu = activeMenu === item.id ? null : item.id)}
						aria-expanded={activeMenu === item.id}
						aria-haspopup="true"
					>
						{item.label}
						<svg
							class="h-3.5 w-3.5 transition-transform duration-200 {activeMenu === item.id
								? 'rotate-180'
								: ''}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2.5"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</button>
				{/each}

				<a
					href="/about"
					class="rounded-md px-4 py-2 text-sm font-medium text-stone-300 transition-colors hover:bg-stone-800 hover:text-white"
					onmouseenter={() => (activeMenu = null)}
				>
					About
				</a>
			</div>

			<!-- Mobile hamburger -->
			<button
				class="rounded-md p-2 text-stone-300 transition-colors hover:bg-stone-800 hover:text-white md:hidden"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label="Toggle menu"
				aria-expanded={mobileOpen}
			>
				{#if mobileOpen}
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{:else}
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- ── Mega dropdown panel (desktop) ── -->
	{#if activeItem}
		<div
			class="absolute left-0 right-0 top-full hidden border-b border-stone-700 bg-stone-900 shadow-2xl shadow-black/60 md:block"
			role="region"
			aria-label="{activeItem.label} navigation"
		>
			<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<!-- Section label -->
				<p class="mb-4 text-xs font-semibold tracking-widest text-green-400 uppercase">
					{activeItem.label}
				</p>

				<div
					class="grid gap-8"
					style="grid-template-columns: repeat({activeItem.sections.length}, minmax(0, 1fr))"
				>
					{#each activeItem.sections as section}
						<div>
							<h3
								class="mb-3 border-b border-stone-700 pb-2 text-xs font-semibold tracking-wider text-stone-400 uppercase"
							>
								{section.title}
							</h3>
							<ul class="space-y-0.5">
								{#each section.links as link}
									<li>
										<a
											href={link.href}
											class="group flex flex-col rounded-md px-2 py-2 transition-colors hover:bg-stone-800"
											onclick={() => (activeMenu = null)}
										>
											<span
												class="text-sm font-medium text-stone-200 transition-colors group-hover:text-white"
											>
												{link.label}
											</span>
											{#if link.description}
												<span
													class="mt-0.5 text-xs text-stone-500 transition-colors group-hover:text-stone-400"
												>
													{link.description}
												</span>
											{/if}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- ── Mobile menu ── -->
	{#if mobileOpen}
		<div class="border-t border-stone-800 md:hidden">
			<div class="mx-auto max-w-7xl space-y-5 px-4 py-5">
				{#each navItems as item}
					<div>
						<p class="mb-2 text-xs font-semibold tracking-widest text-green-400 uppercase">
							{item.label}
						</p>
						{#each item.sections as section}
							<div class="mb-3">
								<p class="mb-1 ml-2 text-xs text-stone-500">{section.title}</p>
								<ul class="space-y-0.5">
									{#each section.links as link}
										<li>
											<a
												href={link.href}
												class="block rounded-md px-3 py-2 text-sm text-stone-300 transition-colors hover:bg-stone-800 hover:text-white"
												onclick={closeAll}
											>
												{link.label}
											</a>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				{/each}

				<div class="border-t border-stone-800 pt-3">
					<a
						href="/about"
						class="block rounded-md px-3 py-2 text-sm text-stone-300 transition-colors hover:bg-stone-800 hover:text-white"
						onclick={closeAll}
					>
						About
					</a>
				</div>
			</div>
		</div>
	{/if}
</nav>
