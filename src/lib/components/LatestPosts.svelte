<script lang="ts">
	import type { PostCard } from '$lib/types';
	import PostCardComponent from './PostCard.svelte';

	let { posts }: { posts: PostCard[] } = $props();
</script>

<!-- ── Latest Posts ── -->
<section class="border-t border-stone-800 px-4 py-16 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="mb-8 flex items-end justify-between">
			<div>
				<p class="mb-1 text-xs font-semibold tracking-widest text-green-400 uppercase">Recent</p>
				<h2 class="text-2xl font-bold text-white">Latest Posts</h2>
			</div>
			<!-- <a href="/blog" class="text-sm text-stone-400 transition-colors hover:text-green-400">
				All posts →
			</a> -->
		</div>

		<div class="grid gap-4 sm:grid-cols-2">
			<!-- {#each posts as post}
				<PostCardComponent {post} />
			{/each} -->
		</div>
	</div>
</section>
