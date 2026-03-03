<script lang="ts">
	import type { PostCard } from '$lib/types';

	let { post }: { post: PostCard } = $props();

	const typeColors: Record<string, string> = {
		Tutorial: 'bg-green-900/50 text-green-400 border border-green-800',
		'World Download': 'bg-blue-900/50 text-blue-400 border border-blue-800',
		Blog: 'bg-stone-800 text-stone-400 border border-stone-700'
	};
</script>

<a
	href={post.href}
	class="group flex flex-col gap-3 rounded-xl border border-stone-800 bg-stone-900 p-5 transition-colors hover:border-stone-600"
>
	<div class="flex items-center justify-between gap-2">
		<span class="rounded-full px-2.5 py-0.5 text-xs font-medium {typeColors[post.type] ?? typeColors['Blog']}">
			{post.type}
		</span>
		<span class="text-xs text-stone-400">{post.date}</span>
	</div>

	<h3 class="font-semibold text-white transition-colors group-hover:text-green-400">
		{post.title}
	</h3>
	<p class="text-sm leading-relaxed text-stone-400">{post.excerpt}</p>
</a>
