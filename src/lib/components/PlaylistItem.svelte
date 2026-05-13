<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import XIcon from '@lucide/svelte/icons/x';
	import type { VideoItem } from '$lib/types';

	type Props = {
		video: VideoItem;
		isActive: boolean;
		onplay: (video: VideoItem) => void;
		ondelete: (id: string) => void;
	};

	const { video, isActive, onplay, ondelete }: Props = $props();
</script>

<div
	class={cn(
		'flex cursor-pointer items-center justify-between gap-2 rounded-lg p-3 transition-colors',
		isActive
			? 'border-l-4 border-primary bg-muted'
			: 'border-l-4 border-transparent bg-card hover:bg-muted/60'
	)}
>
	<button
		type="button"
		class="min-w-0 flex-1 cursor-pointer truncate pr-2 text-left"
		onclick={() => onplay(video)}
	>
		<h3 class="truncate text-sm font-medium">{video.title || 'Untitled Video'}</h3>
		<p class="truncate text-xs text-muted-foreground">{video.url}</p>
	</button>
	<Button
		type="button"
		variant="ghost"
		size="icon-sm"
		aria-label="Remove from playlist"
		onclick={(event) => {
			event.stopPropagation();
			ondelete(video.id);
		}}
	>
		<XIcon />
	</Button>
</div>
