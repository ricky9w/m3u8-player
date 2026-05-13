<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Share2Icon from '@lucide/svelte/icons/share-2';
	import { buildShareLink } from '$lib/share';
	import type { VideoItem } from '$lib/types';

	type Props = { video: VideoItem };

	const { video }: Props = $props();

	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(buildShareLink(video, window.location));
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch (err) {
			console.error('Failed to copy link: ', err);
		}
	}
</script>

<Button
	type="button"
	variant="link"
	size="sm"
	class="px-1 text-primary"
	title="复制分享链接"
	onclick={copy}
>
	<Share2Icon />
	<span>{copied ? '已复制!' : '分享'}</span>
</Button>
