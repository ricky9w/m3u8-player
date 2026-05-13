<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import * as Card from '$lib/components/ui/card';
	import VideoIcon from '@lucide/svelte/icons/video';
	import Playlist from './Playlist.svelte';
	import ShareButton from './ShareButton.svelte';
	import UrlInput from './UrlInput.svelte';
	import VideoPlayer from './VideoPlayer.svelte';
	import { Playlist as PlaylistStore } from '$lib/playlist.svelte';

	const playlist = new PlaylistStore();
	let autoPlayFromUrl = $state(false);

	onMount(() => {
		const urlParam = page.url.searchParams.get('url');
		const titleParam = page.url.searchParams.get('title') ?? '来自链接分享的视频';
		if (urlParam && urlParam.trim().endsWith('.m3u8')) {
			playlist.addVideo(urlParam.trim(), titleParam);
			autoPlayFromUrl = true;
		}
	});
</script>

<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
	<div class="space-y-6 lg:col-span-2">
		<Card.Root>
			<Card.Header>
				<Card.Title>Enter M3U8 URL</Card.Title>
			</Card.Header>
			<Card.Content>
				<UrlInput onsubmit={(url, title) => playlist.addVideo(url, title)} />
			</Card.Content>
		</Card.Root>

		{#if playlist.currentVideo}
			{@const current = playlist.currentVideo}
			<Card.Root>
				<Card.Header>
					<Card.Title>{current.title}</Card.Title>
					<Card.Description class="break-all">{current.url}</Card.Description>
					<Card.Action>
						<ShareButton video={current} />
					</Card.Action>
				</Card.Header>
				<Card.Content>
					<div class="aspect-video">
						<VideoPlayer src={current.url} class="h-full w-full" autoPlay={autoPlayFromUrl} />
					</div>
				</Card.Content>
			</Card.Root>
		{:else}
			<Card.Root>
				<Card.Content class="flex aspect-video flex-col items-center justify-center text-center">
					<VideoIcon class="mb-4 h-16 w-16 text-muted-foreground/60" />
					<h3 class="mb-2 text-xl font-medium">No video selected</h3>
					<p class="max-w-md text-muted-foreground">
						Enter an M3U8 URL above to start playing, or select a video from your playlist.
					</p>
				</Card.Content>
			</Card.Root>
		{/if}
	</div>

	<Card.Root class="flex h-[calc(100vh-10rem)] flex-col p-6">
		<Playlist
			videos={playlist.videos}
			currentVideoId={playlist.currentVideoId}
			onplay={(v) => playlist.playVideo(v)}
			ondelete={(id) => playlist.deleteVideo(id)}
		/>
	</Card.Root>
</div>
