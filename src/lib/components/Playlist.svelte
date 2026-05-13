<script lang="ts">
	import PlaylistItem from './PlaylistItem.svelte';
	import PlayCircleIcon from '@lucide/svelte/icons/play-circle';
	import type { VideoItem } from '$lib/types';

	type Props = {
		videos: VideoItem[];
		currentVideoId: string | null;
		onplay: (video: VideoItem) => void;
		ondelete: (id: string) => void;
	};

	const { videos, currentVideoId, onplay, ondelete }: Props = $props();
</script>

{#if videos.length === 0}
	<div
		class="flex h-full flex-col items-center justify-center rounded-lg bg-muted/40 p-6 text-center"
	>
		<PlayCircleIcon class="mb-4 h-12 w-12 text-muted-foreground/60" />
		<h3 class="mb-1 text-lg font-medium">No videos yet</h3>
		<p class="text-sm text-muted-foreground">Enter an M3U8 URL above to start watching</p>
	</div>
{:else}
	<div class="h-full overflow-y-auto rounded-lg bg-muted/40 p-4">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-lg font-semibold">Playlist ({videos.length})</h2>
		</div>
		<div class="space-y-2">
			{#each videos as video (video.id)}
				<PlaylistItem {video} isActive={video.id === currentVideoId} {onplay} {ondelete} />
			{/each}
		</div>
	</div>
{/if}
